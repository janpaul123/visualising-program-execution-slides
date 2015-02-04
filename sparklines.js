var JumpingCircle = React.createClass({
  jump: function() {
    window.clearInterval(this.state.jumpIntervalIndex);
    this.setState({
      jumpIntervalIndex: window.setInterval(function(){ this.forceUpdate(); }.bind(this), 10),
      jumpIntervalStart: +new Date()
    });
  },

  getInitialState: function() {
    return {
      jumpIntervalIndex: null,
      jumpIntervalStart: null
    };
  },
  jumpAmount: function() {
    if (this.state.jumpIntervalIndex === null) return 0;

    var p = (+new Date() - this.state.jumpIntervalStart)/this.props.jumpLengthMs;
    if (p >= 1) {
      window.clearInterval(this.state.jumpIntervalIndex);
      p = 1;
    }

    var jumpFactor = (p < 0.5) ? (1-Math.pow(4*p-1, 2)) : (0.3*(1-Math.pow(4*(p-0.5)-1, 2)));

    return jumpFactor*this.props.jumpHeight;
  },
  render: function() {
    var svgProps = _.clone(this.props.svg);
    svgProps.cy -= this.jumpAmount();

    return React.createElement('circle', svgProps);
  }
});

var SparkLine = React.createClass({
  getInitialState: function() {
    return {selectedIndex: null, hoveredIndex: null};
  },

  values: function() {
    return this.props.logEntry.values;
  },
  numericValues: function() {
    return this.values().map(function(value) {
      if (typeof value === 'number') {
        return value;
      } else if (value != null && typeof value.length != null) {
        return value.length;
      } else {
        return 0;
      }
    });
  },
  isNumeric: function() {
    return _.every(this.values(), function(value) {
      return typeof value === 'number';
    });
  },
  width: function() {
    return this.props.height*3;
  },
  height: function() {
    return this.props.height;
  },
  minValue: function() {
    return Math.min.apply(null, this.numericValues());
  },
  maxValue: function() {
    return Math.max.apply(null, this.numericValues());
  },
  widthForIndex: function(index) {
    return this.width()*Math.min(0.1, 1/this.values().length);
  },
  xForIndex: function(index) {
    return index*this.widthForIndex(index);
  },
  yForValue: function(value) {
    if (this.maxValue() === this.minValue()) return this.height()/2;

    return this.height()-this.height()*(value-this.minValue())/(this.maxValue()-this.minValue());
  },
  selectedIndex: function() {
    return Math.min(this.values().length-1, this.state.selectedIndex !== null ? this.state.selectedIndex : this.values().length-1);
  },
  hoveredIndex: function() {
    return Math.min(this.values().length-1, this.state.hoveredIndex !== null ? this.state.hoveredIndex : this.selectedIndex());
  },
  padding: function() {
    return 30;
  },
  displayValueFor: function(value) {
    if (typeof value === 'number') {
      return '' + (+value.toFixed(3));
    } else {
      return '' + JSON.stringify(value);
    }
  },

  renderLines: function() {
    var lines = [];
    for (var index=1;index<this.values().length; index++) {
      lines.push(React.createElement('line', {
        x1: this.xForIndex(index-1) + this.padding(),
        y1: this.yForValue(this.numericValues()[index-1]) + this.padding(),
        x2: this.xForIndex(index) + this.padding(),
        y2: this.yForValue(this.numericValues()[index]) + this.padding(),
        stroke: 'black',
        strokeWidth: 2,
        strokeLinecap: 'round'
      }));
    }
    return lines;
  },
  renderCircles: function() {
    return this.numericValues().map(function(value, index) {
      return React.createElement('circle', {
        cx: this.xForIndex(index) + this.padding(),
        cy: this.yForValue(value) + this.padding(),
        r: 2,
        fill: 'black'
      });
    }.bind(this));
  },
  renderSelectedCircle: function() {
    return React.createElement('circle', {
      cx: this.xForIndex(this.selectedIndex()) + this.padding(),
      cy: this.yForValue(this.numericValues()[this.selectedIndex()]) + this.padding(),
      r: 4,
      fill: 'grey'
    });
  },
  renderHoveredCircle: function() {
    return React.createElement(JumpingCircle, {
      ref: 'jumpingCircle',
      jumpLengthMs: 400,
      jumpHeight: this.height()*0.6,
      svg: {
        cx: this.xForIndex(this.hoveredIndex()) + this.padding(),
        cy: this.yForValue(this.numericValues()[this.hoveredIndex()]) + this.padding(),
        r: 4,
        fill: 'red',
      }
    });
  },
  renderHoveredValue: function() {
    return React.createElement('div', {
      style: {
        position: 'absolute',
        left: '100%',
        marginLeft: 5,
        top: this.yForValue(this.numericValues()[this.hoveredIndex()])/this.height()*(this.height()-10) + 5,
        color: 'red',
        lineHeight: 0, // to align with dot
        whiteSpace: 'nowrap'
      }
    }, this.displayValueFor(this.values()[this.hoveredIndex()]));
  },

  render: function() {
    return React.createElement('div', {
      style: {
        position: 'absolute',
        top: this.props.logEntry.pos.top,
        left: this.props.logEntry.pos.left + 10,
      }
    },
      React.createElement('svg', {
          width: this.width() + this.padding()*2,
          height: this.height() + this.padding()*2,
          style: { margin: -this.padding(), }
        },
        (this.isNumeric() && this.values().length > 1 ? this.renderLines() : this.renderCircles()),
        this.renderSelectedCircle(),
        this.renderHoveredCircle()
      ),
      this.props.logEntry.values.map(function(value, index) {
        return React.createElement('div', {
          style: {
            position: 'absolute',
            left: this.xForIndex(index)-this.widthForIndex(index)/2,
            width: this.widthForIndex(index),
            top: 0,
            bottom: 0,
            cursor: 'pointer',
          },
          onClick: function() {
            this.setState({selectedIndex: index});
            this.refs.jumpingCircle.jump();
          }.bind(this),
          onMouseEnter: function() {
            this.setState({hoveredIndex: index});
          }.bind(this),
          onMouseLeave: function() {
            this.setState({hoveredIndex: null});
          }.bind(this),
        });
      }.bind(this)),
      this.renderHoveredValue()
    );
  }
});


window.SparkLines = React.createClass({
  render: function() {
    return React.createElement('div', {
      style: {position: 'relative'}
    },
      this.props.log.map(function(logEntry) {
        return React.createElement(SparkLine, {logEntry: logEntry, height: this.props.sparkHeight});
      }.bind(this))
    );
  }
});

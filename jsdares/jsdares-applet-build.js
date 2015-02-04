(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var applet = require('../jsmm-applet');

window.initJsdaresApplet = function(el) {
  var ui = new applet.UI($(el), {hideTabs: true});
  var exampleText = '// Adapted from billmill.org/static/canvastutorial\n// This code is still relatively complicated -- if you\n// can come up with a nice game for on the front page\n// which is fun, simple, and shows off the capabilities\n// of the interface, then contact me at jp@jsdares.com :)\n\nvar context = canvas.getContext("2d");\n\nvar bricks = [];\nvar paddleWidth, paddleHeight, bricksNumX, bricksNumY;\nvar brickWidth, brickHeight, brickMargin, paddleX;\nvar ballX, ballY, ballVx, ballVy, ballDirx, ballDiry;\nvar restart = true;\n\nfor (var y=0; y<20; y++) {\n  bricks[y] = [];\n  for (var x=0; x<20; x++) {\n    bricks[y][x] = true;\n  }\n}\n\nfunction setValues() {\n  paddleWidth = 80;\n  paddleHeight = 12;\n  bricksNumX = 7;\n  bricksNumY = 5;\n  brickWidth = canvas.width / bricksNumX;\n  brickHeight = 20;\n  brickMargin = 4;\n  ballVx = 7;\n  ballVy = 12;\n}\n\nfunction init() {\n  restart = false;\n  paddleX = canvas.width/2;\n  ballX = 40;\n  ballY = 150;\n  ballDirx = 1;\n  ballDiry = 1;\n  for (var y=0; y<13; y++) {\n    for (var x=0; x<13; x++) {\n      bricks[y][x] = true;\n    }\n  }\n}\n\nfunction clear() {\n  context.clearRect(0, 0, canvas.width, canvas.height);  \n}\n\nfunction circle(x, y) {\n  context.beginPath();\n  context.arc(x, y, 10, 0, 2*Math.PI);\n  context.fill();\n}\n\nfunction drawPaddle() {\n  var x = paddleX - paddleWidth/2;\n  var y = canvas.height - paddleHeight;\n  context.fillRect(x, y, paddleWidth, paddleHeight);\n}\n\nfunction mouseMove(event) {\n  paddleX = event.layerX;\n}\n\nfunction hitHorizontal() {\n  if (ballX < 0) {\n    ballDirx = -ballDirx;\n  } else if (ballX >= canvas.width) {\n    ballDirx = -ballDirx;\n  }\n}\n\nfunction hitVertical() {\n  if (ballY < 0) {\n    ballDiry = -ballDiry;\n  } else if (ballY < brickHeight*bricksNumY) {\n    var bx = Math.floor(ballX/brickWidth);\n    var by = Math.floor(ballY/brickHeight);\n    \n    if (bx >= 0 && bx < bricksNumX) {\n      if (bricks[by][bx]) {\n        bricks[by][bx] = false;\n        ballDiry = -ballDiry;\n      }\n    }\n  } else if (ballY >= canvas.height-paddleHeight) {\n    var paddleLeft = paddleX-paddleWidth/2;\n    var paddleRight = paddleX+paddleWidth/2;\n    if (ballX >= paddleLeft && ballX <= paddleRight) {\n      ballDiry = -ballDiry;\n    } else {\n      restart = true;\n      return false;\n    }\n  }\n  return true;\n}\n\nfunction drawBricks() {\n  for (var by=0; by<bricksNumY; by++) {\n    for (var bx=0; bx<bricksNumX; bx++) {\n      if (bricks[by][bx]) {\n        var x = bx * brickWidth + brickMargin/2;\n        var y = by * brickHeight + brickMargin/2;\n        var width = brickWidth - brickMargin;\n        var height = brickHeight - brickMargin;\n        context.fillRect(x, y, width, height);\n      }\n    }\n  }\n}\n\nfunction tick() {\n  if (restart) {\n    init();\n    return;\n  }\n  setValues();\n  clear();\n  drawPaddle();\n  \n  ballX += ballVx*ballDirx;\n  ballY += ballVy*ballDiry;\n  \n  hitHorizontal();\n  if (hitVertical()) {\n    circle(ballX, ballY);\n    drawBricks();\n  } else {\n    clear();\n  }\n}\n\ncanvas.onmousemove = mouseMove;\nwindow.setInterval(tick, 30);';
  var editor = ui.addEditor({text: exampleText});
  ui.loadOutputs({ canvas: {enabled: true}, events: {enabled: true, mouseObjects: ['canvas']}, math: {enabled: true} });
  ui.selectTab('canvas');
};

},{"../jsmm-applet":11}],2:[function(require,module,exports){
/*jshint node:true jquery:true */
/*global Modernizr:false */
"use strict";

var clayer = {};

/*
clayer.Color = function() { return this.init.apply(this, arguments); };
clayer.Color.prototype = {
	names: {aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "0ff", aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "000", blanchedalmond: "ffebcd", blue: "00f", blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", burntsienna: "ea7e5d", cadetblue: "5f9ea0", chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c", cyan: "0ff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400", darkgrey: "a9a9a9", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkslategrey: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dimgrey: "696969", dodgerblue: "1e90ff", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "f0f", gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", grey: "808080", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgray: "d3d3d3", lightgreen: "90ee90", lightgrey: "d3d3d3", lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslategray: "789", lightslategrey: "789", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "0f0", limegreen: "32cd32", linen: "faf0e6", magenta: "f0f", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370db", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "db7093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", red: "f00", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", slategrey: "708090", snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", wheat: "f5deb3", white: "fff", whitesmoke: "f5f5f5", yellow: "ff0", yellowgreen: "9acd32"},

	init: function(color) {
		this.setColor(color || '#000000');
	},

	setColor: function(color) {
		this.original = color;
		if (this.names[color] !== undefined) {
			this.color = color;
			this.format = 'name';
		} else {
			var match = /^["]([#][0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)|(?:(rgb|rgba|hsl|hsla)[(][ ]*(\d+(?:[.]\d+)?)([%]?)[ ]*,[ ]*(\d+(?:[.]\d+)?)([%]?)[ ]*,[ ]*(\d+(?:[.]\d+)?)([%]?)[ ]*(?:,[ ]*(\d+(?:[.]\d+)?)[ ]*)?[)])["]$/g.exec(color);
			if (match !== null) {
				var hex = match[1]; // either "#xxx" or "#xxxxxx"
				var format = match[2]; // either "rgb", "rgba", "hsl", "hsla", or undefined
				var part1 = match[3]; // number
				var percent1 = match[4]; // either "" or "%"
				var part2 = match[5]; // number
				var percent2 = match[6]; // either "" or "%"
				var part3 = match[7]; // number
				var percent3 = match[8]; // either "" or "%"
				var alpha = match[9]; // alpha part or undefined

				if (hex !== undefined) {
					this.format = 'hex';
					if (hex.length === 4) {
						hex = '#' + hex.substring(1,2) + hex.substring(1,2) + hex.substring(2,3) + hex.substring(2,3) + hex.substring(3,4) + hex.substring(3,4);
					}
					this.color = hex;
				} else if (split.format === 'rgb' || split.format === 'rgba') {
				}
			} else {
				this.format = 'invalid';
			}
		}
	},

		parseColor: function(text) {
			this.colorData = {};
			var split = jsmm.editor.editables.splitColor(text);
			if (split === null) {
				return false;
			} else {
				if (split.hex !== undefined) {
					this.colorData.value = split.hex;
					this.colorData.format = 'hex';
					return true;
				} else {
					var a;
					if (split.format === 'rgb' || split.format === 'rgba') {
						var r = parseFloat(split.part1);
						var g = parseFloat(split.part2);
						var b = parseFloat(split.part3);
						a = parseFloat(split.alpha || '1');
						if (split.percent1 === '%') {
							r = r*255/100;
						}
						if (split.percent2 === '%') {
							g = g*255/100;
						}
						if (split.percent3 === '%') {
							b = b*255/100;
						}
						if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 1) return false;
						this.colorData.value = 'rgba(' + r.toFixed(0) + ', ' + g.toFixed(0) + ', ' + b.toFixed(0) + ', ' + a.toFixed(2) + ')';
						this.colorData.format = 'rgba';
						return true;
					} else if (split.format === 'hsl' || split.format === 'hsla') {
						var h = parseInt(split.part1, 10);
						var s = parseInt(split.part2, 10);
						var l = parseInt(split.part3, 10);
						a = parseFloat(split.alpha || '1');
						if (h < 0 || h > 360 || split.percent1 === '%' || s < 0 || s > 100 || split.percent2 !== '%' ||
							l < 0 || l > 100 || split.percent3 !== '%' || a < 0 || a > 1) return false;
						this.colorData.value = 'hsla(' + h.toFixed(0) + ', ' + s.toFixed(2) + '%, ' + l.toFixed(2) + '%, ' + a.toFixed(2) + ')';
						this.colorData.format = 'hsla';
						return true;
					} else {
						return false;
					}
				}
			}
		},

};
*/

clayer.setCss3 = function($element, name, value, addBrowserToValue) {
	addBrowserToValue = addBrowserToValue || false;
	var browsers = ['', '-ms-', '-moz-', '-webkit-', '-o-'];
	for (var i=0; i<browsers.length; i++) {
		var cssName = browsers[i] + name;
		var cssValue = (addBrowserToValue ? browsers[i] : '') + value;
		$element.css(cssName, cssValue);
	}
};

/*
clayer.properties = {};
var ua = navigator.userAgent.toLowerCase();
clayer.properties.isWebKit = !!ua.match(/applewebkit/);
clayer.properties.isTouch = !!(ua.match(/ipad/) || ua.match(/iphone/) || ua.match(/ipod/) || ua.match(/android/));
clayer.properties.isHoverAvailable = !clayer.properties.isTouch;

clayer.properties.useTransitions = Modernizr.csstransitions;
clayer.properties.useTransforms = Modernizr.csstransforms;
clayer.properties.useTransforms3D = Modernizr.csstransforms3d;

clayer.properties.defaultMoveAnimationDuration = 0;
clayer.properties.defaultFadeAnimationDuration = 150;

clayer.Layer = function() { return this.init.apply(this, arguments); };
clayer.Layer.prototype = {
	init: function($element) {
		this.$element = $element;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.opacity = 1;
		this.hidden = false;
		this.timeout = null;
		
		this.offsetX = 0;
		this.offsetY = 0;
		
		this.accelerated = true;
		this.moveAnimationDuration = clayer.properties.defaultMoveAnimationDuration;
		this.fadeAnimationDuration = clayer.properties.defaultFadeAnimationDuration;
	
		if (clayer.properties.useTransitions) {
			if (clayer.properties.useTransforms && this.accelerated) {
				this.$element.css(Modernizr.prefixed('TransitionProperty'), 'transform, width, height, opacity');
			} else {
				this.$element.css(Modernizr.prefixed('TransitionProperty'), 'left, top, width, height, opacity');
			}
			this.$element.css(Modernizr.prefixed('TransitionDuration'), '0s');
			this.$element.css(Modernizr.prefixed('TransitionTimingFunction'), 'ease-in-out');
		}
	},
	setX: function(x, animate) {
		this.setPosition(x, this.y, animate);
	},
	setY: function(y, animate) {
		this.setPosition(this.x, y, animate);
	},
	setPosition: function(x, y, animate) {
		if (this.x === x && this.y === y) return;
		this.x = x;
		this.y = y;
		this.updateElementPosition(animate);
	},
	setOffset: function(x, y, animate) {
		if (this.offsetX === x && this.offsetY === y) return;
		this.offsetX = x;
		this.offsetY = y;
		this.updateElementPosition(animate);
	},
	setWidth: function(width, animate) {
		if (this.width === width) return;
		this.width = width;
		this.setAnimatableProperty('width', width, 'px', animate ? this.moveAnimationDuration : 0);
	},
	setHeight: function(height, animate) {
		if (this.height === height) return;
		this.height = height;
		this.setAnimatableProperty('height', height, 'px', animate ? this.moveAnimationDuration : 0);
	},
	setOpacity: function(opacity, animate) {
		if (this.opacity === opacity) return;
		this.opacity = opacity;
		this.setAnimatableProperty('opacity', opacity, '', animate ? this.fadeAnimationDuration : 0);
	},
	show: function(animate) {
		if (!this.hidden) return;
		this.hidden = false;
		if (this.timeout !== null) {
			window.clearTimeout(this.timeout);
			this.timeout = null;
		}
		this.setAnimatableProperty('opacity', 0, '', 0);
		this.$element.css('display', 'block');
		this.setOpacity(this.opacity, animate);
	},
	hide: function(animate) {
		if (this.hidden) return;
		this.hidden = true;
		if (this.timeout !== null) {
			window.clearTimeout(this.timeout);
			this.timeout = null;
		}
		this.setAnimatableProperty('opacity', 0, '', animate ? this.fadeAnimationDuration : 0);
		var that = this;
		this.timeout = window.setTimeout(function() {
			that.$element.css('display', 'none');
			that.timeout = null;
		}, animate ? this.fadeAnimationDuration : 0);
	},
	toggle: function() {
		if (this.hidden) this.show();
		else this.hide();
	},
	setAccelerated: function(value) {
		this.accelerated = value;
	},
	setAnimationDuration: function(move, fade) {
		this.moveAnimationDuration = move;
		this.fadeAnimationDuration = fade;
	},
	remove: function() {
		this.$element.remove();
	},
	/// INTERNAL FUNCTIONS ///
	updateElementPosition: function (animate) {
		animate = animate || false;
		var x = this.x+this.offsetX, y = this.y+this.offsetY;

		if (clayer.properties.useTransitions && clayer.properties.useTransforms && this.accelerated) {
			if (animate && this.moveAnimationDuration > 0) {
				this.$element.css(Modernizr.prefixed('TransitionDuration'), '' + (0.001 * this.moveAnimationDuration) + 's');
			}

			var translation = clayer.properties.useTransforms3D ?
				'translate3d(' + x + 'px,' + y + 'px, 0) ' :
				'translate('   + x + 'px,' + y + 'px) ';

			this.$element.css(Modernizr.prefixed('Transform'), translation);
		} else {
			this.setAnimatableProperty('left', x, 'px', animate ? this.moveAnimationDuration : 0);
			this.setAnimatableProperty('top', y, 'px', animate ? this.moveAnimationDuration : 0);
		}
	},
	setAnimatableProperty: function (name, value, suffix, animationDuration) {
		suffix = suffix || '';
		animationDuration = animationDuration || 0;
		if (animationDuration > 0) {
			if (clayer.properties.useTransitions) {
				this.$element.css(Modernizr.prefixed('TransitionDuration'), '' + (0.001 * animationDuration) + 's');
				this.$element.css(name, '' + value + suffix);
			} else {
				this.$element.animate({name: '' + value + suffix}, animationDuration);
			}
		} else {
			this.$element.css(name, '' + value + suffix);
		}
	}
};
*/

clayer.Touchable = function() { return this.init.apply(this, arguments); };
clayer.Touchable.prototype = {
	init: function($element, delegate) {
		this.$element = $element;
		this.$document = $($element[0].ownerDocument);
		this.delegate = delegate;

		this.mouseDown = _(this.mouseDown).bind(this);
		this.mouseMove = _(this.mouseMove).bind(this);
		this.mouseUp = _(this.mouseUp).bind(this);
		this.touchStart = _(this.touchStart).bind(this);
		this.touchMove = _(this.touchMove).bind(this);
		this.touchEnd = _(this.touchEnd).bind(this);

		this.documentEvents = {
			mousemove: this.mouseMove,
			mouseup: this.mouseUp,
			touchmove: this.touchMove,
			touchend: this.touchEnd,
			touchcancel: this.touchEnd
		};

		this.setTouchable(true);
	},

	setTouchable: function(isTouchable) {
		if (this.isTouchable === isTouchable) return;
		this.isTouchable = isTouchable;

		if (isTouchable) {
			this.$element.on({
				mousedown: this.mouseDown,
				touchstart: this.touchStart
			});
		}
		else {
			this.$element.off('mousedown touchstart');
			this.$document.off(this.documentEvents);
		}
	},

	mouseDown: function(event) {
		if (this.isTouchable) {
			this.$document.on({
				mousemove: this.mouseMove,
				mouseup: this.mouseUp
			});
			
			this.touch = new clayer.Touch(this.$element, event);
			this.delegate.touchDown(this.touch);
		}
		return false;
	},

	mouseMove: function(event) {
		if (this.isTouchable && this.touch) {
			this.touch.touchMove(event);
			this.delegate.touchMove(this.touch);
		}
		return false;
	},

	mouseUp: function(event) {
		if (this.isTouchable && this.touch) {
			this.touch.touchUp(event);
			this.delegate.touchUp(this.touch);
			
			delete this.touch;
		}
		this.$document.off(this.documentEvents);
		return false;
	},

	touchStart: function(event) {
		if (!this.isTouchable || this.touch || event.originalEvent.touches.length > 1) {
			// only single touch for now
			this.touchEnd(event);
		} else {
			this.$document.on({
				touchmove: this.touchMove,
				touchend: this.touchEnd,
				touchcancel: this.touchEnd
			});
		
			this.touch = new clayer.Touch(this.$element, event.originalEvent.touches[0]);
			this.touchDown(this.touch);
		}
		return false;
	},

	touchMove: function(event) {
		if (this.isTouchable && this.touch) {
			this.touch.touchMove(event.originalEvent.touches[0]);
			this.delegate.touchMove(this.touch);
		}
		return false;
	},

	touchEnd: function(event) {
		if (this.isTouchable && this.touch) {
			this.touch.touchUp(event.originalEvent.touches[0]);
			this.delegate.touchUp(this.touch);
			
			delete this.touch;
		}
		this.$document.off(this.documentEvents);
		return false;
	}
};

clayer.Touch = function() { return this.init.apply(this, arguments); };
clayer.Touch.prototype = {
	init: function($element, event) {
		this.$element = $element;
		this.globalPoint = { x: event.pageX, y: event.pageY };
		this.translation = { x:0, y:0 };
		this.deltaTranslation = { x:0, y:0 };
		this.localPoint = { x:0, y:0 };
		this.updateLocalPoint();

		this.event = event;
		this.timestamp = event.timeStamp;
		this.downTimestamp = this.timestamp;
		this.hasMoved = false;
		this.wasTap = false;
	},

	touchMove: function(event) {
		this.event = event;
		this.timestamp = event.timeStamp;
		this.updatePositions();
	},

	touchUp: function(event) {
		this.event = event;
		this.timestamp = event.timeStamp;
		this.wasTap = !this.hasMoved && (this.getTimeSinceGoingDown() < 300);
	},

	getTimeSinceGoingDown: function () {
		return this.timestamp - this.downTimestamp;
	},

	resetDeltaTranslation: function() {
		this.deltaTranslation.x = 0;
		this.deltaTranslation.y = 0;
	},

	updatePositions: function() {
		var dx = this.event.pageX - this.globalPoint.x;
		var dy = this.event.pageY - this.globalPoint.y;
		this.translation.x += dx;
		this.translation.y += dy;
		this.deltaTranslation.x += dx;
		this.deltaTranslation.y += dy;
		this.globalPoint.x = this.event.pageX;
		this.globalPoint.y = this.event.pageY;
		this.updateLocalPoint();

		if (Math.abs(this.translation.x) > 10 || Math.abs(this.translation.y) > 10) this.hasMoved = true;
	},

	updateLocalPoint: function() {
		var offset = this.$element.offset();
		this.localPoint.x = this.globalPoint.x - offset.left;
		this.localPoint.y = this.globalPoint.y - offset.left;
	}
};

clayer.Slider = function() { return this.init.apply(this, arguments); };
clayer.Slider.prototype = {
	init: function($element, delegate, valueWidth) {
		this.$element = $element;
		this.$element.addClass('clayer-slider');
		this.delegate = delegate;

		this.valueWidth = valueWidth || 1;
		this.markerValue = 0;
		this.knobValue = 0;

		this.$container = $('<div class="clayer-slider-container"></div>');
		this.$element.append(this.$container);

		this.$bar = $('<div class="clayer-slider-bar"></div>');
		this.$container.append(this.$bar);

		this.$segmentContainer = $('<div class="clayer-slider-segment-container"></div>');
		this.$bar.append(this.$segmentContainer);

		this.$marker = $('<div class="clayer-slider-marker"></div>');
		this.markerWidth = Math.min(this.valueWidth, 10);
		this.$marker.width(this.markerWidth);
		this.$bar.append(this.$marker);

		this.$knob = $('<div class="clayer-slider-knob"></div>');
		this.$container.append(this.$knob);

		this.$element.on('mousemove', _(this.mouseMove).bind(this));
		this.$element.on('mouseleave', _(this.mouseLeave).bind(this));
		this.touchable = new clayer.Touchable(this.$element, this);

		this.bounceTimer = null;

		this.renderKnob();
		this.renderMarker();
	},

	remove: function() {
		this.touchable.setTouchable(false);
		this.$element.off('mousemove mouseleave');
		this.$segmentContainer.remove();
		this.$marker.remove();
		this.$knob.remove();
		this.$bar.remove();
		this.$container.remove();
	},

	setSegments: function(ranges) {
		this.$segmentContainer.html('');
		for (var i=0; i<ranges.length; i++) {
			var range = ranges[i];
			var $segment = $('<div class="clayer-slider-segment"></div>');
			this.$segmentContainer.append($segment);

			$segment.css('left', range.start*this.valueWidth);
			$segment.width((range.end - range.start + 1)*this.valueWidth);
			$segment.css('background-color', range.color);
		}
	},

	setValue: function(value) {
		this.markerValue = this.knobValue = value;
		this.renderKnob();
		this.renderMarker();
	},

	changed: function() {
		this.delegate.sliderChanged(this.knobValue);
	},

	updateKnob: function(x) {
		x = Math.max(0, Math.min(this.$element.width()-1, x));
		this.updateKnobValue(Math.floor(x/this.valueWidth));
	},

	updateKnobValue: function(knobValue) {
		if (this.knobValue !== knobValue) {
			this.knobValue = knobValue;
			this.renderKnob();
			this.changed();
		}
	},

	updateMarker: function(x) {
		x = Math.max(0, Math.min(this.$element.width()-1, x));
		var markerValue = Math.floor(x/this.valueWidth);
		if (this.markerValue !== markerValue) {
			this.knobValue = this.markerValue = markerValue;
			this.renderKnob();
			this.renderMarker();
			this.changed();
		}
	},

	renderKnob: function() {
		this.$knob.css('left', (this.knobValue+0.5)*this.valueWidth);

		if (this.bounceTimer !== null) {
			this.bounceProgress = Math.min(this.bounceProgress + 0.04, 1);
			var p = this.bounceProgress;
			var jumpY = (p < 0.5) ? (15*(1-Math.pow(4*p-1, 2))) : (4*(1-Math.pow(4*(p-0.5)-1, 2)));
			this.$knob.css('top', -jumpY);
			if (this.bounceProgress >= 1) {
				clearInterval(this.bounceTimer);
				this.bounceTimer = null;
			}
		}
	},

	renderMarker: function() {
		this.$marker.css('left', (this.markerValue+0.5)*this.valueWidth - this.markerWidth/2);
	},

	mouseMove: function(event) {
		this.updateKnob(event.pageX - this.$element.offset().left);
	},

	mouseLeave: function(event) {
		this.updateKnobValue(this.markerValue);
	},

	touchDown: function(touch) {
		this.updateMarker(touch.localPoint.x);
	},

	touchMove: function(touch) {
		this.updateMarker(touch.localPoint.x);
	},

	touchUp: function(touch) {
		this.updateMarker(touch.localPoint.x);
		if (touch.wasTap) {
			this.bounce();
		}
	},

	bounce: function () {
		if (this.bounceTimer === null) {
			this.bounceTimer = setInterval(_(this.renderKnob).bind(this), 20);
			this.bounceProgress = 0;
		}
	}
};

module.exports = clayer;

},{}],3:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $.widget('oal.colorPicker', {
    options: {
      size: 250,
      format: 'hsla'
    },
    _create: function() {
      var alpha, lightness;
      this.lightness = 0.0;
      this.alpha = 1.0;
      this.fromCenter = 0.0;
      this.pickerPos = [0, 0];
      this.parent = $('<div class="colorpicker"></div>');
      this.parent.css({
        width: this.options.size + 36
      });
      this.element.addClass('colorInput');
      this.element.css({
        width: this.options.size + 36
      });
      this.element.wrap(this.parent);
      this.canvasId = "colorpicker" + (parseInt(Math.random() * 9999));
      this.wheel = $("<canvas id='" + this.canvasId + "' width='" + this.options.size + "' height='" + this.options.size + "'></canvas>");
      this.element.before(this.wheel);
      this._draw();
      lightness = $('<div class="circle lightness"></div>').css({
        width: this.options.size,
        height: this.options.size
      });
      this.element.before(lightness);
      alpha = $('<div class="circle alpha"></div>').css({
        width: this.options.size,
        height: this.options.size
      });
      this.element.before(alpha);
      this.lightnessSlider = $('<div class="lightness slider"><span class="handle"></span></div>').css({
        height: this.options.size
      });
      this.element.before(this.lightnessSlider);
      this.lightnessSlider.find('span.handle').draggable({
        containment: 'parent',
        drag: (function(_this) {
          return function(e, ui) {
            return _this._setLightness(ui.position.top, true);
          };
        })(this)
      });
      this.alphaSlider = $('<div class="alpha slider"><span class="handle"></span></div>').css({
        height: this.options.size
      });
      this.element.before(this.alphaSlider);
      this.alphaSlider.find('span.handle').draggable({
        containment: 'parent',
        drag: (function(_this) {
          return function(e, ui) {
            return _this._setAlpha(ui.position.top, true);
          };
        })(this)
      });
      this.picker = $('<span class="picker"></span>').css({
        top: this.options.size / 2,
        left: this.options.size / 2
      });
      this.element.before(this.picker);
      this.picker.draggable({
        drag: (function(_this) {
          return function(e, ui) {
            var x, y;
            x = ui.position.left - _this.options.size / 2;
            y = ui.position.top - _this.options.size / 2;
            return _this._setHue(x, y, true);
          };
        })(this)
      });
      this.element.on('change', (function(_this) {
        return function() {
          var a, b, color, g, h, hsla, l, pattern, r, rgb, rgba, s, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
          color = _this.element.val();
          if (color.indexOf('hsla(') === 0) {
            pattern = /^hsla\((\d+),\s+(\d+(?:.\d+)?)%,\s+(\d+(?:.\d+)?)%,\s+(\d+(?:.\d+)?)\)$/;
            _ref = pattern.exec(color), hsla = _ref[0], h = _ref[1], s = _ref[2], l = _ref[3], a = _ref[4];
            return _this.setColor(h, s, l, a);
          } else if (color.indexOf('hsl(') === 0) {
            pattern = /^hsl\((\d+),\s+(\d+(?:.\d+)?)%,\s+(\d+(?:.\d+)?)%\)$/;
            _ref1 = pattern.exec(color), hsla = _ref1[0], h = _ref1[1], s = _ref1[2], l = _ref1[3];
            return _this.setColor(h, s, l);
          } else if (color.indexOf('rgba(') === 0) {
            pattern = /^rgba\((\d{1,3}),[ ]?(\d{1,3}),[ ]?(\d{1,3}),[ ]?(\d?.\d{1,2})\)$/;
            _ref2 = pattern.exec(color), rgba = _ref2[0], r = _ref2[1], g = _ref2[2], b = _ref2[3], a = _ref2[4];
            _ref3 = _this._toHsla(r, g, b, a), h = _ref3[0], s = _ref3[1], l = _ref3[2], a = _ref3[3];
            return _this.setColor(h, s, l, a);
          } else if (color.indexOf('rgb(') === 0) {
            pattern = /^rgb\((\d{1,3}),[ ]?(\d{1,3}),[ ]?(\d{1,3})\)$/;
            _ref4 = pattern.exec(color), rgb = _ref4[0], r = _ref4[1], g = _ref4[2], b = _ref4[3];
            _ref5 = _this._toHsla(r, g, b), h = _ref5[0], s = _ref5[1], l = _ref5[2], a = _ref5[3];
            return _this.setColor(h, s, l, a);
          } else if (color.indexOf('#') === 0 && color.length === 4) {
            r = parseInt(color[1] + color[1], 16);
            g = parseInt(color[2] + color[2], 16);
            b = parseInt(color[3] + color[3], 16);
            _ref6 = _this._toHsla(r, g, b), h = _ref6[0], s = _ref6[1], l = _ref6[2], a = _ref6[3];
            return _this.setColor(h, s, l, a);
          } else if (color.indexOf('#') === 0 && color.length === 7) {
            r = parseInt(color[1] + color[2], 16);
            g = parseInt(color[3] + color[4], 16);
            b = parseInt(color[5] + color[6], 16);
            _ref7 = _this._toHsla(r, g, b), h = _ref7[0], s = _ref7[1], l = _ref7[2], a = _ref7[3];
            return _this.setColor(h, s, l, a);
          }
        };
      })(this));
      alpha.on('click', (function(_this) {
        return function(e) {
          var offset, x, y;
          offset = $(e.target).offset();
          x = e.clientX - offset.left - (_this.options.size / 2);
          y = e.clientY - offset.top - (_this.options.size / 2);
          _this._setHue(x, y);
          return _this._update();
        };
      })(this));
      this.lightnessSlider.on('click', (function(_this) {
        return function(e) {
          var offset;
          offset = $(e.target).offset();
          lightness = Math.abs(1 - (e.clientY - offset.top) / _this.options.size) * 100;
          _this._setLightness(lightness, false);
          return _this._update();
        };
      })(this));
      return this.alphaSlider.on('click', (function(_this) {
        return function(e) {
          var offset;
          offset = $(e.target).offset();
          alpha = Math.abs(1 - (e.clientY - offset.top) / _this.options.size);
          _this._setAlpha(alpha, false);
          return _this._update();
        };
      })(this));
    },
    _draw: function() {
      var c, canvas, color, half, i, max, radialGradient, size, _i;
      canvas = document.getElementById(this.canvasId);
      c = canvas.getContext('2d');
      size = this.options.size;
      half = size / 2;
      max = size * 1.25;
      for (i = _i = 0; 0 <= max ? _i <= max : _i >= max; i = 0 <= max ? ++_i : --_i) {
        c.save();
        color = i / max;
        c.strokeStyle = "hsl(" + (color * 360) + ",100%,50%)";
        c.translate(half, half);
        c.rotate(Math.PI * 2 * i / max);
        c.beginPath();
        c.lineWidth = 3;
        c.moveTo(0, 0);
        c.lineTo(0, half);
        c.stroke();
        c.restore();
      }
      radialGradient = c.createRadialGradient(half, half, 0, half, half, half);
      radialGradient.addColorStop(0, 'hsl(0, 0%, 50%)');
      radialGradient.addColorStop(1, 'hsla(0, 0%, 50%, 0)');
      c.fillStyle = radialGradient;
      return c.fillRect(0, 0, this.options.size, this.options.size);
    },
    _setHue: function(x, y, pos) {
      if (pos == null) {
        pos = false;
      }
      this.fromCenter = Math.sqrt(x * x + y * y);
      this.pickerPos = [x, y];
      if (pos) {
        this._update();
        if (this.fromCenter >= this.options.size / 2) {
          return false;
        }
      } else {
        return this.picker.css({
          top: y + this.options.size / 2,
          left: x + this.options.size / 2
        });
      }
    },
    _setLightness: function(l, pos) {
      var color;
      if (pos == null) {
        pos = false;
      }
      if (pos) {
        this.lightness = (l / this.options.size) - 0.5;
        this._update();
      } else {
        this.lightness = 0.5 - (l / 100);
        this.lightnessSlider.find('span.handle').css({
          top: (this.lightness + 0.5) * this.options.size
        });
      }
      if (this.lightness < 0) {
        color = "rgba(255,255,255," + (Math.abs(this.lightness * 2)) + ")";
      } else {
        color = "rgba(0,0,0," + (this.lightness * 2) + ")";
      }
      return this.wheel.next().css({
        backgroundColor: color
      });
    },
    _setAlpha: function(a, pos) {
      if (pos == null) {
        pos = false;
      }
      if (pos) {
        this.alpha = Math.abs(1 - a / this.options.size);
        this._update();
      } else {
        this.alpha = a;
        this.alphaSlider.find('span.handle').css({
          top: Math.abs(1 - this.alpha) * this.options.size
        });
      }
      return this.wheel.next().next().css({
        opacity: Math.abs(1 - this.alpha)
      });
    },
    _generateColor: function() {
      var a, h, l, s;
      h = parseInt(180 - (Math.atan2(this.pickerPos[0], this.pickerPos[1]) + Math.PI) / (Math.PI * 2) * 360);
      if (h < 0) {
        h += 360;
      }
      s = this.fromCenter / this.options.size * 100 * 2;
      l = Math.abs(this.lightness - 0.5) * 100;
      a = this.alpha;
      if (h > 360) {
        h = 360;
      }
      if (s > 100) {
        s = 100;
      }
      if (l > 100) {
        l = 100;
      }
      if (a > 1.0) {
        a = 1.0;
      }
      s = Math.round(s * 100) / 100;
      l = Math.round(l * 100) / 100;
      a = Math.round(a * 100) / 100;
      return [h, s, l, a];
    },
    _update: function() {
      var a, b, bs, colorString, g, gs, h, l, r, response, rs, s, _ref, _ref1, _ref2, _ref3, _ref4;
      _ref = this._generateColor(), h = _ref[0], s = _ref[1], l = _ref[2], a = _ref[3];
      switch (this.options.format) {
        case 'hsla':
          colorString = "hsla(" + h + ", " + s + "%, " + l + "%, " + a + ")";
          break;
        case 'hsl':
          colorString = "hsl(" + h + ", " + s + "%, " + l + "%)";
          break;
        case 'rgba':
          _ref1 = this._toRgba(h, s, l, a), r = _ref1[0], g = _ref1[1], b = _ref1[2], a = _ref1[3];
          colorString = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
          break;
        case 'rgb':
          _ref2 = this._toRgba(h, s, l), r = _ref2[0], g = _ref2[1], b = _ref2[2], a = _ref2[3];
          colorString = "rgb(" + r + ", " + g + ", " + b + ")";
          break;
        case 'hex':
          _ref3 = this._toRgba(h, s, l), r = _ref3[0], g = _ref3[1], b = _ref3[2], a = _ref3[3];
          rs = r.toString(16);
          gs = g.toString(16);
          bs = b.toString(16);
          if (rs.length === 1) {
            rs = '0' + rs;
          }
          if (gs.length === 1) {
            gs = '0' + gs;
          }
          if (bs.length === 1) {
            bs = '0' + bs;
          }
          colorString = "#" + rs + gs + bs;
          break;
        default:
          console.error('Color format not supported!');
      }
      this.element.val(colorString);
      this.picker.css({
        background: colorString
      });
      if ((_ref4 = this.options.format) === 'hsl' || _ref4 === 'hsla') {
        response = {
          hue: h,
          saturation: s,
          lightness: l
        };
      } else {
        response = {
          red: r,
          green: g,
          blue: b
        };
      }
      if (__indexOf.call(this.options.format, 'a') >= 0) {
        response.alpha = a;
      }
      response.color = colorString;
      return this._trigger('colorChange', null, response);
    },
    _toRgba: function(h, s, l, a) {
      var b, g, hue2rgb, p, q, r;
      if (a == null) {
        a = 1.0;
      }
      h = h / 360;
      s = s / 100;
      l = l / 100;
      if (s === 0.0) {
        r = l;
        g = l;
        b = l;
      } else {
        hue2rgb = function(p, q, t) {
          if (t < 0) {
            t += 1;
          }
          if (t > 1) {
            t -= 1;
          }
          if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
          }
          if (t < 1 / 2) {
            return q;
          }
          if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
          }
          return p;
        };
        if (l < 0.5) {
          q = l * (1 + s);
        } else {
          q = l + s - l * s;
        }
        p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return [parseInt(r * 255), parseInt(g * 255), parseInt(b * 255), a];
    },
    _toHsla: function(r, g, b, a) {
      var add, d, h, l, max, min, s;
      if (a == null) {
        a = 1.0;
      }
      r /= 255;
      g /= 255;
      b /= 255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      h = (max + min) / 2;
      s = h;
      l = h;
      if (max === min) {
        h = 0;
        s = 0;
      } else {
        d = max - min;
        if (l > 0.5) {
          s = d / (2 - max - min);
        } else {
          s = d / (max + min);
        }
        switch (max) {
          case r:
            if (g < b) {
              add = 6;
            } else {
              add = 0;
            }
            h = (g - b) / d + add;
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
        }
        h /= 6;
      }
      return [parseInt(h * 360), Math.round(s * 1000) / 10, Math.round(l * 1000) / 10, a];
    },
    setColor: function(h, s, l, a) {
      var dist, x, y;
      if (a == null) {
        a = 1.0;
      }
      if (typeof h === 'string' && (h.indexOf('hsl') === 0 || h.indexOf('rgb') === 0 || h.indexOf('#') === 0)) {
        this.element.val(h);
        this.element.trigger('change');
        return true;
      }
      h = parseInt(h);
      h += 90;
      if (h > 360) {
        h %= 360;
      }
      if (h > 0) {
        dist = s / 100 * (this.options.size / 2);
        x = Math.cos(h / 360 * (Math.PI * 2)) * dist;
        y = Math.sin(h / 360 * (Math.PI * 2)) * dist;
        this._setHue(x, y);
      }
      if (s >= 0 && s <= 100) {
        this.saturation = s;
      } else if (s > 100) {
        this.saturation = 100;
      } else {
        this.saturation = 0;
      }
      if (l > 100) {
        l = 100;
      } else if (l < 0) {
        l = 0;
      }
      this._setLightness(l);
      if (a > 1.0) {
        a = 1.0;
      } else if (a < 0.0) {
        a = 0.0;
      }
      this._setAlpha(a);
      return this._update();
    },
    _setOption: function(key, value) {
      if (key === 'format' && (value === 'hsla' || value === 'hsl' || value === 'rgba' || value === 'rgb' || value === 'hex')) {
        this.options.format = value;
        this._update();
      }
      return $.Widget.prototype._setOption.apply(this, arguments);
    }
  });

}).call(this);

},{}],4:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

module.exports = function(editor) {
	editor.Code = function() { return this.init.apply(this, arguments); };

	editor.Code.prototype = {
		init: function(text) {
			this.text = '' + text;
			this.errorLine = null;
		},

		getText: function() {
			return this.text;
		},

		getLine: function(line) {
			this.makeLines();
			return (this.lines[line-1] === undefined ? null : this.lines[line-1]);
		},

		lineColumnToOffset: function(line, column) {
			this.makeOffsets();
			return (this.offsets[line-1] === undefined ? null : this.offsets[line-1] + column);
		},

		posToOffset: function(loc) {
			return this.lineColumnToOffset(loc.line, loc.column);
		},

		rangeToText: function(textLoc) {
			return this.text.substring(this.lineColumnToOffset(textLoc.line, textLoc.column), this.lineColumnToOffset(textLoc.line2, textLoc.column2));
		},

		offsetToLoc: function(offset) {
			this.makeOffsets();
			// TODO: implement binary search
			for (var i=0; i<this.lines.length; i++) {
				if (offset < this.offsets[i]) {
					return {line: i, column: offset-(this.offsets[i-1] || 0)};
				}
			}
			return {line: this.lines.length, column: offset-this.offsets[this.lines.length-1]};
		},

		insertAtOffset: function(offset, text) {
			return this.text.substring(0, offset) + text + this.text.substring(offset);
		},

		removeOffsetRange: function(offset1, offset2) {
			return this.text.substring(0, offset1) + this.text.substring(offset2);
		},

		replaceOffsetRange: function(offset1, offset2, text) {
			return this.text.substring(0, offset1) + text + this.text.substring(offset2);
		},

		blockToLeftColumn: function(line1, line2) {
			this.makeLines();
			var result = Infinity;
			for (var i=line1; i<=line2; i++) {
				result = Math.min(result, this.lines[i-1].match(/^ */)[0].length);
				if (result <= 0) return result;
			}
			return result;
		},

		blockToRightColumn: function(line1, line2) {
			this.makeLines();
			var result = 0;
			for (var i=line1; i<=line2; i++) {
				result = Math.max(result, this.lines[i-1].length);
			}
			return result;
		},
		
		/// INTERNAL FUNCTIONS ///
		makeLines: function() {
			if (this.lines !== undefined) return;
			this.lines = this.text.split(/\n/);
		},

		makeOffsets: function() {
			if (this.offsets !== undefined) return;
			this.makeLines();
			this.offsets = [0];
			for (var i=1; i<this.lines.length; i++) {
				// add one for the actual newline character
				this.offsets[i] = this.offsets[i-1] + this.lines[i-1].length + 1;
			}
		}
	};
};

},{}],5:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

var clayer = require('../clayer');

module.exports = function(editor) {
	editor.editables = {};

	editor.editables.NumberEditable = function() { return this.build.apply(this, arguments); };
	editor.editables.CycleEditable = function() { return this.build.apply(this, arguments); };
	editor.editables.ColorEditable = function() { return this.build.apply(this, arguments); };

	var addCommonMethods = function(type, editable) {
		editable.build = function(node, surface, delegate, parseValue, makeValue) {
			this.surface = surface;
			this.delegate = delegate;
			this.parseValue = parseValue;
			this.makeValue = makeValue;

			this.loc = {
				line: node.lineLoc.line,
				line2: node.lineLoc.line+1,
				column: node.lineLoc.column,
				column2: node.lineLoc.column2
			};

			this.text = delegate.getEditablesText(node);
			this.finalText = this.text;
			this.valid = this.parseValue(this.text);

			this.$marking = $('<div class="editor-marking editor-editable editor-' + type + '-editable"></div>');
			this.surface.addElement(this.$marking);
			this.init();

			this.updateMarking();
		};

		editable.offsetColumn = function(column, amount) {
			if (this.loc.column2 > column) {
				this.loc.column2 += amount;
				if (this.loc.column > column) {
					this.loc.column += amount;
				}
				this.updateMarking();
			}
		};

		editable.show = function() {
			this.$marking.addClass('editor-editable-show');
		};

		editable.hide = function() {
			this.$marking.removeClass('editor-editable-show');
		};

		/// INTERNAL FUNCTIONS ///
		editable.updateMarking = function() {
			if (!this.valid) this.remove();
			this.$marking.css(this.surface.makeElementLocationRange(this.loc));
		};

		editable.updateValue = function() {
			this.delegate.editableReplaceCode(this.loc.line, this.loc.column, this.loc.column2, this.text);
		};

		return editable;
	};

	editor.editables.CycleEditable.prototype = addCommonMethods('cycle', {
		init: function() {
			this.$marking.on('click', _(this.cycle).bind(this));
		},
		remove: function() {
			this.$marking.remove();
		},
		cycle: function() {
			this.text = this.makeValue();
			this.updateValue();
			this.valid = this.parseValue(this.text);
		}
	});

	editor.editables.NumberEditable.prototype = addCommonMethods('number', {
		init: function() {
			this.$body = $('body');
			this.hasTooltip = false;
			this.touchable = new clayer.Touchable(this.$marking, this);
		},

		remove: function() {
			this.hideTooltip();
			this.$marking.remove();
			this.touchable.setTouchable(false);
		},

		/// INTERNAL FUNCTIONS ///
		showTooltip: function() {
			if (!this.hasTooltip) {
				this.hasTooltip = true;
				this.$marking.tooltip({
					title: '&larr; drag &rarr;',
					placement: 'bottom'
				});
			}
			this.$marking.tooltip('show');
		},

		hideTooltip: function() {
			if (this.hasTooltip) {
				this.$marking.tooltip('hide');
			}
		},

		touchDown: function(touch) {
			this.$marking.addClass('active');
			this.$body.addClass('editor-number-editable-dragging');
			this.surface.getTextArea().addClass('editor-number-editable-dragging');
			this.hideTooltip();
		},

		touchMove: function(touch) {
			this.text = this.makeValue(touch.translation.x);
			this.updateValue();
		},

		touchUp: function(touch) {
			this.$marking.removeClass('active');
			this.$body.removeClass('editor-number-editable-dragging');
			this.surface.getTextArea().removeClass('editor-number-editable-dragging');
			this.valid = this.parseValue(this.text);
			if (touch.wasTap) {
				this.showTooltip();
			}
		}
	});

	editor.editables.ColorEditable.prototype = addCommonMethods('color', {
		init: function() {
			this.$colorPicker = $('<div class="editor-editable-colorpicker"></div>');
			this.box = new editor.Box();
			this.surface.addElementToTop(this.box.getElement());
			this.box.html(this.$colorPicker, this.surface.makeElementLocationRange(this.loc));
			this.$colorPicker.colorPicker({
				format: this.colorData.format,
				size: 200,
				colorChange: _(this.colorChange).bind(this)
			});
			this.$colorPicker.colorPicker('setColor', this.colorData.value);
			this.$marking.on('click', _(this.click).bind(this));
		},

		/// INTERNAL FUNCTIONS ///
		remove: function() {
			this.$marking.remove();
			this.box.remove();
		},

		colorChange: function(event, ui) {
			this.text = this.makeValue(ui.color);
			this.updateValue();
		},

		click: function(event) {
			this.valid = this.parseValue(this.text);
			if (this.box.$element.is(':visible')) {
				this.$marking.removeClass('active');
				this.box.$element.fadeOut(150);
			} else {
				this.$marking.addClass('active');
				this.box.$element.fadeIn(150);
				this.box.updatePosition(this.surface.makeElementLocationRange(this.loc));
			}
		}
	});
};

},{"../clayer":2}],6:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

var clayer = require('../clayer');


module.exports = function(editor) {
	editor.Editor = function() { return this.init.apply(this, arguments); };

	editor.Editor.prototype = {
		init: function(options, language, $div, $toolbar, $stepbar) {
			this.language = language;
			this.eventHandlers = [];

			this.surface = new editor.Surface($div, this);

			if (options.hideToolbar) {
				$toolbar.hide();
				this.toolbar = null;
			} else {
				$toolbar.show();
				this.toolbar = new editor.Toolbar($toolbar, this);
			}

			if (options.hideStepbar) {
				$stepbar.hide();
				this.stepbar = null;
			} else {
				$stepbar.show();
				this.stepbar = new editor.Stepbar($stepbar, this);
			}

			this.currentEditableLine = 0;
			this.previousEditableLine = 0;
			this.editables = [];
			this.editablesByLine = [];

			this.highlighting = false;
			this.currentHighlightNode = null;
			this.currentHighlightLine = 0;
			this.surface.enableMouse();

			this.activeTimeHighlights = [];

			this.autoCompletionEnabled = false;

			this.updateTimeout = null;

			this.runner = null;
			this.textChangeCallback = function(){};

			this.surface.setText(options.text || '');
		},

		remove: function() {
			this.removeEditables();
			this.surface.remove();
			this.toolbar.remove();
			this.stepbar.remove();
		},

		updateSettings: function(runner, outputs) {
			this.runner = runner;
			this.outputs = outputs;
			this.update();
			this.refreshEditables();
		},

		getText: function() {
			return this.code.text;
		},

		setText: function(text) {
			this.surface.setText(text);
			this.surface.resetCursor();
			this.update();
			this.refreshEditables();
		},

		setTextChangeCallback: function(callback) {
			this.textChangeCallback = callback;
		},

		bindEventHandler: function(eventHandler) {
			this.eventHandlers.push(eventHandler);
		},

		callEventHandlers: function(funcName) {
			for (var i=0; i<this.eventHandlers.length; i++) {
				var eventHandler = this.eventHandlers[i];
				eventHandler[funcName].apply(eventHandler, [].slice.call(arguments, 1));
			}
		},

		callOutputs: function(funcName) {
			for (var outputName in this.outputs) {
				if (this.outputs[outputName][funcName] !== undefined) {
					this.outputs[outputName][funcName].apply(this.outputs[outputName], [].slice.call(arguments, 1));
				}
			}
		},

		enable: function() {
			this.surface.enable();
			this.update();
		},

		disable: function() {
			this.surface.hideAutoCompleteBox();
			this.update();
			this.runner.disable();
			this.callEventHandlers('disable');
			this.surface.disable();
		},

		delayedUpdate: function() {
			this.code = new editor.Code(this.surface.getText());
			if (this.updateTimeout === null) {
				this.updateTimeout = setTimeout(_(this.update).bind(this), 5);
			}
		},

		update: function() {
			if (this.updateTimeout !== null) {
				clearTimeout(this.updateTimeout);
				this.updateTimeout = null;
			}
			this.code = new editor.Code(this.surface.getText());
			this.tree = new this.language.Tree(this.code.text);
			if (this.tree.hasError()) {
				this.handleCriticalError(this.tree.getError());
			} else {
				this.run();
			}
		},

		run: function() {
			this.runner.enable();
			this.runner.newTree(this.tree);
			this.updateHighlighting();
		},

		runTemp: function(text) {
			this.tree = new this.language.Tree(text);
			if (!this.tree.hasError()) {
				this.runner.newTree(this.tree);
				this.updateHighlighting();
				this.refreshEditables();
				return true;
			} else {
				this.callOutputs('outputSetError', true);
				return false;
			}
		},

		canRun: function() {
			return !this.tree.hasError() && !this.autoCompletionEnabled;
		},

		canHighlight: function() {
			return this.canRun() && this.runner.isStatic();
		},

		canHighlightTime: function() {
			return this.runner && this.runner.isInteractive() && this.canHighlight();
		},

		canShowEditables: function() {
			return this.canRun();
		},

		handleCriticalError: function(error) {
			this.handleError(error);
			this.runner.disable();
			this.callEventHandlers('disable');
			this.updateHighlighting();
			this.updateEditables();
			this.highlightFunctionNode(null);
			this.callOutputs('outputSetError', true);
		},

		handleError: function(error) {
			this.surface.hideAutoCompleteBox();
			this.surface.showMessage('error', this.makeMessageLoc(error), error.getHTML());
		},

		makeMessageLoc: function(message) {
			return this.makeLoc(message.getLoc(this.tree));
		},

		makeLoc: function(loc) {
			var output = {};
			if (loc.line2 !== undefined) {
				output.line = loc.line;
				output.line2 = loc.line2+1;
				output.column = this.code.blockToLeftColumn(loc.line, loc.line2);
				output.column2 = this.code.blockToRightColumn(loc.line, loc.line2);
			} else {
				output.line = loc.line;
				output.line2 = loc.line+1;
				output.column = loc.column;
				output.column2 = loc.column2 || loc.column;
			}
			return output;
		},

		callTextChangeCallback: function() {
			this.textChangeCallback(this.code.text);
		},

		scrollToError: function() { // callback
			this.handleError(this.runner.getError());
			this.surface.scrollToLine(this.runner.getError().getLoc(this.tree).line);
		},

		userChangedText: function() { // callback
			this.update(); // refreshEditables uses this.tree
			this.refreshEditables();
			this.callTextChangeCallback();
		},

		outputRequestsRerun: function() { //callback
			if (this.canRun()) {
				this.runner.selectBaseEvent();
				return true;
			} else {
				return false;
			}
		},

		getContentLines: function() {
			return this.tree.getNodeLines();
		},

		/// RUNNER CALLBACKS ///
		startEvent: function(context) {
			this.callOutputs('outputStartEvent', context);
		},

		endEvent: function(context) {
			this.callOutputs('outputEndEvent', context);
		},

		clearReload: function() {
			this.callOutputs('outputClearReload');
		},

		clearAllEvents: function() {
			this.callOutputs('outputClearAllEvents');
		},

		popFirstEvent: function() {
			this.callOutputs('outputPopFirstEvent');
		},

		clearEventsToEnd: function() {
			this.callOutputs('outputClearEventsToEnd');
		},

		clearEventsFrom: function(context) {
			this.callOutputs('outputClearEventsFrom', context);
		},

		runnerChanged: function() { // runner callback
			if (!this.autoCompletionEnabled) {
				this.surface.hideAutoCompleteBox();
				if (this.runner.isStepping()) {
					var message = this.runner.getMessage();
					if (message !== null) {
						this.surface.showMessage(message.type.toLowerCase(), this.makeMessageLoc(message), message.getHTML());
						if (this.runner.getEventNum() !== this.lastEventNum || this.runner.getStepNum() !== this.lastStepNum) {
							this.surface.scrollToLine(message.getLoc(this.tree).line);
						}
					}
					this.lastEventNum = this.runner.getEventNum();
					this.lastStepNum = this.runner.getStepNum();
				} else {
					this.lastEventNum = undefined;
					this.lastStepNum = undefined;
					if (this.runner.hasError()) {
						this.handleError(this.runner.getError());
					} else {
						this.surface.hideMessage();
					}
				}
				this.callEventHandlers('update', this.runner);
			}
			this.callOutputs('outputSetError', this.runner.hasError());
			this.updateHighlighting();
			this.updateEditables();
			this.callOutputs('outputSetEventStep', this.runner.getEventNum(), this.runner.getStepNum());
		},

		runnerChangedEvent: function() {
			this.callOutputs('outputSetEventStep', this.runner.getEventNum(), this.runner.getStepNum());
		},

		/// EDITABLES METHODS AND CALLBACKS ///
		refreshEditables: function() {
			if (this.canShowEditables()) {
				this.removeEditables();
				this.editables = this.language.editor.editables.generate(this.tree, editor.editables, this.surface, this);
				for (var i=0; i<this.editables.length; i++) {
					var line = this.editables[i].loc.line;
					if (this.editablesByLine[line] === undefined) {
						this.editablesByLine[line] = [];
					}
					this.editablesByLine[line].push(this.editables[i]);
				}
				this.updateEditables();
			} else {
				this.removeEditables();
			}
		},

		removeEditables: function() {
			for (var i=0; i<this.editables.length; i++) {
				this.editables[i].remove();
			}
			this.editables = [];
			this.editablesByLine = [];
			this.previousEditableLine = 0;
		},

		updateEditables: function() {
			if (this.canShowEditables()) {
				if (this.currentEditableLine !== this.previousEditableLine) {
					this.hideEditables(this.previousEditableLine);
					this.previousEditableLine = this.currentEditableLine;
					if (this.editablesByLine[this.currentEditableLine]) {
						for (var i=0; i<this.editablesByLine[this.currentEditableLine].length; i++) {
							this.editablesByLine[this.currentEditableLine][i].show();
						}
					}
				}
			} else if (this.previousEditableLine > 0) {
				this.hideEditables(this.previousEditableLine);
				this.previousEditableLine = 0;
			}
		},

		hideEditables: function(line) {
			if (this.editablesByLine[line]) {
				for (var i=0; i<this.editablesByLine[line].length; i++) {
					this.editablesByLine[line][i].hide();
				}
			}
		},

		getEditablesText: function(node) { //callback
			return this.code.rangeToText(node.textLoc);
		},

		editableReplaceCode: function(line, column, column2, newText) { // callback
			if (this.editablesByLine[line] === undefined) return;

			var offset1 = this.code.lineColumnToOffset(line, column), 
				offset2 = this.code.lineColumnToOffset(line, column2);

			this.surface.setText(this.code.replaceOffsetRange(offset1, offset2, newText));

			var changeOffset = newText.length - (column2-column);
			if (changeOffset !== 0) {
				for (var i=0; i<this.editablesByLine[line].length; i++) {
					this.editablesByLine[line][i].offsetColumn(column, changeOffset);
				}
			}
			this.delayedUpdate();
			this.surface.restoreCursor(offset2, changeOffset);
			this.callTextChangeCallback();
		},

		/// HIGHLIGHTING METHODS AND CALLBACKS ///
		updateHighlighting: function() {
			if (this.canHighlight()) {
				this.highlighting = true;
				var node = this.tree.getNodeByLine(this.currentHighlightLine);
				if (node !== this.currentHighlightNode) {
					this.currentHighlightNode = node;
					if (node !== null) {
						this.surface.showHighlight(this.makeLoc(node.blockLoc));
						var nodeIds = this.tree.getNodeIdsByRange(node.blockLoc.line, node.blockLoc.line2);
						this.callOutputs('highlightNodes', nodeIds);
						this.callOutputs('highlightCallIds', this.runner.getCallIdsByNodeIds(nodeIds));
					} else {
						this.surface.hideHighlight();
						this.callOutputs('highlightNodes', null);
						this.callOutputs('highlightCallIds', null);
					}
				}
				this.updateTimeHighlighting();
				this.callOutputs('enableHighlighting'); // don't check for !this.highlighting, but always call this
			} else if (this.highlighting) {
				this.highlighting = false;
				this.surface.hideTimeHighlights();
				this.surface.hideHighlight();
				this.callOutputs('disableHighlighting');
				this.currentHighlightNode = null;
				// this.currentHighlightLine = 0;
			}
		},

		// *only* call from updateHighlighting!!
		updateTimeHighlighting: function() {
			if (this.canHighlightTime()) {
				var timeHighlights = this.language.editor.timeHighlights.getTimeHighlights(this.tree);
				for (var i=0; i<this.activeTimeHighlights.length; i++) {
					if (timeHighlights[this.activeTimeHighlights[i]] === undefined) {
						this.activeTimeHighlights.splice(i--, 1);
					}
				}
				this.surface.showTimeHighlights(timeHighlights);
				this.updateActiveTimeHighlights();
			} else {
				this.surface.hideTimeHighlights();
				this.callOutputs('highlightTimeIds', null);
			}
		},

		updateActiveTimeHighlights: function() {
			if (this.activeTimeHighlights.length > 0) {
				var timeIds = [];
				var size = this.runner.getEventTotal();
				for (var i=0; i<size; i++) {
					timeIds[i] = [];
				}
				var highlightsFromTree = this.language.editor.timeHighlights.getTimeHighlights(this.tree);

				for (i=0; i<this.activeTimeHighlights.length; i++) {
					var timeHighlight = highlightsFromTree[this.activeTimeHighlights[i]];
					var nodeIds = this.tree.getNodeIdsByRange(timeHighlight.line, timeHighlight.line2);
					var idsPerContext = this.runner.getAllCallIdsByNodeIds(nodeIds);
					for (var j=0; j<idsPerContext.length; j++) {
						for (var k=0; k<idsPerContext[j].length; k++) {
							if (timeIds[j].indexOf(idsPerContext[j][k]) < 0) {
								timeIds[j].push(idsPerContext[j][k]);
							}
						}
					}
				}
				this.callOutputs('highlightTimeIds', timeIds);
			} else {
				this.callOutputs('highlightTimeIds', null);
			}
		},

		timeHighlightHover: function(name) {
		},

		timeHighlightActivate: function(name) {
			this.activeTimeHighlights.push(name);
			this.updateActiveTimeHighlights();
			this.callOutputs('enableHighlighting');
		},
		
		timeHighlightDeactivate: function(name) {
			var position = -1;
			for (var i=0; i<this.activeTimeHighlights.length; i++) {
				if (this.activeTimeHighlights[i] === name) {
					position = i;
					break;
				}
			}

			if (position > -1) {
				this.activeTimeHighlights.splice(position, 1);
				this.updateActiveTimeHighlights();
				this.callOutputs('enableHighlighting');
			}
		},

		highlightNode: function(node) { // callback
			if (node !== null) {
				this.surface.showHighlight(this.makeLoc(node.lineLoc));
				this.surface.scrollToLine(node.lineLoc.line);
			} else {
				this.surface.hideHighlight();
			}
		},

		highlightNodeId: function(nodeId) { // callback
			this.highlightNode(this.tree.getNodeById(nodeId));
		},

		highlightNodeIds: function(nodeIds) { // callback
			this.surface.removeHighlights();
			for (var i=0; i<nodeIds.length; i++) {
				var node = this.tree.getNodeById(nodeIds[i]);
				this.surface.addHighlight(this.makeLoc(node.lineLoc));
			}
		},

		highlightContentLine: function(line) { // used for dare line count
			if (line === null) {
				this.highlightNode(null);
			} else {
				this.highlightNode(this.tree.getNodeByLine(line));
			}
		},

		highlightFunctionNode: function(node, scroll) { // toolbar callback
			if (node === null) {
				this.surface.hideFunctionHighlight();
				this.callOutputs('disableEventHighlighting');
			} else {
				this.surface.showFunctionHighlight(this.makeLoc(node.blockLoc));
				if (scroll) {
					this.surface.scrollToLine(node.blockLoc.line);
				}
				this.callOutputs('enableEventHighlighting');
			}
		},

		// internal method
		mouseMove: function(event, line, column) { // callback
			if (column < -1) {
				line = 0;
			}
			if (this.currentHighlightLine !== line) {
				this.currentHighlightLine = line;
				this.updateHighlighting();
			}
			if (this.currentEditableLine !== line) {
				this.currentEditableLine = line;
				this.updateEditables();
			}
		},

		mouseLeave: function(event) { //callback
			this.currentHighlightLine = 0;
			this.updateHighlighting();
			this.currentEditableLine = 0;
			this.updateEditables();
		},

		/// KEYBOARD CALLBACKS ///
		tabIndent: function(event, offset1, offset2) { // callback
			// 9 == TAB
			if (event.keyCode === 9) {
				var code = new editor.Code(this.surface.getText());
				var pos1 = code.offsetToLoc(offset1);
				var pos2 = pos1;
				if (offset2 !== offset1) {
					pos2 = code.offsetToLoc(offset2);
				}
				
				var newText = code.text.substring(0, code.lineColumnToOffset(pos1.line, 0));
				var totalOffset1 = 0, totalOffset2 = 0;

				for (var i=pos1.line; i<=pos2.line; i++) {
					var startOffset = code.lineColumnToOffset(i, 0);
					var line = code.getLine(i);
					if (!event.shiftKey) {
						// insert spaces
						newText += '  ' + line + '\n';
						if (i === pos1.line) totalOffset1 += 2;
						totalOffset2 += 2;
					} else {
						// remove spaces
						var spaces = Math.min(code.getLine(i).match(/^ */)[0].length, 2);
						newText += line.substring(spaces) + '\n';
						if (i === pos1.line) totalOffset1 -= Math.min(spaces, pos1.column);
						if (i === pos2.line) {
							totalOffset2 -= Math.min(spaces, pos2.column);
						} else {
							totalOffset2 -= spaces;
						}
					}
				}
				var finalOffset = code.lineColumnToOffset(pos2.line+1, 0);
				if (finalOffset !== null) newText += code.text.substring(finalOffset);

				this.surface.setText(newText);
				this.surface.restoreCursorRange(totalOffset1, totalOffset2);
				
				event.preventDefault();
				return true;
			} else {
				return false;
			}
		},

		// TODO: use http://archive.plugins.jquery.com/project/fieldselection
		autoIndent: function(event, offset) { // callback
			// 13 == enter, 221 = } or ]
			if ([13, 221].indexOf(event.keyCode) >= 0) {
				var code = new editor.Code(this.surface.getText());

				var pos = code.offsetToLoc(offset);
				if (pos.line > 1) {
					var prevLine = code.getLine(pos.line-1);
					var curLine = code.getLine(pos.line);

					// how many spaces are there on the previous line (reference), and this line
					var spaces = prevLine.match(/^ */)[0].length;
					var spacesAlready = curLine.match(/^ */)[0].length;

					// "{" on previous line means extra spaces, "}" on this one means less
					spaces += prevLine.match(/\{ *$/) !== null ? 2 : 0;
					spaces -= curLine.match(/^ *\}/) !== null ? 2 : 0;

					// also, since we are returning an offset, remove the number of spaces we have already
					spaces -= spacesAlready;

					var startOffset = code.lineColumnToOffset(pos.line, 0);
					if (spaces < 0) {
						// don't delete more spaces that there are on this line
						spaces = Math.max(spaces, -spacesAlready);
						this.surface.setText(code.removeOffsetRange(startOffset, startOffset-spaces));
					} else {
						this.surface.setText(code.insertAtOffset(startOffset, new Array(spaces+1).join(' ')));
					}
					this.surface.restoreCursor(startOffset, spaces);
				}
			}
		},

		autoComplete: function(event, offset) { // callback
			// undefined: click event, 48-90 == alpha-num, 190 == ., 8 == backspace
			if (event.keyCode === undefined || (event.keyCode >= 48 && event.keyCode <= 90) || [190, 8].indexOf(event.keyCode) >= 0) {
				this.code = new editor.Code(this.surface.getText());
				var pos = this.code.offsetToLoc(offset);
				if (pos.line > 0) {
					var line = this.code.getLine(pos.line);
					var match = /([A-Za-z][A-Za-z0-9]*[.])+([A-Za-z][A-Za-z0-9]*)?$/.exec(line.substring(0, pos.column));
					if (match !== null) {
						var examples = this.runner.getExamples(match[0]);
						if (examples !== null) {
							this.autoCompletionEnabled = true;
							this.surface.showAutoCompleteBox(pos.line, pos.column-examples.width, offset-examples.width, examples);
							return;
						}
					}
				}
			}
			this.disableAutoCompletion();
		},

		previewExample: function(offset1, offset2, example) { // callback
			this.autoCompletionEnabled = true;
			if (this.editablesEnabled) {
				this.disableEditables();
			}

			var text = this.surface.getText();
			this.runTemp(text.substring(0, offset1) + example + text.substring(offset2));
		},

		insertExample: function(offset1, offset2, example) { // callback
			if (this.autoCompletionEnabled) {
				var text = this.surface.getText();
				this.surface.setText(text.substring(0, offset1) + example + text.substring(offset2));
				this.surface.setCursor(offset1 + example.length, offset1 + example.length);
				this.disableAutoCompletion();
				this.refreshEditables();
				this.callTextChangeCallback();
			}
		},

		disableAutoCompletion: function() { // callback
			if (this.autoCompletionEnabled) {
				this.autoCompletionEnabled = false;
				this.surface.hideAutoCompleteBox();
				this.update();
				this.refreshEditables();
			}
		},

		addEvent: function(type, funcName, args) {
			return this.runner.addEvent(type, funcName, args);
		},

		makeInteractive: function(signature) {
			this.runner.makeInteractive(signature);
		}
	};
};

},{"../clayer":2}],7:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

var clayer = require('../clayer');

module.exports = function(editor) {
	editor.Stepbar = function() { return this.init.apply(this, arguments); };
	editor.Stepbar.prototype = {
		init: function($div, ed) {
			ed.bindEventHandler(this);
			
			this.$div = $div;
			this.editor = ed;

			this.$div.addClass('editor-stepbar');
			this.$div.on('mousemove', _(this.onMouseMove).bind(this));
			this.$div.on('mouseleave', _(this.onMouseLeave).bind(this));
			this.$div.on('click', _(this.onClick).bind(this));

			this.$numbers = $('<div class="editor-stepbar-numbers"></div>');
			this.$div.append(this.$numbers);

			this.editorMarginSize = 26; // corresponds to @editor-margin-size in global.less

			this.stepNumbersLength = 0;
			this.numberWidth = 16;
			this.numberMargin = 3;
			this.currentStep = null;
			this.mouseX = null;
			this.locked = false;
			this.lockedStep = null;
			this.leftOffset = 0;
		},

		remove: function() {
			this.$div.html('');
			this.$div.removeClass('editor-stepbar');
		},

		update: function(runner) {
			if (runner.isStatic() && runner.canStep()) {
				if (!this.enabled) {
					this.setLeftOffset(0);
				}
				this.enabled = true;
				this.runner = runner;
				this.$numbers.show();
				this.setStepTotal(runner.getStepTotal());
				this.setStepNum(runner.getStepNum());
			} else {
				this.disable();
			}
		},

		disable: function() {
			this.enabled = false;
			this.runner = null;
			this.$numbers.hide();
			this.mouseX = null;
			this.unsetlocked();
		},

		/// INTERNAL FUNCTIONS ///
		onMouseMove: function(e) {
			this.mouseX = e.pageX - this.$div.offset().left;
			this.updateMouse();
		},

		onMouseLeave: function() {
			this.mouseX = null;
			this.updateMouse();
		},

		onClick: function() {
			if (this.currentStep !== null) {
				if (this.locked && this.currentStep === this.lockedStep) {
					this.unsetlocked();
					this.updateMouse();
				} else {
					this.unsetlocked();
					this.setlocked();
				}
			}
		},

		setlocked: function() {
			this.$div.addClass('editor-stepbar-locked');
			this.locked = true;
			this.lockedStep = this.currentStep;

			if (this.lockedStep !== null) {
				this.$stepNumber(this.lockedStep).addClass('editor-stepbar-step-number-locked');
			}
		},

		unsetlocked: function() {
			this.$div.removeClass('editor-stepbar-locked');
			this.locked = false;
			this.lockedStep = null;
			this.$numbers.children('.editor-stepbar-step-number-locked').removeClass('editor-stepbar-step-number-locked');
		},

		updateLeftOffset: function() {
			if (!this.enabled || this.locked) return;

			var fraction = 0;
			if (this.mouseX !== null) {
				fraction = this.fractionFromX(this.mouseX);
			}
			this.setLeftOffset(this.leftOffsetFromFraction(fraction));
		},

		updateMouse: function() {
			if (!this.enabled) return;

			this.updateLeftOffset();
			if (this.mouseX !== null) {
				var step = this.stepFromXAndLeftOffset(this.mouseX, this.leftOffset);
				this.runner.setStepNum(step);
			} else if (this.currentStep !== this.lockedStep) {
				if (this.lockedStep !== null) {
					this.runner.setStepNum(this.lockedStep);
				} else {
					this.runner.restart();
				}
			}
		},

		setLeftOffset: function(leftOffset) {
			this.$numbers.css('left', leftOffset);
			this.leftOffset = leftOffset;
		},

		fractionFromX: function(x) {
			var sideMargin = this.numberWidth/2;
			var totalWidth = this.$div.outerWidth();
			var clippedX = Math.max(sideMargin, Math.min(totalWidth-sideMargin, x));
			return (clippedX-sideMargin)/(this.$div.outerWidth()-sideMargin*2);
		},

		leftOffsetFromFraction: function(fraction) {
			var numbersWidth = this.$numbers.outerWidth();
			var divWidth = this.$div.outerWidth();
			if (numbersWidth >= divWidth) {
				var scrollWidth = numbersWidth - divWidth;
				return -Math.round(fraction*scrollWidth);
			} else {
				var halfDivWidth = Math.floor(divWidth / 2);
				var leftOffsetAlignedRight = divWidth - numbersWidth;
				return Math.min(leftOffsetAlignedRight, halfDivWidth + this.editorMarginSize);
			}
		},

		stepFromXAndLeftOffset: function(x, leftOffset) {
			var width = this.numberWidth + this.numberMargin;
			var realX = x-leftOffset + this.numberMargin/2;
			
			var totalWidth = this.$numbers.outerWidth();
			var step = Math.floor(realX*this.stepTotal/totalWidth);

			return Math.min(this.stepTotal-1, Math.max(0, step));
		},

		setStepNum: function(stepNum) {
			if (stepNum >= 998) stepNum = null;

			if (this.currentStep !== stepNum) {
				if (this.currentStep !== null) {
					this.$stepNumber(this.currentStep).removeClass('editor-stepbar-step-number-hover');
				}
				if (stepNum !== null) {
					this.$stepNumber(stepNum).addClass('editor-stepbar-step-number-hover');
				}
				this.currentStep = stepNum;
			}
		},

		setStepTotal: function(stepTotal) {
			if (stepTotal >= 998) stepTotal = 998;

			if (stepTotal !== this.stepTotal) {
				var stepsHTML = '';
				for (var step=this.stepNumbersLength; step<stepTotal; step++) {
					stepsHTML += this.getStepNumberHTML(step);
				}
				this.$numbers.append(stepsHTML);
				this.stepNumbersLength = step;

				this.removeNumbers(stepTotal);
				this.updateNumbersWidth(stepTotal);
				this.stepTotal = stepTotal;
				this.updateLeftOffset();
			}
		},

		removeNumbers: function(fromStep) {
			var $lastStepNumber = this.$stepNumber(fromStep-1);
			$lastStepNumber.nextAll().remove();
			this.stepNumbersLength = fromStep;
			
			if (this.currentStep >= fromStep) {
				this.currentStep = null;
			}
			if (this.lockedStep >= fromStep) {
				this.unsetlocked();
			}
		},

		getStepNumberHTML: function(step) {
			return '<div class="editor-stepbar-step-number editor-stepbar-step-number-' + step + '">' + (step+1) + '</div>';
		},

		$stepNumber: function(step) {
			return this.$numbers.children('.editor-stepbar-step-number-' + step);
		},

		updateNumbersWidth: function(stepTotal) {
			var width = this.numberWidth+this.numberMargin;
			this.$numbers.width(width*stepTotal);
		}
	};
};

},{"../clayer":2}],8:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

var clayer = require('../clayer');

module.exports = function(editor) {
	editor.StepBubbles = function() { return this.init.apply(this, arguments); };
	editor.Box = function() { return this.init.apply(this, arguments); };
	editor.Message = function() { return this.init.apply(this, arguments); };
	editor.AutoCompleteBox = function() { return this.init.apply(this, arguments); };
	editor.Surface = function() { return this.init.apply(this, arguments); };

	editor.StepBubbles.prototype = {
		init: function($div, surface, ed) {
			this.$div = $div;
			this.surface = surface;
			this.editor = ed;
			
			this.editor.bindEventHandler(this);

			this.$bubblesContainer = $('<div class="editor-step-bubbles-container"></div>');
			this.$div.append(this.$bubblesContainer);

			this.$bubblesLine = $('<div class="editor-step-bubbles-line"></div>');
			this.$bubblesContainer.append(this.$bubblesLine);
		},

		remove: function() {
		},

		update: function(runner) {
			if (runner.isStepping()) {
				this.render(runner);
			} else {
				this.disable();
			}
		},

		disable: function() {
			this.$bubblesContainer.hide();
		},

		render: function(runner) {
			var stepNum = runner.getStepNum();
			var stepTotal = runner.getStepTotal();

			var visibleSteps = (this.$div.outerWidth()/10);
			var start = Math.max(0, stepNum - visibleSteps/2);
			var end = Math.min(stepTotal, start+visibleSteps);

			this.renderBubbleRange(runner.getAllSteps(), this.editor.tree, start, end, stepNum);
			this.positionLineByStepNum(runner.getStepNum()-start);

			this.$bubblesContainer.show();
		},

		renderBubbleRange: function(steps, tree, start, end, current) {
			if (this.lastSteps !== steps || this.lastTree !== tree || this.lastStart !== start || this.lastEnd !== end || this.lastCurrent !== current) {
				this.lastSteps = steps;
				this.lastTree = tree;
				this.lastStart = start;
				this.lastEnd = end;
				this.lastCurrent = current;

				this.$bubblesContainer.children('.editor-step-bubbles-bubble').remove();
				
				for (var i=start; i<end; i++) {
					var $bubble = this.addBubble(steps[i], tree, i-start);

					if (i === current) {
						$bubble.addClass('editor-step-bubbles-bubble-active');
					}
				}
			}
		},

		addBubble: function(step, tree, number) {
			var $bubble = $('<div class="editor-step-bubbles-bubble"></div>');
			var loc = step.getLoc(tree);
			var top = this.surface.lineToY(loc.line);

			$bubble.css('top', top);
			$bubble.css('left', number*10);
			this.$bubblesContainer.append($bubble);

			return $bubble;
		},

		positionLineByStepNum: function(stepNum) {
			this.$bubblesLine.css('left', stepNum*10);
			this.$bubblesLine.css('height', this.surface.lineToY(this.editor.tree.programNode.blockLoc.line2));
		}
	};
	
	editor.Box.prototype = {
		init: function() {
			this.$element = $('<div class="editor-box"></div>');
			this.$element.hide();
			this.$arrow = $('<div class="editor-box-arrow"></div>');
			this.$element.append(this.$arrow);
			this.$message = $('<div class="editor-box-message"></div>');
			this.$element.append(this.$message);
		},

		getElement: function() {
			return this.$element;
		},

		updatePosition: function(css) {
			var left = css.left+css.width/2;
			var newLeft = Math.max(-8, left-this.$element.outerWidth()/2);
			this.$element.css('left', newLeft);
			this.$arrow.css('left', left-newLeft);
			this.$element.css('top', css.top+css.height);
		},

		html: function(html, css) {
			// first place in top-left corner, so text wrapping etc. wont happen due to being at a border
			this.$element.css('left', 0);
			this.$element.css('top', 0);
			this.$message.html(html);
			this.updatePosition(css);
			// now force re-rendering at the new location
			this.$message.html('');
			this.$message.html(html);
		},

		remove: function() {
			this.$element.remove();
		}
	};

	editor.Message.prototype = {
		init: function(surface, hover) {
			this.surface = surface;
			this.$marginIcon = $('<div class="editor-margin-icon"></div>');
			this.surface.addElementToMargin(this.$marginIcon);
			this.$marking = $('<div class="editor-marking"></div>');
			this.surface.addElementToTop(this.$marking);
			this.$marking.hide();
			this.box = new editor.Box();
			this.surface.addElementToTop(this.box.getElement());
			if (hover) {
				this.$marginIcon.on('mouseenter', _(this.openMessage).bind(this));
				this.$marginIcon.on('mouseleave', _(this.closeMessage).bind(this));
				this.messageOpen = false;
			} else {
				// this.$marginIcon.on('click', _(this.toggleMesssage).bind(this));
				// this.$marking.on('click', _(this.toggleMesssage).bind(this));
				// this.box.getElement().on('click', _(this.toggleMesssage).bind(this));
				// always show step messages now...
				this.messageOpen = true;
			}
			this.visible = false;
			this.location = null;
			this.html = '';
			this.isCurrentlyShown = false;
			this.type = '';
		},

		showAtLocation: function(type, location, html) {
			this.switchType(type);
			if (!this.visible) {
				this.visible = true;
				this.$marginIcon.addClass('editor-margin-icon-visible');
			}
			this.$marginIcon.css('top', this.surface.lineToY(location.line));
			this.location = location;
			this.html = html;
			this.updateMessage();
		},

		openMessage: function() {
			this.messageOpen = true;
			this.updateMessage();
		},

		closeMessage: function() {
			this.messageOpen = false;
			this.updateMessage();
		},

		hide: function() {
			if (this.visible) {
				this.visible = false;
				this.$marginIcon.removeClass('editor-margin-icon-visible');
			}
			this.updateMessage();
		},

		remove: function() {
			this.$marginIcon.remove();
			this.$marking.remove();
			this.box.remove();
		},

		/// INTERNAL FUNCTIONS ///
		switchType: function(type) {
			if (this.type !== type) {
				this.$marginIcon.removeClass('editor-margin-message-icon-' + this.type);
				this.type = type;
				this.$marginIcon.addClass('editor-margin-message-icon-' + this.type);
			}
		},

		toggleMesssage: function() {
			this.messageOpen = !this.messageOpen;
			this.updateMessage();
		},

		updateMessage: function() {
			if (this.visible && this.messageOpen && this.location !== null) {
				if (!this.isCurrentlyShown) {
					this.isCurrentlyShown = true;
					this.$marking.show();
					this.box.getElement().show();
				}
				var css = this.surface.makeElementLocationRange(this.location);
				this.box.html(this.html, css);
				this.$marking.css(css);
			} else {
				if (this.isCurrentlyShown) {
					this.isCurrentlyShown = false;
					this.$marking.hide();
					this.box.getElement().hide();
				}
			}
		}
	};

	editor.AutoCompleteBox.prototype = {
		init: function(surface, delegate, line, column, offset) {
			this.$element = $('<div class="editor-autocomplete-box"><div class="editor-autocomplete-arrow"></div></div>');
			surface.addElementToTop(this.$element);

			this.$content = $('<div class="editor-autocomplete-content"></div>');
			this.$element.append(this.$content);

			this.$element.append('<div class="editor-autocomplete-hint"><i class="icon icon-keyboard icon-white"></i> press <strong>enter</strong> to insert, hold <strong>shift</strong> to insert only names</div>');

			this.$marginIcon = $('<div class="editor-margin-icon editor-margin-message-icon-preview"></div>');
			surface.addElementToMargin(this.$marginIcon);
			this.$marginIcon.css('top', surface.lineToY(line));
			this.$marginIcon.hide();
			this.$marginIcon.fadeIn(150);

			this.line = line; this.column = column, this.offset = offset;
			this.$element.css(surface.makeElementLocation(line+1, column));

			this.delegate = delegate;
			this.width = 0;
			this.offset = offset;
			this.selected = -1;
			this.examples = [];
			this.previousExample = '';
			this.shiftPressed = false;
		},

		setExamples: function(examples, text) {
			this.storePreviousExample();
			this.examples = examples.examples;
			this.prefix = examples.prefix;
			this.width = examples.width;
			this.text = text;
			this.updateExamples();
		},

		remove: function() {
			this.$element.remove();
			this.$marginIcon.remove();
		},

		up: function() {
			if (this.examples.length > 0) {
				if (this.selected > 0) {
					this.select(this.selected-1);
				} else {
					this.select(this.examples.length-1);
				}
				this.scrollToSelected();
			}
		},

		down: function() {
			if (this.examples.length > 0) {
				if (this.selected < this.examples.length-1) {
					this.select(this.selected+1);
				} else {
					this.select(0);
				}
				this.scrollToSelected();
			}
		},

		shift: function(value) {
			var scrollTop = this.$content.scrollTop();
			this.shiftPressed = value;
			this.storePreviousExample();
			this.updateExamples();
			this.$content.stop().scrollTop(scrollTop);
		},

		enter: function() {
			if (this.selected >= 0 && this.selected < this.examples.length) {
				this.insert();
			} else {
				this.cancel();
			}
		},

		cancel: function() {
			this.delegate.disableAutoCompletion();
		},

		/// INTERNAL FUNCTIONS ///
		storePreviousExample: function() {
			if (this.examples[this.selected] !== undefined) {
				this.previousExample = this.examples[this.selected][0];
			}
		},

		updateExamples: function() {
			this.$content.children('.editor-autocomplete-line').remove(); // prevent $.data leaks
			this.$lines = [];
			var selected = 0;
			this.selected = -1;
			if (this.examples.length > 0) {
				this.$element.show();
				for (var i=0; i<this.examples.length; i++) {
					var $line = $('<div class="editor-autocomplete-line"></div>');
					var example = this.examples[i][0];
					var suffix = this.examples[i][1];
					$line.html(this.prefix + '<strong>' + example.substring(0, this.width) + '</strong>' + example.substring(this.width) + (!this.shiftPressed ? suffix : ''));
					$line.on('mousemove', _(this.mouseMove).bind(this));
					$line.on('click', _(this.click).bind(this));
					$line.data('example-number', i);
					this.$content.append($line);
					this.$lines.push($line);
					if (example === this.previousExample) selected = i;
				}
				this.select(selected);
				this.scrollToSelected();
			} else {
				this.$element.hide();
			}
		},

		select: function(number) {
			if (this.selected !== number) {
				this.$content.children('.editor-autocomplete-line').removeClass('editor-autocomplete-selected');
				this.selected = number;
				if (this.selected >= 0) {
					this.$lines[this.selected].addClass('editor-autocomplete-selected');
					var example = this.examples[this.selected];
					this.delegate.previewExample(this.offset, this.offset+this.width, example[0] + (!this.shiftPressed ? example[1] : ''));
				} else {
					this.delegate.previewExample(this.offset, this.offset+this.width, '');
				}
			}
		},

		scrollToSelected: function() {
			if (this.selected >= 0) {
				// the offset is weird since .position().top changes when scrolling
				var y = this.$lines[this.selected].position().top + this.$content.scrollTop();
				y = Math.max(0, y - this.$content.height()/2);
				this.$content.stop(true).animate({scrollTop : y}, 150, 'linear');
			} else {
				this.$content.stop(true).animate({scrollTop : 0}, 150, 'linear');
			}
		},

		insert: function(number) {
			number = number || this.selected;
			var example = this.examples[number];
			this.delegate.insertExample(this.offset, this.offset+this.width, example[0] + (!this.shiftPressed ? example[1] : ''));
		},

		mouseMove: function(event) {
			this.select($(event.delegateTarget).data('example-number'));
		},

		click: function(event) {
			event.preventDefault(); // e.g. selecting stuff
			this.insert($(event.delegateTarget).data('example-number'));
		}
	};

	editor.Surface.prototype = {
		init: function($div, delegate) {
			this.$div = $div;
			this.$div.addClass('editor');
			this.delegate = delegate;

			// setting up bottom
			this.$bottom = $('<div class="editor-bottom"></div>');
			this.$div.append(this.$bottom);

			// setting up textarea
			this.$textarea = $('<textarea class="editor-code" autocorrect="off" autocapitalize="off" spellcheck="false" wrap="off"></textarea>');
			this.$div.append(this.$textarea);

			this.$textarea.on('keydown', _(this.keyDown).bind(this));
			this.$textarea.on('keyup', _(this.keyUp).bind(this));
			this.$textarea.on('blur', _(this.lostFocus).bind(this));
			this.$textarea.on('click', _(this.click).bind(this));

			// setting up top for steps
			this.$topStepBubbles = $('<div class="editor-step-bubbles"></div>');
			this.$div.append(this.$topStepBubbles);
			this.stepBubbles = new editor.StepBubbles(this.$topStepBubbles, this, this.delegate);

			// setting up top
			this.$top = $('<div class="editor-top"></div>');
			this.$div.append(this.$top);

			// setting up margin
			this.$margin = $('<div class="editor-margin"></div>');
			this.$div.append(this.$margin);
			
			// setting up messages
			this.errorMessage = new editor.Message(this, true);
			this.stepMessage = new editor.Message(this, false);

			this.updateSize = _(this.updateSize).bind(this);
			$(window).on('resize', this.updateSize);

			this.initOffsets();

			this.text = '';
			this.userChangedText = false;
			this.autoCompleteBox = null;
			this.$timeHighlights = {};
			this.showElementsTimeout = null;
		},

		remove: function() {
			$(window).off('resize', this.updateSize);
			this.hideAutoCompleteBox();
			//this.$highlightMarking.remove();
			this.errorMessage.remove();
			this.stepMessage.remove();
			this.$bottom.children('.editor-time-highlight').remove();
			this.$top.children('.editor-time-highlight').remove();
			this.$margin.remove();
			this.$bottom.remove();
			this.stepBubbles.remove();
			this.$topStepBubbles.remove();
			this.$top.remove();
			this.$textarea.remove();
			this.$div.html('');
			this.$div.removeClass('editor editor-error editor-step');
			this.$mirrorContainer.remove();
		},

		getText: function() {
			return this.text;
		},

		setText: function(newText) {
			this.lastSelectionStart = this.$textarea[0].selectionStart;
			this.lastSelectionEnd = this.$textarea[0].selectionEnd;
			this.$textarea.val(newText);
			this.text = newText;
			this.userChangedText = false;
			this.updateSize();
			this.$textarea[0].selectionStart = this.lastSelectionStart;
			this.$textarea[0].selectionEnd = this.lastSelectionStart;
		},

		enable: function() {
			this.$textarea.removeAttr('readonly');
		},

		disable: function() {
			this.$textarea.attr('readonly', 'readonly');
		},

		columnToX: function(column) {
			return Math.max(0, Math.min(column*this.charWidth, this.$top.css('width').replace('px', '')-7));
		},

		lineToY: function(line) {
			return Math.max(0, (line-1)*this.lineHeight);
		},

		addElement: function($element) {
			this.addElementToTop($element);
		},

		addElementToBottom: function($element) {
			this.$bottom.append($element);
		},

		addElementToMargin: function($element) {
			this.$margin.append($element);
		},

		addElementToTop: function($element) {
			this.$top.append($element);
		},

		enableMouse: function() {
			this.$div.on('mousemove', _(this.mouseMove).bind(this));
			this.$div.on('mouseleave', _(this.mouseLeave).bind(this));
		},

		disableMouse: function() {
			this.$div.off('mousemove mouseleave');
		},

		showMessage: function(type, location, html) {
			if (type === 'error') {
				this.stepMessage.hide();
				this.showError(location, html);
			} else {
				this.showStep(location, html);
			}
		},

		showError: function(location, html) {
			this.errorMessage.showAtLocation('error', location, html);
			this.$div.removeClass('editor-step');
			this.$div.addClass('editor-error');
		},

		showStep: function(location, html) {
			this.stepMessage.showAtLocation('inline', location, html);
			this.$div.removeClass('editor-error');
			this.$div.addClass('editor-step');
		},

		hideMessage: function() {
			this.$div.removeClass('editor-error editor-step');
			this.errorMessage.hide();
			this.stepMessage.hide();
		},

		addHighlight: function(location) {
			var $highlightMarking = $('<div class="editor-marking editor-highlight"></div>');
			this.addElementToBottom($highlightMarking);
			$highlightMarking.css(this.makeElementLocationRange(location));
		},

		showHighlight: function(location) {
			this.removeHighlights();
			this.addHighlight(location);
		},

		removeHighlights: function() {
			this.$bottom.children('.editor-highlight').remove();
		},

		hideHighlight: function() {
			this.removeHighlights();
		},

		showFunctionHighlight: function(location) {
			this.hideFunctionHighlight();
			var $highlightMarking = $('<div class="editor-marking editor-highlight-function"></div>');
			this.addElementToBottom($highlightMarking);
			$highlightMarking.css(this.makeElementLocationRange(location));
		},

		hideFunctionHighlight: function() {
			this.$bottom.children('.editor-highlight-function').remove();
		},

		showTimeHighlights: function(timeHighlights) {
			this.$margin.children('.editor-time-highlight').addClass('editor-time-highlight-remove');
			for (var name in timeHighlights) {
				if (this.$timeHighlights[name] === undefined)  {
					this.$timeHighlights[name] = $('<div class="editor-time-highlight editor-time-highlight-inactive"></div>');
					this.$timeHighlights[name].on({
						click: _(this.timeHighlightClick).bind(this),
						mousemove: _(this.timeHighlightMouseMove).bind(this),
						mouseleave: _(this.timeHighlightMouseLeave).bind(this)
					});
					this.$timeHighlights[name].data('name', name);
					this.addElementToMargin(this.$timeHighlights[name]);
				}
				this.$timeHighlights[name].removeClass('editor-time-highlight-remove');
				var y = this.lineToY(timeHighlights[name].line);
				this.$timeHighlights[name].css('top', y);
				this.$timeHighlights[name].height(this.lineToY(timeHighlights[name].line2+1) - y);
				this.$timeHighlights[name].show();
			}

			var $timeHighlights = this.$timeHighlights;
			this.$margin.children('.editor-time-highlight-remove').each(function(){
				var $this = $(this);
				delete $timeHighlights[$this.data('name')];
				$this.remove();
			});
		},

		timeHighlightMouseMove: function(event) {
			var $target = $(event.delegateTarget);
			if ($target.hasClass('editor-time-highlight-inactive')) {
				$target.removeClass('editor-time-highlight-inactive').addClass('editor-time-highlight-hover');
				this.delegate.timeHighlightHover($target.data('name'));
				this.delegate.timeHighlightActivate($target.data('name'));
			}
		},

		timeHighlightMouseLeave: function(event) {
			var $target = $(event.delegateTarget);
			if ($target.hasClass('editor-time-highlight-hover')) {
				$target.removeClass('editor-time-highlight-hover').addClass('editor-time-highlight-inactive');
				this.delegate.timeHighlightDeactivate($target.data('name'));
			}
		},

		timeHighlightClick: function(event) {
			var $target = $(event.delegateTarget);
			if ($target.hasClass('editor-time-highlight-active')) {
				$target.removeClass('editor-time-highlight-active').addClass('editor-time-highlight-hover');
				this.delegate.timeHighlightHover($target.data('name'));
			} else if ($target.hasClass('editor-time-highlight-hover')) {
				$target.removeClass('editor-time-highlight-hover').addClass('editor-time-highlight-active');
			} else {
				$target.removeClass('editor-time-highlight-inactive').addClass('editor-time-highlight-active');
				this.delegate.timeHighlightActivate($target.data('name'));
			}
		},

		hideTimeHighlights: function() {
			this.$margin.children('.editor-time-highlight').hide();
		},

		hideInactiveTimeHighlights: function() {
			for (var name in this.$timeHighlights) {
				if (this.$timeHighlights[name].hasClass('editor-time-highlight-hover')) {
					this.$timeHighlights[name].removeClass('editor-time-highlight-hover').addClass('editor-time-highlight-inactive');
					this.delegate.timeHighlightDeactivate(name);
				}
			}
			this.$margin.children('.editor-time-highlight-inactive').hide();
		},

		scrollToLine: function(line) {
			this.scrollToY(this.lineToY(line));
		},

		makeElementLocation: function(line, column) {
			return {
				left: this.columnToX(column),
				top: this.lineToY(line)
			};
		},

		makeElementLocationRange: function(location) {
			var x = this.columnToX(location.column), y = this.lineToY(location.line);
			return {
				left: x,
				top: y,
				width: this.columnToX(location.column2) - x,
				height: this.lineToY(location.line2) - y
			};
		},

		restoreCursor: function(from, offset) {
			if (this.lastSelectionStart !== null && this.lastSelectionEnd !== null) {
				if (this.lastSelectionStart >= from) this.$textarea[0].selectionStart = this.lastSelectionStart + offset;
				if (this.lastSelectionEnd >= from) this.$textarea[0].selectionEnd = this.lastSelectionEnd + offset;
			}
		},

		restoreCursorRange: function(offset1, offset2) {
			if (this.lastSelectionStart !== null && this.lastSelectionEnd !== null) {
				this.$textarea[0].selectionStart = this.lastSelectionStart + offset1;
				this.$textarea[0].selectionEnd = this.lastSelectionEnd + offset2;
			}
		},

		setCursor: function(start, end) {
			this.$textarea[0].selectionStart = start;
			this.$textarea[0].selectionEnd = end;
		},

		resetCursor: function() {
			this.lastSelectionStart = null;
			this.lastSelectionEnd = null;
		},

		showAutoCompleteBox: function(line, column, offset, examples) {
			if (this.autoCompleteBox !== null) {
				if (this.autoCompleteBox.offset !== offset) {
					this.autoCompleteBox.remove();
					this.autoCompleteBox = new editor.AutoCompleteBox(this, this.delegate, line, column, offset);
				}
			} else {
				this.autoCompleteBox = new editor.AutoCompleteBox(this, this.delegate, line, column, offset);
			}
			this.autoCompleteBox.setExamples(examples, this.text);
			this.hideMessage();
		},

		hideAutoCompleteBox: function() {
			if (this.autoCompleteBox !== null) {
				this.autoCompleteBox.remove();
				this.autoCompleteBox = null;
			}
		},

		autoCompleteNavigateDown: function(event) {
			if (event.keyCode === 38) { // 38 == up
				this.autoCompleteBox.up();
				event.preventDefault();
			} else if (event.keyCode === 40) { // 40 == down
				this.autoCompleteBox.down();
				event.preventDefault();
			} else if (event.keyCode === 16) { // 16 == shift
				this.autoCompleteBox.shift(true);
				event.preventDefault();
			} else if ([13, 9].indexOf(event.keyCode) >= 0) { // 13 == enter, 9 == tab
				this.autoCompleteBox.enter();
				event.preventDefault();
			} else if (event.keyCode === 27) { // 27 == escape
				this.autoCompleteBox.cancel();
				event.preventDefault();
			}
		},

		autoCompleteNavigateUp: function(event) {
			if (event.keyCode === 16) { // 16 == shift
				this.autoCompleteBox.shift(false);
				event.preventDefault();
			}
		},

		getTextArea: function() { // only for editables to add classes
			return this.$textarea;
		},

		/// INTERNAL FUNCTIONS ///
		initOffsets: function() {
			// setting up mirror
			this.$mirror = $('<div class="editor-mirror"></div>');
			this.$mirrorContainer = $('<div class="editor-mirror-container"></div>');
			this.$mirrorContainer.append(this.$mirror);
			$('body').append(this.$mirrorContainer);

			this.$mirror.text('a');
			this.textOffset = {x: this.$mirror.outerWidth(), y: this.$mirror.outerHeight()};

			// this trick of measuring a long string especially helps Firefox get an accurate character width
			this.$mirror.text('a' + new Array(100+1).join('a'));
			this.charWidth = (this.$mirror.outerWidth() - this.textOffset.x)/100;

			this.$mirror.text('a\na');
			this.lineHeight = this.$mirror.outerHeight() - this.textOffset.y;
			
			// this works assuming there is no padding on the right or bottom
			this.textOffset.x -= this.charWidth;
			this.textOffset.y -= this.lineHeight;

			// the offset is weird since .position().top changes when scrolling
			var textAreaOffset = {
				x: (this.$textarea.position().left + this.$div.scrollLeft()),
				y: (this.$textarea.position().top + this.$div.scrollTop())
			};

			var left = textAreaOffset.x + this.textOffset.x;
			var top = textAreaOffset.y + this.textOffset.y;
			this.$bottom.css('left', left);
			this.$bottom.css('top', top);
			this.$top.css('left', left);
			this.$top.css('top', top);
			this.$topStepBubbles.css('left', left);
			this.$topStepBubbles.css('top', top);
			this.$margin.css('top', top);
		},

		updateSize: function() {
			this.$mirror.text(this.text);
			this.$textarea.width(this.$mirror.outerWidth());
			this.$textarea.height(this.$mirror.outerHeight() + 100);
		},

		showElements: function() {
			this.$div.removeClass('editor-typing');
			this.clearShowElementsTimeout();
		},

		hideElements: function() {
			this.$div.addClass('editor-typing');
			this.clearShowElementsTimeout();
			this.showElementsTimeout = setTimeout(_(this.showElements).bind(this), 1000);
		},

		clearShowElementsTimeout: function() {
			if (this.showElementsTimeout !== null) {
				clearTimeout(this.showElementsTimeout);
				this.showElementsTimeout = null;
			}
		},

		pageXToColumn: function(x) {
			return Math.floor((x-this.$textarea.offset().left-this.textOffset.x)/this.charWidth);
		},

		pageYToLine: function(y) {
			return 1+Math.floor((y-this.$textarea.offset().top-this.textOffset.y)/this.lineHeight);
		},

		scrollToY: function(y) {
			y = Math.max(0, y - this.$div.height()/2);
			this.$div.stop(true).animate({scrollTop : y}, 150, 'linear');
			//this.$div.scrollTop(y);
		},

		sanitizeTextArea: function() {
			this.$textarea.val(this.$textarea.val().replace(/\t/g, '  '));
		},

		keyDown: function(event) {
			// 17 == CTRL, 18 == ALT, (17, 91, 93, 224) == COMMAND, 27 == ESC, 113 = F2, 114 = F3
			// let these through for the keyboard shortcuts
			if ([17, 18, 91, 93, 224, 27, 113, 114].indexOf(event.keyCode) < 0) {
				event.stopPropagation();
			}

			this.sanitizeTextArea();
			if (this.$textarea.val() !== this.text) {
				// note: this will never be called at the first keypress, only when holding it!
				this.text = this.$textarea.val();
				this.updateSize();
				this.userChangedText = true;
			}

			// 38 == up, 40 == down, 13 == enter, 16 == shift, 9 == TAB, 17 == CTRL, 18 == ALT, (17, 91, 93, 224) == COMMAND, 113 = F2, 114 = F3
			if ([38, 40, 13, 16, 9, 17, 18, 91, 93, 224, 113, 114].indexOf(event.keyCode) < 0) {
				this.delegate.autoComplete(event, this.$textarea[0].selectionStart);
			} else if (this.autoCompleteBox !== null) {
				this.autoCompleteNavigateDown(event);
			} else {
				if (this.delegate.tabIndent(event, this.$textarea[0].selectionStart, this.$textarea[0].selectionEnd)) {
					this.userChangedText = true;
				}
			}

			if (this.userChangedText) {
				this.hideElements();
			}
		},

		keyUp: function(event) {
			// 17 == CTRL, 18 == ALT, (17, 91, 93, 224) == COMMAND, 27 == ESC, 113 = F2, 114 = F3
			// let these through for the keyboard shortcuts
			if ([17, 18, 91, 93, 224, 27, 113, 114].indexOf(event.keyCode) < 0) {
				event.stopPropagation();
			}
			
			this.sanitizeTextArea();
			if (this.$textarea.val() !== this.text) {
				this.text = this.$textarea.val();
				this.delegate.autoIndent(event, this.$textarea[0].selectionStart);
				this.updateSize();
				this.userChangedText = true;
			}

			// 38 == up, 40 == down, 13 == enter, 16 == shift, 9 == TAB, 17 == CTRL, 18 == ALT, (17, 91, 93, 224) == COMMAND, 113 = F2, 114 = F3
			if ([38, 40, 13, 16, 9, 17, 18, 91, 93, 224, 113, 114].indexOf(event.keyCode) < 0) {
				this.delegate.autoComplete(event, this.$textarea[0].selectionStart);
			} else if (this.autoCompleteBox !== null) {
				this.autoCompleteNavigateUp(event);
			}

			if (this.userChangedText) {
				this.userChangedText = false;
				this.showElements();
				if (this.autoCompleteBox === null) {
					this.delegate.userChangedText();
				}
			}
		},

		lostFocus: function(event) {
			if (this.userChangedText) {
				this.userChangedText = false;
				this.showElements();
				if (this.autoCompleteBox === null) {
					this.delegate.userChangedText();
				}
			}
		},

		click: function(event) {
			if (this.autoCompleteBox !== null) {
				this.delegate.autoComplete(event, this.$textarea[0].selectionStart);
			} else {
				this.delegate.disableAutoCompletion();
			}
		},

		mouseMove: function(event) {
			this.delegate.mouseMove(event, this.pageYToLine(event.pageY), this.pageXToColumn(event.pageX));
		},

		mouseLeave: function(event) {
			this.delegate.mouseLeave(event);
		}
	};
};

},{"../clayer":2}],9:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

var clayer = require('../clayer');

module.exports = function(editor) {
	editor.PlayPauseAnimation = function() { return this.init.apply(this, arguments); };
	editor.PlayPauseAnimation.prototype = {
		init: function($playPause) {
			this.$playPause = $playPause;
			this.$playPauseAnimationBlock = $('<div class="editor-toolbar-run-playpause-animation-block"></div>');
			this.$playPauseAnimationContainer = $('<div class="editor-toolbar-run-playpause-animation-container"></div>');
			this.$playPauseAnimationContainer.append(this.$playPauseAnimationBlock);
			this.$playPause.append(this.$playPauseAnimationContainer);

			this.$playPauseIcon = $('<i class="icon icon-play icon-white"></i>');
			this.$playPause.append(this.$playPauseIcon);

			//this.max = this.$playPauseAnimationContainer.width();
			this.max = 30;
			this.playing = false;
			this.animating = false;
			this.position = 0;
			this.speed = 0.01;
			this.restartTimeout = null;

			this.startAnimation = _(this.startAnimation).bind(this);
			this.restartAnimation = _(this.restartAnimation).bind(this);
		},

		animate: function(animate) {
			if (animate !== this.animating) {
				this.animating = animate;
				if (this.animating) {
					this.startAnimation();
				} else {
					this.stopTimeout();
					this.setFraction(((new Date()).getTime()-this.lastAnimationTime)*this.speed/this.max);
				}
			}
		},

		play: function() {
			if (!this.playing) {
				this.playing = true;
				this.$playPauseIcon.addClass('icon-pause');
				this.$playPauseIcon.removeClass('icon-play');
			}
		},

		pause: function() {
			if (this.playing) {
				this.playing = false;
				this.setFraction(1);
				this.$playPauseIcon.addClass('icon-play');
				this.$playPauseIcon.removeClass('icon-pause');
			}
		},

		setFraction: function(fraction) {
			this.stopTimeout();
			this.position = fraction*this.max;
			clayer.setCss3(this.$playPauseAnimationBlock, 'transition', 'none');
			this.$playPauseAnimationBlock.css('width', this.position);
			if (this.animating) {
				this.restartTimeout = setTimeout(this.startAnimation, 0);
			}
		},

		/// INTERNAL FUNCTIONS ///
		startAnimation: function() {
			this.stopTimeout();
			var time = (this.max-this.position)/this.speed;
			clayer.setCss3(this.$playPauseAnimationBlock, 'transition', 'width ' + time + 'ms linear');
			this.$playPauseAnimationBlock.css('width', this.max);
			this.restartTimeout = setTimeout(this.restartAnimation, time);
			this.lastAnimationTime = (new Date()).getTime();
		},

		restartAnimation: function() {
			this.stopTimeout();
			clayer.setCss3(this.$playPauseAnimationBlock, 'transition', '');
			this.$playPauseAnimationBlock.css('width', 0);
			this.position = 0;
			this.lastAnimationTime = (new Date()).getTime();
			this.restartTimeout = setTimeout(this.startAnimation, this.start+this.max);
		},

		stopTimeout: function() {
			if (this.restartTimeout !== null) {
				clearTimeout(this.restartTimeout);
				this.restartTimeout = null;
			}
		}
	};

	var eventWidth = 6;
	editor.RunBar = function() { return this.init.apply(this, arguments); };
	editor.RunBar.prototype = {
		init: function($div, ed) {
			this.runner = null;
			this.$div = $div;
			this.editor = ed;

			this.$div.on('mouseenter', _(this.mouseEnter).bind(this));
			this.$div.on('mouseleave', _(this.mouseLeave).bind(this));

			this.$reload = $('<button class="btn btn-primary editor-toolbar-reload"><i class="icon icon-repeat icon-white"></i></button>');
			this.$reload.on('click', _(this.reload).bind(this));
			this.$div.append(this.$reload);

			this.$playPause = $('<button class="btn btn-primary dropdown-toggle editor-toolbar-run-playpause"></button>');
			this.$playPause.tooltip({title: 'play/pause (<strong>esc</strong>)', placement: 'bottom'});
			this.$playPause.on('click', _(this.playPause).bind(this));
			this.$div.append(this.$playPause);

			this.playPauseAnimation = new editor.PlayPauseAnimation(this.$playPause);

			this.$sliderContainer = $('<div class="editor-toolbar-run-slider-container"></div>');
			this.$sliderButton = $('<div class="btn btn-primary editor-toolbar-run-slider-button"></div>');
			this.$slider = $('<div class="editor-toolbar-run-slider"></div>');
			this.slider = new clayer.Slider(this.$slider, this, eventWidth);
			this.$sliderButton.append(this.$slider);
			this.$sliderContainer.append(this.$sliderButton);
			this.$div.append(this.$sliderContainer);

			this.$stepBarContainer = $('<div class="btn-group editor-toolbar-run-step-bar-container"></div>');
			this.$stepBarContainer.append('<div class="editor-toolbar-run-step-bar-arrow"></div>');
			this.$div.append(this.$stepBarContainer);

			this.$stepBarErrorIcon = $('<i class="icon-exclamation-sign-color editor-toolbar-run-step-bar-error-icon"/></i>');
			this.$stepBarErrorIcon.on('click', _(this.errorIconClick).bind(this));
			this.$stepBarContainer.append(this.$stepBarErrorIcon);

			this.$stepBarIcon = $('<i></i>');
			this.$stepBarContainer.append(this.$stepBarIcon);

			this.sliderEnabled = true;
			this.stepBarEnabled = true;
			this.$stepBarContainer.hide(); // hacky fix
			this.disable();
		},

		remove: function() {
			this.playPauseAnimation.animate(false);
			this.slider.remove();
			this.$stepBarErrorIcon.remove();
			this.$stepBarContainer.remove();
			this.$playPause.remove();
			this.$slider.remove();
			this.$sliderContainer.remove();
		},

		disable: function() {
			this.canRun = false;
			this.$reload.removeClass('editor-toolbar-reload-blink');
			this.$reload.addClass('disabled');
			this.playPauseAnimation.animate(false);
			this.$playPause.addClass('disabled');
			this.hideSlider();
		},

		update: function(runner) {
			this.canRun = true;
			this.runner = runner;

			this.$reload.removeClass('disabled');
			this.playPauseAnimation.animate(runner.canReceiveEvents());
			this.$playPause.removeClass('disabled');

			if (this.runner.isPaused()) {
				this.playPauseAnimation.pause();
				if (this.runner.hasEvents()) {
					if (!this.sliderEnabled) {
						this.sliderEnabled = true;
						this.$stepBarContainer.fadeIn(150);
						this.$div.removeClass('editor-toolbar-run-slider-disabled');
						this.$div.addClass('editor-toolbar-run-slider-enabled');
						this.$slider.width(this.runner.getEventTotal()*eventWidth);
						this.slider.setValue(this.runner.getEventNum());
						this.$sliderButton.css('margin-left', '');
					}
					this.showStepBar();
					this.setSliderErrors(runner);
					this.playPauseAnimation.setFraction(this.runner.getEventNum()/(this.runner.getEventTotal()-1));
					this.$stepBarContainer.css('left', this.$sliderContainer.position().left + this.runner.getEventNum()*eventWidth);
					this.$stepBarIcon.removeClass();
					this.$stepBarIcon.addClass('icon editor-toolbar-run-step-bar-icon icon-white icon-' + {
						base: 'stop',
						keyboard: 'keyboard',
						mouse: 'mouse',
						interval: 'time'
					}[this.runner.getEventType()]);
					if (this.runner.hasError()) {
						this.$stepBarContainer.addClass('editor-toolbar-run-step-bar-error');
					} else {
						this.$stepBarContainer.removeClass('editor-toolbar-run-step-bar-error');
					}
				} else {
					this.hideSlider();
				}
			} else {
				this.playPauseAnimation.play();
				this.hideSlider();
				if (this.runner.isBaseEventSelected()) {
					this.playPauseAnimation.setFraction(0);
				}
			}

			this.$reload.toggleClass('editor-toolbar-reload-blink', this.runner.hasbaseCodeChanged());
		},

		setSliderErrors: function(runner) {
			var errorEventNums = runner.getErrorEventNums();
			var segments = [];
			for (var i=0; i<errorEventNums.length;) {
				var start = i, end = i++;
				while(i<errorEventNums.length && errorEventNums[i] === errorEventNums[i-1]+1) {
					end = i++;
				}
				segments.push({start: errorEventNums[start], end: errorEventNums[end], color: 'rgba(255, 0, 0, 0.7)'});
			}
			this.slider.setSegments(segments);
		},

		hideSlider: function() {
			if (this.sliderEnabled) {
				this.sliderEnabled = false;
				this.$div.addClass('editor-toolbar-run-slider-disabled');
				this.$div.removeClass('editor-toolbar-run-slider-enabled');
				this.$sliderButton.css('margin-left', -this.$slider.width()-20);
				this.editor.highlightFunctionNode(null);
				this.hideStepBar();
			}
		},

		playPause: function() {
			if (this.runner !== null && this.runner.isInteractive()) {
				if (this.runner.isPaused()) {
					this.runner.play();
				} else {
					this.runner.pause();
				}
			}
		},

		reload: function() {
			if (this.canRun) {
				this.runner.reload();
			}
		},

		sliderChanged: function(value) {
			if (this.runner.isPaused()) {
				this.runner.setEventNum(value);
				this.editor.highlightFunctionNode(this.runner.getFunctionNode(), !this.runner.isStepping());
			}
		},

		showStepBar: function() {
			if (!this.stepBarEnabled) {
				this.$stepBarContainer.fadeIn(150);
				this.stepBarEnabled = true;
			}
		},

		hideStepBar: function() {
			if (this.stepBarEnabled) {
				this.$stepBarContainer.fadeOut(150);
				this.stepBarEnabled = false;
			}
		},

		mouseEnter: function(event) {
			if (this.sliderEnabled) {
				this.editor.highlightFunctionNode(this.runner.getFunctionNode());
				this.showStepBar();
			}
		},

		mouseLeave: function(event) {
			this.editor.highlightFunctionNode(null);
			if (this.sliderEnabled && this.stepBarEnabled && !this.runner.isStepping()) {
				this.hideStepBar();
			}
		},

		errorIconClick: function() {
			this.editor.scrollToError();
		}
	};

	editor.Toolbar = function() { return this.init.apply(this, arguments); };
	editor.Toolbar.prototype = {
		init: function($div, ed) {
			ed.bindEventHandler(this);
			
			this.$div = $div;
			this.editor = ed;

			this.$div.addClass('editor-toolbar');
			
			// var isMac = navigator.platform.indexOf("Mac") >= 0;

			var $runBar = $('<div class="btn-group editor-toolbar-run-bar"></div>');
			this.runBar = new editor.RunBar($runBar, this.editor);
			this.$div.append($runBar);

			this.keyDown = _(this.keyDown).bind(this);
			this.keyUp = _(this.keyUp).bind(this);
			this.lostFocus = _(this.lostFocus).bind(this);
			$(document).on('keydown', this.keyDown);
			$(document).on('keyup', this.keyUp);
			$(window).on('blur', this.lostFocus);

			this.keys = {};
			this.timers = {};
			this.clearAllKeys();
			this.enabled = true;
		},

		remove: function() {
			this.runBar.remove();
			this.clearAllKeys();
			$(document).off('keydown', this.keyDown);
			$(document).off('keyup', this.keyUp);
			$(window).off('blur', this.lostFocus);
			this.$div.html('');
			this.$div.removeClass('editor-toolbar editor-toolbar-interactive');
		},

		update: function(runner) {
			this.enabled = true;
			if (runner.isInteractive()) {
				this.runBar.update(runner);
				this.$div.addClass('editor-toolbar-interactive');
			} else {
				this.runBar.disable();
				this.$div.removeClass('editor-toolbar-interactive');
			}
		},

		disable: function() {
			this.enabled = false;
			this.runBar.disable();
			this.clearAllKeys();
		},

		/// INTERNAL FUNCTIONS ///
		keyDown: function(event) {
			if (!this.enabled) return;
			// 17 == CTRL, 18 == ALT, (17, 91, 93, 224) == COMMAND, 27 == ESC, 113 = F2, 114 = F3
			if (event.keyCode === 27) {
				if (!this.keys.escape) {
					this.runBar.playPause();
				}
				this.setKey('escape');
				event.preventDefault();
			}
		},

		keyUp: function(event) {
			if (!this.enabled) return;
			// 17 == CTRL, 18 == ALT, (17, 91, 93, 224) == COMMAND, 27 == ESC, 113 = F2, 114 = F3
			if (event.keyCode === 27) {
				this.clearKey('escape');
				event.preventDefault();
			}
		},

		lostFocus: function(event) {
			if (!this.enabled) return;
			this.clearAllKeys();
		},

		setKey: function(type) {
			this.clearTimer(type);
			this.keys[type] = true;
			this.timers[type] = setTimeout((function() { this.keys[type] = false; }).bind(this), 1000);
		},

		clearKey: function(type) {
			this.clearTimer(type);
			this.keys[type] = false;
		},

		clearTimer: function(type) {
			if (this.timers[type] !== undefined) {
				clearTimeout(this.timers[type]);
				this.timers[type] = undefined;
			}
		},

		clearAllKeys: function() {
			this.clearKey('escape');
		}
	};
};

},{"../clayer":2}],10:[function(require,module,exports){
/*jshint node:true*/
"use strict";

var editor = {};

require('./editor.code')(editor);
require('./editor.editables')(editor);
require('./editor.surface')(editor);
require('./editor.toolbar')(editor);
require('./editor.stepbar')(editor);
require('./editor.editor')(editor);

module.exports = editor;
},{"./editor.code":4,"./editor.editables":5,"./editor.editor":6,"./editor.stepbar":7,"./editor.surface":8,"./editor.toolbar":9}],11:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

// load colorPicker lib
require('./colorpicker/jquery.ui.colorPicker');

module.exports.clayer = require('./clayer');
module.exports.editor = require('./editor');
module.exports.info = require('./info');
module.exports.jsmm = require('./jsmm');
module.exports.output = require('./output');
module.exports.robot = require('./robot');

module.exports.UI = function() { return this.init.apply(this, arguments); };
module.exports.UI.prototype = {
	icons: {dare: 'icon-file', console: 'icon-list-alt', canvas: 'icon-picture', robot: 'icon-th', info: 'icon-info-sign', home: 'icon-home', 'editor': 'icon-pencil', config: 'icon-wrench'},
	paneOutputs: ['robot', 'console', 'canvas', 'info', 'config'],
	constructors: {
		robot: module.exports.output.Robot,
		console: module.exports.output.Console,
		canvas: module.exports.output.Canvas,
		info: module.exports.info.Info,
		events: module.exports.output.Events,
		math: module.exports.output.Math,
		config: module.exports.output.ConfigOutput
	},

	init: function($main, globalOptions) {
		if ($main === undefined) { // use modal mode
			this.$modal = $('<div class="ui-modal"></div>');
			// this.$modal.on('click', _(this.close).bind(this));
			$('body').append(this.$modal);

			this.$main = $('<div class="ui-modal-ui"></div>');
			this.$modal.append(this.$main);

			this.$close = $('<a href="#" class="ui-close">&times;</a>');
			this.$main.append(this.$close);
			this.$close.on('click', _(this.closeHandler).bind(this));
		} else {
			this.$modal = null;
			this.$main = $main;
		}
		this.globalOptions = globalOptions || {};

		this.$main.addClass('ui-main');

		this.$background = $('<div class="ui-background"></div>');
		this.$main.append(this.$background);

		this.$arrow = $('<div class="arrow"><div class="arrow-head"></div><div class="arrow-body"></div></div>');
		this.$main.append(this.$arrow);

		this.$output = $('<div class="ui-output tabbable"></div>');
		this.$main.append(this.$output);

		this.$tabs = $('<ul class="nav nav-tabs"></ul>');
		this.$output.append(this.$tabs);
		this.$tabs.toggle(!this.globalOptions.hideTabs);

		this.$content = $('<div class="tab-content">');
		this.$output.append(this.$content);

		this.$editor = $('<div class="ui-editor"></div>');
		this.$toolbar = $('<div class="ui-toolbar"></div>');
		this.$stepbar = $('<div class="ui-stepbar"></div>');
		this.$main.append(this.$editor);
		this.$main.append(this.$toolbar);
		this.$main.append(this.$stepbar);

		this.outputs = {};
		this.additionalObjects = {};
		this.editor = null;
		this.closeCallback = null;
		this.removeAll();
	},

	remove: function() {
		this.removeAll();
		this.$main.removeClass('ui-main');
		this.$background.remove();
		this.$output.remove();
		this.$editor.remove();
		this.$toolbar.remove();
		this.$stepbar.remove();
		this.$arrow.remove();
		if (this.$modal !== null) {
			this.$close.remove();
			this.$modal.remove();
		}
	},

	removeOutputs: function() {
		for (var name in this.outputs) {
			this.outputs[name].remove();
			if (this.tabsByName[name]) {
				this.tabsByName[name].$tab.remove();
				this.tabsByName[name].$pane.remove();
				this.tabsByName[name] = undefined;
				this.numTabs--;
			}
		}
		this.outputs = {};
		this.scope = {};
	},

	removeAll: function() {
		this.removeOutputs();
		for (var name in this.additionalObjects) {
			this.additionalObjects[name].remove();
		}
		if (this.editor !== null) {
			this.editor.remove();
		}
		this.$tabs.children('li').remove();
		this.$content.children('div').remove();

		this.additionalObjects = {};
		this.tabsByName = {};
		this.numTabs = 0;
	},

	loadConfigProgram: function(definition, program, states) {
		var config = new module.exports.output.Config(definition);
		var runner = new module.exports.jsmm.SimpleRunner(config.getScopeObjects(), {maxWidth: Infinity});
		runner.run(program);
		if (runner.hasError()) console.error(runner.getError());
		else return this.mixinStates(config.getConfig(), states);
	},

	mixinStates: function(config, states) {
		for (var name in states) {
			config.outputs[name].state = states[name];
		}
		return config;
	},

	loadOutputs: function(outputs) {
		for (var name in outputs) {
			if (outputs[name].enabled) {
				outputs[name].prepareTextElement = _(this.prepareTextElement).bind(this);

				var output;
				if (this.paneOutputs.indexOf(name) >= 0) {
					output = new this.constructors[name](this.editor, outputs[name], this.addTab(name));
				} else {
					output = new this.constructors[name](this.editor, outputs[name]);
				}
				this.outputs[name] = output;

				this.addToScope(output.getScopeObjects());

				if (name === 'events') {
					this.scope.document = output.getAugmentedDocumentObject();
					this.scope.window = output.getAugmentedWindowObject();

					var mouseObjects = outputs[name].mouseObjects || [];
					for (var j=0; j<mouseObjects.length; j++) {
						var outputName = mouseObjects[j];
						output.addMouseEvents(this.outputs[outputName].getMouseElement(), outputName, this.scope[outputName]);
					}
				}
			}
		}

		this.editor.updateSettings(new module.exports.jsmm.Runner(this.editor, this.scope), this.outputs);
	},

	addToScope: function(objects) {
		for (var name in objects) {
			this.scope[name] = objects[name];
		}
	},

	registerAdditionalObject: function(name, obj) {
		this.additionalObjects[name] = obj;
	},

	addTab: function(name) {
		var $tab = $('<li></li>');
		setTimeout(function() { $tab.addClass('tab-button-enabled'); }, 200*this.numTabs + 300);
		this.$tabs.append($tab);

		var $link = $('<a href="#"><i class="icon icon-white ' + this.icons[name] + '"></i> ' + name + '</a>');
		$tab.append($link);

		$link.click(_(function(event) {
			event.preventDefault();
			this.selectTab(name);
		}).bind(this));

		var $pane = $('<div class="tab-pane"></div>');
		this.$content.append($pane);

		var $output = $('<div class="tab-output"></div>');
		$pane.append($output);

		this.numTabs++;
		this.tabsByName[name] = {$pane: $pane, $tab: $tab};
		return $output;
	},

	addEditor: function(options) {
		this.editor = new module.exports.editor.Editor(options, module.exports.jsmm, this.$editor, this.$toolbar, this.$stepbar);
		return this.editor;
	},

	selectTab: function(name) {
		this.$content.children('.active').removeClass('active');
		this.$tabs.children('ul li.active').removeClass('active');
		this.tabsByName[name].$pane.addClass('active');
		this.tabsByName[name].$tab.addClass('active');
		if (this.outputs[name] !== undefined && this.outputs[name].setFocus !== undefined) this.outputs[name].setFocus();
		if (this.outputs[this.currentTab] !== undefined && this.outputs[this.currentTab].unsetFocus !== undefined) this.outputs[this.currentTab].unsetFocus();
		this.currentTab = name;
	},

	getOutput: function(name) {
		return this.outputs[name];
	},

	loadDefault: function() {
		this.load({
			editor: {},
			outputs: {
				robot: {},
				console: {},
				canvas: {},
				info: {},
				input: {mouseObjects: ['canvas']},
				Math: {}
			}
		});
	},

	setCloseCallback: function(callback) {
		this.closeCallback = callback;
	},

	openModal: function() {
		this.$modal.addClass('ui-modal-active');
		var $main = this.$main;
		setTimeout(function() { $main.addClass('ui-modal-ui-active'); }, 0);
		$('body').addClass('modal-open'); // for Bootstrap specific fixes
	},

	closeModal: function() {
		this.removeAll();
		this.$modal.removeClass('ui-modal-active');
		this.$main.removeClass('ui-modal-ui-active');
		$('body').removeClass('modal-open');
	},

	/// INTERNAL FUNCTIONS ///
	arrowPositions: { // dir, left, top
		'arrow-step': ['arrow-down', 655, 585],
		'arrow-highlighting': ['arrow-up', 751, 40],
		'arrow-manipulation': ['arrow-up', 785, 40],
		'arrow-close': ['arrow-up', 1066, 3]
	},

	prepareTextElement: function($el) {
		var $links = $el.find('a[href^="#arrow"]');
		var that = this;
		$links.on('mouseenter', function() { that.showArrow($(this).attr('href').substring(1)); });
		$links.on('mouseleave', function() { that.hideArrow(); });
		$links.on('click', function(e) { $(this).trigger('mouseenter'); that.animateArrow(); e.preventDefault(); });
		$links.addClass('arrow-link');
	},

	showArrow: function(str) {
		var pos = this.arrowPositions[str];
		if (pos === undefined) {
			if (str.indexOf('arrow-tab-') === 0) {
				var $tab = this.tabsByName[str.substring('arrow-tab-'.length)].$tab;
				pos = ['arrow-left', $tab.position().left+$tab.width()+5, 29];
			} else {
				pos = str.split(',');
			}
		}
		this.$arrow.addClass('arrow-active');
		this.$arrow.removeClass('arrow-left arrow-right arrow-up arrow-down arrow-animate');
		this.$arrow.addClass(pos[0]);
		this.$arrow.css('left', pos[1] + 'px');
		this.$arrow.css('top', pos[2] + 'px');
	},

	animateArrow: function() {
		var $arrow = this.$arrow;
		$arrow.removeClass('arrow-animate');
		window.setTimeout(function() { $arrow.addClass('arrow-animate'); }, 0);
	},

	hideArrow: function() {
		this.$arrow.removeClass('arrow-active');
	},
	
	closeHandler: function(event) {
		event.preventDefault();
		this.closeModal();
		if (this.closeCallback !== null) {
			this.closeCallback();
		}
	}
};
},{"./clayer":2,"./colorpicker/jquery.ui.colorPicker":3,"./editor":10,"./info":12,"./jsmm":19,"./output":33,"./robot":41}],12:[function(require,module,exports){
/*jshint node:true*/
"use strict";

var info = {};

require('./info.info')(info);
require('./info.jsmm')(info);
require('./info.robot')(info);
require('./info.canvas')(info);
require('./info.console')(info);
require('./info.events')(info);

module.exports = info;
},{"./info.canvas":13,"./info.console":14,"./info.events":15,"./info.info":16,"./info.jsmm":17,"./info.robot":18}],13:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

module.exports = function(info) {
	info.tables.push({
		html: '<p><span class="info-output"><i class="icon icon-picture icon-white"></i> canvas</span></p><p>The canvas is used to draw shapes on, and is the actual <strong>HTML</strong> element that is supported by most web browsers. This means that any program you write for this canvas can also be used <strong>outside</strong> of this environment, on any other site. It is also very suitable for programming <strong>games</strong>, by using events.</p>',
		list: {
			'canvas.getContext': {
				name: 'canvas.getContext("2d")',
				text: '<p>This is a command that should always be called <strong>before</strong> using the canvas. It returns a two-dimensional canvas context object, which can be stored in a variable. Then it can be used to <strong>draw</strong> 2d shapes on the canvas. We do not use 3d contexts here, as they are still very experimental and difficult to use.</p>',
				examples: [
					{type: 'canvas', code: '// now we can use the context to draw!\n\ncontext.fillText("Hello!", 10, 10);'}
				]
			},
			'canvas.width': {
				name: 'canvas.width',
				text: '<p>Use <var>canvas.width</var> to get the <strong>width</strong> of the canvas in pixels. This width is read-only; it cannot be changed.</p>',
				examples: [
					{type: 'console', code: 'console.log(canvas.width);', result: '512'}
				]
			},
			'canvas.height': {
				name: 'canvas.height',
				text: '<p>Use <var>canvas.height</var> to get the <strong>height</strong> of the canvas in pixels. This height is read-only; it cannot be changed.</p>',
				examples: [
					{type: 'console', code: 'console.log(canvas.height);', result: '512'}
				]
			},
			'context.fillRect': {
				name: 'context.fillRect(x, y, width, height)',
				text: '<p><var>context.fillRect</var> draws a <strong>filled</strong> rectangle on the canvas. The color set in <var>context.fillStyle</var> is used, by default this is black.</p>',
				examples: [
					{type: 'canvas', code: 'context.fillRect(20, 40, 10, 10);\ncontext.fillStyle="#a00";\ncontext.fillRect(70, 70, 30, 60);'}
				]
			},
			'context.strokeRect': {
				name: 'context.strokeRect(x, y, width, height)',
				text: '<p><var>context.strokeRect</var> draws the <strong>outline</strong> of a rectangle on the canvas. The color set in <var>context.strokeStyle</var> is used, by default this is black.</p>',
				examples: [
					{type: 'canvas', code: 'context.strokeRect(20, 40, 10, 10);\ncontext.strokeStyle="#00a";\ncontext.strokeRect(50, 50, 30, 60);'}
				]
			},
			'context.clearRect': {
				name: 'context.clearRect(x, y, width, height)',
				text: '<p><var>context.clearRect</var> <strong>clears</strong> a rectangle on the canvas. The area that is removes becomes transparent again.</p>',
				examples: [
					{type: 'canvas', code: 'context.fillRect(10, 10, 100, 100);\ncontext.clearRect(40, 40, 30, 60);'}
				]
			},
			'context.fillText': {
				name: 'context.fillText(text, x, y)',
				text: '<p><var>context.fillText</var> draws a <strong>string</strong> at some location. There are also a few commands to change the <strong>style</strong>, such as <var>context.font</var> for the font style and size, and <var>context.fillStyle</var> for the color.</p>',
				examples: [
					{type: 'canvas', code: 'context.fillText("Hello World!", 10, 30);\n\ncontext.fillStyle = "#00a";\ncontext.font = "40pt Verdana";\ncontext.fillText(4*4*4, 50, 80);'}
				]
			},
			'context.beginPath': {
				name: 'context.beginPath()',
				text: '<p>The <strong>path</strong> functionality of the canvas allows you to create <strong>complex</strong> shapes, and then draw an outline using <var>context.stroke</var>, or fill it in using <var>context.fill</var>.</p>',
				examples: [
					{type: 'canvas', code: 'context.beginPath();\ncontext.moveTo(50, 50);\ncontext.lineTo(100, 100);\ncontext.lineTo(50, 100);\ncontext.stroke();'}
				]
			},
			'context.closePath': {
				name: 'context.closePath()',
				text: '<p>When a path is <strong>closed</strong> using <var>context.closePath</var>, this just means a line is drawn to the <strong>beginning</strong> of the path. You can then draw the path using either <var>context.stroke</var> or <var>context.fill</var>.</p>',
				examples: [
					{type: 'canvas', code: 'context.beginPath();\ncontext.moveTo(50, 50);\ncontext.lineTo(100, 100);\ncontext.lineTo(50, 100);\ncontext.closePath();\ncontext.stroke();'}
				]
			},
			'context.moveTo': {
				name: 'context.moveTo(x, y)',
				text: '<p><var>context.moveTo</var> <strong>moves</strong> the current position <strong>without</strong> drawing, when using the path functionality of the canvas.</p>',
				examples: [
					{type: 'canvas', code: 'context.beginPath();\ncontext.moveTo(50, 50);\ncontext.lineTo(100, 100);\ncontext.stroke();'}
				]
			},
			'context.lineTo': {
				name: 'context.lineTo(x, y)',
				text: '<p><var>context.lineTo</var> adds a <strong>line</strong> segment from the previous position, to a new one, when using the path functionality of the canvas.</p>',
				examples: [
					{type: 'canvas', code: 'context.beginPath();\ncontext.moveTo(50, 50);\ncontext.lineTo(100, 100);\ncontext.stroke();'}
				]
			},
			'context.arc': {
				name: 'context.arc(x, y, radius, startAngle, endAngle)',
				text: '<p>You can draw complete <strong>circles</strong> or parts of them, <strong>arcs</strong>, using <var>context.arc</var>. The xy-position defines the <strong>center</strong> of the circle, and <strong>angles</strong> are given in radians, from 0 to 6.28 (2&pi;).</p>',
				examples: [
					{type: 'canvas', code: 'context.beginPath();\ncontext.arc(65, 65, 20, 0.00, 6.28);\ncontext.fill();\n\ncontext.beginPath();\ncontext.arc(85, 65, 20, 1.5, 4.7);\ncontext.strokeStyle = "#a00";\ncontext.stroke();'}
				]
			},
			'context.fill': {
				name: 'context.fill()',
				text: '<p>A path can be <strong>finished</strong> using <var>context.fill</var>, which <strong>fills</strong> the path using the color set in <var>context.fillStyle</var>.</p>',
				examples: [
					{type: 'canvas', code: 'context.beginPath();\ncontext.arc(65, 65, 40, 0.00, 6.28);\ncontext.fillStyle = "#a0a";\ncontext.fill();'}
				]
			},
			'context.stroke': {
				name: 'context.stroke()',
				text: '<p>A path can be <strong>finished</strong> using <var>context.stroke</var>, which <strong>draws</strong> the path using the color set in <var>context.strokeStyle</var>.</p>',
				examples: [
					{type: 'canvas', code: 'context.beginPath();\ncontext.arc(65, 50, 50, 0.00, 3.14);\ncontext.strokeStyle = "#0a0";\ncontext.stroke();'}
				]
			}
		}
	});
};

},{}],14:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

module.exports = function(info) {
	info.tables.push({
		html: '<p><span class="info-output"><i class="icon icon-list-alt icon-white"></i> console</span></p><p>This is used for easily printing any information to the screen, for example when debugging a program, or when calculating something. The console is present in most browsers as an extra tool for developers.</p>',
		list: {
			'console.log': {
				name: 'console.log(text)',
				text: '<p>Use <var>console.log</var> to write a string or number to the console, for example to write <em>Hello World!</em> to the console, you can type <var>console.log("Hello World!");</var></p>',
				examples: [
					{type: 'console', code: 'console.log("Hello World!");\nconsole.log(7*6);\nconsole.log("5 squared: " + (5*5));\nconsole.log(console);', result: 'Hello World!<br>42<br>5 squared: 25<br>[object Console]'}
				]
			},
			'console.clear': {
				name: 'console.clear()',
				text: '<p>This command is used to clear the contents of the console. Everything that has been logged before <var>console.clear();</var> will just be thrown away.</p>',
				examples: [
					{type: 'console', code: 'console.log(1);\nconsole.log(2);\nconsole.clear();\nconsole.log(3);\nconsole.log(4);'}
				]
			},
			'console.setColor': {
				name: 'console.setColor(color)',
				text: '<p>This command changes the color of the next lines of the console. You can use all HTML color formats; please search online to find out how the different formats work.</p>',
				examples: [
					{type: 'console', code: 'console.setColor("#a00");\nconsole.log("we");\nconsole.setColor("rgb(200, 170, 0)");\nconsole.log("can");\nconsole.setColor("hsl(120, 100%, 50%)");\nconsole.log("make");\nconsole.setColor("hsla(200, 100%, 50%, 0.7)");\nconsole.log("colors!");', result: '<span style="color: #a00">we</span></br><span style="color: rgb(200, 170, 0)">can</span></br><span style="color: hsl(120, 100%, 50%)">make</span></br><span style="color: hsla(200, 100%, 50%, 0.7)">colors!</span>'}
				]
			}
		}
	});
};

},{}],15:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

module.exports = function(info) {
	info.tables.push({
		html: '<p><span class="info-output"><i class="icon icon-play icon-white"></i> events</span></p><p>Events are used to add <strong>interactivity</strong> to your program. A <strong>function</strong> of your choice is executed whenever something happens, like when a button is pressed or the mouse is moved.</p>',
		list: {
			'events.document.onkeydown': {
				name: 'document.onkeydown = functionName',
				text: '<p>This lets you specify a function that is called every time a key is <strong>pressed down</strong>. An <var>event</var> object is passed into the function, which you can use to determine which key is pressed.</p>',
				examples: [
					{type: 'console', code: 'function keyDown(event) {\n  console.log("key is pressed");\n}\ndocument.onkeydown = keyDown;'}
				]
			},
			'events.document.onkeyup': {
				name: 'document.onkeyup = functionName',
				text: '<p>This lets you specify a function that is called every time a key is <strong>released</strong>. An <var>event</var> object is passed into the function, which you can use to determine which key is released.</p>',
				examples: [
					{type: 'console', code: 'function keyUp(event) {\n  console.log("key is released");\n}\ndocument.onkeyup = keyUp;'}
				]
			},
			'events.event.keyCode': {
				name: 'event.keyCode',
				text: '<p>The <strong>keyCode property</strong> of the event object of keyboard events contains a number which specifies which key was pressed or released. You can try yourself which keys correspond to which numbers.</p>',
				examples: [
					{type: 'console', code: 'function keyDown(event) {\n  console.clear();\n  console.log("keyCode=" + event.keyCode);\n}\ndocument.onkeydown = keyDown;'}
				]
			},
			'events.canvas.onmousemove': {
				name: 'canvas.onmousemove = functionName',
				text: '<p>This event makes sure the function is called every time the mouse is <strong>moved</strong> across the canvas. You can use the <var>event</var> object in your function to determine where the mouse is.</p>',
				examples: [
					{type: 'canvas', code: 'function mouseMove(event) {\n  var x = event.layerX;\n  var y = event.layerY;\n  context.fillRect(x, y, 5, 5);\n}\ncanvas.onmousemove = mouseMove;'}
				]
			},
			'events.canvas.onmousedown': {
				name: 'canvas.onmousedown = functionName',
				text: '<p>This event makes sure the function is called every time the mouse is <strong>pressed down</strong>. You can use the <var>event</var> object in your function to determine where the mouse is.</p>',
				examples: [
					{type: 'canvas', code: 'function mouseDown(event) {\n  var x = event.layerX;\n  var y = event.layerY;\n  context.fillRect(x, y, 5, 5);\n}\ncanvas.onmousedown = mouseDown;'}
				]
			},
			'events.canvas.onmouseup': {
				name: 'canvas.onmouseup = functionName',
				text: '<p>This event makes sure the function is called every time the mouse is <strong>released</strong>. You can use the <var>event</var> object in your function to determine where the mouse is.</p>',
				examples: [
					{type: 'canvas', code: 'function mouseUp(event) {\n  var x = event.layerX;\n  var y = event.layerY;\n  context.fillRect(x, y, 5, 5);\n}\ncanvas.onmouseup = mouseUp;'}
				]
			},
			'events.event.layerX': {
				name: 'event.layerX',
				text: '<p>The <var>layerX</var> property of the mouse events contains a number with the <strong>x-position</strong> of the mouse.</p>',
				examples: [
					{type: 'canvas', code: 'function mouseMove(event) {\n  var x = event.layerX;\n  context.fillRect(x, 30, 5, 5);\n}\ncanvas.onmousemove = mouseMove;'}
				]
			},
			'events.event.layerY': {
				name: 'event.layerY',
				text: '<p>The <var>layerY</var> property of the mouse events contains a number with the <strong>y-position</strong> of the mouse.</p>',
				examples: [
					{type: 'canvas', code: 'function mouseMove(event) {\n  var y = event.layerY;\n  context.fillRect(30, y, 5, 5);\n}\ncanvas.onmousemove = mouseMove;'}
				]
			},
			'events.window.setInterval': {
				name: 'window.setInterval(functionName, time)',
				text: '<p>You can have a function execute every <strong>once in a while</strong>, by using this command. The <strong>time</strong> argument specifies the number of <strong>milliseconds</strong> after which the function should be executed again.</p>',
				examples: [
					{type: 'canvas', code: 'var t = 0;\nfunction tick() {\n  context.clearRect(0, 0, 500, 500);\n  context.fillRect(0, 0, t, t);\n  t += 5;\n  if (t > 200) {\n    t = 0;\n  }\n}\nwindow.setInterval(tick, 30);'}
				]
			}
		}
	});
};

},{}],16:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

var robot = require('../robot');
var output = require('../output');
var jsmm = require('../jsmm');

module.exports = function(info) {
	info.tables = [];

	info.consoleExample = function(infoTable, $content, example, sampText) {
		var $dfn = $('<dfn></dfn>');
		$content.append($('<div class="info-table-content-wrapper"></div>').append($dfn));

		var $samp = $('<samp></samp>');
		$dfn.append($samp);

		var $code = $('<code>' + example + '</code>');
		$dfn.append($code);

		if (sampText === undefined) {
			var console = {
				log: function(string) {
					if (typeof string === 'object') string = '[object]';
					$samp.text($samp.text() + string + '\n');
				},
				clear: function() {
					$samp.text('');
				}
			};
			var localDocument = {};
			(function(document) { eval(example); })(localDocument);
			if (localDocument.onkeydown !== undefined) {
				infoTable.addGlobalEvent($(document), 'keydown', localDocument.onkeydown);
			}
			if (localDocument.onkeyup !== undefined) {
				infoTable.addGlobalEvent($(document), 'keyup', localDocument.onkeyup);
			}
		} else {
			$samp.html(sampText);
		}
	};

	var canvasEventWrapper = function($canvas, func) {
		return function(e) {
			var offset = $canvas.offset();
			var event = {
				layerX: e.pageX	- offset.left,
				layerY: e.pageY - offset.top
			};
			func(event);
			return false;
		};
	};

	info.canvasExample = function(infoTable, $content, example) {
		var $wrapper = $('<div class="info-table-content-wrapper"></div>');
		$content.append($wrapper);

		var $container = $('<div class="canvas-container info-table-content-container"></div>');
		$wrapper.append($container);

		var $canvas = $('<canvas class="canvas-canvas" width="130" height="130"></canvas>');
		$container.append($canvas);

		$wrapper.append('<code>var context = canvas.getContext("2d");\n' + example + '</code>');

		var canvas = {};
		var context = $canvas[0].getContext('2d');
		var interval = null;
		var window = { setInterval: function(func, time) { interval = {func: func, time: time}; } };

		eval(example);

		if (canvas.onmousemove !== undefined) {
			infoTable.addGlobalEvent($canvas, 'mousemove', canvasEventWrapper($canvas, canvas.onmousemove));
		}
		if (canvas.onmousedown !== undefined) {
			infoTable.addGlobalEvent($canvas, 'mousedown', canvasEventWrapper($canvas, canvas.onmousedown));
		}
		if (canvas.onmouseup !== undefined) {
			infoTable.addGlobalEvent($canvas, 'mouseup', canvasEventWrapper($canvas, canvas.onmouseup));
		}
		if (canvas.onmousedown !== undefined || canvas.onmouseup !== undefined) {
			$canvas.addClass('info-table-content-clickable');
			infoTable.addGlobalEvent($canvas, 'click', function(e) { e.stopPropagation(); });
		}
		if (interval !== null) {
			infoTable.addGlobalEvent(null, 'interval', interval);
		}
	};

	info.robotExample = function(infoTable, $content, example, state) {
		var $wrapper = $('<div class="info-table-content-wrapper"></div>');
		$content.append($wrapper);

		var $container = $('<div class="robot-container info-table-content-container"></div>');
		$wrapper.append($container);

		state = state || '{"columns":4,"rows":4,"initialX":1,"initialY":3,"initialAngle":90,"mazeObjects":0,"verticalActive":[[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]],"horizontalActive":[[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]],"blockGoal":[[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]],"numGoals":0}';
		var rob = new robot.Robot($container, true, 48, state);
		rob.insertDelay(100000);

		var simpleRobot = new output.SimpleRobot(state);
		var simpleConsole = new output.SimpleConsole();
		var runner = new jsmm.SimpleRunner({console: simpleConsole.getAugmentedObject(), robot: simpleRobot.getAugmentedObject()});
		runner.run(example);
		simpleRobot.play(rob);
		rob.playAll();

		if (simpleConsole.getText().length > 0) {
			$wrapper.append('<dfn><samp>' + simpleConsole.getText() + '</samp><code>' + example + '</code></dfn>');
		} else {
			$wrapper.append('<code>' + example + '</code>');
		}
	};

	info.InfoScope = function() { return this.init.apply(this, arguments); };
	info.InfoScope.prototype = {
		init: function($div, info) {
			this.info = info;
			this.$scopeContainer = $('<div class="info-scope-container"></div>');
			$div.append(this.$scopeContainer);

			this.$scopeContainer.append('<p><span class="info-output"><i class="icon icon-eye-open icon-white"></i> scope</span></p><p>This list shows the variables that are declared in your <a href="#arrow-right,575,57">program</a>, along with their values. At the beginning the only variables are those that we provide, such as <var>robot</var> or <var>canvas</var>. You can add your own variables and functions using <var>var</var> and <var>function</var>.</p>');
			this.info.prepareTextElement(this.$scopeContainer);

			this.$scope = $('<div class="info-scope"></div>');
			this.$scopeContainer.append(this.$scope);

			this.highlighting = false;
			this.scopeTracker = null;

			this.itemClick = _(this.itemClick).bind(this);
			this.mouseMove = _(this.mouseMove).bind(this);
			this.mouseLeave = _(this.mouseLeave).bind(this);
		},

		remove: function() {
			this.clear();
			this.$scope.remove();
		},

		update: function(scopeTracker, stepNum) {
			this.scopeTracker = scopeTracker;
			var state = this.scopeTracker.getState(stepNum);
			this.clear();
			var enabled = true;
			for (var i=state.length-1; i>0; i--) {
				this.makeItem(state[i], enabled);
				enabled = false;
			}
			this.makeItem(state[0], true);
		},

		enableHighlighting: function() {
			this.highlighting = true;
			this.$scope.on('mouseleave', this.mouseLeave);
		},

		disableHighlighting: function() {
			this.highlighting = false;
			this.$scope.off('mouseleave');
			this.removeHighlights();
		},

		highlightNodes: function(nodeIds) {
			this.nodeIds = nodeIds;
			if (this.visible) {
				this.renderHighlights();
			}
		},

		renderHighlights: function() {
			this.removeHighlights();
			var nodeIds = this.nodeIds;
			if (this.scopeTracker !== null && nodeIds) {
				for (var i=0; i<nodeIds.length; i++) {
					var ids = this.scopeTracker.getHighlightIdsByNodeId(nodeIds[i]);
					for (var j=0; j<ids.length; j++) {
						if (this.$variables[ids[j]] !== undefined) {
							this.$variables[ids[j]].addClass('info-scope-variable-highlight');
						}
					}
				}
			}
		},

		setFocus: function() {
			this.visible = true;
			this.renderHighlights();
		},

		unsetFocus: function() {
			this.visible = false;
		},

		/// INTERNAL FUNCTIONS ///
		clear: function() {
			this.$scope.find('.info-scope-variable').remove(); // to prevent $.data leaks
			this.$scope.children('.info-scope-item').remove(); // to prevent $.data leaks
			this.$variables = {};
		},

		makeItem: function(level, enabled) {
			var $item = $('<div class="info-scope-item"></div>');
			$item.data('id', level.id);
			$item.on('click', this.itemClick);
			this.$scope.append($item);

			var $cell = $('<div class="info-scope-cell"></div>');
			$item.append($cell);

			var $arrow = $('<span class="info-scope-cell-arrow"></span>');
			$cell.append($arrow);
			var $name = $('<span class="info-scope-cell-name">' + level.name + ':</span>');
			$cell.append($name);
			var $content = $('<div class="info-scope-content"></div>');
			$item.append($content);

			for (var i=0; i<level.names.length; i++) {
				var name = level.names[i];
				var variable = level.scope[name];
				var $variable = $('<div class="info-scope-variable">' + variable.name + ' = ' + variable.value + '</div>');
				if (variable.highlight) $variable.addClass('info-scope-variable-highlight-step');
				$variable.on('mousemove', this.mouseMove);
				$variable.data('id', variable.id);
				$content.append($variable);
				this.$variables[variable.id] = $variable;
			}

			if (!enabled) {
				$item.addClass('info-scope-item-disabled');
				$content.hide();
			} else {
				$item.addClass('info-scope-item-active');
				$content.show();
			}
		},

		itemClick: function(event) {
			var $target = $(event.delegateTarget);
			var $content = $target.children('.info-scope-content');
			if ($target.hasClass('info-scope-item-active')) {
				$target.removeClass('info-scope-item-active');
				$content.slideUp(200);
			} else {
				$target.addClass('info-scope-item-active');
				$content.slideDown(200);
			}
		},

		removeHighlights: function() {
			this.$scope.find('.info-scope-variable-highlight').removeClass('info-scope-variable-highlight');
		},

		mouseMove: function(event) {
			event.stopPropagation();
			if (this.highlighting && this.commandTracker !== null) {
				this.removeHighlights();
				var $target = $(event.delegateTarget);
				if ($target.data('id') !== undefined) {
					$target.addClass('info-scope-variable-highlight');
					this.info.editor.highlightNodeIds(this.scopeTracker.getHighlightNodeIdsById($target.data('id')));
				} else {
					this.info.editor.highlightNodeId(0);
				}
			}
		},

		mouseLeave: function(event) {
			this.removeHighlights();
			this.info.editor.highlightNodeId(0);
		}
	};

	info.InfoTable = function() { return this.init.apply(this, arguments); };
	info.InfoTable.prototype = {
		icons: {console: 'icon-list-alt', canvas: 'icon-picture', robot: 'icon-th'},

		init: function($div, info) {
			this.info = info;
			this.$tables = $('<div class="info-tables">');
			$div.append(this.$tables);
			this.commands = {};
			this.highlighting = false;
			this.commandTracker = null;
			this.globalEvents = [];

			this.itemClick = _(this.itemClick).bind(this);
			this.mouseMove = _(this.mouseMove).bind(this);
			this.mouseLeave = _(this.mouseLeave).bind(this);
		},

		addCommands: function(tables) {
			for (var i=0; i<tables.length; i++) {
				this.addTable(tables[i]);
			}
		},

		addTable: function(table) {
			var $table = $('<div class="info-table"></div>');
			$table.html(table.html);
			this.$tables.append($table);

			for (var id in table.list) {
				var command = table.list[id];

				var $item = $('<div class="info-table-item"></div>');
				var $cell = $('<div class="info-table-cell"></div>');
				this.makeCell(command, $cell);
				$item.append($cell);

				var $content = $('<div class="info-table-content"></div>');
				$content.hide();
				$item.append($content);

				$item.data('id', id);
				$item.data('command', command);
				$item.on('click', this.itemClick);
				$item.on('mousemove', this.mouseMove);

				$table.append($item);
				this.commands[id] = {command: command, $item: $item};
			}

			this.info.prepareTextElement($table);
		},

		remove: function() {
			this.removeGlobalEvents();
			this.$tables.find('.info-table-item').remove(); // to prevent $.data leaks
			this.$tables.remove();
		},

		update: function(commandTracker, highlightStepNodeId) {
			this.commandTracker = commandTracker;
			this.$tables.find('.info-table-item-highlight-step').removeClass('info-table-item-highlight-step');
			var ids = this.commandTracker.getHighlightIdsByNodeId(highlightStepNodeId);
			for (var j=0; j<ids.length; j++) {
				if (this.commands[ids[j]] !== undefined) {
					this.commands[ids[j]].$item.addClass('info-table-item-highlight-step');
				}
			}
		},

		highlightNodes: function(nodeIds) {
			this.nodeIds = nodeIds;
			if (this.visible) {
				this.renderHighlights();
			}
		},

		renderHighlights: function() {
			this.removeHighlights();
			var nodeIds = this.nodeIds;
			if (this.commandTracker !== null && nodeIds) {
				for (var i=0; i<nodeIds.length; i++) {
					var ids = this.commandTracker.getHighlightIdsByTopNodeId(nodeIds[i]);
					for (var j=0; j<ids.length; j++) {
						if (this.commands[ids[j]] !== undefined) {
							this.commands[ids[j]].$item.addClass('info-table-item-highlight');
						}
					}
				}
			}
		},

		enableHighlighting: function() {
			this.highlighting = true;
			this.$tables.on('mouseleave', this.mouseLeave);
		},

		disableHighlighting: function() {
			this.highlighting = false;
			this.removeHighlights();
			this.$tables.off('mouseleave');
		},

		addGlobalEvent: function($element, type, func) {
			if (type === 'interval') {
				this.globalEvents.push({type: type, interval: window.setInterval(func.func, func.time)});
			} else {
				$element.on(type, func);
				this.globalEvents.push({$element: $element, type: type, func: func});
			}
		},

		removeGlobalEvents: function() {
			for (var i=0; i<this.globalEvents.length; i++) {
				var event = this.globalEvents[i];
				if (event.type === 'interval') {
					window.clearInterval(event.interval);
				} else {
					event.$element.off(event.type, event.func);
				}
			}
		},

		setFocus: function() {
			this.visible = true;
			this.renderHighlights();
		},

		unsetFocus: function() {
			this.visible = false;
		},

		/// INTERNAL FUNCTIONS ///
		makeCell: function(command, $cell) {
			var $arrow = $('<span class="info-table-cell-arrow"></span>');
			$cell.append($arrow);
			var $name = $('<span class="info-table-cell-name">' + command.name + ' </span>');
			$cell.append($name);
		},

		itemClick: function(event) {
			var $target = $(event.delegateTarget);
			var command = $target.data('command');
			var $content = $target.children('.info-table-content');
			this.removeGlobalEvents();
			if ($target.hasClass('info-table-item-active')) {
				$target.removeClass('info-table-item-active');
				$content.slideUp(200);
			} else {
				this.$tables.find('.info-table-item-active').removeClass('info-table-item-active').children('.info-table-content').slideUp(200);
				$content.show();
				this.makeContent(command, $content);
				$target.addClass('info-table-item-active');
				$content.hide();
				$content.slideDown(200);
			}
		},

		makeContent: function(command, $content) {
			$content.html(command.text);
			for (var i=0; i<command.examples.length; i++) {
				var example = command.examples[i];
				if (example.type === 'robot') {
					info.robotExample(this, $content, example.code, example.state);
				} else if (example.type === 'canvas') {
					info.canvasExample(this, $content, example.code);
				} else if (example.type === 'console') {
					info.consoleExample(this, $content, example.code, example.result);
				}
			}
		},

		removeHighlights: function() {
			this.$tables.find('.info-table-item-highlight').removeClass('info-table-item-highlight');
		},

		mouseMove: function(event) {
			if (this.highlighting && this.commandTracker !== null) {
				this.removeHighlights();
				var $target = $(event.delegateTarget);
				if ($target.data('id') !== undefined) {
					$target.addClass('info-table-item-highlight');
					this.info.editor.highlightNodeIds(this.commandTracker.getHighlightNodeIdsById($target.data('id')));
				} else {
					this.info.editor.highlightNodeId(0);
				}
			}
		},

		mouseLeave: function(event) {
			if (this.highlighting) {
				this.removeHighlights();
				this.info.editor.highlightNodeId(0);
			}
		}
	};

	info.Info = function() { return this.init.apply(this, arguments); };
	info.Info.prototype = {
		init: function(editor, options, $div) {
			this.$div = $div;
			this.$div.addClass('output info');
			this.prepareTextElement = options.prepareTextElement;
			
			if (options.scope === undefined || options.scope) {
				this.scope = new info.InfoScope(this.$div, this);
			} else {
				this.scope = null;
			}

			this.table = new info.InfoTable(this.$div, this);
			this.table.addCommands(this.filterCommands(options.commands || ''));

			this.editor = editor;
		},

		remove: function() {
			this.$div.removeClass('output info');
			if (this.scope !== null) this.scope.remove();
			this.table.remove();
		},

		getScopeObjects: function() {
			return {};
		},

		outputClearAllEvents: function() {
			this.events = [];
			this.currentEvent = null;
			this.lastEvent = null;
		},

		outputStartEvent: function(context) {
			this.lastEvent = {
				context: context
			};
			this.events.push(this.lastEvent);
			this.stepNum = Infinity;
		},

		outputEndEvent: function(context) {
		},

		outputPopFront: function() {
			this.events.shift();
		},

		outputClearEventsFrom: function(eventNum) {
			this.events = this.events.slice(0, eventNum);
			// always followed by appropriate outputSetEventStep
		},

		outputClearEventsToEnd: function() {
			if (this.scope !== null) this.scope.update(this.lastEvent.context.getScopeTracker(), Infinity);
			this.table.update(this.lastEvent.context.getCommandTracker(), 0);
			this.events = [];
		},

		outputSetEventStep: function(eventNum, stepNum) {
			if (eventNum >= 0 && (this.currentEvent !== this.events[eventNum] || this.stepNum !== stepNum)) {
				this.currentEvent = this.events[eventNum];
				this.stepNum = stepNum;
				if (this.scope !== null) this.scope.update(this.currentEvent.context.getScopeTracker(), this.stepNum);
				this.table.update(this.lastEvent.context.getCommandTracker(), this.currentEvent.context.getNodeIdByStepNum(this.stepNum));
			}
		},

		highlightNodes: function(nodeIds) {
			if (this.scope !== null) this.scope.highlightNodes(nodeIds);
			this.table.highlightNodes(nodeIds);
		},

		enableHighlighting: function() {
			this.$div.addClass('info-highlighting');
			if (this.scope !== null) this.scope.enableHighlighting();
			this.table.enableHighlighting();
		},

		disableHighlighting: function() {
			this.$div.removeClass('info-highlighting');
			if (this.scope !== null) this.scope.disableHighlighting();
			this.table.disableHighlighting();
		},

		setFocus: function() {
			if (this.scope !== null) this.scope.setFocus();
			this.table.setFocus();
		},

		unsetFocus: function() {
			if (this.scope !== null) this.scope.unsetFocus();
			this.table.unsetFocus();
		},

		/// INTERNAL FUNCTIONS ///
		filterCommands: function(string) {
			var regex = /^(([^.\[]*[.]?)*)(\[([0-9]*)\])?/;

			if (string.length <= 0) {
				return this.buildTable();
			} else {
				var commands = string.split(',');
				var filter = [];
				for (var i=0; i<commands.length; i++) {
					var command = commands[i];
					var matches = regex.exec(command);

					var id = matches[1];
					var example = matches[4];

					filter[id] = filter[id] || [];

					if (example !== undefined) {
						filter[id].push(example);
					}
				}
				return this.buildTable(filter);
			}
		},

		buildTable: function(filter) {
			if (filter === undefined || filter === null) {
				return info.tables;
			} else {
				var tables = [];
				for (var i=0; i<info.tables.length; i++) {
					var table = null;
					for (var id in filter) {
						var item = info.tables[i].list[id];

						if (item !== undefined) {
							if (table === null) {
								table = {html: info.tables[i].html, list: {}};
								tables.push(table);
							}

							if (table.list[id] === undefined) {
								table.list[id] = {name: item.name, text: item.text, examples: item.examples};
							}

							if (filter[id].length > 0) {
								table.list[id].examples = [];
								for (var k=0; k<filter[id].length; k++) {
									table.list[id].examples.push(item.examples[filter[id][k]]);
								}
							}
						}
					}
				}
				return tables;
			}
		}
	};
};

},{"../jsmm":19,"../output":33,"../robot":41}],17:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

var robot = require('../robot');

module.exports = function(info) {
	info.tables.push({
		html: '<p><span class="info-output"><i class="icon icon-wrench icon-white"></i> javascript</span></p><p>Below you find the basic constructs of the <strong>JavaScript</strong> language. Programs are executed from <strong>top to bottom</strong>, one statement after another. Use the <a href="#arrow-step">step button</a> to see in detail how your program is executed.</p>',
		list: {
			'jsmm.number': {
				name: 'number',
				text: '<p>Numbers can be used by just writing the <strong>number</strong> in the code, like <var>0</var> or <var>-3</var>. For very <strong>large</strong> or <strong>small</strong> numbers you can use the scientific notation: <var>2.99e8</var>.</p>',
				examples: [
					{type: 'console', code: 'console.log(10);\nconsole.log(-10);\nconsole.log(2.99e8);\nconsole.log(1.0e-3);'}
				]
			},
			'jsmm.string': {
				name: 'string',
				text: '<p>To represent <strong>text</strong> we use the <strong>string</strong> notation, for example <var>"Hi!"</var>. Everything in between <strong>quotation marks</strong> is a string, so also <var>"3"</var> is a string and not a number. When printing a string to the console it is always displayed exactly as entered.</p>',
				examples: [
					{type: 'console', code: 'console.log("Hello!");\nconsole.log("2.99e8");'}
				]
			},
			'jsmm.boolean': {
				name: 'boolean',
				text: '<p>A <strong>boolean</strong> is something that is either <strong>true</strong> or <strong>false</strong>, and we use them in a program simply by writing <var>true</var> or <var>false</var>. They are used, for example, in comparisons and logic operators.</p>',
				examples: [
					{type: 'console', code: 'console.log(true);\nconsole.log(false);\nconsole.log(10 > 0);'}
				]
			},
			'jsmm.var': {
				name: 'var <small>(declaration)</small>',
				text: '<p>The <var>var</var> keyword is used for <strong>declaring</strong> a variable. You specify a <strong>name</strong>, which can then be used for <strong>storing</strong> information. For example, after writing <var>var text;</var>, you can use the variable <var>text</var>, for example by assigning a string to it: <var>text = "Hey!";</var>. You can also immediately <strong>assign</strong> a value to a variable when declaring it, for example <var>var age = 17;</var>. After declaring a variable you can use it in other statements, such as calculations.</p>',
				examples: [
					{type: 'robot', code: 'var distance = 2;\nrobot.drive(distance);'},
					{type: 'console', code: 'var number = 5;\nconsole.log(number);\nconsole.log(number+2);\nconsole.log(number*number);\n\nvar text = "Hey!"\nconsole.log(text);'}
				]
			},
			'jsmm.assignment': {
				name: '= <small>(assignment)</small>',
				text: '<p>The <var>=</var> operator is used for <strong>assigning</strong> a value to a variable, which first has to be declared using <var>var</var>. On the left side you put the <strong>name</strong> of the variable, and on the right side the <strong>value</strong> you want to assign to it, for example <var>height = 100;</var>. You can use the variable name itself on the right side as well. An example <var>counter = counter + 1;</var>, which increases the value of <var>counter</var> by one.</p>',
				examples: [
					{type: 'console', code: 'var counter = 1;\nconsole.log(counter);\ncounter = counter+1;\nconsole.log(counter);\ncounter = counter*3;\nconsole.log(counter);\n\nvar height = 100;\nconsole.log(height);\nheight = height * counter;\nconsole.log(height);'}
				]
			},
			'jsmm.arithmetic.numbers': {
				name: '+, -, *, /, % <small>(numbers only)</small>',
				text: '<p>These are the basic <strong>math</strong> operators: <var>+</var> is addition, <var>-</var> is subtraction, <var>*</var> is multiplication, and <var>/</var> is division. Finally there is <var>%</var>, which gives the remainder of a division.</p>',
				examples: [
					{type: 'console', code: 'console.log(4+6);\nconsole.log(10-3);\nconsole.log(5*10);\nconsole.log(81/9);\nconsole.log(18%5);'},
					{type: 'robot', code: 'robot.drive(5-2);'}
				]
			},
			'jsmm.arithmetic.assignment': {
				name: '+=, -=, *=, /=, %= <small>(numbers only)</small>',
				text: '<p>These operators are basically <strong>shorthands</strong>. <var>a += b;</var> is shorthand for <var>a = a + b;</var>, <var>a -= b;</var> is shorthand for <var>a = a - b;</var>, and so on.</p>',
				examples: [
					{type: 'console', code: 'var counter = 1;\nconsole.log(counter);\ncounter += 1;\nconsole.log(counter);\ncounter *= 3;\nconsole.log(counter);\n\nvar height = 100;\nconsole.log(height);\nheight *= counter;\nconsole.log(height);'},
					{type: 'canvas', code: 'var x = 10;\ncontext.fillRect(x, 70, 10, 10);\nx += 30;\ncontext.fillRect(x, 70, 10, 10);\nx += 30;\ncontext.fillRect(x, 70, 10, 10);'}
				]
			},
			'jsmm.arithmetic.strings': {
				name: '+, += <small>(string concatenation)</small>',
				text: '<p><var>+</var> is not only used for addition, but also for <strong>concatenating</strong> strings with strings, or strings with numbers. For example <var>"Hello " + "world!"</var> results in <var>"Hello world!"</var>. The shorthand <var>+=</var> also works.</p>',
				examples: [
					{type: 'console', code: 'console.log("Hello " + "world!");\n\nvar text = "Age: ";\ntext += 42;\nconsole.log(text);'}
				]
			},
			'jsmm.arithmetic.increment': {
				name: '++, -- <small>(numbers only)</small>',
				text: '<p>These two are even shorter <strong>shorthands</strong>. <var>a++;</var> is the same as writing <var>a = a + 1;</var>, or increasing the variable <var>a</var> by one. <var>a--;</var> means decreasing the variable by one, or <var>a = a - 1;</var>.</p>',
				examples: [
					{type: 'console', code: 'var counter = 1;\nconsole.log(counter);\ncounter++;\nconsole.log(counter);\ncounter++;\nconsole.log(counter);\ncounter--;\nconsole.log(counter);\ncounter--;\nconsole.log(counter);'}
				]
			},
			'jsmm.logic.equality': {
				name: '==, !=',
				text: '<p>These two operators <strong>compare</strong> values. <var>==</var> checks if two values are the <strong>same</strong>, and returns <var>true</var> if they are, and <var>false</var> if they are not. <var>!=</var> is the opposite, it checks if values are <strong>not</strong> the same.</p>',
				examples: [
					{type: 'console', code: 'console.log(5 == 5);\nconsole.log(5 == "Hi");\nconsole.log(5 != 5);\nconsole.log(5 != "Hi");'}
				]
			},
			'jsmm.logic.comparison': {
				name: '>, >=, <, <= <small>(numbers only)</small>',
				text: '<p>These operators <strong>compare</strong> numbers. <var>a &gt; b</var> returns <var>true</var> if <var>a</var> is <strong>greater than</strong> <var>b</var>, and <var>a &gt;= b</var> returns <var>true</var> if <var>a</var> is <strong>greater than or equal</strong> to <var>b</var>. The other two work the other way around.</p>',
				examples: [
					{type: 'console', code: 'console.log(10 > 5);\nconsole.log(5 >= 5);\nconsole.log(3 < 5);\nconsole.log(5 < 3);'}
				]
			},
			'jsmm.logic.inversion': {
				name: '! <small>(booleans only)</small>',
				text: '<p>To <strong>invert</strong> a boolean, you can use <var>!</var>. For example, <var>!true</var> is just <var>false</var>.</p>',
				examples: [
					{type: 'console', code: 'console.log(!true);\nconsole.log(!(5 == 7));'}
				]
			},
			'jsmm.logic.booleans': {
				name: '&&, || <small>(booleans only)</small>',
				text: '<p>These operators are used to <strong>combine</strong> boolean values. <var>a && b</var> returns <var>true</var> if <strong>both</strong> <var>a</var> and <var>b</var> are <var>true</var>, so it is also called <strong>and</strong>. <var>a || b</var> returns <var>true</var> if <strong>either</strong> of them is <var>true</var>, so it is also called <strong>or</strong>.</p>',
				examples: [
					{type: 'console', code: 'console.log(true && true);\nconsole.log(true && false);\nconsole.log(true || false);\nconsole.log(false || !(10 == 11));\nconsole.log(false || false);'}
				]
			},
			'jsmm.if': {
				name: 'if (boolean)',
				text: '<p>The if-statement is used to <strong>control</strong> what parts of the program are run. Only when the boolean is <var>true</var>, is the part between brackets executed.</p>',
				examples: [
					{type: 'console', code: 'if (false) {\n  console.log("Hello!");\n}\n\nif (true) {\n  console.log("Goodbye!");\n}\n'},
					{type: 'robot', code: 'while(!robot.detectGoal()) {\n  if (robot.detectWall()) {\n    robot.turnLeft();\n  }\n  robot.drive();\n}', state: '{"columns":3,"rows":4,"initialX":1,"initialY":3,"initialAngle":90,"mazeObjects":1,"verticalActive":[[false,false,false,false],[false,false,false,false],[false,true,false,false]],"horizontalActive":[[false,true,false,false],[false,true,false,false],[false,false,false,false]],"blockGoal":[[false,true,false,false],[false,false,false,false],[false,false,false,false]],"numGoals":1}'}
				]
			},
			'jsmm.else': { // am-pm does not work!
				name: 'else',
				text: '<p><var>else</var> is always used <strong>together</strong> with <var>if</var>. The part between the brackets after the else-statement is only executed if the boolean in the if-statement is <var>false</var>. Both statements can also be <strong>combined</strong> into an <var>else if</var>, see the example below.</p>',
				examples: [
					{type: 'console', code: 'var number = 6;\nif (number == 10) {\n  console.log("Number is 10");\n} else {\n  console.log("Number is not 10");\n}\n\nvar weight = 25;\nvar maximum = 18;\nif (weight <= maximum) {\n  console.log("Bag is allowed");\n} else {\n  console.log("Bag is too heavy");\n}\n\nvar time = 15;\nif (time < 12) {\n  console.log("morning");\n} else if (time < 18) {\n  console.log("afternoon");\n} else {\n  console.log("evening");\n}'}
				]
			},
			'jsmm.while': {
				name: 'while (boolean)',
				text: '<p>The while-loop is used to create <strong>repetition</strong> in a program. Before the part between the brackets is executed, the boolean is <strong>checked</strong>. If it is <var>true</var>, the part is <strong>executed</strong>, otherwise the part is <strong>skipped</strong>, like with an if-statement. After executing the code between brackets, the boolean is checked <strong>again</strong>, and so on.</p>',
				examples: [
					{type: 'console', code: 'var i = 0;\nwhile(i < 5) {\n  console.log(i);\n  i = i+1;\n}'}
				]
			},
			'jsmm.for': {
				name: 'for (statement; boolean; statement)',
				text: '<p>The for-loop is a <strong>shorthand</strong> notation for commonly used while-loops. The first statement is executed <strong>before</strong> the for-loop starts, which is often used for <strong>initializing</strong> a variable, such as <var>i = 0</var>. The boolean is <strong>checked</strong> before the part between brackets is executed, just as with while-loops. Finally, the second statement is <strong>executed</strong> after each loop, for example to increase a counter variable by doing <var>i++</var>.</p>',
				examples: [
					{type: 'console', code: 'for(var i = 0; i < 5; i++) {\n  console.log(i);\n}\n\n\n'},
					{type: 'canvas', code: 'for (var i=0; i<10; i++) {\n  var x = 10+i*10;\n  context.fillRect(x, 10+i*15, 5, 5);\n  context.fillRect(x, 145-i*15, 5, 5);\n}'}
				]
			},
			'jsmm.function': {
				name: 'function name(arguments)',
				text: '<p>Functions are used to avoid having to write the <strong>same code</strong> over and over again. They are pieces of code that you can <strong>call</strong> from other points in the program. Between parentheses you can specify variables that should be passed into the function, these are called <strong>arguments</strong>.</p>',
				examples: [
					{type: 'robot', code: 'function forwardRight(dist) {\n  robot.drive(dist);\n  robot.turnRight();\n}\nforwardRight(3);\nforwardRight(2);\nforwardRight(2);\nforwardRight(1);'},
					//{type: 'console', code: 'function printAmPm(hour) {\n  if (hour == 0) {\n    console.log(\"12am\");\n  } else if (hour < 12) {\n    console.log(hour + \"am\");\n  } else if (hour == 12) {\n    console.log(\"12pm\");\n  } else {\n    console.log((hour-12) + \"pm\");\n  }\n}\n\nprintAmPm(15);\nprintAmPm(0);\nprintAmPm(5);\nprintAmPm(12);'},
					{type: 'console', code: 'function printStuff(a, b, c) {\n  console.log("a: " + a);\n  console.log("b: " + b);\n  console.log("c: " + c);\n}\n\nprintStuff("Hi!", 10, "");\nprintStuff(3*3, "Boo!", true);'},
					{type: 'canvas', code: '\nfunction smiley(x, y) {\n  context.fillRect(x+7, y+6, 5, 5);\n  context.fillRect(x+18, y+6, 5, 5);\n  context.beginPath();\n  context.arc(x+15,y+9,12,0.5,-3.6);\n  context.fill();\n}\nsmiley(10, 10);\nsmiley(20, 80);\nsmiley(60, 100);\nsmiley(80, 60);\ncontext.fillStyle = "#0aa";\nsmiley(100, 20);'}
				]
			},
			'jsmm.return': {
				name: 'return value',
				text: '<p>Functions can also <strong>return</strong> some value after they have been run. For example, <var>robot.detectWall()</var> returns <var>true</var> or <var>false</var> depending on whether or not the robot faces a wall. Your functions can return some value, too. For example, to return the number 5 at some point in a function, you write <var>return 5;</var>. The function then stops and returns that number at the place where it was called.</p>',
				examples: [
					{type: 'console', code: 'function largest(num1, num2) {\n  if (num1 > num2) {\n    return num1;\n  } else {\n    return num2;\n  }\n}\n\nconsole.log(largest(6, 10));\nconsole.log(largest(30, 40) + 2);\nconsole.log(largest(0, 5) + largest(5, 10));'}
				]
			},
			'jsmm.array.creation': {
				name: '[value1, value2, ...] <small>(array creation)</small>',
				text: '<p>An <strong>array</strong> is a list of variables, all of which have a <strong>number</strong>. This allows you to store a bunch of <strong>values</strong> at once, instead of having to declare a lot of variables. A <strong>new</strong> array is written like this: <var>[]</var>. You can also put some values in when creating an array. For example, if we create an array with letters, <var>["a", "b", "c"]</var>, then these letters are placed on positions 0, 1, and 2.</p>',
				examples: [
					{type: 'console', code: 'var letters = ["a", "b", "c"];\nconsole.log(letters[0]);\nconsole.log(letters[1]);\nconsole.log(letters[2]);'}
				]
			},
			'jsmm.array.access': {
				name: 'array[] <small>(array access)</small>',
				text: '<p>In order to <strong>retrieve</strong> values from an array, and to <strong>put</strong> new values in an array, we write <var>array[0]</var>, or with any other number. You then get the <strong>value</strong> corresponding to that number, just when writing a variable name. The difference with a normal variable, however, is that we can also <strong>calculate</strong> this number, for example <var>letters[10-8]</var>.</p>',
				examples: [
					{type: 'console', code: 'var letters = ["a", "b", "c"];\nconsole.log(letters[0]);\nconsole.log(letters[10-8]);\n\nletters[10] = "k";\nconsole.log(letters[10]);'}
				]
			}
		}
	});
};

},{"../robot":41}],18:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

module.exports = function(info) {
	info.tables.push({
		html: '<p><span class="info-output"><i class="icon icon-th icon-white"></i> robot</span></p><p>The robot tab provides a simple <strong>simulation</strong> of an actual robot, with commands to drive and turn. Additionally, <strong>walls</strong> can be placed in the environment, which can be detected by the robot. Squares can be coloured green, indicating a <strong>goal</strong> for the robot to go to, and these can also be detected by the robot.</p>',
		list: {
			'robot.drive': {
				name: 'robot.drive(distance)',
				text: '<p>This command makes the robot drive <strong>forward</strong> for a certain distance (or backwards, if distance is negative). For example, to move the robot 3 blocks, use <var>robot.drive(3);</var>. If you don\'t fill in the distance, it just uses distance 1.</p>',
				examples: [
					{type: 'robot', code: 'robot.drive(3);'}
				]
			},
			'robot.turnLeft': {
				name: 'robot.turnLeft(degrees)',
				text: '<p>This command makes the robot turn <strong>left</strong> (counter-clockwise) for a certain number of degrees. If you don\'t fill in the number of degrees, it just uses 90 degrees. If there are walls placed, you can only turn with right angles.</p>',
				examples: [
					{type: 'robot', code: 'robot.drive(2);\nrobot.turnLeft();\nrobot.drive();'}
				]
			},
			'robot.turnRight': {
				name: 'robot.turnRight(degrees)',
				text: '<p>This command makes the robot turn <strong>right</strong> (clockwise) for a certain number of degrees. If you don\'t fill in the number of degrees, it just uses 90 degrees. If there are walls placed, you can only turn with right angles.</p>',
				examples: [
					{type: 'robot', code: 'robot.drive(3);\nrobot.turnRight();\nrobot.drive();\nrobot.turnRight(45);\nrobot.drive();'}
				]
			},
			'robot.detectWall': {
				name: 'robot.detectWall()',
				text: '<p>This function returns a boolean (<var>true</var> or <var>false</var>) depending on whether there is a <strong>wall</strong> right in front of the robot. It is usually used inside other statements, such as <var>if (robot.detectWall())</var>, but you can also print the value to the console.</p>',
				examples: [
					{type: 'robot', code: 'console.log(robot.detectWall());\nrobot.drive();\nconsole.log(robot.detectWall());\nrobot.drive();\nconsole.log(robot.detectWall());\nrobot.turnLeft();\nconsole.log(robot.detectWall());', state: '{"columns":3,"rows":4,"initialX":1,"initialY":3,"initialAngle":90,"mazeObjects":1,"verticalActive":[[false,false,false,false],[false,false,false,false],[false,false,false,false]],"horizontalActive":[[false,false,false,false],[false,true,false,false],[false,false,false,false]],"blockGoal":[[false,false,false,false],[false,false,false,false],[false,false,false,false]],"numGoals":0}'},
					{type: 'robot', code: 'while(!robot.detectWall()) {\n  robot.drive();\n}', state: '{"columns":3,"rows":4,"initialX":1,"initialY":3,"initialAngle":90,"mazeObjects":1,"verticalActive":[[false,false,false,false],[false,false,false,false],[false,false,false,false]],"horizontalActive":[[false,false,false,false],[false,true,false,false],[false,false,false,false]],"blockGoal":[[false,false,false,false],[false,false,false,false],[false,false,false,false]],"numGoals":0}'}
				]
			},
			'robot.detectGoal': {
				name: 'robot.detectGoal()',
				text: '<p>This function returns a boolean (<var>true</var> or <var>false</var>) depending on whether the robot is standing on top of a <strong>goal</strong> square. It is usually used inside other statements, such as <var>if (robot.detectGoal())</var>, but you can also print the value to the console.</p>',
				examples: [
					{type: 'robot', code: 'while(!robot.detectGoal()) {\n  robot.drive();\n  var goal = robot.detectGoal();\n  console.log(goal);\n}', state: '{"columns":2,"rows":4,"initialX":0,"initialY":3,"initialAngle":90,"mazeObjects":1,"verticalActive":[[false,false,false,false],[false,false,false,false]],"horizontalActive":[[false,false,false,false],[false,false,false,false]],"blockGoal":[[true,false,false,false],[false,false,false,false]],"numGoals":1}'}
				]
			}
		}
	});
};

},{}],19:[function(require,module,exports){
/*jshint node:true*/
"use strict";

var jsmm = {};
jsmm.debug = true;
jsmm.maxWidth = 60;
jsmm.defaultLimits = {
	history: 30,
	base: {
		callStackDepth: 100,
		executionCounter: 4000,
		costCounter: 1000
	},
	event: {
		callStackDepth: 100,
		executionCounter: 400,
		costCounter: 100
	}
};

require('./jsmm.nodes')(jsmm);
require('./jsmm.parser')(jsmm);
require('./jsmm.tree')(jsmm);
require('./jsmm.msg')(jsmm);
require('./jsmm.context')(jsmm);
require('./jsmm.run')(jsmm);
require('./jsmm.func')(jsmm);
require('./jsmm.dot')(jsmm);
require('./jsmm.simple.runner')(jsmm);
require('./jsmm.static.runner')(jsmm);
require('./jsmm.test')(jsmm);
require('./jsmm.editor')(jsmm);

module.exports = jsmm;
},{"./jsmm.context":20,"./jsmm.dot":21,"./jsmm.editor":22,"./jsmm.func":23,"./jsmm.msg":24,"./jsmm.nodes":25,"./jsmm.parser":26,"./jsmm.run":27,"./jsmm.simple.runner":28,"./jsmm.static.runner":29,"./jsmm.test":30,"./jsmm.tree":31}],20:[function(require,module,exports){
/*jshint node:true*/
"use strict";

module.exports = function(jsmm) {
	jsmm.CommandTracker = function() { return this.init.apply(this, arguments); };
	jsmm.CommandTracker.prototype = {
		init: function() {
			this.idsByTopNodeId = {};
			this.idsByNodeId = {};
			this.nodeIdsById = {};
		},

		addCommand: function(node, id) {
			this.idsByNodeId[node.id] = this.idsByNodeId[node.id] || [];
			this.idsByNodeId[node.id].push(id);

			this.idsByTopNodeId[node.getTopNode().id] = this.idsByTopNodeId[node.getTopNode().id] || [];
			this.idsByTopNodeId[node.getTopNode().id].push(id);

			if (this.nodeIdsById[id] === undefined) this.nodeIdsById[id] = {};
			this.nodeIdsById[id][node.id] = true;
		},

		getHighlightIdsByNodeId: function(id) {
			return this.idsByNodeId[id] || [];
		},

		getHighlightIdsByTopNodeId: function(id) {
			return this.idsByTopNodeId[id] || [];
		},

		getHighlightNodeIdsById: function(id) {
			return Object.keys(this.nodeIdsById[id] || []);
		}
	};

	jsmm.ScopeTracker = function() { return this.init.apply(this, arguments); };
	jsmm.ScopeTracker.prototype = {
		init: function() {
			this.scopes = [];
			this.nodeIds = {};
			this.calls = [];
		},

		logScope: function(stepNum, node, data) {
			if (data.type === 'assignment') {
				var obj = data.scope.find(data.name);
				if (obj !== undefined) {
					if (data.scope.parent === null || data.scope.vars[data.name] === undefined) {
						this.addAssignment(stepNum, node, 0, data.name, jsmm.stringify(obj.value, data.scope), true);
					} else {
						this.addAssignment(stepNum, node, this.scopes.length-1, data.name, jsmm.stringify(obj.value, data.scope), true);
					}
				}
			} else if (data.type === 'return') {
				this.calls.push({type: 'return', stepNum: stepNum});
			} else { // data.type === 'enter'
				this.scopes.push({});
				this.calls.push({type: 'enter', stepNum: stepNum, name: data.name, position: this.scopes.length-1});

				for (var name in data.scope.vars) {
					this.addAssignment(stepNum, node, this.scopes.length-1, name, jsmm.stringify(data.scope.vars[name].value, data.scope), data.name !== 'global');
				}
			}
		},

		getState: function(stepNum) {
			var stack = [];

			for (var i=0; i<this.calls.length; i++) {
				var call = this.calls[i];
				if (call.stepNum > stepNum) break;

				if (call.type === 'assignment') {
					var level = stack[call.position === 0 ? 0 : stack.length-1];
					var scope = level.scope;
					if (scope[call.name] === undefined) {
						scope[call.name] = {id: call.position + '-' + call.name, name: call.name, value: call.value};
						level.names.push(call.name);
					}
					scope[call.name].value = call.value;
					if (call.stepNum === stepNum) scope[call.name].highlight = true;
				} else if (call.type === 'return') {
					stack.pop();
				} else { // call.type === 'enter'
					stack.push({id: '' + call.position, name: call.name, names: [], scope: {}});
				}
			}
			return stack;
		},

		getHighlightNodeIdsById: function(id) {
			var split = id.split('-');
			if (split.length < 2) return [];
			var scope = this.scopes[split[0]];
			if (scope === undefined) return [];
			return Object.keys(scope[split[1]] || []);
		},

		getHighlightIdsByNodeId: function(nodeId) {
			return this.nodeIds[nodeId] || [];
		},

		/// INTERNAL FUNCTIONS ///
		addAssignment: function(stepNum, node, position, name, value, highlight) {
			if (highlight) {
				if (this.scopes[position][name] === undefined) this.scopes[position][name] = {};
				this.scopes[position][name][node.id] = true;

				var topNodeId = node.getTopNode().id;
				if (this.nodeIds[topNodeId] === undefined) this.nodeIds[topNodeId] = [];
				this.nodeIds[topNodeId].push(position + '-' + name);
			}

			this.calls.push({type: 'assignment', stepNum: stepNum, position: position, name: name, value: value});
		}
	};

	jsmm.Array = function() { return this.init.apply(this, arguments); };
	jsmm.Array.prototype = {
		type: 'array',
		string: '[array]',
		init: function(values) {
			this.values = [];
			for (var i=0; i<values.length; i++) {
				this.values[i] = {type: 'local', value: values[i]};
			}

			var that = this;
			this.properties = {
				length: {
					name: 'length',
					info: 'array.length',
					type: 'variable',
					example: 'length',
					get: function() { return that.getLength.apply(that, arguments); },
					set: function() { return that.setLength.apply(that, arguments); }
				}
			};
		},

		getLength: function(name) {
			return this.values.length;
		},

		setLength: function(context, name, value) {
			this.values.length = value;
		},

		getArrayValue: function(index) {
			if (index < this.values.length) {
				if (this.values[index] === undefined) {
					this.values[index] = {type: 'local', value: undefined};
				}
				return this.values[index];
			} else {
				return {type: 'newArrayValue', array: this, index: index};
			}
		},

		setArrayValue: function(index, value) {
			this.values[index] = {type: 'local', value: value};
		},

		getCopy: function() {
			var values = [];
			for (var i=0; i<this.values.length; i++) {
				if (this.values[i] !== undefined) {
					values[i] = this.values[i].value;
				}
			}
			return new jsmm.Array(values);
		},

		serialize: function(scope) {
			var output = '[';
			for (var i=0; i<this.values.length; i++) {
				if (i>0) output += ', ';
				if (this.values[i] === undefined) output += 'undefined';
				else output += jsmm.stringify(this.values[i].value, scope);
			}
			return output + ']';
		}
	};

	jsmm.Scope = function() { return this.init.apply(this, arguments); };
	jsmm.Scope.prototype = {
		init: function(vars, parent, copyScope) {
			this.vars = {};
			this.arrays = [];
			this.functions = {};
			for (var name in vars) {
				this.vars[name] = {type: 'local', value: vars[name]};
				if (copyScope) {
					if (typeof vars[name] === 'object' && vars[name].type === 'arrayPointer') {
						this.addArrayItems(copyScope, vars[name].id);
					}
					if (typeof vars[name] === 'object' && vars[name].type === 'functionPointer') {
						this.functions[vars[name].name] = copyScope.functions[vars[name].name];
					}
				}
			}
			this.parent = parent || null;
			this.topParent = this;
			while (this.topParent.parent !== null) {
				this.topParent = this.topParent.parent;
			}
		},

		addArrayItems: function(copyScope, id) {
			this.arrays[id] = copyScope.arrays[id].getCopy();
			for (var i=0; i<copyScope.arrays[id].values.length; i++) {
				var value = copyScope.arrays[id].values[i];
				if (value !== undefined && typeof value.value === 'object' && value.value.type === 'arrayPointer') {
					this.addArrayItems(copyScope, value.value.id);
				}
			}
		},

		find: function(name) {
			var scope = this;
			do {
				if (scope.vars[name] !== undefined) {
					return scope.vars[name];
				}
				scope = scope.parent;
			} while(scope !== null);
			return undefined;
		},

		getCopy: function() {
			var vars = {}, arrays = [];
			for (var name in this.vars) {
				vars[name] = this.vars[name].value;
			}
			return new jsmm.Scope(vars, this.parent, this.topParent);
		},

		registerArray: function(array) {
			this.topParent.arrays.push(array);
			return this.topParent.arrays.length-1;
		},

		getArray: function(id) {
			return this.topParent.arrays[id];
		},

		clearFunctions: function() {
			this.topParent.functions = [];
		},

		declareFunction: function(name, func) {
			this.topParent.functions[name] = func;
			this.vars[name] = {type: 'local', value: {type: 'functionPointer', name: name, string: '[function ' + name + ']'}};
		},

		getFunction: function(name) {
			return this.topParent.functions[name];
		}
	};

	// scope is optional, only for verbose output, such as content of arrays
	jsmm.stringify = function(value, scope) {
		if (value === undefined) return 'undefined';
		else if (scope !== undefined && typeof value === 'object' && value.type === 'arrayPointer') return scope.getArray(value.id).serialize(scope);
		else if (typeof value === 'object') return value.string;
		else return JSON.stringify(value);
	};

	jsmm.Context = function() { return this.init.apply(this, arguments); };
	jsmm.Context.prototype = {
		init: function(tree, scope, limits) {
			this.tree = tree;
			this.scope = scope;
			this.scopeStack = [this.scope];
			this.startScope = scope.getCopy();

			this.limits = limits;
			this.executionCounter = 0;
			this.costCounter = 0;

			this.steps = [];
			this.callStackNodes = [];
			this.callIdsByNodeIds = {};
			this.commandTracker = new jsmm.CommandTracker();
			this.scopeTracker = new jsmm.ScopeTracker();
			this.calledFunctions = [];
			this.callNodeId = null;
			this.callId = null;
			this.error = null;
		},

		/// OUTPUT FUNCTIONS ///
		getCallNodeId: function() {
			return this.callNodeId;
		},

		getCallId: function() {
			return this.callId;
		},

		getCommandTracker: function() {
			return this.commandTracker;
		},

		getScopeTracker: function() {
			return this.scopeTracker;
		},

		throwTimeout: function(nodeId) {
			throw new jsmm.msg.Error(nodeId || this.callNodeId, 'Program takes too long to run');
		},

		/// TREE/RUNNER FUNCTIONS ///
		run: function(funcName, args) {
			this.scopeTracker.logScope(-1, this.tree.programNode, {type: 'enter', scope: this.scope, name: 'global'});

			var func;
			if (funcName !== undefined) {
				func = this.scope.getFunction(funcName);
				if (func === undefined) {
					this.error = new jsmm.msg.Error(0, 'Function <var>' + funcName + '</var> could not be found');
					this.pushStep(this.error);
					return;
				}
				this.isFunctionContext = true;
			} else {
				func = this.tree.programNode.getRunFunction();
				this.isFunctionContext = false;
			}

			try {
				func(this, args);
			} catch (error) {
				if (error.type === 'Error') {
					this.error = error;
				} else {
					this.error = new jsmm.msg.Error(0, 'An unknown error has occurred', error);
					if (jsmm.debug) {
						throw error;
					}
				}
				this.pushStep(this.error);
			}
		},

		hasError: function() {
			return this.error !== null;
		},

		getError: function() {
			return this.error;
		},

		getBaseScope: function() {
			return this.scopeStack[0];
		},

		getStartScope: function() {
			return this.startScope;
		},

		getCalledFunctions: function() {
			return this.calledFunctions;
		},

		getCallIdsByNodeIds: function(nodeIds) {
			var callIds = {};
			for (var i=0; i<nodeIds.length; i++) {
				var id = nodeIds[i];
				if (this.callIdsByNodeIds[id] !== undefined) {
					for (var j=0; j<this.callIdsByNodeIds[id].length; j++) {
						callIds[this.callIdsByNodeIds[id][j]] = true;
					}
				}
			}
			return Object.keys(callIds);
		},

		getNodeIdByStepNum: function(stepNum) {
			if (stepNum >= this.steps.length) return 0;
			else {
				return this.steps[stepNum].nodeId;
			}
		},

		/// JS-- PROGRAM FUNCTIONS ///
		enterCall: function(node) {
			this.callStackNodes.push(node);
			if (this.callStackNodes.length > this.limits.callStackDepth) {
				//throw new jsmm.msg.Error(node.id, 'Too many nested function calls have been made already, perhaps there is infinite recursion somewhere');
				this.throwTimeout(node.id);
			}
		},

		leaveCall: function() {
			return this.callStackNodes.pop();
		},

		enterFunction: function(node, vars, fullName) {
			this.scope = new jsmm.Scope(vars, this.scopeStack[0]);
			this.scopeStack.push(this.scope);
			this.scopeTracker.logScope(this.getStepNum(), node, {type: 'enter', scope: this.scope, name: fullName});
			this.calledFunctions.push(node.name);
		},

		leaveFunction: function(node) {
			this.scopeStack.pop();
			this.scope = this.scopeStack[this.scopeStack.length-1];
			this.scopeTracker.logScope(this.getStepNum(), node, {type: 'return', scope: this.scope});
		},

		addAssignment: function(node, name) {
			this.scopeTracker.logScope(this.getStepNum(), node, {type: 'assignment', scope: this.scope, name: name});
		},

		externalCall: function(node, funcValue, args) {
			this.callNodeId = node.id;
			this.callId = node.id;
			for (var i=0; i<this.callStackNodes.length; i++) {
				this.callId += '-' + this.callStackNodes[i].getTopNode().id;
			}

			for (i=0; i<this.callStackNodes.length; i++) {
				var nodeId = this.callStackNodes[i].getTopNode().id;
				if (this.callIdsByNodeIds[nodeId] === undefined) {
					this.callIdsByNodeIds[nodeId] = [];
				}
				if (this.callIdsByNodeIds[nodeId].indexOf(this.callId) < 0) {
					this.callIdsByNodeIds[nodeId].push(this.callId);
				}
			}

			this.costCounter += funcValue.cost || 1;
			if (this.costCounter > this.limits.costCounter) {
				this.throwTimeout(node.id);
			}

			try {
				return funcValue.func.call(null, this, funcValue.name, args);
			} catch (error) {
				// augmented functions should do their own error handling, so wrap the resulting strings in jsmm messages
				if (typeof error === 'string') {
					throw new jsmm.msg.Error(node.id, error);
				} else {
					throw error;
				}
			}
		},

		inFunction: function() {
			return this.isFunctionContext || this.callStackNodes.length > 0;
		},

		increaseExecutionCounter: function(node, amount) {
			this.executionCounter += amount;
			if (this.executionCounter > this.limits.executionCounter) {
				this.throwTimeout(node.id);
			}
		},

		pushStep: function(step) {
			this.steps.push(step);
		},

		getStepNum: function() {
			return this.steps.length;
		},

		addCommand: function(node, command) {
			this.commandTracker.addCommand(node, command);
		},

		getAllSteps: function() {
			return this.steps;
		}
	};
};

},{}],21:[function(require,module,exports){
/*jshint node:true*/
"use strict";

module.exports = function(jsmm) {
	var makeEdge = function(from, to) {
		return from + '->' + to + ';';
	};
	
	var makeNode = function(id, label, shape) {
		label = label.replace(/\"/g, '&quot;');
		label = label.replace(/\\/g, '\\\\');
		shape = shape || '';
		return id + '[label="' + label + '"shape="' + shape + '"];';
	};
	
	/* statementList */
	jsmm.nodes.Program.prototype.getDot = function() {
		return 'digraph{graph[ordering='in'];' + makeNode(this.id, 'PROGRAM') + this.statementList.getDot(this.id) + '}';
	};
	
	/* statements */
	jsmm.nodes.StatementList.prototype.getDot = function(fromId) {
		var output = makeEdge(fromId, this.id);
		output += 'subgraph cluster' + this.id + '{color=lightgrey;';
		output += makeNode(this.id, '', 'point');
		for (var i=0; i<this.statements.length; i++) {
			output += this.statements[i].getDot(this.id);
		}
		output += '}';
		return output;
	};
	
	/* statement */
	jsmm.nodes.CommonSimpleStatement.prototype.getDot = function(fromId) {
		return this.statement.getDot(fromId);
	};
	
	/* items */
	jsmm.nodes.VarStatement.prototype.getDot = function(fromId) {
		var output = makeEdge(fromId, this.id);
		output += 'subgraph cluster' + this.id + '{color=transparent;';
		output += makeNode(this.id, 'var');
		for (var i=0; i<this.items.length; i++) {
			output += this.items[i].getDot(this.id);
		}
		output += '}';
		return output;
	};
	
	/* name, assignment */
	jsmm.nodes.VarItem.prototype.getDot = function(fromId) {
		var output = '';
		if (this.assignment === null) {
			output += makeEdge(fromId, this.id);
			output += makeNode(this.id, this.name);
		}
		else {
			output += this.assignment.getDot(fromId);
		}
		return output;
	};
	
	jsmm.nodes.PostfixStatement.prototype.getDot =
	jsmm.nodes.AssignmentStatement.prototype.getDot =
	jsmm.nodes.ReturnStatement.prototype.getDot =
	jsmm.nodes.BinaryExpression.prototype.getDot =
	jsmm.nodes.UnaryExpression.prototype.getDot =
	jsmm.nodes.NumberLiteral.prototype.getDot =
	jsmm.nodes.StringLiteral.prototype.getDot =
	jsmm.nodes.BooleanLiteral.prototype.getDot =
	jsmm.nodes.NameIdentifier.prototype.getDot =
	jsmm.nodes.ObjectIdentifier.prototype.getDot =
	jsmm.nodes.ArrayIdentifier.prototype.getDot =
	jsmm.nodes.FunctionCall.prototype.getDot = function(fromId) {
		return makeEdge(fromId, this.id) + makeNode(this.id, this.getCode());
	};

	/* expressions */
	jsmm.nodes.ArrayDefinition.prototype.getDot = function(fromId) {
		var output = makeEdge(fromId, this.id);
		output += makeNode(this.id, '[]');
		for (var i=0; i<this.expressions.length; i++) {
			output += this.expressions[i].getDot(this.id);
		}
		return output;
	};
	
	/* expression, statementList, elseBlock */
	jsmm.nodes.IfBlock.prototype.getDot = function(fromId) {
		var output = makeEdge(fromId, this.id);
		output += makeNode(this.id, 'if (' + this.expression.getCode() + ')', 'box');
		output += this.statementList.getDot(this.id);
		if (this.elseBlock !== null) {
			output += this.elseBlock.getDot(this.id);
		}
		return output;
	};
	
	/* ifBlock */
	jsmm.nodes.ElseIfBlock.prototype.getDot = function(fromId) {
		var output = makeEdge(fromId, this.id);
		output += makeNode(this.id, 'else', 'box');
		output += this.ifBlock.getDot(this.id);
		return output;
	};
	
	/* statementList */
	jsmm.nodes.ElseBlock.prototype.getDot = function(fromId) {
		var output = makeEdge(fromId, this.id);
		output += makeNode(this.id, 'else', 'box');
		output += this.statementList.getDot(this.id);
		return output;
	};
	
	/* expression, statementList */
	jsmm.nodes.WhileBlock.prototype.getDot = function(fromId) {
		var output = makeEdge(fromId, this.id);
		output += makeNode(this.id, 'while (' + this.expression.getCode() + ')', 'box');
		output += this.statementList.getDot(this.id);
		return output;
	};
	
	/* statement1, expression, statement2, statementList */
	jsmm.nodes.ForBlock.prototype.getDot = function(fromId) {
		var output = makeEdge(fromId, this.id);
		output += makeNode(this.id, 'for ( ; ' + this.expression.getCode() + ' ; )', 'box');
		output += this.statement1.getDot(this.id);
		output += this.statementList.getDot(this.id);
		output += this.statement2.getDot(this.id);
		return output;
	};
	
	/* name, nameArgs, statementList */
	jsmm.nodes.FunctionDeclaration.prototype.getDot = function(fromId) {
		var output = makeEdge(fromId, this.id);
		output += makeNode(this.id, 'function ' + this.name + this.getArgList(), 'octagon');
		output += this.statementList.getDot(this.id);
		return output;
	};
};

},{}],22:[function(require,module,exports){
/*jshint node:true*/
"use strict";

module.exports = function(jsmm) {
	jsmm.editor = {};

	jsmm.editor.autocompletion = {
		// expected text format: someObject.someProperty.startOfAFunction
		getExamples: function(scope, text) {
			var split = text.split('.');

			var obj = scope.find(split[0]);
			
			if (obj === undefined || typeof obj.value !== 'object' || obj.value.properties === undefined) return null;
			obj = obj.value;
			for (var i=1; i<split.length-1; i++) {
				obj = obj.properties[split[i]];
				if (typeof obj !== 'object' || obj.properties === undefined) return null;
			}

			var examples = [];
			var start = split[split.length-1].toLowerCase();
			for (var name in obj.properties) {
				var example;
				if (typeof obj.properties[name] === 'object' && obj.properties[name].example !== undefined) {
					example = obj.properties[name].example;
				} else {
					example = name;
				}

				if (start.length === 0 || example.substring(0, start.length).toLowerCase() === start) {
					// split into name part and "= 123" or "(100, 150)" part
					var splitExample = example.split(/( \=.*|\(.*)/);
					if (splitExample[1] !== undefined && splitExample[1].length > 0) {
						splitExample[1] += ';';
					} else {
						splitExample[1] = '';
					}
					examples.push(splitExample);
				}
			}
			return {
				examples: examples,
				width: start.length,
				prefix: text.substring(0, text.length - start.length)
			};
		}
	};

	jsmm.editor.editables = {
		generate: function(tree, editorEditables, surface, editor) {
			var editables = [];
			var i;
			var booleanNodes = tree.getNodesByType('BooleanLiteral');
			if (booleanNodes !== undefined) {
				for (i=0; i<booleanNodes.length; i++) {
					editables.push(new editorEditables.CycleEditable(booleanNodes[i], surface, editor, this.parseBoolean, this.makeBoolean));
				}
			}
			var numberNodes = tree.getNodesByType('NumberLiteral');
			if (numberNodes !== undefined) {
				for (i=0; i<numberNodes.length; i++) {
					var node = numberNodes[i];
					if (node.parent.type === 'UnaryExpression') {
						node = node.parent;
					}
					editables.push(new editorEditables.NumberEditable(node, surface, editor, this.parseNumber, this.makeNumber));
				}
			}
			var stringNodes = tree.getNodesByType('StringLiteral');
			if (stringNodes !== undefined) {
				for (i=0; i<stringNodes.length; i++) {
					var str = stringNodes[i].str;
					if (jsmm.editor.editables.splitColor('"' + str + '"') !== null) {
						editables.push(new editorEditables.ColorEditable(stringNodes[i], surface, editor, this.parseColor, this.makeColor));
					}
				}
			}
			return editables;
		},

		parseBoolean: function(text) {
			this.value = text === 'true';
			return (text === 'true' || text === 'false');
		},

		makeBoolean: function() {
			return this.value ? 'false' : 'true';
		},

		splitNumber: function(text) {
			var match = /^[+]?([\-]?)[ ]*([0-9]+)(?:[.]([0-9]+))?(?:([eE])[+]?([\-]?[0-9]+))?$/g.exec(text);
			if (match === null) {
				return null;
			} else {
				return {
					sign: match[1], // either "-" or undefined ("+" is dropped)
					integer: match[2], // integer part, cannot be undefined (if the number is valid)
					decimals: match[3], // decimal part without ".", or undefined
					exponentLetter: match[4], // either "e", "E", or undefined
					exponent: match[5] // the exponent part without the letter, but with an optional "-" (again not "+"), or undefined
				};
			}
		},

		parseNumber: function(text) {
			this.numberData = {};
			// remove spaces since it is possible to have e.g. "-  5"
			this.numberData.value = parseFloat(text.replace(/[ ]+/g, ''));
			var split = jsmm.editor.editables.splitNumber(text);

			if (split === null || !isFinite(this.numberData.value)) {
				return false;
			} else {
				// if an exponent is defined, use the capitalisation already used in the value
				this.numberData.exponentLetter = split.exponentLetter || 'e';

				// calculate the delta for each offset pixel based on the number of decimals in the original number (and of course exponent)
				// the delta is inverted as this seems to reduce the number of rounding errors (e.g. 0.57 !== 57*0.01, but 0.57 === 57/100)
				this.numberData.invDelta = Math.pow(10, -(parseInt(split.exponent || '0', 10) - (split.decimals || '').length));

				// determine the number of significant digits by trimming leading zeros
				var significant = (split.integer + (split.decimals || '')).replace(/^0*/, '').length;
				
				// when zero, the number of significant digits is the number of decimals plus one
				if (this.numberData.value === 0 && split.decimals !== undefined) {
					significant = split.decimals.length+1;
				}

				// clamp the number
				if (significant > 8) significant = 8;
				else if (significant < 1) significant = 1;

				// the final number of decimals has to be based on the .toPrecision value with the calculated number of significant digits,
				// as this will be used when generating the number, and this function may alter the format of the number (e.g. different
				// number of digits and exponent, etc.)
				this.numberData.decimals = (jsmm.editor.editables.splitNumber(this.numberData.value.toPrecision(significant)).decimals || '').length;
				
				return true;
			}
		},

		makeNumber: function(offset) {
			// calculate new number with 8 significant digits and split it
			// for calculating the new number the function x^3/(x^2+200), which provides nice snapping to the original number and
			// lower sensitiveness near the original number
			var split = jsmm.editor.editables.splitNumber((this.numberData.value + (offset*offset*offset)/((offset*offset+200)*this.numberData.invDelta)).toPrecision(8));

			// start off with the integer part
			var newText = split.integer;

			// if we want any decimals, take all the decimals we get with 8 significant digits, and cap this off by the required amount
			if (this.numberData.decimals > 0) {
				newText += '.' + (split.decimals || '0').substring(0, this.numberData.decimals);
			}

			// add the exponent using the user-defined letter, if necessary
			if (split.exponent !== undefined) {
				newText += this.numberData.exponentLetter + split.exponent;
			}

			// finally add the negative sign if required, and if the rest of the number we have so far does not evaluate to zero
			if (split.sign === '-' && parseFloat(newText) !== 0) {
				newText = '-' + newText;
			}

			return newText;
		},

		splitColor: function(text) {
			var match = /^["]([#][0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)|(?:(rgb|rgba|hsl|hsla)[(][ ]*(\d+(?:[.]\d+)?)([%]?)[ ]*,[ ]*(\d+(?:[.]\d+)?)([%]?)[ ]*,[ ]*(\d+(?:[.]\d+)?)([%]?)[ ]*(?:,[ ]*(\d+(?:[.]\d+)?)[ ]*)?[)])["]$/g.exec(text);
			if (match === null) {
				return null;
			} else {
				return {
					hex: match[1], // either "#xxx" or "#xxxxxx"
					format: match[2], // either "rgb", "rgba", "hsl", "hsla", or undefined
					part1: match[3], // number
					percent1: match[4], // either "" or "%"
					part2: match[5], // number
					percent2: match[6], // either "" or "%"
					part3: match[7], // number
					percent3: match[8], // either "" or "%"
					alpha: match[9] // alpha part or undefined
				};
			}
		},

		parseColor: function(text) {
			this.colorData = {};
			var split = jsmm.editor.editables.splitColor(text);
			if (split === null) {
				return false;
			} else {
				if (split.hex !== undefined) {
					this.colorData.value = split.hex;
					this.colorData.format = 'hex';
					return true;
				} else {
					var a;
					if (split.format === 'rgb' || split.format === 'rgba') {
						var r = parseFloat(split.part1);
						var g = parseFloat(split.part2);
						var b = parseFloat(split.part3);
						a = parseFloat(split.alpha || '1');
						if (split.percent1 === '%') {
							r = r*255/100;
						}
						if (split.percent2 === '%') {
							g = g*255/100;
						}
						if (split.percent3 === '%') {
							b = b*255/100;
						}
						if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 1) return false;
						this.colorData.value = 'rgba(' + r.toFixed(0) + ', ' + g.toFixed(0) + ', ' + b.toFixed(0) + ', ' + a.toFixed(2) + ')';
						this.colorData.format = 'rgba';
						return true;
					} else if (split.format === 'hsl' || split.format === 'hsla') {
						var h = parseInt(split.part1, 10);
						var s = parseInt(split.part2, 10);
						var l = parseInt(split.part3, 10);
						a = parseFloat(split.alpha || '1');
						if (h < 0 || h > 360 || split.percent1 === '%' || s < 0 || s > 100 || split.percent2 !== '%' ||
							l < 0 || l > 100 || split.percent3 !== '%' || a < 0 || a > 1) return false;
						this.colorData.value = 'hsla(' + h.toFixed(0) + ', ' + s.toFixed(2) + '%, ' + l.toFixed(2) + '%, ' + a.toFixed(2) + ')';
						this.colorData.format = 'hsla';
						return true;
					} else {
						return false;
					}
				}
			}
		},

		makeColor: function(color) {
			return '"' + color + '"';
		}
	};

	jsmm.editor.timeHighlights = {
		getTimeHighlights: function(tree) {
			var nodes = tree.getNodesByType('FunctionDeclaration');
			var result = {};
			for (var i=0; i<nodes.length; i++) {
				result[nodes[i].name] = nodes[i].blockLoc;
			}
			return result;
		}
	};
};
},{}],23:[function(require,module,exports){
/*jshint node:true*/
"use strict";

module.exports = function(jsmm) {
	var getValue = function(context, node, expression) {
		var value = expression;
		if (typeof value === 'object' && value.type === 'local') {
			value = value.value;
		}

		if (value === undefined) {
			throw new jsmm.msg.Error(node.id, '<var>' + node.getCode() + '</var> is <var>undefined</var>');
		} else if (value === null) {
			throw new jsmm.msg.Error(node.id, '<var>' + node.getCode() + '</var> is <var>null</var>');
		} else if (typeof value === 'number' && !isFinite(value)) {
			throw new jsmm.msg.Error(node.id, '<var>' + node.getCode() + '</var> is not a valid number');
		} else if (typeof value === 'object' && value.type === 'newArrayValue') {
			throw new jsmm.msg.Error(node.id, '<var>' + node.getCode() + '</var> is <var>undefined</var>');
		} else if (typeof value === 'object' && value.type === 'variable') {
			context.addCommand(node, value.info);
			return value.get(value.name);
		} else {
			return value;
		}
	};

	var dereferenceArray = function(context, value) {
		if (typeof value === 'object' && value.type === 'arrayPointer') {
			return context.scope.getArray(value.id);
		} else {
			return value;
		}
	};

	var setVariable = function(context, node, variableNode, variable, value) {
		if (typeof variable === 'object' && variable.type === 'newArrayValue') {
			throw new jsmm.msg.Error(node.id, '<var>' + variableNode.getCode() + '</var> is <var>undefined</var>');
		} else if (typeof variable !== 'object' || ['variable', 'local'].indexOf(variable.type) < 0) {
			throw new jsmm.msg.Error(node.id, 'Cannot assign <var>' + jsmm.stringify(value) + '</var> to <var>' + variableNode.getCode() + '</var>');
		} else if (variable.type === 'variable') {
			context.addCommand(node, variable.info);
			try {
				variable.set(context, variable.name, value);
			} catch (error) {
				// augmented variables should do their own error handling, so wrap the resulting strings in jsmm messages
				if (typeof error === 'string') {
					throw new jsmm.msg.Error(node.id, error);
				} else {
					throw error;
				}
			}
		} else if (typeof variable.value === 'object' && variable.value.type === 'functionPointer') {
			throw new jsmm.msg.Error(node.id, 'Cannot assign a new value to function <var>' + variable.value.name + '</var>');
		} else {
			variable.value = value;
		}
	};

	jsmm.nodes.PostfixStatement.prototype.runFunc = function(context, variable, symbol) {
		context.addCommand(this, 'jsmm.arithmetic.increment');
		var value = getValue(context, this.identifier, variable);

		if (typeof value !== 'number') {
			throw new jsmm.msg.Error(this.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value) + '</var> is not a number');
		} else {
			if (symbol === '++') {
				value++;
			} else {
				value--;
			}
			setVariable(context, this, this.identifier, variable, value);
			context.addAssignment(this, this.identifier.getCode());
			context.pushStep(new jsmm.msg.Inline(this.id, '<var>' + this.identifier.getCode() + '</var> = <var>' + jsmm.stringify(value) + '</var>'));
		}
	};

	var runBinaryExpression = function(context, node, value1, symbol, value2) {
		if ((symbol === '+' || symbol === '+=') && (typeof value1 === 'string' || typeof value2 === 'string')) {
			context.addCommand(node, 'jsmm.arithmetic.strings');
		} else if (['+', '-', '*', '/', '%'].indexOf(symbol) >= 0) {
			context.addCommand(node, 'jsmm.arithmetic.numbers');
		} else if (['+=', '-=', '*=', '/=', '%='].indexOf(symbol) >= 0) {
			context.addCommand(node, 'jsmm.arithmetic.assignment');
		} else if (['>', '>=', '<', '<='].indexOf(symbol) >= 0) {
			context.addCommand(node, 'jsmm.logic.comparison');
		} else if (['==', '!='].indexOf(symbol) >= 0) {
			context.addCommand(node, 'jsmm.logic.equality');
		} else if (['&&', '||'].indexOf(symbol) >= 0) {
			context.addCommand(node, 'jsmm.logic.booleans');
		}

		if (['-', '*', '/', '%', '-=', '*=', '/=', '%=', '>', '>=', '<', '<='].indexOf(symbol) >= 0) {
			if (typeof value1 !== 'number' || !isFinite(value1)) {
				throw new jsmm.msg.Error(node.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value1) + '</var> is not a number');
			} else if (typeof value2 !== 'number' || !isFinite(value2)) {
				throw new jsmm.msg.Error(node.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value2) + '</var> is not a number');
			} else if (['/', '/=', '%', '%='].indexOf(symbol) >= 0 && value2 === 0) {
				throw new jsmm.msg.Error(node.id, '<var>' + symbol + '</var> not possible since it is a division by zero');
			}
		} else if (['+', '+='].indexOf(symbol) >= 0) {
			if ([typeof value1, typeof value2].indexOf('string') >= 0) {
				if (['number', 'boolean', 'string'].indexOf(typeof value1) < 0) {
					throw new jsmm.msg.Error(node.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value1) + '</var> is not a number, string, or boolean');
				} else if (['number', 'boolean', 'string'].indexOf(typeof value2) < 0) {
					throw new jsmm.msg.Error(node.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value2) + '</var> is not a number, string, or boolean');
				}
			} else {
				if (typeof value1 !== 'number') {
					throw new jsmm.msg.Error(node.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value1) + '</var> is not a number or string');
				} else if (typeof value2 !== 'number') {
					throw new jsmm.msg.Error(node.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value2) + '</var> is not a number or string');
				}
			}
		} else if (['&&', '||'].indexOf(symbol) >= 0) {
			if (typeof value1 !== 'boolean') {
				throw new jsmm.msg.Error(node.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value1) + '</var> is not a boolean');
			} else if (typeof value2 !== 'boolean') {
				throw new jsmm.msg.Error(node.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value2) + '</var> is not a boolean');
			}
		} else if (['==', '!='].indexOf(symbol) >= 0) {
			if (['boolean', 'number', 'string'].indexOf(typeof value1) < 0) {
				throw new jsmm.msg.Error(node.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value1) + '</var> is not a number, string, or boolean');
			} else if (['boolean', 'number', 'string'].indexOf(typeof value2) < 0) {
				throw new jsmm.msg.Error(node.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value2) + '</var> is not a number, string, or boolean');
			}
		}
		
		switch(symbol) {
			case '+': case '+=': return value1 + value2;
			case '-': case '-=': return value1 - value2;
			case '*': case '*=': return value1 * value2;
			case '/': case '/=': return value1 / value2;
			case '%': case '%=': return value1 % value2;
			case '>': return value1 > value2;
			case '>=': return value1 >= value2;
			case '<': return value1 < value2;
			case '<=': return value1 <= value2;
			case '&&': return value1 && value2;
			case '||': return value1 || value2;
			case '==': return value1 == value2;
			case '!=': return value1 != value2;
		}
	};
	
	jsmm.nodes.AssignmentStatement.prototype.runFunc = function(context, variable, symbol, expression) {
		var value;
		if (symbol === '=') {
			context.addCommand(this, 'jsmm.=');
			value = getValue(context, this.expression, expression);
		} else {
			value = runBinaryExpression(context, this, getValue(context, this.identifier, variable), symbol, getValue(context, this.expression, expression));
		}

		if (variable.type === 'newArrayValue') {
			variable.array.setArrayValue(variable.index, value);
		} else {
			setVariable(context, this, this.identifier, variable, value);
		}
		context.addAssignment(this, this.identifier.getBaseName());
		context.pushStep(new jsmm.msg.Inline(this.id, '<var>' + this.identifier.getCode() + '</var> = <var>' + jsmm.stringify(value) + '</var>'));
	};
	
	jsmm.nodes.VarItem.prototype.runFunc = function(context, name) {
		context.addCommand(this, 'jsmm.var');
		context.scope.vars[name] = {type: 'local', value: undefined};

		if (this.assignment === null) {
			context.addAssignment(this, name);
			context.pushStep(new jsmm.msg.Inline(this.id, '<var>' + this.name + '</var> = <var>undefined</var>'));
		}
	};
	
	jsmm.nodes.BinaryExpression.prototype.runFunc = function(context, expression1, symbol, expression2) {
		var value1 = getValue(context, this.expression1, expression1);
		var value2 = getValue(context, this.expression2, expression2);
		var result = runBinaryExpression(context, this, value1, symbol, value2);
		context.pushStep(new jsmm.msg.Inline(this.id, '<var>' + jsmm.stringify(value1) + '</var> ' + symbol + ' <var>' + jsmm.stringify(value2) + '</var> = <var>' + jsmm.stringify(result) + '</var>'));
		return result;
	};
	
	jsmm.nodes.UnaryExpression.prototype.runFunc = function(context, symbol, expression) {
		var value = getValue(context, this.expression, expression);
		var result;

		if (symbol === '!') {
			context.addCommand(this, 'jsmm.logic.inversion');
			if (typeof value !== 'boolean') {
				throw new jsmm.msg.Error(this.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value) + '</var> is not a boolean');
			} else {
				result = !value;
			}
		} else {
			context.addCommand(this, 'jsmm.arithmetic.numbers');
			if (typeof value !== 'number') {
				throw new jsmm.msg.Error(this.id, '<var>' + symbol + '</var> not possible since <var>' + jsmm.stringify(value) + '</var> is not a number');
			} else {
				result = (symbol === '+' ? value : -value);
			}
		}

		if (symbol === '!' || this.expression.type !== 'NumberLiteral') {
			context.pushStep(new jsmm.msg.Inline(this.id, '<var>' + symbol + jsmm.stringify(value) + '</var> = <var>' + jsmm.stringify(result) + '</var>'));
		}
		return result;
	};

	jsmm.nodes.NumberLiteral.prototype.runFunc = function(context, val) {
		context.addCommand(this, 'jsmm.number');
		return val;
	};
	
	jsmm.nodes.StringLiteral.prototype.runFunc = function(context, val) {
		context.addCommand(this, 'jsmm.string');
		return val;
	};
	
	jsmm.nodes.BooleanLiteral.prototype.runFunc = function(context, val) {
		context.addCommand(this, 'jsmm.boolean');
		return val;
	};

	jsmm.nodes.NameIdentifier.prototype.runFunc = function(context, name) {
		var val = context.scope.find(name);
		if (val === undefined) {
			throw new jsmm.msg.Error(this.id, 'Variable <var>' + name + '</var> could not be found');
		} else {
			return val;
		}
	};
	
	jsmm.nodes.ObjectIdentifier.prototype.runFunc = function(context, identifier, property) {
		var identifierValue = getValue(context, this.identifier, identifier);
		identifierValue = dereferenceArray(context, identifierValue);

		if (typeof identifierValue !== 'object' || ['object', 'array'].indexOf(identifierValue.type) < 0) {
			throw new jsmm.msg.Error(this.id, 'Variable <var>' + this.identifier.getCode() + '</var> is not an object</var>');
		} else if (identifierValue.properties[property] === undefined) {
			throw new jsmm.msg.Error(this.id, 'Variable <var>' + this.identifier.getCode() + '</var> does not have property <var>' + property + '</var>');
		} else {
			return identifierValue.properties[property];
		}
	};
	
	jsmm.nodes.ArrayIdentifier.prototype.runFunc = function(context, identifier, expression) {
		var identifierValue = getValue(context, this.identifier, identifier);
		identifierValue = dereferenceArray(context, identifierValue);
		var expressionValue = getValue(context, this.expression, expression);

		if (typeof identifierValue !== 'object' || identifierValue.type !== 'array') {
			throw new jsmm.msg.Error(this.id, 'Variable <var>' + this.identifier.getCode() + '</var> is not an array');
		} else if (typeof expressionValue !== 'number' && expressionValue % 1 !== 0) {
			throw new jsmm.msg.Error(this.id, 'Index <var>' + this.expression.getCode() + '</var> is not an integer');
		} else {
			context.addCommand(this, 'jsmm.array.access');
			return identifierValue.getArrayValue(expressionValue);
		}
	};
	
	jsmm.nodes.FunctionCall.prototype.runFunc = function(context, funcObject, args) {
		var funcValue = getValue(context, this.identifier, funcObject), funcArgs = [], msgFuncArgs = [], appFunc;

		for (var i=0; i<args.length; i++) {
			var value = getValue(context, this.expressionArgs[i], args[i]);
			funcArgs.push(value);
			msgFuncArgs.push(jsmm.stringify(value));
		}

		var retVal;
		context.enterCall(this);
		if (typeof funcValue === 'object' && funcValue.type === 'function') {
			context.addCommand(this, funcValue.info);
			retVal = context.externalCall(this, funcValue, funcArgs);
		} else if (typeof funcValue === 'object' && funcValue.type === 'functionPointer') {
			context.pushStep(new jsmm.msg.Inline(this.id, 'calling <var>' + this.identifier.getCode() + '(' + msgFuncArgs.join(', ') + ')' + '</var>'));
			var func = context.scope.getFunction(funcValue.name);
			if (func === undefined) throw new jsmm.msg.Error(this.id, 'Function <var>' + funcValue.name + '</var> could not be found');
			retVal = func.call(null, context, funcArgs);
		} else {
			throw new jsmm.msg.Error(this.id, 'Variable <var>' + this.identifier.getCode() + '</var> is not a function');
		}
		context.leaveCall();

		if (retVal === null) retVal = undefined;

		if (retVal !== undefined) {
			context.pushStep(new jsmm.msg.Inline(this.id, '<var>' + this.identifier.getCode() + '(' + msgFuncArgs.join(', ') + ')' + '</var> = <var>' + jsmm.stringify(retVal) + '</var>'));
		} else {
			context.pushStep(new jsmm.msg.Inline(this.id, 'called <var>' + this.identifier.getCode() + '(' + msgFuncArgs.join(', ') + ')'));
		}

		return retVal;
	};

	jsmm.nodes.ArrayDefinition.prototype.runFunc = function(context, expressions) {
		var values = [];
		for (var i=0; i<this.expressions.length; i++) {
			values[i] = getValue(context, this.expressions[i], expressions[i]);
		}
		context.addCommand(this, 'jsmm.array.creation');
		var array = new jsmm.Array(values);
		return {type: 'arrayPointer', string: '[array]', id: context.scope.registerArray(array), properties: array.properties}; // properties only for examples!
	};
	
	jsmm.nodes.IfBlock.prototype.runFunc =
	jsmm.nodes.WhileBlock.prototype.runFunc =
	jsmm.nodes.ForBlock.prototype.runFunc = function(context, expression) {
		var type = (this.type === 'IfBlock' ? 'if' : (this.type === 'WhileBlock' ? 'while' : 'for'));
		context.addCommand(this, 'jsmm.' + type);
		var value = getValue(context, this.expression, expression);
		if (typeof value !== 'boolean') {
			throw new jsmm.msg.Error(this.id, '<var>' + type + '</var> is not possible since <var>' + jsmm.stringify(value) + '</var> is not a boolean');
		} else {
			return value;
		}
	};

	jsmm.nodes.ElseIfBlock.prototype.runFunc =
	jsmm.nodes.ElseBlock.prototype.runFunc = function(context) {
		context.addCommand(this, 'jsmm.else');
	};
	
	jsmm.nodes.FunctionDeclaration.prototype.runFuncDecl = function(context, name, func) {
		context.addCommand(this, 'jsmm.function');

		// only check local scope for conflicts
		if (context.scope.vars[name] !== undefined) {
			if (typeof context.scope.vars[name] === 'object' && ['function', 'functionPointer'].indexOf(context.scope.vars[name].type) >= 0) {
				throw new jsmm.msg.Error(this.id, 'Function <var>' + name + '</var> cannot be declared since there already is a function with that name');
			} else {
				throw new jsmm.msg.Error(this.id, 'Function <var>' + name + '</var> cannot be declared since there already is a variable with that name');
			}
		} else {
			context.scope.declareFunction(name, func);
			context.addAssignment(this, name);
			context.pushStep(new jsmm.msg.Inline(this.id, 'declaring <var>' + this.name + this.getArgList() + '</var>', 'blockLoc'));
		}
	};
	
	jsmm.nodes.FunctionDeclaration.prototype.runFuncEnter = function(context, args) {
		if (args.length < this.nameArgs.length) {
			var but = 'only <var>' + args.length + '</var> are given';
			if (args.length <= 0) {
				but = 'none are given';
			} else if (args.length === 1) {
				but = 'only <var>1</var> is given';
			}
			throw new jsmm.msg.Error(context.leaveCall().id, 'Function expects <var>' + this.nameArgs.length + '</var> arguments, but ' + but);
		}

		var scopeVars = {}, msgFuncArgs = [];
		for (var i=0; i<this.nameArgs.length; i++) {
			if (args[i] === undefined) {
				throw new jsmm.msg.Error(context.leaveCall().id, 'Argument <var>' + this.nameArgs[i] + '</var> is <var>undefined</var>');
			} else if (args[i] === null) {
				throw new jsmm.msg.Error(context.leaveCall().id, 'Argument <var>' + this.nameArgs[i] + '</var> is <var>null</var>');
			} else {
				scopeVars[this.nameArgs[i]] = args[i];
				msgFuncArgs.push(jsmm.stringify(args[i]));
			}
		}

		var fullName = this.name + '(' + msgFuncArgs.join(', ') + ')';
		context.pushStep(new jsmm.msg.Inline(this.id, 'entering <var>' + fullName + '</var>'));
		context.enterFunction(this, scopeVars, fullName);
	};
	
	jsmm.nodes.ReturnStatement.prototype.runFunc = function(context, expression) {
		context.addCommand(this, 'jsmm.return');
		if (!context.inFunction()) {
			throw new jsmm.msg.Error(this.id, 'Cannot return if not inside a function');
		}

		var retVal;
		if (this.expression !== undefined && expression !== undefined) {
			retVal = getValue(context, this.expression, expression);
			context.pushStep(new jsmm.msg.Inline(this.id, 'returning <var>' + jsmm.stringify(retVal) + '</var>'));
		} else {
			context.pushStep(new jsmm.msg.Inline(this.id, 'returning nothing'));
		}

		context.leaveFunction(this);
		return retVal;
	};

	jsmm.nodes.FunctionDeclaration.prototype.runFuncLeave = function(context, expression) {
		context.leaveFunction(this);
	};
};

},{}],24:[function(require,module,exports){
/*jshint node:true*/
"use strict";

module.exports = function(jsmm) {
	jsmm.msg = {};
	
	jsmm.msg.addCommonMessageMethods = function(msg) {
		msg.getMessage = function() {
			return this.msg.replace(/<var>/g, '').replace(/<\/var>/g, '');
		};

		msg.getHTML = function() {
			var html = this.msg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</span>';
			return html.replace(/&lt;var&gt;/g, '<var>').replace(/&lt;\/var&gt;/g, '</var>');
		};

		msg.getLoc = function(tree) {
			if (this.loc !== undefined) {
				return this.loc;
			} else if (this.nodeId !== 0) {
				return tree.getNodeById(this.nodeId)[this.locType];
			} else {
				return {line: 1, column: 0};
			}
		};
		
		return msg;
	};
	
	jsmm.msg.Inline = function() { return this.init.apply(this, arguments); };
	jsmm.msg.Inline.prototype = jsmm.msg.addCommonMessageMethods({
		init: function(nodeId, msg, locType) {
			this.type = 'Inline';
			this.nodeId = nodeId;
			this.msg = msg;
			this.locType = locType || 'lineLoc';
		}
	});
	
	jsmm.msg.Error = function() { return this.init.apply(this, arguments); };
	jsmm.msg.Error.prototype = jsmm.msg.addCommonMessageMethods({
		init: function(nodeId, msg, orig, locType) {
			this.type = 'Error';
			this.nodeId = nodeId ? nodeId : 0;
			this.msg = msg;
			this.locType = locType || 'lineLoc';
			this.orig = orig || null;
		}
	});

	jsmm.msg.CriticalError = function() { return this.init.apply(this, arguments); };
	jsmm.msg.CriticalError.prototype = jsmm.msg.addCommonMessageMethods({
		init: function(loc, msg, orig) {
			this.type = 'Error';
			this.loc = loc;
			this.msg = msg;
			this.orig = orig || null;
		}
	});
};

},{}],25:[function(require,module,exports){
/*jshint node:true*/
"use strict";

module.exports = function(jsmm) {
	var addCommonNodeMethods = function(type, children, topNode, node) {
		node.children = children;
		node.build = function(_$, column2) {
			this.tree = jsmm.parser.yy.tree;
			this.tree.nodesByType[type].push(this);
			this.type = type;
			// this.id = this.tree.getNewId();
			// this.tree.nodes[this.id] = this;
			this.lineLoc = {line: _$.first_line, column: _$.first_column, column2 : (column2 || _$.last_column)};
			this.blockLoc = {line: _$.first_line, line2: _$.last_line};
			this.textLoc = {line: _$.first_line, column: _$.first_column, line2: _$.last_line, column2: _$.last_column};
			this.parent = null;
			this.topNode = topNode;
			if (this.topNode) {
				this.tree.nodesByLine[this.lineLoc.line] = this;
			}
			var i=2;
			for (var name in this.children) {
				this[name] = arguments[i++];
				if (this.children[name] && this[name] !== null) { // it is a node
					this[name].parent = this;
				}
			}
			if (this.init !== undefined) {
				this.init.apply(this, [].slice.call(arguments, 2));
			}
		};

		node.getTopNode = function() {
			return this.tree.nodesByLine[this.lineLoc.line];
		};

		if (node.getChildren === undefined) {
			node.getChildren = function() {
				var children = [];
				for (var name in this.children) {
					if (this.children[name] && this[name] !== null) { // it is a node
						children.push(this[name]);
					}
				}
				return children;
			};
		}

		node.makeNodeIdsBase = function(type) {
			this.id = this.tree.getNewId(type);
			this.tree.nodes[this.id] = this;
			var children = this.getChildren();
			for (var i=0; i<children.length; i++) {
				children[i].makeNodeIds(type);
			}
		};

		if (node.makeNodeIds === undefined) {
			node.makeNodeIds = node.makeNodeIdsBase;
		}

		return node;
	};

	jsmm.nodes = {};
	
	jsmm.nodes.Program = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.Program.prototype = addCommonNodeMethods('Program', {statementList: true}, false, {
		init: function() {
			this.makeNodeIds('base');
			this.lineLoc = {line: 0, column: 0, column2: 0};
		},
		getCode: function() {
			return this.statementList.getCode();
		},
		getFunction: function(scope) {
			/*jshint evil:true*/
			var args = [jsmm];
			var output = 'new function() {';
			output += 'return function(jsmm';
			for (var name in scope) {
				output += ', ' + name;
				args.push(scope[name]);
			}
			output += ') { return function() { \n';
			output += this.statementList.getCode() + 'return; }; }; }';
			//console.log(output);
			return eval(output).apply(null, args);
		}
	});

	jsmm.nodes.StatementList = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.StatementList.prototype = addCommonNodeMethods('StatementList', {}, false, {
		init: function() {
			this.statements = [];
		},
		addStatement: function(statement) {
			this.statements.push(statement);
			statement.parent = this;
		},
		getCode: function() {
			var output = '';
			for (var i=0; i<this.statements.length; i++) {
				output += this.statements[i].getCode() + '\n';
			}
			return output;
		},
		getChildren: function() {
			return this.statements;
		}
	});

	jsmm.nodes.CommonSimpleStatement = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.CommonSimpleStatement.prototype = addCommonNodeMethods('CommonSimpleStatement', {statement: true}, true, {
		getCode: function() {
			return this.statement.getCode() + ';';
		}
	});

	jsmm.nodes.PostfixStatement = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.PostfixStatement.prototype = addCommonNodeMethods('PostfixStatement', {identifier: true, symbol: false}, false, {
		getCode: function() {
			return this.identifier.getCode() + this.symbol;
		}
	});

	jsmm.nodes.AssignmentStatement = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.AssignmentStatement.prototype = addCommonNodeMethods('AssignmentStatement', {identifier: true, symbol: false, expression: true}, false, {
		getCode: function() {
			return this.identifier.getCode() + ' ' + this.symbol + ' ' + this.expression.getCode();
		}
	});

	jsmm.nodes.VarStatement = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.VarStatement.prototype = addCommonNodeMethods('VarStatement', {}, false, {
		init: function() {
			this.items = [];
		},
		addVarItem: function(item) {
			this.items.push(item);
			item.parent = this;
		},
		getCode: function() {
			var output = 'var ' + this.items[0].getCode();
			for (var i=1; i<this.items.length; i++) {
				output += ', ' + this.items[i].getCode();
			}
			return output;
		},
		getChildren: function() {
			return this.items;
		}
	});

	jsmm.nodes.VarItem = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.VarItem.prototype = addCommonNodeMethods('VarItem', {name: false, assignment: true}, false, {
		getCode: function() {
			if (this.assignment === null) {
				return this.name;
			} else {
				return this.assignment.getCode();
			}
		}
	});

	jsmm.nodes.ReturnStatement = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.ReturnStatement.prototype = addCommonNodeMethods('ReturnStatement', {expression: true}, true, {
		getCode: function() {
			if (this.expression === null) {
				return 'return;';
			} else {
				return 'return ' + this.expression.getCode() + ';';
			}
		}
	});

	jsmm.nodes.BinaryExpression = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.BinaryExpression.prototype = addCommonNodeMethods('BinaryExpression', {expression1: true, symbol: false, expression2: true}, false, {
		getCode: function() {
			return this.expression1.getCode() + ' ' + this.symbol + ' ' + this.expression2.getCode();
		}
	});

	jsmm.nodes.UnaryExpression = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.UnaryExpression.prototype = addCommonNodeMethods('UnaryExpression', {symbol: false, expression: true}, false, {
		getCode: function() {
			return this.symbol + this.expression.getCode();
		}
	});

	jsmm.nodes.ParenExpression = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.ParenExpression.prototype = addCommonNodeMethods('ParenExpression', {expression: true}, false, {
		getCode: function() {
			return '(' + this.expression.getCode() + ')';
		}
	});

	jsmm.nodes.NumberLiteral = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.NumberLiteral.prototype = addCommonNodeMethods('NumberLiteral', {number: false}, false, {
		init: function() {
			this.number = parseFloat(this.number);
		},
		getCode: function() {
			return this.number;
		}
	});

	jsmm.nodes.StringLiteral = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.StringLiteral.prototype = addCommonNodeMethods('StringLiteral', {str: false}, false, {
		init: function() {
			try {
				this.str = JSON.parse(this.str);
			} catch (e) {
				throw new jsmm.msg.Error(this.id, 'String contains invalid characters');
			}
		},
		getCode: function() {
			return JSON.stringify(this.str);
		}
	});

	jsmm.nodes.BooleanLiteral = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.BooleanLiteral.prototype = addCommonNodeMethods('BooleanLiteral', {bool: false}, false, {
		getCode: function() {
			return this.bool ? 'true' : 'false';
		}
	});

	jsmm.nodes.NameIdentifier = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.NameIdentifier.prototype = addCommonNodeMethods('NameIdentifier', {name: false}, false, {
		getCode: function() {
			return this.name;
		},
		getBaseName: function() {
			return this.name;
		}
	});

	jsmm.nodes.ObjectIdentifier = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.ObjectIdentifier.prototype = addCommonNodeMethods('ObjectIdentifier', {identifier: true, prop: false}, false, {
		getCode: function() {
			return this.identifier.getCode() + '.' + this.prop;
		},
		getBaseName: function() {
			return this.identifier.getBaseName();
		}
	});

	jsmm.nodes.ArrayIdentifier = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.ArrayIdentifier.prototype = addCommonNodeMethods('ArrayIdentifier', {identifier: true, expression: true}, false, {
		getCode: function() {
			return this.identifier.getCode() + '[' + this.expression.getCode() + ']';
		},
		getBaseName: function() {
			return this.identifier.getBaseName();
		}
	});

	jsmm.nodes.FunctionCall = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.FunctionCall.prototype = addCommonNodeMethods('FunctionCall', {identifier: true, expressionArgs: false}, false, {
		init: function() {
			for (var i=0; i<this.expressionArgs.length; i++) {
				this.expressionArgs[i].parent = this;
			}
		},
		getCode: function() {
			var output = this.identifier.getCode() + '(';
			if (this.expressionArgs.length > 0) output += this.expressionArgs[0].getCode();
			for (var i=1; i<this.expressionArgs.length; i++) {
				output += ', ' + this.expressionArgs[i].getCode();
			}
			return output + ')';
		},
		getChildren: function() {
			return this.expressionArgs.concat([this.identifier]);
		}
	});

	jsmm.nodes.ArrayDefinition = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.ArrayDefinition.prototype = addCommonNodeMethods('ArrayDefinition', {expressions: false}, false, {
		init: function() {
			for (var i=0; i<this.expressions.length; i++) {
				this.expressions[i].parent = this;
			}
		},
		getCode: function() {
			var output = '[';
			if (this.expressions.length > 0) output += this.expressions[0].getCode();
			for (var i=1; i<this.expressions.length; i++) {
				output += ', ' + this.expressions[i].getCode();
			}
			return output + ']';
		},
		getChildren: function() {
			return this.expressions;
		}
	});

	jsmm.nodes.IfBlock = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.IfBlock.prototype = addCommonNodeMethods('IfBlock', {expression: true, statementList: true, elseBlock: true}, true, {
		init: function() {
			if (this.elseBlock !== null) {
				this.blockLoc.line2 = this.elseBlock.blockLoc.line-1;
			}
		},
		getCode: function() {
			var output = 'if (' + this.expression.getCode() + ') {\n' + this.statementList.getCode() + '}';
			if (this.elseBlock !== null) {
				output += this.elseBlock.getCode();
			}
			return output;
		}
	});

	jsmm.nodes.ElseIfBlock = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.ElseIfBlock.prototype = addCommonNodeMethods('ElseIfBlock', {ifBlock: true}, false, {
		getCode: function() {
			return ' else ' + this.ifBlock.getCode();
		}
	});

	jsmm.nodes.ElseBlock = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.ElseBlock.prototype = addCommonNodeMethods('ElseBlock', {statementList: true}, true, {
		getCode: function() {
			return ' else {\n' + this.statementList.getCode() + '}';
		}
	});

	jsmm.nodes.WhileBlock = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.WhileBlock.prototype = addCommonNodeMethods('WhileBlock', {expression: true, statementList: true}, true, {
		getCode: function() {
			return 'while (' + this.expression.getCode() + ') {\n' + this.statementList.getCode() + '}';
		}
	});

	jsmm.nodes.ForBlock = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.ForBlock.prototype = addCommonNodeMethods('ForBlock', {statement1: true, expression: true, statement2: true, statementList: true}, true, {
		getCode: function() {
			var output = 'for (' + this.statement1.getCode() + ';' + this.expression.getCode() + ';';
			output += this.statement2.getCode() + ') {\n' + this.statementList.getCode() + '}';
			return output;
		}
	});

	jsmm.nodes.FunctionDeclaration = function() { return this.build.apply(this, arguments); };
	jsmm.nodes.FunctionDeclaration.prototype = addCommonNodeMethods('FunctionDeclaration', {name: false, nameArgs: false, statementList: true}, true, {
		init: function() {
			this.tree.functionNodes[this.name] = this;
		},
		getArgList: function() {
			return '(' + this.nameArgs.join(', ') + ')';
		},
		getCode: function() {
			var output = 'function ' + this.name + this.getArgList() + '{\n' + this.statementList.getCode() + '}';
			return output;
		},
		makeNodeIds: function(type) {
			this.makeNodeIdsBase('functions');
		}
	});
};
},{}],26:[function(require,module,exports){
/*jshint node:true*/
"use strict";

module.exports = function(jsmm) {
	jsmm.parser = require('./jsmmparser').parser;
	jsmm.parser.yy = {};
	jsmm.parser.yy.nodes = jsmm.nodes;

	// function used by the parser to throw errors
	// also used below by catching tokenizer errors
	jsmm.parser.yy.parseError = function(errStr, hash) {
		hash = hash || {};
		var token = hash.token || '';
		var expected = hash.expected || [];
		var loc = {
			line: jsmm.parser.lexer.yylloc.first_line || 1,
			column: jsmm.parser.lexer.yylloc.first_column
		};
		
		// if there are no newlines, give a range instead of a single position
		if (hash.text.match(/\n/) === null) {
			loc.column2 = loc.column + hash.text.length;
		}
		
		// entries are in the form "'FOR'", remove the extra quotes
		token = token.replace(/[']/g, "");
		for (var i=0; i<expected.length; i++) {
			expected[i] = expected[i].replace(/[']/g, "");
		}
		
		var makeNear = function(text, near) {
			text = text.substring(0, text.indexOf('\n'));
			if (text.replace(/\s*/, '').length > 0) {
				return (near || ' near ') + '<var>' + text + '</var>';
			} else {
				return '';
			}
		};
		
		var suggestionError = function(suggestion, an) {
			throw new jsmm.msg.CriticalError(loc, 'Invalid syntax encountered' + makeNear(hash.text) + ', perhaps there is ' + (an ? 'an' : 'a') +' <var>' + suggestion + '</var> missing', errStr);
		};

		if (token === 'RESERVED') {
			// special case: passing on the information that the word is reserved
			throw new jsmm.msg.CriticalError(loc, 'Unfortunately <var>' + hash.text + '</var> is a reserved word, which means you cannot use it as a variable name', errStr);
		} else if (token === 'INVALID') {
			// special cases: passing on information about the used symbol
			if (hash.text === "'") {
				throw new jsmm.msg.CriticalError(loc, 'Unfortunately <var>\'</var> cannot be used, please use <var>"</var> instead', errStr);
			} else if (['~', '&', '|', '<<', '>>', '>>=', '<<='].indexOf(hash.text) >= 0) {
				throw new jsmm.msg.CriticalError(loc, 'Unfortunately the bitwise operator <var>' + hash.text + '</var> cannot be used', errStr);
			} else if (['===', '!=='].indexOf(hash.text) >= 0) {
				throw new jsmm.msg.CriticalError(loc, 'Unfortunately the strict equality operator <var>' + hash.text + '</var> cannot be used', errStr);
			} else if (['?', ':', '\\'].indexOf(hash.text) >= 0) {
				throw new jsmm.msg.CriticalError(loc, 'Unfortunately the symbol <var>' + hash.text + '</var> cannot be used', errStr);
			} else if (hash.text === '$') {
				throw new jsmm.msg.CriticalError(loc, 'Unfortunately the symbol <var>$</var>, often used for the jQuery library, cannot be used', errStr);
			}
		} else if (token === '"') {
			throw new jsmm.msg.CriticalError(loc, 'This string has not been closed, please add another <var>"</var> on this line', errStr);
		} else if (hash.token === null) {
			// lexer error
			loc = {line: hash.line+1, column: 0};
			throw new jsmm.msg.CriticalError(loc, 'Invalid syntax encountered', errStr);
		} else if (expected.length === 1 && expected[0] === 'NEWLINE') {
			if (token === 'ELSE') {
				// two or more else branches gives this situation
				throw new jsmm.msg.CriticalError(loc, 'Invalid syntax encountered, perhaps the <var>else</var> branches are incorrect', errStr);
			} else if (token === 'IF') {
				// "else if" without the "else" gives this
				suggestionError('else', true);
			} else {
				throw new jsmm.msg.CriticalError(loc, 'Invalid syntax encountered, perhaps some code' + makeNear(hash.text) + ' should be put on a new line', errStr);
			}
		} else if (expected.length === 1) {
			// if only one thing can be expected, pass it on
			if (expected[0] === 'NAME') {
				expected[0] = 'variable name';
			}
			suggestionError(expected[0]);
		} else if (expected.indexOf(';') >= 0 && token === 'NEWLINE') {
			// ; expected before of newline is usually forgotten
			suggestionError(';');
		} else if (expected.indexOf('==') >= 0 && token === '=') {
			// ; expected before of newline is usually forgotten
			throw new jsmm.msg.CriticalError(loc, 'Invalid syntax encountered' + makeNear(hash.text) + ', perhaps it should be <var>==</var> instead', errStr);
		} else if (expected.indexOf('}') >= 0 && ['FUNCTION', 'ELSE', 'EOF'].indexOf(token) >= 0) {
			// } expected before function declaration, else, eof is usually forgotten
			suggestionError('}');
		} else if (expected.indexOf(')') >= 0 && ['{', ';', 'NEWLINE'].indexOf(token) >= 0) {
			// ) expected before { or ; is usually forgotten
			suggestionError(')');
		} else if (expected.indexOf('TRUE') >= 0 && token === '{') {
			// expression expected, but { given, usually someone tries to make an object
			throw new jsmm.msg.CriticalError(loc, 'You cannot use <var>{</var> here, only after <var>if</var>, <var>else</var>, <var>while</var>, <var>for</var>, and <var>function</var>', errStr);
		} else if (expected.indexOf('TRUE') >= 0 && token === 'FUNCTION') {
			// expression expected, but "FUNCTION" given, usually someone tries to make an inline function
			throw new jsmm.msg.CriticalError(loc, 'You cannot use <var>function</var> here, only on a separate line', errStr);
		} else {
			throw new jsmm.msg.CriticalError(loc, 'Invalid syntax encountered' + makeNear(hash.text), errStr);
		}
	};
};
},{"./jsmmparser":32}],27:[function(require,module,exports){
/*jshint node:true*/
"use strict";

module.exports = function(jsmm) {
	var getNode = function(obj) {
		return 'jsmmContext.tree.nodes["' + obj.id + '"]';
	};

	/* statementList */
	jsmm.nodes.Program.prototype.getRunCode = function() {
		var output = 'new function() {';
		output += 'return function(jsmmContext) {';
		output += this.statementList.getRunCode() + '}; }';
		return output;
	};
	
	jsmm.nodes.Program.prototype.getRunFunction = function() {
		/*jshint evil:true*/
		return eval(this.getRunCode());
	};

	jsmm.nodes.Program.prototype.getFunctionCode = function() {
		var output = 'new function() {';
		output += 'return function(jsmmScope) {';
		output += 'jsmmScope.clearFunctions();\n';
		output += this.statementList.getFunctionCode() + '}; }';
		return output;
	};

	jsmm.nodes.Program.prototype.getFunctionFunction = function() {
		/*jshint evil:true*/
		return eval(this.getFunctionCode());
	};

	jsmm.nodes.Program.prototype.getCompareBaseCode = function(functionNames) {
		return this.statementList.getCompareBaseCode(functionNames);
	};

	jsmm.nodes.Program.prototype.getCompareFunctionCode = function() {
		return this.statementList.getCompareFunctionCode();
	};
	
	/* statements */
	jsmm.nodes.StatementList.prototype.getRunCode = function() {
		var output = 'jsmmContext.increaseExecutionCounter(' + getNode(this.parent) + ', ' + (this.statements.length+1) + ');\n';
		for (var i=0; i<this.statements.length; i++) {
			output += this.statements[i].getRunCode() + '\n\n';
		}
		return output;
	};

	jsmm.nodes.StatementList.prototype.getFunctionCode = function() {
		var output = '';
		for (var i=0; i<this.statements.length; i++) {
			if (this.statements[i].type === 'FunctionDeclaration') {
				output += this.statements[i].getFunctionCode() + '\n\n';
			}
		}
		return output;
	};

	jsmm.nodes.StatementList.prototype.getCompareBaseCode = function(functionNames) {
		var output = '';
		for (var i=0; i<this.statements.length; i++) {
			if (this.statements[i].type !== 'FunctionDeclaration' || functionNames.indexOf(this.statements[i].name) >= 0) {
				output += this.statements[i].getCode() + '\n\n';
			} else {
				output += '/* function ' + this.statements[i].name + this.statements[i].getArgList() + ' */\n\n';
			}
		}
		return output;
	};

	jsmm.nodes.StatementList.prototype.getCompareFunctionCode = function() {
		var output = '';
		for (var i=0; i<this.statements.length; i++) {
			if (this.statements[i].type === 'FunctionDeclaration') {
				output += this.statements[i].getCode() + '\n\n';
			}
		}
		return output;
	};
	
	/* statement */
	jsmm.nodes.CommonSimpleStatement.prototype.getRunCode = function() {
		return this.statement.getRunCode() + ";";
	};
	
	/* identifier, symbol */
	jsmm.nodes.PostfixStatement.prototype.getRunCode = function() {
		return getNode(this) + '.runFunc(jsmmContext, ' + this.identifier.getRunCode() + ', "' + this.symbol + '")';
	};
	
	/* identifier, symbol, expression */
	jsmm.nodes.AssignmentStatement.prototype.getRunCode = function() {
		return getNode(this) + '.runFunc(jsmmContext, ' + this.identifier.getRunCode() + ', "' + this.symbol + '", ' + this.expression.getRunCode() + ')';
	};
	
	/* items */
	jsmm.nodes.VarStatement.prototype.getRunCode = function() {
		var output = this.items[0].getRunCode();
		for (var i=1; i<this.items.length; i++) {
			output += ', ' + this.items[i].getRunCode();
		}
		return output;
	};
	
	/* name, assignment */
	jsmm.nodes.VarItem.prototype.getRunCode = function() {
		var output = getNode(this) + '.runFunc(jsmmContext, "' + this.name + '")';
		if (this.assignment !== null) {
			// ; is invalid in for loops
			// this should be possible in JS for normal statements as well
			output += ', ' + this.assignment.getRunCode();
		}
		return output;
	};
	
	/* expression */
	jsmm.nodes.ReturnStatement.prototype.getRunCode = function() {
		var output = '';
		var expressonCode = this.expression === null ? 'undefined' : this.expression.getRunCode();
		output += 'return ' + getNode(this) + '.runFunc(jsmmContext, ' + expressonCode + ');';
		return output;
	};
	
	/* expression1, symbol, expression2 */
	jsmm.nodes.BinaryExpression.prototype.getRunCode = function() {
		return getNode(this) + '.runFunc(jsmmContext, ' + this.expression1.getRunCode() + ', "' + this.symbol + '", ' + this.expression2.getRunCode() + ')';
	};
	
	/* symbol, expression */
	jsmm.nodes.UnaryExpression.prototype.getRunCode = function() {
		return getNode(this) + '.runFunc(jsmmContext, "' + this.symbol + '", ' + this.expression.getRunCode() + ')';
	};

	/* expression */
	jsmm.nodes.ParenExpression.prototype.getRunCode = function() {
		return '(' + this.expression.getRunCode() + ')';
	};
	
	/* number */
	jsmm.nodes.NumberLiteral.prototype.getRunCode = function() {
		return getNode(this) + '.runFunc(jsmmContext, ' + this.number + ')';
	};
	
	/* str */
	jsmm.nodes.StringLiteral.prototype.getRunCode = function() {
		return getNode(this) + '.runFunc(jsmmContext, ' + JSON.stringify(this.str) + ')';
	};
	
	/* bool */
	jsmm.nodes.BooleanLiteral.prototype.getRunCode = function() {
		return getNode(this) + '.runFunc(jsmmContext, ' + (this.bool ? 'true' : 'false') + ')';
	};
	
	/* name */
	jsmm.nodes.NameIdentifier.prototype.getRunCode = function() {
		return getNode(this) + '.runFunc(jsmmContext, "' + this.name + '")';
	};
	
	/* identifier, prop */
	jsmm.nodes.ObjectIdentifier.prototype.getRunCode = function() {
		return getNode(this) + '.runFunc(jsmmContext, ' + this.identifier.getRunCode() + ', "' + this.prop + '")';
	};
	
	/* identifier, expression */
	jsmm.nodes.ArrayIdentifier.prototype.getRunCode = function() {
		return getNode(this) + '.runFunc(jsmmContext, ' + this.identifier.getRunCode() + ', ' + this.expression.getRunCode() + ')';
	};
	
	/* identifier, expressionArgs */
	jsmm.nodes.FunctionCall.prototype.getRunCode = function() {
		var output = getNode(this) + '.runFunc(jsmmContext, ' + this.identifier.getRunCode() + ', [';
		if (this.expressionArgs.length > 0) output += this.expressionArgs[0].getRunCode();
		for (var i=1; i<this.expressionArgs.length; i++) {
			output += ", " + this.expressionArgs[i].getRunCode();
		}
		return output + '])';
	};

	/* identifier, expressions */
	jsmm.nodes.ArrayDefinition.prototype.getRunCode = function() {
		var output = getNode(this) + '.runFunc(jsmmContext, [';
		if (this.expressions.length > 0) output += this.expressions[0].getRunCode();
		for (var i=1; i<this.expressions.length; i++) {
			output += ", " + this.expressions[i].getRunCode();
		}
		return output + '])';
	};
	
	/* expression, statementList, elseBlock */
	jsmm.nodes.IfBlock.prototype.getRunCode = function() {
		var output = 'if (' + getNode(this) + '.runFunc(jsmmContext, ' + this.expression.getRunCode() + ')) {\n';
		output += this.statementList.getRunCode() + '}';
		if (this.elseBlock !== null) {
			output += ' else {\n';
			output += this.elseBlock.getRunCode() + '\n';
			output += '}';
		}
		return output;
	};
	
	/* ifBlock */
	jsmm.nodes.ElseIfBlock.prototype.getRunCode = function() {
		return getNode(this) + '.runFunc(jsmmContext);\n' + this.ifBlock.getRunCode();
	};
	
	/* statementList */
	jsmm.nodes.ElseBlock.prototype.getRunCode = function() {
		return getNode(this) + '.runFunc(jsmmContext);\n' + this.statementList.getRunCode();
	};
	
	/* expression, statementList */
	jsmm.nodes.WhileBlock.prototype.getRunCode = function() {
		var output = 'while (' + getNode(this) + '.runFunc(jsmmContext, '  + this.expression.getRunCode() + '))';
		output += '{\n' + this.statementList.getRunCode() + '}';
		return output;
	};
	
	/* statement1, expression, statement2, statementList */
	jsmm.nodes.ForBlock.prototype.getRunCode = function() {
		var output = 'for (' + this.statement1.getRunCode() + '; ';
		output += getNode(this) + '.runFunc(jsmmContext, '  + this.expression.getRunCode() + '); ';
		output += this.statement2.getRunCode() + ') {\n' + this.statementList.getRunCode() + '}';
		return output;
	};
	
	/* name, nameArgs, statementList */
	jsmm.nodes.FunctionDeclaration.prototype.getRunCode = function() {
		var output = getNode(this) + '.runFuncDecl(jsmmContext, "' + this.name + '", ';
		output += 'function (jsmmContext, args) {\n';
		output += '/* args: ' + this.getArgList() + ' */\n'; // important for comparison
		output += getNode(this) + '.runFuncEnter(jsmmContext, args);\n';
		output += this.statementList.getRunCode();
		output += 'return ' + getNode(this) + '.runFuncLeave(jsmmContext);\n';
		output += '});';
		return output;
	};

	jsmm.nodes.FunctionDeclaration.prototype.getFunctionCode = function() {
		var output = 'jsmmScope.declareFunction("' + this.name + '", ';
		output += 'function (jsmmContext, args) {\n';
		output += '/* args: ' + this.getArgList() + ' */\n'; // important for comparison
		output += getNode(this) + '.runFuncEnter(jsmmContext, args);\n';
		output += this.statementList.getRunCode();
		output += 'return ' + getNode(this) + '.runFuncLeave(jsmmContext);\n';
		output += '});';
		return output;
	};
};

},{}],28:[function(require,module,exports){
/*jshint node:true*/
"use strict";

module.exports = function(jsmm) {
	require('./jsmm.msg')(jsmm);
	
	jsmm.OldSimpleRunner = function() { return this.init.apply(this, arguments); };
	jsmm.OldSimpleRunner.prototype = {
		init: function(text, scope) {
			this.code = text || '';
			this.scope = scope || {};
			this.reset();
		},
		
		reset: function() {
			this.tree = null;
			this.rawFunc = null;
			this.safeFunc = null;
			this.stack = null;
			this.stepPos = null;
			this.resetError();
		},
		
		resetError: function() {
			this.error = null;
		},
		
		setText: function(text) {
			this.reset();
			this.code = text;
		},
		
		setScope: function(scope) {
			this.reset();
			this.scope = scope;
		},
		
		getCode: function() {
			return this.code;
		},
		
		handleError: function(error) {
			//console.log(error);
			if (error.type === 'Error') {
				this.error = error;
			} else {
				throw error;
				this.error = new jsmm.msg.Error(0, 'An unknown error has occurred', error);
			}
			//console.log(this.error);
		},
		
		parse: function() {
			this.resetError();
			if (this.tree !== null) return true;
			
			try {
				this.tree = new jsmm.Tree(this.code);
				if (this.tree.hasError()) {
					this.handleError(this.tree.getError());
					return false;
				}
				return true;
			} catch (error) {
				this.handleError(error);
				return false;
			}
		},

		getElementsByType: function(type) {
			this.resetError();
			if (!this.parse()) return undefined;

			return this.tree.nodesByType[type];
		},

		getElementByLine: function(line) {
			this.resetError();
			if (!this.parse()) return undefined;

			return this.tree.nodesByLine[line];
		},

		addHookBeforeNode: function(node, func) {
			this.safeFunc = null;
			this.tree.addHookBeforeNode(node, func);
		},

		addHookAfterNode: function(node, func) {
			this.safeFunc = null;
			this.tree.addHookAfterNode(node, func);
		},
		
		getDot: function() {
			this.resetError();
			if (!this.parse()) return undefined;
			
			try {
				return this.tree.programNode.getDot();
			} catch (error) {
				this.handleError(error);
				return undefined;
			}
		},
		
		getRawCode: function() {
			this.resetError();
			if (!this.parse()) return undefined;
			
			try {
				return this.tree.programNode.getCode();
			} catch (error) {
				this.handleError(error);
				return undefined;
			}
		},
		
		makeRawFunc: function() {
			this.resetError();
			if (this.rawFunc !== null) return true;
			if (!this.parse()) return false;
			
			try {
				this.rawFunc = this.tree.programNode.getFunction(this.scope);
				return true;
			} catch (error) {
				this.handleError(error);
				return false;
			}
		},
		
		runRaw: function() {
			this.resetError();
			if (!this.makeRawFunc()) return false;
			
			try {
				this.rawFunc();
				return true;
			} catch (error) {
				this.handleError(error);
				return false;
			}
		},
		
		getSafeCode: function() {
			this.resetError();
			if (!this.parse()) return undefined;
			
			try {
				return this.tree.programNode.getRunCode();
			} catch (error) {
				this.handleError(error);
				return undefined;
			}
		},
		
		makeSafeFunc: function() {
			this.resetError();
			if (this.safeFunc !== null) return true;
			if (!this.parse()) return false;
			
			try {
				this.safeFunc = this.tree.programNode.getRunFunction();
				return true;
			} catch (error) {
				this.handleError(error);
				return false;
			}
		},
		
		runSafe: function() {
			this.resetError();
			//if (!this.makeSafeFunc()) return false;
			if (!this.parse()) return false;
			
			try {
				//this.safeFunc(new jsmm.RunContext(this.tree, this.scope));
				var context = new jsmm.Context(this.tree, new jsmm.Scope(this.scope), {
					callStackDepth: 100,
					executionCounter: 4000,
					costCounter: 1000
				});
				context.run();
				if (context.hasError()) {
					this.handleError(context.getError());
					return false;
				}
				return true;
			} catch (error) {
				this.handleError(error);
				return false;
			}
		},
		
		stepInit: function() {
			this.resetError();
			if (!this.parse()) return false;
			try {
				this.stack = new jsmm.step.Stack(this.tree, this.scope);
				this.stepPos = 0;
				return true;
			} catch (error) {
				this.handleError(error);
				return false;
			}
		},
		
		stepNext: function() {
			this.resetError();
			
			var ret = [];
			try {
				if (this.stack === null || !this.stack.hasNext()) return undefined;
				
				var msgs = this.stack.stepNext();
				if (msgs.length <= 0) return undefined;
				
				for (var i=0; i<msgs.length; i++) {
					if (msgs[i].type === 'Error') {
						this.error = msgs[i];
						return undefined;
					} else {
						ret.push(msgs[i]);
					}
				}
				this.stepPos++;
				return ret;
			} catch (error) {
				this.handleError(error);
				return undefined;
			}
		},

		stepBack: function() {
			this.resetError();
			var stepPos = this.stepPos-1;

			var result;
			if (stepPos >= 0) {
				this.stepInit();
				while (this.stepPos < stepPos) {
					result = this.stepNext();
					if (result === undefined) return undefined;
				}
			}
			return result;
		},
		
		isStepping: function() {
			return (this.stack !== null && this.stack.hasNext());
		},
		
		runStep: function() {
			this.resetError();
			
			if (this.stepInit()) {
				var step;
				do {
					step = this.stepNext();
				} while(step !== undefined);
			}
			
			return !this.hasError();
		},
		
		hasError: function() {
			return this.error !== null;
		},
		
		getError: function() {
			return this.error;
		},
	};
};

},{"./jsmm.msg":24}],29:[function(require,module,exports){
/*jshint node:true*/
"use strict";

module.exports = function(jsmm) {
	jsmm.SimpleRunner = function() { return this.init.apply(this, arguments); };
	jsmm.SimpleRunner.prototype = {
		init: function(scope, options) {
			this.options = options || {};
			this.scope = new jsmm.Scope(scope);
			this.error = null;
			this.context = null;
		},

		run: function(text) {
			var tree = new jsmm.Tree(text, this.options);
			if (tree.hasError()) {
				this.error = tree.getError();
			} else {
				this.context = new jsmm.Context(tree, this.scope, jsmm.defaultLimits.base);
				this.context.run();
				if (this.context.hasError()) {
					this.error = this.context.getError();
				}
			}
		},

		hasError: function() {
			return this.error !== null;
		},

		getError: function() {
			return this.error;
		},

		getTree: function() {
			return this.tree;
		},

		getContext: function() {
			return this.context;
		}
	};

	jsmm.Event = function() { return this.init.apply(this, arguments); };
	jsmm.Event.prototype = {
		init: function(runner, type, funcName, args) {
			this.runner = runner;
			this.type = type;
			this.funcName = funcName || undefined;
			this.args = args || [];
			this.context = null;
		},

		run: function(tree, scope, limits) {
			this.context = new jsmm.Context(tree, scope, limits);
			this.runner.delegate.startEvent(this.context);
			this.context.run(this.funcName, this.args);
			this.runner.delegate.endEvent(this.context);
		}
	};

	jsmm.Runner = function() { return this.init.apply(this, arguments); };
	jsmm.Runner.prototype = {
		init: function(delegate, scope, limits) {
			this.delegate = delegate;
			this.scope = new jsmm.Scope(scope);
			this.exampleScope = this.scope;
			this.limits = limits || jsmm.defaultLimits;

			this.tree = null;
			this.baseEvent = new jsmm.Event(this, 'base');
			this.events = [this.baseEvent];
			this.eventNum = 0;
			this.stepNum = Infinity;
			this.runScope = null;
			this.errorEventNums = [];

			this.paused = false;
			this.interactive = false;
			this.enabled = false;
			this.baseCodeChanged = false;
			this.interactiveSignature = '';
		},

		selectBaseEvent: function() {
			if (this.events.length !== 1 || this.eventNum !== 0 || this.events[0] !== this.baseEvent) {
				this.events = [this.baseEvent];
				this.stepNum = Infinity;
			}
			this.eventNum = 0;
			this.interactive = false;
			this.paused = false;
			this.baseCodeChanged = false;
			this.interactiveSignature = '';
			this.errorEventNums = [];
			this.delegate.clearReload();
			this.delegate.clearAllEvents();
			this.baseEvent.run(this.tree, this.scope.getCopy(), this.limits.base);
			this.runScope = this.baseEvent.context.getBaseScope().getCopy();
			if (this.baseEvent.context.hasError()) {
				this.errorEventNums.push(0);
				this.paused = true;
			} else {
				this.exampleScope = this.runScope;
			}
			this.updateStepping();
			this.delegate.runnerChanged();
		},

		canReceiveEvents: function() {
			return this.enabled && !this.isStatic() && !this.hasError();
		},

		isStatic: function() {
			return !this.interactive || this.paused || this.isStepping();
		},

		addEvent: function(type, funcName, args) {
			if (!this.canReceiveEvents()) {
				return false;
			} else {
				var event = new jsmm.Event(this, type, funcName, args);
				event.run(this.tree, this.runScope, this.limits.event);
				this.runScope = event.context.getBaseScope().getCopy();

				this.eventNum = this.events.length;
				this.events.push(event);
				if (this.events.length > this.limits.history) {
					this.events.shift();
					this.eventNum--;
					this.delegate.popFirstEvent();
				}
				if (event.context.hasError()) {
					this.errorEventNums.push(this.events.length-1);
					this.paused = true;
					this.delegate.runnerChanged();
				} else {
					this.exampleScope = this.runScope;
					this.delegate.runnerChangedEvent();
				}
				return true;
			}
		},

		newTree: function(tree) {
			this.tree = tree;

			if (this.baseEvent.context !== null) {
				if (this.tree.compareAll(this.baseEvent.context)) {
					if (this.interactive) {
						this.errorEventNums = [];
						if (!this.paused || this.eventNum < 0) {
							// don't check if only functions have changed here, as when the base code is changed,
							// the base event should also be invalidated
							this.delegate.clearEventsToEnd();
							this.events = [];
							this.eventNum = -1;
							this.stepNum = Infinity;
							this.tree.programNode.getFunctionFunction()(this.runScope);

							if (this.tree.compareBase(this.baseEvent.context)) {
								this.baseCodeChanged = true;
							}
						} else {
							var start;
							if (this.events[0] === this.baseEvent) {
								var oldSignature = this.interactiveSignature;
								this.delegate.clearAllEvents();
								this.baseEvent.run(this.tree, this.scope.getCopy(), this.limits.base);
								this.runScope = this.baseEvent.context.getBaseScope().getCopy();
								if (this.baseEvent.context.hasError()) {
									this.errorEventNums.push(0);
									// when there was an error, functions may not have been declared
									this.tree.programNode.getFunctionFunction()(this.runScope);
									this.baseCodeChanged = false;
								}
								else {
									this.exampleScope = this.runScope;
									this.baseCodeChanged = (oldSignature !== this.interactiveSignature);
									this.interactiveSignature = oldSignature; // restore it for future comparisons
								}
								start = 1;
							} else if (this.tree.compareFunctions(this.baseEvent.context)) {
								this.delegate.clearEventsFrom(0);
								this.runScope = this.events[0].context.getStartScope().getCopy();
								this.tree.programNode.getFunctionFunction()(this.runScope);
								start = 0;

								if (this.tree.compareBase(this.baseEvent.context)) {
									this.baseCodeChanged = true;
								}
							} else {
								start = Infinity;
								this.baseCodeChanged = true;
							}
							for (var i=start; i<this.events.length; i++) {
								this.events[i].run(this.tree, this.runScope, this.limits.event);
								this.runScope = this.events[i].context.getBaseScope().getCopy();
								if (this.events[i].context.hasError()) this.errorEventNums.push(i);
								else this.exampleScope = this.runScope;
							}
							this.updateStepping();
						}
					} else {
						this.selectBaseEvent();
						return;
					}
				}
				this.baseEvent.context.tree = this.tree;
				this.delegate.runnerChanged();
			} else {
				this.selectBaseEvent();
			}
		},

		/// EVENTS ///
		play: function() {
			this.paused = false;
			this.stepNum = Infinity;
			if (this.eventNum < this.events.length-1) {
				this.runScope = this.events[this.eventNum+1].context.getStartScope().getCopy();
				this.events = this.events.slice(0, this.eventNum+1);
				this.delegate.clearEventsFrom(this.eventNum+1);
			}
			this.delegate.runnerChanged();
		},

		pause: function() {
			this.paused = true;
			this.delegate.runnerChanged();
		},

		reload: function() {
			if (this.stepNum !== Infinity) {
				this.stepNum = Infinity;
			}
			this.selectBaseEvent();
		},

		isPaused: function() {
			return this.paused;
		},

		hasEvents: function() {
			return this.events.length > 0;
		},

		getEventTotal: function() {
			return this.events.length;
		},

		getEventNum: function() {
			return this.eventNum;
		},

		setEventNum: function(eventNum) {
			if (eventNum >= 0 && eventNum < this.events.length) {
				this.eventNum = eventNum;
				this.step = Infinity;
			}
			this.delegate.runnerChanged();
		},

		getEventType: function() {
			if (this.eventNum < 0) {
				return '';
			} else {
				return this.events[this.eventNum].type;
			}
		},

		isBaseEventSelected: function() {
			return this.eventNum === 0 && this.events[0] === this.baseEvent;
		},

		/// STEPPING ///
		isStepping: function() {
			return this.stepNum < Infinity;
		},

		canStep: function() {
			return this.eventNum >= 0 && this.getStepTotal() > 0 && this.enabled;
		},

		restart: function() {
			if (this.stepNum !== Infinity) {
				this.stepNum = Infinity;
			}
			this.delegate.runnerChanged();
		},

		stepForward: function() {
			if (this.canStep()) {
				if (this.stepNum < this.events[this.eventNum].context.steps.length-1) {
					this.stepNum++;
				} else if (this.stepNum === Infinity) {
					this.stepNum = 0;
				} else {
					this.stepNum = Infinity;
				}
				this.delegate.runnerChanged();
			}
		},

		stepBackward: function() {
			if (this.canStep()) {
				if (this.stepNum < Infinity && this.stepNum > 0) {
					this.stepNum--;
				} else if (this.stepNum < Infinity) {
					this.stepNum = Infinity;
				}
				this.delegate.runnerChanged();
			}
		},

		getStepTotal: function() {
			return this.events[this.eventNum].context.steps.length;
		},

		getStepNum: function() {
			return this.stepNum;
		},

		setStepNum: function(stepNum) {
			if (stepNum >= 0 && stepNum < this.events[this.eventNum].context.steps.length) {
				this.stepNum = stepNum;
			}
			this.delegate.runnerChanged();
		},

		updateStepping: function() {
			var total = this.getStepTotal();
			if (total <= 0) {
				this.stepNum = Infinity;
			} else if (this.stepNum < Infinity && this.stepNum >= total) {
				this.stepNum = total-1;
			}
		},

		/// CONTROLS ///
		enable: function() {
			this.enabled = true;
		},

		disable: function() {
			this.enabled = false;
		},

		isEnabled: function() {
			return this.enabled;
		},

		isInteractive: function() {
			return this.interactive;
		},

		makeInteractive: function(signature) {
			this.interactive = true;
			this.interactiveSignature = signature;
			if (this.isStepping()) {
				this.paused = true;
			}
		},

		hasbaseCodeChanged: function() {
			return this.baseCodeChanged;
		},

		getAllSteps: function() {
			if (this.eventNum >= 0) {
				return this.events[this.eventNum].context.getAllSteps();
			} else {
				return [];
			}
		},

		/// ERRORS & MSG ///
		hasError: function() {
			return this.eventNum >= 0 && this.events[this.eventNum].context.hasError();
		},

		getError: function() {
			return this.events[this.eventNum].context.getError();
		},

		getErrorEventNums: function() {
			return this.errorEventNums;
		},

		getMessage: function() {
			if (this.eventNum < 0 || this.events[this.eventNum].context === null || this.stepNum === Infinity) return null;
			else return this.events[this.eventNum].context.steps[this.stepNum] || null;
		},

		/// UTILS ///
		getCallIdsByNodeIds: function(nodeIds) {
			if (this.eventNum >= 0) {
				return this.events[this.eventNum].context.getCallIdsByNodeIds(nodeIds);
			} else {
				return [];
			}
		},

		getAllCallIdsByNodeIds: function(nodeIds) {
			var callIds = [];
			for (var i=0; i<this.events.length; i++) {
				callIds[i] = this.events[i].context.getCallIdsByNodeIds(nodeIds);
			}
			return callIds;
		},

		getExamples: function(text) {
			return jsmm.editor.autocompletion.getExamples(this.exampleScope, text);
		},

		getFunctionNode: function() {
			if (this.events[this.eventNum] === this.baseEvent || this.eventNum < 0) {
				return null;
			} else {
				return this.tree.getFunctionNode(this.events[this.eventNum].funcName);
			}
		}
	};
};

},{}],30:[function(require,module,exports){
/*jshint node:true*/
"use strict";

module.exports = function(jsmm) {
	jsmm.test = {};
	
	jsmm.test.Console = function() {
		this.result = '';
	};
	
	jsmm.test.Console.prototype = {
		log: function(str) {
			this.result += str + '\n';
		},
		getAugmentedObject: function() {
			var that = this;
			return {
				type: 'object',
				string: '[console object]',
				properties: {
					log: {
						name: 'log',
						type: 'function',
						string: '[console log function]',
						func: function(context, name, args) {
							return that.log(args[0]);
						}
					}
				}
			};
		}
	};
	
	jsmm.test.runAll = function() {
		jsmm.test.output = '';
		var failed = 0;
		var name;

		for (name in jsmm.test.tests.succeed) {
			if (!jsmm.test.runTest(name.replace(/_/g, ' '), jsmm.test.tests.succeed[name], true, true)) failed++;
		}
		for (name in jsmm.test.tests.fail_threeway) {
			if (!jsmm.test.runTest(name.replace(/_/g, ' '), jsmm.test.tests.fail_threeway[name], true, false)) failed++;
		}
		for (name in jsmm.test.tests.fail_twoway) {
			if (!jsmm.test.runTest(name.replace(/_/g, ' '), jsmm.test.tests.fail_twoway[name], false, false)) failed++;
		}
		if (failed <= 0) {
			jsmm.test.output += 'All tests completed successfully!';
		} else if (failed === 1) {
			jsmm.test.output += 'Unfortunately 1 test failed...';
		} else {
			jsmm.test.output += 'Unfortunately ' + failed + ' tests failed...';
		}
		return failed <= 0;
	};

	jsmm.test.printError1 = function(name, name1, error1, code) {
		jsmm.test.output += 'In test "' + name + '" ' + name1 + ' was incorrect.\n';
		jsmm.test.output += name1 + ':\n' + JSON.stringify(error1) + '\n';
		jsmm.test.output += 'code:\n' + code + '\n';
	};
	
	jsmm.test.printError2 = function(name, name1, name2, error1, error2, code) {
		jsmm.test.output += 'In test "' + name + '" ' + name1 + ' and ' + name2 + ' were incorrect.\n';
		jsmm.test.output += name1 + ':\n' + JSON.stringify(error1) + '\n';
		jsmm.test.output += name2 + ':\n' + JSON.stringify(error2) + '\n';
		jsmm.test.output += 'code:\n' + code + '\n';
	};
	
	jsmm.test.runTest = function(name, code, threeway, succeed) {
		var consoleRaw = new jsmm.test.Console();
		var consoleSafe = new jsmm.test.Console();
		//var consoleStep = new jsmm.test.Console();
		var errorRaw = null;
		var errorSafe = null;
		//var errorStep = null;
		var runner = new jsmm.OldSimpleRunner(code);
		
		if (threeway) {
			runner.setScope({console: consoleRaw});
			if (!runner.runRaw()) {
				errorRaw = runner.getError();
			}
		}
		
		runner.setScope({console: consoleSafe.getAugmentedObject()});
		if (!runner.runSafe()) {
			errorSafe = runner.getError();
		}
		
		// runner.setScope({console: consoleStep});
		// if (!runner.runStep()) {
			// errorStep = runner.getError();
		// }
		
		// when it should threeway we can compare against the raw result
		if (threeway && !jsmm.test.compareErrors(errorRaw, errorSafe, succeed)) {
			jsmm.test.printError2(name, 'errorRaw', 'errorSafe', errorRaw, errorSafe, code);
			return false;
		}
		
		// if (!jsmm.test.compareErrors(errorSafe, errorStep, succeed)) {
			// jsmm.test.printError2(name, 'errorSafe', 'errorStep', errorSafe, errorStep, code);
			// return false;
		// }
		
		if (threeway && consoleRaw.result !== consoleSafe.result) {
			jsmm.test.printError2(name, 'consoleRaw', 'consoleSafe', consoleRaw.result, consoleSafe.result, code);
			return false;
		}
		
		// if (consoleSafe.result !== consoleStep.result) {
			// jsmm.test.printError2(name, 'consoleSafe', 'consoleStep', consoleSafe.result, consoleStep.result, code);
			// return false;
		// }

		if (threeway && succeed !== (errorRaw === null)) {
			jsmm.test.printError1(name, 'errorRaw', errorRaw, code);
			return false;
		}

		if (succeed !== (errorSafe === null)) {
			jsmm.test.printError1(name, 'errorSafe', errorSafe, code);
			return false;
		}

		// no need to check errorStep for null, since otherwise it would have been caught when comparing errors
		
		jsmm.test.output += 'Test "' + name + '" completed successfully!\n';
		return true;
	};
	
	jsmm.test.compareErrors = function(error1, error2) {
		if (error1 === null && error2 === null) {
			return true;
		} else if (error1 === null || error2 === null) {
			return false;
		// } else if (error1.orig !== null || error2.orig !== null) {
		// 	return false;
		} else {
			return error1.getHTML() === error2.getHTML();
		}
	};
	
	jsmm.test.tests = { succeed: {}, fail_threeway: {}, fail_twoway: {}};
	
	jsmm.test.tests.succeed.comments =
	'// one line comment' + '\n' +
	'var a;' + '\n' +
	'/* bla */var a; // bla *// ***//// / * */' + '\n' +
	'/* bla */var a; /* bla * // ***//// / *' + '\n' +
	'/*start of line comment*/var a;/* multiline' + '\n' +
	'comment with * and / and /* and /***...' + '\n' +
	'var a;' + '\n' +
	'and also // and ///*** and more! */' + '\n' +
	'var a;' + '\n' +
	'console.log("Hello world!");';
	
	jsmm.test.tests.succeed.assignments =
	'// variable assignments' + '\n' +
	'var a;' + '\n' +
	'a = 0;' + '\n' +
	'console.log(a);' + '\n' +
	'var a = 5;' + '\n' +
	'console.log(a);' + '\n' +
	'var b = a*a+a/a-a%a+(a*a*a-a);' + '\n' +
	'console.log(b);' + '\n' +
	'var c=b, d=c, e=d;' + '\n' +
	'console.log(e);' + '\n' +
	'c = b==c && c==d && d==b;' + '\n' +
	'console.log(c);' + '\n' +
	'd = c || b > d;' + '\n' +
	'console.log(d);' + '\n' +
	'e = (1>2 && 1>=2 && 2<1 && 2<=1) || 2 != 1;' + '\n' +
	'console.log(e);' + '\n' +
	'var f = -5 > +3 || !false;' + '\n' +
	'console.log(f);' + '\n' +
	'f = !(f || false) || false;' + '\n' +
	'console.log(f);' + '\n' +
	'a = 1.4E-02;' + '\n' +
	'console.log(a);' + '\n' +
	'a += a;' + '\n' +
	'console.log(a);' + '\n' +
	'a *= a;' + '\n' +
	'console.log(a);' + '\n' +
	'a -= a/10;' + '\n' +
	'console.log(a);' + '\n' +
	'a /= 0.003;' + '\n' +
	'console.log(a);' + '\n' +
	'a %= 10;' + '\n' +
	'console.log(a);' + '\n' +
	'a++;' + '\n' +
	'console.log(a);' + '\n' +
	'a--;' + '\n' +
	'console.log(a);' + '\n' +
	'a = 5+3*5+1+9*10/5%2+18/23-52/16%82-53*32;' + '\n' +
	'console.log(a);' + '\n' +
	'var str="";' + '\n' +
	'console.log(str);' + '\n' +
	'str += "hi";' + '\n' +
	'console.log(str);' + '\n' +
	'str += 10;' + '\n' +
	'console.log(str);' + '\n' +
	'str = 5+5+str;' + '\n' +
	'console.log(str);' + '\n' +
	'//var len = str.length;' + '\n' +
	'//console.log(len);';
	
	jsmm.test.tests.succeed.control =
	'// control structures' + '\n' +
	'var f=true, e=!f;' + '\n' +
	'if (true) {' + '\n' +
	'  console.log(true);' + '\n' +
	'  if (f && e && false) {' + '\n' +
	'    console.log(false);' + '\n' +
	'  } else {' + '\n' +
	'    if (false) {' + '\n' +
	'      console.log(false);' + '\n' +
	'    } else if (true) {' + '\n' +
	'      if(true) {' + '\n' +
	'        console.log("a");' + '\n' +
	'      }' + '\n' +
	'      if(false) {' + '\n' +
	'        console.log("b");' + '\n' +
	'      }' + '\n' +
	'      console.log(true);' + '\n' +
	'    }' + '\n' +
	'  }' + '\n' +
	'}' + '\n' +
	'' + '\n' +
	'var i=0;' + '\n' +
	'while (i<10) {' + '\n' +
	'  console.log(i*i-i);' + '\n' +
	'  i++;' + '\n' +
	'}' + '\n' +
	'' + '\n' +
	'for (var j=0; j<10; j++) {' + '\n' +
	'  console.log(j);' + '\n' +
	'}';
	
	jsmm.test.tests.succeed.functions_simple =
	'// functions simple' + '\n' +
	'function f1(n) {' + '\n' +
	'  console.log(n*100);' + '\n' +
	'}' + '\n' +
	'function f2(n) {' + '\n' +
	'  return n*100;' + '\n' +
	'}' + '\n' +
	'f1(10);' + '\n' +
	'console.log(f2(20));';
	
	jsmm.test.tests.succeed.functions_complex =
	'// functions complex' + '\n' +
	'var a, b=100, c="test", d=1000;' + '\n' +
	'function f1(a, b, c, q1, q2, q3) {' + '\n' +
	'  console.log(a+d);' + '\n' +
	'  console.log(f2(b*3)/3);' + '\n' +
	'  console.log(f3(b, c));' + '\n' +
	'  console.log((q1+q2)%q3);' + '\n' +
	'}' + '\n' +
	'function f2(n) {' + '\n' +
	'  var c = n;' + '\n' +
	'  return n+(3/c);' + '\n' +
	'}' + '\n' +
	'function f3(a,b) {' + '\n' +
	'  console.log(a);' + '\n' +
	'  console.log(b);' + '\n' +
	'  for (var c=0; c>-100; c--) {' + '\n' +
	'    a *= b;' + '\n' +
	'  }' + '\n' +
	'  return a+b;' + '\n' +
	'}' + '\n' +
	'var x=5, y=10, z=15;' + '\n' +
	'f1(x,y,z, 8, 9, 10, "test", "blah", "more blah");';
	
	jsmm.test.tests.fail_threeway.missing_semicolon_1 = 'var a';
	jsmm.test.tests.fail_threeway.missing_semicolon_2 = 'var a=5*5';
	jsmm.test.tests.fail_threeway.missing_semicolon_3 = 'var a;\n a=5*5';
	jsmm.test.tests.fail_threeway.missing_semicolon_4 = 'var a;\n if (a) {\n a=5*5 \n}';
	jsmm.test.tests.fail_threeway.missing_semicolon_5 = 'console.log(5)';
	jsmm.test.tests.fail_threeway.missing_semicolon_6 = 'var a;\n a+=a';
	jsmm.test.tests.fail_threeway.missing_semicolon_7 = 'for(var a=0 a<5; a++) {\n }';
	jsmm.test.tests.fail_threeway.missing_bracket_1 = 'if (true) \n }';
	jsmm.test.tests.fail_threeway.missing_bracket_2 = 'if (true) {';
	jsmm.test.tests.fail_threeway.missing_bracket_3 = 'while (true) \n }';
	jsmm.test.tests.fail_threeway.missing_bracket_4 = 'while (true) {';
	jsmm.test.tests.fail_threeway.missing_bracket_5 = 'for (var i=0; i<10; i++) \n }';
	jsmm.test.tests.fail_threeway.missing_bracket_6 = 'for (var i=0; i<10; i++) {\n';
	jsmm.test.tests.fail_threeway.missing_bracket_7 = 'if (true) {\n } else \n }';
	jsmm.test.tests.fail_threeway.missing_bracket_8 = 'if (true) {\n } else { \n';
	jsmm.test.tests.fail_threeway.missing_bracket_9 = 'if (true) {\n  else { \n }';
	jsmm.test.tests.fail_threeway.missing_bracket_10 = 'if (true) \n } else { \n }';
	jsmm.test.tests.fail_threeway.missing_bracket_11 = 'if (5>(5+5) {\n }';
	jsmm.test.tests.fail_threeway.missing_bracket_12 = 'if 5>5) {\n }';
	jsmm.test.tests.fail_threeway.incorrect_string_1 = 'var str = "Hello World!;';
	jsmm.test.tests.fail_threeway.incorrect_string_2 = 'var str = "Hello World!';
	jsmm.test.tests.fail_threeway.incorrect_string_3 = 'var str = Hello World!";';
	jsmm.test.tests.fail_threeway.incorrect_string_4 = 'var str = "Hello World!\n";';
	jsmm.test.tests.fail_threeway.incorrect_string_5 = 'var str = "Hello \\World!\n";';
	jsmm.test.tests.fail_threeway.reserved_word_1 = 'var jsmmscope;';
	jsmm.test.tests.fail_threeway.reserved_word_2 = 'var jsmmscopeInner;';
	jsmm.test.tests.fail_threeway.reserved_word_3 = 'var jsmmscopeOuter;';
	jsmm.test.tests.fail_threeway.reserved_word_4 = 'var jsmm;';
	jsmm.test.tests.fail_threeway.reserved_word_5 = 'var jsmmparser;';
	jsmm.test.tests.fail_threeway.reserved_word_6 = 'var jsmmExecutionCounter;';
	jsmm.test.tests.fail_threeway.reserved_word_6 = 'var jsmmtemp;';
	jsmm.test.tests.fail_threeway.reserved_word_6 = 'var jsmmtree;';
	jsmm.test.tests.fail_threeway.reserved_word_7 = 'var NaN;';
	jsmm.test.tests.fail_threeway.reserved_word_8 = 'var this;';
	jsmm.test.tests.fail_threeway.reserved_word_9 = 'var arguments;';
	
	jsmm.test.tests.fail_twoway.unary_1 = 'console.log(+true);';
	jsmm.test.tests.fail_twoway.unary_2 = 'console.log(-false);';
	jsmm.test.tests.fail_twoway.unary_3 = 'console.log(+"string");';
	jsmm.test.tests.fail_twoway.unary_4 = 'console.log(-"string");';
	jsmm.test.tests.fail_twoway.unary_5 = 'console.log(!"string");';
	jsmm.test.tests.fail_twoway.unary_6 = 'console.log(!5);';
	jsmm.test.tests.fail_twoway.invalid_function_call_1 = 'function f(a, b) {\n return a;\n }\n f(1);';
	jsmm.test.tests.fail_twoway.invalid_function_call_2 = 'function f(a, b) {\n return a+b;\n }\n f(1);';
	//jsmm.test.tests.fail_twoway.repeated_declaration_1 = 'var a;\n var a;';
	//jsmm.test.tests.fail_twoway.repeated_declaration_2 = 'var a = 1;\n var a;';
};

},{}],31:[function(require,module,exports){
/*jshint node:true*/
"use strict";

module.exports = function(jsmm) {
	jsmm.Tree = function() { return this.init.apply(this, arguments); };
	jsmm.Tree.prototype = {
		init: function(code, options) {
			this.options = options || {};

			this.genIds = {base: 1, functions: 1};
			this.nodes = [];
			this.nodesByType = { Program: [], StatementList: [], CommonSimpleStatement: [], PostfixStatement: [],
				AssignmentStatement: [], VarStatement: [], VarItem: [], ReturnStatement: [], BinaryExpression: [],
				UnaryExpression: [], ParenExpression: [], NumberLiteral: [], StringLiteral: [], BooleanLiteral: [], NameIdentifier: [],
				ObjectIdentifier: [], ArrayIdentifier: [], FunctionCall: [], ArrayDefinition: [], IfBlock: [], ElseIfBlock: [],
				ElseBlock: [], WhileBlock: [], ForBlock: [], FunctionDeclaration: []
			};
			this.nodesByLine = {};
			this.functionNodes = {};
			this.error = null;
			jsmm.parser.yy.tree = this;

			try {
				var lines = code.split(/\n/);
				for (var i=0; i<lines.length; i++) {
					if (lines[i].length > (this.options.maxWidth || jsmm.maxWidth)) {
						throw new jsmm.msg.CriticalError({line: i+1, column: jsmm.maxWidth}, 'This line is too long, please split it into separate statements');
					}
				}

				this.programNode = jsmm.parser.parse(code + '\n');
			} catch (error) {
				if (error.type === 'Error') {
					this.error = error;
				} else {
					this.error = new jsmm.msg.Error(0, 'An unknown error has occurred', error);
					if (jsmm.debug) {
						throw error;
					}
				}
			}
		},
		hasError: function() {
			return this.error !== null;
		},
		compareBase: function(context) {
			if (this.hasError() || context.tree.hasError() || context.hasError()) {
				return true;
			} else {
				return context.tree.programNode.getCompareBaseCode(context.getCalledFunctions()) !== this.programNode.getCompareBaseCode(context.getCalledFunctions());
			}
		},
		compareFunctions: function(context) {
			if (this.hasError() || context.tree.hasError() || context.hasError()) {
				return true;
			} else {
				return context.tree.programNode.getCompareFunctionCode() !== this.programNode.getCompareFunctionCode();
			}
		},
		compareAll: function(context) {
			if (this.hasError() || context.tree.hasError() || context.hasError()) {
				return true;
			} else {
				return context.tree.programNode.getRunCode() !== this.programNode.getRunCode();
			}
		},
		getError: function() {
			return this.error;
		},
		getNewId: function(type) {
			return type + '-' + this.genIds[type]++;
		},
		getNodeByLine: function(line) {
			if (this.nodesByLine[line] === undefined) return null;
			else return this.nodesByLine[line];
		},
		getNodeLines: function() {
			var lines = [];
			for (var line in this.nodesByLine) {
				lines.push(line);
			}
			return lines;
		},
		getNodesByType: function(type) {
			return this.nodesByType[type];
		},
		getNodeById: function(nodeId) {
			if (this.nodes[nodeId] !== undefined) return this.nodes[nodeId];
			else return null;
		},
		getFunctionNode: function(funcName) {
			if (this.functionNodes[funcName] !== undefined) return this.functionNodes[funcName];
			else return null;
		},
		getNodeIdsByRange: function(line1, line2) {
			var nodeIds = [];
			for (var line=line1; line<=line2; line++) {
				if (this.nodesByLine[line] !== undefined) {
					nodeIds.push(this.nodesByLine[line].id);
				}
			}
			return nodeIds;
		}
	};
};
},{}],32:[function(require,module,exports){
(function (process){
/* parser generated by jison 0.4.4 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var jsmmparser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"programStatementList":4,"EOF":5,"NEWLINE":6,"commonStatement":7,"functionDeclaration":8,"statementList":9,"simpleStatement":10,";":11,"blockStatement":12,"returnStatement":13,"assignmentStatement":14,"varStatement":15,"callExpression":16,"identExpression":17,"+":18,"=":19,"expression":20,"+=":21,"VAR":22,"varList":23,"varListItem":24,",":25,"NAME":26,"RETURN":27,"andExpression":28,"||":29,"relationalExpression":30,"&&":31,"addExpression":32,"==":33,"multExpression":34,"unaryExpression":35,"*":36,"primaryExpression":37,"!":38,"literal":39,"arrayDefinition":40,"(":41,")":42,"NUMBER":43,"STRING":44,"TRUE":45,"FALSE":46,".":47,"[":48,"]":49,"callArguments":50,"arrayList":51,"ifBlock":52,"whileBlock":53,"forBlock":54,"IF":55,"{":56,"}":57,"elseBlock":58,"ELSE":59,"WHILE":60,"FOR":61,"FUNCTION":62,"functionArguments":63,"reserved":64,"RESERVED":65,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"NEWLINE",11:";",18:"+",19:"=",21:"+=",22:"VAR",25:",",26:"NAME",27:"RETURN",29:"||",31:"&&",33:"==",36:"*",38:"!",41:"(",42:")",43:"NUMBER",44:"STRING",45:"TRUE",46:"FALSE",47:".",48:"[",49:"]",55:"IF",56:"{",57:"}",59:"ELSE",60:"WHILE",61:"FOR",62:"FUNCTION",65:"RESERVED"},
productions_: [0,[3,2],[3,3],[4,0],[4,3],[4,3],[9,0],[9,3],[7,2],[7,1],[7,1],[10,1],[10,1],[10,1],[10,3],[14,3],[14,3],[15,2],[23,1],[23,3],[24,1],[24,3],[13,2],[13,3],[20,1],[20,3],[28,1],[28,3],[30,1],[30,3],[32,1],[32,3],[34,1],[34,3],[35,1],[35,2],[35,2],[37,1],[37,1],[37,1],[37,1],[37,3],[39,1],[39,1],[39,1],[39,1],[17,1],[17,3],[17,4],[16,3],[16,4],[50,1],[50,3],[40,2],[40,3],[51,1],[51,3],[12,1],[12,1],[12,1],[52,9],[58,0],[58,2],[58,5],[53,8],[54,12],[8,8],[8,9],[63,1],[63,3],[64,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1: this.$ = new yy.nodes.Program(this._$, undefined, $$[$0-1]); return this.$; 
break;
case 2: this.$ = new yy.nodes.Program(this._$, undefined, $$[$0-1]); return this.$; 
break;
case 3: this.$ = new yy.nodes.StatementList(this._$, undefined); 
break;
case 4: this.$ = $$[$0-2]; this.$.addStatement($$[$0-1]); 
break;
case 5: this.$ = $$[$0-2]; this.$.addStatement($$[$0-1]); 
break;
case 6: this.$ = new yy.nodes.StatementList(this._$, undefined); 
break;
case 7: this.$ = $$[$0-2]; this.$.addStatement($$[$0-1]); 
break;
case 8: this.$ = new yy.nodes.CommonSimpleStatement(this._$, undefined, $$[$0-1]); 
break;
case 14: this.$ = new yy.nodes.PostfixStatement(this._$, undefined, $$[$0-2], $$[$0-1]+$$[$0-1]); 
break;
case 15: this.$ = new yy.nodes.AssignmentStatement(this._$, undefined, $$[$0-2], "=", $$[$0]); 
break;
case 16: this.$ = new yy.nodes.AssignmentStatement(this._$, undefined, $$[$0-2], $$[$0-1], $$[$0]); 
break;
case 17: this.$ = $$[$0]; 
break;
case 18: this.$ = new yy.nodes.VarStatement(this._$, undefined); this.$.addVarItem($$[$0]); 
break;
case 19: this.$ = $$[$0-2]; this.$.addVarItem($$[$0]); 
break;
case 20: this.$ = new yy.nodes.VarItem(this._$, undefined, $$[$0], null); 
break;
case 21:
			this.$ = new yy.nodes.VarItem(this._$, undefined, $$[$0-2], new yy.nodes.AssignmentStatement(this._$, undefined, new yy.nodes.NameIdentifier(_$[$0-2], undefined, $$[$0-2]), "=", $$[$0]));
		
break;
case 22: this.$ = new yy.nodes.ReturnStatement(this._$, undefined, null); 
break;
case 23: this.$ = new yy.nodes.ReturnStatement(this._$, undefined, $$[$0-1]); 
break;
case 25: this.$ = new yy.nodes.BinaryExpression(this._$, undefined, $$[$0-2], $$[$0-1], $$[$0]); 
break;
case 27: this.$ = new yy.nodes.BinaryExpression(this._$, undefined, $$[$0-2], $$[$0-1], $$[$0]); 
break;
case 29: this.$ = new yy.nodes.BinaryExpression(this._$, undefined, $$[$0-2], $$[$0-1], $$[$0]); 
break;
case 31: this.$ = new yy.nodes.BinaryExpression(this._$, undefined, $$[$0-2], $$[$0-1], $$[$0]); 
break;
case 33: this.$ = new yy.nodes.BinaryExpression(this._$, undefined, $$[$0-2], $$[$0-1], $$[$0]); 
break;
case 35: this.$ = new yy.nodes.UnaryExpression(this._$, undefined, $$[$0-1], $$[$0]); 
break;
case 36: this.$ = new yy.nodes.UnaryExpression(this._$, undefined, $$[$0-1], $$[$0]); 
break;
case 41: this.$ = new yy.nodes.ParenExpression(this._$, undefined, $$[$0-1]); 
break;
case 42: this.$ = new yy.nodes.NumberLiteral(this._$, undefined, $$[$0]); 
break;
case 43: this.$ = new yy.nodes.StringLiteral(this._$, undefined, $$[$0]); 
break;
case 44: this.$ = new yy.nodes.BooleanLiteral(this._$, undefined, true); 
break;
case 45: this.$ = new yy.nodes.BooleanLiteral(this._$, undefined, false); 
break;
case 46: this.$ = new yy.nodes.NameIdentifier(this._$, undefined, $$[$0]); 
break;
case 47: this.$ = new yy.nodes.ObjectIdentifier(this._$, undefined, $$[$0-2], $$[$0]); 
break;
case 48: this.$ = new yy.nodes.ArrayIdentifier(this._$, undefined, $$[$0-3], $$[$0-1]); 
break;
case 49: this.$ = new yy.nodes.FunctionCall(this._$, undefined, $$[$0-2], []); 
break;
case 50: this.$ = new yy.nodes.FunctionCall(this._$, undefined, $$[$0-3], $$[$0-1]); 
break;
case 51: this.$ = [$$[$0]]; 
break;
case 52: this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 53: this.$ = new yy.nodes.ArrayDefinition(this._$, undefined, []); 
break;
case 54: this.$ = new yy.nodes.ArrayDefinition(this._$, undefined, $$[$0-1]); 
break;
case 55: this.$ = [$$[$0]]; 
break;
case 56: this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 60: this.$ = new yy.nodes.IfBlock(this._$, _$[$0-5].last_column, $$[$0-6], $$[$0-2], $$[$0]); 
break;
case 61: this.$ = null; 
break;
case 62: this.$ = new yy.nodes.ElseIfBlock(this._$, _$[$0-1].last_column, $$[$0]); 
break;
case 63: this.$ = new yy.nodes.ElseBlock(this._$, _$[$0-4].last_column, $$[$0-1]); 
break;
case 64: this.$ = new yy.nodes.WhileBlock(this._$, _$[$0-4].last_column, $$[$0-5], $$[$0-1]); 
break;
case 65: this.$ = new yy.nodes.ForBlock(this._$, _$[$0-4].last_column, $$[$0-9], $$[$0-7], $$[$0-5], $$[$0-1]); 
break;
case 66: this.$ = new yy.nodes.FunctionDeclaration(this._$, _$[$0-4].last_column, $$[$0-6], [], $$[$0-1]); 
break;
case 67: this.$ = new yy.nodes.FunctionDeclaration(this._$, _$[$0-4].last_column, $$[$0-7], $$[$0-5], $$[$0-1]); 
break;
case 68: this.$ = [$$[$0]]; 
break;
case 69: this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
}
},
table: [{3:1,4:2,5:[2,3],6:[1,3],22:[2,3],26:[2,3],27:[2,3],55:[2,3],60:[2,3],61:[2,3],62:[2,3]},{1:[3]},{5:[1,4],7:5,8:6,10:7,12:8,13:9,14:11,15:12,16:13,17:14,22:[1,19],26:[1,20],27:[1,18],52:15,53:16,54:17,55:[1,21],60:[1,22],61:[1,23],62:[1,10]},{4:24,5:[2,3],22:[2,3],26:[2,3],27:[2,3],55:[2,3],60:[2,3],61:[2,3],62:[2,3]},{1:[2,1]},{6:[1,25]},{6:[1,26]},{11:[1,27]},{6:[2,9]},{6:[2,10]},{26:[1,28]},{11:[2,11],42:[2,11]},{11:[2,12],42:[2,12]},{11:[2,13],42:[2,13]},{18:[1,29],19:[1,30],21:[1,31],41:[1,32],47:[1,33],48:[1,34]},{6:[2,57]},{6:[2,58]},{6:[2,59]},{11:[1,35],16:47,17:46,18:[1,43],20:36,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{23:55,24:56,26:[1,57]},{11:[2,46],18:[2,46],19:[2,46],21:[2,46],25:[2,46],29:[2,46],31:[2,46],33:[2,46],36:[2,46],41:[2,46],42:[2,46],47:[2,46],48:[2,46],49:[2,46]},{41:[1,58]},{41:[1,59]},{41:[1,60]},{5:[1,61],7:5,8:6,10:7,12:8,13:9,14:11,15:12,16:13,17:14,22:[1,19],26:[1,20],27:[1,18],52:15,53:16,54:17,55:[1,21],60:[1,22],61:[1,23],62:[1,10]},{5:[2,4],22:[2,4],26:[2,4],27:[2,4],55:[2,4],60:[2,4],61:[2,4],62:[2,4]},{5:[2,5],22:[2,5],26:[2,5],27:[2,5],55:[2,5],60:[2,5],61:[2,5],62:[2,5]},{6:[2,8]},{41:[1,62]},{18:[1,63]},{16:47,17:46,18:[1,43],20:64,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{16:47,17:46,18:[1,43],20:65,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{16:47,17:46,18:[1,43],20:68,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],42:[1,66],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54],50:67},{26:[1,69]},{16:47,17:46,18:[1,43],20:70,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{6:[2,22]},{11:[1,71],29:[1,72]},{11:[2,24],25:[2,24],29:[2,24],31:[1,73],42:[2,24],49:[2,24]},{11:[2,26],25:[2,26],29:[2,26],31:[2,26],33:[1,74],42:[2,26],49:[2,26]},{11:[2,28],18:[1,75],25:[2,28],29:[2,28],31:[2,28],33:[2,28],42:[2,28],49:[2,28]},{11:[2,30],18:[2,30],25:[2,30],29:[2,30],31:[2,30],33:[2,30],36:[1,76],42:[2,30],49:[2,30]},{11:[2,32],18:[2,32],25:[2,32],29:[2,32],31:[2,32],33:[2,32],36:[2,32],42:[2,32],49:[2,32]},{11:[2,34],18:[2,34],25:[2,34],29:[2,34],31:[2,34],33:[2,34],36:[2,34],42:[2,34],49:[2,34]},{16:47,17:46,18:[1,43],26:[1,20],35:77,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{16:47,17:46,18:[1,43],26:[1,20],35:78,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{11:[2,37],18:[2,37],25:[2,37],29:[2,37],31:[2,37],33:[2,37],36:[2,37],42:[2,37],49:[2,37]},{11:[2,38],18:[2,38],25:[2,38],29:[2,38],31:[2,38],33:[2,38],36:[2,38],41:[1,32],42:[2,38],47:[1,33],48:[1,34],49:[2,38]},{11:[2,39],18:[2,39],25:[2,39],29:[2,39],31:[2,39],33:[2,39],36:[2,39],42:[2,39],49:[2,39]},{11:[2,40],18:[2,40],25:[2,40],29:[2,40],31:[2,40],33:[2,40],36:[2,40],42:[2,40],49:[2,40]},{16:47,17:46,18:[1,43],20:79,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{11:[2,42],18:[2,42],25:[2,42],29:[2,42],31:[2,42],33:[2,42],36:[2,42],42:[2,42],49:[2,42]},{11:[2,43],18:[2,43],25:[2,43],29:[2,43],31:[2,43],33:[2,43],36:[2,43],42:[2,43],49:[2,43]},{11:[2,44],18:[2,44],25:[2,44],29:[2,44],31:[2,44],33:[2,44],36:[2,44],42:[2,44],49:[2,44]},{11:[2,45],18:[2,45],25:[2,45],29:[2,45],31:[2,45],33:[2,45],36:[2,45],42:[2,45],49:[2,45]},{16:47,17:46,18:[1,43],20:82,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54],49:[1,80],51:81},{11:[2,17],25:[1,83],42:[2,17]},{11:[2,18],25:[2,18],42:[2,18]},{11:[2,20],19:[1,84],25:[2,20],42:[2,20]},{16:47,17:46,18:[1,43],20:85,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{16:47,17:46,18:[1,43],20:86,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{10:87,14:11,15:12,16:13,17:14,22:[1,19],26:[1,20]},{1:[2,2]},{26:[1,90],42:[1,88],63:89},{11:[2,14],42:[2,14]},{11:[2,15],29:[1,72],42:[2,15]},{11:[2,16],29:[1,72],42:[2,16]},{11:[2,49],18:[2,49],25:[2,49],29:[2,49],31:[2,49],33:[2,49],36:[2,49],42:[2,49],49:[2,49]},{25:[1,92],42:[1,91]},{25:[2,51],29:[1,72],42:[2,51]},{11:[2,47],18:[2,47],19:[2,47],21:[2,47],25:[2,47],29:[2,47],31:[2,47],33:[2,47],36:[2,47],41:[2,47],42:[2,47],47:[2,47],48:[2,47],49:[2,47]},{29:[1,72],49:[1,93]},{6:[2,23]},{16:47,17:46,18:[1,43],26:[1,20],28:94,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{16:47,17:46,18:[1,43],26:[1,20],30:95,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{16:47,17:46,18:[1,43],26:[1,20],32:96,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{16:47,17:46,18:[1,43],26:[1,20],34:97,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{16:47,17:46,18:[1,43],26:[1,20],35:98,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{11:[2,35],18:[2,35],25:[2,35],29:[2,35],31:[2,35],33:[2,35],36:[2,35],42:[2,35],49:[2,35]},{11:[2,36],18:[2,36],25:[2,36],29:[2,36],31:[2,36],33:[2,36],36:[2,36],42:[2,36],49:[2,36]},{29:[1,72],42:[1,99]},{11:[2,53],18:[2,53],25:[2,53],29:[2,53],31:[2,53],33:[2,53],36:[2,53],42:[2,53],49:[2,53]},{25:[1,101],49:[1,100]},{25:[2,55],29:[1,72],49:[2,55]},{24:102,26:[1,57]},{16:47,17:46,18:[1,43],20:103,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{29:[1,72],42:[1,104]},{29:[1,72],42:[1,105]},{11:[1,106]},{56:[1,107]},{25:[1,109],42:[1,108]},{25:[2,68],42:[2,68]},{11:[2,50],18:[2,50],25:[2,50],29:[2,50],31:[2,50],33:[2,50],36:[2,50],42:[2,50],49:[2,50]},{16:47,17:46,18:[1,43],20:110,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{11:[2,48],18:[2,48],19:[2,48],21:[2,48],25:[2,48],29:[2,48],31:[2,48],33:[2,48],36:[2,48],41:[2,48],42:[2,48],47:[2,48],48:[2,48],49:[2,48]},{11:[2,25],25:[2,25],29:[2,25],31:[1,73],42:[2,25],49:[2,25]},{11:[2,27],25:[2,27],29:[2,27],31:[2,27],33:[1,74],42:[2,27],49:[2,27]},{11:[2,29],18:[1,75],25:[2,29],29:[2,29],31:[2,29],33:[2,29],42:[2,29],49:[2,29]},{11:[2,31],18:[2,31],25:[2,31],29:[2,31],31:[2,31],33:[2,31],36:[1,76],42:[2,31],49:[2,31]},{11:[2,33],18:[2,33],25:[2,33],29:[2,33],31:[2,33],33:[2,33],36:[2,33],42:[2,33],49:[2,33]},{11:[2,41],18:[2,41],25:[2,41],29:[2,41],31:[2,41],33:[2,41],36:[2,41],42:[2,41],49:[2,41]},{11:[2,54],18:[2,54],25:[2,54],29:[2,54],31:[2,54],33:[2,54],36:[2,54],42:[2,54],49:[2,54]},{16:47,17:46,18:[1,43],20:111,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{11:[2,19],25:[2,19],42:[2,19]},{11:[2,21],25:[2,21],29:[1,72],42:[2,21]},{56:[1,112]},{56:[1,113]},{16:47,17:46,18:[1,43],20:114,26:[1,20],28:37,30:38,32:39,34:40,35:41,37:42,38:[1,44],39:45,40:48,41:[1,49],43:[1,50],44:[1,51],45:[1,52],46:[1,53],48:[1,54]},{6:[1,115]},{56:[1,116]},{26:[1,117]},{25:[2,52],29:[1,72],42:[2,52]},{25:[2,56],29:[1,72],49:[2,56]},{6:[1,118]},{6:[1,119]},{11:[1,120],29:[1,72]},{9:121,22:[2,6],26:[2,6],27:[2,6],55:[2,6],57:[2,6],60:[2,6],61:[2,6]},{6:[1,122]},{25:[2,69],42:[2,69]},{9:123,22:[2,6],26:[2,6],27:[2,6],55:[2,6],57:[2,6],60:[2,6],61:[2,6]},{9:124,22:[2,6],26:[2,6],27:[2,6],55:[2,6],57:[2,6],60:[2,6],61:[2,6]},{10:125,14:11,15:12,16:13,17:14,22:[1,19],26:[1,20]},{7:127,10:7,12:8,13:9,14:11,15:12,16:13,17:14,22:[1,19],26:[1,20],27:[1,18],52:15,53:16,54:17,55:[1,21],57:[1,126],60:[1,22],61:[1,23]},{9:128,22:[2,6],26:[2,6],27:[2,6],55:[2,6],57:[2,6],60:[2,6],61:[2,6]},{7:127,10:7,12:8,13:9,14:11,15:12,16:13,17:14,22:[1,19],26:[1,20],27:[1,18],52:15,53:16,54:17,55:[1,21],57:[1,129],60:[1,22],61:[1,23]},{7:127,10:7,12:8,13:9,14:11,15:12,16:13,17:14,22:[1,19],26:[1,20],27:[1,18],52:15,53:16,54:17,55:[1,21],57:[1,130],60:[1,22],61:[1,23]},{42:[1,131]},{6:[2,66]},{6:[1,132]},{7:127,10:7,12:8,13:9,14:11,15:12,16:13,17:14,22:[1,19],26:[1,20],27:[1,18],52:15,53:16,54:17,55:[1,21],57:[1,133],60:[1,22],61:[1,23]},{6:[2,61],58:134,59:[1,135]},{6:[2,64]},{56:[1,136]},{22:[2,7],26:[2,7],27:[2,7],55:[2,7],57:[2,7],60:[2,7],61:[2,7]},{6:[2,67]},{6:[2,60]},{52:137,55:[1,21],56:[1,138]},{6:[1,139]},{6:[2,62]},{6:[1,140]},{9:141,22:[2,6],26:[2,6],27:[2,6],55:[2,6],57:[2,6],60:[2,6],61:[2,6]},{9:142,22:[2,6],26:[2,6],27:[2,6],55:[2,6],57:[2,6],60:[2,6],61:[2,6]},{7:127,10:7,12:8,13:9,14:11,15:12,16:13,17:14,22:[1,19],26:[1,20],27:[1,18],52:15,53:16,54:17,55:[1,21],57:[1,143],60:[1,22],61:[1,23]},{7:127,10:7,12:8,13:9,14:11,15:12,16:13,17:14,22:[1,19],26:[1,20],27:[1,18],52:15,53:16,54:17,55:[1,21],57:[1,144],60:[1,22],61:[1,23]},{6:[2,65]},{6:[2,63]}],
defaultActions: {4:[2,1],8:[2,9],9:[2,10],15:[2,57],16:[2,58],17:[2,59],27:[2,8],35:[2,22],61:[2,2],71:[2,23],126:[2,66],130:[2,64],133:[2,67],134:[2,60],137:[2,62],143:[2,65],144:[2,63]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.2.0 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            if (this.options.backtrack_lexer) {
                delete backup;
            }
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        if (this.options.backtrack_lexer) {
            delete backup;
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip and comments */
break;
case 1:return "RESERVED";
break;
case 2:return "INVALID";
break;
case 3:return "TRUE";
break;
case 4:return "FALSE";
break;
case 5:return "IF";
break;
case 6:return "ELSE";
break;
case 7:return "WHILE";
break;
case 8:return "FOR";
break;
case 9:return "VAR";
break;
case 10:return "FUNCTION";
break;
case 11:return "RETURN";
break;
case 12:return "NAME";
break;
case 13:return "NEWLINE";
break;
case 14:return "NUMBER";
break;
case 15:return "STRING";
break;
case 16:return "EOF";
break;
case 17:return "+=";
break;
case 18:return "==";
break;
case 19:return "&&";
break;
case 20:return "||";
break;
case 21:return "=";
break;
case 22:return "+";
break;
case 23:return "*";
break;
case 24:return ";";
break;
case 25:return "!";
break;
case 26:return "(";
break;
case 27:return ")";
break;
case 28:return "{";
break;
case 29:return "}";
break;
case 30:return "[";
break;
case 31:return "]";
break;
case 32:return ".";
break;
case 33:return ",";
break;
case 34:return "INVALID";
break;
case 35:return '"';
break;
}
},
rules: [/^(?:(?:((?:[ \f\r\t\v\u00A0\u2028\u2029]+))|((?:(?:[/][/][^\n]*)|(?:[/][*](?:[^*\n]*[*][^/\n])*[^*\n]*[*][/])))))/,/^(?:((?:undefined|null|break|case|catch|default|finally|instanceof|new|continue|void|delete|this|do|in|switch|throw|try|typeof|with|abstract|boolean|byte|char|class|const|debugger|double|enum|export|extends|final|float|goto|implements|import|int|interface|long|native|package|private|protected|public|short|static|super|synchronized|throws|transient|volatile|arguments|NaN|Array|Object|RegExp|toString|(?:jsmm([0-9a-zA-Z_])*)))(?!([0-9a-zA-Z_])))/,/^(?:((?:'|~|>>=|<<=|>>|<<|===|!==|\?|:|\$|\\)))/,/^(?:true\b)/,/^(?:false\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:while\b)/,/^(?:for\b)/,/^(?:var\b)/,/^(?:function\b)/,/^(?:return\b)/,/^(?:([a-zA-Z_])([0-9a-zA-Z_])*)/,/^(?:((?:((?:((?:[ \f\r\t\v\u00A0\u2028\u2029]+))|((?:(?:[/][/][^\n]*)|(?:[/][*](?:[^*\n]*[*][^/\n])*[^*\n]*[*][/])))|((?:[/][*](?:[^*]*[*][^/])*[^*]*[*][/]))))*(?:[\n]((?:((?:[ \f\r\t\v\u00A0\u2028\u2029]+))|((?:(?:[/][/][^\n]*)|(?:[/][*](?:[^*\n]*[*][^/\n])*[^*\n]*[*][/])))|((?:[/][*](?:[^*]*[*][^/])*[^*]*[*][/]))))*)+)))/,/^(?:((?:(?:(?:[1-9]([0-9])*)|0)((?:\.([0-9])+))?((?:[eE][+-]?([0-9])+))?)))/,/^(?:((?:["][^\\"\n]*(?:[\\][nt"\\][^\\"\n]*)*["])))/,/^(?:$)/,/^(?:(\+=|-=|\*=|\/=|%=))/,/^(?:(==|!=|>=|<=|>|<))/,/^(?:&&)/,/^(?:\|\|)/,/^(?:=)/,/^(?:(\+|-))/,/^(?:(\*|\/|%))/,/^(?:;)/,/^(?:!)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:\.)/,/^(?:,)/,/^(?:((?:\||&)))/,/^(?:")/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = jsmmparser;
exports.Parser = jsmmparser.Parser;
exports.parse = function () { return jsmmparser.parse.apply(jsmmparser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
}).call(this,require('_process'))
},{"_process":47,"fs":45,"path":46}],33:[function(require,module,exports){
/*jshint node:true*/
"use strict";

var output = {};

require('./output.robot')(output);
require('./output.console')(output);
require('./output.canvas')(output);
require('./output.events')(output);
require('./output.math')(output);
require('./output.performance')(output);
require('./output.config')(output);

var window;
if (window) window.henk = output;

module.exports = output;

},{"./output.canvas":34,"./output.config":35,"./output.console":36,"./output.events":37,"./output.math":38,"./output.performance":39,"./output.robot":40}],34:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

var _ = require('underscore');

module.exports = function(output) {
	var functions = {
		clearRect: {type: 'function', argsMin: 4, argsMax: 4, example: 'clearRect(100, 100, 100, 100)', path: false, highlight: false, cost: 0.3},
		fillRect: {type: 'function', argsMin: 4, argsMax: 4, example: 'fillRect(100, 100, 100, 100)', path: false, highlight: true, cost: 0.3},
		strokeRect: {type: 'function', argsMin: 4, argsMax: 4, example: 'strokeRect(100, 100, 100, 100)', path: false, highlight: true, cost: 0.3},
		beginPath: {type: 'function', argsMin: 0, argsMax: 0, example: 'beginPath()', path: true, highlight: true, cost: 0.5},
		closePath: {type: 'function', argsMin: 0, argsMax: 0, example: 'closePath()', path: true, highlight: true, cost: 0.3},
		fill: {type: 'function', argsMin: 0, argsMax: 0, example: 'fill()', path: false, highlight: true, cost: 0.3},
		stroke: {type: 'function', argsMin: 0, argsMax: 0, example: 'stroke()', path: false, highlight: true},
		// clip: {type: 'function', argsMin: 0, argsMax: 0, example: 'clip()', path: true, highlight: true},
		moveTo: {type: 'function', argsMin: 2, argsMax: 2, example: 'moveTo(100, 100)', path: true, highlight: true},
		lineTo: {type: 'function', argsMin: 2, argsMax: 2, example: 'lineTo(200, 200)', path: true, highlight: true},
		quadraticCurveTo: {type: 'function', argsMin: 4, argsMax: 4, example: 'quadraticCurveTo(30, 80, 100, 100)', path: true, highlight: true},
		bezierCurveTo: {type: 'function', argsMin: 6, argsMax: 6, example: 'bezierCurveTo(30, 80, 60, 40, 100, 100)', path: true, highlight: true},
		arcTo: {type: 'function', argsMin: 5, argsMax: 5, example: 'arcTo(200, 200, 100, 300, 50)', path: true, highlight: true},
		arc: {type: 'function', argsMin: 5, argsMax: 6, example: 'arc(100, 100, 30, 0, Math.PI)', path: true, highlight: true, cost: 0.3},
		rect: {type: 'function', argsMin: 4, argsMax: 4, example: 'rect(100, 100, 100, 100)', path: true, highlight: true, cost: 0.3},
		// scale: {type: 'function', argsMin: 2, argsMax: 2, example: 'scale(2.0, 3.0)', path: false, highlight: true},
		// rotate: {type: 'function', argsMin: 1, argsMax: 1, example: 'rotate(0.40)', path: false, highlight: true},
		// translate: {type: 'function', argsMin: 2, argsMax: 2, example: 'translate(10, 30)', path: false, highlight: true},
		// transform: {type: 'function', argsMin: 6, argsMax: 6, example: 'transform(0.8, 0.3, 0.5, 1.0, 10, 30)', path: false, highlight: true},
		fillText: {type: 'function', argsMin: 3, argsMax: 4, example: 'fillText("Hello World!", 100, 100)', path: false, highlight: true, cost: 0.3},
		strokeText: {type: 'function', argsMin: 3, argsMax: 4, example: 'strokeText("Hello World!", 100, 100)', path: false, highlight: true, cost: 0.3},
		//isPointInPath: {type: 'function', argsMin: 2, argsMax: 2, example: 'isPointInPath(150, 150)', path: false, highlight: true, cost: 15},
		fillStyle: {type: 'variable', example: 'fillStyle = "#a00"', start: '#000000', validate: 'color'},
		strokeStyle: {type: 'variable', example: 'strokeStyle = "#a00"', start: '#000000', validate: 'color'},
		shadowOffsetX: {type: 'variable', example: 'shadowOffsetX = 10', start: 0, validate: 'number'},
		shadowOffsetY: {type: 'variable', example: 'shadowOffsetY = 10', start: 0, validate: 'number'},
		shadowBlur: {type: 'variable', example: 'shadowBlur = 5', start: 0, validate: 'positive'},
		shadowColor: {type: 'variable', example: 'shadowColor = "#3a3"', start: '#000000'},
		globalAlpha: {type: 'variable', example: 'globalAlpha = 0.5', start: 1, validate: 'alpha'},
		lineWidth: {type: 'variable', example: 'lineWidth = 3', start: 1, validate: 'positive'},
		lineCap: {type: 'variable', example: 'lineCap = "round"', start: 'butt', validate: ['butt', 'round', 'square']},
		lineJoin: {type: 'variable', example: 'lineJoin = "bevel"', start: 'miter', validate: ['miter', 'round', 'bevel']},
		miterLimit: {type: 'variable', example: 'miterLimit = 3', start: 10, validate: 'positive'},
		font: {type: 'variable', example: 'font = "40pt Calibri"', start: '10px sans-serif', validate: 'font'},
		textAlign: {type: 'variable', example: 'textAlign = "center"', start: 'start', validate: ['start', 'end', 'left', 'right', 'center']},
		textBaseline: {type: 'variable', example: 'textBaseline = "top"', start: 'alphabetic', validate: ['alphabetic', 'top', 'hanging', 'middle', 'ideographic', 'bottom']}
	};

	var getScopeObjects = function() {
		return {canvas: this.getAugmentedObject()};
	};

	var getAugmentedObject = function() {
		return {
			type: 'object',
			string: '[object canvas]',
			properties: {
				width: {
					name: 'width',
					info: 'canvas.width',
					type: 'variable',
					example: 'width',
					get: _(function() { return this.size; }).bind(this),
					set: function() { throw '<var>width</var> cannot be set'; },
					cost: 0.2
				},
				height: {
					name: 'height',
					info: 'canvas.height',
					type: 'variable',
					example: 'height',
					get: _(function() { return this.size; }).bind(this),
					set: function() { throw '<var>height</var> cannot be set'; },
					cost: 0.2
				},
				getContext: {
					name: 'getContext',
					info: 'canvas.getContext',
					type: 'function',
					example: 'getContext("2d")',
					string: '[function canvas.getContext]',
					func: _(function(node, name, args) {
						if (args.length !== 1) {
							throw '<var>getContext</var> takes exactly <var>1</var> argument';
						} else if (args[0] !== '2d') {
							throw 'Only the <var>2d</var> context is supported';
						}
						return this.getContextObject();
					}).bind(this),
					cost: 0.2
				}
			}
		};
	};

	var getContextObject = function() {
		var obj = {type: 'object', string: '[object context]', properties: {}};
		for (var name in functions) {
			var func = functions[name];
			if (func.type === 'function') {
				obj.properties[name] = {
					name: name,
					info: 'context.' + name,
					type: 'function',
					func: _(this.handleMethod).bind(this),
					example: func.example,
					string: '[function context.' + name + ']',
					cost: func.cost || 0.2
				};
			} else if (func.type === 'variable') {
				obj.properties[name] = {
					name: name,
					info: 'context.' + name,
					type: 'variable',
					get: _(this.handleAttributeGet).bind(this),
					set: _(this.handleAttributeSet).bind(this),
					example: func.example,
					cost: func.cost || 0.2
				};
			}
		}
		this.getContextObject = function() { return obj; };
		return obj;
	};

	var checkArguments = function(name, args) {
		var min = functions[name].argsMin, max = functions[name].argsMax;
		if (args.length < min) {
			throw '<var>' + name + '</var> requires at least <var>' + min + '</var> arguments';
		} else if (args.length > max) {
			throw '<var>' + name + '</var> accepts no more than <var>' + max + '</var> arguments';
		} else if ((name === 'arc' || name === 'arcTo') && args[2] < 0) {
			throw 'The angle given to <var>' + name + '</var> cannot be negative';
		}
	};

	/*
	fillStyle: {type: 'variable', example: 'fillStyle = "#a00"', start: '#000000'},
		strokeStyle: {type: 'variable', example: 'strokeStyle = "#a00"', start: '#000000'},
		shadowOffsetX: {type: 'variable', example: 'shadowOffsetX = 10', start: 0},
		shadowOffsetY: {type: 'variable', example: 'shadowOffsetY = 10', start: 0},
		shadowBlur: {type: 'variable', example: 'shadowBlur = 5', start: 0},
		shadowColor: {type: 'variable', example: 'shadowColor = "#3a3"', start: '#000000'},
		globalAlpha: {type: 'variable', example: 'globalAlpha = 0.5', start: 1},
		lineWidth: {type: 'variable', example: 'lineWidth = 3', start: 1},
		lineCap: {type: 'variable', example: 'lineCap = "round"', start: 'butt'},
		lineJoin: {type: 'variable', example: 'lineJoin = "bevel"', start: 'miter'},
		miterLimit: {type: 'variable', example: 'miterLimit = 3', start: 10},
		font: {type: 'variable', example: 'font = "40pt Calibri"', start: '10px sans-serif'},
		textAlign: {type: 'variable', example: 'textAlign = "center"', start: 'start'}, // no typo..
		textBaseline: {type: 'variable', example: 'textBaseline = "top"', start: 'alphabetic'}
		*/

	var sanitizeProperty = function(name, value) {
		var validate = functions[name].validate;
		if (typeof validate === 'object') {
			return validate.indexOf(value) >= 0;
		} else if (validate === 'number') {
			return isFinite(value);
		} else if (validate === 'positive') {
			return isFinite(value) && value > 0;
		} else if (validate === 'alpha') {
			return isFinite(value) && value >= 0 && value <= 1;
		} else if (validate === 'font') {
			// TODO: proper font handling
			return true;
		} else if (validate === 'color') {
			// TODO: proper colour handling
			return true;
		}
	};

	// some spread is needed between the numbers as borders are blurred, and colour information is thus not 100% reliable
	// therefore we use calculation modulo prime, so that eventually all numbers are used, and this also introduces a nice cycle,
	// so that colours can be used again; the assumption is that whenever there are so many elements on the screen, the ones
	// that introduced faulty colours, or the original ones in case of reusing colours, are most likely overwritten already
	var highlightMult = 67*65536 + 111*256 + 11;
	var highlightPrime = 16777213;

	output.SimpleCanvas = function() { return this.init.apply(this, arguments); };
	output.SimpleCanvas.prototype = {
		getScopeObjects: getScopeObjects,
		getAugmentedObject: getAugmentedObject,
		getContextObject: getContextObject,

		init: function(size) {
			this.calls = [];
			this.size = size;
			this.properties = {};

			for (var name in functions) {
				if (functions[name].type === 'variable') {
					this.handleAttributeSet(null, name, functions[name].start);
				}
			}
		},

		handleMethod: function(context, name, args) {
			checkArguments(name, args);
			this.calls.push({
				name: name,
				args: args,
				draws: functions[name].highlight
			});
		},

		handleAttributeGet: function(name) {
			return this.properties[name];
		},

		handleAttributeSet: function(context, name, value) {
			if (sanitizeProperty(name, value)) {
				this.properties[name] = value;
				this.calls.push({
					name: name,
					value: value,
					draws: false
				});
			}
		},

		getCalls: function() {
			return this.calls;
		}
	};

	output.CanvasWrapper = function() { return this.init.apply(this, arguments); };
	output.CanvasWrapper.prototype = {
		init: function(canvas, properties) {
			this.canvas = canvas;
			this.properties = properties;
			this.context = canvas.getContext('2d');
			this.context.save();
			this.reset();
		},
		reset: function() {
			this.state = null;
			this.context.restore();
			this.context.save();
			this.callPath('beginPath', []);
			for (var i=0; i<this.properties.length; i++) {
				this.context[this.properties[i]] = functions[this.properties[i]].start;
			}
		},
		callPath: function(name, args) {
			this.state = null;
			if (name === 'beginPath') {
				this.path = [];
			}
			this.path.push({name: name, args: args});
			return this.context[name].apply(this.context, args);
		},
		set: function(name, value) {
			this.state = null;
			this.context[name] = value;
		},
		getState: function() {
			if (this.state === null) {
				this.state = { path: this.path.slice() };
				for (var i=0; i<this.properties.length; i++) {
					this.state[this.properties[i]] = this.context[this.properties[i]];
				}
			}
			return this.state;
		},
		setState: function(state) {
			this.state = state;
			for (var i=0; i<this.properties.length; i++) {
				this.context[this.properties[i]] = this.state[this.properties[i]];
			}

			this.path = state.path.slice();
			for (i=0; i<this.path.length; i++) {
				this.context[this.path[i].name].apply(this.context, this.path[i].args);
			}
		}
	};


	output.Canvas = function() { return this.init.apply(this, arguments); };
	output.Canvas.prototype = {
		getScopeObjects: getScopeObjects,
		getAugmentedObject: getAugmentedObject,
		getContextObject: getContextObject,

		init: function(editor, options, $div) {
			this.$div = $div;
			this.$div.addClass('output canvas');

			this.size = options.size || 512;
			this.$container = $('<div class="canvas-container"></div>');
			this.$div.append(this.$container);
			this.$container.css('width', this.size);

			this.$canvas = $('<canvas class="canvas-canvas"></canvas>');
			this.$container.append(this.$canvas);

			this.$canvas.attr('width', this.size);
			this.$canvas.attr('height', this.size);
			this.context = this.$canvas[0].getContext('2d');

			this.$mirrorCanvas = $('<canvas class="canvas-mirror"></canvas>');
			this.$div.append(this.$mirrorCanvas);
			this.$mirrorCanvas.attr('width', this.size);
			this.$mirrorCanvas.attr('height', this.size);
			this.mirrorContext = this.$mirrorCanvas[0].getContext('2d');

			this.wrapper = new output.CanvasWrapper(this.$canvas[0], ['strokeStyle', 'fillStyle',
				'shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowColor', 'globalAlpha', 'lineWidth',
				'lineCap', 'lineJoin', 'miterLimit', 'font', 'textAlign', 'textBaseline']);

			this.mirrorWrapper = new output.CanvasWrapper(this.$mirrorCanvas[0], ['lineWidth', 'lineCap',
				'lineJoin', 'miterLimit', 'font', 'textAlign', 'textBaseline']);

			this.$targetCanvas = null;

			this.$originalCanvasBuffer = [];
			for (var i=0; i<30; i++) {
				this.$originalCanvasBuffer[i] = $('<canvas width="' + this.size + '" height="' + this.size + '"></canvas>');
			}

			this.highlighting = false;
			this.eventHighlighting = false;
			this.eventHighlightingInternal = false;
			this.highlightCallIndex = -1;
			this.editor = editor;
		},

		remove: function() {
			for (var i=0; i<30; i++) {
				this.$originalCanvasBuffer[i].remove();
			}
			this.$canvas.remove();
			this.$mirrorCanvas.remove();
			if (this.$targetCanvas !== null) {
				this.$targetCanvas.remove();
			}
			this.$container.remove();

			this.$div.removeClass('output canvas');
			this.$div.off('mousemove');
		},

		handleMethod: function(context, name, args) {
			checkArguments(name, args);
			if (functions[name].path) {
				return this.wrapper.callPath(name, args);
			} else {
				this.events[this.eventPosition].calls.push({
					name: name,
					args: args,
					state: this.wrapper.getState(),
					stepNum: context.getStepNum(),
					nodeId: context.getCallNodeId(),
					callId: context.getCallId()
				});
				return this.context[name].apply(this.context, args);
			}
		},

		handleAttributeGet: function(name) {
			return this.context[name];
		},

		handleAttributeSet: function(context, name, value) {
			if (sanitizeProperty(name, value)) {
				this.wrapper.set(name, value);
			}
		},

		outputStartEvent: function(context) {
			var position = (this.eventsPosStart+this.eventsPosLength)%this.eventsSize;
			var $originalCanvas = null;

			if ((position % 30) === 0) {
				$originalCanvas = this.$originalCanvasBuffer[Math.floor(position/30)];
				$originalCanvas[0].getContext('2d').clearRect(0, 0, this.size, this.size);
				$originalCanvas[0].getContext('2d').drawImage(this.$canvas[0], 0, 0);
				this.lastOriginalPosition = position;
			}

			var event = {
				state: this.wrapper.getState(),
				calls: [],
				originalPosition: this.lastOriginalPosition,
				$originalCanvas: $originalCanvas
			};

			this.eventPosition = position;
			this.events[position] = event;
			this.eventsPosLength++;
			this.stepNum = Infinity;
		},

		outputEndEvent: function() {
			var position = (this.eventsPosStart+this.eventsPosLength-1)%this.eventsSize;
			this.events[position].endState = this.wrapper.getState();
		},

		outputClearAllEvents: function() {
			this.wrapper.reset();
			this.context.clearRect(0, 0, this.size, this.size);

			this.events = [];
			this.eventsSize = 300;
			this.eventsPosStart = 0;
			this.eventsPosLength = 0;
			this.callIds = [];
			this.timeIds = null;
		},

		outputPopFirstEvent: function() {
			if (this.eventsPosLength > 0) {
				this.eventsPosStart++;
				this.eventsPosStart %= this.eventsSize;
				this.eventsPosLength--;
			}
		},

		outputClearEventsFrom: function(eventNum) {
			this.setCanvasState((this.eventsPosStart+eventNum)%this.eventsSize);
			this.eventsPosLength = eventNum;
		},

		outputClearEventsToEnd: function() {
			this.eventsPosStart += this.eventsPosLength;
			this.eventsPosStart %= this.eventsSize;
			this.eventsPosLength = 0;
		},

		outputSetError: function(error) {
			if (error) {
				this.$container.addClass('canvas-error');
			} else {
				this.$container.removeClass('canvas-error');
			}
		},

		outputSetEventStep: function(eventNum, stepNum) {
			// eventNum can be -1
			var position = (this.eventsPosStart+eventNum+this.eventsSize)%this.eventsSize;
			if (this.eventPosition !== position || this.stepNum !== stepNum) {
				this.eventPosition = position;
				this.stepNum = stepNum;
				this.render();
			}
		},

		highlightTimeIds: function(timeIds) {
			// if (!_.isEqual(this.timeIds, timeIds)) {
			if (this.timeIds !== timeIds) {
				this.timeIds = timeIds;
				this.rerenderHighlights = true;
				// this.render(); not needed since enableHighlighting always called afterwards
			}
		},

		highlightCallIds: function(callIds) {
			if (!_.isEqual(this.callIds, callIds)) {
				this.callIds = callIds;
				this.rerenderHighlights = true;
				// this.render(); not needed since enableHighlighting always called afterwards
			}
		},

		render: function() {
			this.setCanvasState(this.eventPosition);

			var highlightCurrentEvent = this.highlighting && (this.eventHighlighting || this.eventHighlightingInternal);

			var stepCall = null;
			for (var i=0; i<this.events[this.eventPosition].calls.length; i++) {
				var call = this.events[this.eventPosition].calls[i];
				if (call.stepNum > this.stepNum) break;
				this.wrapper.setState(call.state);

				if (functions[call.name].highlight) {
					if (call.stepNum === this.stepNum) {
						stepCall = call;
					} else if (highlightCurrentEvent) {
						this.context[call.name].apply(this.context, call.args);
						this.context.strokeStyle = this.context.fillStyle = this.context.shadowColor = 'rgba(0, 110, 220, 0.50)'; // blue
					}
				}

				this.context[call.name].apply(this.context, call.args);
			}

			if (this.timeIds !== null) {
				for (var i=0; i<this.eventsPosLength; i++) {
					if (this.timeIds[i].length > 0) {
						var event = this.events[(this.eventsPosStart+i)%this.eventsSize];
						for (var j=0; j<event.calls.length; j++) {
							var call = event.calls[j];

							if (this.timeIds[i].indexOf(call.callId) >= 0 && functions[call.name].highlight) {
								this.wrapper.setState(call.state);
								this.context.strokeStyle = this.context.fillStyle = this.context.shadowColor = 'rgba(0, 110, 220, 0.30)'; // blue
								this.context[call.name].apply(this.context, call.args);
							}
						}
					}
				}
			}

			if (stepCall !== null) {
				this.wrapper.setState(stepCall.state);
				this.context.strokeStyle = this.context.fillStyle = this.context.shadowColor = 'rgba(5, 195, 5, 0.85)'; // green
				this.context[stepCall.name].apply(this.context, stepCall.args);
			}

			if (this.highlightCallIndex >= 0) {
				var highlightCall = this.events[this.eventPosition].calls[this.highlightCallIndex];
				this.wrapper.setState(highlightCall.state);
				this.context.strokeStyle = this.context.fillStyle = this.context.shadowColor = 'rgba(5, 195, 5, 0.85)'; // green
				this.context[highlightCall.name].apply(this.context, highlightCall.args);
			}

			if (this.callIds !== null && this.callIds.length > 0) {
				for (var i=0; i<this.events[this.eventPosition].calls.length; i++) {
					var call = this.events[this.eventPosition].calls[i];
					if (call.stepNum > this.stepNum) break;

					if (functions[call.name].highlight && this.callIds.indexOf(call.callId) >= 0) {
						this.wrapper.setState(call.state);
						this.context.strokeStyle = this.context.fillStyle = this.context.shadowColor = 'rgba(5, 195, 5, 0.85)'; // green
						this.context[call.name].apply(this.context, call.args);
					}
				}
			}

			this.mirrorShouldBeUpdated = true;

			this.wrapper.setState(this.events[this.eventPosition].endState);
		},

		drawMirror: function() {
			this.clearMirror();
			for (var i=0; i<this.events[this.eventPosition].calls.length; i++) {
				var call = this.events[this.eventPosition].calls[i];
				if (call.stepNum > this.stepNum) break;

				this.mirrorWrapper.setState(call.state);

				var highlightId = (highlightMult*(i+1))%highlightPrime;
				var color = 'rgba(' + (~~(highlightId/65536)%256) + ',' + (~~(highlightId/256)%256) + ',' + (highlightId%256) + ', 1)';
				this.mirrorContext.strokeStyle = color;
				this.mirrorContext.fillStyle = color;
				this.mirrorContext.shadowColor = color;
				this.mirrorContext.lineWidth = Math.max(3, this.context.lineWidth);
				this.mirrorContext[call.name].apply(this.mirrorContext, call.args);
			}
			this.mirrorShouldBeUpdated = false;
		},

		clearMirror: function() {
			this.mirrorWrapper.reset();
			this.mirrorContext.clearRect(0, 0, this.size, this.size);
			this.mirrorWrapper.setState(this.events[this.eventPosition].state);
		},

		enableHighlighting: function() {
			if (!this.highlighting || this.highlightCallIndex !== -1 || this.rerenderHighlights) {
				this.rerenderHighlights = false;

				this.highlighting = true;
				this.highlightCallIndex = -1;
				this.$div.addClass('canvas-highlighting');
				this.$div.off('mousemove mouseleave');
				this.$div.on('mousemove', _(this.mouseMove).bind(this));
				this.$div.on('mouseleave', _(this.mouseLeave).bind(this));
				this.eventHighlightingInternal = false;
				if (this.eventsPosLength > 0) {
					this.render();
				}
			}
		},

		disableHighlighting: function() {
			this.rerenderHighlights = false;

			this.highlighting = false;
			this.highlightCallIndex = -1;
			this.$div.removeClass('canvas-highlighting');
			this.$div.off('mousemove mouseleave');
			this.callIds = [];
			this.eventHighlightingInternal = false;
			if (this.eventsPosLength > 0) {
				this.render();
				this.clearMirror();
			}
		},

		enableEventHighlighting: function() {
			this.eventHighlighting = true;
			if (this.eventsPosLength > 0) {
				this.render();
			}
		},

		disableEventHighlighting: function() {
			this.eventHighlighting = false;
			if (this.eventsPosLength > 0) {
				this.render();
			}
		},

		getImageData: function() {
			return this.context.getImageData(0, 0, this.size, this.size);
		},

		makeTargetCanvas: function() {
			this.$targetCanvas = $('<canvas class="canvas-target"></canvas>');
			this.$container.append(this.$targetCanvas);
			this.$targetCanvas.attr('width', this.size);
			this.$targetCanvas.attr('height', this.size);
			return this.$targetCanvas[0].getContext('2d');
		},

		getSize: function() {
			return this.size;
		},

		getMouseElement: function() {
			return this.$canvas;
		},

		/// INTERNAL FUNCTIONS ///
		setCanvasState: function(position) {
			position = position%this.eventsSize;

			this.wrapper.reset();
			this.context.clearRect(0, 0, this.size, this.size);

			var start = this.events[position].originalPosition;
			this.context.drawImage(this.events[start].$originalCanvas[0], 0, 0);
			this.wrapper.setState(this.events[start].state);

			for (var i=start; i !== position; i=(i+1)%this.eventsSize) {
				for (var j=0; j<this.events[i].calls.length; j++) {
					var call = this.events[i].calls[j];
					this.wrapper.setState(call.state);
					this.context[call.name].apply(this.context, call.args);
				}
			}
			this.lastOriginalPosition = start;
		},

		mouseMove: function(event) {
			if (this.highlighting) {
				if (this.mirrorShouldBeUpdated) {
					this.drawMirror();
				}

				var offset = this.$canvas.offset();
				var x = event.pageX - offset.left, y = event.pageY - offset.top;
				var pixel = this.mirrorContext.getImageData(x, y, 1, 1).data;

				// use the alpha channel as an extra safeguard
				var highlightId = (pixel[3] < 255 ? 0 : (pixel[0]*65536 + pixel[1]*256 + pixel[2]) % 16777213);

				var highlightCallIndex = -1;
				for (var i=0; i<this.events[this.eventPosition].calls.length; i++) {
					var highlightIdMatch = (highlightMult*(i+1))%highlightPrime;
					if (highlightId === highlightIdMatch) {
						highlightCallIndex = i;
						break;
					}
				}

				if (this.highlightCallIndex !== highlightCallIndex) {
					this.highlightCallIndex = highlightCallIndex;

					if (this.highlightCallIndex < 0) {
						this.editor.highlightNode(null);
					} else {
						this.editor.highlightNodeId(this.events[this.eventPosition].calls[this.highlightCallIndex].nodeId);
					}

					this.eventHighlightingInternal = true;
					this.render();
				} else if (!this.eventHighlightingInternal) {
					this.eventHighlightingInternal = true;
					this.render();
				}
			}
		},

		mouseLeave: function() {
			if (this.highlighting && this.eventHighlightingInternal) {
				this.eventHighlightingInternal = false;
				this.render();
			}
		}
	};
};
},{"underscore":48}],35:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

var traverse = function(object, callback) {
	var traverseWithPath = function(pathArray, object, callback) {
		for (var name in object) {
			var newPathArray = pathArray.concat(name);
			var value = object[name];

			callback(newPathArray, value);

			if (typeof value === 'object' && value) {
				traverseWithPath(newPathArray, value, callback);
			}
		}
	};

	traverseWithPath([], object, callback);
};

var leafs = function(object, isLeafCallback) {
	var leafs = [];
	traverse(object, function(pathArray, value) {
		if (isLeafCallback(value)) {
			leafs.push({pathArray: pathArray, value: value});
		}
	});
	return leafs;
};

var jsmm = require('../jsmm');

module.exports = function(output) {
	output.Config = function() { return this.init.apply(this, arguments); };
	output.Config.prototype = {
		init: function(definition) {
			this.definition = definition;
			this.augmentedObjects = {};
			this.clear();
		},

		clear: function() {
			this.config = {};
		},

		getConfig: function() {
			var cloneWithDefinition = function(from, definition) {
				from = from || {};
				var to = {};
				for (var name in definition) {
					if (definition[name].def !== undefined) {
						to[name] = from[name] !== undefined ? from[name].value : definition[name].def;
					} else {
						to[name] = cloneWithDefinition(from[name], definition[name]);
					}
				}
				return to;
			};

			return cloneWithDefinition(this.config, this.definition);
		},

		validateItem: function(name, item, validation) {
			if (validation.type === 'boolean') {
				if (item !== true && item !== false) {
					throw '<var>' + name + '</var> must be <var>true</var> or <var>false</var>';
				}
			} else if (validation.type === 'number' || validation.type === 'integer') {
				if (typeof item !== 'number') {
					throw '<var>' + name + '</var> must be a number';
				} else if (item < validation.min || item > validation.max) {
					throw '<var>' + name + '</var> must be between <var>' + validation.min + '</var> and <var>' + validation.max + '</var>';
				} else if (validation.type === 'integer' && item % 1 !== 0) {
					throw '<var>' + name + '</var> must be an integer';
				}
			} else if (validation.type === 'text') {
				if (typeof item !== 'string') {
					throw '<var>' + name + '</var> must be a string';
				} else if (Object.prototype.toString.call(validation.valid) === '[object Array]' && validation.valid.indexOf(item) < 0) {
					throw '<var>' + name + '</var> must be one of those: <var>' + validation.valid.join(', ') + '</var>';
				}
			}
		},

		walkOptionPath: function(start, optionPath) {
			var config = start;
			for (var i=0; i<optionPath.length; i++) {
				var optionName = optionPath[i];
				config[optionName] = config[optionName] || {};
				config = config[optionName];
			}
			return config;
		},

		findConfig: function(optionPath) {
			return this.walkOptionPath(this.config, optionPath);
		},

		getOption: function(optionPath) {
			var config = this.findConfig(optionPath);
			return config.value;
		},

		setOption: function(optionPath, value, validation) {
			var name = optionPath[optionPath.length-1];
			this.validateItem(name, value, validation);
			var config = this.findConfig(optionPath);
			config.value = value;
		},

		getAugmentedObjectFor: function(objectName, object, optionPath) {
			var that = this;
			var makeGet = function(propName) {
				return (function(name) { that.getOption(optionPath.concat(propName)); });
			};
			var makeSet = function(propName, member) {
				return (function(context, name, value) { that.setOption(optionPath.concat(propName), value, member); });
			};

			var objectPath = optionPath.concat(objectName).join('.');

			if (!this.augmentedObjects[objectPath]) {
				var augmented = {
					type: 'object',
					string: '[object ' + objectName + ']',
					properties: {}
				};

				for (var propName in object) {
					var member = object[propName];
					if (member.def !== undefined) {
						var def = (member.type === 'text' ? '"' + member.def + '"' : member.def);

						if (member.type !== 'nosanitize') {
							augmented.properties[propName] = {
								name: propName,
								info: '',
								type: 'variable',
								example: propName + ' = ' + def,
								get: makeGet(propName),
								set: makeSet(propName, member)
							};
						}
					} else {
						augmented.properties[propName] = this.getAugmentedObjectFor(propName, member, optionPath.concat(propName));
					}
				}

				this.augmentedObjects[objectPath] = augmented;
			}
			return this.augmentedObjects[objectPath];
		},

		getScopeObjects: function() {
			return {config: this.getAugmentedObjectFor('config', this.definition, [])};
		},

		definitionLeafs: function() {
			return leafs(this.definition, function(value) { return value && value.def !== undefined; } );
		}
	};

	output.ConfigOutput = function() { return this.init.apply(this, arguments); };
	output.ConfigOutput.prototype = {
		init: function(editor, options, $div) {
			this.definition = options.definition;
			this.config = new output.Config(this.definition);

			this.$div = $div;
			this.$div.addClass('output config');

			this.renderOptionElements();

			this.augmentedObjects = {};
		},

		remove: function() {
			this.$div.removeClass('output config');
			this.$div.html('');
		},

		renderOptionElements: function() {
			var options = this.config.definitionLeafs();
			this.$optionValues = [];
			this.$optionGroups = [];
			for (var i=0; i<options.length; i++) {
				var pathArray = options[i].pathArray;
				var $option = this.renderOptionElement(pathArray, options[i].value);
				this.optionGroup('config.' + pathArray.slice(0, -1).join('.')).append($option);
			}
		},

		renderOptionElement: function(pathArray, option) {
			var $option = $('<div class="config-option">' + pathArray[pathArray.length-1] + ' = </div>');
			var $value = $('<span class="config-option-value"></span>');
			this.$optionValues[pathArray.toString()] = $value;
			$option.append($value);
			return $option;
		},

		optionGroup: function(name) {
			if (!this.$optionGroups[name]) {
				var $optionGroup = $('<div class="config-option-group"></div>');
				$optionGroup.append('<div class="config-option-group-name">' + name + '</div>' );
				this.$div.append($optionGroup);
				this.$optionGroups[name] = $optionGroup;
			}
			return this.$optionGroups[name];
		},

		renderConfig: function() {
			var options = this.config.definitionLeafs();
			for (var i=0; i<options.length; i++) {
				var pathArray = options[i].pathArray;
				var config = this.config.findConfig(pathArray);
				var value = this.makeOptionValue(config.value, options[i].value);

				this.$optionValues[pathArray.toString()].text(value);
			}
		},

		makeOptionValue: function(value, definition) {
			if (value === undefined) {
				value = definition.def;
			}

			if (definition.type === 'text') {
				return '"' + value + '"';
			} else {
				return value;
			}
		},

		getScopeObjects: function() {
			return this.config.getScopeObjects();
		},

		outputClearAllEvents: function() {
			this.config.clear();
		},

		outputSetEventStep: function() {
			this.renderConfig();
		}
	};
};
},{"../jsmm":19}],36:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

module.exports = function(output) {
	var getScopeObjects = function() {
		return {console: this.getAugmentedObject()};
	};

	var getAugmentedObject = function() {
		return {
			type: 'object',
			string: '[object console]',
			properties: {
				log: {
					name: 'log',
					info: 'console.log',
					type: 'function',
					example: 'log("Hello world!")',
					string: '[function console.log]',
					func: _(this.log).bind(this),
					cost: 3
				},
				clear: {
					name: 'clear',
					info: 'console.clear',
					type: 'function',
					example: 'clear()',
					string: '[function console.clear]',
					func: _(this.clear).bind(this),
					cost: 4
				},
				setColor: {
					name: 'setColor',
					info: 'console.setColor',
					type: 'function',
					example: 'setColor("#a00")',
					string: '[function console.setColor]',
					func: _(this.setColor).bind(this),
					cost: 0.2
				}
			}
		};
	};

	var makeLog = function(value) {
		if (typeof value === 'object') return value.string + '\n';
		else if (value === undefined) return '\n';
		else return '' + value + '\n';
	};

	output.SimpleConsole = function() { return this.init.apply(this, arguments); };
	output.SimpleConsole.prototype = {
		getScopeObjects: getScopeObjects,
		getAugmentedObject: getAugmentedObject,

		init: function() {
			this.calls = [];
			this.color = '';
			this.text = '';
		},

		log: function(context, name, args) {
			var text = makeLog(args[0]);
			this.calls.push({text: text, color: this.color});
			this.text += text;
		},

		clear: function() {
			this.calls.push({clear: true});
			this.text = '';
		},

		setColor: function(context, name, args) {
			this.color = args[0];
		},

		getText: function() {
			return this.text;
		},

		getCalls: function() {
			return this.calls;
		}
	};

	output.Console = function() { return this.init.apply(this, arguments); };
	output.Console.prototype = {
		getScopeObjects: getScopeObjects,
		getAugmentedObject: getAugmentedObject,

		init: function(editor, options, $div) {
			this.$div = $div;
			this.$div.addClass('output console');
			this.$div.on('scroll', _(this.refreshAutoScroll).bind(this));

			this.$container = $('<div class="console-container"></div>');
			this.$div.append(this.$container);

			this.$targetConsole = $('<div class="console-target"></div>');
			this.$container.append(this.$targetConsole);

			this.$content = $('<div class="console-content"></div>');
			this.$container.append(this.$content);

			this.$old = $('<div class="console-old"></div>');
			this.$content.append(this.$old);

			this.$lines = $('<div class="console-lines"></div>');
			this.$content.append(this.$lines);

			//this.debugToBrowser = true;
			this.highlighting = false;
			this.autoScroll = true;
			this.editor = editor;

			this.refreshAutoScroll();
		},

		remove: function() {
			this.$lines.children().remove();
			this.$container.remove();
			this.$div.removeClass('output console');
			this.$div.off('scroll mousemove mouseleave');
		},

		log: function(context, name, args) {
			var text = makeLog(args[0]);
			this.text += text;

			var $element = $('<div class="console-line"></div>');
			$element.text(text);
			$element.css('color', this.color);
			$element.data('index', this.currentEvent.calls.length);
			$element.data('event', this.currentEvent);
			$element.addClass('console-line-visible');
			this.$lines.append($element);
			this.mirror += $element[0].outerHTML;
			
			this.currentEvent.calls.push({
				$element: $element,
				stepNum: context.getStepNum(),
				nodeId: context.getCallNodeId(),
				callId: context.getCallId()
			});
			
			if (this.currentEvent.$firstElement === null) {
				this.currentEvent.$firstElement = $element;
			}

			if (this.debugToBrowser && console && console.log) console.log(args[0]);
		},

		clear: function(context) {
			this.text = '';
			this.color = '';
			this.mirror = '';
			this.$old.hide();
			this.$lines.children('.console-line-visible').removeClass('console-line-visible');

			this.currentEvent.calls.push({
				clear: true,
				stepNum: context.getStepNum()
			});
			
			if (this.debugToBrowser && console && console.clear) console.clear();
		},

		setColor: function(context, name, args) {
			var color = args[0];
			this.color = color;
		},

		outputStartEvent: function(context) {
			this.currentEvent = {
				text: this.text,
				color: this.color,
				oldHtml: this.mirror,
				$firstElement: null,
				calls: []
			};
			this.events.push(this.currentEvent);
			this.stepNum = Infinity;
		},

		outputEndEvent: function() {
			this.updateEventHighlight();
		},

		stashOldLines: function() {
			if (!this.oldLinesStashed) {
				this.oldLinesStashed = true;
				this.$old.html(this.events[0].oldHtml);
				if (this.events[0].$firstElement !== null) {
					this.events[0].$firstElement.prevAll().remove();
				} else {
					this.$lines.children().remove();
				}
			}
		},

		outputClearAllEvents: function() {
			this.text = '';
			this.color = '';
			this.mirror = '';
			this.$old.html('');
			this.$old.show();
			this.oldLinesStashed = true;
			this.$lines.children().remove(); // prevent $.data leaks
			this.events = [];
		},

		outputPopFirstEvent: function() {
			this.events.shift();
			this.oldLinesStashed = false;
		},

		outputClearEventsFrom: function(eventNum) {
			this.stashOldLines();

			this.text = this.events[eventNum].text;
			this.color = this.events[eventNum].color;
			this.mirror = this.events[eventNum].oldHtml;
			for (var i=eventNum; i<this.events.length; i++) {
				if (this.events[i].$firstElement !== null) {
					this.events[i].$firstElement.nextAll().remove();
					this.events[i].$firstElement.remove();
					break;
				}
			}
			this.events = this.events.slice(0, eventNum);
		},

		outputClearEventsToEnd: function() {
			this.$old.html(this.mirror);
			this.$old.show();
			this.oldLinesStashed = true;
			this.$lines.children().remove(); // prevent $.data leaks
			this.events = [];
		},

		outputSetError: function(error) {
			if (error) {
				this.$content.addClass('console-error');
			} else {
				this.$content.removeClass('console-error');
			}
		},

		outputSetEventStep: function(eventNum, stepNum) {
			if (eventNum >= 0 && (this.currentEvent !== this.events[eventNum] || this.stepNum !== stepNum)) {
				this.stashOldLines();
				this.currentEvent = this.events[eventNum];
				this.stepNum = stepNum;

				this.$old.show();
				this.$lines.children('.console-line-visible').removeClass('console-line-visible');
				this.$lines.children('.console-line-highlight-step').removeClass('console-line-highlight-step');
				for (var i=0; i<this.events.length; i++) {
					if (i > eventNum) break;
					for (var j=0; j<this.events[i].calls.length; j++) {
						var call = this.events[i].calls[j];
						if (i === eventNum) {
							if (call.stepNum === this.stepNum) call.$element.addClass('console-line-highlight-step');
							else if (call.stepNum > this.stepNum) break;
						}

						if (call.clear) {
							this.$old.hide();
							this.$lines.children('.console-line-visible').removeClass('console-line-visible');
						} else {
							call.$element.addClass('console-line-visible');
						}
					}
				}

				this.updateEventHighlight();

				if (this.autoScroll) {
					this.scrollToY(this.$content.height());
				}
			}
		},

		highlightCallIds: function(callIds) {
			this.$lines.children('.console-line-highlight-line').removeClass('console-line-highlight-line');

			if (callIds !== null) {
				for (var i=0; i<this.currentEvent.calls.length; i++) {
					var call = this.currentEvent.calls[i];
					if (callIds.indexOf(call.callId) >= 0 && !call.clear) {
						call.$element.addClass('console-line-highlight-line');
					}
				}

				var $last = this.$lines.children('.console-line-highlight-line').last();
				if ($last.length > 0) {
					// the offset is weird since .position().top changes when scrolling
					this.scrollToY($last.position().top, true);
				}
			}
		},

		highlightTimeIds: function(timeIds) {
			this.$lines.children('.console-line-highlight-time').removeClass('console-line-highlight-time');
			if (timeIds !== null) {
				for (var i=0; i<this.events.length; i++) {
					for (var j=0; j<this.events[i].calls.length; j++) {
						var call = this.events[i].calls[j];

						if (timeIds[i].indexOf(call.callId) >= 0 && !call.clear) {
							call.$element.addClass('console-line-highlight-time');
						}
					}
				}
			}
		},

		enableHighlighting: function() {
			this.highlighting = true;
			this.$div.addClass('console-highlighting');
			this.$div.off('mousemove mouseleave');
			this.$div.on('mousemove', _(this.mouseMove).bind(this));
			this.$div.on('mouseleave', _(this.mouseLeave).bind(this));
			this.autoScroll = false;
			this.$div.removeClass('console-autoscroll');
			this.updateEventHighlight();
		},

		disableHighlighting: function() {
			this.highlighting = false;
			this.$lines.children('.console-line-highlight-line').removeClass('console-line-highlight-line');
			this.updateEventHighlight();
			this.$div.removeClass('console-highlighting');
			this.$div.off('mousemove mouseleave');
			this.refreshAutoScroll();
		},

		enableEventHighlighting: function() {
			this.$div.addClass('console-highlighting-current-event');
			this.updateEventHighlight();
		},

		disableEventHighlighting: function() {
			this.$div.removeClass('console-highlighting-current-event');
		},

		updateEventHighlight: function() {
			this.$lines.children('.console-line-highlight-event').removeClass('console-line-highlight-event');
			if (this.highlighting) {
				for (var i=0; i<this.currentEvent.calls.length; i++) {
					if (!this.currentEvent.calls[i].clear) {
						this.currentEvent.calls[i].$element.addClass('console-line-highlight-event');
					}
				}
			}
		},

		getText: function() {
			return this.text;
		},

		makeTargetConsole: function(content) {
			var lines = content.split('\n');
			while (lines.length > 0 && lines[lines.length-1] === '') {
				lines.pop();
			}
			for (var i=0; i<lines.length; i++) {
				var $element = $('<div class="console-line"></div>');
				$element.text(lines[i]);
				this.$targetConsole.append($element);
			}
		},

		setFocus: function() {
			this.$content.css('min-height', this.$targetConsole.height());
			this.refreshAutoScroll();
		},

		getMouseElement: function() {
			return this.$container;
		},

		/// INTERNAL FUNCTIONS ///
		scrollToY: function(y, smooth) {
			smooth = smooth || false;
			y = Math.max(0, y - this.$div.height()/2);
			this.$div.stop(true);
			if (smooth) {
				this.$div.animate({scrollTop : y}, 150);
			} else {
				this.$div.scrollTop(y);
			}
		},

		mouseMove: function(event) {
			if (this.highlighting) {
				var $target = $(event.target);
				if ($target.data('event') === this.currentEvent && this.currentEvent.calls[$target.data('index')] !== undefined) {
					if (!$target.hasClass('console-line-highlight-line')) {
						this.$lines.children('.console-line-highlight-line').removeClass('console-line-highlight-line');
						$target.addClass('console-line-highlight-line');
						this.editor.highlightNodeId(this.currentEvent.calls[$target.data('index')].nodeId);
					}
				} else {
					this.$lines.children('.console-line-highlight-line').removeClass('console-line-highlight-line');
					this.editor.highlightNodeId(0);
				}
			}
		},

		mouseLeave: function(event) {
			if (this.highlighting) {
				this.$lines.children('.console-line-highlight-line').removeClass('console-line-highlight-line');
				this.editor.highlightNodeId(0);
			}
		},

		refreshAutoScroll: function() {
			if (!this.highlighting) {
				if (this.$div.scrollTop() >= this.$content.outerHeight(true)-this.$div.height()-4 || this.$div.height() <= 0) {
					this.$div.addClass('console-autoscroll');
					this.autoScroll = true;
				} else {
					this.$div.removeClass('console-autoscroll');
					this.autoScroll = false;
				}
			}
		}
	};
};

},{}],37:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

module.exports = function(output) {
	output.Events = function() { return this.init.apply(this, arguments); };
	output.Events.prototype = {
		init: function(editor, options) {
			this.editor = editor;

			this.keyDown = _(this.keyDown).bind(this);
			this.keyUp = _(this.keyUp).bind(this);
			$(document).on('keydown', this.keyDown);
			$(document).on('keyup', this.keyUp);
			this.doInterval = _(this.doInterval).bind(this);

			this.onmousemove = [];
			this.onmousedown = [];
			this.onmouseup = [];
			this.intervalId = null;
			this.start = true;
			this.outputClearAllEvents();
		},

		remove: function() {
			this.clearInterval();
			this.clearMouse();
			$(document).off('keydown', this.keyDown);
			$(document).off('keyup', this.keyUp);
		},

		addMouseEvents: function($element, name, obj) {
			var current = this.onmousemove.length;
			this.onmousemove.push({name: name, $element: $element, func: null, handle: null, timer: null});
			this.onmousedown.push({name: name, $element: $element, func: null, handle: null});
			this.onmouseup.push({name: name, $element: $element, func: null, handle: null});

			obj.properties.onmousemove = this.getMouseObject(current, name, 'mousemove', 'mouseMove');
			obj.properties.onmousedown = this.getMouseObject(current, name, 'mousedown', 'mouseDown');
			obj.properties.onmouseup = this.getMouseObject(current, name, 'mouseup', 'mouseUp');
		},

		getMouseObject: function(current, name, type, niceType) {
			var fullType = 'on' + type;
			return {
				name: fullType,
				info: 'events.' + name + '.' + fullType,
				type: 'variable',
				example: fullType + ' = ' + niceType,
				get: _(function(name) {
							return this[fullType][current].func;
					}).bind(this),
				set: _(function(context, name, value) {
						this.checkStart();
						if (value.type !== 'functionPointer') {
							throw 'You can only set <var>' + name + '</var> to a function declared by you';
						}
						var info = this[fullType][current];
						info.func = value;
						if (info.handle === null) {
							info.handle = _(function(event) {
								this[niceType](current, event);
							}).bind(this);
							this[fullType][current].$element.on(type, info.handle);
						}
						this.editor.makeInteractive(this.makeSignature());
					}).bind(this)
			};
		},

		getScopeObjects: function() {
			return {document: this.getAugmentedDocumentObject(), window: this.getAugmentedWindowObject()};
		},

		getAugmentedDocumentObject: function() {
			return {
				type: 'object',
				string: '[object document]',
				properties: {
					onkeydown: {
						name: 'onkeydown',
						info: 'events.document.onkeydown',
						type: 'variable',
						example: 'onkeydown = keyDown',
						get: _(this.handleKeyboardGet).bind(this),
						set: _(this.handleKeyboardSet).bind(this)
					},
					onkeyup: {
						name: 'onkeyup',
						info: 'events.document.onkeyup',
						type: 'variable',
						example: 'onkeyup = keyUp',
						get: _(this.handleKeyboardGet).bind(this),
						set: _(this.handleKeyboardSet).bind(this)
					}
				}
			};
		},

		getAugmentedWindowObject: function() {
			return {
				type: 'object',
				string: '[object window]',
				properties: {
					setInterval: {
						name: 'setInterval',
						info: 'events.window.setInterval',
						type: 'function',
						example: 'setInterval(func, 30)',
						string: '[function window.setInterval]',
						func: _(this.handleTimeCall).bind(this)
					}
				}
			};
		},

		handleKeyboardGet: function(name) {
			return this[name];
		},

		handleKeyboardSet: function(context, name, value) {
			this.checkStart();

			if (value.type !== 'functionPointer') {
				throw 'You can only set <var>' + name + '</var> to a function declared by you';
			}
			this[name] = value;
			this.editor.makeInteractive(this.makeSignature());
		},

		handleTimeCall: function(context, name, args) {
			this.checkStart();

			if (args.length !== 2) {
				throw '<var>setInterval</var> takes exactly <var>2</var> arguments';
			} else if (args[0].type !== 'functionPointer') {
				throw 'First argument to <var>setInterval</var> must be the name of a function declared by you';
			} else if (typeof args[1] !== 'number' || args[1] < 25) {
				throw 'Second argument to <var>setInterval</var> must be a number specifying the time in milliseconds, and cannot be smaller than 25';
			}

			this.clearInterval();
			this.interval = args[0];
			this.intervalId = setInterval(this.doInterval, args[1]);
			this.editor.makeInteractive(this.makeSignature());
		},

		keyDown: function(event) {
			// 17 == CTRL, 18 == ALT, (17, 91, 93, 224) == COMMAND, 27 == ESC
			// block these as they are only keyboard shortcuts
			if ([17, 18, 91, 93, 224, 27].indexOf(event.keyCode) >= 0) {
				return;
			}
			if (this.onkeydown !== null) {
				event.preventDefault();
				this.editor.addEvent('keyboard', this.onkeydown.name, [{
					type: 'object',
					string: '[object event]',
					properties: {keyCode: event.keyCode}
				}]);
			}
		},

		keyUp: function(event) {
			// 17 == CTRL, 18 == ALT, (17, 91, 93, 224) == COMMAND, 27 == ESC
			// block these as they are only keyboard shortcuts
			if ([17, 18, 91, 93, 224, 27].indexOf(event.keyCode) >= 0) {
				return;
			}
			if (this.onkeyup !== null) {
				event.preventDefault();
				this.editor.addEvent('keyboard', this.onkeyup.name, [{
					type: 'object',
					string: '[object event]',
					properties: {keyCode: event.keyCode}
				}]);
			}
		},

		doInterval: function() {
			this.editor.addEvent('interval', this.interval.name, []);
		},

		clearInterval: function() {
			if (this.intervalId !== null) {
				clearInterval(this.intervalId);
			}
		},

		mouseMove: function(num, event) {
			event.preventDefault();
			var onmousemove = this.onmousemove[num];
			if (this.onmousemove[num].timer !== null) {
				onmousemove.lastEvent = event;
			} else {
				this.fireMouseEvent(this.onmousemove[num], event);
				onmousemove.lastEvent = null;
				onmousemove.timer = setTimeout(_(function() {
					onmousemove.timer = null;
					if (onmousemove.lastEvent !== null) {
						this.mouseMove(num, onmousemove.lastEvent);
					}
				}).bind(this), 24);
			}
		},

		mouseDown: function(num, event) {
			event.preventDefault();
			this.fireMouseEvent(this.onmousedown[num], event);
		},

		mouseUp: function(num, event) {
			event.preventDefault();
			this.fireMouseEvent(this.onmouseup[num], event);
		},

		fireMouseEvent: function(info, event) {
			var offset = info.$element.offset();
			this.editor.addEvent('mouse', info.func.name, [{
				type: 'object',
				string: '[object event]',
				properties: {
					layerX: Math.round(event.pageX-offset.left),
					layerY: Math.round(event.pageY-offset.top),
					pageX: event.pageX,
					pageY: event.pageY
				}
			}]);
		},

		clearMouse: function() {
			for (var i=0; i<this.onmousemove.length; i++) {
				this.onmousemove[i].$element.off('mousemove', this.onmousemove[i].handle);
				this.onmousemove[i].func = this.onmousemove[i].handle = this.onmousemove[i].timer = null;
				this.onmousedown[i].$element.off('mousedown', this.onmousedown[i].handle);
				this.onmousedown[i].func = this.onmousedown[i].handle = null;
				this.onmouseup[i].$element.off('mouseup', this.onmouseup[i].handle);
				this.onmouseup[i].func = this.onmouseup[i].handle = null;
			}
		},

		checkStart: function() {
			if (!this.start) {
				throw 'You an only set events in the first run, not from another event';
			}
		},
		
		outputEndEvent: function() {
			this.first = false;
		},

		outputClearAllEvents: function() {
			this.clearInterval();
			this.clearMouse();
			this.interval = null;
			this.onkeydown = null;
			this.onkeyup = null;
			this.first = true;
			this.popped = false;
		},

		outputPopFirstEvent: function() {
			this.popped = true;
		},

		outputClearEventsFrom: function(eventNum) {
			if (!this.popped && eventNum === 0) {
				this.outputClearAllEvents();
			}
		},

		makeSignature: function() {
			var output = '';
			if (this.interval !== null) output += 'interval:' + this.interval.name + ',';
			if (this.onkeydown !== null) output += 'onkeydown:' + this.onkeydown.name + ',';
			if (this.onkeyup !== null) output += 'onkeyup:' +this.onkeyup.name + ',';
			for (var i=0; i<this.onmousemove.length; i++) {
				if (this.onmousemove[i].func !== null) output += this.onmousemove[i].name + '-onmousemove:' + this.onmousemove[i].func.name + ',';
				if (this.onmousedown[i].func !== null) output += this.onmousedown[i].name + '-onmousedown:' + this.onmousedown[i].func.name + ',';
				if (this.onmouseup[i].func !== null) output += this.onmouseup[i].name + '-onmouseup:' + this.onmouseup[i].func.name + ',';
			}
			return output;
		}
	};
};

},{}],38:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

module.exports = function(output) {
	output.Math = function() { return this.init.apply(this, arguments); };
	output.Math.prototype = {
		init: function(editor, options) {
			this.staticRandom = options.staticRandom || false;
		},

		remove: function() {
		},

		functions: {
			abs: {type: 'function', argsMin: 1, argsMax: 1, example: 'abs(x)'},
			acos: {type: 'function', argsMin: 1, argsMax: 1, example: 'acos(x)'},
			asin: {type: 'function', argsMin: 1, argsMax: 1, example: 'asin(x)'},
			atan: {type: 'function', argsMin: 1, argsMax: 1, example: 'atan(x)'},
			atan2: {type: 'function', argsMin: 2, argsMax: 2, example: 'atan2(y, x)'},
			ceil: {type: 'function', argsMin: 1, argsMax: 1, example: 'ceil(x)'},
			cos: {type: 'function', argsMin: 1, argsMax: 1, example: 'cos(x)'},
			exp: {type: 'function', argsMin: 1, argsMax: 1, example: 'exp(x)'},
			floor: {type: 'function', argsMin: 1, argsMax: 1, example: 'floor(x)'},
			log: {type: 'function', argsMin: 1, argsMax: 1, example: 'log(x)'},
			max: {type: 'function', argsMin: 2, argsMax: Infinity, example: 'max(x, y)'},
			min: {type: 'function', argsMin: 2, argsMax: Infinity, example: 'min(x, y)'},
			pow: {type: 'function', argsMin: 2, argsMax: 2, example: 'pow(x, y)'},
			//random: {type: 'function', argsMin: 0, argsMax: 0, example: 'random()'},
			round: {type: 'function', argsMin: 1, argsMax: 1, example: 'round(x)'},
			sin: {type: 'function', argsMin: 1, argsMax: 1, example: 'sin(x)'},
			sqrt: {type: 'function', argsMin: 1, argsMax: 1, example: 'sqrt(x)'},
			tan: {type: 'function', argsMin: 1, argsMax: 1, example: 'tan(x)'},
			E: {type: 'variable', example: 'E'},
			LN2: {type: 'variable', example: 'LN2'},
			LN10: {type: 'variable', example: 'LN10'},
			LOG2E: {type: 'variable', example: 'LOG2E'},
			LOG10E: {type: 'variable', example: 'LOG10E'},
			PI: {type: 'variable', example: 'PI'},
			SQRT1_2: {type: 'variable', example: 'SQRT1_2'},
			SQRT2: {type: 'variable', example: 'SQRT2'}
		},

		getScopeObjects: function() {
			return {Math: this.getAugmentedObject()};
		},

		getAugmentedObject: function() {
			var obj = {type: 'object', string: '[object Math]', properties: {
				random: {
					name: 'random',
					info: 'Math.random',
					type: 'function',
					example: 'random()',
					string: '[function Math.random]',
					func: _(this.handleRandom).bind(this)
				}
			}};
			for (var name in this.functions) {
				var func = this.functions[name];
				if (func.type === 'function') {
					obj.properties[name] = {
						name: name,
						info: 'Math.' + name,
						type: 'function',
						example: func.example,
						string: '[function Math.' + name + ']',
						func: _(this.handleMethod).bind(this)
					};
				} else if (func.type === 'variable') {
					obj.properties[name] = {
						name: name,
						info: 'Math.' + name,
						type: 'variable',
						get: _(this.handleAttributeGet).bind(this),
						set: _(this.handleAttributeSet).bind(this),
						example: func.example
					};
				}
			}
			this.getAugmentedObject = function() { return obj; };
			return obj;
		},

		handleMethod: function(context, name, args) {
			var min = this.functions[name].argsMin, max = this.functions[name].argsMax;
			if (args.length < min) {
				throw '<var>' + name + '</var> requires at least <var>' + min + '</var> arguments';
			} else if (args.length > max) {
				throw '<var>' + name + '</var> accepts no more than <var>' + max + '</var> arguments';
			}
			return Math[name].apply(Math, args);
		},

		handleAttributeGet: function(name) {
			return Math[name];
		},

		handleAttributeSet: function(context, name, value) {
			throw 'You can only read <var>' + name + '</var>, not set it to another value';
		},

		handleRandom: function(context, name, args) {
			if (args.length > 0) {
				throw '<var>random</var> does not take any arguments';
			}

			// simple but good 32-bits RNG from http://www.jstatsoft.org/v08/i14/paper/
			this.randomNumber ^= (this.randomNumber<<13);
			this.randomNumber ^= (this.randomNumber>>17);
			this.randomNumber ^= (this.randomNumber<<5);

			// Math.pow(2,31) == 2147483648
			// Math.pow(2,32) == 4294967296
			// binary operations give 32-bit *signed* number, so between [-2^31, 2^31)
			// correcting this gives range [0, 1)
			return (this.randomNumber+2147483648)/4294967296;
		},

		outputStartEvent: function(context) {
			this.randomNumbers.push(this.randomNumber);
		},

		outputClearReload: function() {
			if (this.staticRandom) {
				this.startRandomNumber = 2463534242;
			} else {
				// get a random starting point in our order 2^32-1 sequence
				do {
					// convert to 32-bit signed integer
					this.startRandomNumber = ~~(Math.random()*2147483648-2147483648);
				} while (this.startRandomNumber === 0);
				// easy fix to avoid zero-numbers, since those don't work!
			}
		},

		outputClearAllEvents: function() {
			this.randomNumber = this.startRandomNumber;
			this.randomNumbers = [];
		},

		outputPopFirstEvent: function() {
			this.randomNumbers.shift();
		},

		outputClearEventsFrom: function(eventNum) {
			this.randomNumber = this.randomNumbers[eventNum];
			this.randomNumbers = this.randomNumbers.slice(0, eventNum);
		},

		outputClearEventsToEnd: function() {
			this.randomNumbers = [];
		}
	};
};

},{}],39:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

module.exports = function(output) {
	output.performance = {};

	output.performance.testFunction = function(func) {
		// warmup
		for (var i=0; i<100; i++) {
			func();
		}

		var start = (new Date()).getTime(), diff = 0, num = 0;
		while(diff < 3000) {
			for (var i=0; i<100; i++) {
				func();
				func();
				func();
				func();
				func();
				func();
				func();
				func();
				func();
				func();
				num += 10;
			}
			diff = (new Date()).getTime() - start;
		}
		return {time: diff/num, num: num};
	};

	output.performance.testObject = function(obj, filter) {
		var keys = [], current = 0;
		for (var key in obj) {
			if (filter === undefined || filter.indexOf(key) >= 0) {
				keys.push(key);
			}
		}
		console.log('testing: ' + keys.join(', '));
		var test = function() {
			setTimeout(function() {
				var call = obj[keys[current]];
				var dummyContext = {getStepNum: function(){ return 0; }, getCallNodeId: function(){ return 0; }};
				var example = obj[keys[current]].example;
				var func;

				if (call.func !== undefined) {
					var parenPos = example.indexOf('(');
					var name = example.substring(0, parenPos);
					func = function() {
						call.func(dummyContext, name, eval('[' + example.substring(parenPos+1, example.length-1) + ']'));
					};
				} else if (example.indexOf('=') >= 0) {
					var name = example.substring(0, example.indexOf(' '));
					func = function() {
						call.set(dummyContext, name, eval(example.substring(example.indexOf('=')+1)));
					};
				} else {
					func = function() {
						call.get(example);
					};
				}

				var result = output.performance.testFunction(func);
				console.log(example + ': ' + result.time + ' ms (' + result.num + ' times)');
				current++;
				if (current < keys.length) {
					test();
				}
			}, 100);
		};
		test();
	};
};
},{}],40:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

var robot = require('../robot');
var clayer = require('../clayer');
var blockSize = 64;

var getScopeObjects = function() {
	return {robot: this.getAugmentedObject()};
};

var getAugmentedObject = function() {
	return {
		type: 'object',
		string: '[object robot]',
		properties: {
			drive: {
				name: 'drive',
				info: 'robot.drive',
				type: 'function',
				example: 'drive(3)',
				string: '[function robot.drive]',
				func: _(this.drive).bind(this),
				cost: 0.7
			},
			turnLeft: {
				name: 'turnLeft',
				info: 'robot.turnLeft',
				type: 'function',
				example: 'turnLeft()',
				string: '[function robot.turnLeft]',
				func: _(this.turn).bind(this),
				cost: 0.7
			},
			turnRight: {
				name: 'turnRight',
				info: 'robot.turnRight',
				type: 'function',
				example: 'turnRight()',
				string: '[function robot.turnRight]',
				func: _(this.turn).bind(this),
				cost: 0.7
			},
			detectWall: {
				name: 'detectWall',
				info: 'robot.detectWall',
				type: 'function',
				example: 'detectWall()',
				string: '[function robot.detectWall]',
				func: _(this.detectWall).bind(this),
				cost: 0.2
			},
			detectGoal: {
				name: 'detectGoal',
				info: 'robot.detectGoal',
				type: 'function',
				example: 'detectGoal()',
				string: '[function robot.detectGoal]',
				func: _(this.detectGoal).bind(this),
				cost: 0.2
			}
		}
	};
};

var drive = function(object, args) {
	var amount = 1;
	if (args[0] !== undefined) {
		amount = args[0];
	}

	if (args.length > 1) {
		throw '<var>forward</var> accepts no more than <var>1</var> argument';
	} else if (typeof amount !== 'number' || !isFinite(amount)) {
		throw 'Argument has to be a valid number';
	} else if (Math.round(amount) !== amount && object.state.mazeObjects > 0) {
		throw 'Fractional amounts are only allowed when the maze is empty';
	} else if (amount !== 0) {
		var goals = null;
		if (object.state.mazeObjects > 0) {
			var positive = amount > 0;

			for (var i=0; i<Math.abs(amount); i++) {
				if (isWall(object, object.robotX, object.robotY, positive ? object.robotAngle : (object.robotAngle + 180)%360)) {
					throw 'Robot ran into a wall';
				}
				if (object.robotAngle === 0) {
					object.robotX += (positive ? 1 : -1);
				} else if (object.robotAngle === 90) {
					object.robotY -= (positive ? 1 : -1);
				} else if (object.robotAngle === 180) {
					object.robotX -= (positive ? 1 : -1);
				} else if (object.robotAngle === 270) {
					object.robotY += (positive ? 1 : -1);
				}
				if (object.state.blockGoal[object.robotX][object.robotY]) {
					var goal = {x: object.robotX, y: object.robotY, amount: i+1};
					if (goals === null) {
						goals = [goal];
					} else {
						goals.push(goal);
					}

					if (object.visitedGoals.indexOf(object.robotX+object.robotY*object.state.columns) < 0) {
						object.visitedGoals.push(object.robotX+object.robotY*object.state.columns);
					}
				}
			}
		} else {
			object.robotX += Math.cos(object.robotAngle / 180 * Math.PI)*amount;
			object.robotY -= Math.sin(object.robotAngle / 180 * Math.PI)*amount;
		}
		return goals;
	} else {
		return null;
	}
};

var turn = function(object, name, args) {
	var amount = 90;
	if (args[0] !== undefined) {
		amount = args[0];
	}

	if (args.length > 1) {
		throw '<var>' + name + '</var> accepts no more than <var>1</var> argument';
	} else if (typeof amount !== 'number' || !isFinite(amount)) {
		throw 'Argument has to be a valid number';
	} else if ([0, 90, 180, 270].indexOf((amount%360+360)%360) < 0 && object.state.mazeObjects > 0) {
		throw 'Only <var>90</var>, <var>180</var> and <var>270</var> degrees are allowed when the maze is not empty';
	} else {
		if (name === 'turnRight') amount = -amount;
		object.robotAngle = ((object.robotAngle+amount)%360+360)%360;
		return amount;
	}
};

var isWall = function(object, x, y, angle) {
	if (object.state.mazeObjects <= 0) {
		return false;
	} else {
		if (angle === 0) {
			if (x >= object.state.columns-1 || object.state.verticalActive[x+1][y]) {
				return true;
			}
		} else if (angle === 90) {
			if (y <= 0 || object.state.horizontalActive[x][y]) {
				return true;
			}
		} else if (angle === 180) {
			if (x <= 0 || object.state.verticalActive[x][y]) {
				return true;
			}
		} else if (angle === 270) {
			if (y >= object.state.rows-1 || object.state.horizontalActive[x][y+1]) {
				return true;
			}
		}
		return false;
	}
};

var detectGoal = function(object) {
	if (object.state.mazeObjects <= 0) return false;
	else return object.state.blockGoal[object.robotX][object.robotY];
};

module.exports = function(output) {
	output.SimpleRobot = function() { return this.init.apply(this, arguments); };
	output.SimpleRobot.prototype = {
		getScopeObjects: getScopeObjects,
		getAugmentedObject: getAugmentedObject,

		init: function(state) {
			this.calls = [];
			this.state = JSON.parse(state);
			this.robotX = this.state.initialX;
			this.robotY = this.state.initialY;
			this.robotAngle = this.state.initialAngle;
			this.visitedGoals = [];
		},

		drive: function(context, name, args) {
			var goals = null, fromX = this.robotX, fromY = this.robotY;
			try {
				goals = drive(this, args);
			} finally {
				this.calls.push({name: 'insertLine', args: [fromX, fromY, this.robotX, this.robotY, this.robotAngle, goals]});
			}
		},

		turn: function(context, name, args) {
			var fromAngle = this.robotAngle, amount = turn(this, name, args);
			this.calls.push({name: 'insertPoint', args: [this.robotX, this.robotY, fromAngle, amount]});
		},

		detectWall: function(context, name, args) {
			var wall = isWall(this, this.robotX, this.robotY, this.robotAngle);
			this.calls.push({name: 'insertDetectWall', args: [this.robotX, this.robotY, this.robotAngle, wall]});
			return wall;
		},

		detectGoal: function(context, name, args) {
			return detectGoal(this);
		},

		getCalls: function() {
			return this.calls;
		},

		play: function(robot) {
			for (var i=0; i<this.calls.length; i++) {
				robot[this.calls[i].name].apply(robot, this.calls[i].args);
			}
		}
	};

	output.Robot = function() { return this.init.apply(this, arguments); };
	output.Robot.prototype = {
		getScopeObjects: getScopeObjects,
		getAugmentedObject: getAugmentedObject,

		init: function(editor, options, $div) {
			this.$div = $div;
			this.$div.addClass('output robot');
			this.readOnly = options.readOnly || false;

			this.$container = $('<div class="robot-not-highlighting"></div>');
			this.$container.on('mouseup', _(this.containerMouseUp).bind(this));
			this.$container.on('mouseleave', _(this.containerMouseLeave).bind(this));
			this.$div.append(this.$container);

			this.highlighting = false;
			this.stateChangeCallback = null;

			if (options.state !== undefined && options.state.length > 0) this.state = JSON.parse(options.state);
			else this.initialState(options);

			this.robot = new robot.Robot(this.$container, this.readOnly, blockSize);
			this.robot.state = this.state;
			this.robot.drawInterface();

			if (!this.readOnly) {
				this.$container.addClass('robot-interactive');
				this.robot.$initial.on('mousedown', _(this.initialMouseDown).bind(this));
				this.updateInterface();
			}

			this.editor = editor;
			this.error = false;
		},

		remove: function() {
			this.robot.remove();
			this.$div.removeClass('output robot');
		},

		drive: function(context, name, args) {
			var goals = null, fromX = this.robotX, fromY = this.robotY;
			try {
				goals = drive(this, args);
			} finally {
				this.robot.insertLine(fromX, fromY, this.robotX, this.robotY, this.robotAngle, goals);
				this.addCall(context);
			}
		},

		turn: function(context, name, args) {
			var fromAngle = this.robotAngle, amount = turn(this, name, args);
			this.robot.insertPoint(this.robotX, this.robotY, fromAngle, amount);
			this.addCall(context);
		},

		detectWall: function(context, name, args) {
			var wall = isWall(this, this.robotX, this.robotY, this.robotAngle);
			this.robot.insertDetectWall(this.robotX, this.robotY, this.robotAngle, wall);
			this.addCall(context);
			return wall;
		},

		detectGoal: function(node, name, args) {
			return detectGoal(this);
		},

		outputStartEvent: function(context) {
			var event = {
				robotX: this.robotX,
				robotY: this.robotY,
				robotAngle: this.robotAngle,
				startAnimNum: this.robot.animation.animationQueue.length,
				endAnimNum: this.robot.animation.animationQueue.length,
				calls: [],
				visitedGoals: this.visitedGoals.slice(0)
			};
			this.eventPosition = this.events.length;
			this.events.push(event);
			this.stepNum = Infinity;
		},

		outputEndEvent: function() {
			this.updateEventHighlight();
			this.robot.animationManager.play(this.events[this.eventPosition].startAnimNum, this.events[this.eventPosition].endAnimNum);
		},

		outputClearAllEvents: function() {
			this.robot.clear();
			this.eventStart = 0;
			this.eventPosition = 0;
			this.events = [];
			this.callCounter = 0;
			this.robotX = this.state.initialX;
			this.robotY = this.state.initialY;
			this.robotAngle = this.state.initialAngle;
			this.visitedGoals = [];
		},

		outputPopFirstEvent: function() {
			this.eventStart++;
		},

		outputClearEventsFrom: function(eventNum) {
			var position = this.eventStart+eventNum;
			this.robotX = this.events[position].robotX;
			this.robotY = this.events[position].robotY;
			this.robotAngle = this.events[position].robotAngle;
			this.visitedGoals = this.events[position].visitedGoals; // .slice(0) copying not necessary, state gets deleted anyway
			for (var i=position; i<this.events.length; i++) {
				for (var j=0; j<this.events[i].calls.length; j++) {
					var call = this.events[i].calls[j];
					this.callCounter--;
					if (call.$element !== null) {
						call.$element.remove();
					}
				}
			}
			this.robot.animation.removeFromAnimNum(this.events[position].startAnimNum+1);
			this.events = this.events.slice(0, position);
		},

		outputClearEventsToEnd: function() {
			this.eventStart = this.events.length;
		},

		outputSetError: function(error) {
			if (error) {
				this.error = true;
				this.$container.addClass('robot-error');
				this.robot.stop();
			} else {
				this.error = false;
				this.$container.removeClass('robot-error');
			}
		},

		outputSetEventStep: function(eventNum, stepNum) {
			if (this.eventPosition !== this.eventStart + eventNum || this.stepNum !== stepNum) {
				this.eventPosition = this.eventStart + eventNum;
				this.stepNum = stepNum;

				this.robot.$path.children('.robot-path-line, .robot-path-point').addClass('robot-path-hidden');
				this.robot.$path.children('.robot-path-highlight-step').removeClass('robot-path-highlight-step');
				for (var i=0; i<this.events.length; i++) {
					if (i > this.eventPosition) break;
					for (var j=0; j<this.events[i].calls.length; j++) {
						var call = this.events[i].calls[j];
						if (i === this.eventPosition) {
							if (call.stepNum === this.stepNum && call.$element !== null) call.$element.addClass('robot-path-highlight-step');
							else if (call.stepNum > this.stepNum) break;
						}

						if (call.$element !== null) {
							call.$element.removeClass('robot-path-hidden');
						}
					}
				}
			}

			if (!this.error) {
				if (this.stepNum === Infinity) {
					this.robot.animationManager.play(this.events[this.eventPosition].startAnimNum, this.events[this.eventPosition].endAnimNum);
				} else {
					var lastAnimNum = null;
					for (var i=0; i<this.events[this.eventPosition].calls.length; i++) {
						var call = this.events[this.eventPosition].calls[i];
						if (call.stepNum > this.stepNum) break;

						if (call.stepNum === this.stepNum) {
							this.robot.animationManager.play(call.animNum, call.animNum+1);
							lastAnimNum = false;
							break;
						} else {
							lastAnimNum = call.animNum;
						}
					}

					if (lastAnimNum === null) {
						this.robot.animationManager.play(this.events[this.eventPosition].startAnimNum, this.events[this.eventPosition].startAnimNum);
					} else if (lastAnimNum !== false) {
						this.robot.animationManager.play(lastAnimNum+1, lastAnimNum+1);
					}
				}
			}
		},

		enableHighlighting: function() {
			this.highlighting = true;
			this.$container.removeClass('robot-not-highlighting');
			this.$container.addClass('robot-highlighting');
			this.updateEventHighlight();
		},

		disableHighlighting: function() {
			this.highlighting = false;
			this.$container.removeClass('robot-highlighting');
			this.$container.addClass('robot-not-highlighting');
			this.robot.removeEventHighlights();
			this.robot.removePathHighlights();
		},

		enableEventHighlighting: function() {
			this.$container.addClass('robot-highlighting-current-event');
			this.updateEventHighlight();
		},

		disableEventHighlighting: function() {
			this.$container.removeClass('robot-highlighting-current-event');
		},

		updateEventHighlight: function() {
			this.robot.removeEventHighlights();
			if (this.highlighting) {
				for (var i=0; i<this.events[this.eventPosition].calls.length; i++) {
					var call = this.events[this.eventPosition].calls[i];
					if (call.$element !== null) {
						call.$element.addClass('robot-path-highlight-event');
					}
				}
			}
		},

		highlightCallIds: function(callIds) {
			this.robot.removePathHighlights();
			if (callIds !== null) {
				for (var i=0; i<this.events[this.eventPosition].calls.length; i++) {
					var call = this.events[this.eventPosition].calls[i];
					if (callIds.indexOf(call.callId) >= 0 && call.$element !== null) {
						call.$element.addClass('robot-path-highlight');
					}
				}
			}
		},

		highlightTimeIds: function(timeIds) {
			this.robot.removeTimeHighlights();
			if (timeIds !== null) {
				for (var i=this.eventStart; i<this.events.length; i++) {
					for (var j=0; j<this.events[i].calls.length; j++) {
						var call = this.events[i].calls[j];

						if (timeIds[i-this.eventStart].indexOf(call.callId) >= 0 && call.$element !== null) {
							call.$element.addClass('robot-path-highlight-time');
						}
					}
				}
			}
		},

		setState: function(state) {
			this.state = JSON.parse(state);
			this.robot.state = this.state;
			this.robot.drawInterface();
			this.updateInterface();
			this.stateChanged();
		},

		initialState: function(options) {
			var columns = options.columns || 8, rows = options.rows || 8;
			this.state = {
				columns: columns,
				rows: rows,
				initialX: Math.floor(columns/2),
				initialY: rows-1,
				initialAngle: 90,
				mazeObjects: 0,
				verticalActive: [],
				horizontalActive: [],
				blockGoal: []
			};
			for (var x=0; x<columns; x++) {
				this.state.verticalActive[x] = [];
				this.state.horizontalActive[x] = [];
				this.state.blockGoal[x] = [];
				for (var y=0; y<rows; y++) {
					this.state.verticalActive[x][y] = false;
					this.state.horizontalActive[x][y] = false;
					this.state.blockGoal[x][y] = false;
				}
			}
		},

		setStateChangeCallback: function(callback) {
			this.stateChangeCallback = callback;
		},

		getVisitedGoals: function() {
			return this.visitedGoals.slice(0);
		},

		highlightVisitedGoal: function(goal) {
			this.robot.highlightVisitedGoal(goal);
		},

		getMouseElement: function() {
			//return this.$container;
			return null; // no support for now
		},

		setFocus: function() {
			this.robot.animationManager.replay();
		},

		getState: function() {
			return JSON.stringify(this.state);
		},

		getTotalGoals: function() {
			var total = 0;
			for (var x=0; x<this.state.columns; x++) {
				for (var y=0; y<this.state.rows; y++) {
					if (this.state.blockGoal[x][y]) total++;
				}
			}
			return total;
		},

		/// INTERNAL FUNCTIONS ///
		addCall: function(context) {
			if (this.callCounter++ > 300) {
				context.throwTimeout();
			}
			var $element = this.robot.$lastElement;
			if ($element !== null) {
				$element.data('eventPosition', this.eventPosition);
				$element.data('index', this.events[this.eventPosition].calls.length);
				$element.on('mousemove', _(this.pathMouseMove).bind(this));
				$element.on('mouseleave', _(this.pathMouseLeave).bind(this));
			}
			this.events[this.eventPosition].calls.push({
				stepNum: context.getStepNum(),
				nodeId: context.getCallNodeId(),
				callId: context.getCallId(),
				$element: $element,
				animNum: this.robot.animation.getLength()-1
			});
			this.events[this.eventPosition].endAnimNum = this.robot.animation.getLength();
		},

		updateInterface: function() {
			if (!this.readOnly) {
				$('.robot-maze-block').click(_(this.clickBlock).bind(this));
				$('.robot-maze-line-vertical').click(_(this.clickVerticalLine).bind(this));
				$('.robot-maze-line-horizontal').click(_(this.clickHorizontalLine).bind(this));
			}
		},

		clickVerticalLine: function(event) {
			var $target = $(event.delegateTarget);
			var active = !this.state.verticalActive[$target.data('x')][$target.data('y')];
			this.state.verticalActive[$target.data('x')][$target.data('y')] = active;
			if (active) {
				this.state.mazeObjects++;
				$target.addClass('robot-maze-line-active');
			} else {
				this.state.mazeObjects--;
				$target.removeClass('robot-maze-line-active');
			}
			this.stateChanged();
		},

		clickHorizontalLine: function(event) {
			var $target = $(event.delegateTarget);
			var active = !this.state.horizontalActive[$target.data('x')][$target.data('y')];
			this.state.horizontalActive[$target.data('x')][$target.data('y')] = active;
			if (active) {
				this.state.mazeObjects++;
				$target.addClass('robot-maze-line-active');
			} else {
				this.state.mazeObjects--;
				$target.removeClass('robot-maze-line-active');
			}
			this.stateChanged();
		},

		pathMouseMove: function(event) {
			if (this.highlighting) {
				var $target = $(event.delegateTarget);
				if ($target.data('eventPosition') === this.eventPosition &&
						this.events[this.eventPosition].calls[$target.data('index')] !== undefined) {
					if (!$target.hasClass('robot-path-highlight')) {
						this.robot.removePathHighlights();
						$target.addClass('robot-path-highlight');
						this.editor.highlightNodeId(this.events[this.eventPosition].calls[$target.data('index')].nodeId);
					}
				} else {
					this.robot.removePathHighlights();
					this.editor.highlightNodeId(0);
				}
			}
		},

		pathMouseLeave: function(event) {
			if (this.highlighting) {
				this.robot.removePathHighlights();
				this.editor.highlightNodeId(0);
			}
		},

		initialMouseDown: function(event) {
			var offset = this.$container.offset();
			if (!this.draggingInitial) {
				this.draggingInitial = true;
				this.dragX = (event.pageX - offset.left)%blockSize - blockSize/2;
				this.dragY = (event.pageY - offset.top)%blockSize - blockSize/2;
				this.$container.on('mousemove', _(this.containerMouseMove).bind(this));
				this.robot.$initial.addClass('robot-initial-dragging');
				event.preventDefault();
				this.robot.drawInitial();
			}
		},

		containerMouseUp: function(event) {
			if (this.draggingInitial) {
				this.$container.off('mousemove');
				this.robot.$initial.removeClass('robot-initial-dragging');
				this.draggingInitial = false;
				this.robot.drawInitial();
			}
		},

		containerMouseLeave: function(event) {
			if (this.draggingInitial) {
				this.$container.off('mousemove');
				this.robot.$initial.removeClass('robot-initial-dragging');
				this.draggingInitial = false;
				this.robot.drawInitial();
			}
		},

		containerMouseMove: function(event) {
			var offset = this.$container.offset();
			var x = Math.floor((event.pageX - offset.left)/blockSize);
			var y = Math.floor((event.pageY - offset.top)/blockSize);

			if (x !== this.state.initialX || y !== this.state.initialY) {
				this.state.initialX = x;
				this.state.initialY = y;
				this.stateChanged();
			}
			this.robot.$initial.css('left', event.pageX - offset.left - this.dragX);
			this.robot.$initial.css('top', event.pageY - offset.top - this.dragY);
		},

		clickBlock: function(event) {
			var $target = $(event.delegateTarget);
			var goal = !this.state.blockGoal[$target.data('x')][$target.data('y')];
			this.state.blockGoal[$target.data('x')][$target.data('y')] = goal;
			if (goal) {
				this.state.mazeObjects++;
				$target.addClass('robot-maze-block-goal');
			} else {
				this.state.mazeObjects--;
				$target.removeClass('robot-maze-block-goal');
			}
			this.stateChanged();
		},

		stateChanged: function() {
			this.editor.outputRequestsRerun();
			if (this.stateChangeCallback !== null) {
				this.stateChangeCallback(this.getState());
			}
		}
	};
};
},{"../clayer":2,"../robot":41}],41:[function(require,module,exports){
/*jshint node:true*/
"use strict";

var robot = {};

require('./robot.animation')(robot);
require('./robot.manager')(robot);
require('./robot.robot')(robot);

module.exports = robot;
},{"./robot.animation":42,"./robot.manager":43,"./robot.robot":44}],42:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

module.exports = function(output) {
	var clayer = require('../clayer');

	output.RobotAnimation = function() { return this.init.apply(this, arguments); };
	output.RobotAnimation.prototype = {
		init: function($robot, $maze, blockSize) {
			this.$robot = $robot;
			this.$maze = $maze;
			this.blockSize = blockSize;

			this.scale = blockSize/64+0.01;
			if (this.blockSize !== 64) {
				clayer.setCss3(this.$robot, 'transform', 'scale(' + this.scale + ')');
			}

			this.rotationFactor = 0.75;
			this.detectWallLength = 40000;
			this.animationQueue = [];
			this.duration = 0.006;
			this.animateTimeout = null;
			this.blinkTimeouts = [];
			this.currentAnimation = null;
			this.lastNumber = 0;
			this.animationString = '';
			this.playing = false;
		},

		add: function(anim) {
			if (anim.type === 'movement') {
				var dx = (anim.x2-anim.x)*this.blockSize, dy = (anim.y2-anim.y)*this.blockSize;
				anim.length = Math.sqrt(dx*dx + dy*dy);
				if (anim.length <= 0) return;
			} else if (anim.type === 'rotation') {
				anim.length = Math.abs(anim.angle2-anim.angle);
				if (anim.length <= 0) return;
			}
			this.animationQueue.push(anim);
			this.addAnimationString(anim);
		},

		playAnimation: function(number) {
			this.playing = true;
			this.clearTimeout();
			this.number = number;
			var animation = this.animationQueue[this.number];
			this.setInitial(animation);

			if (animation.type === 'wall') {
				this.setLight(animation.wall ? 'red' : 'green');
				this.animateTimeout = setTimeout(_(this.animationEnd).bind(this), this.duration*this.detectWallLength);
			} else if (animation.type === 'delay') {
				this.animateTimeout = setTimeout(_(this.animationEnd).bind(this), this.duration*animation.length);
			} else {
				this.animateTimeout = _.defer(_(this.animationStart).bind(this));
			}
		},

		play: function(start, end) {
			if (start >= 0 && this.animationQueue.length > 0) {
				if (end > start) {
					this.lastNumber = end;
					this.playAnimation(start);
				} else {
					this.playing = false;
					if (start < this.animationQueue.length) {
						this.setInitial(this.animationQueue[start]);
					} else {
						var animation = this.animationQueue[this.animationQueue.length-1];
						this.resetRobot();
						this.setPosition(animation.x2 || animation.x, animation.y2 || animation.y, animation.angle2 || animation.angle);
						this.setLight('default');
					}
					this.clearTimeout();
				}
			} else {
				this.playing = false;
				this.clearTimeout();
				this.resetRobot();
				this.$robot.hide();
			}
		},

		stop: function() {
			this.clearTimeout();
			this.resetRobot();
			this.$robot.hide();
		},

		getLength: function() {
			return this.animationQueue.length;
		},

		remove: function() {
			this.clearTimeout();
			this.resetRobot();
			this.$robot.hide();
		},

		removeFromAnimNum: function(animNum) {
			this.clearTimeout();
			this.animationQueue = this.animationQueue.slice(0, animNum);
			this.animationString = '';
			for (var i=0; i<this.animationQueue.length; i++) {
				this.addAnimationString(this.animationQueue[i]);
			}
		},

		/// INTERNAL FUNCTIONS ///
		addAnimationString: function(anim) {
			if (anim.goals) {
				for (var i=0; i<anim.goals.length; i++) {
					this.animationString += 'G' + anim.goals[i].x + '/' + anim.goals[i].y + '/' + anim.goals[i].amount + ',';
				}
			}
			this.animationString += anim.type + ',' + anim.x + ',' + anim.y + ',' + anim.x2 + ',' + anim.y2 + ',' + anim.angle + ',' + anim.angle2 + ',';
		},

		resetRobot: function() {
			this.$robot.show();
			clayer.setCss3(this.$robot, 'transition', '');
			this.$robot.off('transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd');
			this.$maze.children('.robot-maze-block-goal-blink').removeClass('robot-maze-block-goal-blink');
			for (var i=0; i<this.blinkTimeouts.length; i++) {
				clearTimeout(this.blinkTimeouts[i]);
			}
		},

		setInitial: function(animation) {
			this.resetRobot();
			this.setPosition(animation.x, animation.y, animation.angle);
			this.setLight('default');
		},

		animationStart: function() {
			this.animateTimeout = null;
			var animation = this.animationQueue[this.number];
			var duration = (this.duration*animation.length).toFixed(5);
			//this.$robot.on('transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd', _(this.animationEnd).bind(this));
			this.animateTimeout = window.setTimeout(_(this.animationEnd).bind(this), duration*1000);

			if (animation.type === 'movement') {
				clayer.setCss3(this.$robot, 'transition', 'transform ' + duration + 's linear', true);
				this.setPosition(animation.x2, animation.y2, animation.angle);

				if (animation.goals !== null) {
					for (var i=0; i<animation.goals.length; i++) {
						this.setBlinkAnim(animation.goals[i].$block, animation.goals[i].amount);
					}
				}
			} else if (animation.type === 'rotation') {
				duration = this.rotationFactor*duration;
				clayer.setCss3(this.$robot, 'transition', 'transform ' + duration + 's linear', true);
				this.setPosition(animation.x, animation.y, animation.angle2);
			}
		},

		setBlinkAnim: function($block, amount) {
			this.blinkTimeouts.push(setTimeout(function() {
				$block.addClass('robot-maze-block-goal-blink');
			}, (amount-0.5)*this.blockSize*this.duration*1000));
			this.blinkTimeouts.push(setTimeout(function() {
				$block.removeClass('robot-maze-block-goal-blink');
			}, (amount+0.5)*this.blockSize*this.duration*1000));
		},

		animationEnd: function() {
			//this.clearTimeout();
			this.animateTimeout = null;
			this.setLight('default');

			if (this.number+1 < this.lastNumber && this.number < this.animationQueue.length-1) {
				this.playAnimation(this.number+1);
			} else {
				this.playing = false;
			}
		},

		setPosition: function(x, y, angle) {
			x = Math.round(x*this.blockSize + this.blockSize/2);
			y = Math.round(y*this.blockSize + this.blockSize/2);
      var str = 'translate3d(' + x + 'px, ' + y + 'px, 0) rotate(' + Math.round(90-angle) + 'deg)';
      if (this.blockSize !== 64) str += ' scale(' + this.scale + ')';
			clayer.setCss3(this.$robot, 'transform', str);
    },

		setLight: function(state) {
			this.$robot.removeClass('robot-green robot-red');
			if (state === 'red') {
				this.$robot.addClass('robot-red');
			} else if (state === 'green') {
				this.$robot.addClass('robot-green');
			}
		},

		clearTimeout: function() {
			if (this.animateTimeout !== null) {
				clearTimeout(this.animateTimeout);
				this.animateTimeout = null;
			}
		}
	};
};

},{"../clayer":2}],43:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

module.exports = function(output) {
	output.RobotAnimationManager = function() { return this.init.apply(this, arguments); };
	output.RobotAnimationManager.prototype = {
		init: function($robot, $maze, blockSize) {
			this.$robot = $robot;
			this.$robot.hide();
			this.$maze = $maze;
			this.blockSize = blockSize;
			this.runningAnimation = null;
			this.insertingAnimation = null;
			this.start = -1;
			this.end = -1;
		},

		newAnimation: function() {
			this.insertingAnimation = new output.RobotAnimation(this.$robot, this.$maze, this.blockSize);
			return this.insertingAnimation;
		},
		
		play: function(start, end) {
			var newAnim = this.useNewAnimation();
			if (newAnim || this.start !== start || this.end !== end) {
				this.forcePlay(start, end);
			}
		},

		forcePlay: function(start, end) {
			this.useNewAnimation();
			this.start = start;
			this.end = end;
			this.replay();
		},

		replay: function() {
			if (this.runningAnimation !== null && this.start >= 0 && this.end >= 0) {
				this.runningAnimation.play(this.start, this.end);
			}
		},

		stop: function() {
			this.start = -1;
			this.end = -1;
			if (this.runningAnimation !== null) {
				this.runningAnimation.stop();
			}
		},

		remove: function() {
			if (this.runningAnimation !== null) {
				this.runningAnimation.remove();
				this.runningAnimation = null;
			}
			if (this.insertingAnimation !== null) {
				this.insertingAnimation.remove();
				this.insertingAnimation = null;
			}
		},

		/// INTERNAL FUNCTIONS ///
		useNewAnimation: function() {
			if (this.insertingAnimation !== null) {
				if (this.runningAnimation === null) {
					this.runningAnimation = this.insertingAnimation;
					this.insertingAnimation = null;
					return true;
				} else if (this.insertingAnimation.animationString !== this.runningAnimation.animationString) {
					this.runningAnimation.remove();
					this.runningAnimation = this.insertingAnimation;
					this.insertingAnimation = null;
					return true;
				}
			}
			return false;
		}
	};
};
},{}],44:[function(require,module,exports){
/*jshint node:true jquery:true*/
"use strict";

module.exports = function(output) {
	var clayer = require('../clayer');

	output.Robot = function() { return this.init.apply(this, arguments); };
	output.Robot.prototype = {
		init: function($container, readOnly, blockSize, state) {
			this.readOnly = readOnly;
			this.blockSize = blockSize;

			this.$container = $container;
			this.$container.addClass('robot-container');

			this.$maze = $('<div class="robot-maze"></div>');
			this.$container.append(this.$maze);

			this.$path = $('<div class="robot-path"></div>');
			this.$container.append(this.$path);

			this.$robot = $('<div class="robot-robot"></div>');
			this.$container.append(this.$robot);
			this.$robot.hide();

			this.$initial = $('<div class="robot-robot robot-initial"></div>');
			this.$container.append(this.$initial);
			if (this.blockSize !== 64) {
				clayer.setCss3(this.$initial, 'transform', 'scale(' + (this.blockSize/64+0.01) + ')');
			}

			this.animationManager = new output.RobotAnimationManager(this.$robot, this.$maze, this.blockSize);
			this.animation = null;

			if (state !== undefined) {
				this.state = JSON.parse(state);
				this.drawInterface();
				this.clear();
			}
		},

		remove: function() {
			this.clear();
			this.$container.children('.robot-maze-block .robot-maze-line-vertical, .robot-maze-line-horizontal').remove();
			this.animationManager.remove();
			this.lastAnim = null;
			this.$lastElement = null;

			this.$maze.remove();
			this.$path.remove();
			this.$robot.remove();
		},

		clear: function() {
			this.$path.children('.robot-path-line, .robot-path-point').remove();
			this.animation = this.animationManager.newAnimation();
			this.lastAnim = null;
			this.$lastElement = null;
		},

		insertDelay: function(delay) { // only to be called right after creating this object with a state
			this.lastAnim = {type: 'delay', x: this.state.initialX, y: this.state.initialY, angle: this.state.initialAngle, length: delay};
			this.animation.add(this.lastAnim);
			this.$lastElement = null;
		},

		insertLine: function(fromX, fromY, toX, toY, angle, goals) {
			var dy = (toY-fromY)*this.blockSize, dx = (toX-fromX)*this.blockSize;
			var angleRad = Math.atan2(dy, dx);
			var length = Math.sqrt(dx*dx+dy*dy);
			var $line = $('<div class="robot-path-line"><div class="robot-path-line-inside"></div></div>');
			this.$path.append($line);
			$line.width(Math.round(length));
			clayer.setCss3($line, 'transform', 'rotate(' + (angleRad*180/Math.PI) + 'deg)');
			$line.css('left', Math.round(fromX*this.blockSize + this.blockSize/2 + dx/2 - length/2));
			$line.css('top', Math.round(fromY*this.blockSize + this.blockSize/2 + dy/2));

			if (goals !== null) {
				for (var i=0; i<goals.length; i++) {
					goals[i].$block = this.$blocks[goals[i].x][goals[i].y];
				}
			}

			this.lastAnim = {type: 'movement', x: fromX, y: fromY, x2: toX, y2: toY, angle: angle, goals: goals};
			this.animation.add(this.lastAnim);

			this.$lastElement = $line;
		},

		insertPoint: function(x, y, fromAngle, amount) {
			var toAngle = fromAngle+amount;
			var $point = $('<div class="robot-path-point"><div class="robot-path-point-inside"><div class="robot-path-point-arrow"></div></div></div>');
			this.$path.append($point);

			var toAngleRad = toAngle/180*Math.PI;

			// 5 = 0.5*@robot-path-point-arrow-hover
			$point.css('left', Math.round(x*this.blockSize + this.blockSize/2 + 5*Math.cos(toAngleRad)));
			$point.css('top', Math.round(y*this.blockSize + this.blockSize/2 - 5*Math.sin(toAngleRad)));
			clayer.setCss3($point, 'transform', 'rotate(' + (-toAngle) + 'deg)');

			this.lastAnim = {type: 'rotation', x: x, y: y, angle: fromAngle, angle2: toAngle};
			this.animation.add(this.lastAnim);

			this.$lastElement = $point;
		},

		insertDetectWall: function(x, y, angle, wall) {
			this.lastAnim = {type: 'wall', x: x, y: y, angle: angle, wall: wall};
			this.animation.add(this.lastAnim);
			this.$lastElement = null;
			return wall;
		},

		removePathHighlights: function() {
			this.$path.children('.robot-path-highlight').removeClass('robot-path-highlight');
		},

		removeEventHighlights: function() {
			this.$path.children('.robot-path-highlight-event').removeClass('robot-path-highlight-event');
		},

		removeTimeHighlights: function() {
			this.$path.children('.robot-path-highlight-time').removeClass('robot-path-highlight-time');
		},

		highlightVisitedGoal: function(goal) {
			this.$maze.children('.robot-maze-block-goal-blink').removeClass('robot-maze-block-goal-blink');
			if (goal !== null) {
				this.$blocks[goal%this.state.columns][Math.floor(goal/this.state.columns)].addClass('robot-maze-block-goal-blink');
			}
		},

		drawInterface: function() {
			var x, y, $line, $block;

			this.width = this.state.columns * this.blockSize;
			this.height = this.state.rows * this.blockSize;
			this.$container.width(this.width);
			this.$container.height(this.height);

			// inits
			this.$maze.children('.robot-maze-block, .robot-maze-line-vertical, .robot-maze-line-horizontal').remove();
			this.$verticalLines = [];
			this.$horizontalLines = [];
			this.$blocks = [];
			for (x=0; x<this.state.columns; x++) {
				this.$verticalLines[x] = [];
				this.$horizontalLines[x] = [];
				this.$blocks[x] = [];
			}

			// blocks
			for (x=0; x<this.state.columns; x++) {
				for (y=0; y<this.state.rows; y++) {
					$block = $('<div class="robot-maze-block"></div>');
					$block.css('left', x*this.blockSize);
					$block.css('top', y*this.blockSize);
					$block.width(this.blockSize);
					$block.height(this.blockSize);
					$block.data('x', x);
					$block.data('y', y);
					if (this.state.blockGoal[x][y]) $block.addClass('robot-maze-block-goal');
					this.$maze.append($block);
					this.$blocks[x][y] = $block;
				}
			}

			// vertical lines
			for (y=0; y<this.state.rows; y++) {
				for (x=1; x<this.state.columns; x++) {
					$line = $('<div class="robot-maze-line-vertical"><div class="robot-maze-line-inside"></div></div>');
					$line.css('left', x*this.blockSize);
					$line.css('top', y*this.blockSize);
					$line.height(this.blockSize);
					$line.data('x', x);
					$line.data('y', y);
					if (this.state.verticalActive[x][y]) $line.addClass('robot-maze-line-active');
					this.$maze.append($line);
					this.$verticalLines[x][y] = $line;
				}
			}

			// horizontal lines
			for (x=0; x<this.state.columns; x++) {
				for (y=1; y<this.state.rows; y++) {
					$line = $('<div class="robot-maze-line-horizontal"><div class="robot-maze-line-inside"></div></div>');
					$line.css('left', x*this.blockSize);
					$line.css('top', y*this.blockSize);
					$line.width(this.blockSize);
					$line.data('x', x);
					$line.data('y', y);
					if (this.state.horizontalActive[x][y]) $line.addClass('robot-maze-line-active');
					this.$maze.append($line);
					this.$horizontalLines[x][y] = {$line: $line, active: false};
				}
			}

			this.drawInitial();
		},

		drawInitial: function() {
			this.$initial.css('left', this.state.initialX * this.blockSize + this.blockSize/2);
			this.$initial.css('top', this.state.initialY * this.blockSize + this.blockSize/2);
		},

		playAll: function() {
			this.animationManager.forcePlay(0, Infinity);
		},

		stop: function() {
			this.animationManager.stop();
		}
	};
};
},{"../clayer":2}],45:[function(require,module,exports){

},{}],46:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":47}],47:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],48:[function(require,module,exports){
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}]},{},[1]);

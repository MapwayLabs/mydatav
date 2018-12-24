(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three')) :
	typeof define === 'function' && define.amd ? define(['three'], factory) :
	(global.THREE = global.THREE || {}, global.THREE.TextTexture = factory(global.THREE));
}(this, (function (three) { 'use strict';

	function Document_createCanvas() {
		return document.createElement('canvas');
	}

	function Lang_isUndefined(value) {
		return value === undefined;
	}

	function getFont(fontStyle, fontVariant, fontWeight, fontSize, fontFamily) {
		return [fontStyle, fontVariant, fontWeight, (fontSize + "px"), fontFamily].join(' ');
	}

	function getTextLines(text) {
		return text ? text.split('\n') : [];
	}

	function Array_max(array) {
		return array.reduce(function (maxValue, value) { return Math.max(maxValue, value); });
	}

	function getTextWidth(textLines, font) {
		if (textLines.length) {
			var ctx = Document_createCanvas().getContext('2d');
			ctx.font = font;
			return Array_max(textLines.map(function (text) { return ctx.measureText(text).width; }));
		}
		return 0;
	}

	var defaultExport = /*@__PURE__*/(function (Texture) {
		function defaultExport(ref) {
			if ( ref === void 0 ) ref = {};
			var anisotropy = ref.anisotropy;
			var autoRedraw = ref.autoRedraw; if ( autoRedraw === void 0 ) autoRedraw = true;
			var fillStyle = ref.fillStyle; if ( fillStyle === void 0 ) fillStyle = 'white';
			var fontFamily = ref.fontFamily; if ( fontFamily === void 0 ) fontFamily = 'sans-serif';
			var fontSize = ref.fontSize; if ( fontSize === void 0 ) fontSize = 16;
			var fontStyle = ref.fontStyle; if ( fontStyle === void 0 ) fontStyle = 'normal';
			var fontVariant = ref.fontVariant; if ( fontVariant === void 0 ) fontVariant = 'normal';
			var fontWeight = ref.fontWeight; if ( fontWeight === void 0 ) fontWeight = 'normal';
			var format = ref.format;
			var lineWidth = ref.lineWidth; if ( lineWidth === void 0 ) lineWidth = 0;
			var magFilter = ref.magFilter; if ( magFilter === void 0 ) magFilter = three.LinearFilter;
			var mapping = ref.mapping;
			var minFilter = ref.minFilter; if ( minFilter === void 0 ) minFilter = three.LinearFilter;
			var padding = ref.padding; if ( padding === void 0 ) padding = 0.25;
			var strokeStyle = ref.strokeStyle; if ( strokeStyle === void 0 ) strokeStyle = 'black';
			var text = ref.text; if ( text === void 0 ) text = '';
			var textAlign = ref.textAlign; if ( textAlign === void 0 ) textAlign = 'center';
			var textLineHeight = ref.textLineHeight; if ( textLineHeight === void 0 ) textLineHeight = 1.15;
			var type = ref.type;
			var wrapS = ref.wrapS;
			var wrapT = ref.wrapT;

			Texture.call(
				this, Document_createCanvas(),
				mapping,
				wrapS,
				wrapT,
				magFilter,
				minFilter,
				format,
				type,
				anisotropy
			);
			this.autoRedraw = autoRedraw;
			this._text = text;
			this._textAlign = textAlign;
			this._textLineHeight = textLineHeight;
			this._fontFamily = fontFamily;
			this._fontSize = fontSize;
			this._fontWeight = fontWeight;
			this._fontVariant = fontVariant;
			this._fontStyle = fontStyle;
			this._fillStyle = fillStyle;
			this._lineWidth = lineWidth;
			this._strokeStyle = strokeStyle;
			this._padding = padding;
			this.redraw();
		}

		if ( Texture ) defaultExport.__proto__ = Texture;
		defaultExport.prototype = Object.create( Texture && Texture.prototype );
		defaultExport.prototype.constructor = defaultExport;

		var prototypeAccessors = { text: { configurable: true },textAlign: { configurable: true },textLines: { configurable: true },textLineHeight: { configurable: true },textLineHeightInPixels: { configurable: true },fontFamily: { configurable: true },fontSize: { configurable: true },fontWeight: { configurable: true },fontVariant: { configurable: true },fontStyle: { configurable: true },font: { configurable: true },fillStyle: { configurable: true },lineWidth: { configurable: true },lineWidthInPixels: { configurable: true },strokeStyle: { configurable: true },textWidthInPixels: { configurable: true },textHeight: { configurable: true },textHeightInPixels: { configurable: true },padding: { configurable: true },paddingInPixels: { configurable: true },imageWidthInPixels: { configurable: true },imageHeight: { configurable: true },imageHeightInPixels: { configurable: true },imageAspect: { configurable: true } };

		defaultExport.prototype.redraw = function redraw () {
			var this$1 = this;

			var ctx = this.image.getContext('2d');
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			if (this.textWidthInPixels && this.textHeightInPixels) {
				ctx.canvas.width = this.imageWidthInPixels;
				ctx.canvas.height = this.imageHeightInPixels;
				ctx.font = this.font;
				ctx.textBaseline = 'middle';
				var left;
				switch (this.textAlign) {
					case 'left':
						ctx.textAlign = 'left';
						left = this.paddingInPixels + this.lineWidthInPixels / 2;
						break;
					case 'right':
						ctx.textAlign = 'right';
						left = this.paddingInPixels + this.lineWidthInPixels / 2 + this.textWidthInPixels;
						break;
					case 'center':
						ctx.textAlign = 'center';
						left = this.paddingInPixels + this.lineWidthInPixels / 4 + this.textWidthInPixels / 2;
						break;
				}
				var top = this.paddingInPixels + this.lineWidthInPixels / 2 + this.fontSize / 2;
				ctx.fillStyle = this.fillStyle;
				ctx.miterLimit = 1;
				ctx.lineWidth = this.lineWidthInPixels;
				ctx.strokeStyle = this.strokeStyle;
				this.textLines.forEach(function (text) {
					if (this$1.lineWidth) {
						ctx.strokeText(text, left, top);
					}
					ctx.fillText(text, left, top);
					top += this$1.textLineHeightInPixels;
				});
			} else {
				ctx.canvas.width = ctx.canvas.height = 1;
			}
			this.needsUpdate = true;
		};

		defaultExport.prototype._redrawIfAuto = function _redrawIfAuto () {
			if (this.autoRedraw) {
				this.redraw();
			}
		};

		prototypeAccessors.text.get = function () {
			return this._text;
		};

		prototypeAccessors.text.set = function (value) {
			if (this._text !== value) {
				this._text = value;
				this._textLines = undefined;
				this._textWidthInPixels = undefined;
				this._redrawIfAuto();
			}
		};

		prototypeAccessors.textAlign.get = function () {
			return this._textAlign;
		};

		prototypeAccessors.textAlign.set = function (value) {
			if (this._textAlign !== value) {
				this._textAlign = value;
				this._redrawIfAuto();
			}
		};

		prototypeAccessors.textLines.get = function () {
			if (Lang_isUndefined(this._textLines)) {
				this._textLines = getTextLines(this.text);
			}
			return this._textLines;
		};

		prototypeAccessors.textLineHeight.get = function () {
			return this._textLineHeight;
		};

		prototypeAccessors.textLineHeight.set = function (value) {
			if (this._textLineHeight !== value) {
				this._textLineHeight = value;
				this._redrawIfAuto();
			}
		};

		prototypeAccessors.textLineHeightInPixels.get = function () {
			return this.fontSize * this.textLineHeight;
		};

		prototypeAccessors.fontFamily.get = function () {
			return this._fontFamily;
		};

		prototypeAccessors.fontFamily.set = function (value) {
			if (this._fontFamily !== value) {
				this._fontFamily = value;
				this._textWidthInPixels = undefined;
				this._redrawIfAuto();
			}
		};

		prototypeAccessors.fontSize.get = function () {
			return this._fontSize;
		};

		prototypeAccessors.fontSize.set = function (value) {
			if (this._fontSize !== value) {
				this._fontSize = value;
				this._textWidthInPixels = undefined;
				this._redrawIfAuto();
			}
		};

		prototypeAccessors.fontWeight.get = function () {
			return this._fontWeight;
		};

		prototypeAccessors.fontWeight.set = function (value) {
			if (this._fontWeight !== value) {
				this._fontWeight = value;
				this._textWidthInPixels = undefined;
				this._redrawIfAuto();
			}
		};

		prototypeAccessors.fontVariant.get = function () {
			return this._fontVariant;
		};

		prototypeAccessors.fontVariant.set = function (value) {
			if (this._fontVariant !== value) {
				this._fontVariant = value;
				this._textWidthInPixels = undefined;
				this._redrawIfAuto();
			}
		};

		prototypeAccessors.fontStyle.get = function () {
			return this._fontStyle;
		};

		prototypeAccessors.fontStyle.set = function (value) {
			if (this._fontStyle !== value) {
				this._fontStyle = value;
				this._textWidthInPixels = undefined;
				this._redrawIfAuto();
			}
		};

		prototypeAccessors.font.get = function () {
			return getFont(
				this.fontStyle,
				this.fontVariant,
				this.fontWeight,
				this.fontSize,
				this.fontFamily
			);
		};

		prototypeAccessors.fillStyle.get = function () {
			return this._fillStyle;
		};

		prototypeAccessors.fillStyle.set = function (value) {
			if (this._fillStyle !== value) {
				this._fillStyle = value;
				this._redrawIfAuto();
			}
		};

		prototypeAccessors.lineWidth.get = function () {
			return this._lineWidth;
		};

		prototypeAccessors.lineWidth.set = function (value) {
			if (this._lineWidth !== value) {
				this._lineWidth = value;
				this._redrawIfAuto();
			}
		};

		prototypeAccessors.lineWidthInPixels.get = function () {
			return this._lineWidth * this.fontSize;
		};

		prototypeAccessors.strokeStyle.get = function () {
			return this._strokeStyle;
		};

		prototypeAccessors.strokeStyle.set = function (value) {
			if (this._strokeStyle !== value) {
				this._strokeStyle = value;
				this._redrawIfAuto();
			}
		};

		prototypeAccessors.textWidthInPixels.get = function () {
			if (Lang_isUndefined(this._textWidthInPixels)) {
				this._textWidthInPixels = getTextWidth(
					this.textLines,
					this.font
				);
			}
			return this._textWidthInPixels;
		};

		prototypeAccessors.textHeight.get = function () {
			return this.textLineHeight * (this.textLines.length - 1) + 1;
		};

		prototypeAccessors.textHeightInPixels.get = function () {
			return this.textHeight * this.fontSize;
		};

		prototypeAccessors.padding.get = function () {
			return this._padding;
		};

		prototypeAccessors.padding.set = function (value) {
			if (this._padding !== value) {
				this._padding = value;
				this._redrawIfAuto();
			}
		};

		prototypeAccessors.paddingInPixels.get = function () {
			return this.padding * this.fontSize;
		};

		prototypeAccessors.imageWidthInPixels.get = function () {
			return this.textWidthInPixels + this.lineWidthInPixels + this.paddingInPixels * 2;
		};

		prototypeAccessors.imageHeight.get = function () {
			return this.textHeight + this.lineWidth + this.padding * 2;
		};

		prototypeAccessors.imageHeightInPixels.get = function () {
			return this.imageHeight * this.fontSize;
		};

		prototypeAccessors.imageAspect.get = function () {
			if (this.image.width && this.image.height) {
				return this.image.width / this.image.height;
			}
			return 1;
		};

		Object.defineProperties( defaultExport.prototype, prototypeAccessors );

		return defaultExport;
	}(three.Texture));

	return defaultExport;

})));
//# sourceMappingURL=THREE.TextTexture.js.map

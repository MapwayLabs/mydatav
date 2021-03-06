(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TMap"] = factory();
	else
		root["TMap"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/bounds.js":
/*!**********************!*\
  !*** ./js/bounds.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Bounds; });
class Bounds {
    constructor (xmin, ymin, xmax, ymax) {
        if (Array.isArray(xmin)) {
            this.xmin = xmin[0];
            this.xmax = ymin[0];
            this.ymin = xmin[1];
            this.ymax = ymin[1];
        } else {
            this.xmin = xmin;
            this.xmax = xmax;
            this.ymin = ymin;
            this.ymax = ymax;
        }
    }
    getWidth() {
        return Math.abs(this.xmax - this.xmin);
    }
    getHeight() {
        return Math.abs(this.ymax - this.ymin);
    }
    getCenter() {
        let tx = (this.xmax - this.xmin) / 2;
        let ty = (this.ymax - this.ymin) / 2;
        return [tx + this.xmin, ty + this.ymin];
    }
    scale(m) {
        this.xmin *= m;
        this.ymin *= m;
        this.xmax *= m;
        this.ymax *= m;
        return this;
    }
}

/***/ }),

/***/ "./js/color.js":
/*!*********************!*\
  !*** ./js/color.js ***!
  \*********************/
/*! exports provided: define, extend, Color, darker, brighter, default, rgbConvert, rgb, Rgb, hslConvert, hsl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "define", function() { return define; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darker", function() { return darker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brighter", function() { return brighter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbConvert", function() { return rgbConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rgb", function() { return Rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hslConvert", function() { return hslConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsl", function() { return hsl; });
// code from https://github.com/d3/d3-color
function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
}
  
function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
}
  
function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex3 = /^#([0-9a-f]{3})$/,
    reHex6 = /^#([0-9a-f]{6})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: function() {
    return this.rgb().hex();
  },
  toString: function() {
    return this.rgb() + "";
  }
});

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format])
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (0 <= this.r && this.r <= 255)
        && (0 <= this.g && this.g <= 255)
        && (0 <= this.b && this.b <= 255)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: function() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  },
  toString: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}


/***/ }),

/***/ "./js/eventemiter.js":
/*!***************************!*\
  !*** ./js/eventemiter.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventEmiter; });
class EventEmiter {
    constructor() {
        this._events = {};
    }

    on(event, cb, context) {
        context = context || this;
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                this.on(event[i], cb, context);
            }
        } else {
            (this._events[event] || (this._events[event] = [])).push({
                callback: cb,
                context: context
            });
        }
        return this;
    }

    once(event, cb, context) {
        context = context || this;
        var self = this;

        function on() {
            self.off(event, cb, context);
            cb.apply(context, arguments);
        }
        on.fn = cb;
        this.on(event, on, context);
        return this;
    }

    off(event, cb, context) {
        context = context || this;
        if (!arguments.length) {
            this._events = Object.create(null);
            return this;
        }
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                this.off(event[i], cb, context);
            }
            return this;
        }
        if (!cb) {
            this._events[event] = null;
            return this;
        }
        if (cb) {
            let cbs = this._events[event] || [];
            let i = cbs.length;
            while (i--) {
                if ((cb === cbs[i].callback || cb === cbs[i].fn) && context === cbs[i].context) {
                    cbs.splice(i, 1);
                    break;
                }
            }
            return this;
        }
    }

    emit(event) {
        let cbs = this._events[event];
        let args = Array.prototype.slice.call(arguments, 1);
        if (cbs) {
            for (let i = 0, l = cbs.length; i < l; i++) {
                cbs[i].callback.apply(cbs[i].context || this, args);
            }
        }
    }
}

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! exports provided: ThreeMap, GeoJSONLayer, GeoJSONLayer2, FlyLineLayer, BarLayer, TextLayer, mapHelper, Util, color, theme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _three_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./three-map */ "./js/three-map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThreeMap", function() { return _three_map__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _layers_geojson_layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layers/geojson-layer */ "./js/layers/geojson-layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GeoJSONLayer", function() { return _layers_geojson_layer__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _layers_geojson_layer2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layers/geojson-layer2 */ "./js/layers/geojson-layer2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GeoJSONLayer2", function() { return _layers_geojson_layer2__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _layers_flyline_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layers/flyline-layer */ "./js/layers/flyline-layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FlyLineLayer", function() { return _layers_flyline_layer__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _layers_bar_layer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layers/bar-layer */ "./js/layers/bar-layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BarLayer", function() { return _layers_bar_layer__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _layers_text_layer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layers/text-layer */ "./js/layers/text-layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextLayer", function() { return _layers_text_layer__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./maphelper */ "./js/maphelper.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mapHelper", function() { return _maphelper__WEBPACK_IMPORTED_MODULE_6__; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util */ "./js/util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return _util__WEBPACK_IMPORTED_MODULE_7__; });
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./color */ "./js/color.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "color", function() { return _color__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _theme_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./theme/index */ "./js/theme/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "theme", function() { return _theme_index__WEBPACK_IMPORTED_MODULE_9__; });






















/***/ }),

/***/ "./js/layers/bar-layer.js":
/*!********************************!*\
  !*** ./js/layers/bar-layer.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BarLayer; });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "./js/layers/layer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./js/util.js");
/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../maphelper */ "./js/maphelper.js");
/* harmony import */ var _text_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./text-layer */ "./js/layers/text-layer.js");





// 柱状图层
class BarLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor (data, options, geojsonLayer, tooltipHelper, bdpChart) {
        super(data, options);

        const defaultOptions = {
            // 柱子显示是否与底图 geojson 数据匹配。
            ///如果设置为 true，则会根据json数据来匹配 x 轴数据，只有匹配上的数据才会得到展示。
            isMatchGeoJson: true, 
            // 是否自动适配尺寸。如果设置为 true，配置项中的 depth\offset\scale 等尺寸会根据当前行政区来自动适配，用户传入的值就无效了。
            isAutoResize: true, 
            // 适配参数，仅当 isAutoResize 设置为 true 时有效。
            resizeParam: {
                barStyle: {
                    width: 0.5,
                    minHeight: 0.5,
                    maxHeight: 7,
                    bevelThickness: 0.1,
                    bevelSize: 0.08
                },
                barText: {
                    offset: 0.8,
                    textStyle: {
                        scale: 10
                    }
                }
            }, 
            barStyle: {
                width: 1, // 底边长
                minHeight: 3, // 最小高度
                maxHeight: 12, // 最大高度
                bevelThickness: 0.1,
                bevelSize: 0.08,
                bevelSegments: 100,
                defaultColor: ['#f00'],
                grandientColor: null,
                enumColor: null,
                opacity: 1
            },
            barText: {
                show: true,
                offset: 1,
                isAvoidCollision: true, // 是否避免文字碰撞
                textStyle: {
                    scale: 1,
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '16px',
                    fontFamily: 'Microsoft YaHei',
                    fontColor: '#000',
                    textAlign: 'center',
                    textBaseline: 'middle',
                    maxWidth: 512
                }
            },
            barTooltip: {
                show: true
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, defaultOptions, options);
        this.type = 'barLayer';
        this.geojsonLayer = geojsonLayer;

        this._barData = {
            data: null,
            vals: null,
            min: null,
            max: null
        };

        this._colorsData = {
            data: [],
            min: null,
            max: null
        };
        
        this._toolTipHelper = tooltipHelper;
        this.bdpChart = bdpChart;

        if (this.options.isAutoResize) {
            this._initResizeOptions();
        }
        this._initBarData();
        this._initColorData();
        this._initMinMax();
    }
    onAdd(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onAdd.call(this, map); 
        this._draw();
    }
    onRemove(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onRemove.call(this, map);
        this._textLayer && this._map.removeLayer(this._textLayer);
        if (this.options.barTooltip.show) {
            this._toolTipHelper && this._toolTipHelper.hideTooltip();
            this._map.off('mousemove', this._mousemoveEvtHandler, this);
        }
    }
    isMatch(featureIdVal, feature) {
        if (featureIdVal == null || feature == null || _util__WEBPACK_IMPORTED_MODULE_1__["isEmptyObject"](feature)) {
            return false;
        }
        featureIdVal = String(featureIdVal);
        if (featureIdVal === String(feature.id)) {
            return true;
        }
        let props = feature.properties;
        if (props == null || _util__WEBPACK_IMPORTED_MODULE_1__["isEmptyObject"](props)) {
            return false;
        }
        if ( featureIdVal === String(props.id) || new RegExp(props.name).test(featureIdVal)) {
            return true;
        }
        return false;
    }
    getFormattedVal(value) {
        if (!this.bdpChart) {return value;}
        // TODO: bdp
        let formattedVal = this.bdpChart.helper.dataLabelFormatter(this._data.y.formatter, value, this._data.y.aggregator);
        // 如果未设置单位，则使用自定义单位
        if (!this._data.y.formatter.num.unit || this._data.y.formatter.num.unit === '1') {
            formattedVal += this._data.y.unit_adv;
        }
        return formattedVal;
    }
    _initResizeOptions() {
        const ratio = this.geojsonLayer.getRatio();
        const resizeParam = this.options.resizeParam;
        this.options.barStyle.width = resizeParam.barStyle.width * ratio;
        this.options.barStyle.minHeight = resizeParam.barStyle.minHeight * ratio;
        this.options.barStyle.maxHeight = resizeParam.barStyle.maxHeight * ratio;
        this.options.barStyle.bevelThickness = resizeParam.barStyle.bevelThickness * ratio;
        this.options.barStyle.bevelSize = resizeParam.barStyle.bevelSize * ratio;
        this.options.barText.offset = resizeParam.barText.offset * ratio;
        this.options.barText.textStyle.scale = resizeParam.barText.textStyle.scale * ratio;
    }
    _initBarData() {
        if (this.options.isMatchGeoJson) {
            this._initMatchGeoBarData();
        } else {
            this._initNoMatchGeoBarData();
        }
    }
    _initNoMatchGeoBarData() {
        const x = this._data.x;
        const y = this._data.y;
        
        let barData = [];
        let vals = [];
        let xlength = x.data.length;
        for (let i = 0; i < xlength; i++) {
            // 如果有位置数据，使用位置数据
            let center;
            if (x.location_data && x.location_data.length) {
                center = [x.location_data[i].longitude, x.location_data[i].latitude];
            }
            if (!center) {
                continue;
            }
            let value = Number(y.data[i]);
            let tempobj = {
                name: x.data[i],
                xname: x.data[i],
                ylabelName: y.nick_name || y.name,
                index: i,
                center: center,
                value: value,
                formattedVal: this.getFormattedVal(value)
            };
            barData.push(tempobj);
            vals.push(value);
        }

        this._barData.data = barData;
        this._barData.vals = vals;
    }
    _initMatchGeoBarData() {
        const features = this.geojsonLayer.getFeatures();
        const x = this._data.x;
        const y = this._data.y;
        
        let barData = [];
        let vals = [];
        features.forEach(f => {
            let props = f.properties;
            let xlength = x.data.length;
            let i = 0;
            for (; i < xlength; i++) {
                if (f.geometry == null) break;
                let ismatch = this.isMatch(x.data[i], f);
                // 如果匹配到底图
                if (ismatch) {
                    // 如果有位置数据，使用位置数据
                    let center;
                    if (x.location_data && x.location_data.length) {
                        center = [x.location_data[i].longitude, x.location_data[i].latitude];
                    } else {
                        center = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getNormalizeCenter"](f);
                    }
                    let tempobj = {
                        id: props.id || f.id,
                        name: props.name,
                        xname: x.data[i],
                        ylabelName: y.nick_name || y.name,
                        index: i,
                        center: center,
                        value: Number(y.data[i])
                    };
                    tempobj.formattedVal = this.getFormattedVal(tempobj.value);
                    barData.push(tempobj);
                    vals.push(Number(tempobj.value));
                    // 给 feature 打上标签，表示在它之上有柱子
                    f.hasBarData = true;
                    break;
                }
            }
            // 当前 feature 上没有柱子
            if (i === xlength) {
                // 给 feature 打上标签，表示在它之上没有柱子
                f.hasBarData = false;
            }
        });

        this._barData.data = barData;
        this._barData.vals = vals;
    }
    _initColorData() {
        if (this._data.colors && this._data.colors.length) {
            let cData = [];
            this._barData.data.forEach(item => {
                let d = Number(this._data.colors[item.index]);
                cData.push(d);
            });
            this._colorsData.data = cData;
            this._colorsData.min = Math.min(...cData);
            this._colorsData.max = Math.max(...cData);
        } else {
            this._colorsData.data = this._barData.vals;
            this._colorsData.min = this._barData.min;
            this._colorsData.max = this._barData.max;
        }
    }
    _initMinMax() {
        if (this._barData.vals == null || !this._barData.vals.length) {return;}
        const min = Math.min(...this._barData.vals);
        const max = Math.max(...this._barData.vals);
        this._barData.min = min;
        this._barData.max = max;
    }
    getBarHeight(item) {
        let xmin = this._barData.min;
        let xmax = this._barData.max;
        let ymin = this.options.barStyle.minHeight;
        let ymax = this.options.barStyle.maxHeight;
        /**调整比例关系 只有两类数时，柱子高度成比例*/
        // 去重
        let datavals = this._barData.vals.filter((val, index, arr) => arr.indexOf(val)===index);
        if (datavals.length === 2 && xmax !== 0 && xmin !== 0 && xmax !== xmin) {
            let ratio = 0;
            if (xmax * xmin > 0) {
                if (xmin > 0) {
                    ratio = xmin / xmax;
                } else {
                    ratio = Math.abs(xmax / xmin);
                }
            } else {
                ratio = 1 / (xmax - xmin);
            }
            ymin = Math.max(ymax * ratio, ymin);
        }
        let barHeight = _util__WEBPACK_IMPORTED_MODULE_1__["normalizeValue"](item.value, xmin, xmax, ymin, ymax, 0);
        return barHeight;
    }
    getBarColor(item, index) {
        const barStyle = this.options.barStyle;
        let color = "#fff";
        let cLen = barStyle.defaultColor.length;
        if (barStyle.grandientColor) {
            let xmin = this._colorsData.min;
            let xmax = this._colorsData.max;
            let ymin = 1;
            let ymax = 256;
            let num = _util__WEBPACK_IMPORTED_MODULE_1__["normalizeValue"](this._colorsData.data[index], xmin, xmax, ymin, ymax, 1);
            if (isNaN(num)) {
                throw new Error('柱形图颜色计算错误！');
            }
            color = this.getInterPolateColor(num, barStyle.grandientColor);
        } else if (barStyle.enumColor) {
           let enumcolor = barStyle.enumColor[item.name] || barStyle.enumColor[item.id];
           color = enumcolor && enumcolor.color;
           if(!color){
            color = barStyle.defaultColor[index % cLen]
           }
        } else {
            color = barStyle.defaultColor[index % cLen]
        }
        return color;
    }
    getInterPolateColor(num, g) {
        num = Math.round(num);
        g = g || [
            { value: 1, color: '#EF6064'},
            { value: 0, color: '#FFA9A9'}
        ]
        if (this._imgData == null) {
            const canvas = document.createElement('canvas');
            canvas.height = 1;
            canvas.width = 256;
            const ctx = canvas.getContext('2d');
            const grandient = ctx.createLinearGradient(0, 0, 256, 0);
            g.forEach(item => {
                grandient.addColorStop(item.value, item.color);
            })
            ctx.fillStyle = grandient;
            ctx.fillRect(0, 0, 256, 1);
            this._imgData = ctx.getImageData(0, 0, 256, 1).data;
        }
        return `rgba(${this._imgData[4 * (num-1)]},${this._imgData[4 * (num-1)+1]},${this._imgData[4 * (num-1)+2]},${this._imgData[4 * (num-1)+3]})`
    }
    _draw() {
        if (this._barData.data == null || !this._barData.data.length) {return;}
        this._barData.data.forEach((item, index) => {
            let barHeight = this.getBarHeight(item);
            let barColor = this.getBarColor(item, index);
            let yoffset = this.geojsonLayer ? this.geojsonLayer.getDepth() : 0;
            // let projCenter = this._map.projectLngLat(item.center);
            let bar = this._createBar(item.center, barHeight, barColor, yoffset);
            bar.userData = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, {type: 'bar'}, item);
            this._container.add(bar);   
        });
        if (this.options.barText.show) {
            this._addTextLayer();
        } 
        if (this.options.isMatchGeoJson) {
            this.geojsonLayer.updateLabels(this);
        }
        if (this.options.barTooltip.show) {
            this._map.on('mousemove', this._mousemoveEvtHandler, this);
        }
    }
    _mousemoveEvtHandler(event) {
        const mapSize = this._map.getContainerSize();
        const camera = this._map.getCamera();
        const sx = event.offsetX; 
        const sy = event.offsetY;
        const cx = event.clientX;
        const cy = event.clientY;
        //屏幕坐标转标准设备坐标
        const x = (sx / mapSize.width) * 2 - 1; 
        const y = -(sy / mapSize.height) * 2 + 1;
        //标准设备坐标
        const standardVector = new THREE.Vector3(x, y, 0.5); 
        //标准设备坐标转世界坐标
        const worldVector = standardVector.unproject(camera);
        //射线投射方向单位向量(worldVector坐标减相机位置坐标)
        const ray = worldVector.sub(camera.position).normalize();
        //创建射线投射器对象
        const raycaster = new THREE.Raycaster(camera.position, ray);
        //返回射线选中的对象
        const intersects = raycaster.intersectObjects(this._container.children);
      
        // 避免连续选中
        if (this._currentSelectObj) {
            // this._currentSelectObj.material.transparent = false;
            this._currentSelectObj.material.opacity = this._currentSelectObj.userData.oldOpacity;
            this._currentSelectObj = null;
            this._toolTipHelper && this._toolTipHelper.hideTooltip(); // TODO: bdp
        }

        for (var i = 0; i < intersects.length; i++) {
            let object = intersects[i].object;
            let udata = object.userData;
            if (udata && udata.type === 'bar') {
                let color = object.material.color.getHexString();
                udata.oldOpacity = object.material.opacity;
                // object.material.transparent = true;
                object.material.opacity = 1;
                this._currentSelectObj = object;
                
                let content = `
                    <div class="mb4" style="text-align:center;">${udata['name']}</div>
                    <div style="color:#${color};"><span>${udata['ylabelName']}：</span> ${udata['formattedVal']}</div>
                `;
                // console.log(udata.name);
                this._toolTipHelper && this._toolTipHelper.showTooltip(cx, cy, content); // TODO: bdp
                break;
            }
        }
        if (i === intersects.length) {
            if (this._currentSelectObj) {
                // this._currentSelectObj.material.transparent = false;
                this._currentSelectObj.material.opacity = this._currentSelectObj.userData.oldOpacity;
                this._currentSelectObj = null;
                this._toolTipHelper && this._toolTipHelper.hideTooltip(); // TODO: bdp
            }
        }
    }
    _createBar(center, height, color, yoffset) {
        const barStyle = this.options.barStyle;
        const halfWidth = barStyle.width / 2;

        const shape = new THREE.Shape();
        shape.moveTo(-halfWidth, -halfWidth);
        shape.lineTo(-halfWidth, halfWidth);
        shape.lineTo(halfWidth, halfWidth);
        shape.lineTo(halfWidth, -halfWidth);
        shape.lineTo(-halfWidth, -halfWidth);
  
        const extrudeSettings = {
          curveSegments: 0,
          steps: 0,
          depth: height,
          bevelEnabled: true,
          bevelThickness: barStyle.bevelThickness,
          bevelSize: barStyle.bevelSize,
          bevelSegments: barStyle.bevelSegments
        };
        const geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        const material = new THREE.MeshPhongMaterial({ color: color });
        if (barStyle.opacity < 1) {
            material.transparent = true;
            material.opacity = barStyle.opacity;
        }
        const mesh = new THREE.Mesh(geometry, material);
        let lnglat = [center[0], center[1], yoffset];
        let projCenter = this._map.projectLngLat(lnglat);

        if (this._map.options.type === 'plane') {
            mesh.position.set(projCenter[0], projCenter[2], -projCenter[1]);
            mesh.rotateX(-Math.PI / 2);
        } else { 
            // 变换柱子，让其与球面垂直
            // 先沿 Y 轴旋转，零度经线为z轴正半轴
            mesh.rotateY(THREE.Math.degToRad(center[0]));
            // 坐标在xz平面投影向量
            let v1 = new THREE.Vector3(projCenter[0], 0, projCenter[2]).normalize();
            // y轴方向向量
            let v2 = new THREE.Vector3(0, 1, 0).normalize();
            // 原始坐标向量
            let v3 = new THREE.Vector3(projCenter[0], projCenter[1], projCenter[2]).normalize();
             // 法向量，clone防止原始向量被更改
            let v = v1.clone().cross(v2.clone()).normalize();
            // 旋转角
            let deg = v1.angleTo(v3);
            if (center[1] < 0) {
                deg = -deg;
            }
            // 沿着法向量旋转纬度角，注意相对于世界坐标系
            mesh.rotateOnWorldAxis(v, deg);
            // 将柱子放到球面上
            mesh.position.set(projCenter[0], projCenter[1], projCenter[2]);
        }
        // mesh.renderOrder = 90;
        // mesh.material.depthTest=false; // 是否采用深度测试，必须加
        return mesh;
    }
    _addTextLayer() {
        let textData = [];
        this._barData.data.forEach((item, index) => {
            let barHeight = this.getBarHeight(item);
            let yoffset = this.geojsonLayer ? this.geojsonLayer.getDepth() : 0;
            let tempobj = {};
            // tempobj.text = item.formattedVal;
            tempobj.text = item.value;
            tempobj.center = item.center;
            tempobj.altitude = barHeight + yoffset + this.options.barText.offset;
            textData.push(tempobj);
        });
        const options = {
            isAvoidCollision: this.options.barText.isAvoidCollision,
            textStyle: this.options.barText.textStyle
        };
        this._textLayer = new _text_layer__WEBPACK_IMPORTED_MODULE_3__["default"](textData, options);
        this._map.addLayer(this._textLayer);
    }
}

/***/ }),

/***/ "./js/layers/custom-meshline.js":
/*!**************************************!*\
  !*** ./js/layers/custom-meshline.js ***!
  \**************************************/
/*! exports provided: MeshLine, MeshLineMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeshLine", function() { return MeshLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeshLineMaterial", function() { return MeshLineMaterial; });
// code from: https://github.com/spite/THREE.MeshLine
// I modify the shader code to display flyline effect.
function MeshLine() {

	this.positions = [];

	this.previous = [];
	this.next = [];
	this.side = [];
	this.width = [];
	this.indices_array = [];
	this.uvs = [];
	this.counters = [];
	this.geometry = new THREE.BufferGeometry();

	this.widthCallback = null;

}

MeshLine.prototype.setGeometry = function( g, c ) {

	this.widthCallback = c;

	this.positions = [];
	this.counters = [];

	if( g instanceof THREE.Geometry ) {
		for( var j = 0; j < g.vertices.length; j++ ) {
			var v = g.vertices[ j ];
			var c = j/g.vertices.length;
			this.positions.push( v.x, v.y, v.z );
			this.positions.push( v.x, v.y, v.z );
			this.counters.push(c);
			this.counters.push(c);
		}
	}

	if( g instanceof THREE.BufferGeometry ) {
		// read attribute positions ?
	}

	if( g instanceof Float32Array || g instanceof Array ) {
		for( var j = 0; j < g.length; j += 3 ) {
			var c = j/g.length;
			this.positions.push( g[ j ], g[ j + 1 ], g[ j + 2 ] );
			this.positions.push( g[ j ], g[ j + 1 ], g[ j + 2 ] );
			this.counters.push(c);
			this.counters.push(c);
		}
	}

	this.process();

}

MeshLine.prototype.compareV3 = function( a, b ) {

	var aa = a * 6;
	var ab = b * 6;
	return ( this.positions[ aa ] === this.positions[ ab ] ) && ( this.positions[ aa + 1 ] === this.positions[ ab + 1 ] ) && ( this.positions[ aa + 2 ] === this.positions[ ab + 2 ] );

}

MeshLine.prototype.copyV3 = function( a ) {

	var aa = a * 6;
	return [ this.positions[ aa ], this.positions[ aa + 1 ], this.positions[ aa + 2 ] ];

}

MeshLine.prototype.process = function() {

	var l = this.positions.length / 6;

	this.previous = [];
	this.next = [];
	this.side = [];
	this.width = [];
	this.indices_array = [];
	this.uvs = [];

	for( var j = 0; j < l; j++ ) {
		this.side.push( 1 );
		this.side.push( -1 );
	}

	var w;
	for( var j = 0; j < l; j++ ) {
		if( this.widthCallback ) w = this.widthCallback( j / ( l -1 ) );
		else w = 1;
		this.width.push( w );
		this.width.push( w );
	}

	for( var j = 0; j < l; j++ ) {
		this.uvs.push( j / ( l - 1 ), 0 );
		this.uvs.push( j / ( l - 1 ), 1 );
	}

	var v;

	if( this.compareV3( 0, l - 1 ) ){
		v = this.copyV3( l - 2 );
	} else {
		v = this.copyV3( 0 );
	}
	this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
	this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
	for( var j = 0; j < l - 1; j++ ) {
		v = this.copyV3( j );
		this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
		this.previous.push( v[ 0 ], v[ 1 ], v[ 2 ] );
	}

	for( var j = 1; j < l; j++ ) {
		v = this.copyV3( j );
		this.next.push( v[ 0 ], v[ 1 ], v[ 2 ] );
		this.next.push( v[ 0 ], v[ 1 ], v[ 2 ] );
	}

	if( this.compareV3( l - 1, 0 ) ){
		v = this.copyV3( 1 );
	} else {
		v = this.copyV3( l - 1 );
	}
	this.next.push( v[ 0 ], v[ 1 ], v[ 2 ] );
	this.next.push( v[ 0 ], v[ 1 ], v[ 2 ] );

	for( var j = 0; j < l - 1; j++ ) {
		var n = j * 2;
		this.indices_array.push( n, n + 1, n + 2 );
		this.indices_array.push( n + 2, n + 1, n + 3 );
	}

	if (!this.attributes) {
		this.attributes = {
			position: new THREE.BufferAttribute( new Float32Array( this.positions ), 3 ),
			previous: new THREE.BufferAttribute( new Float32Array( this.previous ), 3 ),
			next: new THREE.BufferAttribute( new Float32Array( this.next ), 3 ),
			side: new THREE.BufferAttribute( new Float32Array( this.side ), 1 ),
			width: new THREE.BufferAttribute( new Float32Array( this.width ), 1 ),
			uv: new THREE.BufferAttribute( new Float32Array( this.uvs ), 2 ),
			index: new THREE.BufferAttribute( new Uint16Array( this.indices_array ), 1 ),
			counters: new THREE.BufferAttribute( new Float32Array( this.counters ), 1 )
		}
	} else {
		this.attributes.position.copyArray(new Float32Array(this.positions));
		this.attributes.position.needsUpdate = true;
		this.attributes.previous.copyArray(new Float32Array(this.previous));
		this.attributes.previous.needsUpdate = true;
		this.attributes.next.copyArray(new Float32Array(this.next));
		this.attributes.next.needsUpdate = true;
		this.attributes.side.copyArray(new Float32Array(this.side));
		this.attributes.side.needsUpdate = true;
		this.attributes.width.copyArray(new Float32Array(this.width));
		this.attributes.width.needsUpdate = true;
		this.attributes.uv.copyArray(new Float32Array(this.uvs));
		this.attributes.uv.needsUpdate = true;
		this.attributes.index.copyArray(new Uint16Array(this.indices_array));
		this.attributes.index.needsUpdate = true;
    }

	this.geometry.addAttribute( 'position', this.attributes.position );
	this.geometry.addAttribute( 'previous', this.attributes.previous );
	this.geometry.addAttribute( 'next', this.attributes.next );
	this.geometry.addAttribute( 'side', this.attributes.side );
	this.geometry.addAttribute( 'width', this.attributes.width );
	this.geometry.addAttribute( 'uv', this.attributes.uv );
	this.geometry.addAttribute( 'counters', this.attributes.counters );

	this.geometry.setIndex( this.attributes.index );

}

function memcpy (src, srcOffset, dst, dstOffset, length) {
	var i

	src = src.subarray || src.slice ? src : src.buffer
	dst = dst.subarray || dst.slice ? dst : dst.buffer

	src = srcOffset ? src.subarray ?
	src.subarray(srcOffset, length && srcOffset + length) :
	src.slice(srcOffset, length && srcOffset + length) : src

	if (dst.set) {
		dst.set(src, dstOffset)
	} else {
		for (i=0; i<src.length; i++) {
			dst[i + dstOffset] = src[i]
		}
	}

	return dst
}

/**
 * Fast method to advance the line by one position.  The oldest position is removed.
 * @param position
 */
MeshLine.prototype.advance = function(position) {

	var positions = this.attributes.position.array;
	var previous = this.attributes.previous.array;
	var next = this.attributes.next.array;
	var l = positions.length;

	// PREVIOUS
	memcpy( positions, 0, previous, 0, l );

	// POSITIONS
	memcpy( positions, 6, positions, 0, l - 6 );

	positions[l - 6] = position.x;
	positions[l - 5] = position.y;
	positions[l - 4] = position.z;
	positions[l - 3] = position.x;
	positions[l - 2] = position.y;
	positions[l - 1] = position.z;

    // NEXT
	memcpy( positions, 6, next, 0, l - 6 );

	next[l - 6]  = position.x;
	next[l - 5]  = position.y;
	next[l - 4]  = position.z;
	next[l - 3]  = position.x;
	next[l - 2]  = position.y;
	next[l - 1]  = position.z;

	this.attributes.position.needsUpdate = true;
	this.attributes.previous.needsUpdate = true;
	this.attributes.next.needsUpdate = true;

};

function MeshLineMaterial( parameters ) {

	var vertexShaderSource = [
'precision highp float;',
'',
'attribute vec3 position;',
'attribute vec3 previous;',
'attribute vec3 next;',
'attribute float side;',
'attribute float width;',
'attribute vec2 uv;',
'attribute float counters;',
'attribute float dist;',
'attribute float distAll;',
'attribute float start;',
'',
'uniform mat4 projectionMatrix;',
'uniform mat4 modelViewMatrix;',
'uniform vec2 resolution;',
'uniform float lineWidth;',
'uniform vec3 color;',
'uniform float opacity;',
'uniform float near;',
'uniform float far;',
'uniform float sizeAttenuation;',
'uniform float speed;',
'uniform float trailLength;',
'uniform float time;',
'uniform float period;',
'uniform float spotSize;',
'uniform bool hasEffect;',
'uniform bool isFlyBaseLine;',
'',
'varying vec2 vUV;',
'varying vec4 vColor;',
'varying float vCounters;',
'varying float v_Percent;',
'',
'vec2 fix( vec4 i, float aspect ) {',
'',
'    vec2 res = i.xy / i.w;',
'    res.x *= aspect;',
'	 vCounters = counters;',
'    return res;',
'',
'}',
'',
'void main() {',
'',
'    float aspect = resolution.x / resolution.y;',
'	 float pixelWidthRatio = 1. / (resolution.x * projectionMatrix[0][0]);',
'',
'    vColor = vec4( color, opacity );',
'    vUV = uv;',
'',
'    mat4 m = projectionMatrix * modelViewMatrix;',
'    vec4 finalPosition = m * vec4( position, 1.0 );',
'    vec4 prevPos = m * vec4( previous, 1.0 );',
'    vec4 nextPos = m * vec4( next, 1.0 );',
'',
'    vec2 currentP = fix( finalPosition, aspect );',
'    vec2 prevP = fix( prevPos, aspect );',
'    vec2 nextP = fix( nextPos, aspect );',
'',
'	 float pixelWidth = finalPosition.w * pixelWidthRatio;',
'    float w = 1.8 * pixelWidth * lineWidth * width;',
'',
'    if( sizeAttenuation == 1. ) {',
'        w = 1.8 * lineWidth * width;',
'    }',
'',
'    vec2 dir;',
'    if( nextP == currentP ) dir = normalize( currentP - prevP );',
'    else if( prevP == currentP ) dir = normalize( nextP - currentP );',
'    else {',
'        vec2 dir1 = normalize( currentP - prevP );',
'        vec2 dir2 = normalize( nextP - currentP );',
'        dir = normalize( dir1 + dir2 );',
'',
'        vec2 perp = vec2( -dir1.y, dir1.x );',
'        vec2 miter = vec2( -dir.y, dir.x );',
'        //w = clamp( w / dot( miter, perp ), 0., 4. * lineWidth * width );',
'',
'    }',
'',
'    //vec2 normal = ( cross( vec3( dir, 0. ), vec3( 0., 0., 1. ) ) ).xy;',
'    vec2 normal = vec2( -dir.y, dir.x );',
'    normal.x /= aspect;',
'    normal *= .5 * w;',
'',
'    vec4 offset = vec4( normal * side, 0.0, 1.0 );',
'    finalPosition.xy += offset.xy;',
'',
'    gl_Position = finalPosition;',

'if (hasEffect) {',
	'#ifdef CONSTANT_SPEED',
	'',
	'float t = mod((speed * time + start) / distAll, 1. + trailLength) - trailLength;',
	'#else',
	'',
	'float t = mod((time + start) / period, 1. + trailLength) - trailLength;',
	'#endif',
	'',
	'float trailLen = distAll * trailLength;',
	'v_Percent = (dist - t * distAll) / trailLen;',
'} ',
'}' ];

	var fragmentShaderSource = [
'#extension GL_OES_standard_derivatives : enable',
'precision mediump float;',
'',
'uniform sampler2D map;',
'uniform sampler2D alphaMap;',
'uniform float useMap;',
'uniform float useAlphaMap;',
'uniform float useDash;',
'uniform float dashArray;',
'uniform float dashOffset;',
'uniform float dashRatio;',
'uniform float visibility;',
'uniform float alphaTest;',
'uniform vec2 repeat;',
'uniform bool hasEffect;',
'uniform bool isFlyBaseLine;',
'uniform vec4 baseColor;',
'',
'varying vec2 vUV;',
'varying vec4 vColor;',
'varying float vCounters;',
'varying float v_Percent;',
'',
'void main() {',
'',
'if (hasEffect){',
	'if (v_Percent > 1.0 || v_Percent < 0.0) {',
	    'discard;',
	'}',
	'float fade = v_Percent;',
	'#ifdef SRGB_DECODE',
	'',
	'gl_FragColor = sRGBToLinear(baseColor * vColor);',
	'#else',
	'',
	'gl_FragColor = baseColor * vColor;',
	'#endif',
	'', 
	// fix：设置定时播放时，底线也随之消隐问题
	'if( isFlyBaseLine ) { gl_FragColor.a *= 1.0; } else { gl_FragColor.a *= fade; }',
	// 'gl_FragColor.a *= fade;',
'} else {',
'    vec4 c = vColor;',
'    if( useMap == 1. ) c *= texture2D( map, vUV * repeat );',
'    if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV * repeat ).a;',
'    if( c.a < alphaTest ) discard;',
'    if( useDash == 1. ){',
'        c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));',
'    }',
'    gl_FragColor = c;',
'    gl_FragColor.a *= step(vCounters, visibility);',
'}',
'}' ];

	function check( v, d ) {
		if( v === undefined ) return d;
		return v;
	}

	THREE.Material.call( this );

	parameters = parameters || {};

	this.lineWidth = check( parameters.lineWidth, 1 );
	this.map = check( parameters.map, null );
	this.useMap = check( parameters.useMap, 0 );
	this.alphaMap = check( parameters.alphaMap, null );
	this.useAlphaMap = check( parameters.useAlphaMap, 0 );
	this.color = check( parameters.color, new THREE.Color( 0xffffff ) );
	this.opacity = check( parameters.opacity, 1 );
	this.resolution = check( parameters.resolution, new THREE.Vector2( 1, 1 ) );
	this.sizeAttenuation = check( parameters.sizeAttenuation, 1 );
	this.near = check( parameters.near, 1 );
	this.far = check( parameters.far, 1 );
	this.dashArray = check( parameters.dashArray, 0 );
	this.dashOffset = check( parameters.dashOffset, 0 );
	this.dashRatio = check( parameters.dashRatio, 0.5 );
	this.useDash = ( this.dashArray !== 0 ) ? 1 : 0;
	this.visibility = check( parameters.visibility, 1 );
	this.alphaTest = check( parameters.alphaTest, 0 );
	this.repeat = check( parameters.repeat, new THREE.Vector2( 1, 1 ) );
	this.isFlyBaseLine = check( parameters.isFlyBaseLine, 0 );

	var material = new THREE.RawShaderMaterial( {
		uniforms:{
			lineWidth: { type: 'f', value: this.lineWidth },
			map: { type: 't', value: this.map },
			useMap: { type: 'f', value: this.useMap },
			alphaMap: { type: 't', value: this.alphaMap },
			useAlphaMap: { type: 'f', value: this.useAlphaMap },
			color: { type: 'c', value: this.color },
			opacity: { type: 'f', value: this.opacity },
			resolution: { type: 'v2', value: this.resolution },
			sizeAttenuation: { type: 'f', value: this.sizeAttenuation },
			near: { type: 'f', value: this.near },
			far: { type: 'f', value: this.far },
			dashArray: { type: 'f', value: this.dashArray },
			dashOffset: { type: 'f', value: this.dashOffset },
			dashRatio: { type: 'f', value: this.dashRatio },
			useDash: { type: 'f', value: this.useDash },
			visibility: {type: 'f', value: this.visibility},
			alphaTest: {type: 'f', value: this.alphaTest},
			repeat: { type: 'v2', value: this.repeat },
			isFlyBaseLine: { type: 'b', value: this.isFlyBaseLine }
		},
		vertexShader: vertexShaderSource.join( '\r\n' ),
        fragmentShader: fragmentShaderSource.join( '\r\n' ),
        // 如果不透明度低于此值，则不会渲染材质。默认值为0。
        // 此处避免出现白色尾线
		transparent: true,
        alphaTest: 0.8
	});

	delete parameters.lineWidth;
	delete parameters.map;
	delete parameters.useMap;
	delete parameters.alphaMap;
	delete parameters.useAlphaMap;
	delete parameters.color;
	delete parameters.opacity;
	delete parameters.resolution;
	delete parameters.sizeAttenuation;
	delete parameters.near;
	delete parameters.far;
	delete parameters.dashArray;
	delete parameters.dashOffset;
	delete parameters.dashRatio;
	delete parameters.visibility;
	delete parameters.alphaTest;
	delete parameters.repeat;
	delete parameters.isFlyBaseLine;

	material.type = 'MeshLineMaterial';

	material.setValues( parameters );

	return material;

};

MeshLineMaterial.prototype = Object.create( THREE.Material.prototype );
MeshLineMaterial.prototype.constructor = MeshLineMaterial;

MeshLineMaterial.prototype.copy = function ( source ) {

	THREE.Material.prototype.copy.call( this, source );

	this.lineWidth = source.lineWidth;
	this.map = source.map;
	this.useMap = source.useMap;
	this.alphaMap = source.alphaMap;
	this.useAlphaMap = source.useAlphaMap;
	this.color.copy( source.color );
	this.opacity = source.opacity;
	this.resolution.copy( source.resolution );
	this.sizeAttenuation = source.sizeAttenuation;
	this.near = source.near;
	this.far = source.far;
	this.dashArray.copy( source.dashArray );
	this.dashOffset.copy( source.dashOffset );
	this.dashRatio.copy( source.dashRatio );
	this.useDash = source.useDash;
	this.visibility = source.visibility;
	this.alphaTest = source.alphaTest;
	this.repeat.copy( source.repeat );

	return this;

};

/***/ }),

/***/ "./js/layers/flyline-layer.js":
/*!************************************!*\
  !*** ./js/layers/flyline-layer.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FlyLineLayer; });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "./js/layers/layer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./js/util.js");
/* harmony import */ var _custom_meshline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-meshline */ "./js/layers/custom-meshline.js");
/* harmony import */ var _point_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./point-layer */ "./js/layers/point-layer.js");


// import { lineShader } from './shader/line';



// 飞线图层
class FlyLineLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(data, options, geojsonLayer) {
        super(data, options);
        const defaultOptions = {
            heightLimit: 30, // 飞线最高点高度
            lngMaxRange: 60, // 经度间隔大于该值时需插入一个点
            // 线样式
            lineStyle: {
                show: true,
                color: '#0f0',
                opacity: 0.5,
                width: 1
            },
            pointStyle: {
                show: false,
                size: 3,
                texture: '../../images/disc.png', //  url or null
                color: '#0f0',
                opacity: 1,
                tooltip: true,
                hightLight: true,
                hightLightColor: '#f00',
                pointText: {
                    show: false,
                    showField: 'name',
                    yoffset: 1,
                    textStyle: {
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: '12px',
                        fontFamily: 'Microsoft YaHei',
                        fontColor: '#000',
                        textAlign: 'center',
                        textBaseline: 'middle'
                    }
                }
            },
            // 飞线特效样式
            effect: {
                show: false,
                segmentNumber: 1, // 飞线分段数，自然数，默认为1，不分段
                period: 4, // 尾迹特效的周期
                constantSpeed: null, // 尾迹特效是否是固定速度，设置后忽略period值
                trailWidth: 4, // 尾迹宽度
                trailLength: 0.1, // 尾迹长度，范围 0-1，为线条长度百分比
                trailColor: null, // 尾迹颜色，默认跟线颜色相同
                trailOpacity: null, // 尾迹不透明度，默认跟线相同
                spotIntensity: 5.0 // 头部高亮部分强度（TODO:暂时不可用）
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, defaultOptions, options);

        this.type = 'flyLineLayer';

        this.geojsonLayer = geojsonLayer;

        this.uniforms = {
            baseColor: {value: [1.0, 1.0, 1.0, 1.0]},
            time: {value: 0},
            speed: {value: 0},
            period: {value: 5000},
            trailLength: {value:1.0},
            spotSize: {value: 10.0},
            spotIntensity: {value: 5.0},
            hasEffect: { value: 0 }
        };
        this._maxDistance = 0;
        this._pointsData = [];
        this.animate();
    }
    onAdd(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onAdd.call(this, map); 
        this._draw();
        this._drawPoints();
    }
    onRemove(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onRemove.call(this, map);
        if (this._animateId) {
            window.cancelAnimationFrame(this._animateId);
        }
        if (this._pointLayer) {
            this._map.removeLayer(this._pointLayer);
        }
    }
    animate(time) {
        this._animateId = requestAnimationFrame(this.animate.bind(this));
        this.uniforms.time.value  = time;
    }
    _draw() {
        let depth = this.geojsonLayer ? this.geojsonLayer.getDepth() : 0;
        let heightLimit = this.options.heightLimit;
        this._data.forEach(item => {
            let fname = item.from.data;
            let tname = item.to.data;
            let startLnglat = item.from.location.split(',').map(p => Number(p));
            let endLnglat = item.to.location.split(',').map(p => Number(p));
            let keyLngLats = this._getKeyLngLats(startLnglat, endLnglat);
            
            // 处理第三个坐标海拔高度
            let len = keyLngLats.length;
            for (let i = 0; i < len; i++) {
                let lnglat = keyLngLats[i];
                if (i === 0 || i === len-1) { // 起点和终点
                    if(this._map.options.type === 'plane') {
                        lnglat.push(depth);
                    } else {
                        lnglat.push(0);
                    }
                } else { // 中间点
                    if(this._map.options.type === 'plane') {
                        lnglat.push(heightLimit + depth);
                    } else {
                        lnglat.push(heightLimit);
                    }
                }
            }
            
            // 投影到三维坐标
            let projPoints = keyLngLats.map(lnglat => this._map.projectLngLat(lnglat));
            
            // 绘制
            if (this.options.lineStyle.show) {
                this._drawLine2(projPoints);
            }
            if (this.options.effect.show) {
                this.uniforms.hasEffect.value = 1;
                this._drawFlyLine(projPoints);
            }

            // 处理飞线点
            if (this.options.pointStyle.show) {
                let fromLngLat = keyLngLats[0];
                let toLngLat = keyLngLats[len-1];
                if(this._map.options.type === 'sphere') {
                    const size = this.options.pointStyle.size;
                    fromLngLat[2] = size/2;
                    toLngLat[2] = size/2;
                }
                let tempPt1 = {
                    points: [fromLngLat],
                    info: { name: fname}
                };
                let tempPt2 = {
                    points: [toLngLat],
                    info: { name: tname }
                };
                this._addPoints(tempPt1, tempPt2);
            }
        });
    }
    // 获取中心点经纬度，考虑大圆航线
    _getKeyLngLats(f, t) {
        const keyPoints = [];
        
        // 插入起点
        keyPoints.push(f);

        // 插入中间点
        if (this._map.options.type === 'plane') {
            keyPoints.push([(f[0]+t[0])/2, (f[1]+t[1])/2]);
        } else {
            // 处理球面中间点
            const interpolatePoint = (lPt, rPt) => {
                // 计算中间最高点经纬度
                let mPt, mLng, mLat;
                const lngDiff = Math.abs(lPt[0]-rPt[0]);
                let calculateLngDiff;
                if (lngDiff > 180) {
                    mLng = (lPt[0]+360+rPt[0])/2;
                    calculateLngDiff = lPt[0] > 0 ? Math.abs(lPt[0]-360-rPt[0]) : Math.abs(lPt[0]+360-rPt[0]);
                } else {
                    mLng = (lPt[0]+rPt[0])/2;
                    calculateLngDiff = lngDiff;
                }
                mLat = (lPt[1]+rPt[1])/2;
                mPt = [mLng, mLat];
    
                // 经度间隔大于 LNG_STEP 度插入一个点
                const LNG_STEP = this.options.lngMaxRange;
                if(calculateLngDiff > LNG_STEP) {
                    interpolatePoint(lPt, mPt);
                    keyPoints.push(mPt);
                    interpolatePoint(mPt, rPt);
                } else {
                    // 至少插入一个点
                    if (keyPoints.length < 3) {
                        keyPoints.push(mPt);
                    }
                }
            }
            interpolatePoint(f, t);
        }

        // 插入终点
        keyPoints.push(t);

        return keyPoints;
    }
    _addPoints() {
        let ptArr = Array.from(arguments);
        ptArr.forEach(ptObj => {
            this._addPoint(ptObj);
        });
    }
    _addPoint(ptObj) {
        // 去重
        let hasAdd = this._pointsData.some(item => {
            let srcPt = item.points[0];
            let targetPt = ptObj.points[0];
            return srcPt[0] === targetPt[0] && srcPt[1] === targetPt[1];
        });
        if (!hasAdd) {
            this._pointsData.push(ptObj);
        }
    }
    _drawPoints() {
        if (!this.options.pointStyle.show || !this._pointsData.length) {
            return;
        }
        const pointStyle = this.options.pointStyle;
        const pointOptions = {
            size: pointStyle.size,
            style: {
                texture: pointStyle.texture, //  url or null
                color: pointStyle.color,
                opacity: pointStyle.opacity,
            },
            tooltip: {
                show: !!pointStyle.tooltip
            },
            hightLight: {
                show: !!pointStyle.hightLight,
                color: pointStyle.hightLightColor
            },
            pointText: pointStyle.pointText
        };
        this._pointLayer = new _point_layer__WEBPACK_IMPORTED_MODULE_3__["default"](this._pointsData, pointOptions);
        this._map.addLayer(this._pointLayer);
    }
    _getCurve(keyPoints) { 
        const pointVectors = keyPoints.map(point => new THREE.Vector3(point[0], point[1], point[2]));
        return new THREE.CatmullRomCurve3(pointVectors);;
    }

    _drawLine(startPoint, endPoint, midPoint) {  
        const curve = this._getCurve(startPoint, endPoint, midPoint);
        const points = curve.getPoints( 50 );
        let geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        let options = {
            color: this.options.lineStyle.color,
            linewidth: this.options.lineStyle.width
        };
        let material = new THREE.LineBasicMaterial( options );
        material.transparent = true;
        material.opacity = this.options.lineStyle.opacity;
        
        // Create the final object to add to the scene
        let curveObject = new THREE.Line( geometry, material );
        if (this._map.options.type === 'plane') {
            curveObject.rotateX(-Math.PI/2);
        }
        
        this._container.add(curveObject);

    }
    // 此方法绘制的线条可设置宽度
    _drawLine2(keyPoints) {  
        const size = this._map.getContainerSize();
        const curve = this._getCurve(keyPoints);
        const points = curve.getPoints( 50 );

        const geometry = new THREE.Geometry().setFromPoints( points );
        
        const line = new _custom_meshline__WEBPACK_IMPORTED_MODULE_2__["MeshLine"]();
        line.setGeometry(geometry);

        const resolution = new THREE.Vector2(size.width, size.height);
        const lineColor = new THREE.Color(this.options.lineStyle.color);
        const opacity = this.options.lineStyle.opacity;
        const shaderMaterial = new _custom_meshline__WEBPACK_IMPORTED_MODULE_2__["MeshLineMaterial"]({
            resolution: resolution,
            color: lineColor,
            opacity: opacity,
            sizeAttenuation: false,
            isFlyBaseLine: true, // fix：设置定时播放时，底线也随之消隐问题
            lineWidth: this.options.lineStyle.width
        });

        const lineMesh = new THREE.Mesh(line.geometry, shaderMaterial);
        if (this._map.options.type === 'plane') {
            lineMesh.rotateX(-Math.PI/2);
        }
        
        this._container.add(lineMesh);
    }
    _drawFlyLine(keyPoints) {
        const curve = this._getCurve(keyPoints);
        const points = curve.getPoints(50);
        let segmentNum = this.options.effect.segmentNumber;
        if (segmentNum <= 1) {
            // 不分段
            this._drawSegment(points);
        } else {
            let plen = points.length;
            let step = Math.floor(plen / segmentNum);
            if(step > 0) {
                for (let count = 0; count < segmentNum; count++) {
                    let startIndex = count * step;
                    let endIndex = count * step + step + 1;
                    if (count === segmentNum - 1) {
                        endIndex = plen - 1;
                    }
                    let segPoints = points.slice(startIndex, endIndex);
                    this._drawSegment(segPoints);
                }
            } else {
                // 分段数大于所有点数时，不分段
                this._drawSegment(points);
            }
        }
    }
    _drawSegment(points) {
        const size = this._map.getContainerSize();
        const effectOptions = this.options.effect;
        const useConstantSpeed = effectOptions.constantSpeed != null;
        const period = effectOptions.period * 1000;
        
        const verticeArr = []; // 顶点数组
        const distArr = []; // 距离原点距离数组
        const disAllArr = []; // 总距离数组
        const startArr = []; // 起始位置数组
        
        let dist = 0;
        for (let i = 0, len = points.length; i < len; i++) {
            verticeArr.push(points[i].x, points[i].y, points[i].z);
            if (i > 0) {
                dist += points[i].distanceTo(points[i-1]);
            }
            distArr.push(dist);
            distArr.push(dist);
        }
        this._maxDistance = Math.max(this._maxDistance, dist);
        const randomStart = Math.random() * (useConstantSpeed ? dist : period);
        for (let i = 0, len = points.length; i < len; i++) {
            disAllArr.push(dist);
            disAllArr.push(dist);
            startArr.push(randomStart);
            startArr.push(randomStart);
        }
        
        const line = new _custom_meshline__WEBPACK_IMPORTED_MODULE_2__["MeshLine"]();
        line.setGeometry(verticeArr);

        const geometry = line.geometry;
        geometry.addAttribute('dist', new THREE.BufferAttribute( new Float32Array(distArr), 1 ));
        geometry.addAttribute('distAll', new THREE.BufferAttribute( new Float32Array(disAllArr), 1 ));
        geometry.addAttribute('start', new THREE.BufferAttribute( new Float32Array(startArr), 1 ));
        
        this.uniforms.spotSize.value =  this._maxDistance * 0.1 * effectOptions.trailLength;
        this.uniforms.trailLength.value = effectOptions.trailLength;
        this.uniforms.spotIntensity.value = effectOptions.spotIntensity;
        
        const resolution = new THREE.Vector2(size.width, size.height);
        const lineColor = new THREE.Color(effectOptions.trailColor || this.options.lineStyle.color);
        const opacity = effectOptions.trailOpacity != null ? effectOptions.trailOpacity : this.options.lineStyle.opacity;
        const shaderMaterial = new _custom_meshline__WEBPACK_IMPORTED_MODULE_2__["MeshLineMaterial"]({
            resolution: resolution,
            color: lineColor,
            opacity: opacity,
            sizeAttenuation: false,
            lineWidth: effectOptions.trailWidth
        });

        if (useConstantSpeed) {
            this.uniforms.speed.value = effectOptions.constantSpeed / 1000;
            shaderMaterial.defines = { CONSTANT_SPEED: effectOptions.constantSpeed };
        } else {
            this.uniforms.period.value = period;
        }
        Object.assign(shaderMaterial.uniforms, this.uniforms);

        const lineMesh = new THREE.Mesh(line.geometry, shaderMaterial);
        if (this._map.options.type === 'plane') {
            lineMesh.rotateX(-Math.PI/2);
        }

        this._container.add(lineMesh);
    }
}

/***/ }),

/***/ "./js/layers/geojson-layer.js":
/*!************************************!*\
  !*** ./js/layers/geojson-layer.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GeoJSONLayer; });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "./js/layers/layer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./js/util.js");
/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../maphelper */ "./js/maphelper.js");
/* harmony import */ var _text_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./text-layer */ "./js/layers/text-layer.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tooltip */ "./js/tooltip.js");
/* harmony import */ var _custom_meshline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom-meshline */ "./js/layers/custom-meshline.js");






// geojson 地图
class GeoJSONLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(data, options, outlineData) {
        super(data, options);
        const defaultOptions = {
            // 是否自动适配尺寸。如果设置为 true，配置项中的 depth\offset\scale 等尺寸会根据当前行政区来自动适配，用户传入的值就无效了。
            isAutoResize: true, 
            // 适配参数，仅当 isAutoResize 设置为 true 时有效。
            resizeParam: {
                depth: 1.5,
                offset: 0,
                scale1: 22,
                scale2: 20
            }, 
            isExtrude: true, // 是否拉伸面
            depth: 16, // 拉伸厚度
            forceBoundsCenter: false, // 地区中心点是否计算成外包矩形中心点
            // 地区名字
            areaText: {
                show: true, // 是否显示【无数据】区域文字，不能控制无数据区域文字
                offset: 1, // 文字离地面高度
                isAvoidCollision: true, // 是否避免文字碰撞
                textStyle: { // 有数据地区的名字样式
                    show: true, // 是否显示有数据地区文字
                    scale: 1, // 缩放比例
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '16px',
                    fontFamily: 'Microsoft YaHei',
                    fontColor: '#000',
                    textAlign: 'center',
                    textBaseline: 'middle',
                    maxWidth: 512,
                    offsetY: 0,
                    labelPointStyle: {
                        show: true, // 是否显示文字旁边的标注点
                        margin: 4, // 标注点距离文字的距离
                        radius: 6, // 标注点半径
                        color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
                    }
                },
                nullTextStyle: { // 无数据地区的名字样式
                    scale: 1, // 缩放比例
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '16px',
                    fontFamily: 'Microsoft YaHei',
                    fontColor: '#000',
                    textAlign: 'center',
                    textBaseline: 'middle',
                    maxWidth: 512,
                    offsetY: 0,
                    labelPointStyle: {
                        show: true, // 是否显示文字旁边的标注点
                        margin: 4, // 标注点距离文字的距离
                        radius: 6, // 标注点半径
                        color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
                    }
                }
            },
            isAreaMutilColor: false, // 面是否采用不同颜色,程序会取颜色值随机赋值
            mutiColors: ['#7EBFF0', '#D1F6FC', '#53A4EA', '#107AE0'],
            areaMaterial: { // 面材质配置
                color: 0x00ff00,
                side: THREE.DoubleSide,
                opacity: 1,
                textureSrc: null, // 如果设置贴图，则面采用图片贴图
                textureConfig: {
                    offset: [0, 0],
                    repeat: [0.01, 0.01],
                    rotation: 0
                }
            },
            extrudeMaterial: { // 侧面材质,如果为 null，则与面材质相同
                color:  0x00ff00,
                opacity: 1,
                textureSrc: null,
                textureGradient: {
                    "0": "red",
                    "1": "blue"
                }
            },
            hightLight: { // 鼠标滑过面块是否高亮
                show: false,
                color: '#639fc0'
            },
            tooltip: { // 是否显示tooltip提示
                show: false
            },
            outline: {  // 拉伸地图的轮廓
                normal: {
                    show: true,
                    color: 0x999999,
                    width: 1.5,
                    opacity: 1
                },
                top: {
                    show: false,
                    color: 0x00ff00,
                    width: 1,
                    opacity: 1
                },
                bottom: {
                    show: false,
                    color: 0x00ff00,
                    width: 1,
                    opacity: 1
                }
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, defaultOptions, options);
        this.type = 'geojson';
        // this._initFeatures();
        this._features = this.createFeatureArray(this._data);
        if (outlineData != null) {
            this._outlineFeatures = this.createFeatureArray(outlineData);
        }
    }

    onAdd(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onAdd.call(this, map); 
        this._initBoundsAndCenter();
        if (this.options.isAutoResize) {
            this._initResizeOptions();
        }
        this._drawBaseLayer();
        this._draw();
        // FIXME: 文字的碰撞计算 worldToScreen 需要等底图绘制完成才能计算准确
        this.updateLabels();
        if (this.options.hightLight.show) {
            this._map.on('mousemove', this._mousemoveEvtHandler, this);
        }
        if (this.options.tooltip.show) {
            this._tooltip = new _tooltip__WEBPACK_IMPORTED_MODULE_4__["default"](this._map.getContainerElement());
        }
    }

    onRemove(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onRemove.call(this, map);
        this._textLayer && this._map.removeLayer(this._textLayer);
        this._nulltextLayer && this._map.removeLayer(this._nulltextLayer);
        this._map.off('mousemove', this._mousemoveEvtHandler, this);
        this._tooltip && this._tooltip.remove();
        this._tooltip = null;
    }

    getBounds() {
        return this._bounds;
    }

    getCenter() {
        return this._center;
    }

    getFeatures() {
        return this._features || [];
    }

    getDepth() {
        if (this.options.isExtrude) {
            return this.options.depth;
        } else {
            return 0;
        }
    }

    getRatio() {
        return this._ratio;
    }

    createFeatureArray(json) {
        var feature_array = [];
        var temp_feature;

        if (json.type == 'Feature') {
            feature_array.push(json);
        } else if (json.type == 'FeatureCollection') {
            for (var feature_num = 0; feature_num < json.features.length; feature_num++) {
                feature_array.push(json.features[feature_num]);
            }
        } else if (json.type == 'GeometryCollection') {
            for (var geom_num = 0; geom_num < json.geometries.length; geom_num++) {
                temp_feature = {
                    geometry: json.geometries[geom_num]
                }
                feature_array.push(temp_feature);
            }
        } else {
            throw new Error('The geoJSON is not valid.');
        }
        return feature_array;
    }

    createCoordinateArray(feature) {
        //Loop through the coordinates and figure out if the points need interpolation.
        var temp_array = [];
        var interpolation_array = [];

        for (var point_num = 0; point_num < feature.length; point_num++) {
            var point1 = feature[point_num];
            var point2 = feature[point_num - 1];

            if (point_num > 0) {
                if (this.needsInterpolation(point2, point1)) {
                    interpolation_array = [point2, point1];
                    interpolation_array = this.interpolatePoints(interpolation_array);

                    for (var inter_point_num = 0; inter_point_num < interpolation_array.length; inter_point_num++) {
                        temp_array.push(interpolation_array[inter_point_num]);
                    }
                } else {
                    temp_array.push(point1);
                }
            } else {
                temp_array.push(point1);
            }
        }
        return temp_array;
    }

    needsInterpolation(point2, point1) {
        //If the distance between two latitude and longitude values is
        //greater than five degrees, return true.
        var lon1 = point1[0];
        var lat1 = point1[1];
        var lon2 = point2[0];
        var lat2 = point2[1];
        var lon_distance = Math.abs(lon1 - lon2);
        var lat_distance = Math.abs(lat1 - lat2);

        if (lon_distance > 5 || lat_distance > 5) {
            return true;
        } else {
            return false;
        }
    }

    interpolatePoints(interpolation_array) {
        //This function is recursive. It will continue to add midpoints to the
        //interpolation array until needsInterpolation() returns false.
        var temp_array = [];
        var point1, point2;

        for (var point_num = 0; point_num < interpolation_array.length - 1; point_num++) {
            point1 = interpolation_array[point_num];
            point2 = interpolation_array[point_num + 1];

            if (this.needsInterpolation(point2, point1)) {
                temp_array.push(point1);
                temp_array.push(this.getMidpoint(point1, point2));
            } else {
                temp_array.push(point1);
            }
        }

        temp_array.push(interpolation_array[interpolation_array.length - 1]);

        if (temp_array.length > interpolation_array.length) {
            temp_array = this.interpolatePoints(temp_array);
        } else {
            return temp_array;
        }
        return temp_array;
    }

    getMidpoint(point1, point2) {
        var midpoint_lon = (point1[0] + point2[0]) / 2;
        var midpoint_lat = (point1[1] + point2[1]) / 2;
        var midpoint = [midpoint_lon, midpoint_lat];

        return midpoint;
    }

    convertCoordinates(coordinateArray) {
        return coordinateArray.map(lnglat => {
            let mecatorPoint = _maphelper__WEBPACK_IMPORTED_MODULE_2__["wgs84ToMecator"](lnglat);
            return mecatorPoint.map(p => p / this._map.options.SCALE_RATIO);
        });
    }

    _initBoundsAndCenter() {
        let bounds;
        let mapOptions = this._map.options;
        if (mapOptions.type === 'plane') {
            if (mapOptions.region === 'world') {
                bounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getBounds"]('world', mapOptions.crs);
            } else if (mapOptions.region === 'china') {
                bounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getBounds"]('china', mapOptions.crs);
            } else {
                bounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getBounds"](this._data, mapOptions.crs);
            }
        } else {
            // sphere
        }
        if (bounds) {
            if (mapOptions.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg4326) {
                this._bounds = bounds;
                this._center = bounds.getCenter();
            } else {
                let scale = mapOptions.SCALE_RATIO;
                this._bounds = bounds.scale(1/scale);
                this._center = this._bounds.getCenter();
            }
        }
    }

    _initResizeOptions() {
        const ratio = this._map.getRatio(this._bounds);
        const resizeParam = this.options.resizeParam;
        this.options.depth = resizeParam.depth * ratio;
        this.options.areaText.offset = resizeParam.offset * ratio;
        this.options.areaText.textStyle.scale = resizeParam.scale1 * ratio;
        this.options.areaText.nullTextStyle.scale = resizeParam.scale2 * ratio;
        this._ratio = ratio;
    }

    _initFeatures() {
        this._features = this.createFeatureArray(this._data);
    }

    _draw() {
        if (this._features == null || !this._features.length) {return;}
        for (let i = 0, len = this._features.length; i < len; i++) {
            let feature = this._features[i];
            let geometry = feature.geometry;
            let userData = {
                name: _maphelper__WEBPACK_IMPORTED_MODULE_2__["getNormalizeName"](feature),
                // color: Util.getRandomColor()
                color: this.options.mutiColors[ i > (this.options.mutiColors.length - 1) ? i % (this.options.mutiColors.length) : i ] 
            };
            let featureGroup = new THREE.Group();
            this._container.add(featureGroup);
            if (geometry == null) continue;
            if (geometry.type == 'Point') {

            } else if (geometry.type == 'MultiPoint') {

            } else if (geometry.type == 'LineString') {

            } else if (geometry.type == 'MultiLineString') {

            } else if (geometry.type == 'Polygon') {
                for (let segment_num = 0; segment_num < geometry.coordinates.length; segment_num++) {
                    let coordinate_array = this.createCoordinateArray(geometry.coordinates[segment_num]);
                    let convert_array = coordinate_array;
                    if (this._map.options.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857) {
                        convert_array = this.convertCoordinates(coordinate_array);
                    }
                    this.drawPolygon(convert_array, userData, featureGroup);
                }

            } else if (geometry.type == 'MultiPolygon') {
                for (let polygon_num = 0; polygon_num < geometry.coordinates.length; polygon_num++) {
                    for (let segment_num = 0; segment_num < geometry.coordinates[polygon_num].length; segment_num++) {
                        let coordinate_array = this.createCoordinateArray(geometry.coordinates[polygon_num][segment_num]);
                        let convert_array = coordinate_array;
                        if (this._map.options.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857) {
                            convert_array = this.convertCoordinates(coordinate_array);
                        }
                        this.drawPolygon(convert_array, userData, featureGroup);
                    }
                }
            } else {
                throw new Error('The geoJSON is not valid.');
            }
        }
    }

    _drawBaseLayer() {
        if (!this._outlineFeatures || !this._outlineFeatures.length) return;

        for (let i = 0, len = this._outlineFeatures.length; i < len; i++) {
            const feature = this._outlineFeatures[i];
            const geometry = feature.geometry;
            if (feature && geometry && ( geometry.type === 'Polygon' || geometry.type === 'MultiPolygon' )) {
                const featureGroup = new THREE.Group();
                this._container.add(featureGroup);
                if (geometry.type == 'Polygon') {
                    for (let segment_num = 0; segment_num < geometry.coordinates.length; segment_num++) {
                        let coordinate_array = this.createCoordinateArray(geometry.coordinates[segment_num]);
                        let convert_array = coordinate_array;
                        if (this._map.options.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857) {
                            convert_array = this.convertCoordinates(coordinate_array);
                        }
                        this.drawBasePolygon(convert_array, null, featureGroup);
                    }
                } else if (geometry.type == 'MultiPolygon') {
                    for (let polygon_num = 0; polygon_num < geometry.coordinates.length; polygon_num++) {
                        for (let segment_num = 0; segment_num < geometry.coordinates[polygon_num].length; segment_num++) {
                            let coordinate_array = this.createCoordinateArray(geometry.coordinates[polygon_num][segment_num]);
                            let convert_array = coordinate_array;
                            if (this._map.options.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857) {
                                convert_array = this.convertCoordinates(coordinate_array);
                            }
                            this.drawBasePolygon(convert_array, null, featureGroup);
                        }
                    }
                } 
            }
        }
    }

    drawBasePolygon(points, userData, container) {
        const areaMaterial = this.options.areaMaterial;
        const extrudeMaterial = this.options.extrudeMaterial;
        const geometry = this.createGeometry(points, {
            isExtrude: this.options.isExtrude,
            depth: this.options.depth
        });

        let texture1, material1, texture2, material2;
        // 轮廓面上的贴图材质
        if (areaMaterial.textureSrc) {
            texture1 = new THREE.TextureLoader().load(areaMaterial.textureSrc);
            texture1.wrapS = THREE.RepeatWrapping;
            texture1.wrapT = THREE.RepeatWrapping;
            texture1.offset.set(areaMaterial.textureConfig.offset[0], areaMaterial.textureConfig.offset[1]);
            texture1.repeat.set(areaMaterial.textureConfig.repeat[0], areaMaterial.textureConfig.repeat[1]);
            texture1.rotation = areaMaterial.textureConfig.rotation;
            texture1.center.set(0.5, 0.5);
        }
        material1 = new THREE.MeshPhongMaterial({
            map: texture1 ? texture1 : null,
            color: texture1 ? 0xffffff : areaMaterial.color
        });

        // 拉伸体的侧面材质
        if (this.options.isExtrude) {
            if (extrudeMaterial.textureSrc) {
                texture2 = new THREE.TextureLoader().load(extrudeMaterial.textureSrc);
            } else if (extrudeMaterial.textureGradient) {
                const canvas = this.getCanvasTextureElement(64, 64, extrudeMaterial.textureGradient);
                texture2 = new THREE.CanvasTexture(canvas);
            }
            if (texture2) {
                texture2.center = new THREE.Vector2(0.5, 0.5);
                texture2.rotation = Math.PI;
                material2 = new THREE.MeshPhongMaterial({
                    map: texture2,
                    color: 0xffffff
                });
                if (extrudeMaterial.opacity < 1) {
                    material2.transparent = true;
                    material2.opacity = extrudeMaterial.opacity;
                }
            }
        }

        const material = material2 ? [material1, material2] : material1;
        const mesh = new THREE.Mesh(geometry, material);
        
        // 是否画轮廓线
        if (this.options.outline.top.show) {
            const options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"]({
                offset: this.options.isExtrude ? this.options.depth : 0,
                renderOrder: 20
            }, this.options.outline.top);
            this.drawOutLine2(points, mesh, options);
        }

        mesh.rotateX(-Math.PI/2);
        mesh.userData = _util__WEBPACK_IMPORTED_MODULE_1__["extend"]({type: 'area_base'}, userData);
        container.add(mesh);
    }

    getCanvasTextureElement(width, height, colorstop) {
        width = width * window.devicePixelRatio;
        height = height * window.devicePixelRatio;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        const gradient = context.createLinearGradient(0, 0, 0, height);
        Object.keys(colorstop).forEach(key => {
            gradient.addColorStop(key, colorstop[key]);
        });
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        return canvas;
    }

    _mousemoveEvtHandler(event) {
        const mapSize = this._map.getContainerSize();
        const camera = this._map.getCamera();
        const sx = event.offsetX; 
        const sy = event.offsetY;
        const cx = event.clientX;
        const cy = event.clientY;
        //屏幕坐标转标准设备坐标
        const x = (sx / mapSize.width) * 2 - 1; 
        const y = -(sy / mapSize.height) * 2 + 1;
        //标准设备坐标
        const standardVector = new THREE.Vector3(x, y, 0.5); 
        //标准设备坐标转世界坐标
        const worldVector = standardVector.unproject(camera);
        //射线投射方向单位向量(worldVector坐标减相机位置坐标)
        const ray = worldVector.sub(camera.position).normalize();
        //创建射线投射器对象
        const raycaster = new THREE.Raycaster(camera.position, ray);
        //返回射线选中的对象
        const intersects = raycaster.intersectObjects(this._container.children, true);
      
        // 避免连续选中
        if (this._currentSelectGroup) {
            this._currentSelectGroup.children.forEach(obj => {
                obj.material.color = obj.userData.oldColor;
            });
            this._currentSelectGroup = null;
            this._tooltip && this._tooltip.close();
        }

        for (var i = 0; i < intersects.length; i++) {
            let object = intersects[i].object;
            let udata = object.userData;
            if (udata && udata.type === 'area') { 
                this._currentSelectGroup = object.parent;
                this._currentSelectGroup.children.forEach(obj => {
                    obj.userData.oldColor = obj.material.color;
                    obj.material.color = new THREE.Color(this.options.hightLight.color);
                });
                let content = `${udata['name']}`;
                this._tooltip && this._tooltip.open(sx, sy, content);
                break;
            }
        }
        if (i === intersects.length) {
            if (this._currentSelectGroup) {
                this._currentSelectGroup.children.forEach(obj => {
                    obj.material.color = obj.userData.oldColor;
                });
                this._currentSelectGroup = null;
                this._tooltip && this._tooltip.close();
            }
        }
    }

    updateLabels(barLayer, filterText = []) {
        if (this._features == null || !this._features.length) {return;}
        let barWidth = 0;
        if (barLayer) {
            barWidth = barLayer.options.barStyle.width;
        }
        let textData = [];
        let nullTextData = [];
        let forceBoundsCenter = this.options.forceBoundsCenter;
        // if (this._map.options.region === 'china' || this._map.options.region === 'world') {
        //     forceBoundsCenter = false;
        // }

        for (let i = 0, len = this._features.length; i < len; i++) {
            let f = this._features[i];
            let yoffset = this.getDepth();
            let tempobj = {};
            let name = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getNormalizeName"](f);
            let center = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getNormalizeCenter"](f, forceBoundsCenter);
            if (center == null || !Array.isArray(center)) {
                continue; // geometry 为null时得不到center
            }
            // FIXME: 采用简单粗暴方法避免文字覆盖
            // tempobj.textAlign = 'left';
            // if (new RegExp(name).test('香港')) {
            //     tempobj.textAlign = 'left'
            // } else if (new RegExp(name).test('澳门')) {
            //     tempobj.textAlign = 'right'
            // } else if (new RegExp(name).test('广东')) {
            //     tempobj.textBaseline = 'bottom'
            // } else if (new RegExp(name).test('北京')) {
            //     tempobj.textAlign = 'right'
            // } else if (new RegExp(name).test('天津')) {
            //     tempobj.textAlign = 'left'
            // }
            tempobj.text = name;
            tempobj.center = center;
            tempobj.center[1] += barWidth*2; // TODO: 避免文字覆盖柱子
            tempobj.altitude = yoffset + this.options.areaText.offset;
            if (f.hasBarData) {
                textData.push(tempobj);
            } else {
                let isFilter = filterText.indexOf(tempobj.text) !== -1;
                if (!isFilter) {
                    nullTextData.push(tempobj);
                }
            }  
        }
        const textOptions = {
            isAvoidCollision: this.options.areaText.isAvoidCollision,
            textStyle: this.options.areaText.textStyle
        };
        const nullTextOptions = {
            isAvoidCollision: this.options.areaText.isAvoidCollision,
            textStyle: this.options.areaText.nullTextStyle
        };
        if (this.options.areaText.textStyle.show) {
            if (this._textLayer) {
                this._textLayer.update(textData);
            } else {
                this._textLayer = new _text_layer__WEBPACK_IMPORTED_MODULE_3__["default"](textData, textOptions);
                this._map.addLayer(this._textLayer);
            }
        }
        if (this.options.areaText.show) {
            if (this._nulltextLayer) {
                this._nulltextLayer.update(nullTextData);
            } else {
                this._nulltextLayer = new _text_layer__WEBPACK_IMPORTED_MODULE_3__["default"](nullTextData, nullTextOptions);
                this._map.addLayer(this._nulltextLayer);
            }
        }
    }

    drawOutLine(points, mesh, lineOptions) {
        // 画轮廓线
        // 因为面是画在xy平面的，然后通过旋转而来，为了保持一致，轮廓线也绘制在xy平面，这样变换就能与面同步
        let line_geom = new THREE.Geometry();
        for (let i = 0, len=points.length; i < len ; i++) {
            line_geom.vertices.push(new THREE.Vector3(points[i][0], points[i][1], 0));
        }
        let options = {
            color: lineOptions.color,
            linewidth: lineOptions.width
        };
        let line_material = new THREE.LineBasicMaterial(options);
        if (lineOptions.opacity > 0) {
            line_material.transparent = true;
            line_material.opacity = lineOptions.opacity;
        }
        let line = new THREE.Line(line_geom, line_material);
        if (lineOptions.offset) {
            line.translateZ(lineOptions.offset);
        }
        // line.renderOrder = 80;
        // line.material.depthTest = false;
        mesh.add(line);
    }

    drawOutLine2(points, mesh, options) {
        const size = this._map.getContainerSize();

        points = points.map(pt => new THREE.Vector3(pt[0], pt[1], 0));

        const geometry = new THREE.Geometry().setFromPoints( points );
        
        const line = new _custom_meshline__WEBPACK_IMPORTED_MODULE_5__["MeshLine"]();
        line.setGeometry(geometry);

        const resolution = new THREE.Vector2(size.width, size.height);
        const lineColor = new THREE.Color(options.color);
        const opacity = options.opacity;
        const linewidth = options.width;
        const shaderMaterial = new _custom_meshline__WEBPACK_IMPORTED_MODULE_5__["MeshLineMaterial"]({
            resolution: resolution,
            color: lineColor,
            opacity: opacity,
            sizeAttenuation: false,
            lineWidth: linewidth
        });

        const lineMesh = new THREE.Mesh(line.geometry, shaderMaterial);
        if (options.offset) {
            lineMesh.translateZ(options.offset);
        }
        lineMesh.renderOrder = options.renderOrder || 0;
        lineMesh.material.depthTest = false;
        mesh.add(lineMesh);
    }

    createGeometry(points, options) {
        options = options || {};
        const shape = new THREE.Shape();
        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            if (i === 0) {
                shape.moveTo(point[0], point[1]);
            } else {
                shape.lineTo(point[0], point[1]);
            }
        }
        shape.closePath();  
        
        let geometry;
        if (options.isExtrude) {
            let extrudeSettings = {
                depth: options.depth,
                // UVGenerator : WorldUVGenerator,
                bevelEnabled: false   // 是否用斜角
            };
            geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        } else {
            geometry = new THREE.ShapeBufferGeometry(shape);
        }
        return geometry;
    }

    drawPolygon(points, userData, container) {
        const isExtrude = this.options.isExtrude && !this._outlineFeatures;

        const areaMaterialOptions = this.options.areaMaterial;
        const extrudeMaterial = this.options.extrudeMaterial;

        if (this.options.isAreaMutilColor) {
            areaMaterialOptions.color = userData.color;
        }

        const geometry = this.createGeometry(points, { isExtrude: isExtrude, depth: isExtrude ? this.options.depth : 0 });
        
        // 正面的材质
        let material1 = new THREE.MeshBasicMaterial({
            color: areaMaterialOptions.color,
            side: areaMaterialOptions.side
        });
        if (areaMaterialOptions.opacity < 1) {
            material1.transparent = true;
            material1.opacity = areaMaterialOptions.opacity;
        }

        let texture2, material2;
        if (isExtrude) {
            if (extrudeMaterial.textureSrc) {
                texture2 = new THREE.TextureLoader().load(extrudeMaterial.textureSrc);
            } else if (extrudeMaterial.textureGradient) {
                const canvas = this.getCanvasTextureElement(64, 64, extrudeMaterial.textureGradient);
                texture2 = new THREE.CanvasTexture(canvas);
            }
            if (texture2) {
                // texture2.wrapS = THREE.RepeatWrapping;
                // texture2.wrapT = THREE.RepeatWrapping;
                // texture2.repeat.set(4, 4);
                // texture2.center = new THREE.Vector2(0.5, 0.5);
                // texture2.rotation = Math.PI;
                material2 = new THREE.MeshPhongMaterial({
                    map: texture2
                });
                if (extrudeMaterial.opacity < 1) {
                    material2.transparent = true;
                    material2.opacity = extrudeMaterial.opacity;
                }
            }
        }

        const material = material2 ? [material1, material2] : material1;
        const mesh = new THREE.Mesh(geometry, material);
        
        // 内部轮廓线
        if (this.options.outline.normal.show) {
            const options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"]({
                offset: isExtrude ? this.options.depth : 0,
                renderOrder: 10
            }, this.options.outline.normal);
            if (options.width <= 1) {
                this.drawOutLine(points, mesh, options);
            } else {
                this.drawOutLine2(points, mesh, options);
            }
        }

        mesh.rotateX(-Math.PI/2);
        // 如果外轮廓面拉伸了，移到外轮廓上面
        if (this.options.isExtrude && this._outlineFeatures && this._outlineFeatures.length) {
             mesh.translateZ(this.options.depth);
        }
        // 如果用图片覆盖上面，则设置此材质透明
        if (areaMaterialOptions.textureSrc) {
            mesh.material.transparent = true;
            mesh.material.opacity = 0;
        }
        mesh.userData = _util__WEBPACK_IMPORTED_MODULE_1__["extend"]({type: 'area'}, userData);
        mesh.renderOrder = 5;
        mesh.material.depthTest = false;
        container.add(mesh);
    }
}

/***/ }),

/***/ "./js/layers/geojson-layer2.js":
/*!*************************************!*\
  !*** ./js/layers/geojson-layer2.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GeoJSONLayer2; });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "./js/layers/layer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./js/util.js");
/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../maphelper */ "./js/maphelper.js");
/* harmony import */ var _text_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./text-layer */ "./js/layers/text-layer.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tooltip */ "./js/tooltip.js");
/* harmony import */ var _custom_meshline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom-meshline */ "./js/layers/custom-meshline.js");






// geojson 地图
class GeoJSONLayer2 extends _layer__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(data, options) {
        super(data, options);
        const defaultOptions = {
            // 是否自动适配尺寸。如果设置为 true，配置项中的 depth\offset\scale 等尺寸会根据当前行政区来自动适配，用户传入的值就无效了。
            isAutoResize: true, 
            // 适配参数，仅当 isAutoResize 设置为 true 时有效。
            resizeParam: {
                depth: 1.5,
                offset: 0,
                scale1: 22,
                scale2: 20
            }, 
            isExtrude: true, // 是否拉伸面
            depth: 16, // 拉伸厚度
            forceBoundsCenter: false, // 地区中心点是否计算成外包矩形中心点
            // 地区名字
            areaText: {
                show: true, // 是否显示【无数据】区域文字，不能控制无数据区域文字
                offset: 1, // 文字离地面高度
                isAvoidCollision: true, // 是否避免文字碰撞
                textStyle: { // 有数据地区的名字样式
                    show: true, // 是否显示有数据地区文字
                    scale: 1, // 缩放比例
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '16px',
                    fontFamily: 'Microsoft YaHei',
                    fontColor: '#000',
                    textAlign: 'center',
                    textBaseline: 'middle',
                    maxWidth: 512,
                    offsetY: 0,
                    labelPointStyle: {
                        show: true, // 是否显示文字旁边的标注点
                        margin: 4, // 标注点距离文字的距离
                        radius: 6, // 标注点半径
                        color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
                    }
                },
                nullTextStyle: { // 无数据地区的名字样式
                    scale: 1, // 缩放比例
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '16px',
                    fontFamily: 'Microsoft YaHei',
                    fontColor: '#000',
                    textAlign: 'center',
                    textBaseline: 'middle',
                    maxWidth: 512,
                    offsetY: 0,
                    labelPointStyle: {
                        show: true, // 是否显示文字旁边的标注点
                        margin: 4, // 标注点距离文字的距离
                        radius: 6, // 标注点半径
                        color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
                    }
                }
            },
            isAreaMutilColor: false, // 面是否采用不同颜色
            mutiColors: ['#7EBFF0', '#D1F6FC', '#53A4EA', '#107AE0'],
            areaMaterial: { // 面材质配置
                color: 0x00ff00,
                side: THREE.DoubleSide,
                opacity: 1
            },
            extrudeMaterial: { // 侧面材质,如果为 null，则与面材质相同
                color:  0x00ff00,
                opacity: 1,
                textureSrc: null
            },
            hightLight: {
                show: false,
                color: '#639fc0'
            },
            tooltip: {
                show: false
            },
            outline: {  // 拉伸地图的轮廓
                normal: {
                    show: true,
                    color: 0x999999,
                    width: 1.5,
                    opacity: 1
                },
                top: {
                    show: false,
                    color: 0x00ff00,
                    width: 1,
                    opacity: 1
                },
                bottom: {
                    show: false,
                    color: 0x00ff00,
                    width: 1,
                    opacity: 1
                }
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, defaultOptions, options);
        this.type = 'geojson';
        this._initFeatures();
    }
    onAdd(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onAdd.call(this, map); 
        this._initBoundsAndCenter();
        if (this.options.isAutoResize) {
            this._initResizeOptions();
        }
        this._draw();
        // FIXME: 文字的碰撞计算 worldToScreen 需要等底图绘制完成才能计算准确
        this.updateLabels();
        if (this.options.hightLight.show) {
            this._map.on('mousemove', this._mousemoveEvtHandler, this);
        }
        if (this.options.tooltip.show) {
            this._tooltip = new _tooltip__WEBPACK_IMPORTED_MODULE_4__["default"](this._map.getContainerElement());
        }
    }
    onRemove(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onRemove.call(this, map);
        this._textLayer && this._map.removeLayer(this._textLayer);
        this._nulltextLayer && this._map.removeLayer(this._nulltextLayer);
        this._map.off('mousemove', this._mousemoveEvtHandler, this);
        this._tooltip && this._tooltip.remove();
        this._tooltip = null;
    }
    getBounds() {
        return this._bounds;
    }
    getCenter() {
        return this._center;
    }
    getFeatures() {
        return this._features || [];
    }
    getDepth() {
        if (this.options.isExtrude) {
            return this.options.depth;
        } else {
            return 0;
        }
    }
    getRatio() {
        return this._ratio;
    }
    createFeatureArray(json) {
        var feature_array = [];
        var temp_feature;

        if (json.type == 'Feature') {
            feature_array.push(json);
        } else if (json.type == 'FeatureCollection') {
            for (var feature_num = 0; feature_num < json.features.length; feature_num++) {
                feature_array.push(json.features[feature_num]);
            }
        } else if (json.type == 'GeometryCollection') {
            for (var geom_num = 0; geom_num < json.geometries.length; geom_num++) {
                temp_feature = {
                    geometry: json.geometries[geom_num]
                }
                feature_array.push(temp_feature);
            }
        } else {
            throw new Error('The geoJSON is not valid.');
        }
        return feature_array;
    }
    createCoordinateArray(feature) {
        //Loop through the coordinates and figure out if the points need interpolation.
        var temp_array = [];
        var interpolation_array = [];

        for (var point_num = 0; point_num < feature.length; point_num++) {
            var point1 = feature[point_num];
            var point2 = feature[point_num - 1];

            if (point_num > 0) {
                if (this.needsInterpolation(point2, point1)) {
                    interpolation_array = [point2, point1];
                    interpolation_array = this.interpolatePoints(interpolation_array);

                    for (var inter_point_num = 0; inter_point_num < interpolation_array.length; inter_point_num++) {
                        temp_array.push(interpolation_array[inter_point_num]);
                    }
                } else {
                    temp_array.push(point1);
                }
            } else {
                temp_array.push(point1);
            }
        }
        return temp_array;
    }
    needsInterpolation(point2, point1) {
        //If the distance between two latitude and longitude values is
        //greater than five degrees, return true.
        var lon1 = point1[0];
        var lat1 = point1[1];
        var lon2 = point2[0];
        var lat2 = point2[1];
        var lon_distance = Math.abs(lon1 - lon2);
        var lat_distance = Math.abs(lat1 - lat2);

        if (lon_distance > 5 || lat_distance > 5) {
            return true;
        } else {
            return false;
        }
    }
    interpolatePoints(interpolation_array) {
        //This function is recursive. It will continue to add midpoints to the
        //interpolation array until needsInterpolation() returns false.
        var temp_array = [];
        var point1, point2;

        for (var point_num = 0; point_num < interpolation_array.length - 1; point_num++) {
            point1 = interpolation_array[point_num];
            point2 = interpolation_array[point_num + 1];

            if (this.needsInterpolation(point2, point1)) {
                temp_array.push(point1);
                temp_array.push(this.getMidpoint(point1, point2));
            } else {
                temp_array.push(point1);
            }
        }

        temp_array.push(interpolation_array[interpolation_array.length - 1]);

        if (temp_array.length > interpolation_array.length) {
            temp_array = this.interpolatePoints(temp_array);
        } else {
            return temp_array;
        }
        return temp_array;
    }
    getMidpoint(point1, point2) {
        var midpoint_lon = (point1[0] + point2[0]) / 2;
        var midpoint_lat = (point1[1] + point2[1]) / 2;
        var midpoint = [midpoint_lon, midpoint_lat];

        return midpoint;
    }
    convertCoordinates(coordinateArray) {
        return coordinateArray.map(lnglat => {
            let mecatorPoint = _maphelper__WEBPACK_IMPORTED_MODULE_2__["wgs84ToMecator"](lnglat);
            return mecatorPoint.map(p => p / this._map.options.SCALE_RATIO);
        });
    }
    _initBoundsAndCenter() {
        let bounds;
        let mapOptions = this._map.options;
        if (mapOptions.type === 'plane') {
            if (mapOptions.region === 'world') {
                bounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getBounds"]('world', mapOptions.crs);
            } else if (mapOptions.region === 'china') {
                bounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getBounds"]('china', mapOptions.crs);
            } else {
                bounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getBounds"](this._data, mapOptions.crs);
            }
        } else {
            // sphere
        }
        if (bounds) {
            if (mapOptions.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg4326) {
                this._bounds = bounds;
                this._center = bounds.getCenter();
            } else {
                let scale = mapOptions.SCALE_RATIO;
                this._bounds = bounds.scale(1/scale);
                this._center = this._bounds.getCenter();
            }
        }
    }
    _initResizeOptions() {
        const ratio = this._map.getRatio(this._bounds);
        const resizeParam = this.options.resizeParam;
        this.options.depth = resizeParam.depth * ratio;
        this.options.areaText.offset = resizeParam.offset * ratio;
        this.options.areaText.textStyle.scale = resizeParam.scale1 * ratio;
        this.options.areaText.nullTextStyle.scale = resizeParam.scale2 * ratio;
        this._ratio = ratio;
    }
    _initFeatures() {
        this._features = this.createFeatureArray(this._data);
    }
    _draw() {
        if (this._features == null || !this._features.length) {return;}
        for (let i = 0, len = this._features.length; i < len; i++) {
            let feature = this._features[i];
            let geometry = feature.geometry;
            let userData = {
                name: _maphelper__WEBPACK_IMPORTED_MODULE_2__["getNormalizeName"](feature),
                // color: Util.getRandomColor()
                color: this.options.mutiColors[ i > (this.options.mutiColors.length - 1) ? i % (this.options.mutiColors.length) : i ] 
            };
            let featureGroup = new THREE.Group();
            this._container.add(featureGroup);
            if (geometry == null) continue;
            if (geometry.type == 'Point') {

            } else if (geometry.type == 'MultiPoint') {

            } else if (geometry.type == 'LineString') {

            } else if (geometry.type == 'MultiLineString') {

            } else if (geometry.type == 'Polygon') {
                for (let segment_num = 0; segment_num < geometry.coordinates.length; segment_num++) {
                    let coordinate_array = this.createCoordinateArray(geometry.coordinates[segment_num]);
                    let convert_array = coordinate_array;
                    if (this._map.options.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857) {
                        convert_array = this.convertCoordinates(coordinate_array);
                    }
                    this.drawPolygon(convert_array, userData, featureGroup);
                }

            } else if (geometry.type == 'MultiPolygon') {
                for (let polygon_num = 0; polygon_num < geometry.coordinates.length; polygon_num++) {
                    for (let segment_num = 0; segment_num < geometry.coordinates[polygon_num].length; segment_num++) {
                        let coordinate_array = this.createCoordinateArray(geometry.coordinates[polygon_num][segment_num]);
                        let convert_array = coordinate_array;
                        if (this._map.options.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857) {
                            convert_array = this.convertCoordinates(coordinate_array);
                        }
                        this.drawPolygon(convert_array, userData, featureGroup);
                    }
                }
            } else {
                throw new Error('The geoJSON is not valid.');
            }
        }
    }
    _mousemoveEvtHandler(event) {
        const mapSize = this._map.getContainerSize();
        const camera = this._map.getCamera();
        const sx = event.offsetX; 
        const sy = event.offsetY;
        const cx = event.clientX;
        const cy = event.clientY;
        //屏幕坐标转标准设备坐标
        const x = (sx / mapSize.width) * 2 - 1; 
        const y = -(sy / mapSize.height) * 2 + 1;
        //标准设备坐标
        const standardVector = new THREE.Vector3(x, y, 0.5); 
        //标准设备坐标转世界坐标
        const worldVector = standardVector.unproject(camera);
        //射线投射方向单位向量(worldVector坐标减相机位置坐标)
        const ray = worldVector.sub(camera.position).normalize();
        //创建射线投射器对象
        const raycaster = new THREE.Raycaster(camera.position, ray);
        //返回射线选中的对象
        const intersects = raycaster.intersectObjects(this._container.children, true);
      
        // 避免连续选中
        if (this._currentSelectGroup) {
            this._currentSelectGroup.children.forEach(obj => {
                obj.material.color = obj.userData.oldColor;
            });
            this._currentSelectGroup = null;
            this._tooltip && this._tooltip.close();
        }

        for (var i = 0; i < intersects.length; i++) {
            let object = intersects[i].object;
            let udata = object.userData;
            if (udata && udata.type === 'area') { 
                this._currentSelectGroup = object.parent;
                this._currentSelectGroup.children.forEach(obj => {
                    obj.userData.oldColor = obj.material.color;
                    obj.material.color = new THREE.Color(this.options.hightLight.color);
                });
                let content = `${udata['name']}`;
                this._tooltip && this._tooltip.open(sx, sy, content);
                break;
            }
        }
        if (i === intersects.length) {
            if (this._currentSelectGroup) {
                this._currentSelectGroup.children.forEach(obj => {
                    obj.material.color = obj.userData.oldColor;
                });
                this._currentSelectGroup = null;
                this._tooltip && this._tooltip.close();
            }
        }
    }
    updateLabels(barLayer, filterText = []) {
        if (this._features == null || !this._features.length) {return;}
        let barWidth = 0;
        if (barLayer) {
            barWidth = barLayer.options.barStyle.width;
        }
        let textData = [];
        let nullTextData = [];
        let forceBoundsCenter = this.options.forceBoundsCenter;
        // if (this._map.options.region === 'china' || this._map.options.region === 'world') {
        //     forceBoundsCenter = false;
        // }

        for (let i = 0, len = this._features.length; i < len; i++) {
            let f = this._features[i];
            let yoffset = this.getDepth();
            let tempobj = {};
            let name = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getNormalizeName"](f);
            let center = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getNormalizeCenter"](f, forceBoundsCenter);
            if (center == null || !Array.isArray(center)) {
                continue; // geometry 为null时得不到center
            }
            // FIXME: 采用简单粗暴方法避免文字覆盖
            // tempobj.textAlign = 'left';
            // if (new RegExp(name).test('香港')) {
            //     tempobj.textAlign = 'left'
            // } else if (new RegExp(name).test('澳门')) {
            //     tempobj.textAlign = 'right'
            // } else if (new RegExp(name).test('广东')) {
            //     tempobj.textBaseline = 'bottom'
            // } else if (new RegExp(name).test('北京')) {
            //     tempobj.textAlign = 'right'
            // } else if (new RegExp(name).test('天津')) {
            //     tempobj.textAlign = 'left'
            // }
            tempobj.text = name;
            tempobj.center = center;
            tempobj.center[1] += barWidth*2; // TODO: 避免文字覆盖柱子
            tempobj.altitude = yoffset + this.options.areaText.offset;
            if (f.hasBarData) {
                textData.push(tempobj);
            } else {
                let isFilter = filterText.indexOf(tempobj.text) !== -1;
                if (!isFilter) {
                    nullTextData.push(tempobj);
                }
            }  
        }
        const textOptions = {
            isAvoidCollision: this.options.areaText.isAvoidCollision,
            textStyle: this.options.areaText.textStyle
        };
        const nullTextOptions = {
            isAvoidCollision: this.options.areaText.isAvoidCollision,
            textStyle: this.options.areaText.nullTextStyle
        };
        if (this.options.areaText.textStyle.show) {
            if (this._textLayer) {
                this._textLayer.update(textData);
            } else {
                this._textLayer = new _text_layer__WEBPACK_IMPORTED_MODULE_3__["default"](textData, textOptions);
                this._map.addLayer(this._textLayer);
            }
        }
        if (this.options.areaText.show) {
            if (this._nulltextLayer) {
                this._nulltextLayer.update(nullTextData);
            } else {
                this._nulltextLayer = new _text_layer__WEBPACK_IMPORTED_MODULE_3__["default"](nullTextData, nullTextOptions);
                this._map.addLayer(this._nulltextLayer);
            }
        }
    }
    drawOutLine(points, mesh, lineOptions) {
        // 画轮廓线
        // 因为面是画在xy平面的，然后通过旋转而来，为了保持一致，轮廓线也绘制在xy平面，这样变换就能与面同步
        let line_geom = new THREE.Geometry();
        for (let i = 0, len=points.length; i < len ; i++) {
            line_geom.vertices.push(new THREE.Vector3(points[i][0], points[i][1], 0));
        }
        let options = {
            color: lineOptions.color,
            linewidth: lineOptions.width
        };
        let line_material = new THREE.LineBasicMaterial(options);
        if (lineOptions.opacity > 0) {
            line_material.transparent = true;
            line_material.opacity = lineOptions.opacity;
        }
        let line = new THREE.Line(line_geom, line_material);
        if (lineOptions.offset) {
            line.translateZ(lineOptions.offset);
        }
        // line.renderOrder = 80;
        // line.material.depthTest = false;
        mesh.add(line);
    }
    drawOutLine2(points, mesh, options) {
        const size = this._map.getContainerSize();

        points = points.map(pt => new THREE.Vector3(pt[0], pt[1], 0));

        const geometry = new THREE.Geometry().setFromPoints( points );
        
        const line = new _custom_meshline__WEBPACK_IMPORTED_MODULE_5__["MeshLine"]();
        line.setGeometry(geometry);

        const resolution = new THREE.Vector2(size.width, size.height);
        const lineColor = new THREE.Color(options.color);
        const opacity = options.opacity;
        const linewidth = options.width;
        const shaderMaterial = new _custom_meshline__WEBPACK_IMPORTED_MODULE_5__["MeshLineMaterial"]({
            resolution: resolution,
            color: lineColor,
            opacity: opacity,
            sizeAttenuation: false,
            lineWidth: linewidth
        });

        const lineMesh = new THREE.Mesh(line.geometry, shaderMaterial);
        if (options.offset) {
            lineMesh.translateZ(options.offset);
        }
        // lineMesh.renderOrder = 80;
        // lineMesh.material.depthTest = false;
        mesh.add(lineMesh);
    }
    createGeometry(points) {
        const shape = new THREE.Shape();
        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            if (i === 0) {
                shape.moveTo(point[0], point[1]);
            } else {
                shape.lineTo(point[0], point[1]);
            }
        }
        shape.closePath();  
        
        let geometry;
        if (this.options.isExtrude) {
            let extrudeSettings = {
                depth: this.options.depth, 
                bevelEnabled: false   // 是否用斜角
            };
            geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        } else {
            geometry = new THREE.ShapeBufferGeometry(shape);
        }
        return geometry;
    }
    drawPolygon(points, userData, container) {

        let geometry, material;
        let areaMaterialOptions = this.options.areaMaterial;
        if (this.options.isAreaMutilColor) {
            areaMaterialOptions.color = userData.color;
        }

        geometry = this.createGeometry(points);

        if (this.options.isExtrude) {
            // 拉伸
            // let extrudeSettings = {
            //     depth: this.options.depth, 
            //     bevelEnabled: false   // 是否用斜角
            // };
            // geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
            let material1 = new THREE.MeshPhongMaterial(areaMaterialOptions);
            if (areaMaterialOptions.opacity < 1) {
                material1.transparent = true;
                material1.opacity = areaMaterialOptions.opacity;
            }
            if (this.options.extrudeMaterial) {
                let texture;
                if (this.options.extrudeMaterial.textureSrc) {
                    texture = new THREE.TextureLoader().load(this.options.extrudeMaterial.textureSrc);
                    texture.center = new THREE.Vector2(0.5, 0.5);
                    texture.rotation = Math.PI;
                }
                let material2 = new THREE.MeshPhongMaterial({
                    map: texture ? texture : null,
                    color: texture ? 0xffffff : this.options.extrudeMaterial.color
                });
                if (this.options.extrudeMaterial.opacity < 1) {
                    material2.transparent = true;
                    material2.opacity = this.options.extrudeMaterial.opacity;
                }
                material = [material1, material2];
            } else {
                material = material1;
            }
        } else {
            // 不拉伸
            // geometry = new THREE.ShapeBufferGeometry(shape);
            material = new THREE.MeshBasicMaterial(areaMaterialOptions);
            if (areaMaterialOptions.opacity < 1) {
                material.transparent = true;
                material.opacity = areaMaterialOptions.opacity;
            }
        }
        
        let mesh = new THREE.Mesh(geometry, material);

        // 画线
        let options = {
            offset: this.options.isExtrude ? this.options.depth : 0
        };
        if (this.options.outline.normal.show) {
            options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](options, this.options.outline.normal);
            if (options.width <= 1) {
                this.drawOutLine(points, mesh, options);
            } else {
                this.drawOutLine2(points, mesh, options);
            }
        }
        if (this.options.outline.top.show) {
            options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](options, this.options.outline.top);
            this.drawOutLine2(points, mesh, options);
        }
        if (this.options.outline.bottom.show) {
            options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](options, this.options.outline.bottom);
            options.offset = 0;
            this.drawOutLine2(points, mesh, options);
        }

        mesh.rotateX(-Math.PI/2);
        mesh.userData = _util__WEBPACK_IMPORTED_MODULE_1__["extend"]({type: 'area'}, userData);
        container.add(mesh);
    }
}

/***/ }),

/***/ "./js/layers/layer.js":
/*!****************************!*\
  !*** ./js/layers/layer.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Layer; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./js/util.js");
/* harmony import */ var _eventemiter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../eventemiter */ "./js/eventemiter.js");


class Layer extends _eventemiter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(data, options) {
        super();
        var defaultOptions = {};
        this.options = _util__WEBPACK_IMPORTED_MODULE_0__["extend"](true, defaultOptions, options);
        this.type = null;
        this._data = data;
        this._container = new THREE.Group();
    }
    getContainer() {
        return this._container;
    }
    getData() {
        return this._data;
    }
    getMap() {
        return this._map;
    }
    onAdd(map) {
        this._map = map;
    }
    onRemove(map) {}
}

/***/ }),

/***/ "./js/layers/point-layer.js":
/*!**********************************!*\
  !*** ./js/layers/point-layer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PointLayer; });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "./js/layers/layer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./js/util.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tooltip */ "./js/tooltip.js");
/* harmony import */ var _text_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./text-layer */ "./js/layers/text-layer.js");




class PointLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(data, options) {
        // data: [{points:[],info:{}}, {points:[],info:null}, ....]
        super(data, options);
        const defaultOptions = {
            size: 3,
            depth: 0,
            style: {
                texture: '../../images/disc.png', //  url or null
                color: '#0f0',
                opacity: 1,
            },
            tooltip: {
                show: false
            },
            hightLight: {
                show: true,
                color: '#f00'
            },
            pointText: {
                show: false,
                showField: 'name',
                yoffset: 1,
                isAvoidCollision: true, // 是否避免文字碰撞
                textStyle: {
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '12px',
                    fontFamily: 'Microsoft YaHei',
                    fontColor: '#000',
                    textAlign: 'center',
                    textBaseline: 'middle'
                }
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, defaultOptions, options); 

        this.type = 'pointLayer';
    }
    onAdd(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onAdd.call(this, map); 
        this._draw();
        if (this.options.hightLight.show || this.options.tooltip.show) {
            this._map.on('mousemove', this._mousemoveEvtHandler, this);
        }
        if (this.options.tooltip.show) {
            this._tooltip = new _tooltip__WEBPACK_IMPORTED_MODULE_2__["default"](this._map.getContainerElement());
        }
        if (this.options.pointText.show) {
           this._addTextLayer();
        }
    }
    onRemove(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onRemove.call(this, map);
        this._map.off('mousemove', this._mousemoveEvtHandler, this);
        if (this._textLayer) {
            this._map.removeLayer(this._textLayer);
        }
    }
    update(data) {
        this._data = data;
        this.clear();
        this._draw();
        if (this.options.pointText.show) {
            this._addTextLayer();
        }
    }
    clear() {
        if (this._textLayer) {
            this._map.removeLayer(this._textLayer);
        }
        this._container.remove(...this._container.children);
    }
    _draw() {
        this._data.forEach(item => {
            let points = item.points;
            let info = item.info;
            const materialOptions = {
                color: this.options.style.color,
                alphaTest: 0.1,
                size: this.options.size,
                opacity: this.options.style.opacity
            };

            if (this.options.style.texture) {
                if (!this._loader) this._loader = new THREE.TextureLoader();
                if (!this._texture) this._texture = this._loader.load( this.options.style.texture );
                materialOptions.map = this._texture;
            }
            
            points = points.map(pt => {
                let prjPt = this._map.projectLngLat(pt);
                if (this._map.options.type === 'sphere') {
                    return new THREE.Vector3(prjPt[0], prjPt[1], prjPt[2]);
                } else {
                    return new THREE.Vector3(prjPt[0], pt[2], -prjPt[1]);
                }
            });

            const pointGeometry = new THREE.BufferGeometry();
            pointGeometry.setFromPoints(points);

            const pointsMaterial = new THREE.PointsMaterial( materialOptions );
            pointsMaterial.transparent = true;

            const pointsObj = new THREE.Points( pointGeometry, pointsMaterial );
            if (this.options.depth > 0) {
                pointsObj.translateY(this.options.depth);
            }
            if (this._map.options.type === 'plane') {
                // 球形地图不要加此属性
                pointsObj.renderOrder=99;
                pointsObj.material.depthTest=false;
            }
            pointsObj.userData = _util__WEBPACK_IMPORTED_MODULE_1__["extend"]({type: 'point'}, info);
            
            this._container.add(pointsObj);
        });
    }
    _addTextLayer() {
        let textData = [];
        this._data.forEach(item => {
            let info = item.info;
            item.points.forEach(pt => {
                let tempobj = {};
                tempobj.center = [pt[0], pt[1]];
                tempobj.altitude = this.options.pointText.yoffset +  pt[2];
                tempobj.text = info ? info[this.options.pointText.showField] : '';
                textData.push(tempobj);
            });
        });
        this._textLayer = new _text_layer__WEBPACK_IMPORTED_MODULE_3__["default"](textData, { 
            isAvoidCollision: this.options.pointText.isAvoidCollision,
            textStyle: this.options.pointText.textStyle
         });
        this._map.addLayer(this._textLayer);
    }
    _mousemoveEvtHandler(event) {
        const mapSize = this._map.getContainerSize();
        const camera = this._map.getCamera();
        const sx = event.offsetX; 
        const sy = event.offsetY;
        const cx = event.clientX;
        const cy = event.clientY;
        //屏幕坐标转标准设备坐标
        const x = (sx / mapSize.width) * 2 - 1; 
        const y = -(sy / mapSize.height) * 2 + 1;
        //标准设备坐标
        const standardVector = new THREE.Vector3(x, y, 0.5); 
        //标准设备坐标转世界坐标
        const worldVector = standardVector.unproject(camera);
        //射线投射方向单位向量(worldVector坐标减相机位置坐标)
        const ray = worldVector.sub(camera.position).normalize();
        //创建射线投射器对象
        const raycaster = new THREE.Raycaster(camera.position, ray);
        //返回射线选中的对象
        const intersects = raycaster.intersectObjects(this._container.children);
      
        // 避免连续选中
        if (this._currentSelectObj) {
            if (this.options.hightLight.show) {
                this._currentSelectObj.material.color = this._currentSelectObj.userData.oldColor;
            }
            this._currentSelectObj = null;
            this._tooltip && this._tooltip.close();
        }

        for (var i = 0; i < intersects.length; i++) {
            let object = intersects[i].object;
            let udata = object.userData;
            if (udata && udata.type === 'point') {
                if (this.options.hightLight.show) {
                    object.userData.oldColor = object.material.color;
                    object.material.color = new THREE.Color(this.options.hightLight.color);
                }
                this._currentSelectObj = object;
                let content = `${udata['name']}`;
                this._tooltip && this._tooltip.open(sx, sy, content);
                break;
            }
        }
        if (i === intersects.length) {
            if (this._currentSelectObj) {
                if (this.options.hightLight.show) {
                    this._currentSelectObj.material.color = this._currentSelectObj.userData.oldColor;
                }
                this._currentSelectObj = null;
                this._tooltip && this._tooltip.close();
            }
        }
    }
}

/***/ }),

/***/ "./js/layers/text-layer.js":
/*!*********************************!*\
  !*** ./js/layers/text-layer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextLayer; });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "./js/layers/layer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./js/util.js");
/* harmony import */ var _text_sprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text-sprite */ "./js/layers/text-sprite.js");
/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../maphelper */ "./js/maphelper.js");





// 文字标注图层
class TextLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(data, options) {
        super(data, options);
        const defaultOptions = {
            isAvoidCollision: true, // 是否避免文字碰撞，默认为 true，即文字会根据缩放级别显示和隐藏，不会相互覆盖；若设置为 false，则文字会全部显示
            textStyle: {
                scale: 1, // 注意：此属性失效
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                fontFamily: 'Microsoft YaHei',
                fontColor: '#000',
                textAlign: 'center',
                textBaseline: 'middle',
                maxWidth: 512,
                offsetY: 0, // 为避免文字覆盖柱子，设置文字偏移中心点
                opacity: 1,
                labelPointStyle: {
                    show: false, // 是否显示文字旁边的标注点
                    margin: 4, // 标注点距离文字的距离
                    radius: 6, // 标注点半径
                    color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
                }
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, defaultOptions, options);
        this.type = 'textLayer';
        this._textSprites = [];
        this._texts = [];
    }
    onAdd(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onAdd.call(this, map); 
        this._draw();
        if (this.options.isAvoidCollision || this._map.options.type === 'sphere') {
            this._map.on('change', this._mapChangeEvtHandler, this);
        }
    }
    onRemove(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onRemove.call(this, map);
        if (this.options.isAvoidCollision || this._map.options.type === 'sphere') {
            this._map.off('change', this._mapChangeEvtHandler, this);
        }
    }
    update(data) {
        this._map.off('change', this._mapChangeEvtHandler, this);
        this.clear();
        this._data = data;
        this._draw();  
        if (this.options.isAvoidCollision || this._map.options.type === 'sphere') {
            this._map.on('change', this._mapChangeEvtHandler, this);
        }
    }
    updateScale() {
        if (!this._map) {
            return;
        }
        const camera = this._map.getCamera();
        const size = this._map.getContainerSize();
        this._textSprites.forEach(sprite => {
            sprite.setScale(camera, size);
        });
    }
    clear() {
        this._container.remove(...this._container.children);
    }
    _getWorldPosition(d) {
        let centerLatLng = d.center;
        let altitude = d.altitude || 0;
        let projCenter = this._map.projectLngLat([...centerLatLng, altitude]);
        return projCenter;
    }
    _getSpritePosition(d) {
        const projCenter = this._getWorldPosition(d);
        let position;
        if (this._map.options.type === 'plane') {
            const offsetY = this.options.textStyle.offsetY;
            position = [projCenter[0], projCenter[2], -projCenter[1]-offsetY];
        } else {
            position = [projCenter[0], projCenter[1], projCenter[2]];
        }
        return position;
    }
    getFontStyle() {
        return `${this.options.textStyle.fontStyle} ${this.options.textStyle.fontWeight} ${this.options.textStyle.fontSize} ${this.options.textStyle.fontFamily}`;
    }
    _filterShowData() {
        if (this._data == null || !this._data.length) {return [];}
        if (this._map.options.type === 'sphere') {
            let showData = this._data.filter(d => {
                let isInRange = this._map.isLngLatInRange(d.center);
                return isInRange;
            });
            if (this.options.isAvoidCollision) {
                showData = this._filterCollisionData(showData);
            }
            return showData;
        } else {
            let showData = this._data;
            if (this.options.isAvoidCollision) {
                showData = this._filterCollisionData(showData);
            }
            return showData;
        }
    }
    _filterCollisionData(data) {
        this._texts = [];
        const font = this.getFontStyle();
        data.forEach(d => {
            let position = this._getSpritePosition(d);
            let obj = {};
            const screenPoint = Object(_maphelper__WEBPACK_IMPORTED_MODULE_3__["worldToScreen"])(position, this._map);
            const textSize = _util__WEBPACK_IMPORTED_MODULE_1__["measureText"](d.text, font);
            obj.x = screenPoint[0];
            obj.y = screenPoint[1];
            obj.w = textSize.width;
            obj.h = textSize.height;
            obj.show = true;
            this._texts.push(obj);
        });

        const len = this._texts.length;
        for (let i = 0; i < len; i++) {
            let text1 = this._texts[i];
            for (let j = i+1; j < len; j++) {
                let text2 = this._texts[j];
                if (Object(_maphelper__WEBPACK_IMPORTED_MODULE_3__["isPOICollision"])(text1, text2)) {
                    text2.show = false;
                } 
            }
        }
        
        let showData = [];
        this._texts.forEach((text, index) => {
            if (text.show) {
                showData.push(data[index]);
            }
        });

        return showData;
    }
    _draw() {
        this._textSprites = [];
        const showData = this._filterShowData();
        showData.forEach(d => {
            // 为了避免文字覆盖，对每个文字设置不同的对齐方式 
            // if (d.textAlign != null) {
            //     this.options.textStyle.textAlign = d.textAlign;
            // }
            // if (d.textBaseline != null) {
            //     this.options.textStyle.textBaseline = d.textBaseline;
            // }
            let position = this._getSpritePosition(d);
            const ts = new _text_sprite__WEBPACK_IMPORTED_MODULE_2__["default"](d.text, this.options.textStyle);
            const textSprite = ts.getSprite();
            textSprite.position.set(...position);
            
            // 避免柱子遮挡地名
            textSprite.renderOrder = 100;
            textSprite.material.depthTest=false; // 是否采用深度测试，必须加
            
            this._textSprites.push(ts);
            this._container.add(textSprite);
        });
    }
    _mapChangeEvtHandler() {
        this.clear();
        this._draw();
    }
    // 文字碰撞检测 window.geojsonLayer._nulltextLayer._collisionDetect()
    // TODO: 视口裁剪，只计算视口内的部分
    _collisionDetect() {
        this._texts = [];

        this._textSprites.forEach(textSprite => {
            // 碰撞检测
            let obj = {};
            const sprite = textSprite.getSprite();
            const screenPoint = Object(_maphelper__WEBPACK_IMPORTED_MODULE_3__["worldToScreen"])(sprite.position.toArray(), this._map, sprite);
            const size = textSprite.getTextSize();
            obj.x = screenPoint[0];
            obj.y = screenPoint[1];
            obj.w = size.width;
            obj.h = size.height;
            obj.show = true;
            this._texts.push(obj);
        });

        const len = this._texts.length;
        for (let i = 0; i < len; i++) {
            let text1 = this._texts[i];
            for (let j = i+1; j < len; j++) {
                let text2 = this._texts[j];
                if (Object(_maphelper__WEBPACK_IMPORTED_MODULE_3__["isPOICollision"])(text1, text2)) {
                    text2.show = false;
                } 
            }
        }

        // 隐藏重叠元素
        this._texts.forEach((text, index) => {
            if (text.show) {
                this._textSprites[index].show();
            } else {
                this._textSprites[index].hide();
            }
        });
        
        // draw
        this._textSprites.forEach(textSprite => {
            const sprite = textSprite.getSprite();
            this._container.add(sprite);
        });
    }
}

/***/ }),

/***/ "./js/layers/text-sprite.js":
/*!**********************************!*\
  !*** ./js/layers/text-sprite.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextSprite; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./js/util.js");


// 字体精灵
class TextSprite {
    constructor(text, options) {
        const defaultOptions = {
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '16px',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#000',
            textAlign: 'center',
            textBaseline: 'middle',
            opacity: 1,
            maxWidth: 512,
            labelPointStyle: {
                show: false, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 6, // 标注点半径
                color: '#fff', // 标注点颜色，可以是 hexString、rgb、rgba
                image: null
            }
        }
        this.options = _util__WEBPACK_IMPORTED_MODULE_0__["extend"](true, defaultOptions, options);

        this._textStr = text == null ? '' : String(text);

        this._init();
    }
    getSprite() {
        return this._textSprite;
    }
    // canvas 样式尺寸
    getSize() {
        return {
            width: this._width,
            height: this._height
        };
    }
    // 实际显示文字的尺寸
    getTextSize() {
        return {
            width: this._textWidth,
            height: this._textHeight
        };
    }
    // idea from https://www.cnblogs.com/dojo-lzz/p/7143276.html
    setScale(camera, containerSize) {
        const DEG2RAD = Math.PI / 180;
        let pos = this._textSprite.position;
        let distance = camera.position.distanceTo(pos);
        let top = Math.tan(camera.fov / 2 * DEG2RAD) * distance;
        let ratio = 2 * top / containerSize.height;
        let scaleX = this._width * ratio;
        let scaleY = this._height * ratio;
        this._textSprite.scale.set(scaleX, scaleY, 1);
    }

    hide() {
        this._textSprite.material.opacity = 0;
    }

    show() {
        this._textSprite.material.opacity = this.options.opacity;
    }

    _getLabelPointCoord(textPoint) {
        const dpr = _util__WEBPACK_IMPORTED_MODULE_0__["getDpr"]();
        let point = {
            x: textPoint.x,
            y: textPoint.y
        };
        const labelPointStyle = this.options.labelPointStyle;
        const r = Math.min(labelPointStyle.radius, this._textWidth/2);
        const maxMargin = this._textWidth - r * 2;
        const margin = Math.min(labelPointStyle.margin, maxMargin);
        // const sumDis = labelPointStyle.margin + labelPointStyle.radius * 2;
        
        if (this.options.textAlign === 'left' || this.options.textAlign === 'start' ) {
            point.x = point.x - margin * dpr;
        } else if (this.options.textAlign === 'right' || this.options.textAlign === 'end') {
            point.x = point.x + margin * dpr;
        }
        // if (this.options.textBaseline === 'top') {
        //     point.y = textPoint.y - sumDis;
        // } else if (this.options.textBaseline === 'bottom') {
        //     point.y = textPoint.y + sumDis;
        // }
        return point;
    }

    _getTextPointCoord(canvas) {
        // const dpr = Util.getDpr();
        // let offsetX = this._textWidth * dpr / 2;
        // let offsetY = this._textHeight * dpr / 2;
        let point = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
        // if (this.options.textAlign === 'left' || this.options.textAlign === 'start' ) {
        //     point.x -= offsetX;
        // }  else if (this.options.textAlign === 'right' || this.options.textAlign === 'end') {
        //     point.x += offsetX;
        // }
        // if (this.options.textBaseline === 'top') {
        //     point.y -= offsetY;
        // } else if (this.options.textBaseline === 'bottom') {
        //     point.y += offsetY;
        // }
        return point;
    }

    _init() {
        const font = `${this.options.fontStyle} ${this.options.fontWeight} ${this.options.fontSize} ${this.options.fontFamily}`;

        const textSize = _util__WEBPACK_IMPORTED_MODULE_0__["measureText"](this._textStr, font);
        let { width: textWidth, height: textHeight } = textSize;
    
        let xIncreaseDis = 0;
        let yIncreaseDis = 0;
        if (this.options.labelPointStyle.show) {
            xIncreaseDis = this.options.labelPointStyle.margin + this.options.labelPointStyle.radius;
        }
        if (this.options.textAlign !== 'center') {
            xIncreaseDis += textWidth;
        }
        if (this.options.textBaseline !== 'middle') {
            yIncreaseDis += textHeight;
        }
         // webgl 规定 canvas 宽高为2的n次幂，对老式GPU的支持
        const canvasWidth = _util__WEBPACK_IMPORTED_MODULE_0__["wrapNum"](textWidth + xIncreaseDis);
        const canvasHeight = _util__WEBPACK_IMPORTED_MODULE_0__["wrapNum"](textHeight + yIncreaseDis);
        this._width = canvasWidth;
        this._height = canvasHeight;
        this._textWidth = textWidth;
        this._textHeight = textHeight;

        const canvas = document.createElement("canvas");
        
        // 适配高清屏：将 canvas 画布尺寸扩大 dpr 倍，视口尺寸设为原始值，并且 canvas 内部所有元素大小扩大 dpr 倍
        const dpr = _util__WEBPACK_IMPORTED_MODULE_0__["getDpr"]();
        canvas.style.width = canvasWidth + "px";
        canvas.style.height = canvasHeight + "px";
        canvas.height = canvasHeight * dpr;
        canvas.width = canvasWidth * dpr;

        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw

        // test-start
        // ctx.save();
        // ctx.beginPath();
        // ctx.fillStyle="rgba(255,0,0,0.5)";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        // ctx.restore();
        // test-end

        // 文字
        const drpFont = `${this.options.fontStyle} ${this.options.fontWeight} ${parseInt(this.options.fontSize) * dpr + 'px'} ${this.options.fontFamily}`;
        const textPoint = this._getTextPointCoord(canvas);
        ctx.save();
        ctx.font = drpFont;
        ctx.fillStyle = this.options.fontColor;
        ctx.textAlign = this.options.textAlign;
        ctx.textBaseline = this.options.textBaseline;
        ctx.fillText(this._textStr, textPoint.x, textPoint.y, this.options.maxWidth);
        ctx.restore();
        
        // 标注点
        if (this.options.labelPointStyle.show) {
            ctx.save();
            const radius = this.options.labelPointStyle.radius;
            const color = this.options.labelPointStyle.color;
            const point = this._getLabelPointCoord(textPoint);
            ctx.fillStyle = color;
            ctx.beginPath();
            const r = Math.min(radius, this._textWidth/2);
            ctx.arc(point.x, point.y, r*dpr, 0, Math.PI * 2);
            ctx.clip();
            if (this.options.labelPointStyle.image) {
                 const img = this.options.labelPointStyle.image;
                // const img = new Image();
                // img.onload = e => {
                    ctx.globalCompositeOperation = "destination-over";
                    // ctx.drawImage(img, point.x-r*dpr, point.y-r*dpr, r*dpr*2, r*dpr*2);
                    ctx.drawImage(img, point.x-img.width/2, point.y-img.height/2);
                    // ctx.fillRect(point.x-r*dpr, point.y-r*dpr, r*dpr*2, r*dpr*2);
                // };
                // img.src = this.options.labelPointStyle.imageSrc;
            }
            // ctx.fill();
            ctx.restore();
        }

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent:true
        });
        spriteMaterial.opacity = this.options.opacity;
        this._textSprite = new THREE.Sprite(spriteMaterial);
    }
}

/***/ }),

/***/ "./js/maphelper.js":
/*!*************************!*\
  !*** ./js/maphelper.js ***!
  \*************************/
/*! exports provided: CRS, wgs84ToMecator, mecatorToWgs84, getBounds, getNormalizeCenter, getCentroid, worldToScreen, screenToWorld, isPOICollision, getNormalizeName, scalePoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CRS", function() { return CRS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wgs84ToMecator", function() { return wgs84ToMecator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mecatorToWgs84", function() { return mecatorToWgs84; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBounds", function() { return getBounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNormalizeCenter", function() { return getNormalizeCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCentroid", function() { return getCentroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "worldToScreen", function() { return worldToScreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "screenToWorld", function() { return screenToWorld; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPOICollision", function() { return isPOICollision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNormalizeName", function() { return getNormalizeName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scalePoint", function() { return scalePoint; });
/* harmony import */ var _bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bounds */ "./js/bounds.js");


const R = 6378137; // 地球半径（米）
const R_MINOR = 6356752.314245179;
const BOUND = new _bounds__WEBPACK_IMPORTED_MODULE_0__["default"](-20037508.34279, -15496570.73972, 20037508.34279, 18764656.23138);

const CRS = {
    epsg4326: 'EPSG:4326',
    epsg3857: 'EPSG:3857'
}

// 经纬度转墨卡托
function wgs84ToMecator(lnglat) {
    var d = Math.PI / 180,
        r = R,
        y = lnglat[1] * d,
        tmp = R_MINOR / r,
        e = Math.sqrt(1 - tmp * tmp),
        con = e * Math.sin(y);

    var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
    y = -r * Math.log(Math.max(ts, 1E-10));

    return [lnglat[0] * d * r, y];
}

// 墨卡托转经纬度
function mecatorToWgs84(point) {
    var d = 180 / Math.PI,
        r = R,
        tmp = R_MINOR / r,
        e = Math.sqrt(1 - tmp * tmp),
        ts = Math.exp(-point[1] / r),
        phi = Math.PI / 2 - 2 * Math.atan(ts);

    for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
        con = e * Math.sin(phi);
        con = Math.pow((1 - con) / (1 + con), e / 2);
        dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
        phi += dphi;
    }

    return [point[0] * d / r, phi * d];
}

// 根据geojson数据获取geo对象在墨卡托投影平面的范围
function getBounds(geojson, crs) {
    crs = crs || CRS.epsg4326;
    // 中国和世界范围写死，避免大量计算
    if (geojson === 'world') {
        let xmin = -180;
        let ymin = -58.502571;
        let xmax = 180;
        let ymax = 83.610184;
        let lb = [xmin, ymin];
        let rt = [xmax, ymax];
        if (crs === CRS.epsg3857) {
            lb = wgs84ToMecator(lb);
            rt = wgs84ToMecator(rt);
        }
        return new _bounds__WEBPACK_IMPORTED_MODULE_0__["default"](lb, rt);
    } else if (geojson === 'china') {
        let xmin = 73.4766;
        let xmax = 135.0879;
        let ymin = 18.1055;
        let ymax = 53.5693;
        let lb = [xmin, ymin];
        let rt = [xmax, ymax];
        if (crs === CRS.epsg3857) {
            lb = wgs84ToMecator(lb);
            rt = wgs84ToMecator(rt);
        }
        return new _bounds__WEBPACK_IMPORTED_MODULE_0__["default"](lb, rt);
    } else {
        let bound = {
            xmin: 180,
            xmax: -180,
            ymin: 90,
            ymax: -90
        };
        let features = [];
        let polygons = [];
        if (geojson.type === "FeatureCollection") {
            features = geojson.features;
        } else if (geojson.type === "Feature") {
            features.push(geojson);
        }
        features.forEach(f => {
            if (f.geometry && f.geometry.type === "Polygon") {
                polygons.push(f.geometry.coordinates);
            } else if (f.geometry && f.geometry.type === "MultiPolygon") {
                for (let i = 0, len = f.geometry.coordinates.length; i < len; i++) {
                    polygons.push(f.geometry.coordinates[i]);
                }
            }
        });
        for (let i = 0, len = polygons.length; i < len; i++) {
            let seg = polygons[i];
            for (let j = 0; j < seg.length; j++) {
                let coords = seg[j];
                for (let k = 0; k < coords.length; k++) {
                    let coord = coords[k];
                    if (coord[0] < bound.xmin) {
                        bound.xmin = coord[0];
                    }
                    if (coord[0] > bound.xmax) {
                        bound.xmax = coord[0];
                    }
                    if (coord[1] < bound.ymin) {
                        bound.ymin = coord[1];
                    }
                    if (coord[1] > bound.ymax) {
                        bound.ymax = coord[1];
                    }
                }
            }
        }
        let lb = [bound.xmin, bound.ymin];
        let rt = [bound.xmax, bound.ymax];
        if (crs === CRS.epsg3857) {
            lb = wgs84ToMecator(lb);
            rt = wgs84ToMecator(rt);
        }
        return new _bounds__WEBPACK_IMPORTED_MODULE_0__["default"](lb, rt);
    }
}

function getNormalizeCenter(feature, forceBoundsCenter = false) {
    let props = feature.properties;
    let center = props && (props.center || props.cp);
    if (center && typeof center === 'string') {
        center = center.split(',');
    }
    if (Array.isArray(center)) {
        center = center.map(item => Number(item));
    }
    if (forceBoundsCenter || center == null) {
        // let bounds = getBounds(feature);
        // center = bounds.getCenter();
        center = getCentroid(feature);
    }
    return center;
}

function createCoordinateArray(ring) {
    //Loop through the coordinates and figure out if the points need interpolation.
    let temp_array = [];

    for (let point_num = 0; point_num < ring.length; point_num++) {
        temp_array.push(ring[point_num]);
    }
    return temp_array;
}

// idea from turf.js
// TODO: 更佳的文字排版方式参考 QGIS 软件实现
function getCentroid(feature) {
    let geometry = feature.geometry;
    let coords = [];
    if (geometry == null) {
        return ;
    }
    if (geometry.type == 'Point') {

    } else if (geometry.type == 'MultiPoint') {

    } else if (geometry.type == 'LineString') {

    } else if (geometry.type == 'MultiLineString') {

    } else if (geometry.type == 'Polygon') {
        coords = createCoordinateArray(geometry.coordinates[0]);
    } else if (geometry.type == 'MultiPolygon') {
        let maxPolygonNum = 0;
        for (let polygon_num = 0; polygon_num < geometry.coordinates.length; polygon_num++) {
            if (geometry.coordinates[polygon_num][0].length > geometry.coordinates[maxPolygonNum][0].length) {
                maxPolygonNum = polygon_num;
            }
        }
        coords = createCoordinateArray(geometry.coordinates[maxPolygonNum][0]);
    } else {
        throw new Error('The geoJSON is not valid.');
    }
    // 计算
    let sumX = 0;
    let sumY = 0;
    let len = 0;
    coords.forEach(point => {
        sumX += point[0];
        sumY += point[1];
        len++;
    });
    return [sumX / len, sumY / len];
}

// 世界坐标转屏幕坐标
// TODO: 有时会出现不准确现象。解决办法：放到 setTimeout 里面
function worldToScreen(xyzPoint, map, obj) {
    const mapSize = map.getContainerSize();
    const camera = map.getCamera();
    camera.updateMatrixWorld();
    // 方法1
    // 世界坐标
    const worldVector = new THREE.Vector3(xyzPoint[0], xyzPoint[1], xyzPoint[2]);
     // 世界坐标转标准设备坐标
    const standartVector = worldVector.project(camera);
    // 标准设备坐标转屏幕坐标
    const sx = Math.round((0.5 + standartVector.x / 2) * mapSize.width); 
    const sy = Math.round((0.5 - standartVector.y / 2) * mapSize.height); 
    return [sx, sy];

    // 或 方法2
/*     const vector = new THREE.Vector3();
    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);
    const widthHalf = mapSize.width/2;
    const heightHalf = mapSize.height/2;
    const sx = (vector.x * widthHalf) + widthHalf;
    const sy = -(vector.y * heightHalf) + heightHalf;
    return [sx, sy]; */
}

// 屏幕坐标转世界坐标
function screenToWorld(screenPoint, map) {
    const mapSize = map.getContainerSize();
    const camera = map.getCamera();
    //屏幕坐标转标准设备坐标
    const x = (screenPoint[0] / mapSize.width) * 2 - 1;
    const y = -(screenPoint[1] / mapSize.height) * 2 + 1;
    //标准设备坐标
    const standardVector = new THREE.Vector3(x, y, 0.5);
    //标准设备坐标转世界坐标
    const worldVector = standardVector.unproject(camera);
    return [worldVector.x, worldVector.y, worldVector.z];
}

// 检测两个矩形是否碰撞
function isPOICollision(sprite1, sprite2) {
    let x1 = sprite1.x;
    let y1 = sprite1.y;
    let w1 = sprite1.w;
    let h1 = sprite1.h;
    let x2 = sprite2.x;
    let y2 = sprite2.y;
    let w2 = sprite2.w;
    let h2 = sprite2.h;
    if (x1 >= x2 && x1 >= x2 + w2) {
        return false;
    } else if (x1 <= x2 && x1 + w1 <= x2) {
        return false;
    } else if (y1 >= y2 && y1 >= y2 + h2) {
        return false;
    } else if (y1 <= y2 && y1 + h1 <= y2) {
        return false;
    } else {
        return true;
    }
}

function getNormalizeName(feature) {
    let props = feature && feature.properties;
    if (props) {
        if (props.name) {
            return props.name;
        } else if (props.id) {
            return props.id;
        } else {
            return '';
        }
    } else {
        return feature.id || '';
    }
}

function scalePoint(point, scale) {
    return point.map(p => p * scale);
}

/***/ }),

/***/ "./js/theme/dark.js":
/*!**************************!*\
  !*** ./js/theme/dark.js ***!
  \**************************/
/*! exports provided: mapOptions, geojsonLayerOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOptions", function() { return mapOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geojsonLayerOptions", function() { return geojsonLayerOptions; });
const mapOptions = {
    bgColor: null,
    light: {
        main: {
            color: '#E6E8EA',
            intensity: 0.8
        },
        ambient: {
            color: '#E6E8EA',
            intensity: 0.6
        }
    },
    bloom: {
        show: false
    }
};

const geojsonLayerOptions = {
    areaText: {
        offset: 0.1,
        textStyle: {
            fontSize: '10px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#fff',
            textAlign: 'left',
            textBaseline: 'middle',
            labelPointStyle: {
                show: true, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 3, // 标注点半径
                color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        },
        nullTextStyle: {
            fontSize: '10px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#fff',
            textAlign: 'left',
            textBaseline: 'middle',
            labelPointStyle: {
                show: true, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 3, // 标注点半径
                color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        }
    },
    isAreaMutilColor: true,
    mutiColors: ['#022956', '#022956', '#2B95E5', '#107AE0'],
    areaMaterial: { // 面材质配置
        color: '#1C1F3B'
    },
    extrudeMaterial: {
        color: '#0086FF',
        opacity: 1,
        textureSrc: '/static/images/dark_edge.png'
    },
    outline: {
        normal: {
            show: true,
            color: '#0086ff',
            width: 3,
            opacity: 1
        }
    }
};

/***/ }),

/***/ "./js/theme/defaultDark.js":
/*!*********************************!*\
  !*** ./js/theme/defaultDark.js ***!
  \*********************************/
/*! exports provided: mapOptions, geojsonLayerOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOptions", function() { return mapOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geojsonLayerOptions", function() { return geojsonLayerOptions; });
const mapOptions = {
    bgColor: null,
    light: {
        main: {
            color: '#E6E8EA',
            intensity: 0.8
        },
        ambient: {
            color: '#E6E8EA',
            intensity: 0.6
        }
    },
    bloom: {
        show: false
    }
};

const geojsonLayerOptions = {
    areaText: {
        offset: 0.1,
        textStyle: {
            fontSize: '10px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#fff',
            textAlign: 'left',
            textBaseline: 'middle',
            labelPointStyle: {
                show: true, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 3, // 标注点半径
                color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        },
        nullTextStyle: {
            fontSize: '10px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#fff',
            textAlign: 'left',
            textBaseline: 'middle',
            labelPointStyle: {
                show: true, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 3, // 标注点半径
                color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        }
    },
    areaMaterial: { // 面材质配置
        color: '#142b77'
    },
    extrudeMaterial: {
        color: '#0086FF',
        opacity: 1,
        textureSrc: '/static/images/dark_edge.png'
    },
    outline: {
        normal: {
            show: true,
            color: '#3ca0f7',
            width: 3,
            opacity: 1
        }
    }
};


/***/ }),

/***/ "./js/theme/defaultLight.js":
/*!**********************************!*\
  !*** ./js/theme/defaultLight.js ***!
  \**********************************/
/*! exports provided: mapOptions, geojsonLayerOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOptions", function() { return mapOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geojsonLayerOptions", function() { return geojsonLayerOptions; });
const mapOptions = {
    bgColor: null,
    light: {
        main: {
            color: '#E6E8EA',
            intensity: 0.8
        },
        ambient: {
            color: '#E6E8EA',
            intensity: 0.6
        }
    },
    bloom: {
        show: false
    }
};

const geojsonLayerOptions = {
    areaText: {
        offset: 0.1,
        textStyle: {
            fontSize: '10px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#383838',
            textAlign: 'left',
            textBaseline: 'middle',
            labelPointStyle: {
                show: true, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 3, // 标注点半径
                color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        },
        nullTextStyle: {
            fontSize: '10px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#383838',
            textAlign: 'left',
            textBaseline: 'middle',
            labelPointStyle: {
                show: true, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 3, // 标注点半径
                color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        }
    },
    areaMaterial: { // 面材质配置
        color: '#ebf8ff'
    },
    extrudeMaterial: {
        color: '#00a2ff',
        opacity: 1,
        textureSrc: '/static/images/light_edge.png'
    },
    outline: {
        normal: {
            show: true,
            color: '#0086ff',
            width: 3,
            opacity: 0.8
        }
    }
};


/***/ }),

/***/ "./js/theme/index.js":
/*!***************************!*\
  !*** ./js/theme/index.js ***!
  \***************************/
/*! exports provided: defaultDark, defaultLight, dark, light */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _defaultDark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultDark */ "./js/theme/defaultDark.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "defaultDark", function() { return _defaultDark__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _defaultLight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultLight */ "./js/theme/defaultLight.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "defaultLight", function() { return _defaultLight__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _dark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dark */ "./js/theme/dark.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "dark", function() { return _dark__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _light__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./light */ "./js/theme/light.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "light", function() { return _light__WEBPACK_IMPORTED_MODULE_3__; });






/***/ }),

/***/ "./js/theme/light.js":
/*!***************************!*\
  !*** ./js/theme/light.js ***!
  \***************************/
/*! exports provided: mapOptions, geojsonLayerOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapOptions", function() { return mapOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geojsonLayerOptions", function() { return geojsonLayerOptions; });
const mapOptions = {
    bgColor: null,
    light: {
        main: {
            color: '#E6E8EA',
            intensity: 0.8
        },
        ambient: {
            color: '#E6E8EA',
            intensity: 0.6
        }
    },
    bloom: {
        show: false
    }
};

const geojsonLayerOptions = {
    areaText: {
        offset: 0.1,
        textStyle: {
            fontSize: '10px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#383838',
            textAlign: 'left',
            textBaseline: 'middle',
            labelPointStyle: {
                show: true, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 3, // 标注点半径
                color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        },
        nullTextStyle: {
            fontSize: '10px',
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#383838',
            textAlign: 'left',
            textBaseline: 'middle',
            labelPointStyle: {
                show: true, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 3, // 标注点半径
                color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        }
    },
    isAreaMutilColor: true,
    mutiColors: ['#7EBFF0', '#D1F6FC', '#53A4EA', '#107AE0'],
    areaMaterial: { // 面材质配置
        color: '#ebf8ff'
    },
    extrudeMaterial: {
        color: '#00a2ff',
        opacity: 1,
        textureSrc: '/static/images/light_edge.png'
    },
    outline: {
        normal: {
            show: true,
            color: '#0086ff',
            width: 3,
            opacity: 0.8
        }
    }
};


/***/ }),

/***/ "./js/three-extension/bloom/ClearPass.js":
/*!***********************************************!*\
  !*** ./js/three-extension/bloom/ClearPass.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.ClearPass = function ( clearColor, clearAlpha ) {

	THREE.Pass.call( this );

	this.needsSwap = false;

	this.clearColor = ( clearColor !== undefined ) ? clearColor : 0x000000;
	this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 0;

};

THREE.ClearPass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {

	constructor: THREE.ClearPass,

	render: function ( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

		var oldClearColor, oldClearAlpha;

		if ( this.clearColor ) {

			oldClearColor = renderer.getClearColor().getHex();
			oldClearAlpha = renderer.getClearAlpha();

			renderer.setClearColor( this.clearColor, this.clearAlpha );

		}

		renderer.setRenderTarget( this.renderToScreen ? null : readBuffer );
		renderer.clear();

		if ( this.clearColor ) {

			renderer.setClearColor( oldClearColor, oldClearAlpha );

		}

	}

} );


/***/ }),

/***/ "./js/three-extension/bloom/CopyShader.js":
/*!************************************************!*\
  !*** ./js/three-extension/bloom/CopyShader.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

THREE.CopyShader = {

	uniforms: {

		"tDiffuse": { value: null },
		"opacity":  { value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform float opacity;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"void main() {",

			"vec4 texel = texture2D( tDiffuse, vUv );",
			"gl_FragColor = opacity * texel;",

		"}"

	].join( "\n" )

};


/***/ }),

/***/ "./js/three-extension/bloom/EffectComposer.js":
/*!****************************************************!*\
  !*** ./js/three-extension/bloom/EffectComposer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.EffectComposer = function ( renderer, renderTarget ) {

	this.renderer = renderer;

	if ( renderTarget === undefined ) {

		var parameters = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			stencilBuffer: false
		};

		var size = renderer.getDrawingBufferSize();
		renderTarget = new THREE.WebGLRenderTarget( size.width, size.height, parameters );
		renderTarget.texture.name = 'EffectComposer.rt1';

	}

	this.renderTarget1 = renderTarget;
	this.renderTarget2 = renderTarget.clone();
	this.renderTarget2.texture.name = 'EffectComposer.rt2';

	this.writeBuffer = this.renderTarget1;
	this.readBuffer = this.renderTarget2;

	this.passes = [];

	// dependencies

	if ( THREE.CopyShader === undefined ) {

		console.error( 'THREE.EffectComposer relies on THREE.CopyShader' );

	}

	if ( THREE.ShaderPass === undefined ) {

		console.error( 'THREE.EffectComposer relies on THREE.ShaderPass' );

	}

	this.copyPass = new THREE.ShaderPass( THREE.CopyShader );

	this._previousFrameTime = Date.now();

};

Object.assign( THREE.EffectComposer.prototype, {

	swapBuffers: function () {

		var tmp = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = tmp;

	},

	addPass: function ( pass ) {

		this.passes.push( pass );

		var size = this.renderer.getDrawingBufferSize();
		pass.setSize( size.width, size.height );

	},

	insertPass: function ( pass, index ) {

		this.passes.splice( index, 0, pass );

	},

	render: function ( deltaTime ) {

		// deltaTime value is in seconds

		if ( deltaTime === undefined ) {

			deltaTime = ( Date.now() - this._previousFrameTime ) * 0.001;

		}

		this._previousFrameTime = Date.now();

		var maskActive = false;

		var pass, i, il = this.passes.length;

		for ( i = 0; i < il; i ++ ) {

			pass = this.passes[ i ];

			if ( pass.enabled === false ) continue;

			pass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive );

			if ( pass.needsSwap ) {

				if ( maskActive ) {

					var context = this.renderer.context;

					context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );

					this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime );

					context.stencilFunc( context.EQUAL, 1, 0xffffffff );

				}

				this.swapBuffers();

			}

			if ( THREE.MaskPass !== undefined ) {

				if ( pass instanceof THREE.MaskPass ) {

					maskActive = true;

				} else if ( pass instanceof THREE.ClearMaskPass ) {

					maskActive = false;

				}

			}

		}

	},

	reset: function ( renderTarget ) {

		if ( renderTarget === undefined ) {

			var size = this.renderer.getDrawingBufferSize();

			renderTarget = this.renderTarget1.clone();
			renderTarget.setSize( size.width, size.height );

		}

		this.renderTarget1.dispose();
		this.renderTarget2.dispose();
		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

	},

	setSize: function ( width, height ) {

		this.renderTarget1.setSize( width, height );
		this.renderTarget2.setSize( width, height );

		for ( var i = 0; i < this.passes.length; i ++ ) {

			this.passes[ i ].setSize( width, height );

		}

	}

} );


THREE.Pass = function () {

	// if set to true, the pass is processed by the composer
	this.enabled = true;

	// if set to true, the pass indicates to swap read and write buffer after rendering
	this.needsSwap = true;

	// if set to true, the pass clears its buffer before rendering
	this.clear = false;

	// if set to true, the result of the pass is rendered to screen
	this.renderToScreen = false;

};

Object.assign( THREE.Pass.prototype, {

	setSize: function ( width, height ) {},

	render: function ( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

		console.error( 'THREE.Pass: .render() must be implemented in derived pass.' );

	}

} );


/***/ }),

/***/ "./js/three-extension/bloom/LuminosityHighPassShader.js":
/*!**************************************************************!*\
  !*** ./js/three-extension/bloom/LuminosityHighPassShader.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author bhouston / http://clara.io/
 *
 * Luminosity
 * http://en.wikipedia.org/wiki/Luminosity
 */

THREE.LuminosityHighPassShader = {

  shaderID: "luminosityHighPass",

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"luminosityThreshold": { type: "f", value: 1.0 },
		"smoothWidth": { type: "f", value: 1.0 },
		"defaultColor": { type: "c", value: new THREE.Color( 0x000000 ) },
		"defaultOpacity":  { type: "f", value: 0.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform vec3 defaultColor;",
		"uniform float defaultOpacity;",
		"uniform float luminosityThreshold;",
		"uniform float smoothWidth;",

		"varying vec2 vUv;",

		"void main() {",

			"vec4 texel = texture2D( tDiffuse, vUv );",

			"vec3 luma = vec3( 0.299, 0.587, 0.114 );",

			"float v = dot( texel.xyz, luma );",

			"vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );",

			"float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );",

			"gl_FragColor = mix( outputColor, texel, alpha );",

		"}"

	].join("\n")

};


/***/ }),

/***/ "./js/three-extension/bloom/MaskPass.js":
/*!**********************************************!*\
  !*** ./js/three-extension/bloom/MaskPass.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.MaskPass = function ( scene, camera ) {

	THREE.Pass.call( this );

	this.scene = scene;
	this.camera = camera;

	this.clear = true;
	this.needsSwap = false;

	this.inverse = false;

};

THREE.MaskPass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {

	constructor: THREE.MaskPass,

	render: function ( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

		var context = renderer.context;
		var state = renderer.state;

		// don't update color or depth

		state.buffers.color.setMask( false );
		state.buffers.depth.setMask( false );

		// lock buffers

		state.buffers.color.setLocked( true );
		state.buffers.depth.setLocked( true );

		// set up stencil

		var writeValue, clearValue;

		if ( this.inverse ) {

			writeValue = 0;
			clearValue = 1;

		} else {

			writeValue = 1;
			clearValue = 0;

		}

		state.buffers.stencil.setTest( true );
		state.buffers.stencil.setOp( context.REPLACE, context.REPLACE, context.REPLACE );
		state.buffers.stencil.setFunc( context.ALWAYS, writeValue, 0xffffffff );
		state.buffers.stencil.setClear( clearValue );

		// draw into the stencil buffer

		renderer.setRenderTarget( readBuffer );
		if ( this.clear ) renderer.clear();
		renderer.render( this.scene, this.camera );

		renderer.setRenderTarget( writeBuffer );
		if ( this.clear ) renderer.clear();
		renderer.render( this.scene, this.camera );

		// unlock color and depth buffer for subsequent rendering

		state.buffers.color.setLocked( false );
		state.buffers.depth.setLocked( false );

		// only render where stencil is set to 1

		state.buffers.stencil.setFunc( context.EQUAL, 1, 0xffffffff ); // draw if == 1
		state.buffers.stencil.setOp( context.KEEP, context.KEEP, context.KEEP );

	}

} );


THREE.ClearMaskPass = function () {

	THREE.Pass.call( this );

	this.needsSwap = false;

};

THREE.ClearMaskPass.prototype = Object.create( THREE.Pass.prototype );

Object.assign( THREE.ClearMaskPass.prototype, {

	render: function ( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

		renderer.state.buffers.stencil.setTest( false );

	}

} );


/***/ }),

/***/ "./js/three-extension/bloom/RenderPass.js":
/*!************************************************!*\
  !*** ./js/three-extension/bloom/RenderPass.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.RenderPass = function ( scene, camera, overrideMaterial, clearColor, clearAlpha ) {

	THREE.Pass.call( this );

	this.scene = scene;
	this.camera = camera;

	this.overrideMaterial = overrideMaterial;

	this.clearColor = clearColor;
	this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 0;

	this.clear = true;
	this.clearDepth = false;
	this.needsSwap = false;

};

THREE.RenderPass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {

	constructor: THREE.RenderPass,

	render: function ( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

		var oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		this.scene.overrideMaterial = this.overrideMaterial;

		var oldClearColor, oldClearAlpha;

		if ( this.clearColor ) {

			oldClearColor = renderer.getClearColor().getHex();
			oldClearAlpha = renderer.getClearAlpha();

			renderer.setClearColor( this.clearColor, this.clearAlpha );

		}

		if ( this.clearDepth ) {

			renderer.clearDepth();

		}

		renderer.render( this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear );

		if ( this.clearColor ) {

			renderer.setClearColor( oldClearColor, oldClearAlpha );

		}

		this.scene.overrideMaterial = null;
		renderer.autoClear = oldAutoClear;
	}

} );


/***/ }),

/***/ "./js/three-extension/bloom/ShaderPass.js":
/*!************************************************!*\
  !*** ./js/three-extension/bloom/ShaderPass.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ShaderPass = function ( shader, textureID ) {

	THREE.Pass.call( this );

	this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";

	if ( shader instanceof THREE.ShaderMaterial ) {

		this.uniforms = shader.uniforms;

		this.material = shader;

	} else if ( shader ) {

		this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

		this.material = new THREE.ShaderMaterial( {

			defines: Object.assign( {}, shader.defines ),
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		} );

	}

	this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.scene = new THREE.Scene();

	this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
	this.quad.frustumCulled = false; // Avoid getting clipped
	this.scene.add( this.quad );

};

THREE.ShaderPass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {

	constructor: THREE.ShaderPass,

	render: function( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer.texture;

		}

		this.quad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.render( this.scene, this.camera );

		} else {

			renderer.render( this.scene, this.camera, writeBuffer, this.clear );

		}

	}

} );


/***/ }),

/***/ "./js/three-extension/bloom/UnrealBloomPass.js":
/*!*****************************************************!*\
  !*** ./js/three-extension/bloom/UnrealBloomPass.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author spidersharma / http://eduperiment.com/
 *
 * Inspired from Unreal Engine
 * https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/Bloom/
 */
THREE.UnrealBloomPass = function ( resolution, strength, radius, threshold ) {

	THREE.Pass.call( this );

	this.strength = ( strength !== undefined ) ? strength : 1;
	this.radius = radius;
	this.threshold = threshold;
	this.resolution = ( resolution !== undefined ) ? new THREE.Vector2( resolution.x, resolution.y ) : new THREE.Vector2( 256, 256 );

	// create color only once here, reuse it later inside the render function
	this.clearColor = new THREE.Color('#1C1F3B');

	// render targets
	var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };
	this.renderTargetsHorizontal = [];
	this.renderTargetsVertical = [];
	this.nMips = 5;
	var resx = Math.round( this.resolution.x / 2 );
	var resy = Math.round( this.resolution.y / 2 );

	this.renderTargetBright = new THREE.WebGLRenderTarget( resx, resy, pars );
	this.renderTargetBright.texture.name = "UnrealBloomPass.bright";
	this.renderTargetBright.texture.generateMipmaps = false;

	for ( var i = 0; i < this.nMips; i ++ ) {

		var renderTargetHorizonal = new THREE.WebGLRenderTarget( resx, resy, pars );

		renderTargetHorizonal.texture.name = "UnrealBloomPass.h" + i;
		renderTargetHorizonal.texture.generateMipmaps = false;

		this.renderTargetsHorizontal.push( renderTargetHorizonal );

		var renderTargetVertical = new THREE.WebGLRenderTarget( resx, resy, pars );

		renderTargetVertical.texture.name = "UnrealBloomPass.v" + i;
		renderTargetVertical.texture.generateMipmaps = false;

		this.renderTargetsVertical.push( renderTargetVertical );

		resx = Math.round( resx / 2 );

		resy = Math.round( resy / 2 );

	}

	// luminosity high pass material

	if ( THREE.LuminosityHighPassShader === undefined )
		console.error( "THREE.UnrealBloomPass relies on THREE.LuminosityHighPassShader" );

	var highPassShader = THREE.LuminosityHighPassShader;
	this.highPassUniforms = THREE.UniformsUtils.clone( highPassShader.uniforms );

	this.highPassUniforms[ "luminosityThreshold" ].value = threshold;
	this.highPassUniforms[ "smoothWidth" ].value = 0.01;

	this.materialHighPassFilter = new THREE.ShaderMaterial( {
		uniforms: this.highPassUniforms,
		vertexShader: highPassShader.vertexShader,
		fragmentShader: highPassShader.fragmentShader,
		defines: {}
	} );

	// Gaussian Blur Materials
	this.separableBlurMaterials = [];
	var kernelSizeArray = [ 3, 5, 7, 9, 11 ];
	var resx = Math.round( this.resolution.x / 2 );
	var resy = Math.round( this.resolution.y / 2 );

	for ( var i = 0; i < this.nMips; i ++ ) {

		this.separableBlurMaterials.push( this.getSeperableBlurMaterial( kernelSizeArray[ i ] ) );

		this.separableBlurMaterials[ i ].uniforms[ "texSize" ].value = new THREE.Vector2( resx, resy );

		resx = Math.round( resx / 2 );

		resy = Math.round( resy / 2 );

	}

	// Composite material
	this.compositeMaterial = this.getCompositeMaterial( this.nMips );
	this.compositeMaterial.uniforms[ "blurTexture1" ].value = this.renderTargetsVertical[ 0 ].texture;
	this.compositeMaterial.uniforms[ "blurTexture2" ].value = this.renderTargetsVertical[ 1 ].texture;
	this.compositeMaterial.uniforms[ "blurTexture3" ].value = this.renderTargetsVertical[ 2 ].texture;
	this.compositeMaterial.uniforms[ "blurTexture4" ].value = this.renderTargetsVertical[ 3 ].texture;
	this.compositeMaterial.uniforms[ "blurTexture5" ].value = this.renderTargetsVertical[ 4 ].texture;
	this.compositeMaterial.uniforms[ "bloomStrength" ].value = strength;
	this.compositeMaterial.uniforms[ "bloomRadius" ].value = 0.1;
	this.compositeMaterial.needsUpdate = true;

	var bloomFactors = [ 1.0, 0.8, 0.6, 0.4, 0.2 ];
	this.compositeMaterial.uniforms[ "bloomFactors" ].value = bloomFactors;
	this.bloomTintColors = [ new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 1, 1, 1 ),
							 new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 1, 1, 1 ) ];
	this.compositeMaterial.uniforms[ "bloomTintColors" ].value = this.bloomTintColors;

	// copy material
	if ( THREE.CopyShader === undefined ) {

		console.error( "THREE.BloomPass relies on THREE.CopyShader" );

	}

	var copyShader = THREE.CopyShader;

	this.copyUniforms = THREE.UniformsUtils.clone( copyShader.uniforms );
	this.copyUniforms[ "opacity" ].value = 1.0;

	this.materialCopy = new THREE.ShaderMaterial( {
		uniforms: this.copyUniforms,
		vertexShader: copyShader.vertexShader,
		fragmentShader: copyShader.fragmentShader,
		blending: THREE.AdditiveBlending,
		depthTest: false,
		depthWrite: false,
		transparent: true
	} );

	this.enabled = true;
	this.needsSwap = false;

	this.oldClearColor = new THREE.Color();
	this.oldClearAlpha = 1;

	this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.scene = new THREE.Scene();

	this.basic = new THREE.MeshBasicMaterial();

	this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
	this.quad.frustumCulled = false; // Avoid getting clipped
	this.scene.add( this.quad );

};

THREE.UnrealBloomPass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {

	constructor: THREE.UnrealBloomPass,

	dispose: function () {

		for ( var i = 0; i < this.renderTargetsHorizontal.length; i ++ ) {

			this.renderTargetsHorizontal[ i ].dispose();

		}

		for ( var i = 0; i < this.renderTargetsVertical.length; i ++ ) {

			this.renderTargetsVertical[ i ].dispose();

		}

		this.renderTargetBright.dispose();

	},

	setSize: function ( width, height ) {

		var resx = Math.round( width / 2 );
		var resy = Math.round( height / 2 );

		this.renderTargetBright.setSize( resx, resy );

		for ( var i = 0; i < this.nMips; i ++ ) {

			this.renderTargetsHorizontal[ i ].setSize( resx, resy );
			this.renderTargetsVertical[ i ].setSize( resx, resy );

			this.separableBlurMaterials[ i ].uniforms[ "texSize" ].value = new THREE.Vector2( resx, resy );

			resx = Math.round( resx / 2 );
			resy = Math.round( resy / 2 );

		}

	},

	render: function ( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

		this.oldClearColor.copy( renderer.getClearColor() );
		this.oldClearAlpha = renderer.getClearAlpha();
		var oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		renderer.setClearColor( this.clearColor, 0 );

		if ( maskActive ) renderer.context.disable( renderer.context.STENCIL_TEST );

		// Render input to screen

		if ( this.renderToScreen ) {

			this.quad.material = this.basic;
			this.basic.map = readBuffer.texture;

			renderer.render( this.scene, this.camera, undefined, true );

		}

		// 1. Extract Bright Areas

		this.highPassUniforms[ "tDiffuse" ].value = readBuffer.texture;
		this.highPassUniforms[ "luminosityThreshold" ].value = this.threshold;
		this.quad.material = this.materialHighPassFilter;

		renderer.render( this.scene, this.camera, this.renderTargetBright, true );

		// 2. Blur All the mips progressively

		var inputRenderTarget = this.renderTargetBright;

		for ( var i = 0; i < this.nMips; i ++ ) {

			this.quad.material = this.separableBlurMaterials[ i ];

			this.separableBlurMaterials[ i ].uniforms[ "colorTexture" ].value = inputRenderTarget.texture;
			this.separableBlurMaterials[ i ].uniforms[ "direction" ].value = THREE.UnrealBloomPass.BlurDirectionX;
			renderer.render( this.scene, this.camera, this.renderTargetsHorizontal[ i ], true );

			this.separableBlurMaterials[ i ].uniforms[ "colorTexture" ].value = this.renderTargetsHorizontal[ i ].texture;
			this.separableBlurMaterials[ i ].uniforms[ "direction" ].value = THREE.UnrealBloomPass.BlurDirectionY;
			renderer.render( this.scene, this.camera, this.renderTargetsVertical[ i ], true );

			inputRenderTarget = this.renderTargetsVertical[ i ];

		}

		// Composite All the mips

		this.quad.material = this.compositeMaterial;
		this.compositeMaterial.uniforms[ "bloomStrength" ].value = this.strength;
		this.compositeMaterial.uniforms[ "bloomRadius" ].value = this.radius;
		this.compositeMaterial.uniforms[ "bloomTintColors" ].value = this.bloomTintColors;

		renderer.render( this.scene, this.camera, this.renderTargetsHorizontal[ 0 ], true );

		// Blend it additively over the input texture

		this.quad.material = this.materialCopy;
		this.copyUniforms[ "tDiffuse" ].value = this.renderTargetsHorizontal[ 0 ].texture;

		if ( maskActive ) renderer.context.enable( renderer.context.STENCIL_TEST );


		if ( this.renderToScreen ) {

			renderer.render( this.scene, this.camera, undefined, false );

		} else {

			renderer.render( this.scene, this.camera, readBuffer, false );

		}

		// Restore renderer settings

		renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );
		renderer.autoClear = oldAutoClear;

	},

	getSeperableBlurMaterial: function ( kernelRadius ) {

		return new THREE.ShaderMaterial( {

			defines: {
				"KERNEL_RADIUS": kernelRadius,
				"SIGMA": kernelRadius
			},

			uniforms: {
				"colorTexture": { value: null },
				"texSize": { value: new THREE.Vector2( 0.5, 0.5 ) },
				"direction": { value: new THREE.Vector2( 0.5, 0.5 ) }
			},

			vertexShader:
				"varying vec2 vUv;\n\
				void main() {\n\
					vUv = uv;\n\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",

			fragmentShader:
				"#include <common>\
				varying vec2 vUv;\n\
				uniform sampler2D colorTexture;\n\
				uniform vec2 texSize;\
				uniform vec2 direction;\
				\
				float gaussianPdf(in float x, in float sigma) {\
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\
				}\
				void main() {\n\
					vec2 invSize = 1.0 / texSize;\
					float fSigma = float(SIGMA);\
					float weightSum = gaussianPdf(0.0, fSigma);\
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {\
						float x = float(i);\
						float w = gaussianPdf(x, fSigma);\
						vec2 uvOffset = direction * invSize * x;\
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;\
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;\
						diffuseSum += (sample1 + sample2) * w;\
						weightSum += 2.0 * w;\
					}\
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\
				}"
		} );

	},

	getCompositeMaterial: function ( nMips ) {

		return new THREE.ShaderMaterial( {

			defines: {
				"NUM_MIPS": nMips
			},

			uniforms: {
				"blurTexture1": { value: null },
				"blurTexture2": { value: null },
				"blurTexture3": { value: null },
				"blurTexture4": { value: null },
				"blurTexture5": { value: null },
				"dirtTexture": { value: null },
				"bloomStrength": { value: 1.0 },
				"bloomFactors": { value: null },
				"bloomTintColors": { value: null },
				"bloomRadius": { value: 0.0 }
			},

			vertexShader:
				"varying vec2 vUv;\n\
				void main() {\n\
					vUv = uv;\n\
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\
				}",

			fragmentShader:
				"varying vec2 vUv;\
				uniform sampler2D blurTexture1;\
				uniform sampler2D blurTexture2;\
				uniform sampler2D blurTexture3;\
				uniform sampler2D blurTexture4;\
				uniform sampler2D blurTexture5;\
				uniform sampler2D dirtTexture;\
				uniform float bloomStrength;\
				uniform float bloomRadius;\
				uniform float bloomFactors[NUM_MIPS];\
				uniform vec3 bloomTintColors[NUM_MIPS];\
				\
				float lerpBloomFactor(const in float factor) { \
					float mirrorFactor = 1.2 - factor;\
					return mix(factor, mirrorFactor, bloomRadius);\
				}\
				\
				void main() {\
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) + \
													 lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) + \
													 lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) + \
													 lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) + \
													 lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\
				}"
		} );

	}

} );

THREE.UnrealBloomPass.BlurDirectionX = new THREE.Vector2( 1.0, 0.0 );
THREE.UnrealBloomPass.BlurDirectionY = new THREE.Vector2( 0.0, 1.0 );


/***/ }),

/***/ "./js/three-extension/bloom/index.js":
/*!*******************************************!*\
  !*** ./js/three-extension/bloom/index.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EffectComposer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EffectComposer */ "./js/three-extension/bloom/EffectComposer.js");
/* harmony import */ var _EffectComposer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_EffectComposer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ClearPass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClearPass */ "./js/three-extension/bloom/ClearPass.js");
/* harmony import */ var _ClearPass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ClearPass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _RenderPass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RenderPass */ "./js/three-extension/bloom/RenderPass.js");
/* harmony import */ var _RenderPass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_RenderPass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ShaderPass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ShaderPass */ "./js/three-extension/bloom/ShaderPass.js");
/* harmony import */ var _ShaderPass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ShaderPass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CopyShader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CopyShader */ "./js/three-extension/bloom/CopyShader.js");
/* harmony import */ var _CopyShader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_CopyShader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _LuminosityHighPassShader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LuminosityHighPassShader */ "./js/three-extension/bloom/LuminosityHighPassShader.js");
/* harmony import */ var _LuminosityHighPassShader__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_LuminosityHighPassShader__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _UnrealBloomPass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UnrealBloomPass */ "./js/three-extension/bloom/UnrealBloomPass.js");
/* harmony import */ var _UnrealBloomPass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_UnrealBloomPass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _MaskPass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MaskPass */ "./js/three-extension/bloom/MaskPass.js");
/* harmony import */ var _MaskPass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_MaskPass__WEBPACK_IMPORTED_MODULE_7__);









/***/ }),

/***/ "./js/three-map.js":
/*!*************************!*\
  !*** ./js/three-map.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ThreeMap; });
/* harmony import */ var _eventemiter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventemiter */ "./js/eventemiter.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./js/util.js");
/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maphelper */ "./js/maphelper.js");
/* harmony import */ var _layers_text_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layers/text-layer */ "./js/layers/text-layer.js");
/* harmony import */ var _three_extension_bloom_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./three-extension/bloom/index */ "./js/three-extension/bloom/index.js");





class ThreeMap extends _eventemiter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(el, options) {
        super();
        const defaultOptions = {
            type: 'plane', // plane or sphere ,平面或球面
            region: 'world', // china or world, 中国或世界地图
            crs: _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857, // 地图采用的地理坐标系 EPSG:4326: 经纬度，EPSG:3857: 墨卡托
            SCALE_RATIO: 100000, // 地球墨卡托平面缩放比例
            containerClassName: 'three-map-container', // 地图容器类名
            bgColor: null, // 背景色，默认无
            camera: {
                fov: 45,
                near: 0.1,
                far: 2000,
                distanceRatio: 1.35 // 相机离物理最佳距离（刚好看到物体全部）的倍数
            },
            orbitControlOptions: {
                minDistance: 0, // 最小距离
                maxDistance: Infinity, // 最大距离
                // 垂直方向翻转角度，范围：0-180 度
                minPolarAngle: 0, 
                maxPolarAngle: 180,
                // 横向旋转角度，范围：-180-180 度，Infinity 表示不限制
                minAzimuthAngle: -Infinity, 
                maxAzimuthAngle: Infinity
            },
            light: {
                // 主光源：太阳光 THREE.DirectionalLight
                main: {
                    color: '#fff',
                    intensity: 1, // 主光源的强度，0-1
                    shadow: false, // 主光源是否投射阴影。默认关闭。开启阴影可以给场景带来更真实和有层次的光照效果。但是同时也会增加程序的运行开销。
                    shadowQuality: 'medium', // 阴影的质量。可选'low', 'medium', 'high', 'ultra'
                    alpha: 40, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。
                    beta: 40 // 主光源绕 y 轴，即左右旋转的角度。
                },
                // 环境光源 THREE.AmbientLight
                ambient: {
                    color: '#fff',
                    intensity: 0.2
                }
            },
            global: {
                R: 220, // 球形地球半径
                center: [170, 35], // 初始中心点
                animation: true, // 是否转动
                animationSpeed: 1, // 转动快慢
                earthImgSrc: '../../images/earth.jpg', // 地球图片
                light: {
                    hemisphereLight:{
                        show: false,
                        skyColor: '#fff',
                        groundColor: '#333',
                        intensity: 2
                    },
                    // 环境光源 THREE.AmbientLight
                    ambient: {
                        color: '#fff',
                        intensity: 1
                    }
                }
            },
            // 参数说明：https://docs.unrealengine.com/en-us/Engine/Rendering/PostProcessEffects/Bloom
            bloom: {
                show: false,
                exposure: 0.5,
                bloomStrength:0.5,
                bloomThreshold: 0,
                bloomRadius: 1
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, defaultOptions, options);

        this._layers = {};
        // this._bloomScene = null;
        this._composer = null;
        
        this._initBounds();
        this._initContainer(el);
        this._initStyle();
        if (this.options.type === 'sphere') {
            this._initGlobal();
        } else {
            this._init3D();
        }  
        this._initEvents();
    }
    getBounds() {
        return this._fullBound;
    }
    addLayer(layer) {
        var id = _util__WEBPACK_IMPORTED_MODULE_1__["stamp"](layer);
        if (this._layers[id]) {
            return this;
        }

        this._layers[id] = layer;
        if (layer.type === 'geojson' && this.options.bloom.show) {
            this._initBloom(layer);
        } else {
            this._scene.add(layer.getContainer());
        }

        layer.onAdd(this);

        return this;
    }
    removeLayer(layer) {
        var id = _util__WEBPACK_IMPORTED_MODULE_1__["stamp"](layer);
        if (!this._layers[id]) {
            return this;
        }

        delete this._layers[id];
        this._scene.remove(layer.getContainer());

        layer.onRemove(this);

        return this;
    }
    hasLayer(layer) {
        return !!layer && (_util__WEBPACK_IMPORTED_MODULE_1__["stamp"](layer) in this._layers);
    }
    clearLayers() {
        for (var id in this._layers) {
            this.removeLayer(this._layers[id]);
        }
    }
    projectLngLat(lnglat) {
        if (this.options.type === 'plane') {
            if (this.options.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857) {
                let point = _maphelper__WEBPACK_IMPORTED_MODULE_2__["wgs84ToMecator"](lnglat);
                let spt = _maphelper__WEBPACK_IMPORTED_MODULE_2__["scalePoint"](point, 1/this.options.SCALE_RATIO);
                if (lnglat.length === 3) {
                    spt.push(lnglat[2]);
                }
                return spt;
            } else {
                return lnglat;
            }
        } else {
            // sphere
            return this.lngLatToGlobal(lnglat[0], lnglat[1], lnglat[2]);
        }
    }
    // 经纬度坐标转球面坐标
    lngLatToGlobal(lng, lat, alt = 0) {
        // 以z轴正半轴作为零度经线起始处
        const phi = lng*(Math.PI/180);
        const theta = lat*(Math.PI/180);
        const radius = alt+this.options.global.R;
        const x = (radius * Math.sin(phi) * Math.cos(theta));
        const z = (radius * Math.cos(phi) * Math.cos(theta));
        const y = (radius * Math.sin(theta));
        return [x, y, z];
    }
    // 球面坐标转经纬度坐标
    globalToLnglat(globalPoint) {
        const x = globalPoint[0];
        const y = globalPoint[1];
        const z = globalPoint[2];
        const r = this.options.global.R;
        const theta = Math.asin(y / r);
        let lng = Math.acos(z / (r * Math.cos(theta))) * 180 / Math.PI;
        let lat = theta * 180 / Math.PI;
        if (x < 0) {
            lng = -lng;
        }
        return [lng, lat];
    }
    // 获取球面当前中心经纬度坐标
    // 只适用于 球形地球
    getCenterLngLat() {
        const size = this.getContainerSize();
        // 屏幕坐标
        const screenPoint = [size.width / 2, size.height / 2];
        // this.addDiv(screenPoint);
        // 世界坐标
        const worldPoint = _maphelper__WEBPACK_IMPORTED_MODULE_2__["screenToWorld"](screenPoint, this);
        // this.addPoint(worldPoint);
        // 球面坐标
        const globalPoint = this._cacluateCrossPoint(worldPoint);
        // this.addPoint(globalPoint);
        // 经纬度坐标
        const centerLngLat = this.globalToLnglat(globalPoint);
        // console.log('centerLngLat:'+centerLngLat);
        return centerLngLat;
    }
    // 获取当前球面显示的经纬度范围
    // 只适用于 球形地球
    getLngLatRange() {
        let centerLngLat = this.getCenterLngLat();
        let centerLng = centerLngLat[0];
        let centerLat = centerLngLat[1];
        
        // 经度范围
        let leftLng = centerLng - 90;
        let rightLng = centerLng + 90;
        let lngRange = {
            min1: leftLng,
            max1: rightLng,
            min2: leftLng,
            max2: rightLng
        };
        if (leftLng < -180) {
            lngRange.min1 = -180;
            lngRange.max1 = rightLng;
            lngRange.min2 = leftLng + 360;
            lngRange.max2 = 180;
        }
        if (rightLng > 180) {
            lngRange.min1 = leftLng;
            lngRange.max1 = 180;
            lngRange.min2 = -180;
            lngRange.max2 = rightLng - 360;
        }
        
        // 纬度范围
        let latRange = {
            min1: -90,
            max1: 90,
            min2: -90,
            max2: 90
        };
        if (centerLat > 0) {
            latRange.min1 = - (90 - centerLat);
            latRange.max1 = 90;
            latRange.min2 =  - (90 - centerLat);
            latRange.max2 = 90;
        } else {
            latRange.min1 = -90;
            latRange.max1 = 90 + centerLat;
            latRange.min2 = -90;
            latRange.max2 = 90 + centerLat;   
        }
        let range = [lngRange, latRange];
        return range;
    }
    // 判断某个经纬度是否在范围内
    // 只适用于 球形地球
    isLngLatInRange(lnglat, range) {
        let rg = range || this.getLngLatRange();
        let isInRange = [0, 0];
        lnglat.forEach((d, index) => {
            let r = rg[index];
            if ((d > r.min1 && d < r.max1) || (d > r.min2 && d < r.max2)) {
                isInRange[index] = 1;
            }
        });
        return isInRange[0] && isInRange[1];
    }
    // 计算过球心且与屏幕坐标对应的直线与球面的交点
    // 只适用于 球形地球
    _cacluateCrossPoint(worldPoint) {
        // 通过世界坐标计算与球的交点坐标
        // 计算方法： 向量点积 和 直线对称式方程： x1/x = y1/y = z1/z
        const x1 = worldPoint[0];
        const y1 = worldPoint[1];
        const z1 = worldPoint[2];
        const r = this.options.global.R;
        const m = Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1);
        const rm = r * m;
        let x, y, z;
        
        if (x1 * y1 * z1 === 0) {
            if (x1 ===  0 && y1 * z1 !== 0) {
                let b = z1 / y1;
                x = 0;
                y = rm / (y1 + b * z1);
                z = b * y;
            } else if (y1 === 0 && x1 * z1 !== 0) {
                let b = z1 / x1;
                x = rm / (x1 + b * z1);
                y = 0;
                z = b * x;
            } else if (z1 === 0 && x1 * y1 !== 0) {
                let b = y1 / x1;
                x = rm / (x1 + b * y1);
                y = b * x1;
                z = 0;
            } else if (x1 === 0 && y1 === 0 && z1 !== 0) {
                x = 0;
                y = 0;
                z = rm / z1;
            } else if (x1 === 0 && y1 !== 0 && z1 === 0) {
                x = 0;
                y = rm / y1;;
                z = 0;
            } else if (x1 !== 0 && y1 === 0 && z1 === 0) {
                x = rm / x1;
                y = 0;
                z = 0;
            } else {
                x = 0;
                y = 0;
                z = 0;
            }
        } else {
            let b = y1 / x1;
            let c = z1 / x1;
            x = rm / (x1 + b * y1 + c * z1);
            y = b * x;
            z = c * x;
        }
        return [x, y, z];
    }
    updateSize() {
        this._onContainerResize();
    }
    resetView() {
        this._orbitControl.reset();
    }
    setView(bounds) {
        // TODO: 自动适配
        if (this.options.type === 'plane') {
            if (this.options.region === 'world') {
                // this._orbitControl.object === this._camera 返回： true
                this._orbitControl.object.position.set(33.63825332692946, 177.45434200975768, 163.73205178682628);
                this._orbitControl.target = new THREE.Vector3( 31.103039042099642, 51.62625, 33.28602646708351);
                let d = this.getDistance(bounds.getHeight());
                let scaleD = d * this.options.camera.distanceRatio;
                let center = bounds.getCenter();
                // this._orbitControl.object.position.set(center[0], scaleD, -center[1]);
                // this._orbitControl.target = new THREE.Vector3(center[0], 0, -center[1]);
                // this._orbitControl.minDistance = d * 0.5;
                this._orbitControl.maxDistance = d * 2;
            } else if (this.options.region === 'china') {
                let d = this.getDistance(bounds.getHeight());
                let center = bounds.getCenter();
                let scaleD = d * 0.2; 
                // this._orbitControl.object.position.set(center[0], center[1], scaleD);
                // this._orbitControl.target = new THREE.Vector3(center[0], 0, -center[1]);
                this._orbitControl.object.position.set(120.84282104185938, 40.63479819221523, 7.188968711287963);
                this._orbitControl.target = new THREE.Vector3(119.6649797489134, -6.091,-55.22126931703857);
                this._orbitControl.minDistance = d * 0.25;
                this._orbitControl.maxDistance = d * 2;
            } else {
                let d = this.getDistance(bounds.getHeight());
                let scaleD = d * this.options.camera.distanceRatio;
                let center = bounds.getCenter();
                this._orbitControl.object.position.set(center[0], scaleD, -center[1]);
                this._orbitControl.target = new THREE.Vector3(center[0], 0, -center[1]);
                this._orbitControl.minDistance = d * 0.5;
                this._orbitControl.maxDistance = d * 2;
            }
        } else {
            // sphere
            let d = this.getDistance(this.options.global.R*2);
            let scaleD = d * this.options.camera.distanceRatio;
            this._orbitControl.object.position.set(0, 0, scaleD);
            this._orbitControl.target = new THREE.Vector3(0, 0, 0);
        }
        this._orbitControl.update();
    }
    // 获取相机到物体的距离，看到全部物体时
    getDistance(height) {
        // 视角
        const deg = THREE.Math.degToRad(this.options.camera.fov) / 2;
        // 视区高度
        const d = (height / 2) / Math.tan(deg);
        return d;
    }
    // 获取适配比例
    // 中国范围切换省市县行政区需要获取适配比例
    getRatio(regionBounds) {
        const chinaBounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getBounds"]('china', this.options.crs);
        if (this.options.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857) {
            let scale = this.options.SCALE_RATIO;
            chinaBounds.scale(1/scale);
        }

        const h0 = chinaBounds.getHeight();
        const d0 = this.getDistance(h0);
        const h1 = regionBounds.getHeight();
        const d1 = this.getDistance(h1);

        return d1 / d0;
    }
    getContainerElement() {
        return this._el;
    }
    getContainerSize() {
        const compStyle = _util__WEBPACK_IMPORTED_MODULE_1__["getCmpStyle"](this._el);
        const width = parseInt(compStyle.width);
        const height = parseInt(compStyle.height);
        return { width, height };
    }
    getCamera() {
        return this._camera;
    }
    // TODO: addLegend bdp
    addLegend(legendOptions) {
        this.destoryLegend();
        const Legend = Dalaba.Chart.Legend;
        const size = this.getContainerSize();
        if (Legend && legendOptions.enabled) {
            if (!this._legendCanvas) {
                this._legendCanvas = document.createElement('canvas');
                this._legendCanvas.width = this._renderer.domElement.width;
                this._legendCanvas.height = this._renderer.domElement.height;
                this._legendCanvas.style.width = size.width + 'px';
                this._legendCanvas.style.height = size.height + 'px';
                this._legendCanvas.className = 'three-map-legendcanvas';
                this._el.appendChild(this._legendCanvas);
            }
            this._legend = new Legend(
                this._legendCanvas,//this.addLayer(legendOptions.layer),
                [{name: 9}],
                legendOptions//selected为false不读取
            );
            this._legendOptions = legendOptions;
        }
        return this._legend;
    }
    destoryLegend() {
        if (this._legend) {
            this._legend.destroy();
            this._legend.canvas.parentNode.removeChild(this._legend.canvas);
            this._legendCanvas.parentNode.removeChild(this._legendCanvas);
            this._legend = null;
            this._legendCanvas = null;
            this._legendOptions = null;
        }
    }
    _initBounds() {
        if (this.options.type === 'plane') {
            if (this.options.region === 'china') {
                this._fullBound = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getBounds"]('china', this.options.crs);
            } else {
                this._fullBound = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getBounds"]('world', this.options.crs);
            }
        }
    }
    _initContainer(el) {
        this._container = typeof el === 'string' ? document.getElementById(el) : el;
        if (!this._container) {
            throw new Error("未提供父容器,请为地图提供一个父容器！");
        }

        this._el = document.createElement('div');
        this._el.style.height = '100%';
        this._el.style.margin = 0;
        this._el.style.padding = 0;
        _util__WEBPACK_IMPORTED_MODULE_1__["addClass"](this._el, this.options.containerClassName);

        this._container.appendChild(this._el);
    }
    _initStyle() {
        if (this.options.bgColor) {
            this._el.style.backgroundColor = this.options.bgColor;
        }
    }
    _initBloom(layer) {
        const size = this.getContainerSize();
        const params = this.options.bloom;
        
        // this._bloomScene.add(layer.getContainer());
        this._scene.add(layer.getContainer());

        const clearPass = new THREE.ClearPass();
        // const renderScene = new THREE.RenderPass( this._bloomScene, this._camera );
        const renderScene = new THREE.RenderPass( this._scene, this._camera );

        const outputPass = new THREE.ShaderPass( THREE.CopyShader );
        outputPass.renderToScreen = true;

        const bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( size.width, size.height ), 1.5, 0.4, 0.85 );
        // bloomPass.renderToScreen = true;
        bloomPass.threshold = params.bloomThreshold;
        bloomPass.strength = params.bloomStrength;
        bloomPass.radius = params.bloomRadius;
        this.bloomPass = bloomPass;

        this._composer = new THREE.EffectComposer( this._renderer);
        this._composer.setSize( size.width, size.height );
        this._composer.addPass( clearPass );
        this._composer.addPass(renderScene);
        this._composer.addPass( bloomPass );
        // this._composer.addPass( renderPass );
        this._composer.addPass(outputPass);

        this._renderer.toneMappingExposure = Math.pow( params.exposure, 4.0 );
    }
    _init3D() {
        if (THREE == undefined) {
            console.error('THREE 依赖 threejs 库！');
        } 
        if (THREE.OrbitControls == undefined) {
            console.error('THREE.OrbitControls 依赖 OrbitControls.js 文件！');
        } 

        const size = this.getContainerSize();
        const dpr = _util__WEBPACK_IMPORTED_MODULE_1__["getDpr"]();

        // 初始化画布
        this._renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        this._renderer.setPixelRatio(dpr);
        this._renderer.setClearColor(0x000000, 0); // 背景透明 
        this._renderer.setSize(size.width, size.height, true);
        this._renderer.domElement.className = 'chart-canvas';
        this._el.appendChild(this._renderer.domElement);

        // 设置场景
        this._scene = new THREE.Scene();
        // if (this.options.bloom.show) {
        //     this._bloomScene = new THREE.Scene();
        // }

        // 相机
        const cameraOptions = this.options.camera;
        this._camera = new THREE.PerspectiveCamera(cameraOptions.fov, size.width / size.height, cameraOptions.near, cameraOptions.far);

        // 控件
        const orbitControlOptions = this.options.orbitControlOptions;
        this._orbitControl = new THREE.OrbitControls(this._camera, this._renderer.domElement);
        // 距离相机的最小、最大距离，仅用于透视相机
        this._orbitControl.minDistance = orbitControlOptions.minDistance; 
        this._orbitControl.maxDistance = orbitControlOptions.maxDistance; 
        // 最小、最大翻转角度 在哪个平面内就相对于哪个平面的坐标轴
        this._orbitControl.minPolarAngle = Math.PI * orbitControlOptions.minPolarAngle / 180;
        this._orbitControl.maxPolarAngle = Math.PI * orbitControlOptions.maxPolarAngle / 180; 
        // 最小、最大旋转角度
        this._orbitControl.minAzimuthAngle = Math.PI * orbitControlOptions.minAzimuthAngle / 180;
        this._orbitControl.maxAzimuthAngle = Math.PI * orbitControlOptions.maxAzimuthAngle / 180; 
        // OrbitControls加入后，托管了相机，所以必须通过它来改变相机参数
        // camera.lookAt()失效问题https://stackoverflow.com/questions/10325095/threejs-camera-lookat-has-no-effect-is-there-something-im-doing-wrong
        // this._orbitControl.object.position.set(0, 0, 100)
        // this._orbitControl.target = new THREE.Vector3(12245143.987260092, 0, -3482189.0854086173)
        this._orbitControl.saveState();
        this._orbitControl.update();

        this._orbitControl.addEventListener('change', e => {
            this.emit('change', e);
        });

        // 灯光
        const lightOptions = this.options.light;
        const directionalLight = new THREE.DirectionalLight(lightOptions.main.color, lightOptions.main.intensity);
        directionalLight.position.set(-1, 1, 1);
        const ambientLight = new THREE.AmbientLight(lightOptions.ambient.color, lightOptions.ambient.intensity);
        this._scene.add(directionalLight);
        this._scene.add(ambientLight);
        // if (this.options.bloom.show) {
        //     this._bloomScene.add(directionalLight.clone());
        //     this._bloomScene.add(ambientLight.clone());
        // }
        this._mainLight = directionalLight;
        this._ambientLight = ambientLight;

        // animate
        this._animate();
    }
    
    _initGlobal() {
        if (THREE == undefined) {
            console.error('THREE 依赖 threejs 库！');
        } 
        if (THREE.OrbitControls == undefined) {
            console.error('THREE.OrbitControls 依赖 OrbitControls.js 文件！');
        } 

        const size = this.getContainerSize();
        const dpr = _util__WEBPACK_IMPORTED_MODULE_1__["getDpr"]();

        // 初始化画布
        this._renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        this._renderer.setPixelRatio(dpr);
        this._renderer.setClearColor(0x000000, 0); // 背景透明 
        this._renderer.setSize(size.width, size.height, true);
        this._renderer.domElement.className = 'chart-canvas';
        this._el.appendChild(this._renderer.domElement);

        // 设置场景
        this._scene = new THREE.Scene();

        // 相机
        const cameraOptions = this.options.camera;
        this._camera = new THREE.PerspectiveCamera(cameraOptions.fov, size.width / size.height, cameraOptions.near, cameraOptions.far);

        // 控件
        const orbitControlOptions = this.options.orbitControlOptions;
        this._orbitControl = new THREE.OrbitControls(this._camera, this._renderer.domElement);
        // 距离相机的最小、最大距离，仅用于透视相机
        let d = this.getDistance(this.options.global.R*2);
        // this._orbitControl.minDistance = d; 
        this._orbitControl.minDistance = orbitControlOptions.minDistance;
        this._orbitControl.maxDistance = d*2; 
        // 最小、最大翻转角度 在哪个平面内就相对于哪个平面的坐标轴
        // this._orbitControl.minPolarAngle = Math.PI * orbitControlOptions.minPolarAngle / 180;
        // this._orbitControl.maxPolarAngle = Math.PI * orbitControlOptions.maxPolarAngle / 180; 
        // 最小、最大旋转角度
        // this._orbitControl.minAzimuthAngle = Math.PI * orbitControlOptions.minAzimuthAngle / 180;
        // this._orbitControl.maxAzimuthAngle = Math.PI * orbitControlOptions.maxAzimuthAngle / 180; 

        this._orbitControl.addEventListener('change', e => {
            this.emit('change', e);
        });

        this._orbitControl.saveState();
        this._orbitControl.update();

        // 灯光
        const lightOptions = this.options.global.light;
        if (lightOptions.hemisphereLight.show) {
            const hemisphereLight = new THREE.HemisphereLight(lightOptions.hemisphereLight.skyColor, lightOptions.hemisphereLight.groundColor, lightOptions.hemisphereLight.intensity);
            hemisphereLight.position.x = 0;
            hemisphereLight.position.y = 0;
            hemisphereLight.position.z = -this.options.global.R;
            this._scene.add(hemisphereLight);
        }
        // 环境光
        const ambientLight = new THREE.AmbientLight(lightOptions.ambient.color, lightOptions.ambient.intensity);
        this._scene.add(ambientLight);
        
        // 球面
        const globeTextureLoader = new THREE.TextureLoader();
        globeTextureLoader.load(this.options.global.earthImgSrc, texture => {
            const globeGgeometry = new THREE.SphereGeometry(this.options.global.R, 100, 100);
            const globeMaterial = new THREE.MeshStandardMaterial({map: texture});
            // test code -start
            // globeMaterial.transparent = true;
            // globeMaterial.opacity = 0.6;
            // test code - end
            const globeMesh = new THREE.Mesh(globeGgeometry, globeMaterial);
            this._scene.add(globeMesh);
            // this._scene.rotation.x = THREE.Math.degToRad(this.options.global.center[1]);
            // this._scene.rotation.y = THREE.Math.degToRad(this.options.global.center[0]);
            
            // 转整个场景：会影响其他
            // this._scene.rotateY(THREE.Math.degToRad(-this.options.global.center[0]-90)); // 经度
            // this._scene.rotateZ(THREE.Math.degToRad(-this.options.global.center[1]));  // 纬度
            
            // 转球自身
            // globeMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), THREE.Math.degToRad(-this.options.global.center[0]-90));
            // globeMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), THREE.Math.degToRad(this.options.global.center[1]));

            // 以z轴正半轴作为零度经线的起始点
            globeMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), THREE.Math.degToRad(-90));
            
        });
        
        // test code -start
        // this.drawAxis(this._scene, this.options.global.R*2);
        // test code -end
        
        // animate
        this._animate();
    }
    _initEvents() {
        this._onContainerResize = this._onContainerResize.bind(this);
        this._mousemoveEvtHandler = this._mousemoveEvtHandler.bind(this);
        window.addEventListener('resize', this._onContainerResize, false);
        this._renderer.domElement.addEventListener('mousemove', this._mousemoveEvtHandler, false);
        
        // 上下文丢失事件
        this._webglContextLostHandler = this._webglContextLostHandler.bind(this);     
        this._renderer.domElement.addEventListener("webglcontextlost", this._webglContextLostHandler , false);
        
        // 上下文恢复事件
        this._webglContextRestoreHandler = this._webglContextRestoreHandler.bind(this);
        this._renderer.domElement.addEventListener("webglcontextrestored", this._webglContextRestoreHandler, false);
    }
    _webglContextLostHandler (e) {
        e.preventDefault();
        this.emit('webglcontextlost', e);
    }
    _webglContextRestoreHandler (e) {
        this.emit('webglcontextrestored', e);
    }
    _animate() {
        this._animateId = requestAnimationFrame(this._animate.bind(this));
        this._orbitControl.update();
        if(this.options.type === 'sphere' && this.options.global.animation) {
            this._scene.rotation.y -= 0.005 * this.options.global.animationSpeed;
        }
         // update text layer scale to fix size
        for (let id in this._layers) {
            let layer = this._layers[id];
            if (layer instanceof _layers_text_layer__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                layer.updateScale();
            }
        }
        if (this.options.bloom.show && this._composer) {
            this._composer.render();
            this._renderer.autoClear = false;
        } else {
            this._renderer.render(this._scene, this._camera);
        }

        if (this.animateCallback) { this.animateCallback.call(this, arguments); }
    }
    _onContainerResize() {
        const size = this.getContainerSize();

        // 设置透视摄像机的长宽比
        this._camera.aspect = size.width / size.height;
        // 摄像机的 position 和 target 是自动更新的，而 fov、aspect、near、far 的修改则需要重新计算投影矩阵（projection matrix）
        this._camera.updateProjectionMatrix();
        // 设置渲染器输出的 canvas 的大小
        this._renderer.setSize(size.width, size.height, true);

        if (this._legend) {
            this.addLegend(this._legendOptions);
        }
        this._composer && this._composer.setSize( size.width, size.height );
    }
    _mousemoveEvtHandler(e) {
        this.emit('mousemove', e);
    }
    destroy() {
        this.clearLayers();
        this.destoryLegend();
        window.removeEventListener('resize', this._onContainerResize, false);
        this._renderer.domElement.removeEventListener('mousemove', this._mousemoveEvtHandler, false);
        this._renderer.domElement.removeEventListener("webglcontextlost", this._webglContextLostHandler, false);
        this._renderer.domElement.removeEventListener("webglcontextrestored", this._webglContextRestoreHandler, false);        
        window.cancelAnimationFrame(this._animateId);
        if (_util__WEBPACK_IMPORTED_MODULE_1__["isInPage"](this._container) && _util__WEBPACK_IMPORTED_MODULE_1__["isInPage"](this._el)) {
            this._container.removeChild(this._el);
            this._el = null;
        }
    }
}

/***/ }),

/***/ "./js/tooltip.js":
/*!***********************!*\
  !*** ./js/tooltip.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ToolTip; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./js/util.js");


class ToolTip {
    constructor(parentElement, options = {}) {
        const defaultOptions = {
            offsetX: 6,
            offsetY: 8,
            className: 'chart-map-3d-tooltip',
            activeClassName: 'chart-map-3d-tooltip-active'
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_0__["extend"](true, defaultOptions, options);
    
        this._el = document.createElement("div");
        // Util.addClass(this._el, 'tooltip sankey-tooltip ' + this.options.className);
        _util__WEBPACK_IMPORTED_MODULE_0__["addClass"](this._el, this.options.className);
        this._el.style.display = 'none';
        this._el.style.position = 'absolute';
        this._el.style.backgroundColor = '#fff';
        this._el.style.borderRadius = '2px';
        this._el.style.color = 'rgba(10, 18, 32, 0.64)';
        this._el.style.fontSize = '12px';
        this._el.style.lineHeight = 1.4;
        this._el.style.opacity = 0.9;
        this._el.style.padding = '8px 10px';
        this._el.style.userSelect = 'none';
       
        if (!parentElement) {
            throw new Error('未提供tootip父元素！');
        }
        parentElement.appendChild(this._el);
    }
    open(x, y, content) {
        if (this._el) {
            this._el.innerHTML = content;
            this._el.style.left = x + this.options.offsetX + 'px';
            this._el.style.top = y + this.options.offsetY + 'px';
            _util__WEBPACK_IMPORTED_MODULE_0__["addClass"](this._el, this.options.activeClassName);
            this._el.style.display = 'block';
        }
    }
    close() {
        if (this._el) {
            _util__WEBPACK_IMPORTED_MODULE_0__["removeClass"](this._el, this.options.activeClassName);
            this._el.style.display = 'none';
        }   
    }
    remove() {
        if (this._el && this._el.parentElement) {
            this._el.parentElement.removeChild(this._el);
            this._el = null;
        }
    }
}

/***/ }),

/***/ "./js/util.js":
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! exports provided: hasClass, addClass, removeClass, getCmpStyle, isInPage, getDpr, isFunction, isPlainObject, isEmptyObject, extend, stamp, inherit, isNullOrUdf, getRandomColor, isWebGLAvailable, normalizeValue, lightenDarkenColor, measureText, wrapNum, formatNum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCmpStyle", function() { return getCmpStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInPage", function() { return isInPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDpr", function() { return getDpr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return isEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stamp", function() { return stamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inherit", function() { return inherit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNullOrUdf", function() { return isNullOrUdf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomColor", function() { return getRandomColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWebGLAvailable", function() { return isWebGLAvailable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeValue", function() { return normalizeValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightenDarkenColor", function() { return lightenDarkenColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "measureText", function() { return measureText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapNum", function() { return wrapNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatNum", function() { return formatNum; });
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
}

function addClass(el, className) {
    if (el.classList !== undefined) {
        var list = className.split(' ');
        for (var i = 0, len = list.length; i < len; i++) {
            el.classList.add(list[i]);
        }
    } else if (!hasClass(el, className)) {
        el.className = (el.className ? el.className + ' ' : '') + className;
    }
}

function removeClass(el, className) {
    if (el.classList !== undefined) {
        el.classList.remove(className);
    } else {
        el.className = ' ' + el.className + ' ';
        el.className = el.className.replace(' ' + className + ' ', ' ');
    }
}

function getCmpStyle(el) {
    // FIXEME 兼容性写法
    return getComputedStyle(el);
}

function isInPage(node) {
    return (node === document.body) ? false : document.body.contains(node);
}

function getDpr() {
    return window.devicePixelRatio || 1;
}

function isFunction( obj ) {

    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
}

function isPlainObject( obj ) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if ( !obj || Object.prototype.toString.call( obj ) !== "[object Object]" ) {
        return false;
    }

    proto = Object.getPrototypeOf( obj );

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if ( !proto ) {
        return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = Object.prototype.hasOwnProperty.call( proto, "constructor" ) && proto.constructor;
    return typeof Ctor === "function" && Object.prototype.hasOwnProperty.toString.call( Ctor ) === Object.prototype.hasOwnProperty.toString.call( Object );
}

function isEmptyObject( obj ) {
    var name;

    for ( name in obj ) {
        return false;
    }
    return true;
}

// 浅拷贝
// export function extend(srcObj) {
//     var i, j, len, src;
//     for (j = 1, len = arguments.length; j < len; j++) {
//         src = arguments[j];
//         for (var i in src) {
//             srcObj[i] = src[i];
//         }
//     }
//     return srcObj;
// }

// 深浅拷贝， 参考jquery
function extend() {
    var options, name, src, copy, copyIsArray, clone,
    target = arguments[ 0 ] || {},
    i = 1,
    length = arguments.length,
    deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;

        // Skip the boolean and the target
        target = arguments[ i ] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !isFunction( target ) ) {
        target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {

        // Only deal with non-null/undefined values
        if ( ( options = arguments[ i ] ) != null ) {

            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( isPlainObject( copy ) || ( copyIsArray = Array.isArray( copy ) ) ) ) {

                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && Array.isArray( src ) ? src : [];

                    } else {
                        clone = src && isPlainObject( src ) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = extend( deep, clone, copy );

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }
    // Return the modified object
    return target;
}

var lastId;
function stamp(obj) {
    if (lastId == null) lastId = 0;
    obj.__objstampid__ = obj.__objstampid__ || ++lastId;
    return obj.__objstampid__;
}

function inherit (parentClass, childClass) {
    var tempClass = function () {};
    tempClass.prototype = parentClass.prototype;
    childClass.prototype = new tempClass();
    childClass.prototype.constructor = childClass;
}

function isNullOrUdf(val) {
    return val == null;
}

function getRandomColor () {
    return '#' + (function getColor(color) {
        return (color += '0123456789abcdef' [Math.floor(Math.random() * 16)]) &&
            (color.length == 6) ? color : getColor(color);
    })('');
}

function isWebGLAvailable () {
    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

/**
 * 获取归一化的值，归一到区间[ymin, ymax]
 * xmax, xmin 目前数据的最大、最小值
 * ymax, ymin 目标区间的最大、最小值
 */
function normalizeValue(value, xmin, xmax, ymin, ymax, type = 0) {
    if (xmax === 0 && xmin === 0) {
        return ymin;
    }
    if (xmin === xmax) {
        // type =0 柱子高度相同时，取中值
        // type !=0 颜色相同时，取最小值
        if (type === 0) {return (ymax + ymin) / 2;}
        else {return ymin;}
    }
    return ymin + (ymax - ymin) * (value - xmin) / (xmax - xmin);
}

// 获取一个颜色的高亮或更暗色 https://css-tricks.com/snippets/javascript/lighten-darken-color/
function lightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

// 缓存文字宽度，减少计算量
// idea from echarts/zrender
let textWidthCache = {}; 
let textWidthCacheCounter = 0;
const TEXT_CACHE_MAX = 5000;
function measureText(text, font = 'normal normal 12px sans-serif') {
    const key = text + ':' + font;
    if (textWidthCache[key]) {
        // NOTE：外部不要修改对象
        return textWidthCache[key];
    }
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.display = "inline-block";
    document.body.appendChild(span);
    let result = {
        width: 0,
        height: 0
    };
    span.style.font = font;
    if (typeof span.textContent !== "undefined") {
        span.textContent = text;
    } else {
        span.innerText = text;
    }
    const cmpStyle = window.getComputedStyle(span);
    result.width = parseFloat(cmpStyle.width);
    result.height = parseFloat(cmpStyle.height);
    if (textWidthCacheCounter > TEXT_CACHE_MAX) {
        textWidthCache = {};
        textWidthCacheCounter = 0;
    }
    textWidthCache[key] = result;
    textWidthCacheCounter ++;
    // 移除DOM
    span.parentNode.removeChild(span);
    return result;
}

function wrapNum(num) {
    let i = 2;
    while (i < num) {
        i *= 2;
    }
    return i;
}

// @function formatNum(num: Number, digits?: Number): Number
// Returns the number `num` rounded to `digits` decimals, or to 5 decimals by default.
function formatNum(num, digits) {
	var pow = Math.pow(10, digits || 5);
	return Math.round(num * pow) / pow;
}

/***/ })

/******/ });
});
//# sourceMappingURL=threejsmap.js.map
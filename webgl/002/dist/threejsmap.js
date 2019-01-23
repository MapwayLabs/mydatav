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
/*! exports provided: ThreeMap, GeoJSONLayer, FlyLineLayer, BarLayer, mapHelper, Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _three_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./three-map */ "./js/three-map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThreeMap", function() { return _three_map__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _layers_geojson_layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layers/geojson-layer */ "./js/layers/geojson-layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GeoJSONLayer", function() { return _layers_geojson_layer__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _layers_flyline_layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layers/flyline-layer */ "./js/layers/flyline-layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FlyLineLayer", function() { return _layers_flyline_layer__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _layers_bar_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layers/bar-layer */ "./js/layers/bar-layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BarLayer", function() { return _layers_bar_layer__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./maphelper */ "./js/maphelper.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mapHelper", function() { return _maphelper__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "./js/util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return _util__WEBPACK_IMPORTED_MODULE_5__; });














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
    constructor (data, geojsonLayer, options, tooltipHelper, bdpChart) {
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
                enumColor: null
            },
            barText: {
                show: true,
                offset: 1,
                textStyle: {
                    scale: 1,
                    fontWeight: 'normal',
                    fontFamily: 'Microsoft YaHei',
                    fontColor: '#000',
                    textAlign: 'center',
                    textBaseline: 'middle'
                }
            },
            barTooltip: {
                show: true
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, defaultOptions, options);

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
                ylabelName: y.name,
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
                        ylabelName: y.name,
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
            let yoffset = this.geojsonLayer.getDepth();
            let projCenter = this._map.projectLngLat(item.center);
            let bar = this._createBar(projCenter, barHeight, barColor, yoffset);
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
            this._currentSelectObj.material.transparent = false;
            this._currentSelectObj.material.opacity = 1;
            this._currentSelectObj = null;
            this._toolTipHelper && this._toolTipHelper.hideTooltip(); // TODO: bdp
        }

        for (var i = 0; i < intersects.length; i++) {
            let object = intersects[i].object;
            let udata = object.userData;
            if (udata && udata.type === 'bar') {
                let color = object.material.color.getHexString();
                object.material.transparent = true;
                object.material.opacity = 0.85;
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
                this._currentSelectObj.material.transparent = false;
                this._currentSelectObj.material.opacity = 1;
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
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(center[0], yoffset, -center[1]);
        mesh.rotateX(-Math.PI / 2);
        return mesh;
    }
    _addTextLayer() {
        let textData = [];
        this._barData.data.forEach((item, index) => {
            let barHeight = this.getBarHeight(item);
            let yoffset = this.geojsonLayer.getDepth();
            let tempobj = {};
            tempobj.text = item.formattedVal;
            tempobj.center = item.center;
            tempobj.altitude = barHeight + yoffset + this.options.barText.offset;
            textData.push(tempobj);
        });
        const options = {
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
	'gl_FragColor.a *= fade;',
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
			repeat: { type: 'v2', value: this.repeat }
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


// import { lineShader } from './shader/line';


// 飞线图层
class FlyLineLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(data, geojsonLayer, options) {
        super(data, options);
        const defaultOptions = {
            heightLimit: 30, // 飞线最高点高度
            // 线样式
            lineStyle: {
                show: true,
                color: '#0f0',
                opacity: 0.5,
                width: 1
            },
            pointStyle: {
                show: false,
                color: '#0f0',
                size: 3
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
        this.animate();
    }
    onAdd(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onAdd.call(this, map); 
        this._draw();
    }
    onRemove(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onRemove.call(this, map);
        if (this._animateId) {
            window.cancelAnimationFrame(this._animateId);
        }
    }
    animate(time) {
        this._animateId = requestAnimationFrame(this.animate.bind(this));
        this.uniforms.time.value  = time;
    }
    _draw() {
        this._data.forEach(item => {
            let h = this.options.heightLimit;
            let f = item.from.split(',').map(p => Number(p));
            let t = item.to.split(',').map(p => Number(p));
            let m = [(f[0]+t[0])/2, (f[1]+t[1])/2];
            if (this._map.options.type === 'sphere') {
                // 三维的第三个值表示海拔,需进行投影转换
                m.push(h);
            }
            let nf = this._map.projectLngLat(f);
            let nt = this._map.projectLngLat(t); 
            let nm = this._map.projectLngLat(m);
            // this._drawPoint([f[0], 18, -f[1]]);
            // this._drawPoint([t[0], 18, -t[1]]);
            if(this._map.options.type === 'plane') {
                // 二维的第三个值表示离地面距离，不需投影
                nm.push(h);
            }
            if (this.options.pointStyle.show) {
                if(this._map.options.type === 'sphere') {
                    const size = this.options.pointStyle.size;
                    f.push(size/2);
                    t.push(size/2);
                    let of = this._map.projectLngLat(f);
                    let ot = this._map.projectLngLat(t); 
                    this._drawPoints([of, ot]);
                }
            }
            if (this.options.lineStyle.show) {
                this._drawLine2(nf, nt, nm);
            }
            if (this.options.effect.show) {
                this._drawFlyLine(nf, nt, nm);
                this.uniforms.hasEffect.value = 1;
            }
        });
    }
    _getCurve(startPoint, endPoint, midPoint) {
        const isGlobal = !!(this._map.options.type === 'sphere');
        let geojsonLayer = this.geojsonLayer;
        let depth = 0;
        if (geojsonLayer && geojsonLayer.options.isExtrude) {
            depth = geojsonLayer.options.depth;
        }
        let middleX = midPoint[0];
        let middleY = midPoint[1];
        let middleZ = isGlobal ? midPoint[2] : (0 + depth + midPoint[2]);
        let sz = isGlobal ? startPoint[2] : (0 + depth);
        let ez = isGlobal ? endPoint[2] : (0 + depth);
        let startVector = new THREE.Vector3(startPoint[0], startPoint[1], sz);
        let middleVector = new THREE.Vector3(middleX, middleY, middleZ);
        let endVector = new THREE.Vector3(endPoint[0], endPoint[1], ez);

        let curve = new THREE.CatmullRomCurve3([startVector, middleVector, endVector]);
        return curve;
    }
    _drawPoints(points) {
        const loader = new THREE.TextureLoader();
	    const texture = loader.load( '../../images/disc.png' );
        const pointGeometry = new THREE.BufferGeometry();
        const color = this.options.pointStyle.color;
        const size = this.options.pointStyle.size;
        points = points.map(pt => new THREE.Vector3(pt[0], pt[1], pt[2]));
        pointGeometry.setFromPoints(points);
        const pointsMaterial = new THREE.PointsMaterial( { color: color, alphaTest: 0.5, map: texture, size: size } );
        const pointsObj = new THREE.Points( pointGeometry, pointsMaterial );
        pointsObj.renderOrder=99;
        pointsObj.material.depthTest=true;
        this._container.add(pointsObj);
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
    _drawLine2(startPoint, endPoint, midPoint) {  
        const size = this._map.getContainerSize();
        const curve = this._getCurve(startPoint, endPoint, midPoint);
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
            lineWidth: this.options.lineStyle.width
        });

        const lineMesh = new THREE.Mesh(line.geometry, shaderMaterial);
        if (this._map.options.type === 'plane') {
            lineMesh.rotateX(-Math.PI/2);
        }
        
        this._container.add(lineMesh);
    }
    _drawFlyLine(startPoint, endPoint, midPoint) {
        const curve = this._getCurve(startPoint, endPoint, midPoint);
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






// geojson 地图
class GeoJSONLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
            // 地区名字
            areaText: {
                show: true, // 是否显示【无数据】区域文字，不能控制无数据区域文字
                offset: 1, // 文字离地面高度
                textStyle: { // 有数据地区的名字样式
                    show: true, // 是否显示有数据地区文字
                    scale: 1, // 缩放比例
                    fontWeight: 'normal',
                    fontFamily: 'Microsoft YaHei',
                    fontColor: 'rgba(0, 0, 0, 0.8)',
                    textAlign: 'center',
                    textBaseline: 'middle'
                },
                nullTextStyle: { // 无数据地区的名字样式
                    scale: 1, // 缩放比例
                    fontWeight: 'normal',
                    fontFamily: 'Microsoft YaHei',
                    fontColor: 'rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
                    textBaseline: 'middle' 
                }
            },
            lineOpacity: 1,
            lineMaterial: {
                color: 0x999999,
                linewidth: 1.5
            },
            areaMaterial: { // 面材质配置
                color: 0x00ff00,
                side: THREE.DoubleSide
            },
            hightLight: {
                show: false,
                color: '#639fc0'
            },
            tootip: {
                show: true
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, defaultOptions, options);

        this._initFeatures();
    }
    onAdd(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onAdd.call(this, map); 
        this._initBoundsAndCenter();
        if (this.options.isAutoResize) {
            this._initResizeOptions();
        }
        this._draw();
        this.updateLabels();
        if (this.options.hightLight.show) {
            this._map.on('mousemove', this._mousemoveEvtHandler, this);
        }
        if (this.options.tootip.show) {
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
                name: _maphelper__WEBPACK_IMPORTED_MODULE_2__["getNormalizeName"](feature)
            };
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
                    this.drawPolygon(convert_array, userData);
                }

            } else if (geometry.type == 'MultiPolygon') {
                for (let polygon_num = 0; polygon_num < geometry.coordinates.length; polygon_num++) {
                    for (let segment_num = 0; segment_num < geometry.coordinates[polygon_num].length; segment_num++) {
                        let coordinate_array = this.createCoordinateArray(geometry.coordinates[polygon_num][segment_num]);
                        let convert_array = coordinate_array;
                        if (this._map.options.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857) {
                            convert_array = this.convertCoordinates(coordinate_array);
                        }
                        this.drawPolygon(convert_array, userData);
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
        const intersects = raycaster.intersectObjects(this._container.children);
      
        // 避免连续选中
        if (this._currentSelectObj) {
            this._currentSelectObj.material.color = this._currentSelectObj.userData.oldColor;
            this._currentSelectObj = null;
            this._tooltip && this._tooltip.close();
        }

        for (var i = 0; i < intersects.length; i++) {
            let object = intersects[i].object;
            let udata = object.userData;
            if (udata && udata.type === 'area') {
                object.userData.oldColor = object.material.color;
                object.material.color = new THREE.Color(this.options.hightLight.color);
                this._currentSelectObj = object;
                let content = `${udata['name']}`;
                this._tooltip && this._tooltip.open(sx, sy, content);
                break;
            }
        }
        if (i === intersects.length) {
            if (this._currentSelectObj) {
                this._currentSelectObj.material.color = this._currentSelectObj.userData.oldColor;
                this._currentSelectObj = null;
                this._tooltip && this._tooltip.close();
            }
        }
    }
    updateLabels(barLayer) {
        if (this._features == null || !this._features.length) {return;}
        let barWidth = 0;
        if (barLayer) {
            barWidth = barLayer.options.barStyle.width;
        }
        let textData = [];
        let nullTextData = [];
        let forceBoundsCenter = true;
        if (this._map.options.region === 'china' || this._map.options.region === 'world') {
            forceBoundsCenter = false;
        }
        this._features.forEach(f => {
            let yoffset = this.getDepth();
            let tempobj = {};
            let name = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getNormalizeName"](f);
            // FIXME: 采用简单粗暴方法避免文字覆盖
            tempobj.textAlign = 'center';
            if (new RegExp(name).test('香港')) {
                tempobj.textAlign = 'left'
            } else if (new RegExp(name).test('澳门')) {
                tempobj.textAlign = 'right'
            } else if (new RegExp(name).test('广东')) {
                tempobj.textBaseline = 'bottom'
            } else if (new RegExp(name).test('北京')) {
                tempobj.textAlign = 'right'
            } else if (new RegExp(name).test('天津')) {
                tempobj.textAlign = 'left'
            }
            tempobj.text = name;
            tempobj.center = _maphelper__WEBPACK_IMPORTED_MODULE_2__["getNormalizeCenter"](f, forceBoundsCenter);
            tempobj.center[1] += barWidth*2; // TODO: 避免文字覆盖柱子
            tempobj.altitude = yoffset + this.options.areaText.offset;
            if (f.hasBarData) {
                textData.push(tempobj);
            } else {
                nullTextData.push(tempobj);
            }  
        });
        const textOptions = {
            textStyle: this.options.areaText.textStyle
        };
        const nullTextOptions = {
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
    drawOutLine(points, mesh) {
        // 画轮廓线
        // 因为面是画在xy平面的，然后通过旋转而来，为了保持一致，轮廓线也绘制在xy平面，这样变换就能与面同步
        let line_geom = new THREE.Geometry();
        for (let i = 0, len=points.length; i < len ; i++) {
            line_geom.vertices.push(new THREE.Vector3(points[i][0], points[i][1], 0));
        }
        let line_material = new THREE.LineBasicMaterial(this.options.lineMaterial);
        line_material.transparent = false;
        line_material.opacity = this.options.lineOpacity;
        let line = new THREE.Line(line_geom, line_material);
        if (this.options.isExtrude) {
            line.translateZ(this.options.depth);
        }
        line.renderOrder = 98;
        mesh.add(line);
    }
    drawPolygon(points, userData) {
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

        let geometry, material;

        if (this.options.isExtrude) {
            // 拉伸
            let extrudeSettings = {
                depth: this.options.depth, 
                bevelEnabled: false   // 是否用斜角
            };
            geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
            material = new THREE.MeshPhongMaterial(this.options.areaMaterial);
        } else {
            // 不拉伸
            geometry = new THREE.ShapeBufferGeometry(shape);
            material = new THREE.MeshBasicMaterial(this.options.areaMaterial);
        }
        
        let mesh = new THREE.Mesh(geometry, material);
        this.drawOutLine(points, mesh);
        mesh.rotateX(-Math.PI/2);
        mesh.userData = _util__WEBPACK_IMPORTED_MODULE_1__["extend"]({type: 'area'}, userData);
        this._container.add(mesh);
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




// 文字标注图层
class TextLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(data, options) {
        super(data, options);
        const defaultOptions = {
            textStyle: {
                scale: 1,
                fontWeight: 'normal',
                fontFamily: 'Microsoft YaHei',
                fontColor: '#000',
                textAlign: 'center',
                textBaseline: 'middle'
            }
        };
        _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, defaultOptions, options);
    }
    onAdd(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onAdd.call(this, map); 
        this._draw();
    }
    onRemove(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onRemove.call(this, map);
    }
    update(data) {
        this._container.remove(...this._container.children);
        this._data = data;
        this._draw();
    }
    _draw() {
        if (this._data == null || !this._data.length) {return;}
        this._data.forEach(d => {
            const projCenter = this._map.projectLngLat(d.center);
            const altitude = d.altitude;
            // TODO: 为了避免文字覆盖，对每个文字设置不同的对齐方式 
            this.options.textStyle.textAlign = d.textAlign || this.options.textStyle.textAlign || null;
            const textSprite = new _text_sprite__WEBPACK_IMPORTED_MODULE_2__["default"](d.text, this.options.textStyle).getSprite();
            const scale = this.options.textStyle.scale;

            textSprite.scale.set(scale, scale, 1);
            textSprite.position.set(projCenter[0], altitude, -projCenter[1]);
            textSprite.rotateX(-Math.PI/2);

            // 避免柱子遮挡地名
            textSprite.renderOrder = 100;
            textSprite.material.depthTest=false; // 是否采用深度测试，必须加
    
            this._container.add(textSprite);
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
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#000',
            textAlign: 'center',
            textBaseline: 'middle'
        }
        this.options = _util__WEBPACK_IMPORTED_MODULE_0__["extend"](true, defaultOptions, options);

        this._textStr = text == null ? '' : String(text);

        this._init();
    }
    getSprite() {
        return this._textSprite;
    }
    _init() {
        const canvas = document.createElement("canvas");
        // webgl 规定 canvas 宽高为2的n次幂
        canvas.width = 256;
        canvas.height = 256;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw
        const options = this.options;
        ctx.font = "16px " + options.fontWeight + " " + options.fontFamily;
        ctx.fillStyle = options.fontColor;
        ctx.textAlign = options.textAlign;
        ctx.textBaseline = options.textBaseline;
        ctx.fillText(this._textStr, canvas.width / 2, canvas.height / 2 + 5);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent:true
        });
        this._textSprite = new THREE.Sprite(spriteMaterial);
    }
}

/***/ }),

/***/ "./js/maphelper.js":
/*!*************************!*\
  !*** ./js/maphelper.js ***!
  \*************************/
/*! exports provided: CRS, wgs84ToMecator, mecatorToWgs84, getBounds, getNormalizeCenter, getNormalizeName, scalePoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CRS", function() { return CRS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wgs84ToMecator", function() { return wgs84ToMecator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mecatorToWgs84", function() { return mecatorToWgs84; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBounds", function() { return getBounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNormalizeCenter", function() { return getNormalizeCenter; });
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

    return [ lnglat[0] * d * r, y ];
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

    return [ point[0] * d / r, phi * d ];
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
        let bounds = getBounds(feature);
        center = bounds.getCenter();
    }
    return center;
}

function getNormalizeName(feature) {
    let props = feature && feature.properties;
    if (props) {
        if(props.name) {
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




class ThreeMap extends _eventemiter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(el, options) {
        super();
        const defaultOptions = {
            type: 'plane', // plane or sphere ,平面或球面
            region: 'world', // china or world, 中国或世界地图
            crs: _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857, // 地图采用的地理坐标系 EPSG:4326: 经纬度，EPSG:3857: 墨卡托
            SCALE_RATIO: 100000, // 地球墨卡托平面缩放比例
            containerClassName: 'three-map-container', // 地图容器类名
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
                    skyColor: '#fff',
                    groundColor: '#333',
                    intensity: 2
                }
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, defaultOptions, options);

        this._layers = {};
        
        this._initBounds();
        this._initContainer(el);
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
        this._scene.add(layer.getContainer());

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
                return _maphelper__WEBPACK_IMPORTED_MODULE_2__["scalePoint"](point, 1/this.options.SCALE_RATIO);
            } else {
                return lnglat;
            }
        } else {
            // sphere
            return this.lngLatToGlobal(lnglat[0], lnglat[1], lnglat[2]);
        }
    }
    lngLatToGlobal(lng, lat, alt = 0) {
        const phi = (90-lat)*(Math.PI/180);
        const theta = (lng+180)*(Math.PI/180);
        const radius = alt+this.options.global.R;
        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = (radius * Math.sin(phi) * Math.sin(theta));
        const y = (radius * Math.cos(phi));
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
                // this._orbitControl.object.position.set(16.42515, 369.562538, 333.99466);
                // this._orbitControl.target = new THREE.Vector3(10.06448, 51.62625, 6.71498);
                let d = this.getDistance(bounds.getHeight());
                let scaleD = d * this.options.camera.distanceRatio;
                let center = bounds.getCenter();
                this._orbitControl.object.position.set(center[0], scaleD, -center[1]);
                this._orbitControl.target = new THREE.Vector3(center[0], 0, -center[1]);
                this._orbitControl.minDistance = d * 0.5;
                this._orbitControl.maxDistance = d * 2;
            } else if (this.options.region === 'china') {
                let d = this.getDistance(bounds.getHeight());
                let center = bounds.getCenter();
                let scaleD = d * 0.2; 
                this._orbitControl.object.position.set(center[0], center[1], scaleD);
                this._orbitControl.target = new THREE.Vector3(center[0], 0, -center[1]);
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
        let Legend = Dalaba.Chart.Legend;
        let legend = null;
        const size = this.getContainerSize();
        if (!this._legendCanvas) {
            this._legendCanvas = document.createElement('canvas');
            this._legendCanvas.width = this._renderer.domElement.width;
            this._legendCanvas.height = this._renderer.domElement.height;
            this._legendCanvas.style.width = size.width + 'px';
            this._legendCanvas.style.height = size.height + 'px';
            this._legendCanvas.className = 'three-map-legendcanvas';
            this._el.appendChild(this._legendCanvas);
        }
        if (Legend && legendOptions.enabled) {
            legend = new Legend(
                this._legendCanvas,//this.addLayer(legendOptions.layer),
                [{name: 9}],
                legendOptions//selected为false不读取
            );
        }
        return legend;
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
    _init3D() {
        if (THREE == undefined) throw new Error('需先引入 threejs 库！');
        if (THREE.OrbitControls == undefined) throw new Error('需先引入 OrbitControls 组件！');

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

        // 灯光
        const lightOptions = this.options.light;
        const directionalLight = new THREE.DirectionalLight(lightOptions.main.color, lightOptions.main.intensity);
        directionalLight.position.set(-1, 1, 1);
        const ambientLight = new THREE.AmbientLight(lightOptions.ambient.color, lightOptions.ambient.intensity);
        this._scene.add(directionalLight);
        this._scene.add(ambientLight);
        this._mainLight = directionalLight;
        this._ambientLight = ambientLight;

        // animate
        this._animate();
    }
    _initGlobal() {
        if (THREE == undefined) throw new Error('需先引入 threejs 库！');
        if (THREE.OrbitControls == undefined) throw new Error('需先引入 OrbitControls 组件！');

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
        this._orbitControl.minDistance = d; 
        this._orbitControl.maxDistance = d*2; 
        // 最小、最大翻转角度 在哪个平面内就相对于哪个平面的坐标轴
        // this._orbitControl.minPolarAngle = Math.PI * orbitControlOptions.minPolarAngle / 180;
        // this._orbitControl.maxPolarAngle = Math.PI * orbitControlOptions.maxPolarAngle / 180; 
        // 最小、最大旋转角度
        // this._orbitControl.minAzimuthAngle = Math.PI * orbitControlOptions.minAzimuthAngle / 180;
        // this._orbitControl.maxAzimuthAngle = Math.PI * orbitControlOptions.maxAzimuthAngle / 180; 
     
        this._orbitControl.saveState();
        this._orbitControl.update();

        // 灯光
        const lightOptions = this.options.global.light;
        const hemisphereLight = new THREE.HemisphereLight(lightOptions.skyColor, lightOptions.groundColor, lightOptions.intensity);
        hemisphereLight.position.x = 0;
        hemisphereLight.position.y = 0;
        hemisphereLight.position.z = -this.options.global.R;
        this._scene.add(hemisphereLight);
        
        // 球面
        const globeTextureLoader = new THREE.TextureLoader();
        globeTextureLoader.load(this.options.global.earthImgSrc, texture => {
            const globeGgeometry = new THREE.SphereGeometry(this.options.global.R, 100, 100);
            const globeMaterial = new THREE.MeshStandardMaterial({map: texture});
            const globeMesh = new THREE.Mesh(globeGgeometry, globeMaterial);
            this._scene.add(globeMesh);
            this._scene.rotation.x = THREE.Math.degToRad(this.options.global.center[1]);
            this._scene.rotation.y = THREE.Math.degToRad(this.options.global.center[0]);
        });

        // animate
        this._animate();
    }
    _initEvents() {
        this._onContainerResize = this._onContainerResize.bind(this);
        this._mousemoveEvtHandler = this._mousemoveEvtHandler.bind(this);
        window.addEventListener('resize', this._onContainerResize, false);
        this._renderer.domElement.addEventListener('mousemove', this._mousemoveEvtHandler, false);
    }
    _animate() {
        this._animateId = requestAnimationFrame(this._animate.bind(this));
        this._orbitControl.update();
        if(this.options.type === 'sphere' && this.options.global.animation) {
            this._scene.rotation.y -= 0.005 * this.options.global.animationSpeed;
        }
        this._renderer.render(this._scene, this._camera);
    }
    _onContainerResize() {
        const size = this.getContainerSize();

        // 设置透视摄像机的长宽比
        this._camera.aspect = size.width / size.height;
        // 摄像机的 position 和 target 是自动更新的，而 fov、aspect、near、far 的修改则需要重新计算投影矩阵（projection matrix）
        this._camera.updateProjectionMatrix();
        // 设置渲染器输出的 canvas 的大小
        this._renderer.setSize(size.width, size.height, true);
    }
    _mousemoveEvtHandler(e) {
        this.emit('mousemove', e);
    }
    destroy() {
        this.clearLayers();
        window.removeEventListener('resize', this._onContainerResize, false);
        this._renderer.domElement.removeEventListener('mousemove', this._mousemoveEvtHandler, false);
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
        _util__WEBPACK_IMPORTED_MODULE_0__["addClass"](this._el, 'tooltip sankey-tooltip ' + this.options.className);
        this._el.style.display = 'none';
       
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
/*! exports provided: hasClass, addClass, removeClass, getCmpStyle, isInPage, getDpr, isFunction, isPlainObject, isEmptyObject, extend, stamp, inherit, isNullOrUdf, getRandomColor, isWebGLAvailable, normalizeValue, lightenDarkenColor */
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

/***/ })

/******/ });
});
//# sourceMappingURL=threejsmap.js.map
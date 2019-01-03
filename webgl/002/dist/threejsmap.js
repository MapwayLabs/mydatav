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
        cb.$context = context;
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                this.on(event[i], cb, context);
            }
        } else {
            (this._events[event] || (this._events[event] = [])).push(cb);
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
            let cbs = this._events[event];
            let i = cbs.length;
            while (i--) {
                if (cb === cbs[i] || cb === cbs[i].fn) {
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
                cbs[i].apply(cbs[i].$context || this, args);
            }
        }
    }
}

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! exports provided: ThreeMap, GeoJSONLayer, FlyLineLayer, mapHelper, Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _threemap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./threemap */ "./js/threemap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThreeMap", function() { return _threemap__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _layers_geojsonlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layers/geojsonlayer */ "./js/layers/geojsonlayer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GeoJSONLayer", function() { return _layers_geojsonlayer__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _layers_flylinelayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layers/flylinelayer */ "./js/layers/flylinelayer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FlyLineLayer", function() { return _layers_flylinelayer__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./maphelper */ "./js/maphelper.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mapHelper", function() { return _maphelper__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "./js/util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return _util__WEBPACK_IMPORTED_MODULE_4__; });












/***/ }),

/***/ "./js/layers/flylinelayer.js":
/*!***********************************!*\
  !*** ./js/layers/flylinelayer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FlyLineLayer; });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "./js/layers/layer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./js/util.js");
/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../maphelper */ "./js/maphelper.js");
/* harmony import */ var _shader_line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shader/line */ "./js/layers/shader/line.js");




class FlyLineLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(data, geojsonLayer, options) {
        super(data, options);
        const defaultOptions = {
            // 线样式
            lineStyle: {
                show: true,
                color: '#0f0',
                opacity: 0.5,
                width: 1
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
                trailOpacity: null // 尾迹不透明度，默认跟线相同
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](true, defaultOptions, options);

        this.geojsonLayer = geojsonLayer;

        this.uniforms = {
            baseColor: {value: [1.0, 1.0, 1.0, 1.0]},
            time: {value: 0},
            speed: {value: 0},
            period: {value: 5000},
            trailLength: {value:1.0}
        };
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
            let f = item.from.split(',').map(p => Number(p));
            let t = item.to.split(',').map(p => Number(p));
            let h = 42;
            if (this._map.options.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857) {
                let scale = this._map.options.SCALE_RATIO;
                f = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].wgs84ToMecator(f);
                t = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].wgs84ToMecator(t);
                f = f.map(point => point / scale);
                t = t.map(point => point / scale);
                // h = h / scale;
            }
            if (this.options.lineStyle.show) {
                this._drawLine(f, t, h);
            }
            if (this.options.effect.show) {
                this._drawFlyLine(f, t, h);
            }
        });
    }
    _getCurve(startPoint, endPoint, heightLimit) {
        let geojsonLayer = this.geojsonLayer;
        let depth = 0;
        if (geojsonLayer && geojsonLayer.options.isExtrude) {
            depth = geojsonLayer.options.depth;
        }
        let middleX = ( startPoint[0] + endPoint[0] ) / 2;
        let middleY = ( startPoint[1] + endPoint[1] ) / 2;
        let middleZ = 0 + depth + heightLimit;
        let startVector = new THREE.Vector3(startPoint[0], startPoint[1], 0 + depth);
        let middleVector = new THREE.Vector3(middleX, middleY, middleZ);
        let endVector = new THREE.Vector3(endPoint[0], endPoint[1], 0 + depth);

        let curve = new THREE.CatmullRomCurve3([startVector, middleVector, endVector]);
        return curve;
    }
    _drawLine(startPoint, endPoint, heightLimit) {  
        const curve = this._getCurve(startPoint, endPoint, heightLimit);
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
        curveObject.rotateX(-Math.PI/2);

        this._container.add(curveObject);

    }
    _drawFlyLine(startPoint, endPoint, heightLimit) {
        const curve = this._getCurve(startPoint, endPoint, heightLimit);
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
                // 分段数大于所有点数时，视为不分段
                this._drawSegment(points);
            }
        }
    }
    _drawSegment(points) {
        let effectOptions = this.options.effect;
        let useConstantSpeed = effectOptions.constantSpeed != null;
        let period = effectOptions.period * 1000;
        
        let verticeArr = []; // 顶点数组
        let colorArr = []; // 颜色数组
        let distArr = []; // 距离原点距离数组
        let disAllArr = []; // 总距离数组
        let startArr = []; // 起始位置数组
        
        let dist = 0;
        for (let i = 0, len = points.length; i < len; i++) {
            verticeArr.push(points[i].x, points[i].y, points[i].z);
            let lineColor = new THREE.Color(effectOptions.trailColor || this.options.lineStyle.color);
            colorArr.push(lineColor.r, lineColor.g, lineColor.b, effectOptions.trailOpacity != null ? effectOptions.trailOpacity : this.options.lineStyle.opacity);
            if (i > 0) {
                dist += points[i].distanceTo(points[i-1]);
            }
            distArr.push(dist);
        }
        let randomStart = Math.random() * (useConstantSpeed ? dist : period);
        for (let i = 0, len = points.length; i < len; i++) {
            disAllArr.push(dist);
            startArr.push(randomStart);
        }
        
        let geometry = new THREE.BufferGeometry();
        geometry.addAttribute('position', new THREE.BufferAttribute( new Float32Array(verticeArr), 3 ));
        geometry.addAttribute('colors', new THREE.BufferAttribute( new Float32Array(colorArr), 4 ));
        geometry.addAttribute('dist', new THREE.BufferAttribute( new Float32Array(distArr), 1 ));
        geometry.addAttribute('distAll', new THREE.BufferAttribute( new Float32Array(disAllArr), 1 ));
        geometry.addAttribute('start', new THREE.BufferAttribute( new Float32Array(startArr), 1 ));
        
        this.uniforms.trailLength.value = effectOptions.trailLength;

        let shaderMaterial = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: _shader_line__WEBPACK_IMPORTED_MODULE_3__["lineShader"].vertexShader,
            fragmentShader: _shader_line__WEBPACK_IMPORTED_MODULE_3__["lineShader"].fragmentShader
        });
        // 由于OpenGL Core Profile与大多数平台上WebGL渲染器的限制，无论如何设置该值，线宽始终为1。
        // shaderMaterial.linewidth = effectOptions.trailWidth;

        if (useConstantSpeed) {
            this.uniforms.speed.value = effectOptions.constantSpeed / 1000;
            shaderMaterial.defines = { CONSTANT_SPEED: effectOptions.constantSpeed };
        } else {
            this.uniforms.period.value = period;
        }
        
        let line = new THREE.Line(geometry, shaderMaterial);
        line.rotateX(-Math.PI/2);

        this._container.add(line);
    }
}

/***/ }),

/***/ "./js/layers/geojsonlayer.js":
/*!***********************************!*\
  !*** ./js/layers/geojsonlayer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GeoJSONLayer; });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "./js/layers/layer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./js/util.js");
/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../maphelper */ "./js/maphelper.js");



class GeoJSONLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(data, options) {
        super(data, options);
        const defaultOptions = {
            isExtrude: true, // 是否拉伸面
            depth: 16, // 拉伸厚度
            isAreaText: true, // 是否显示地区名称
            fillColor: '#ddd', // 地区面块的填充色
            // strokeColor: '#000', // 地区边缘线的颜色
            // strokeOpacity: 0.5, // 地区边缘线的透明度
            textColor: 'rgba(0, 0, 0, 0.8)', // 文字颜色
            lineMaterial: {
                color: 0x999999,
                linewidth: 1.5
            },
            areaMaterial: { // 面材质配置
                color: 0x00ff00,
                // opacity: 0.5,
                side: THREE.DoubleSide
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](defaultOptions, options);
    }
    onAdd(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onAdd.call(this, map); 
        this._initBoundsAndCenter();
        this._draw();
    }
    onRemove(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.onRemove.call(this, map);
    }
    getBounds() {
        return this._bounds;
    }
    getCenter() {
        return this._center;
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
            let mecatorPoint = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].wgs84ToMecator(lnglat);
            return mecatorPoint.map(p => p / this._map.options.SCALE_RATIO);
        });
    }
    _initBoundsAndCenter() {
        let bounds;
        let mapOptions = this._map.options;
        if (mapOptions.type === 'plane') {
            if (mapOptions.region === 'world') {
                bounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].getBounds('world', mapOptions.crs);
            } else if (mapOptions.region === 'china') {
                bounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].getBounds('china', mapOptions.crs);
            } else {
                bounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].getBounds(this._data, mapOptions.crs);
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
    _draw() {
        var geojson = this._data;

        var features = this.createFeatureArray(geojson);

        for (let i = 0, len = features.length; i < len; i++) {
            let feature = features[i];
            let geometry = feature.geometry;
            let props = feature.properties;
            if (geometry == null) continue;
            let center = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].getNormalizeCenter(feature);
            let name = props.name;
            if (center && name) {
                if (this._map.options.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857) {
                    center = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].wgs84ToMecator(center);
                    center = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].scalePoint(center, 1/this._map.options.SCALE_RATIO);
                }
                this.drawLabel(center, name);
            }
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
                    this.drawPolygon(convert_array);
                }

            } else if (geometry.type == 'MultiPolygon') {
                for (let polygon_num = 0; polygon_num < geometry.coordinates.length; polygon_num++) {
                    for (let segment_num = 0; segment_num < geometry.coordinates[polygon_num].length; segment_num++) {
                        let coordinate_array = this.createCoordinateArray(geometry.coordinates[polygon_num][segment_num]);
                        let convert_array = coordinate_array;
                        if (this._map.options.crs === _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857) {
                            convert_array = this.convertCoordinates(coordinate_array);
                        }
                        this.drawPolygon(convert_array);
                    }
                }
            } else {
                throw new Error('The geoJSON is not valid.');
            }
        }
    }
    getTextSprite(textStr, options) {
        var options = options || {}
        var fontWeight = options.fontWeight || 'normal'
        var fontFamily = options.fontFamily || 'Microsoft YaHei'
        var fontColor = options.fontColor || '#000'
        var textAlign = options.textAlign || 'center'

        var canvas = document.createElement("canvas");
        // webgl 规定 canvas 宽高为2的n次幂
        canvas.width = 256;
        canvas.height = 256;
        var ctx = canvas.getContext("2d");

        // ctx.fillStyle = renderer.domElement.style.backgroundColor;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw
        ctx.font = "16px " + fontWeight + " " + fontFamily;
        ctx.fillStyle = fontColor;
        ctx.textAlign = textAlign;
        var textWidth = ctx.measureText(textStr).width;
        ctx.fillText(textStr, canvas.width / 2, canvas.height / 2 + 5);
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent:true
        });
        var sprite = new THREE.Sprite(spriteMaterial);
        return sprite;
    }
    drawLabel(center, name) {
        var textSprite = this.getTextSprite(name, {
            fontColor: '#000'
        });

        textSprite.userData = {
            type: 'areaText'
        }
        
        // TODO 数字8为初始化全中国时最佳缩放比，其他区域根据距离比例调整
        var scaleX = 32, scaleY = 32
        textSprite.scale.set(scaleX, scaleY, 1);

        if (this.options.isExtrude) {
            textSprite.position.set(center[0], this.options.depth, -center[1])
        } else {
            textSprite.position.set(center[0], 0, -center[1])
        }
        textSprite.rotateX(-Math.PI/2);

        // 避免柱子遮挡地名
        textSprite.renderOrder = 99
        textSprite.material.depthTest=false

        this._container.add(textSprite);
    }
    drawOutLine(points, mesh) {
        // 画轮廓线
        // 因为面是画在xy平面的，然后通过旋转而来，为了保持一致，轮廓线也绘制在xy平面，这样变换就能与面同步
        let line_geom = new THREE.Geometry();
        for (let i = 0, len=points.length; i < len ; i++) {
            line_geom.vertices.push(new THREE.Vector3(points[i][0], points[i][1], 0));
        }
        let line_material = new THREE.LineBasicMaterial(this.options.lineMaterial);
        // line_material.transparent = false;
        // line_material.opacity = this.options.strokeOpacity;
        let line = new THREE.Line(line_geom, line_material);
        if (this.options.isExtrude) {
            line.translateZ(this.options.depth);
        }
        line.renderOrder = 98;
        mesh.add(line);
    }
    drawPolygon(points) {
        let shape = new THREE.Shape();
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
        mesh.userData = {
            type: 'area'
        };
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
        this.options = _util__WEBPACK_IMPORTED_MODULE_0__["extend"](defaultOptions, options);
        this._data = data;
        this._container = new THREE.Group();
    }
    getContainer() {
        return this._container;
    }
    getData() {
        return this._data;
    }
    onAdd(map) {
        this._map = map;
    }
    onRemove(map) {}
}

/***/ }),

/***/ "./js/layers/shader/line.js":
/*!**********************************!*\
  !*** ./js/layers/shader/line.js ***!
  \**********************************/
/*! exports provided: lineShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineShader", function() { return lineShader; });
const lineShader = {
   vertexShader: `
      attribute float dist;
      attribute float distAll;
      attribute float start;
      attribute vec4 colors;

      uniform float speed;
      uniform float trailLength;
      uniform float time;
      uniform float period;

      varying vec4 v_Color;
      varying float v_Percent;

      void main()	{
         vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
         gl_Position = projectionMatrix * mvPosition;
            
         #ifdef CONSTANT_SPEED
            float t = mod((speed * time + start) / distAll, 1. + trailLength) - trailLength;
         #else
            float t = mod((time + start) / period, 1. + trailLength) - trailLength;
         #endif
         
         float trailLen = distAll * trailLength;
         v_Percent = (dist - t * distAll) / trailLen;
         v_Color = colors;
      }`,
   fragmentShader: `            
      uniform vec4 baseColor;
      varying vec4 v_Color;
      varying float v_Percent;

      void main( void ) {
        if (v_Percent > 1.0 || v_Percent < 0.0) {
            discard;
        }
        gl_FragColor = baseColor * v_Color;
        gl_FragColor.a *= v_Percent;
      }`
}

/***/ }),

/***/ "./js/maphelper.js":
/*!*************************!*\
  !*** ./js/maphelper.js ***!
  \*************************/
/*! exports provided: CRS, mapHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CRS", function() { return CRS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapHelper", function() { return mapHelper; });
/* harmony import */ var _bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bounds */ "./js/bounds.js");


const R = 6378137; // 地球半径（米）
const R_MINOR = 6356752.314245179;
const BOUND = new _bounds__WEBPACK_IMPORTED_MODULE_0__["default"](-20037508.34279, -15496570.73972, 20037508.34279, 18764656.23138);

const CRS = {
    epsg4326: 'EPSG:4326',
    epsg3857: 'EPSG:3857'
}
const mapHelper = {
    // 经纬度转墨卡托
    wgs84ToMecator(lnglat) {
		var d = Math.PI / 180,
		    r = R,
		    y = lnglat[1] * d,
		    tmp = R_MINOR / r,
		    e = Math.sqrt(1 - tmp * tmp),
		    con = e * Math.sin(y);

		var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
		y = -r * Math.log(Math.max(ts, 1E-10));

		return [ lnglat[0] * d * r, y ];
    },
    // 墨卡托转经纬度
    mecatorToWgs84(point) {
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
    },
    // 根据geojson数据获取geo对象在墨卡托投影平面的范围
    getBounds(geojson, crs) {
        crs = crs || CRS.epsg4326;
        // 中国和世界范围写死，避免大量计算
        if (geojson === 'world') {
            let xmin = -180;
            let ymin = -85;
            let xmax = 180;
            let ymax = 85;
            let lb = [xmin, ymin];
            let rt = [xmax, ymax];
            if (crs === CRS.epsg3857) {
                lb = this.wgs84ToMecator(lb);
                rt = this.wgs84ToMecator(rt);
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
                lb = this.wgs84ToMecator(lb);
                rt = this.wgs84ToMecator(rt);
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
                lb = this.wgs84ToMecator(lb);
                rt = this.wgs84ToMecator(rt);
            }
            return new _bounds__WEBPACK_IMPORTED_MODULE_0__["default"](lb, rt);
        }
    },
    getNormalizeCenter(feature) {
        let props = feature.properties;
        let center = props && (props.center || props.cp);
        if (center && typeof center === 'string') {
            center = center.split(',');
        }
        if (Array.isArray(center)) {
            center = center.map(item => Number(item));
        }
        if (center == null) {
            let bounds = this.getBounds(feature);
            center = bounds.getCenter();
        }
        return center;
    },
    scalePoint(point, scale) {
        return point.map(p => p * scale);
    }
}

/***/ }),

/***/ "./js/threemap.js":
/*!************************!*\
  !*** ./js/threemap.js ***!
  \************************/
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
        var defaultOptions = {
            crs: _maphelper__WEBPACK_IMPORTED_MODULE_2__["CRS"].epsg3857, // 地图采用的地理坐标系 EPSG:4326: 经纬度，EPSG:3857: 墨卡托
            SCALE_RATIO: 100000, // 地球墨卡托平面缩放比例
            type: 'plane', // plane or sphere ,平面或球面
            region: 'china', // china or world, 中国或世界地图
            containerClassName: 'three-map-container', // 地图容器类名
            lightColor: 0xffffff, // 灯光颜色
            camera: {
                fov: 45,
                near: 0.1,
                far: 2000
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["extend"](defaultOptions, options);
    
        if (this.options.type === 'plane') {
            if (this.options.region === 'china') {
                this._fullBound = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].getBounds('china', this.options.crs);
            } else {
                this._fullBound = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].getBounds('world', this.options.crs);
            }
        }

        this._layers = {};
        
        this._initContainer(el);
        this._init3D();
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
    updateSize() {
        this._onContainerResize()
    }
    resetView() {
        this._orbitControl.reset()
    }
    setView(bounds) {
        if (this.options.type === 'plane') {
            if (this.options.region === 'world') {
                this._orbitControl.object.position.set(16.42515, 369.562538, 333.99466);
                this._orbitControl.target = new THREE.Vector3(10.06448, 51.62625, 6.71498);
            } else {
                let cameraOptions = this.options.camera;
                let a = (Math.PI / 180) * (cameraOptions.fov / 2);
                // let b = Math.max(bounds.getWidth(), bounds.getHeight()) / 2;
                let b = bounds.getHeight() / 2;
                let distance = b / Math.tan(a);
                let center = bounds.getCenter();
                this._orbitControl.object.position.set(0, 0, distance);
                this._orbitControl.object.translateX(center[0]);
                this._orbitControl.object.translateY(center[1]);
                this._orbitControl.target = new THREE.Vector3(center[0], center[1], 0);
            }
        } else {
            // sphere
        }
        this._orbitControl.update();
    }
    getContainerElement() {
        return this._el;
    }
    getContainerSize() {
        const compStyle = _util__WEBPACK_IMPORTED_MODULE_1__["getCmpStyle"](this._el);
        let width = parseInt(compStyle.width);
        let height = parseInt(compStyle.height);
        return { width, height };
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
        if (THREE === undefined) throw new Error('需先引入threejs库！');
        if (THREE.OrbitControls === undefined) throw new Error('需先引入 THREE.OrbitControls 组件！');

        let size = this.getContainerSize();

        // 初始化画布
        this._renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        this._renderer.setClearColor(0x000000, 0); // 背景透明 
        this._renderer.setSize(size.width, size.height);
        this._renderer.domElement.className = 'chart-canvas';
        this._el.appendChild(this._renderer.domElement);

        // 设置场景
        this._scene = new THREE.Scene();

        // 相机
        let cameraOptions = this.options.camera;
        this._camera = new THREE.PerspectiveCamera(cameraOptions.fov, size.width / size.height, cameraOptions.near, cameraOptions.far)

        // 控件
        this._orbitControl = new THREE.OrbitControls(this._camera, this._renderer.domElement)
        // this._orbitControl.minDistance = 30 // 距离相机的最小距离，仅用于透视相机
        // this._orbitControl.maxDistance = 200 // 距离相机的最大距离，仅用于透视相机
        // 在哪个平面内就相对于哪个平面的坐标轴
        this._orbitControl.maxPolarAngle = Math.PI / 2 // 最大翻转角度
        this._orbitControl.maxAzimuthAngle = Math.PI / 2
        this._orbitControl.minAzimuthAngle = -Math.PI / 2
        // OrbitControls加入后，托管了相机，所以必须通过它来改变相机参数
        // camera.lookAt()失效问题https://stackoverflow.com/questions/10325095/threejs-camera-lookat-has-no-effect-is-there-something-im-doing-wrong
        // this._orbitControl.object.position.set(0, 0, 100)
        // this._orbitControl.target = new THREE.Vector3(12245143.987260092, 0, -3482189.0854086173)
        this._orbitControl.saveState()
        this._orbitControl.update()

        // 灯光
        this._scene.add(new THREE.AmbientLight(this.options.lightColor, 0.6));
        this._light = new THREE.DirectionalLight(this.options.lightColor, 0.8);
        this._light2 = new THREE.DirectionalLight(this.options.lightColor, 0.1);
        this._light.position.set(-1, 1, 1);
        this._light2.position.set(1, 1, 1);
        this._scene.add(this._light);
        this._scene.add(this._light2);

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
        this._animateId = requestAnimationFrame(this._animate.bind(this))
        this._orbitControl.update()
        this._renderer.render(this._scene, this._camera)
    }
    _onContainerResize() {
        let size = this.getContainerSize();

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
        this.clearLayers()
        window.removeEventListener('resize', this._onContainerResize, false)
        this._renderer.domElement.removeEventListener('mousemove', this._mousemoveEvtHandler, false)
        cancelAnimationFrame(this._animateId)
        if (this._container && this._container.hasChildNodes(this._el)) {
            this._container.removeChild(this._el)
            this._el = null
        }
    }
}

/***/ }),

/***/ "./js/util.js":
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! exports provided: hasClass, addClass, removeClass, getCmpStyle, isFunction, isPlainObject, extend, stamp, inherit, isNullOrUdf, getRandomColor, isWebGLAvailable, lightenDarkenColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCmpStyle", function() { return getCmpStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stamp", function() { return stamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inherit", function() { return inherit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNullOrUdf", function() { return isNullOrUdf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomColor", function() { return getRandomColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWebGLAvailable", function() { return isWebGLAvailable; });
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
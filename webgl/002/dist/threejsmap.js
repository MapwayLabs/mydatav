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
/*! exports provided: Bounds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bounds", function() { return Bounds; });
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
/*! exports provided: EventEmiter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventEmiter", function() { return EventEmiter; });
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
/*! exports provided: Util, ThreeMap, mapHelper, GeoJSONLayer, FlyLineLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./js/util.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return _util__WEBPACK_IMPORTED_MODULE_0__["Util"]; });

/* harmony import */ var _threemap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./threemap */ "./js/threemap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThreeMap", function() { return _threemap__WEBPACK_IMPORTED_MODULE_1__["ThreeMap"]; });

/* harmony import */ var _layers_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layers/index */ "./js/layers/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GeoJSONLayer", function() { return _layers_index__WEBPACK_IMPORTED_MODULE_2__["GeoJSONLayer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FlyLineLayer", function() { return _layers_index__WEBPACK_IMPORTED_MODULE_2__["FlyLineLayer"]; });

/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./maphelper */ "./js/maphelper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapHelper", function() { return _maphelper__WEBPACK_IMPORTED_MODULE_3__["mapHelper"]; });






/***/ }),

/***/ "./js/layers/flylinelayer.js":
/*!***********************************!*\
  !*** ./js/layers/flylinelayer.js ***!
  \***********************************/
/*! exports provided: FlyLineLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlyLineLayer", function() { return FlyLineLayer; });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "./js/layers/layer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./js/util.js");
/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../maphelper */ "./js/maphelper.js");
/* harmony import */ var _shader_line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shader/line */ "./js/layers/shader/line.js");




class FlyLineLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["Layer"] {
    constructor(data, options) {
        super(data, options);
        const defaultOptions = {
            geojsonLayer: null,
            lineStyle: { // 飞线样式
                color: 0x00ff00,
                lineWidth: 2
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["Util"].extend(defaultOptions, options);

        this.uniforms = {
            time: {
                type: "f",
                value: 1.0
            }
        };
        this.animate();
    }
    onAdd(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["Layer"].prototype.onAdd.call(this, map); 
        this._draw();
    }
    onRemove(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["Layer"].prototype.onRemove.call(this, map);
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.uniforms.time.value += 0.01;
    }
    _draw() {
        this._data.forEach(item => {
            let f = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].wgs84ToMecator(item.from.split(','));
            let t = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].wgs84ToMecator(item.to.split(','));
            let scale = this._map.options.SCALE_RATIO;
            item.from = f.map(point => point / scale);
            item.to = t.map(point => point / scale);
            this._drawFlyLine(item.from, item.to, 2 / scale);
        });
    }
    _drawFlyLine(startPoint, endPoint, heightLimit) {
        let middleX = ( startPoint[0] + endPoint[0] ) / 2;
        let middleY = ( startPoint[1] + endPoint[1] ) / 2 + heightLimit;
        let middleZ = 0;
        let startVector = new THREE.Vector3(startPoint[0], startPoint[1], 0);
        let middleVector = new THREE.Vector3(middleX, middleY, middleZ);
        let endVector = new THREE.Vector3(endPoint[0], endPoint[1], 0);

        let curve = new THREE.CatmullRomCurve3([startVector, middleVector, endVector]);

        let geometry = new THREE.TubeGeometry(curve, 100, 0.1, 4, false);

        let shaderMaterial = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: _shader_line__WEBPACK_IMPORTED_MODULE_3__["lineShader"].vertexShader,
            fragmentShader: _shader_line__WEBPACK_IMPORTED_MODULE_3__["lineShader"].fragmentShader,
            transparent: true,
            alphaTest: 0.8
        });

        let line = new THREE.Mesh(geometry, shaderMaterial);

        this._container.add(line);
    }
}

/***/ }),

/***/ "./js/layers/geojsonlayer.js":
/*!***********************************!*\
  !*** ./js/layers/geojsonlayer.js ***!
  \***********************************/
/*! exports provided: GeoJSONLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeoJSONLayer", function() { return GeoJSONLayer; });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "./js/layers/layer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./js/util.js");
/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../maphelper */ "./js/maphelper.js");



class GeoJSONLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["Layer"] {
    constructor(data, options) {
        super(data, options);
        const defaultOptions = {
            isExtrude: true, // 是否拉伸面
            depth: 0.6, // 拉伸厚度
            isAreaText: true, // 是否显示地区名称
            fillColor: '#ddd', // 地区面块的填充色
            // strokeColor: '#000', // 地区边缘线的颜色
            // strokeOpacity: 0.5, // 地区边缘线的透明度
            textColor: 'rgba(0, 0, 0, 0.8)', // 文字颜色
            lineMaterial: {
                color: 0x0000ff,
                linewidth: 1.5
            },
            areaMaterial: { // 面材质配置
                color: 0x00ff00,
                // opacity: 0.5,
                side: THREE.DoubleSide
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["Util"].extend(defaultOptions, options);
    }
    onAdd(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["Layer"].prototype.onAdd.call(this, map); 
        this._initBoundsAndCenter();
        this._draw();
    }
    onRemove(map) {
        _layer__WEBPACK_IMPORTED_MODULE_0__["Layer"].prototype.onRemove.call(this, map);
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
        let mecatorBounds;
        let mapOptions = this._map.options;
        if (mapOptions.type === 'plane') {
            if (mapOptions.region === 'world') {
                mecatorBounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].getBounds('world');
            } else if (mapOptions.region === 'china') {
                mecatorBounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].getBounds('china');
            } else {
                mecatorBounds = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].getBounds(this._data);
            }
        } else {
            // sphere
        }
        if (mecatorBounds) {
            let scale = mapOptions.SCALE_RATIO;
            this._bounds = mecatorBounds.scale(1/scale);
            this._center = this._bounds.getCenter();
        }
    }
    _draw() {
        var geojson = this._data;

        var features = this.createFeatureArray(geojson);

        for (let i = 0, len = features.length; i < len; i++) {
            let feature = features[i];
            let geometry = feature.geometry;
            if (geometry == null) continue;
            if (geometry.type == 'Point') {

            } else if (geometry.type == 'MultiPoint') {

            } else if (geometry.type == 'LineString') {

            } else if (geometry.type == 'MultiLineString') {

            } else if (geometry.type == 'Polygon') {
                for (let segment_num = 0; segment_num < geometry.coordinates.length; segment_num++) {
                    let coordinate_array = this.createCoordinateArray(geometry.coordinates[segment_num]);
                    let convert_array = this.convertCoordinates(coordinate_array);
                    this.drawPolygon(convert_array);
                }

            } else if (geometry.type == 'MultiPolygon') {
                for (let polygon_num = 0; polygon_num < geometry.coordinates.length; polygon_num++) {
                    for (let segment_num = 0; segment_num < geometry.coordinates[polygon_num].length; segment_num++) {
                        let coordinate_array = this.createCoordinateArray(geometry.coordinates[polygon_num][segment_num]);
                        let convert_array = this.convertCoordinates(coordinate_array);
                        this.drawPolygon(convert_array);
                    }
                }
            } else {
                throw new Error('The geoJSON is not valid.');
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
        // mesh.rotateX(-Math.PI/2);
        mesh.userData = {
            type: 'area'
        };
        this._container.add(mesh);
    }
}

/***/ }),

/***/ "./js/layers/index.js":
/*!****************************!*\
  !*** ./js/layers/index.js ***!
  \****************************/
/*! exports provided: GeoJSONLayer, FlyLineLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _geojsonlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geojsonlayer */ "./js/layers/geojsonlayer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GeoJSONLayer", function() { return _geojsonlayer__WEBPACK_IMPORTED_MODULE_0__["GeoJSONLayer"]; });

/* harmony import */ var _flylinelayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flylinelayer */ "./js/layers/flylinelayer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FlyLineLayer", function() { return _flylinelayer__WEBPACK_IMPORTED_MODULE_1__["FlyLineLayer"]; });




/***/ }),

/***/ "./js/layers/layer.js":
/*!****************************!*\
  !*** ./js/layers/layer.js ***!
  \****************************/
/*! exports provided: Layer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return Layer; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./js/util.js");
/* harmony import */ var _eventemiter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../eventemiter */ "./js/eventemiter.js");


class Layer extends _eventemiter__WEBPACK_IMPORTED_MODULE_1__["EventEmiter"] {
    constructor(data, options) {
        super();
        var defaultOptions = {};
        this.options = _util__WEBPACK_IMPORTED_MODULE_0__["Util"].extend(defaultOptions, options);
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
    vertexShader: 
    `varying vec2 vUv;
     void main()	{
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;

     }`,
    fragmentShader: 
    `uniform float time;
     varying vec2 vUv;
     void main( void ) {
        vec3 color =  vec3(1.0,0,0.0);
        gl_FragColor = vec4(color,sin(4.5*(vUv.x*2.0 + (time*1.0))));
      }`
}

/***/ }),

/***/ "./js/maphelper.js":
/*!*************************!*\
  !*** ./js/maphelper.js ***!
  \*************************/
/*! exports provided: mapHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapHelper", function() { return mapHelper; });
/* harmony import */ var _bounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bounds */ "./js/bounds.js");


const R = 6378137; // 地球半径（米）
const R_MINOR = 6356752.314245179;
const BOUND = new _bounds__WEBPACK_IMPORTED_MODULE_0__["Bounds"](-20037508.34279, -15496570.73972, 20037508.34279, 18764656.23138);

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
    getBounds(geojson) {
        // 中国和世界范围写死，避免大量计算
        if (geojson === 'world') {
            let xmin = -20037508.342789244;
            let xmax = 20037508.342789244;
            let ymin = -8037175.40001875;
            let ymax = 18362426.510304134;
            return new _bounds__WEBPACK_IMPORTED_MODULE_0__["Bounds"](xmin, ymin, xmax, ymax);
        } else if (geojson === 'china') {
            let xmin = 73.4766;
            let xmax = 135.0879;
            let ymin = 18.1055;
            let ymax = 53.5693;
            let lb = this.wgs84ToMecator([xmin, ymin]);
            let rt = this.wgs84ToMecator([xmax, ymax]);
            return new _bounds__WEBPACK_IMPORTED_MODULE_0__["Bounds"](lb, rt);
        } else {
            let bound = {
                xmin: BOUND.xmax,
                xmax: BOUND.xmin,
                ymin: BOUND.ymax,
                ymax: BOUND.ymin
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
                        let coord = this.wgs84ToMecator(coords[k]);
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
            return new _bounds__WEBPACK_IMPORTED_MODULE_0__["Bounds"](bound.xmin, bound.ymin, bound.xmax, bound.ymax);
        }
    }
}

/***/ }),

/***/ "./js/threemap.js":
/*!************************!*\
  !*** ./js/threemap.js ***!
  \************************/
/*! exports provided: ThreeMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeMap", function() { return ThreeMap; });
/* harmony import */ var _eventemiter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventemiter */ "./js/eventemiter.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./js/util.js");
/* harmony import */ var _maphelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maphelper */ "./js/maphelper.js");



class ThreeMap extends _eventemiter__WEBPACK_IMPORTED_MODULE_0__["EventEmiter"] {
    constructor(el, options) {
        super();
        var defaultOptions = {
            containerClassName: 'three-map-container', // 地图容器类名
            lightColor: 0xffffff, // 灯光颜色
            type: 'plane', // plane or sphere ,平面或球面
            region: 'china', // china or world, 中国或世界地图
            SCALE_RATIO: 100000, // 地球墨卡托平面缩放比例
            camera: {
                fov: 45,
                near: 0.1,
                far: 2000
            }
        };
        this.options = _util__WEBPACK_IMPORTED_MODULE_1__["Util"].extend(defaultOptions, options);
    
        if (this.options.type === 'plane') {
            if (this.options.region === 'china') {
                this._fullBound = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].getBounds('china');
            } else {
                this._fullBound = _maphelper__WEBPACK_IMPORTED_MODULE_2__["mapHelper"].getBounds('world');
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
        var id = _util__WEBPACK_IMPORTED_MODULE_1__["Util"].stamp(layer);
        if (this._layers[id]) {
            return this;
        }

        this._layers[id] = layer;
        this._scene.add(layer.getContainer());

        layer.onAdd(this);

        return this;
    }
    removeLayer(layer) {
        var id = _util__WEBPACK_IMPORTED_MODULE_1__["Util"].stamp(layer);
        if (!this._layers[id]) {
            return this;
        }

        delete this._layers[id];
        this._scene.remove(layer.getContainer());

        layer.onRemove(this);

        return this;
    }
    hasLayer(layer) {
        return !!layer && (_util__WEBPACK_IMPORTED_MODULE_1__["Util"].stamp(layer) in this._layers);
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
        } else {
            // sphere
        }
        this._orbitControl.update();
    }
    getContainerElement() {
        return this._el;
    }
    getContainerSize() {
        const compStyle = _util__WEBPACK_IMPORTED_MODULE_1__["Util"].getCmpStyle(this._el);
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
        _util__WEBPACK_IMPORTED_MODULE_1__["Util"].addClass(this._el, this.options.containerClassName);

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
        // this._scene.add(new THREE.AmbientLight(this.options.lightColor, 0.6));
        // this._light = new THREE.DirectionalLight(this.options.lightColor, 0.8);
        // this._light2 = new THREE.DirectionalLight(this.options.lightColor, 0.1);
        // this._light.position.set(-1, 1, 1);
        // this._light2.position.set(1, 1, 1);
        // this._scene.add(this._light);
        // this._scene.add(this._light2);

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
/*! exports provided: Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return Util; });
const Util = {
    hasClass: function (el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className)
    },
    addClass: function (el, className) {
        if (el.classList !== undefined) {
            var list = className.split(' ')
            for (var i = 0, len = list.length; i < len; i++) {
                el.classList.add(list[i])
            }
        } else if (!this.hasClass(el, className)) {
            el.className = (el.className ? el.className + ' ' : '') + className
        }
    },
    removeClass: function (el, className) {
        if (el.classList !== undefined) {
            el.classList.remove(className)
        } else {
            el.className = ' ' + el.className + ' '
            el.className = el.className.replace(' ' + className + ' ', ' ')
        }
    },
    getCmpStyle: function (el) {
        // FIXEME 兼容性写法
        return getComputedStyle(el) 
    },
    extend: function (srcObj) {
        var i, j, len, src
        for (j = 1, len = arguments.length; j < len; j++) {
            src = arguments[j]
            for (var i in src) {
                srcObj[i] = src[i]
            }
        }
        return srcObj
    },
    stamp: function (obj) {
        if (!this.lastId) this.lastId = 0
        obj.__objstampid__ = obj.__objstampid__ || ++this.lastId
        return obj.__objstampid__
    },
    inherit: function (parentClass, childClass) {
        var tempClass = function () {}
        tempClass.prototype = parentClass.prototype
        childClass.prototype = new tempClass()
        childClass.prototype.constructor = childClass
    },
    isNullOrUdf: function (val) {
        return val === undefined || val === null
    },
    getRandomColor: function () {
        return '#' + (function getColor(color) {
            return (color += '0123456789abcdef' [Math.floor(Math.random() * 16)]) &&
                (color.length == 6) ? color : getColor(color);
        })('');
    },
    isWebGLAvailable: function () {
        try {
            var canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    },
    // 获取一个颜色的高亮或更暗色 https://css-tricks.com/snippets/javascript/lighten-darken-color/
    lightenDarkenColor: function (col, amt) {

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
}

/***/ })

/******/ });
});
//# sourceMappingURL=threejsmap.js.map
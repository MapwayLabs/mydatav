import Layer from './layer';
import * as Util from '../util';
import * as mapHelper from '../maphelper';
import TextLayer from './text-layer';
import ToolTip from '../tooltip';
import {MeshLine, MeshLineMaterial} from './custom-meshline';
// geojson 地图
export default class GeoJSONLayer extends Layer {
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
                    offsetY: 0
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
                    offsetY: 0
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
            tooltip: {
                show: true
            },
            outline: {
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
        this.options = Util.extend(true, defaultOptions, options);

        this._initFeatures();
    }
    onAdd(map) {
        Layer.prototype.onAdd.call(this, map); 
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
            this._tooltip = new ToolTip(this._map.getContainerElement());
        }
    }
    onRemove(map) {
        Layer.prototype.onRemove.call(this, map);
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
            let mecatorPoint = mapHelper.wgs84ToMecator(lnglat);
            return mecatorPoint.map(p => p / this._map.options.SCALE_RATIO);
        });
    }
    _initBoundsAndCenter() {
        let bounds;
        let mapOptions = this._map.options;
        if (mapOptions.type === 'plane') {
            if (mapOptions.region === 'world') {
                bounds = mapHelper.getBounds('world', mapOptions.crs);
            } else if (mapOptions.region === 'china') {
                bounds = mapHelper.getBounds('china', mapOptions.crs);
            } else {
                bounds = mapHelper.getBounds(this._data, mapOptions.crs);
            }
        } else {
            // sphere
        }
        if (bounds) {
            if (mapOptions.crs === mapHelper.CRS.epsg4326) {
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
                name: mapHelper.getNormalizeName(feature)
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
                    if (this._map.options.crs === mapHelper.CRS.epsg3857) {
                        convert_array = this.convertCoordinates(coordinate_array);
                    }
                    this.drawPolygon(convert_array, userData, featureGroup);
                }

            } else if (geometry.type == 'MultiPolygon') {
                for (let polygon_num = 0; polygon_num < geometry.coordinates.length; polygon_num++) {
                    for (let segment_num = 0; segment_num < geometry.coordinates[polygon_num].length; segment_num++) {
                        let coordinate_array = this.createCoordinateArray(geometry.coordinates[polygon_num][segment_num]);
                        let convert_array = coordinate_array;
                        if (this._map.options.crs === mapHelper.CRS.epsg3857) {
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
            let name = mapHelper.getNormalizeName(f);
            let center = mapHelper.getNormalizeCenter(f, forceBoundsCenter);
            if (center == null || !Array.isArray(center)) {
                continue; // geometry 为null时得不到center
            }
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
                this._textLayer = new TextLayer(textData, textOptions);
                this._map.addLayer(this._textLayer);
            }
        }
        if (this.options.areaText.show) {
            if (this._nulltextLayer) {
                this._nulltextLayer.update(nullTextData);
            } else {
                this._nulltextLayer = new TextLayer(nullTextData, nullTextOptions);
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
    drawOutLine2(points, mesh, isZoffset = false) {
        const size = this._map.getContainerSize();

        points = points.map(pt => new THREE.Vector3(pt[0], pt[1], 0));

        const geometry = new THREE.Geometry().setFromPoints( points );
        
        const line = new MeshLine();
        line.setGeometry(geometry);

        const resolution = new THREE.Vector2(size.width, size.height);
        const outlineOptions = this.options.outline;
        let color = isZoffset ? outlineOptions.top.color : outlineOptions.bottom.color;
        const lineColor = new THREE.Color(color);
        const opacity = isZoffset ? outlineOptions.top.opacity : outlineOptions.bottom.opacity;
        const linewidth = isZoffset ? outlineOptions.top.width : outlineOptions.bottom.width;
        const shaderMaterial = new MeshLineMaterial({
            resolution: resolution,
            color: lineColor,
            opacity: opacity,
            sizeAttenuation: false,
            lineWidth: linewidth
        });

        const lineMesh = new THREE.Mesh(line.geometry, shaderMaterial);
        if (this.options.isExtrude && isZoffset) {
            lineMesh.translateZ(this.options.depth);
        }
        lineMesh.renderOrder = 99;
        mesh.add(lineMesh);
    }
    drawPolygon(points, userData, container) {
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
        if (this.options.outline.top.show) {
            this.drawOutLine2(points, mesh, true);
        }
        if (this.options.outline.bottom.show) {
            this.drawOutLine2(points, mesh, false);
        }
        mesh.rotateX(-Math.PI/2);
        mesh.userData = Util.extend({type: 'area'}, userData);
        container.add(mesh);
    }
}
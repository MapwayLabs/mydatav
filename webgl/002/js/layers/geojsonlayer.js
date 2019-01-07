import Layer from './layer';
import * as Util from '../util';
import { mapHelper, CRS } from '../maphelper';
export default class GeoJSONLayer extends Layer {
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
        this.options = Util.extend(true, defaultOptions, options);
    }
    onAdd(map) {
        Layer.prototype.onAdd.call(this, map); 
        this._initBoundsAndCenter();
        this._draw();
    }
    onRemove(map) {
        Layer.prototype.onRemove.call(this, map);
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
            if (mapOptions.crs === CRS.epsg4326) {
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
        this._features = features;

        for (let i = 0, len = features.length; i < len; i++) {
            let feature = features[i];
            let geometry = feature.geometry;
            let props = feature.properties;
            if (geometry == null) continue;
            let center = mapHelper.getNormalizeCenter(feature);
            let name = props.name;
            if (center && name) {
                if (this._map.options.crs === CRS.epsg3857) {
                    center = mapHelper.wgs84ToMecator(center);
                    center = mapHelper.scalePoint(center, 1/this._map.options.SCALE_RATIO);
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
                    if (this._map.options.crs === CRS.epsg3857) {
                        convert_array = this.convertCoordinates(coordinate_array);
                    }
                    this.drawPolygon(convert_array);
                }

            } else if (geometry.type == 'MultiPolygon') {
                for (let polygon_num = 0; polygon_num < geometry.coordinates.length; polygon_num++) {
                    for (let segment_num = 0; segment_num < geometry.coordinates[polygon_num].length; segment_num++) {
                        let coordinate_array = this.createCoordinateArray(geometry.coordinates[polygon_num][segment_num]);
                        let convert_array = coordinate_array;
                        if (this._map.options.crs === CRS.epsg3857) {
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
        var options = options || {};
        var fontWeight = options.fontWeight || 'normal';
        var fontFamily = options.fontFamily || 'Microsoft YaHei';
        var fontColor = options.fontColor || '#000';
        var textAlign = options.textAlign || 'center';
        var textBaseline = options.textBaseline || 'middle';

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
        ctx.textBaseline = textBaseline;
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
        const textSprite = this.getTextSprite(name, {
            fontColor: '#000'
        });

        textSprite.userData = {
            type: 'areaText'
        }
        
        // TODO 数字8为初始化全中国时最佳缩放比，其他区域根据距离比例调整
        let scaleX = 32, scaleY = 32;
        textSprite.scale.set(scaleX, scaleY, 1);

        if (this.options.isExtrude) {
            textSprite.position.set(center[0], this.options.depth, -center[1]);
        } else {
            textSprite.position.set(center[0], 0, -center[1]);
        }
        textSprite.rotateX(-Math.PI/2);

        // 避免柱子遮挡地名
        textSprite.renderOrder = 99;
        textSprite.material.depthTest=false;

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
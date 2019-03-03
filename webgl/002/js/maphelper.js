import Bounds from './bounds';

const R = 6378137; // 地球半径（米）
const R_MINOR = 6356752.314245179;
const BOUND = new Bounds(-20037508.34279, -15496570.73972, 20037508.34279, 18764656.23138);

export const CRS = {
    epsg4326: 'EPSG:4326',
    epsg3857: 'EPSG:3857'
}

// 经纬度转墨卡托
export function wgs84ToMecator(lnglat) {
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
export function mecatorToWgs84(point) {
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
export function getBounds(geojson, crs) {
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
        return new Bounds(lb, rt);
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
        return new Bounds(lb, rt);
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
        return new Bounds(lb, rt);
    }
}

export function getNormalizeCenter(feature, forceBoundsCenter = false) {
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
export function getCentroid(feature) {
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
export function worldToScreen(xyzPoint, map, obj) {
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
export function screenToWorld(screenPoint, map) {
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
export function isPOICollision(sprite1, sprite2) {
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

export function getNormalizeName(feature) {
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

export function scalePoint(point, scale) {
    return point.map(p => p * scale);
}
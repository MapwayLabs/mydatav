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

    return [ lnglat[0] * d * r, y ];
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

    return [ point[0] * d / r, phi * d ];
}

// 根据geojson数据获取geo对象在墨卡托投影平面的范围
export function getBounds(geojson, crs) {
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

export function getNormalizeCenter(feature) {
    let props = feature.properties;
    let center = props && (props.center || props.cp);
    if (center && typeof center === 'string') {
        center = center.split(',');
    }
    if (Array.isArray(center)) {
        center = center.map(item => Number(item));
    }
    if (center == null) {
        let bounds = getBounds(feature);
        center = bounds.getCenter();
    }
    return center;
}

export function getNormalizeName(feature) {
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

export function scalePoint(point, scale) {
    return point.map(p => p * scale);
}

import Layer from './layer';
import * as Util from '../util';
import { mapHelper } from '../maphelper';

export default class BarLayer extends Layer {
    constructor (data, geojsonLayer, options) {
        super(data, options);

        const defaultOptions = {
            barStyle: {
                width: 1, // 底边长
                minHeight: 3, // 最小高度
                maxHeight: 12, // 最大高度
                bevelThickness: 0.1,
                bevelSize: 0.08,
                defaultColor: ['#f00'],
                grandientColor: null,
                enumColor: null
            },
            barText: {
                show: true,
                fontSize: 12,
                fontFamily: 'Microsoft YaHei',
                fontColor: '#000'
            },
            barTooltip: {
                show: true
            }
        };
        this.options = Util.extend(true, defaultOptions, options);

        this.geojsonLayer = geojsonLayer;

        this._barData = {
            data: null,
            vals: null,
            min: null,
            max: null
        };

        this._initBarData();
        this._initMinMax();
    }
    onAdd(map) {
        Layer.prototype.onAdd.call(this, map); 
        this._draw();
    }
    onRemove(map) {
        Layer.prototype.onRemove.call(this, map);
    }
    isMatch(featureIdVal, feature) {
        if (featureIdVal == null || feature == null || Util.isEmptyObject(feature)) {
            return false;
        }
        featureIdVal = String(featureIdVal);
        if (featureIdVal === String(feature.id)) {
            return true;
        }
        let props = feature.properties;
        if (props == null || Util.isEmptyObject(props)) {
            return false;
        }
        if ( featureIdVal === String(props.id) || new RegExp(props.name).test(featureIdVal)) {
            return true;
        }
        return false;
    }
    _initBarData() {
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
                if (ismatch) {
                    let tempobj = {
                        id: props.id || f.id,
                        name: props.name,
                        center: mapHelper.getNormalizeCenter(f),
                        value: Number(y.data[i])
                    };
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
        let barHeight = Util.normalizeValue(item.value, xmin, xmax, ymin, ymax);
        return barHeight;
    }
    getBarColor(item, index) {
        const barStyle = this.options.barStyle;
        let color = "#fff";
        let cLen = barStyle.defaultColor.length;
        if (barStyle.grandientColor) {
            let xmin = this._barData.min;
            let xmax = this._barData.max;
            let ymin = 1;
            let ymax = 256;
            let num = Util.normalizeValue(item.value, xmin, xmax, ymin, ymax);
            color = Util.getInterPolateColor(num, barStyle.grandientColor);
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
    _draw() {
        if (this._barData.data == null || !this._barData.data.length) {return;}
        this._barData.data.forEach((item, index) => {
            let barHeight = this.getBarHeight(item);
            let barColor = this.getBarColor(item, index);
            let yoffset = this.geojsonLayer.getDepth();
            let projCenter = this._map.convertCoord(item.center);
            let bar = this._createBar(projCenter, barHeight, barColor, yoffset);
            bar.userData = item;
            this._container.add(bar);
            // this._drawBarText(item);
        });
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
          bevelSegments: 100
        };
        const geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        const material = new THREE.MeshPhongMaterial({ color: color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(center[0], yoffset, -center[1]);
        mesh.rotateX(-Math.PI / 2);
        return mesh;
    }
    _drawBarText(item) {}
}
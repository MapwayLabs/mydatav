import Layer from './layer';
import * as Util from '../util';
import * as mapHelper from '../maphelper';
import TextLayer from './text-layer';

// 柱状图层
export default class BarLayer extends Layer {
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
        this.options = Util.extend(true, defaultOptions, options);
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
        Layer.prototype.onAdd.call(this, map); 
        this._draw();
    }
    onRemove(map) {
        Layer.prototype.onRemove.call(this, map);
        this._textLayer && this._map.removeLayer(this._textLayer);
        if (this.options.barTooltip.show) {
            this._toolTipHelper && this._toolTipHelper.hideTooltip();
            this._map.off('mousemove', this._mousemoveEvtHandler, this);
        }
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
                let ismatch = this.isMatch(x.data[i], f);
                // 如果匹配到底图
                if (ismatch) {
                    // 如果有位置数据，使用位置数据
                    let center;
                    if (x.location_data && x.location_data.length) {
                        center = [x.location_data[i].longitude, x.location_data[i].latitude];
                    } else {
                        center = mapHelper.getNormalizeCenter(f);
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
        let barHeight = Util.normalizeValue(item.value, xmin, xmax, ymin, ymax, 0);
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
            let num = Util.normalizeValue(this._colorsData.data[index], xmin, xmax, ymin, ymax, 1);
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
            bar.userData = Util.extend(true, {type: 'bar'}, item);
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
        this._textLayer = new TextLayer(textData, options);
        this._map.addLayer(this._textLayer);
    }
}
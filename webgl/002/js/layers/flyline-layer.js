import Layer from './layer';
import * as Util from '../util';
// import { lineShader } from './shader/line';
import {MeshLine, MeshLineMaterial} from './custom-meshline';
import PointLayer from './point-layer';

// 飞线图层
export default class FlyLineLayer extends Layer {
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
        this.options = Util.extend(true, defaultOptions, options);

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
        Layer.prototype.onAdd.call(this, map); 
        this._draw();
        this._drawPoints();
    }
    onRemove(map) {
        Layer.prototype.onRemove.call(this, map);
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
        this._pointLayer = new PointLayer(this._pointsData, pointOptions);
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
        
        const line = new MeshLine();
        line.setGeometry(geometry);

        const resolution = new THREE.Vector2(size.width, size.height);
        const lineColor = new THREE.Color(this.options.lineStyle.color);
        const opacity = this.options.lineStyle.opacity;
        const shaderMaterial = new MeshLineMaterial({
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
        
        const line = new MeshLine();
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
        const shaderMaterial = new MeshLineMaterial({
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
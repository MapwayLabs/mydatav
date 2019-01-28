import Layer from './layer';
import * as Util from '../util';
// import { lineShader } from './shader/line';
import {MeshLine, MeshLineMaterial} from './custom-meshline';
import PointLayer from './point-layer';

// 飞线图层
export default class FlyLineLayer extends Layer {
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
        this._data.forEach(item => {
            let h = this.options.heightLimit;
            let f = item.from.location.split(',').map(p => Number(p));
            let fname = item.from.data;
            let t = item.to.location.split(',').map(p => Number(p));
            let tname = item.to.data;
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
            // 处理飞线点
            if (this.options.pointStyle.show) {
                if(this._map.options.type === 'sphere') {
                    const size = this.options.pointStyle.size;
                    f.push(size/2);
                    t.push(size/2);
                    // let of = this._map.projectLngLat(f);
                    // let ot = this._map.projectLngLat(t); 
                    // this._drawPoints([of, ot]);
                    let tempPt1 = {
                        points: [f],
                        info: { name: fname}
                    };
                    let tempPt2 = {
                        points: [t],
                        info: { name: tname }
                    };
                    // this._pointsData.push(tempPt1, tempPt2);
                    this._addPoints(tempPt1, tempPt2);
                } else {
                    let depth = this.geojsonLayer.getDepth();
                    // this._drawPoints2([nf, nt]);
                    let pt1 = f.slice(0, 2);
                    pt1.push(depth);
                    let pt2 = t.slice(0, 2);
                    pt2.push(depth);
                    let tempPt1 = {
                        points: [pt1],
                        info: { name: fname}
                    };
                    let tempPt2 = {
                        points: [pt2],
                        info: { name: tname }
                    };
                    // this._pointsData.push(tempPt1, tempPt2);
                    this._addPoints(tempPt1, tempPt2);
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
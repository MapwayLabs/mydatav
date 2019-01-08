import Layer from './layer';
import * as Util from '../util';
import { mapHelper, CRS } from '../maphelper';
import { lineShader } from './shader/line';
export default class FlyLineLayer extends Layer {
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
                trailWidth: 4, // 尾迹宽度(暂时不可用)
                trailLength: 0.1, // 尾迹长度，范围 0-1，为线条长度百分比
                trailColor: null, // 尾迹颜色，默认跟线颜色相同
                trailOpacity: null // 尾迹不透明度，默认跟线相同
            }
        };
        this.options = Util.extend(true, defaultOptions, options);

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
        Layer.prototype.onAdd.call(this, map); 
        this._draw();
    }
    onRemove(map) {
        Layer.prototype.onRemove.call(this, map);
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
            if (this._map.options.crs === CRS.epsg3857) {
                let scale = this._map.options.SCALE_RATIO;
                f = mapHelper.wgs84ToMecator(f);
                t = mapHelper.wgs84ToMecator(t);
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
                // 分段数大于所有点数时，不分段
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
            vertexShader: lineShader.vertexShader,
            fragmentShader: lineShader.fragmentShader
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
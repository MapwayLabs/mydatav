import Layer from './layer';
import * as Util from '../util';
import { mapHelper, CRS } from '../maphelper';
import { lineShader } from './shader/line';
export default class FlyLineLayer extends Layer {
    constructor(data, options) {
        super(data, options);
        const defaultOptions = {
            geojsonLayer: null,
            lineColor: 0x0000ff,
            lineOpacity: 1.0,
            // lineStyle: { // 飞线样式
            //     color: 0x00ff00,
            //     lineWidth: 2
            // }
        };
        this.options = Util.extend(defaultOptions, options);

        this.uniforms = {
            baseColor: {value: [1.0, 1.0, 1.0, 1.0]},
            time: {value: 0},
            speed: {value: 0},
            period: {value: 1500},
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
            this._drawFlyLine(f, t, h);
        });
    }
    _drawFlyLine(startPoint, endPoint, heightLimit) {
        let geojsonLayer = this.options.geojsonLayer;
        let depth = 0;
        if (geojsonLayer && geojsonLayer.options.isExtrude) {
            depth = geojsonLayer.options.depth
        }
        let middleX = ( startPoint[0] + endPoint[0] ) / 2;
        let middleY = ( startPoint[1] + endPoint[1] ) / 2;
        let middleZ = 0 + depth + heightLimit;
        let startVector = new THREE.Vector3(startPoint[0], startPoint[1], 0 + depth);
        let middleVector = new THREE.Vector3(middleX, middleY, middleZ);
        let endVector = new THREE.Vector3(endPoint[0], endPoint[1], 0 + depth);

        let curve = new THREE.CatmullRomCurve3([startVector, middleVector, endVector]);

        const points = curve.getPoints(50);

        let verticeArr = []; // 顶点数组
        let colorArr = []; // 颜色数组
        let distArr = []; // 距离原点距离数组
        let disAllArr = []; // 总距离数组
        let startArr = []; // 起始位置数组
        
        let dist = 0;
        for (let i = 0, len = points.length; i < len; i++) {
            verticeArr.push(points[i].x, points[i].y, points[i].z);
            let lineColor = new THREE.Color(this.options.lineColor);
            colorArr.push(lineColor.r, lineColor.g, lineColor.b, this.options.lineOpacity);
            if (i > 0) {
                dist += points[i].distanceTo(points[i-1]);
            }
            distArr.push(dist);
        }
        let randomStart = Math.random() * this.uniforms.period.value;
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

        let shaderMaterial = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: lineShader.vertexShader,
            fragmentShader: lineShader.fragmentShader,
            transparent: true,
            alphaTest: 0.8
        });
        
        let line = new THREE.Line(geometry, shaderMaterial);
        line.rotateX(-Math.PI/2);

        this._container.add(line);
    }
}
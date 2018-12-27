import { Layer } from './layer';
import { Util } from '../util';
import { mapHelper } from '../maphelper';
import { lineShader } from './shader/line';
export class FlyLineLayer extends Layer {
    constructor(data, options) {
        super(data, options);
        const defaultOptions = {
            geojsonLayer: null,
            lineStyle: { // 飞线样式
                color: 0x00ff00,
                lineWidth: 2
            }
        };
        this.options = Util.extend(defaultOptions, options);

        this.uniforms = {
            time: {
                type: "f",
                value: 1.0
            }
        };
        this.animate();
    }
    onAdd(map) {
        Layer.prototype.onAdd.call(this, map); 
        this._draw();
    }
    onRemove(map) {
        Layer.prototype.onRemove.call(this, map);
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.uniforms.time.value += 0.01;
    }
    _draw() {
        this._data.forEach(item => {
            let f = mapHelper.wgs84ToMecator(item.from.split(','));
            let t = mapHelper.wgs84ToMecator(item.to.split(','));
            let scale = this._map.options.SCALE_RATIO;
            item.from = f.map(point => point / scale);
            item.to = t.map(point => point / scale);
            this._drawFlyLine(item.from, item.to, 2 / scale);
        });
    }
    _drawFlyLine(startPoint, endPoint, heightLimit) {
        let middleX = ( startPoint[0] + endPoint[0] ) / 2;
        let middleY = ( startPoint[1] + endPoint[1] ) / 2 + heightLimit;
        let middleZ = 0;
        let startVector = new THREE.Vector3(startPoint[0], startPoint[1], 0);
        let middleVector = new THREE.Vector3(middleX, middleY, middleZ);
        let endVector = new THREE.Vector3(endPoint[0], endPoint[1], 0);

        let curve = new THREE.CatmullRomCurve3([startVector, middleVector, endVector]);

        let geometry = new THREE.TubeGeometry(curve, 100, 0.1, 4, false);

        let shaderMaterial = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: lineShader.vertexShader,
            fragmentShader: lineShader.fragmentShader,
            transparent: true,
            alphaTest: 0.8
        });

        let line = new THREE.Mesh(geometry, shaderMaterial);

        this._container.add(line);
    }
}
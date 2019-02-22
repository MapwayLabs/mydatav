import Layer from './layer';
import * as Util from '../util';

// 文字标注图层
export default class BgLayer extends Layer {
    constructor(data, options) {
        super(data, options);
        const defaultOptions = {
        };
        this.options = Util.extend(true, defaultOptions, options);
    }
    onAdd(map) {
        Layer.prototype.onAdd.call(this, map); 
        this._draw();
    }
    onRemove(map) {
        Layer.prototype.onRemove.call(this, map);
    }
    _draw() {
        const texture = new THREE.TextureLoader().load('../../images/china1.jpg');
        // const texture = new THREE.TextureLoader().load('../../images/worldcolor2.png');
        const material = new THREE.MeshBasicMaterial({
            map: texture
        });
        const planeGeometry = new THREE.PlaneGeometry(360, 180, 8, 8);
        const plane = new THREE.Mesh(planeGeometry, material);
        plane.rotateX(-Math.PI / 2);
        this._container.add(plane);
    }
}
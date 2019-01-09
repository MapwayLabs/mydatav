import Layer from './layer';
import * as Util from '../util';
import TextSprite from './text-sprite';

// 文字标注图层
export default class TextLayer extends Layer {
    constructor(data, options) {
        super(data, options);
        const defaultOptions = {
            textStyle: {
                fontWeight: 'normal',
                fontFamily: 'Microsoft YaHei',
                fontColor: '#000',
                textAlign: 'center',
                textBaseline: 'middle'
            }
        };
        Util.extend(true, defaultOptions, options);
    }
    onAdd(map) {
        Layer.prototype.onAdd.call(this, map); 
        this._draw();
    }
    onRemove(map) {
        Layer.prototype.onRemove.call(this, map);
    }
    update(data) {
        this._container.remove(...this._container.children);
        this._data = data;
        this._draw();
    }
    _draw() {
        if (this._data == null || !this._data.length) {return;}
        this._data.forEach(d => {
            const projCenter = this._map.projectLngLat(d.center);
            const altitude = d.altitude; 
            const textSprite = new TextSprite(d.text, this.options.textStyle).getSprite();

            textSprite.scale.set(32, 32, 1);
            textSprite.position.set(projCenter[0], altitude, -projCenter[1]);
            textSprite.rotateX(-Math.PI/2);

            // 避免柱子遮挡地名
            textSprite.renderOrder = 100;
            textSprite.material.depthTest=false; // 是否采用深度测试，必须加
    
            this._container.add(textSprite);
        });
    }
}
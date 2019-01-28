import Layer from './layer';
import * as Util from '../util';
import TextSprite from './text-sprite';

// 文字标注图层
export default class TextLayer extends Layer {
    constructor(data, options) {
        super(data, options);
        const defaultOptions = {
            textStyle: {
                scale: 1, // 注意：此属性失效
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                fontFamily: 'Microsoft YaHei',
                fontColor: '#000',
                textAlign: 'center',
                textBaseline: 'middle',
                maxWidth: 512
            }
        };
        this.options = Util.extend(true, defaultOptions, options);
        this._textSprites = [];
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
        this._textSprites = [];
        this._draw();
    }
    updateScale() {
        if (!this._map) {
            return;
        }
        const camera = this._map.getCamera();
        const size = this._map.getContainerSize();
        this._textSprites.forEach(sprite => {
            sprite.setScale(camera, size);
        });
    }
    _draw() {
        if (this._data == null || !this._data.length) {return;}
        this._data.forEach(d => {
            const projCenter = this._map.projectLngLat(d.center);
            const altitude = d.altitude;
            // 为了避免文字覆盖，对每个文字设置不同的对齐方式 
            if (d.textAlign != null) {
                this.options.textStyle.textAlign = d.textAlign;
            }
            const ts = new TextSprite(d.text, this.options.textStyle);
            const textSprite = ts.getSprite();
            // const scale = this.options.textStyle.scale;

            // textSprite.scale.set(scale, scale, 1);
            textSprite.position.set(projCenter[0], altitude, -projCenter[1]);
            textSprite.rotateX(-Math.PI/2);

            // 避免柱子遮挡地名
            textSprite.renderOrder = 100;
            textSprite.material.depthTest=false; // 是否采用深度测试，必须加
    
            this._container.add(textSprite);
            this._textSprites.push(ts);
        });
    }
}
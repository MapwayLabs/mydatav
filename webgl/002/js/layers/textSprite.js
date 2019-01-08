import * as Util from '../util';

export default class TextSprite {
    constructor(text, options) {
        const defaultOptions = {
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#000',
            textAlign: 'center',
            textBaseline: 'middle'
        }
        this.options = Util.extend(true, defaultOptions, options);

        this._textStr = text == null ? '' : String(text);

        this._init();
    }
    getSprite() {
        return this._textSprite;
    }
    _init() {
        const canvas = document.createElement("canvas");
        // webgl 规定 canvas 宽高为2的n次幂
        canvas.width = 256;
        canvas.height = 256;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw
        const options = this.options;
        ctx.font = "16px " + options.fontWeight + " " + options.fontFamily;
        ctx.fillStyle = options.fontColor;
        ctx.textAlign = options.textAlign;
        ctx.textBaseline = options.textBaseline;
        ctx.fillText(this._textStr, canvas.width / 2, canvas.height / 2 + 5);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent:true
        });
        this._textSprite = new THREE.Sprite(spriteMaterial);
    }
}
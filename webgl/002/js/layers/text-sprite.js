import * as Util from '../util';

// 字体精灵
export default class TextSprite {
    constructor(text, options) {
        const defaultOptions = {
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '16px',
            fontFamily: 'Microsoft YaHei',
            fontColor: '#000',
            textAlign: 'center',
            textBaseline: 'middle',
            maxWidth: 512
        }
        this.options = Util.extend(true, defaultOptions, options);

        this._textStr = text == null ? '' : String(text);

        this._init();
    }
    getSprite() {
        return this._textSprite;
    }
    getSize() {
        return {
            width: this._width,
            height: this._height
        };
    }
    // idea from https://www.cnblogs.com/dojo-lzz/p/7143276.html
    setScale(camera, containerSize) {
        const DEG2RAD = Math.PI / 180;
        let pos = this._textSprite.position;
        let distance = camera.position.distanceTo(pos);
        let top = Math.tan(camera.fov / 2 * DEG2RAD) * distance;
        let ratio = 2 * top / containerSize.height;
        let scaleX = this._width * ratio;
        let scaleY = this._height * ratio;
        this._textSprite.scale.set(scaleX, scaleY, 1);
    }
    _init() {
        const font = `${this.options.fontStyle} ${this.options.fontWeight} ${this.options.fontSize} ${this.options.fontFamily}`;
        const textSize = Util.measureText(this._textStr, font);
        
        if (this.options.textAlign !== 'center') {
            textSize.width *= 1.5;
        }
        if (this.options.textBaseline !== 'middle') {
            textSize.height *= 1.5;
        }

        const canvasWidth = Util.wrapNum(textSize.width);
        const canvasHeight = Util.wrapNum(textSize.height);
        this._width = canvasWidth;
        this._height = canvasHeight;

        const canvas = document.createElement("canvas");
        // webgl 规定 canvas 宽高为2的n次幂
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw
        ctx.font = font;
        ctx.fillStyle = this.options.fontColor;
        ctx.textAlign = this.options.textAlign;
        ctx.textBaseline = this.options.textBaseline;
        ctx.fillText(this._textStr, canvas.width / 2, canvas.height / 2, this.options.maxWidth);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent:true
        });
        this._textSprite = new THREE.Sprite(spriteMaterial);
    }
}
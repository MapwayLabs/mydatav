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
            opacity: 1,
            maxWidth: 512,
            labelPointStyle: {
                show: false, // 是否显示文字旁边的标注点
                margin: 4, // 标注点距离文字的距离
                radius: 6, // 标注点半径
                color: '#fff' // 标注点颜色，可以是 hexString、rgb、rgba
            }
        }
        this.options = Util.extend(true, defaultOptions, options);

        this._textStr = text == null ? '' : String(text);

        this._init();
    }
    getSprite() {
        return this._textSprite;
    }
    // canvas 样式尺寸
    getSize() {
        return {
            width: this._width,
            height: this._height
        };
    }
    // 实际显示文字的尺寸
    getTextSize() {
        return {
            width: this._textWidth,
            height: this._textHeight
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

    hide() {
        this._textSprite.material.opacity = 0;
    }

    show() {
        this._textSprite.material.opacity = this.options.opacity;
    }

    _getLabelPointCoord(textPoint) {
        const dpr = Util.getDpr();
        let point = {
            x: textPoint.x,
            y: textPoint.y
        };
        const labelPointStyle = this.options.labelPointStyle;
        const r = Math.min(labelPointStyle.radius, this._textWidth/2);
        const maxMargin = this._textWidth - r * 2;
        const margin = Math.min(labelPointStyle.margin, maxMargin);
        // const sumDis = labelPointStyle.margin + labelPointStyle.radius * 2;
        
        if (this.options.textAlign === 'left' || this.options.textAlign === 'start' ) {
            point.x = point.x - margin * dpr;
        } else if (this.options.textAlign === 'right' || this.options.textAlign === 'end') {
            point.x = point.x + margin * dpr;
        }
        // if (this.options.textBaseline === 'top') {
        //     point.y = textPoint.y - sumDis;
        // } else if (this.options.textBaseline === 'bottom') {
        //     point.y = textPoint.y + sumDis;
        // }
        return point;
    }

    _getTextPointCoord(canvas) {
        // const dpr = Util.getDpr();
        // let offsetX = this._textWidth * dpr / 2;
        // let offsetY = this._textHeight * dpr / 2;
        let point = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
        // if (this.options.textAlign === 'left' || this.options.textAlign === 'start' ) {
        //     point.x -= offsetX;
        // }  else if (this.options.textAlign === 'right' || this.options.textAlign === 'end') {
        //     point.x += offsetX;
        // }
        // if (this.options.textBaseline === 'top') {
        //     point.y -= offsetY;
        // } else if (this.options.textBaseline === 'bottom') {
        //     point.y += offsetY;
        // }
        return point;
    }

    _init() {
        const font = `${this.options.fontStyle} ${this.options.fontWeight} ${this.options.fontSize} ${this.options.fontFamily}`;

        const textSize = Util.measureText(this._textStr, font);
        let { width: textWidth, height: textHeight } = textSize;
    
        let xIncreaseDis = 0;
        let yIncreaseDis = 0;
        if (this.options.labelPointStyle.show) {
            xIncreaseDis = this.options.labelPointStyle.margin + this.options.labelPointStyle.radius;
        }
        if (this.options.textAlign !== 'center') {
            xIncreaseDis += textWidth;
        }
        if (this.options.textBaseline !== 'middle') {
            yIncreaseDis += textHeight;
        }
         // webgl 规定 canvas 宽高为2的n次幂，对老式GPU的支持
        const canvasWidth = Util.wrapNum(textWidth + xIncreaseDis);
        const canvasHeight = Util.wrapNum(textHeight + yIncreaseDis);
        this._width = canvasWidth;
        this._height = canvasHeight;
        this._textWidth = textWidth;
        this._textHeight = textHeight;

        const canvas = document.createElement("canvas");
        
        // 适配高清屏：将 canvas 画布尺寸扩大 dpr 倍，视口尺寸设为原始值，并且 canvas 内部所有元素大小扩大 dpr 倍
        const dpr = Util.getDpr();
        canvas.style.width = canvasWidth + "px";
        canvas.style.height = canvasHeight + "px";
        canvas.height = canvasHeight * dpr;
        canvas.width = canvasWidth * dpr;

        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw

        // test-start
        // ctx.save();
        // ctx.beginPath();
        // ctx.fillStyle="rgba(255,0,0,0.5)";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        // ctx.restore();
        // test-end

        // 文字
        const drpFont = `${this.options.fontStyle} ${this.options.fontWeight} ${parseInt(this.options.fontSize) * dpr + 'px'} ${this.options.fontFamily}`;
        const textPoint = this._getTextPointCoord(canvas);
        ctx.save();
        ctx.font = drpFont;
        ctx.fillStyle = this.options.fontColor;
        ctx.textAlign = this.options.textAlign;
        ctx.textBaseline = this.options.textBaseline;
        ctx.fillText(this._textStr, textPoint.x, textPoint.y, this.options.maxWidth);
        ctx.restore();
        
        // 标注点
        if (this.options.labelPointStyle.show) {
            ctx.save();
            const radius = this.options.labelPointStyle.radius;
            const color = this.options.labelPointStyle.color;
            const point = this._getLabelPointCoord(textPoint);
            ctx.fillStyle = color;
            ctx.beginPath();
            const r = Math.min(radius, this._textWidth/2);
            ctx.arc(point.x, point.y, r*dpr, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent:true
        });
        spriteMaterial.opacity = this.options.opacity;
        this._textSprite = new THREE.Sprite(spriteMaterial);
    }
}
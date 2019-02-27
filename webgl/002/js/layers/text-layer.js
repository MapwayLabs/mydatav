import Layer from './layer';
import * as Util from '../util';
import TextSprite from './text-sprite';
import { worldToScreen, isPOICollision } from '../maphelper';

// 文字标注图层
export default class TextLayer extends Layer {
    constructor(data, options) {
        super(data, options);
        const defaultOptions = {
            isAvoidCollision: true, // 是否避免文字碰撞，默认为 true，即文字会根据缩放级别显示和隐藏，不会相互覆盖；若设置为 false，则文字会全部显示
            textStyle: {
                scale: 1, // 注意：此属性失效
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                fontFamily: 'Microsoft YaHei',
                fontColor: '#000',
                textAlign: 'center',
                textBaseline: 'middle',
                maxWidth: 512,
                offsetY: 0, // 为避免文字覆盖柱子，设置文字偏移中心点
                opacity: 1
            }
        };
        this.options = Util.extend(true, defaultOptions, options);
        this._textSprites = [];
        this._texts = [];
    }
    onAdd(map) {
        Layer.prototype.onAdd.call(this, map); 
        this._draw();
        if (this.options.isAvoidCollision) {
            setTimeout(() => {
                this._collisionDetect();
            }, 0);
            this._map.on('change', this._mapChangeEvtHandler, this);
        }
    }
    onRemove(map) {
        Layer.prototype.onRemove.call(this, map);
        this._map.off('change', this._mapChangeEvtHandler, this);
    }
    update(data) {
        this._container.remove(...this._container.children);
        this._data = data;
        this._draw();
        if (this.options.isAvoidCollision) {
            setTimeout(() => {
                this._collisionDetect();
            }, 0);
        }
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
        this._textSprites = [];
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
            const offsetY = this.options.textStyle.offsetY;
            textSprite.position.set(projCenter[0], altitude, -projCenter[1]-offsetY);
            textSprite.rotateX(-Math.PI/2);

            // 避免柱子遮挡地名
            textSprite.renderOrder = 100;
            textSprite.material.depthTest=false; // 是否采用深度测试，必须加
            
            this._textSprites.push(ts);
            if (!this.options.isAvoidCollision) {
                this._container.add(textSprite);
            }
        });
    }

    _mapChangeEvtHandler() {
        this._collisionDetect();
    }

    // 文字碰撞检测 window.geojsonLayer._nulltextLayer._collisionDetect()
    // TODO: 视口裁剪，只计算视口内的部分
    _collisionDetect() {
        this._texts = [];

        this._textSprites.forEach(textSprite => {
            // 碰撞检测
            let obj = {};
            const sprite = textSprite.getSprite();
            const screenPoint = worldToScreen(sprite.position.toArray(), this._map, sprite);
            const size = textSprite.getTextSize();
            obj.x = screenPoint[0];
            obj.y = screenPoint[1];
            obj.w = size.width;
            obj.h = size.height;
            obj.show = true;
            this._texts.push(obj);
        });

        const len = this._texts.length;
        for (let i = 0; i < len; i++) {
            let text1 = this._texts[i];
            for (let j = i+1; j < len; j++) {
                let text2 = this._texts[j];
                if (isPOICollision(text1, text2)) {
                    text2.show = false;
                } 
            }
        }

        // 隐藏重叠元素
        this._texts.forEach((text, index) => {
            if (text.show) {
                this._textSprites[index].show();
            } else {
                this._textSprites[index].hide();
            }
        });
        
        // draw
        this._textSprites.forEach(textSprite => {
            const sprite = textSprite.getSprite();
            this._container.add(sprite);
        });
    }
}
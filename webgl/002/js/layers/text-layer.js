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
                opacity: 1,
                labelPointStyle: {
                    show: true, // 是否显示文字旁边的标注点
                    margin: 4, // 标注点距离文字的距离
                    radius: 6, // 标注点半径
                    color: '#0f0' // 标注点颜色，可以是 hexString、rgb、rgba
                }
            }
        };
        this.options = Util.extend(true, defaultOptions, options);
        this.type = 'textLayer';
        this._textSprites = [];
        this._texts = [];
    }
    onAdd(map) {
        Layer.prototype.onAdd.call(this, map); 
        this._draw();
        if (this.options.isAvoidCollision || this._map.options.type === 'sphere') {
            this._map.on('change', this._mapChangeEvtHandler, this);
        }
    }
    onRemove(map) {
        Layer.prototype.onRemove.call(this, map);
        if (this.options.isAvoidCollision || this._map.options.type === 'sphere') {
            this._map.off('change', this._mapChangeEvtHandler, this);
        }
    }
    update(data) {
        this._data = data;
        this.clear();
        this._draw();
        if (this.options.isAvoidCollision || this._map.options.type === 'sphere') {
            this._map.on('change', this._mapChangeEvtHandler, this);
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
    clear() {
        this._container.remove(...this._container.children);
    }
    _getWorldPosition(d) {
        let centerLatLng = d.center;
        let altitude = d.altitude || 0;
        let projCenter = this._map.projectLngLat([...centerLatLng, altitude]);
        return projCenter;
    }
    _getSpritePosition(d) {
        const projCenter = this._getWorldPosition(d);
        let position;
        if (this._map.options.type === 'plane') {
            const offsetY = this.options.textStyle.offsetY;
            position = [projCenter[0], projCenter[2], -projCenter[1]-offsetY];
        } else {
            position = [projCenter[0], projCenter[1], projCenter[2]];
        }
        return position;
    }
    getFontStyle() {
        return `${this.options.textStyle.fontStyle} ${this.options.textStyle.fontWeight} ${this.options.textStyle.fontSize} ${this.options.textStyle.fontFamily}`;
    }
    _filterShowData() {
        if (this._data == null || !this._data.length) {return [];}
        if (this._map.options.type === 'sphere') {
            let showData = this._data.filter(d => {
                let isInRange = this._map.isLngLatInRange(d.center);
                return isInRange;
            });
            if (this.options.isAvoidCollision) {
                showData = this._filterCollisionData(showData);
            }
            return showData;
        } else {
            let showData = this._data;
            if (this.options.isAvoidCollision) {
                showData = this._filterCollisionData(showData);
            }
            return showData;
        }
    }
    _filterCollisionData(data) {
        this._texts = [];
        const font = this.getFontStyle();
        data.forEach(d => {
            let position = this._getSpritePosition(d);
            let obj = {};
            const screenPoint = worldToScreen(position, this._map);
            const textSize = Util.measureText(d.text, font);
            obj.x = screenPoint[0];
            obj.y = screenPoint[1];
            obj.w = textSize.width;
            obj.h = textSize.height;
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
        
        let showData = [];
        this._texts.forEach((text, index) => {
            if (text.show) {
                showData.push(data[index]);
            }
        });

        return showData;
    }
    _draw() {
        this._textSprites = [];
        const showData = this._filterShowData();
        showData.forEach(d => {
            // 为了避免文字覆盖，对每个文字设置不同的对齐方式 
            // if (d.textAlign != null) {
            //     this.options.textStyle.textAlign = d.textAlign;
            // }
            // if (d.textBaseline != null) {
            //     this.options.textStyle.textBaseline = d.textBaseline;
            // }
            let position = this._getSpritePosition(d);
            const ts = new TextSprite(d.text, this.options.textStyle);
            const textSprite = ts.getSprite();
            textSprite.position.set(...position);
            
            // 避免柱子遮挡地名
            textSprite.renderOrder = 100;
            textSprite.material.depthTest=false; // 是否采用深度测试，必须加
            
            this._textSprites.push(ts);
            this._container.add(textSprite);
        });
    }
    _mapChangeEvtHandler() {
        this.clear();
        this._draw();
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
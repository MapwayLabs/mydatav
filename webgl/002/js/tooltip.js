import * as Util from './util';

export default class ToolTip {
    constructor(parentElement, options = {}) {
        const defaultOptions = {
            offsetX: 6,
            offsetY: 8,
            className: 'chart-map-3d-tooltip',
            activeClassName: 'chart-map-3d-tooltip-active'
        };
        this.options = Util.extend(true, defaultOptions, options);
    
        this._el = document.createElement("div");
        Util.addClass(this._el, 'tooltip sankey-tooltip ' + this.options.className);
        this._el.style.display = 'none';
       
        if (!parentElement) {
            throw new Error('未提供tootip父元素！');
        }
        parentElement.appendChild(this._el);
    }
    open(x, y, content) {
        if (this._el) {
            this._el.innerHTML = content;
            this._el.style.left = x + this.options.offsetX + 'px';
            this._el.style.top = y + this.options.offsetY + 'px';
            Util.addClass(this._el, this.options.activeClassName);
            this._el.style.display = 'block';
        }
    }
    close() {
        if (this._el) {
            Util.removeClass(this._el, this.options.activeClassName);
            this._el.style.display = 'none';
        }   
    }
    remove() {
        if (this._el && this._el.parentElement) {
            this._el.parentElement.removeChild(this._el);
            this._el = null;
        }
    }
}
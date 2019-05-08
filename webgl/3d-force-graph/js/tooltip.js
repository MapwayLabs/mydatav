// export default ToolTip;
var Util = {
    hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
    },
    addClass(el, className) {
        if (el.classList !== undefined) {
            var list = className.split(' ');
            for (var i = 0, len = list.length; i < len; i++) {
                el.classList.add(list[i]);
            }
        } else if (!hasClass(el, className)) {
            el.className = (el.className ? el.className + ' ' : '') + className;
        }
    },
    removeClass(el, className) {
        if (el.classList !== undefined) {
            el.classList.remove(className);
        } else {
            el.className = ' ' + el.className + ' ';
            el.className = el.className.replace(' ' + className + ' ', ' ');
        }
    },
}

function ToolTip(parentElement, options) {
    const defaultOptions = {
        offsetX: 6,
        offsetY: 8,
        className: '3d-chart-tooltip',
        activeClassName: '3d-chart-tooltip-active'
    };
    this.options = Object.assign(defaultOptions, options || {});

    this._el = document.createElement("div");
    Util.addClass(this._el, this.options.className);
    this._el.style.display = 'none';
    this._el.style.position = 'absolute';
    this._el.style.backgroundColor = '#fff';
    this._el.style.borderRadius = '2px';
    this._el.style.color = 'rgba(10, 18, 32, 0.64)';
    this._el.style.fontSize = '12px';
    this._el.style.lineHeight = 1.4;
    this._el.style.opacity = 0.9;
    this._el.style.padding = '8px 10px';
    this._el.style.userSelect = 'none';

    if (!parentElement) {
        throw new Error('未提供tootip父元素！');
    }
    parentElement.appendChild(this._el);
}

ToolTip.prototype = {
    constructor: ToolTip,
    open(x, y, content) {
        if (this._el) {
            this._el.innerHTML = content;
            this._el.style.left = x + this.options.offsetX + 'px';
            this._el.style.top = y + this.options.offsetY + 'px';
            Util.addClass(this._el, this.options.activeClassName);
            this._el.style.display = 'block';
        }
    },
    close() {
        if (this._el) {
            Util.removeClass(this._el, this.options.activeClassName);
            this._el.style.display = 'none';
        }
    },
    remove() {
        if (this._el && this._el.parentElement) {
            this._el.parentElement.removeChild(this._el);
            this._el = null;
        }
    }
}
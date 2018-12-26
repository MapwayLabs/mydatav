export const Util = {
    hasClass: function (el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className)
    },
    addClass: function (el, className) {
        if (el.classList !== undefined) {
            var list = className.split(' ')
            for (var i = 0, len = list.length; i < len; i++) {
                el.classList.add(list[i])
            }
        } else if (!this.hasClass(el, className)) {
            el.className = (el.className ? el.className + ' ' : '') + className
        }
    },
    removeClass: function (el, className) {
        if (el.classList !== undefined) {
            el.classList.remove(className)
        } else {
            el.className = ' ' + el.className + ' '
            el.className = el.className.replace(' ' + className + ' ', ' ')
        }
    },
    getCmpStyle: function (el) {
        // FIXEME 兼容性写法
        return getComputedStyle(el) 
    },
    extend: function (srcObj) {
        var i, j, len, src
        for (j = 1, len = arguments.length; j < len; j++) {
            src = arguments[j]
            for (var i in src) {
                srcObj[i] = src[i]
            }
        }
        return srcObj
    },
    stamp: function (obj) {
        if (!this.lastId) this.lastId = 0
        obj.__objstampid__ = obj.__objstampid__ || ++this.lastId
        return obj.__objstampid__
    },
    inherit: function (parentClass, childClass) {
        var tempClass = function () {}
        tempClass.prototype = parentClass.prototype
        childClass.prototype = new tempClass()
        childClass.prototype.constructor = childClass
    },
    isNullOrUdf: function (val) {
        return val === undefined || val === null
    },
    getRandomColor: function () {
        return '#' + (function getColor(color) {
            return (color += '0123456789abcdef' [Math.floor(Math.random() * 16)]) &&
                (color.length == 6) ? color : getColor(color);
        })('');
    },
    isWebGLAvailable: function () {
        try {
            var canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    },
    // 获取一个颜色的高亮或更暗色 https://css-tricks.com/snippets/javascript/lighten-darken-color/
    lightenDarkenColor: function (col, amt) {

        var usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col, 16);

        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

    }
}
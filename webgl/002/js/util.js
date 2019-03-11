export function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
}

export function addClass(el, className) {
    if (el.classList !== undefined) {
        var list = className.split(' ');
        for (var i = 0, len = list.length; i < len; i++) {
            el.classList.add(list[i]);
        }
    } else if (!hasClass(el, className)) {
        el.className = (el.className ? el.className + ' ' : '') + className;
    }
}

export function removeClass(el, className) {
    if (el.classList !== undefined) {
        el.classList.remove(className);
    } else {
        el.className = ' ' + el.className + ' ';
        el.className = el.className.replace(' ' + className + ' ', ' ');
    }
}

export function getCmpStyle(el) {
    // FIXEME 兼容性写法
    return getComputedStyle(el);
}

export function isInPage(node) {
    return (node === document.body) ? false : document.body.contains(node);
}

export function getDpr() {
    return window.devicePixelRatio || 1;
}

export function isFunction( obj ) {

    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
}

export function isPlainObject( obj ) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if ( !obj || Object.prototype.toString.call( obj ) !== "[object Object]" ) {
        return false;
    }

    proto = Object.getPrototypeOf( obj );

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if ( !proto ) {
        return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = Object.prototype.hasOwnProperty.call( proto, "constructor" ) && proto.constructor;
    return typeof Ctor === "function" && Object.prototype.hasOwnProperty.toString.call( Ctor ) === Object.prototype.hasOwnProperty.toString.call( Object );
}

export function isEmptyObject( obj ) {
    var name;

    for ( name in obj ) {
        return false;
    }
    return true;
}

// 浅拷贝
// export function extend(srcObj) {
//     var i, j, len, src;
//     for (j = 1, len = arguments.length; j < len; j++) {
//         src = arguments[j];
//         for (var i in src) {
//             srcObj[i] = src[i];
//         }
//     }
//     return srcObj;
// }

// 深浅拷贝， 参考jquery
export function extend() {
    var options, name, src, copy, copyIsArray, clone,
    target = arguments[ 0 ] || {},
    i = 1,
    length = arguments.length,
    deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;

        // Skip the boolean and the target
        target = arguments[ i ] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !isFunction( target ) ) {
        target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {

        // Only deal with non-null/undefined values
        if ( ( options = arguments[ i ] ) != null ) {

            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( isPlainObject( copy ) || ( copyIsArray = Array.isArray( copy ) ) ) ) {

                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && Array.isArray( src ) ? src : [];

                    } else {
                        clone = src && isPlainObject( src ) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = extend( deep, clone, copy );

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }
    // Return the modified object
    return target;
}

var lastId;
export function stamp(obj) {
    if (lastId == null) lastId = 0;
    obj.__objstampid__ = obj.__objstampid__ || ++lastId;
    return obj.__objstampid__;
}

export function inherit (parentClass, childClass) {
    var tempClass = function () {};
    tempClass.prototype = parentClass.prototype;
    childClass.prototype = new tempClass();
    childClass.prototype.constructor = childClass;
}

export function isNullOrUdf(val) {
    return val == null;
}

export function getRandomColor () {
    return '#' + (function getColor(color) {
        return (color += '0123456789abcdef' [Math.floor(Math.random() * 16)]) &&
            (color.length == 6) ? color : getColor(color);
    })('');
}

export function isWebGLAvailable () {
    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

/**
 * 获取归一化的值，归一到区间[ymin, ymax]
 * xmax, xmin 目前数据的最大、最小值
 * ymax, ymin 目标区间的最大、最小值
 */
export function normalizeValue(value, xmin, xmax, ymin, ymax, type = 0) {
    if (xmax === 0 && xmin === 0) {
        return ymin;
    }
    if (xmin === xmax) {
        // type =0 柱子高度相同时，取中值
        // type !=0 颜色相同时，取最小值
        if (type === 0) {return (ymax + ymin) / 2;}
        else {return ymin;}
    }
    return ymin + (ymax - ymin) * (value - xmin) / (xmax - xmin);
}

// 获取一个颜色的高亮或更暗色 https://css-tricks.com/snippets/javascript/lighten-darken-color/
export function lightenDarkenColor(col, amt) {

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

// 缓存文字宽度，减少计算量
// idea from echarts/zrender
let textWidthCache = {}; 
let textWidthCacheCounter = 0;
const TEXT_CACHE_MAX = 5000;
export function measureText(text, font = 'normal normal 12px sans-serif') {
    const key = text + ':' + font;
    if (textWidthCache[key]) {
        // NOTE：外部不要修改对象
        return textWidthCache[key];
    }
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.display = "inline-block";
    document.body.appendChild(span);
    let result = {
        width: 0,
        height: 0
    };
    span.style.font = font;
    if (typeof span.textContent !== "undefined") {
        span.textContent = text;
    } else {
        span.innerText = text;
    }
    const cmpStyle = window.getComputedStyle(span);
    result.width = parseFloat(cmpStyle.width);
    result.height = parseFloat(cmpStyle.height);
    if (textWidthCacheCounter > TEXT_CACHE_MAX) {
        textWidthCache = {};
        textWidthCacheCounter = 0;
    }
    textWidthCache[key] = result;
    textWidthCacheCounter ++;
    // 移除DOM
    span.parentNode.removeChild(span);
    return result;
}

export function wrapNum(num) {
    let i = 2;
    while (i < num) {
        i *= 2;
    }
    return i;
}

// @function formatNum(num: Number, digits?: Number): Number
// Returns the number `num` rounded to `digits` decimals, or to 5 decimals by default.
export function formatNum(num, digits) {
	var pow = Math.pow(10, digits || 5);
	return Math.round(num * pow) / pow;
}
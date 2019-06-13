// https://jerryzou.com/posts/dive-into-deep-clone-in-javascript/

/* ------------------------------------------------------------------- */

// 我的思路
// 基本类型： null、undefined、bool、number、string、symbol
// 对象：Object（Function、Array）
function deepClone(srcObj) {
    if (isBaseType(srcObj) || isFunction(srcObj)) return srcObj;
    var obj = {};
    for (var o in srcObj) {
        obj[o] = deepClone(srcObj[o]);
    }
    return obj;
}

// 优化1
// 拷贝数组
function deepClone(srcObj) {
    if (isBaseType(srcObj) || isFunction(srcObj)) return srcObj;
    var obj = isArray(srcObj) ? [] : {};
    for (var o in srcObj) {
        obj[o] = deepClone(srcObj[o]);
    }
    return obj;
}

// 优化2
// var o = {a: 1}; o.a = o;
// 循环引用报错：Maximum call stack size exceeded
function deepClone(srcObj) {
    if (isBaseType(srcObj) || isFunction(srcObj)) return srcObj;
    var obj = isArray(srcObj) ? [] : {};
    for (var o in srcObj) {
        if (srcObj[o] === srcObj) continue; // 处理循环引用
        obj[o] = deepClone(srcObj[o]); 
    }
    return obj;
}

/* ------------------------------------------------------------------- */

// 大佬实现
var o = {
    a: {
        b: 9,
        c: 10
    },
    d: 2,
    E: {
        t: "a"
    }
};
function deepClone(o) {
    var r = {},
    q = [{
        d: o,
        parent: r
    }];
    while (q.length) {
        var node = q.pop(),
            k = node.k,
            ob = node.d,
            parent = node.parent;
        if (typeof k !== "undefined") parent = parent[k] = {};
        for (k in ob) {
            if (({}).toString.call(ob[k]) === "[object Object]") {
                q.push({
                    d: ob[k],
                    k: k,
                    parent: parent
                });
            } else parent[k] = ob[k];
        }
    };
    return r;
}

/* ------------------------------------------------------------------- */

// jquery实现
// 浅拷贝： $.extend(target, source1, source2, ....)
// 深拷贝： $.extend(true, target, source1, source2, ....)
jQuery.extend = jQuery.fn.extend = function() {
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
				copy = options[ name ];

                // Prevent never-ending loop
                // 处理循环引用
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

/* ------------------------------------------------------------------- */

// lodash实现
// 代码太多，省略代码；目前实现得最好的方式
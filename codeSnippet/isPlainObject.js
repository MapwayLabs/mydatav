// from Jquery
function isPlainObject( obj ) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    // 不是对象
    if ( !obj || ({}).toString.call( obj ) !== "[object Object]" ) {
        return false;
    }

    proto = Object.getPrototypeOf( obj );

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    // 对象原型为null
    if ( !proto ) {
        return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    // ({}).hasOwnProperty.toString.call(Object.getPrototypeOf(new Date).constructor ) 
    // 结果1： "function Date() { [native code] }"
    // ({}).hasOwnProperty.toString.call(Object.getPrototypeOf({}).constructor ) 
    // 结果2： "function Object() { [native code] }"
    // ({}).hasOwnProperty.toString.call( Object )
    // 结果3："function Object() { [native code] }"
    Ctor = ({}).hasOwnProperty.call( proto, "constructor" ) && proto.constructor;
    return typeof Ctor === "function" && ({}).hasOwnProperty.toString.call( Ctor ) === ({}).hasOwnProperty.toString.call( Object );
}
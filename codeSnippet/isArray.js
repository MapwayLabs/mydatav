function isArray(obj) {
    return Array.isArray ? Array.isArray(obj) : ({}).toString.call(obj) === '[object Array]';
}
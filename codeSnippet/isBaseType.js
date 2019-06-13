function isBaseType(o) {
    return o === null || o === undefined || ['boolean', 'number', 'symbol', 'string'].indexOf(typeof o) !== -1;
}
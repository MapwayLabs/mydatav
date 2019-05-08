function(e, t, n) {
    "use strict";
    var r = n(707);
    function i(e) {
        return e ? 1 === e.length ? e[0] : function(t) {
            return e.reduce(function(e, t) {
                return t(e)
            }, t)
        }
        : r.noop
    }
    t.pipe = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t - 0] = arguments[t];
        return i(e)
    }
    ,
    t.pipeFromArray = i
}
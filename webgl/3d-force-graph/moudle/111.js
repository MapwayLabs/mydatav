function(e, t, n) {
    "use strict";
    (function(e) {
        var n = "undefined" != typeof window && window
          , r = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self
          , i = n || void 0 !== e && e || r;
        t.root = i,
        function() {
            if (!i)
                throw new Error("RxJS could not find any global context (window, self, global)")
        }()
    }
    ).call(t, n(24))
}
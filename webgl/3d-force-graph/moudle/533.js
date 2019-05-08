function(e, t, n) {
    "use strict";
    var r = n(111);
    function i(e) {
        var t, n = e.Symbol;
        return "function" == typeof n ? n.observable ? t = n.observable : (t = n("observable"),
        n.observable = t) : t = "@@observable",
        t
    }
    t.getSymbolObservable = i,
    t.observable = i(r.root),
    t.$$observable = t.observable
}
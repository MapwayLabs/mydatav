function(e, t, n) {
    "use strict";
    var r = n(111).root.Symbol;
    t.rxSubscriber = "function" == typeof r && "function" == typeof r.for ? r.for("rxSubscriber") : "@@rxSubscriber",
    t.$$rxSubscriber = t.rxSubscriber
}
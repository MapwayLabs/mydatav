function(e, t, n) {
    "use strict";
    var r = n(22)
      , i = n(532)
      , o = n(1097);
    t.toSubscriber = function(e, t, n) {
        if (e) {
            if (e instanceof r.Subscriber)
                return e;
            if (e[i.rxSubscriber])
                return e[i.rxSubscriber]()
        }
        return e || t || n ? new r.Subscriber(e,t,n) : new r.Subscriber(o.empty)
    }
}
function(e, t, n) {
    "use strict";
    var r = n(111) // Promise
      , i = n(1822) //
      , o = n(533)
      , a = n(706)
      , s = function() {
        function e(e) {
            this._isScalar = !1,
            e && (this._subscribe = e)
        }
        return e.prototype.lift = function(t) {
            var n = new e;
            return n.source = this,
            n.operator = t,
            n
        }
        ,
        e.prototype.subscribe = function(e, t, n) {
            var r = this.operator
              , o = i.toSubscriber(e, t, n);
            if (r ? r.call(o, this.source) : o.add(this.source || !o.syncErrorThrowable ? this._subscribe(o) : this._trySubscribe(o)),
            o.syncErrorThrowable && (o.syncErrorThrowable = !1,
            o.syncErrorThrown))
                throw o.syncErrorValue;
            return o
        }
        ,
        e.prototype._trySubscribe = function(e) {
            try {
                return this._subscribe(e)
            } catch (t) {
                e.syncErrorThrown = !0,
                e.syncErrorValue = t,
                e.error(t)
            }
        }
        ,
        e.prototype.forEach = function(e, t) {
            var n = this;
            if (t || (r.root.Rx && r.root.Rx.config && r.root.Rx.config.Promise ? t = r.root.Rx.config.Promise : r.root.Promise && (t = r.root.Promise)),
            !t)
                throw new Error("no Promise impl found");
            return new t(function(t, r) {
                var i;
                i = n.subscribe(function(t) {
                    if (i)
                        try {
                            e(t)
                        } catch (e) {
                            r(e),
                            i.unsubscribe()
                        }
                    else
                        e(t)
                }, r, t)
            }
            )
        }
        ,
        e.prototype._subscribe = function(e) {
            return this.source.subscribe(e)
        }
        ,
        e.prototype[o.observable] = function() {
            return this
        }
        ,
        e.prototype.pipe = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t - 0] = arguments[t];
            return 0 === e.length ? this : a.pipeFromArray(e)(this)
        }
        ,
        e.prototype.toPromise = function(e) {
            var t = this;
            if (e || (r.root.Rx && r.root.Rx.config && r.root.Rx.config.Promise ? e = r.root.Rx.config.Promise : r.root.Promise && (e = r.root.Promise)),
            !e)
                throw new Error("no Promise impl found");
            return new e(function(e, n) {
                var r;
                t.subscribe(function(e) {
                    return r = e
                }, function(e) {
                    return n(e)
                }, function() {
                    return e(r)
                })
            }
            )
        }
        ,
        e.create = function(t) {
            return new e(t)
        }
        ,
        e
    }();
    t.Observable = s
}
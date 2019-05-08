"function(e, t, n) {
    "use strict";
    var r = this && this.__extends || function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n]);
        function r() {
            this.constructor = e
        }
        e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype,
        new r)
    }
      , i = n(531)
      , o = n(98)
      , a = n(1097)
      , s = n(532)
      , u = function(e) {
        function t(t, n, r) {
            switch (e.call(this),
            this.syncErrorValue = null,
            this.syncErrorThrown = !1,
            this.syncErrorThrowable = !1,
            this.isStopped = !1,
            arguments.length) {
            case 0:
                this.destination = a.empty;
                break;
            case 1:
                if (!t) {
                    this.destination = a.empty;
                    break
                }
                if ("object" == typeof t) {
                    if (c(t)) {
                        var i = t[s.rxSubscriber]();
                        this.syncErrorThrowable = i.syncErrorThrowable,
                        this.destination = i,
                        i.add(this)
                    } else
                        this.syncErrorThrowable = !0,
                        this.destination = new l(this,t);
                    break
                }
            default:
                this.syncErrorThrowable = !0,
                this.destination = new l(this,t,n,r)
            }
        }
        return r(t, e),
        t.prototype[s.rxSubscriber] = function() {
            return this
        }
        ,
        t.create = function(e, n, r) {
            var i = new t(e,n,r);
            return i.syncErrorThrowable = !1,
            i
        }
        ,
        t.prototype.next = function(e) {
            this.isStopped || this._next(e)
        }
        ,
        t.prototype.error = function(e) {
            this.isStopped || (this.isStopped = !0,
            this._error(e))
        }
        ,
        t.prototype.complete = function() {
            this.isStopped || (this.isStopped = !0,
            this._complete())
        }
        ,
        t.prototype.unsubscribe = function() {
            this.closed || (this.isStopped = !0,
            e.prototype.unsubscribe.call(this))
        }
        ,
        t.prototype._next = function(e) {
            this.destination.next(e)
        }
        ,
        t.prototype._error = function(e) {
            this.destination.error(e),
            this.unsubscribe()
        }
        ,
        t.prototype._complete = function() {
            this.destination.complete(),
            this.unsubscribe()
        }
        ,
        t.prototype._unsubscribeAndRecycle = function() {
            var e = this._parent
              , t = this._parents;
            return this._parent = null,
            this._parents = null,
            this.unsubscribe(),
            this.closed = !1,
            this.isStopped = !1,
            this._parent = e,
            this._parents = t,
            this
        }
        ,
        t
    }(o.Subscription);
    t.Subscriber = u;
    var l = function(e) {
        function t(t, n, r, o) {
            var s;
            e.call(this),
            this._parentSubscriber = t;
            var u = this;
            i.isFunction(n) ? s = n : n && (s = n.next,
            r = n.error,
            o = n.complete,
            n !== a.empty && (u = Object.create(n),
            i.isFunction(u.unsubscribe) && this.add(u.unsubscribe.bind(u)),
            u.unsubscribe = this.unsubscribe.bind(this))),
            this._context = u,
            this._next = s,
            this._error = r,
            this._complete = o
        }
        return r(t, e),
        t.prototype.next = function(e) {
            if (!this.isStopped && this._next) {
                var t = this._parentSubscriber;
                t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe() : this.__tryOrUnsub(this._next, e)
            }
        }
        ,
        t.prototype.error = function(e) {
            if (!this.isStopped) {
                var t = this._parentSubscriber;
                if (this._error)
                    t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, e),
                    this.unsubscribe()) : (this.__tryOrUnsub(this._error, e),
                    this.unsubscribe());
                else {
                    if (!t.syncErrorThrowable)
                        throw this.unsubscribe(),
                        e;
                    t.syncErrorValue = e,
                    t.syncErrorThrown = !0,
                    this.unsubscribe()
                }
            }
        }
        ,
        t.prototype.complete = function() {
            var e = this;
            if (!this.isStopped) {
                var t = this._parentSubscriber;
                if (this._complete) {
                    var n = function() {
                        return e._complete.call(e._context)
                    };
                    t.syncErrorThrowable ? (this.__tryOrSetError(t, n),
                    this.unsubscribe()) : (this.__tryOrUnsub(n),
                    this.unsubscribe())
                } else
                    this.unsubscribe()
            }
        }
        ,
        t.prototype.__tryOrUnsub = function(e, t) {
            try {
                e.call(this._context, t)
            } catch (e) {
                throw this.unsubscribe(),
                e
            }
        }
        ,
        t.prototype.__tryOrSetError = function(e, t, n) {
            try {
                t.call(this._context, n)
            } catch (t) {
                return e.syncErrorValue = t,
                e.syncErrorThrown = !0,
                !0
            }
            return !1
        }
        ,
        t.prototype._unsubscribe = function() {
            var e = this._parentSubscriber;
            this._context = null,
            this._parentSubscriber = null,
            e.unsubscribe()
        }
        ,
        t
    }(u);
    function c(e) {
        return e instanceof u || "syncErrorThrowable"in e && e[s.rxSubscriber]
    }
}"
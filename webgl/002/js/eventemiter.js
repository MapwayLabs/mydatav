export default class EventEmiter {
    constructor() {
        this._events = {};
    }

    on(event, cb, context) {
        context = context || this;
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                this.on(event[i], cb, context);
            }
        } else {
            (this._events[event] || (this._events[event] = [])).push({
                callback: cb,
                context: context
            });
        }
        return this;
    }

    once(event, cb, context) {
        context = context || this;
        var self = this;

        function on() {
            self.off(event, cb, context);
            cb.apply(context, arguments);
        }
        on.fn = cb;
        this.on(event, on, context);
        return this;
    }

    off(event, cb, context) {
        context = context || this;
        if (!arguments.length) {
            this._events = Object.create(null);
            return this;
        }
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                this.off(event[i], cb, context);
            }
            return this;
        }
        if (!cb) {
            this._events[event] = null;
            return this;
        }
        if (cb) {
            let cbs = this._events[event];
            let i = cbs.length;
            while (i--) {
                if ((cb === cbs[i].callback || cb === cbs[i].fn) && context === cbs[i].context) {
                    cbs.splice(i, 1);
                    break;
                }
            }
            return this;
        }
    }

    emit(event) {
        let cbs = this._events[event];
        let args = Array.prototype.slice.call(arguments, 1);
        if (cbs) {
            for (let i = 0, l = cbs.length; i < l; i++) {
                cbs[i].callback.apply(cbs[i].context || this, args);
            }
        }
    }
}
function Queue() {
    this._queue = [];
    this.head = null;
    this.trail = null;
}

Queue.prototype = {
    constructor: Queue,

    enQueue: function(value) {
        this._queue.push(value);
        if (this.head == null) {
            this.head = 0;
        }
        this.trail = this._queue.length - 1;
        return this;
    },

    deQueue: function() {
        this._queue.shift();
        if (!this._queue.length) {
            this.head = this.trail = null;
        } else {
            this.trail = this._queue.length - 1;
        }
        return this;
    },

    getHead: function() {
        if (this.head != null) {
            return this._queue[this.head];
        }
    },

    getTrail: function() {
        if (this.trail != null) {
            return this._queue[this.trail];
        }
    },

    getLength: function() {
        return this._queue.length;
    },

    print: function() {
        return this._queue.join(',');
    }
}
function Stack() {
    this._stack = [];
}

Stack.prototype = {
    constructor: Stack,

    push: function(value) {
        this._stack.push(value);
        return this;
    },

    pop: function() {
        return this._stack.pop();
    },

    print: function() {
        return this._stack.toString();
    }
}

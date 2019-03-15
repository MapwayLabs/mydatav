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
    
    // 取栈顶
    peek: function() {
        if (this._stack.length) {
            return this._stack[this._stack.length - 1];
        }
    },

    print: function() {
        return this._stack.toString();
    }
}

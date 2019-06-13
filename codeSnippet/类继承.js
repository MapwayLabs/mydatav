function ParentClass() {}

function ChildClass() {
    ParentClass.call(this, arguments);
}

ChildClass.prototype = Object.assign( Object.create( ParentClass.prototype ), {
    constructor: ChildClass,
    funcA: function() {},
    funcB: function() {}
});
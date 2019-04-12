// 比较类，用于比较任意两个对象
function Comparator (compare) {
    this.compare = compare || function(a, b) {
        if (a === b) return 0;
        return a < b ? -1 : 1;
    }
    this.equal = function(a, b) {
        return this.compare(a, b) === 0;
    }
    this.lessThan = function(a, b) {
        return this.compare(a, b) < 0;
    }
    this.greaterThan = function(a, b) {
        return this.compare(a, b) > 0;
    }
    this.lessThanOrEqual = function(a, b) {
        return this.lessThan(a, b) || this.equal(a, b);
    }
    this.greaterThanOrEqual = function(a, b) {
        return this.greaterThan(a, b) || this.equal(a, b);
    }
    this.reverse = function() {
        const comparatorOrigin = this.compare;
        this.compare = (a, b) => comparatorOrigin(b, a);
    }
}
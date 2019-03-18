const defaultHashTableSize = 32;
function HashTable(hashTableSize = defaultHashTableSize) {
    this.buckets = new Array(hashTableSize).fill(null).map(() => new LinkList());
    this.keys = {};
}

HashTable.prototype = {
    constructor: HashTable,

    hash: function(key) {
        const hash = Array.from(key).reduce((hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),0);
        return hash % this.buckets.length;
    },
    set: function(key, value) {
        const keyHash = this.hash(key);
        this.keys[key] = keyHash;
        const bucketLinkedList = this.buckets[keyHash];
        
    },
    delete: function(key) {},
    get: function(key) {},
    has: function(key) {},
    getKeys: function() {}
}
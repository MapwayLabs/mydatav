const defaultHashTableSize = 32;
function HashTable(hashTableSize = defaultHashTableSize) {
    this.buckets = new Array(hashTableSize).fill(null).map(() => new Array());
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
        const bucketList = this.buckets[keyHash];
        const node = bucketList.find(item => item.key === key);

        if (!node) {
            bucketList.push({key: key, value: value});
        } else {
            node.value = value;
        }
        return this;
    },
    delete: function(key) {
        const keyHash = this.hash(key);
        delete this.keys[key];
        const bucketList = this.buckets[keyHash];
        const nodeIndex = bucketList.findIndex(item => item.key === key);

        if (~nodeIndex) {
            bucketList.splice(nodeIndex, 1);
        }
        return this;
    },
    get: function(key) {
        const keyHash = this.hash(key);
        const bucketList = this.buckets[keyHash];
        const node = bucketList && bucketList.find(item => item.key === key);
        if (node) return node.value;
    },
    has: function(key) {
        return Object.prototype.hasOwnProperty.call(this.keys, key);
    },
    getKeys: function() {
        return Object.keys(this.keys);
    },
    print: function() {
        return JSON.stringify(this.buckets);
    }
}
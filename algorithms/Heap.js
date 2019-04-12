// 堆数据结构

function Heap() {
    this.heapContainer = [];
}
Heap.prototype = {
    constructor: Heap,
    getLeftChildIndex: function(parentIndex) {},
    getLeftChildIndex: function(parentIndex) {},
    getParentIndex: function(childIndex) {},
    hasParent: function(childIndex) {},
    hasLeftChild: function(parentIndex) {},
    hasRightChild: function(parentIndex) {},
    leftChild: function(parentIndex) {},
    rightChild: function(parentIndex) {},
    parent: function(childIndex) {},
    swap: function(indexOne, indexTwo) {},
    peek: function() {},
    poll: function() {},
    add: function(item) {},
    remove: function(item, comparator) {},
    find: function(item, comparator) {},
    isEmpty: function() {},
    toString: function() {},
    heapifyUp: function(customStartIndex) {},
    heapifyDown: function(customStartIndex) {},
    pairIsInCorrectOrder: function(firstElement, secondElement) {}
};
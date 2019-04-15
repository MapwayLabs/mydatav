// 堆数据结构
function Heap(comparatorFunction) {
    this.heapContainer = [];
    this.compare = new Comparator(comparatorFunction);
}
Heap.prototype = {
    constructor: Heap,
    getLeftChildIndex: function(parentIndex) {
        return ( 2 * parentIndex ) + 1;
    },
    getRightChildIndex: function(parentIndex) {
        return ( 2 * parentIndex ) + 2;
    },
    getParentIndex: function(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    },
    hasParent: function(childIndex) {
        return this.getParentIndex(childIndex) >= 0;
    },
    hasLeftChild: function(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    },
    hasRightChild: function(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    },
    leftChild: function(parentIndex) {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    },
    rightChild: function(parentIndex) {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    },
    parent: function(childIndex) {
        return this.heapContainer[this.getParentIndex(childIndex)];
    },
    swap: function(indexOne, indexTwo) {
        const tmp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    },
    peek: function() {
        if (this.heapContainer.length) {
            return this.heapContainer[0];
        }
    },
    poll: function() {
        if (this.heapContainer.length === 0) return null;
        if (this.heapContainer.length === 1) return this.heapContainer.pop();
        const item = this.heapContainer[0];
        // Move the last element from the end to the head.
        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown();
        return item;
    },
    add: function(item) {
        this.heapContainer.push(item);
        this.heapifyUp();
        return this;
    },
    remove: function(item, comparator = this.compare) {
        const numberOfItemsToRemove = this.find(item, comparator).length;

        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration++) {
            const indexToRemove = this.find(item, comparator).pop();

            if (indexToRemove === (this.heapContainer.length - 1)) {
                this.heapContainer.pop();
            } else {
                this.heapContainer[indexToRemove] = this.heapContainer.pop();
                const parentItem = this.parent(indexToRemove);
                if (this.hasLeftChild(indexToRemove)
                && (!parentItem || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove]))) {
                    this.heapifyDown(indexToRemove);
                } else {
                    this.heapifyUp(indexToRemove);
                }
            }
        }
        return this;
    },
    find: function(item, comparator = this.compare) {
        const foundItemIndices = [];

        for(let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex++) {
            if (comparator.equal(item, this.heapContainer[itemIndex])) {
                foundItemIndices.push(itemIndex);
            }
        }

        return foundItemIndices;
    },
    isEmpty: function() {
        return !this.heapContainer.length;
    },
    toString: function() {
        return this.heapContainer.toString();
    },
    heapifyUp: function(customStartIndex) {
        let currentIndex = customStartIndex || this.heapContainer.length - 1;

        while(this.hasParent(currentIndex)
        && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    },
    heapifyDown: function(customStartIndex) {
        let currentIndex = customStartIndex;
        let nextIndex = null;

        while(this.hasLeftChild(currentIndex)) {
            if (this.hasRightChild(currentIndex)
            && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if (this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    },
    pairIsInCorrectOrder: function(firstElement, secondElement) {
        
    }
};
function Node(value) {
    this.value = value;
    this.next = null;
}

function LinkList(headNode) {
    this.head = headNode;
    this.trail = this.head;
}

LinkList.prototype = {
    constructor: LinkList,

    //增
    // 尾部插入
    append: function (value) {
        const node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.trail = node;
        } else {
            this.trail.next = node;
            this.trail = node;
        }
        return this;
    },
    // 头部插入
    prePend: function (value) {
        const node = new Node(value);
        node.next = this.head;
        this.head = node;
        if (!this.trail) {
            this.trail = node;
        }
        return this;
    },

    // 删
    remove: function (value) {
        let pren = null;
        let n = this.head;
        while (n.value !== value) {
            if (n.next) {
                pren = n;
                n = n.next;
            }
        }
        if (n) {
            if (n === this.head) {
                this.head = n.next;
                n.next = null;
            } else if (n === this.trail) {
                this.trail = pren;
                pren.next = null;
            } else {
                pren.next = n.next;
                n.next = null;
            }
        }
        return this;
    },

    // 查
    contains: function (value) {
        let n = this.head;
        while (n && n.value !== value) { // 注意必须判断 n 存在，避免报错和死循环
            n = n.next;
        }
        return !!n;
    },

    // 遍历
    traverse: function () {
        let n = this.head;
        while (n) {
            console.log(n.value);
            n = n.next;
        }
        return this;
    },
    reverseTraversal: function () {
        if (this.trail) {
            let current = this.trail;
            let prev;
            while (current !== this.head) {
                prev = this.head;
                while (prev.next !== current) {
                    prev = prev.next;
                }
                console.log(current.value);
                current = prev;
            }
            console.log(current.value); // 输出头部，别遗漏
        }
        return this;
    },

    // 打印
    print: function () {
        let n = this.head;
        let arr = [];
        while (n) {
            arr.push(n.value);
            n = n.next;
        }
        return arr.join(',');
    }
};
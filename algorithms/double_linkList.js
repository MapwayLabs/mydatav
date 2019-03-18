function Node(value) {
    this.prev = null;
    this.next = null;
    this.value = value;
}

function DoubleLinkList() {
    this.head = this.trail = null;
}

DoubleLinkList.prototype = {
    constructor: DoubleLinkList,
    add(value) {
        const n = new Node(value);
        if (!this.head) {
            this.head = this.trail = n;
        } else {
            this.trail.next = n;
            n.prev = this.trail;
            this.trail = n;
        }
        return this;
    },
    remove(value) {
        let n = this.head;
        while(n && n.value !== value) {
            n = n.next;
        }
        if (!n) return this;
        if (n === this.head) {
            if (this.head.next) {
                this.head.next.prev = null;
                this.head = n.next;
                n.next = null;
            } else {
                this.head = this.trail = null;
            }
        } else if (n === this.trail) {
            if (this.trail.prev) {
                this.trail.prev.next = null;
                this.trail = n.prev;
                n.prev = null;
            } else {
                this.head = this.trail = null;
            }
        } else {
            let n1 = n.prev;
            let n2 = n.next;
            n1.next = n2;
            n.prev = null;
            n2.prev = n1;
            n.next = null;
        }
        return this;
    },
    traverse() {
        let n = this.head;
        while(n) {
            console.log(n.value);
            n = n.next;
        }
        return this;
    },
    print() {
        let arr = [];
        let n = this.head;
        while(n) {
            arr.push(n.value);
            n = n.next;
        }
        return arr.join(',');
    }
}
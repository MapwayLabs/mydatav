var o = {
    a: {
        b: 9,
        c: 10
    },
    d: 2,
    E: {
        t: "a"
    }
};
var r = {},
    q = [{
        d: o,
        parent: r
    }];
while (q.length) {
    var node = q.pop(),
        k = node.k,
        ob = node.d,
        parent = node.parent;
    if (typeof k !== "undefined") parent = parent[k] = {};
    for (k in ob) {
        if (({}).toString.call(ob[k]) === "[object Object]") {
            q.push({
                d: ob[k],
                k: k,
                parent: parent
            });
        } else parent[k] = ob[k];
    }
};
r;
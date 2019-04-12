// 用向量理解
// |AC| = t|AB|
function partN (a, b, t) {
    return {
        x: t * b.x + (1-t) * a.x,
        y: t * b.y + (1-t) * a.y
    };
}
// 用向量理解，共线向量倍数关系
// |AC| = t|AB|
function partN (a, b, t) {
    return {
        x: t * b.x + (1-t) * a.x,
        y: t * b.y + (1-t) * a.y
    };
}
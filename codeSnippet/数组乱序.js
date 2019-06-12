/**
 * 传统做法
 * 并不随机，原因：
 * V8采用插入排序（小于10个元素时）和快速排序（大于10个时），并不能保证每个元素都能与其他的两两比较
 */
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/**
 * 最佳做法
 * https://juejin.im/post/5d004ad95188257c6b518056
 */
 function shuffle(arr) {
    var j = arr.length;
    while(j > 1) {
        var index = Math.floor(Math.random() * j--);
        [arr[j], arr[index]] = [arr[index], arr[j]];
    }
    return arr;
 }
// 判断一个数是不是 2 的幂
function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
}


 // 检查每个维度是否是 2 的幂
 if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
    // 是 2 的幂，一般用贴图
    gl.generateMipmap(gl.TEXTURE_2D);
 } else {
    // 不是 2 的幂，关闭贴图并设置包裹模式为到边缘
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
 }
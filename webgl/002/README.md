1. https://www.khronos.org/webgl/wiki/HandlingContextLost

2. 元素不可见时，停止requestanimationframe循环（懒加载）

切换行政级别？？？
台湾、南海？？？

### 底图图片
图片尺寸: 2^n * 2^n
映射模式: mapping
包裹模式: 水平方向，垂直方向
采样: 放大、缩小


示例：https://threejs.org/examples/?q=texture#webgl_materials_texture_rotation

offset: 纹理在单次重复时，从一开始将分别在U、V方向上偏移多少。 这个值的范围通常在0.0之间1.0。 
repeat: 重复次数 （>=1）
rotation: 旋转度数 (单位为弧度（rad）。正值为逆时针方向旋转，默认值为0)
center: 旋转中心点。(0.5, 0.5)对应纹理的正中心。默认值为(0,0)，即左下角。


请注意：纹理中图像的平铺，仅有当图像大小（以像素为单位）为2的幂（2、4、8、16、32、64、128、256、512、1024、2048、……）时才起作用。 宽度、高度无需相等，但每个维度的长度必须都是2的幂。 这是WebGL中的限制，不是由three.js所限制的。

### 纹理贴图
https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-3d-textures.html

### renderOrder
https://stackoverflow.com/questions/12666570/how-to-change-the-zorder-of-object-with-threejs/12666937#12666937

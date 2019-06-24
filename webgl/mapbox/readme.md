# mapbox

## 基础组件

* 放大\缩小
* 比例尺
* 定位
* 测量量算
* 绘制
* 空间分析

## 优缺点

优点：

* 自定义地图，可以应用自己的样式到地图
* 对移动端比较友好
* 直接用gl原生接口绘图：[customlayerinterface](https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface)

缺点：

* 样式和地图都是默认在线的，本地化、离线化困难（需自定义style文件）
* 坐标系支持：目前只有web墨卡托和wgs84（加载国内地图，如百度、腾讯有偏移）

## refer

* [Mapbox 中国](https://www.mapbox.cn/mapbox-gl-js/api/)
* [Mapbox GL JS本地化实践](https://www.jianshu.com/p/693f38ec5730)

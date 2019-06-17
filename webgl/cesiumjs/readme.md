# cesium

## Adding Imagery

Supported Imagery Formats:

- WMS
- TMS
- WMTS (with time dynamic imagery)
- ArcGIS
- Bing Maps
- Google Earth
- Mapbox
- Open Street Map

By default, Cesium uses Bing Maps for imagery.

## Adding Terrain

Supported Terrain Formats:

- Quantized-mesh, an open format developed by the Cesium team
- Heightmap
- Google Earth Enterprise

## Loading and Styling Entities

Cesium supports popular vector formats GeoJson and KML

## 3D Tiles

Using a technique conceptually similar to Cesium’s terrain and imagery streaming, 3D
Tiles make it possible to view gigantic models, including `buildings datasets`, `CAD (or BIM) models`, `point clouds`, and `photogrammetry models`, which would otherwise be
impossible to view interactively.

## 缺点：

- 跟商业3DGIS软件对比，比如skyline，cesium三维分析功能较弱， cesium官网关于三维分析的例子难以找到（需要自己底层去实现），大多是以展示数据以及渲染数据为主的例子；

- 尚未提供交互式标绘工具Draw接口，2DGIS一般都是提供Draw工具的，比如arcgis api以及openlayer api；cesium想要绘制点、线、面，只能通过代码来绘制，貌似不能在线手动画；

- 没有地图量算工具、地图比例尺、拉框缩放等，这些地图基本工具，在cesium都需要自己来写实现。


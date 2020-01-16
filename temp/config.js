const config = {
  /** 是否使用自定义地图。
  * 默认值：false，即使用系统自带的百度地图，此时下面所有配置失效。
  * 当设置为 true 时，则使用其他厂商提供的地图，需要提供下面的额外配置。
  */
  USE_CUSTOM_MAP: false, 
  /** 地图坐标类型。
   * 默认值：'bd09ll'，可选值：bd09ll(对应经纬度坐标) | bd09mc(对应墨卡托坐标)。
   */
  MAP_COORDTYPE: 'bd09ll',
  /** 自定义坐标系，必选。
   * 如果值是字符串，则可选值为："EPSG3395", "EPSG3857", "EPSG4326", "Earth", "Simple"
   * 如果值是对象，则如下示例：
   * 参照此网站：https://github.com/kartena/Proj4Leaflet
   * {
   *   code: 'EPSG:3006', // 坐标系名
   *   // proj4定义，可以从 https://spatialreference.org/ 网站搜索
   *   proj4def: '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
   *   options: {
   *    origin: [218128.7031, 6126002.9379],
   *    resolutions: [8192, 4096, 2048]
   *   }
   * }
   */
  CUSTOM_CRS: 'EPSG4326',
  /** 定义地图中心点，必选（中心点必须在要显示的区域内才能看到最终地图）
   *  lng - 经度
   *  lat - 纬度
   */
  DEFAULT_CENTER: { lng: 110, lat: 35 },
  /** 地图初始级别，必选
   * 一般选 0 - 18 级
   */
  DEFAULT_ZOOM: 6,
  // 最小级别，地图最小能缩放的级别，可选。
  MIN_ZOOM: 0,
  // 最大级别，地图最大缩放的级别，可选。
  MAX_ZOOM: 18,
  // 深色主题的地图，如果是相同的，则配置成一样，必选。
  DARK_LAYERS: [
    { 
      /** 地图服务地址，{x},{y},{z} 分别代表行号、列号和级别
       * 不同类型的服务编码规则不同
       */
      url: "http://10.75.128.103:7001/PGIS_S_TileMapServer_Tl/Maps/SL/EzMap?Service=getImage&Type=RGB&ZoomOffset=1&Col={x}&Row={y}&Zoom={z}&V=1.0.0",
      /** 配置，可选；
       * 需要根据不同服务类型更改配置，详细配置可参照：https://leafletjs.com/reference-1.0.0.html#tilelayer
       */
      options: {
        minZoom: 0, // 最小级别，可选，默认为 0。
        maxZoom: 18, // 最大级别，可选，默认为 18。
        subdomains: 'abc', //切片服务的子域。可以以一个字符串（其中每个字母是一个子域名）或字符串数​​组的形式传递。可选，默认值：'abc'。
        errorTileUrl: '', // 加载失败的瓦片的替代图片地址。可选，默认为 ’‘。
        zoomOffset: 0, // 缩放偏移量，可选，默认为 0。
        tms: false, // 如果为true，则反转图块的Y轴编号(为TMS服务启用此功能）,可选，默认为 false。
        zoomReverse: false, // 如果设置为true，则将颠倒缩放级别（新的zoom为maxZoom-zoom），可选，默认为 false。
        tileSize: 256 // 切片大小，可选，默认为 256 像素。
      }
    }
  ],
  // 白色主题地图，如果相同，则同 DARK_LAYERS， 必选。
  LIGHT_LAYERS: [],
  /**
   * 地图服务类型，可选，默认 undefined
   * "ARCGIS" -- 对应 arcgis server 服务
   * "SUPERMAP" -- 对应 supermap 服务
   */
  MAP_TYPE: undefined,
  /** 是否支持多图层，可选，默认为 false
   * 如果为 ture， 则 DARK_LAYERS，LIGHT_LAYERS 可配置多个对象
   */
  MAP_MULTI_LAYER: false,
  /** 滤镜效果是否关闭，可选，默认为 false，即默认开启
   * 有些地图显示成黑白的时候注意设置此参数关闭滤镜就可以显示原图
   */
  MAP_NON_FILTER: false
}
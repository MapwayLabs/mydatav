# [deck.gl](https://deck.gl) & [kepler.gl](https://kepler.gl) 图层整合到mapbox

## 项目运行

基于 vuecli3.0 构建

```bash
npm i
npm run serve
```

## 常量定义

详见 `config.js` 文件

## 格式规范

```js
// 所有图层公共配置
const CommonConfig = {
  id: '图层唯一id',
  data: [], // 图层数据，传参时merge进来
  name: '图层名称',
  // 图层样式配置
  visConfig: { 
    isVisible: true, // 图层是否可见
    opacity: 1, // 图层透明度，0-1
  },
  // 交互配置
  interactionConfig: {
    tooltip: { // 信息气泡
      id: 'tooltip',
      enabled: false,
      config: {
        style: { fontSize: '14px', color:'#f00' }, // css样式
        triggerType: 'hover', // 触发方式， 'hover' | 'click'
        displayField: [], //显示字段，对象数组 [{name: '字段名（必选）', type:'字段类型（可选）' ... }]
      }
    }
  }
};

// 图层特定配置
const ChartConfig = 
{
  /****************点类型*********************/
  "C1": {},
  // 散点
  "C101": {
    visConfig: {
      pointType: 'scatter', // 'scatter' or 'bubble'  点类型：散点或气泡类型
      iconType: 'vector', //  'vector' or 'icon' 图标类型：矢量或图标
      iconName: 'airport-11', // 图标名称
      fillType: 'single', // 'single' or mutiple 填充类型：单色或多色
      fillColorField: null, // 填充颜色字段名
      fillColorFieldType: ALL_FIELD_TYPES.integer, // 字段类型
      fillColor: ['#f00'], // 填充颜色,单色数组传一个值，多色数组传多个值
      strokeColor: "#000", // 轮廓颜色
      strokeWidth: 1, // 轮廓宽度
      radius: 10 // 点尺寸
    }
  },
  // 气泡
  "C102": {
    visConfig: {
      pointType: 'bubble', // 'scatter' or 'bubble'  点类型：散点或气泡类型
      fillType: 'single', // 'single' or mutiple 填充类型：单色或多色
      fillColor: ['#f00'], // 填充颜色,单色数组传一个值，多色数组传多个值
      strokeColor: "#000", // 轮廓颜色
      strokeWidth: 1, // 轮廓宽度
      sizeField: null, // 尺寸基于字段名
      sizeFieldType: ALL_FIELD_TYPES.integer, // 尺寸字段类型
      sizeRange: [1, 10] // [最小半径, 最大半径]
    }
  },

  /****************热力类型*********************/
  "C2": {},
  // 基础热力
  "C201": {
    visConfig: {
      heatMapType: 'basic', // 热力图类型：'basic' | 'grid' | 'hexagon' | 'district' | 'heat3d'
      weightField: null, // 热度基于字段名
      weightFieldType: ALL_FIELD_TYPES.real, // 字段类型
      colorRange: ["#5A1846", "#900C3F", "#C70039"], // 热力颜色
      radius: 30, // 热力半径（basic单位：pixels, grid单位：meters）
    }
  },
  // 四边形热力
  "C202": {
    visConfig: {
      heatMapType: 'grid', // 热力图类型：'basic' | 'grid' | 'hexagon' | 'district' | '3d'
      weightField: null, // 热度基于字段名
      weightFieldType: ALL_FIELD_TYPES.real, // 字段类型
      colorRange: ["#5A1846", "#900C3F", "#C70039"], // 热力颜色
      radius: 30, // 热力半径（basic单位：pixels, grid单位：meters）
      aggregationType: 'count', // 聚合类型：'count' | 'average' | 'maximum' | 'minimum' | 'median' | 'sum'
      sizeUnit: 'meters' // 尺寸单位： 'pixels' | 'meters'
    }
  },
  // 六边形热力
  "C203": {
    visConfig: {
      heatMapType: 'hexagon', // 热力图类型：'basic' | 'grid' | 'hexagon' | 'district' | '3d'
      weightField: null, // 热度基于字段名
      weightFieldType: ALL_FIELD_TYPES.real, // 字段类型
      colorRange: ["#5A1846", "#900C3F", "#C70039"], // 热力颜色
      radius: 30, // 热力半径（basic单位：pixels, grid单位：meters）
      aggregationType: 'count', // 聚合类型：'count' | 'average' | 'maximum' | 'minimum' | 'median' | 'sum'
      sizeUnit: 'meters' // 尺寸单位： 'pixels' | 'meters'
    }
  },
  // 行政区热力
  "C204": {
    visConfig: {
      heatMapType: 'district', // 热力图类型：'basic' | 'grid' | 'hexagon' | 'district' | '3d'
      weightField: null, // 热度基于字段名
      weightFieldType: ALL_FIELD_TYPES.real, // 字段类型
      colorRange: ["#5A1846", "#900C3F", "#C70039"], // 热力颜色
      aggregationType: 'count', // 聚合类型：'count' | 'average' | 'maximum' | 'minimum' | 'median' | 'sum'      
      strokeColor: '#f00',
      strokeWidth: 1,
      regionCode: '100000' // 行政区代码
    }
  },

  /****************线类型*********************/
  "C3": {},
  // 折线
  "C301": {},
  // 弧线
  "C302": {},

  /****************面类型*********************/
  "C4": {},

  /****************其他类型*********************/
  "C5": {}
};

```

## 所有数据格式
```js
const treeData = {
    dataSets:[/*数据列表*/],
    layers: [/*图层列表，图层描述信息（可根据图层id到dataSets取数据）*/],
    mapState: {/*地图状态配置信息 */},
    toolConfig: {/*工具箱配置信息（可根据图层id获取到对应图层的工具） */},
    baseMap:{/*底图配置信息*/}
}
```
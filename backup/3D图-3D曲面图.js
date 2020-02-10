// 基础配置区
var config = {
  libSrc: chart.info.resourceUrl[0],
  style: {
    // 浅色主题样式
    'default': {
      color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],  // 曲面的渐变颜色
      colorAlpha: 0.75,  // 曲面的渐变颜色透明度
      gridLineColor: '#ccc', // 网格线的颜色
      axisLabelColor: '#222', // 坐标轴文字颜色
      pointerLineColor: '#5182E4', // 鼠标悬浮时指示线的颜色
    },
    
    // 深色主题样式
    'dark': {
      color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],  // 曲面的渐变颜色
      colorAlpha: 0.8,  // 曲面的渐变颜色透明度
      gridLineColor: '#ccc', // 网格线的颜色
      axisLabelColor: '#ccc', // 坐标轴文字颜色
      pointerLineColor: '#5182E4', // 鼠标悬浮时指示线的颜色
    }
  }
};

// 常量定义区

// 变量定义区
var container = $('.chart-box');

// css处理区

// 数据处理区
var rowMap = {}
var getData = function() {
  var result = [];
  // your code
  if(chart.views.length) {
    var data = chart.views[0].data;
    var xy = data.x.concat(data.y);
    if (xy.length >= 3) {
      for(var i = 0, len = xy[0].data.length; i < len; i++) {
        var row = [];
        data.x.forEach(function(x) {
          row.push(x.data[i]);
        });
        rowMap[row.join("-")] = row;
        data.y.forEach(function(y) {
          row.push(+y.data[i]);
        });
        result.push(row);
      }
    }
  }
  return result;
};

// 基础方法定义区
var handle = function() {
  console.log(chart.theme);
  var style = config.style[chart.theme];
  var data = getData();
  
  var values = data.map(function(item) { return item[2];});
  var min = Math.min.apply(null, values);
  var max = Math.max.apply(null, values);
  var firstItem = data[0];
  var cfg = {};
  cfg.visualMap = {
    show: false,
    min: min,
    max: max,
    inRange: {
      color: style.color,
      colorAlpha: style.colorAlpha,
    },
    dimension: 2,
  } 

  var axisMap = {
    "0": 'xAxis3D',
    "1": 'yAxis3D',
    "2": 'zAxis3D',
  };
  for(var i = 0; i < 3; i++) {
    if (typeof firstItem[i] == 'string') {
      var categories = [];
      data.forEach(function(item) {
        if (categories.indexOf(item[i]) < 0) {
          categories.push(item[i]);
        }
        item[i] = categories.indexOf(item[i]);
      });
      
      cfg[axisMap[i]] = {
        type: 'category',
        data: categories
      }
      
    } else {
      cfg[axisMap[i]] = {
        type: 'value'
      }
    }
    cfg[axisMap[i]].nameTextStyle = {
      color: style.axisLabelColor,
      borderColor: [0, 0, 0, 0]
    }
  }
  
  var newData = [];
  for(var yIdx = cfg.yAxis3D.data.length; yIdx > 0; yIdx--) {
    var y = cfg.yAxis3D.data[yIdx];
    cfg.xAxis3D.data.forEach(function(x, xIdx) {
      var row = rowMap[x + "-" + y];
      if (!row) {
        row = [xIdx, yIdx, 0];
      }
      newData.push(row);
    });
  }
  
  data= newData;
  
  cfg.zAxis3D.min = min;
  cfg.zAxis3D.max = max;
  
  var autoRotate = false;
  var option = {
      tooltip: {
          formatter: function(params) {
            var data = params.data;
            var x = cfg.xAxis3D.data[data[0]];
            var y = cfg.yAxis3D.data[data[1]];
            return "X: " + x + "<br>Y: " + y + "<br>Z: " + data[2];
          }
        
      },
      grid3D: {
          axisLine: {
              lineStyle: { 
                width: 1,
                color: style.gridLineColor 
              }
          },
          axisLabel: {
            textStyle: {
              color: style.axisLabelColor,
              textShadow: 'none',
              borderColor: 'red',
              borderWidth: 0,
            }
          },
          splitLine: {
              lineStyle: { 
                width: 1,
                color: style.gridLineColor 
              }
          },
          axisPointer: {
              label: {show: false},
              lineStyle: { color: style.pointerLineColor }
          },
          viewControl: {
              //alpha: 10,
              //beta: 40,
              autoRotate: autoRotate,
              autoRotateAfterStill: 1000000000000,  // 设置一个很大的值，确保操作后不会再次自动旋转
          }
      },
      series: [{
          type: 'surface',
          wireframe: {
              show: false
          },
          shading: 'color',
          data: data,
          itemStyle: {
            color: 'red',
          },
          emphasis: {
            label: {
              show: false,
            }
          }
      }]
  };

  $.extend(true, option, cfg);
  var myChart = echarts.init(container.get(0));
  myChart.setOption(option);
  //console.log(option);
  // 双击切换自动宣钻
  container.on("dblclick", function() {
    autoRotate = !autoRotate;
    $.extend(true, option, {
      grid3D:{
        viewControl: {
          autoRotate: autoRotate
        }
      }
    });
    myChart.setOption(option);
  })
}



// 启动方法定义区
var init = function() {
    config.libSrc.indexOf('http') > -1
      ? thirdPluginLoader({
        libSrc: config.libSrc,
        initFun: handle,
        libId: window.echarts
      }) 
      : handle();
  
};
// 启动区
init();
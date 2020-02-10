Array.prototype.max = function(){ 
  return Math.max.apply({},this) 
}
// 基础配置区
var config = {
libSrc: chart.info.resourceUrl[0],
style: {
  default: {
    baseTextColor: '#999', // 坐标字体颜色
    axisLineColor: 'rgba(0, 0, 0, .1)', // 网格指示线的颜色
    axisPointerLineColor: 'rgba(0, 0, 0, .3)', // 鼠标悬浮时指示线的颜色
    columnarHoverBg: '#ff6432' // 鼠标移入柱子颜色
  },
  dark: {
    baseTextColor: '#eee',
    axisLineColor: 'rgba(0, 0, 0, .1)', // 网格指示线的颜色
    axisPointerLineColor: 'yellow',  // 鼠标悬浮时指示线的颜色
    columnarHoverBg: '#ff6432' // 鼠标移入柱子颜色
  }
}
};

// 常量定义区
var HOURS = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
var DAYS = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
function unique(arr) {
var result = [], hash = {};
for (var i = 0, elem; (elem = arr[i]) != null; i++) {
  if (!hash[elem]) {
    result.push(elem);
    hash[elem] = true;
  }
}
return result;
}
DAYS = unique(chart.views[0].data.x[0].data);
HOURS = unique(chart.views[0].data.x[1].data);
var max = 20;
var xName = 'X';
var yName = 'Y';
var xName = 'Z';
// 变量定义区
var container = $('.chart-box');

// css处理区

// 数据处理区
var getData = function() {
  var result = [];
  var views  = chart.views || [];
  var data = views[0] ? views[0].data : [];
  var xData = data.x;
  var yData = data.y[0].data;
  max = yData.max();
  xName = xData[1].nick_name || xData[1].name;
  yName = xData[0].nick_name || xData[0].name;
  zName = data.y[0].nick_name || data.y[0].name;
  var len = xData[0].data.length;
  for (var i = 0; i < len; i++) {
    var obj = [];
    for (var x = 0; x < xData.length; x++) {
      var item = xData[x];
      obj[x] = item.data[i];
    }
    obj[2] = yData[i];
    result.push(obj);
  }
  return result;
};

// 基础方法定义区
var getOption = function(data) {
var style = config.style[chart.theme];
var textColor = style.baseTextColor;
var axisLineColor = style.axisLineColor;
var axisPointerLineColor = style.axisPointerLineColor;
var columnarHoverBg = style.columnarHoverBg;
var option = {
  tooltip: {},
  visualMap: {
      max: max,
      inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      }
  },
  xAxis3D: {
      type: 'category',
      data: HOURS
  },
  yAxis3D: {
      type: 'category',
      data: DAYS
  },
  zAxis3D: {
      type: 'value'
  },
  grid3D: {
      boxWidth: container.width() * 0.2,
      boxHeight: container.width() * 0.1,
      //boxDepth: container.height(),
      light: {
          main: {
              intensity: 1.2
          },
          ambient: {
              intensity: 0.3
          }
      }
  },
  series: [{
      type: 'bar3D',
      data: data.map(function(item) {
          return {
              value: [item[1], item[0], item[2]]
          }
      }),
      shading: 'color',

      label: {
          show: false,
          textStyle: {
              fontSize: 16,
              borderWidth: 1
          }
      },

      itemStyle: {
          opacity: 0.8
      },
  
      emphasis: {
          label: {
              textStyle: {
                  fontSize: 20,
                  color: '#900'
              }
          },
          itemStyle: {
              color: columnarHoverBg
          }
      }
  }]
};

var confOpts = {
    axisLabel: {
      textStyle: {
        color: textColor
      }
    },
    axisLine: {
        lineStyle: { 
          color: textColor
        }
    },
    grid3D: {
        splitLine: {
            lineStyle: {
                // 使用深浅的间隔色
                color: axisLineColor
            }
        },
        axisPointer: {
          lineStyle: {
            color: axisPointerLineColor
          }
        },
      viewControl: {
        distance: container.width() * 0.3
      }
    },
    xAxis3D: {
      name: xName,
      nameTextStyle: {
        color: textColor
      },
      axisLabel: {
        textStyle: {
          color: textColor
        },
        color: textColor
      },
      axisLine: {
          lineStyle: {
          color: textColor
        }
      }
    },
    yAxis3D: {
      name: yName,
      nameTextStyle: {
        color: textColor
      },
      axisLabel: {
        textStyle: {
          color: textColor
        },
        color: textColor
      },
      axisLine: {
          lineStyle: {
          color: textColor
        }
      }
    }, 
    zAxis3D: {
      name: zName,
      nameTextStyle: {
        color: textColor
      },
      axisLabel: {
        textStyle: {
          color: textColor
        },
        color: textColor
      },
      axisLine: {
          lineStyle: {
          color: textColor
        }
      }
    },
    visualMap: {
      textStyle: {
        color: textColor
      }
    }
};

option = $.extend(true, option, confOpts);

return option;
}

var handle = function() {
var data = getData();
var option = getOption(data);
var myChart = echarts.init(container.get(0));
myChart.setOption(option);
}

// 启动方法定义区
var init = function() {
  config.libSrc.indexOf('http') > -1
    ? thirdPluginLoader({
      libSrc: config.libSrc,
      otherSrc: chart.info.resourceUrl[0],
      initFun: handle
    }) 
    : handle();

};
// 启动区
init();
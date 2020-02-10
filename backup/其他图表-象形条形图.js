// 访问这个url，下载echarts.all.min.js文件，然后将它上传到内网服务器，再将这个url替换成内网的地址
var libUrl = chart.info.resourceUrl[0];
var chartSetting = chart.info.meta.custom_chart_setting.charSetting;
function IsPC() {  
  var userAgentInfo = navigator.userAgent;  
  var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
  var flag = true;  
  for (var v = 0; v < Agents.length; v++) {  
    if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
  }  
  return flag;  
}
// 是否是移动端
var leftTextMargin = 10;
var textFontSize = 16;
var xSplitNumber = 0;
var gridRight = 100;
if (!IsPC()) {
    leftTextMargin = 0;
    textFontSize = 12;
    xSplitNumber = 3;
    gridRight = 50;
}
function draw() {

var spirit = 'image://' + (chartSetting.spirit || 'https://image.flaticon.com/icons/svg/145/145859.svg');
// 示例数据
// var xAxisData =  ['2013', '2014', '2015', '2016'];
// var yAxisData = [891, 1220, 660, 1670];
// var maxData = 2000;
// 连接数据视图数据
if (chart.views && chart.views.length) {
  var data = chart.views[0].data;
  if (data.x.length == 1 && data.y.length == 1) {
    xAxisData = data.x[0].data.map(function(val) { return val;});
    yAxisData = data.y[0].data.map(function(val) { return +val;});
    maxData = Math.max.apply(null, yAxisData);
    var description = data.y[0].description;
    if (description && description.indexOf("http") == 0) {
      spirit = "image://" + data.y[0].description;
    }
    //console.log(xAxisData, yAxisData, maxData);
  }
}

var option = {
    tooltip: {
    },
    xAxis: {
        max: maxData,
        splitLine: {show: false},
        offset: 10,
        axisLine: {
            lineStyle: {
                color: chartSetting.xColor || '#999'
            }
        },
        splitNumber: xSplitNumber, // 显示多少个刻度
        axisLabel: {
            margin: 10
        }
    },
    yAxis: {
        data: xAxisData,
        inverse: true,
        axisTick: {show: false},
        axisLine: {show: false},
        axisLabel: {
            margin: leftTextMargin,
            textStyle: {
                color: chartSetting.titleColor || '#999',
                fontSize: textFontSize
            }
        }
    },
    grid: {
        top: 'center',
        height: chart.$elem.height() - 80,
        //left: 70,
        right: gridRight
    },
    series: [{
        // current data
        type: 'pictorialBar',
        symbol: spirit,
        symbolRepeat: 'fixed',
        symbolMargin: '5%',
        symbolClip: true,
        symbolSize: 30,
        symbolBoundingData: maxData,
        data: yAxisData,
        z: 10
    }, {
        // full data
        type: 'pictorialBar',
        itemStyle: {
            normal: {
                opacity: 0.2
            }
        },
        label: {
            normal: {
                show: true,
                formatter: function (params) {
                    return (params.value / maxData * 100).toFixed(1) + ' %';
                },
                position: 'outside',
                offset: [0, 0],
                textStyle: {
                    color: chartSetting.numColor || 'green',
                    fontSize: textFontSize
                }
            }
        },
        animationDuration: 0,
        symbolRepeat: 'fixed',
        symbolMargin: '5%',
        symbol: spirit,
        symbolSize: 30,
        symbolBoundingData: maxData,
        data: yAxisData,
        z: 5
    }]
};
  
  var myChart = echarts.init(chart.$elem.get(0));
  myChart.setOption(option);
  
}

thirdPluginLoader({
  libSrc: libUrl,
  initFun: draw
});






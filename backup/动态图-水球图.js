// 将压缩包中的echarts.all.min.js文件后上传到内网服务器，再将这个url替换成内网的地址
var echartsUrl = chart.info.resourceUrl[1];
var echartsliquidFillUrl = chart.info.resourceUrl[0];
var option, myChart, app = {};
thirdPluginLoader({
  libSrc: echartsUrl,
  otherSrc: echartsliquidFillUrl,
    libId: window.echarts,
    initFun: function() {
       //console.log("echarts init");
      myChart = echarts.init(chart.$elem.get(0));
      echartsCode();       
      myChart.setOption(option);
    }
}, {funcQueue: []});

function echartsCode() {
  // 从这里开始粘贴echarts的示例代码，如http://echarts.baidu.com/demo.html#geo-lines
var numValue = chart.views[0].data.y[0].data[0]; 
var strValue = Math.round(numValue*100)+"%";
option={
  series:[{
    type:'liquidFill',
    name: chart.views[0].data.y[0].nick_name || chart.views[0].data.y[0].name,
    data:[
      numValue,numValue*0.8,numValue*0.7,numValue*0.6
  ],
    label: {
      normal: {
        formatter: '{a}\n'+strValue,
        color: 'red',
        insideColor: 'yellow',
        fontSize: 20,
      }
    },
    radius: '80%',
  }]
}

  // 粘贴代码结束
}
  
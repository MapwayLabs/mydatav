// 基础配置区
var config = {
  libSrc: chart.info.resourceUrl[0],
  legend: chart.theme === 'dark' ? {
    word: {
      fill: '#fff'
    },
    title: {
      fill: '#fff'
    }
  } : {}
};

// 常量定义区
var CONTAINER_ID = 'container';
// 变量定义区
var container = $('.chart-box');
var xData = chart.views[0].data.x;
var xDataNames = [];
xDataNames = xData.map(function(item, index) {
    return item.nick_name || item.name;
});
var yName = chart.views[0].data.y[0].nick_name || chart.views[0].data.y[0].name;
// css处理区

// 数据处理区
var setContainerId = function() {
  container.attr('id', CONTAINER_ID);
};
var getData = function() {
  var result = [];
  var views  = chart.views || [];
  var data = views[0] ? views[0].data : [];
  var xData = data.x;
  var yData = data.y;
  var len = xData[0].data.length;
  
  for (var i = 0; i < len; i++) {
    var obj = {};
    for (var x = 0; x < xData.length; x++) {
      var item = xData[x];
      obj[item.name] = item.data[i];
    }
    
    for (var y = 0; y < yData.length; y++) {
      var item = yData[y];
      obj[item.name] = item.data[i] * 1;
    }
    result.push(obj);
  }
  return result;
};

// 基础方法定义区
var handle = function() {
  //console.log(G2);
  var data = getData();
  var Stat = G2.Stat;
  var instances = new G2.Chart({
    id: CONTAINER_ID,
    forceFit: true,
    height: container.height()
  });
  instances.source(data);
  instances.coord('theta');
  instances.legend(config.legend)
  var xDataNamesTemp = xDataNames.slice(0, xDataNames.length - 1);
  instances.facet(xDataNamesTemp,{type: 'tree',line: {stroke: '#00a3d7'},smooth: true});
  instances.intervalStack().position(Stat.summary.percent(yName)).color(xDataNames[xDataNames.length - 1]);//
  instances.render();
}

// 启动方法定义区
var init = function() {
  setContainerId();
  config.libSrc.indexOf('http') > -1
     ? thirdPluginLoader({
      libSrc: config.libSrc,
      initFun: handle,
      libId: window.G2
    })
  	: handle();
};

// 启动区
init();
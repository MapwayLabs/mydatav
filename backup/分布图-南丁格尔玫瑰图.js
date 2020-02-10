var g2Url = chart.info.resourceUrl[0];
var customChart = chart;
var chartData = chart.views;
thirdPluginLoader({
  libSrc: g2Url,
    initFun: function() {
      g2Code();
    }
}, {funcQueue: []});

function g2Code(){
  var x = chartData[0].data.x[0].data;
  var y = chartData[0].data.y[0].data;
  var data = [];
  var name = chartData[0].data.x[0].nick_name || chartData[0].data.x[0].name;
  var boxWidth = $('#custom-chart').width();
  var boxHeight = $('#custom-chart').height();
  x.forEach(function(item, index) {
      var json = {};
      json[name] = item;
      json['population'] = +y[index];
      data.push(json);
  });
  const chart = new G2.Chart({
    container: document.getElementById('custom-chart'),
    forceFit: true,
    height: window.innerHeight,
    padding: [ 20, 80, 60, 80 ]
  });
  chart.source(data);
  chart.coord('polar', {
    innerRadius: 0.2
  });
  chart.legend({
    position: 'bottom',
    offsetY: -50,
    offsetX: 20,
    itemWidth: 100,
    useHtml: true
  });
  function IsPC() {  
    var userAgentInfo = navigator.userAgent;  
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true;  
    for (var v = 0; v < Agents.length; v++) {  
      if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
    }  
    return flag;  
  }
  if (!IsPC() && customChart.mode === '12*12') {
      chart.legend(false);   
  }
  chart.axis(false);
  chart.interval().position(name + '*population')
    .color(name, G2.Global.colors_pie_16)
    .style({
      lineWidth: 1,
      stroke: '#fff'
    });
  chart.render();
  $('.g2-legend').css({
      'height': 50
  });
}
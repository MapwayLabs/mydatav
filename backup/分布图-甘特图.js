var theme = chart.theme;
theme = theme === 'default' ? 'light' : theme;
var setting = {
    light: {
        lineColor: '#000',
        background: '#fff'
    },
    dark: {
        lineColor: '#fff',
        background: 'rgba(36, 39, 62, .6)'
    }
};
var handleData = function() {
    var result = [];
    var views  = chart.views || [];
    var data = views[0] ? views[0].data : [];
    var xData = data.x;
    var valLen = xData[0].data.length;
    
    for (var i = 0; i < valLen; i++) {
        var obj = {};
        for (var x = 0; x < xData.length; x++) {
            var item = xData[x];
            obj[item.name] = item.data[i];
        }
        result.push(obj);
    }
    
    return result;
    
}
var handleStyle = function() {
  var styleStr = ".chart {\
    font-family: Arial, sans-serif;\
    font-size: 12px;\
  }\
  .axis path,.axis line {\
    fill: none;\
    stroke: "+ setting[theme].lineColor +";\
    shape-rendering: crispEdges;\
  }\
  .tick text {\
      fill: "+ setting[theme].lineColor +";\
  }\
  .bar {\
    fill: #33b5e5;\
  }\
  .bar-failed {\
    fill: #CC0000;\
  }\
  .bar-running {\
    fill: #669900;\
  }\
  .bar-succeeded {\
    fill: #33b5e5;\
  }\
  .bar-killed {\
    fill: #ffbb33;\
  }\
	";
  if (!$("style#chart-style").length) {
    $("head").append("<style id='chart-style'>" + styleStr + "</style>");
  }
}
handleStyle()
var tasks = handleData();
var taskStatus = {
    "SUCCEEDED" : "bar",
    "FAILED" : "bar-failed",
    "RUNNING" : "bar-running",
    "KILLED" : "bar-killed"
};

var taskNames = [ "D Job", "P Job", "E Job", "A Job", "N Job" ];

tasks.sort(function(a, b) {
    return a.endDate - b.endDate;
});
var maxDate = tasks[tasks.length - 1].endDate;
tasks.sort(function(a, b) {
    return a.startDate - b.startDate;
});
var minDate = tasks[0].startDate;

var format = "%H:%M";

var init = function() {
    var gantt =  d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
    gantt(tasks);
}




/*http://static.mentful.com/gantt-chart-d3v2.js*/
thirdPluginLoader({
      libSrc: chart.info.resourceUrl[0],
      initFun: init
    });

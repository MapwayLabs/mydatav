/* 最终写好的线上自定义图表脚本 */
// 基础配置区
var config = {
  libSrc: chart.info.resourceUrl[0]
};

// 常量定义区

// 变量定义区
var container = $('.chart-box');

// css处理区
var handleStyle = function() {
  var styleStr = ".dimension {\
                    cursor: ns-resize;\
                }\
                .category {\
                    cursor: ew-resize;\
                }\
                .dimension tspan.name {\
                    font-size: 1.5em;\
                    fill: #333;\
                    font-weight: bold;\
                }\
                .dimension tspan.sort {\
                    fill: #000;\
                    cursor: pointer;\
                    opacity: 0;\
                }\
                .dimension tspan.sort:hover {\
                    fill: #333;\
                }\
                .dimension:hover tspan.name {\
                    fill: #000;\
                }\
                .dimension:hover tspan.sort {\
                    opacity: 1;\
                }\
                .dimension line {\
                    stroke: #000;\
                }\
                .dimension rect {\
                    stroke: none;\
                    fill-opacity: 0;\
                }\
                .dimension > rect, .category-background {\
                    fill: #fff;\
                }\
                .dimension > rect {\
                    display: none;\
                }\
                .category:hover rect {\
                    fill-opacity: .3;\
                }\
                .dimension:hover > rect {\
                    fill-opacity: .3;\
                }\
                .ribbon path {\
                    stroke-opacity: 0;\
                    fill-opacity: .5;\
                }\
                .ribbon path.active {\
                    fill-opacity: .9;\
                }\
                .ribbon-mouse path {\
                    fill-opacity: 0;\
                }\
                .category-0 {\
                    fill: #1f77b4;\
                    stroke: #1f77b4;\
                }\
                .category-1 {\
                    fill: #ff7f0e;\
                    stroke: #ff7f0e;\
                }\
                .category-2 {\
                    fill: #2ca02c;\
                    stroke: #2ca02c;\
                }\
                .category-3 {\
                    fill: #d62728;\
                    stroke: #d62728;\
                }\
                .category-4 {\
                    fill: #9467bd;\
                    stroke: #9467bd;\
                }\
                .category-5 {\
                    fill: #8c564b;\
                    stroke: #8c564b;\
                }\
                .category-6 {\
                    fill: #e377c2;\
                    stroke: #e377c2;\
                }\
                .category-7 {\
                    fill: #7f7f7f;\
                    stroke: #7f7f7f;\
                }\
                .category-8 {\
                    fill: #bcbd22;\
                    stroke: #bcbd22;\
                }\
                .category-9 {\
                    fill: #17becf;\
                    stroke: #17becf;\
                }\
                .tooltip {\
                    background-color: rgba(242, 242, 242, .6);\
                    position: absolute;\
                    padding: 5px;\
                }\
                .chart-theme-dark .category text,\
                .chart-theme-dark .dimension tspan.sort {\
                    fill: rgba(255, 255, 255, .72);\
                }\
                .chart-theme-dark .dimension tspan.sort:hover,\
                .chart-theme-dark .dimension:hover tspan.name,\
                .chart-theme-dark .dimension tspan.name {\
                    fill: #fff;\
                }\
                .chart-theme-dark .dimension line {\
                    stroke-opacity: 0.72;\
                    stroke: #fff;\
                }\
                .chart-theme-dark .ribbon path {\
                    fill-opacity: .72;\
                }\
                .chart-theme-dark .ribbon path.active {\
                    fill-opacity: 1;\
                }";
  if (!$("style#chart-style").length) {
    $("head").append("<style id='chart-style'>" + styleStr + "</style>");
  }
}

// 数据处理区
var getData = function() {
  var result = [];
  
  // your code
  if (chart.views.length) {
    var data = chart.views[0].data;
    var dimensions = data.x.map(function(field) { return field.nick_name || field.name; });
    for(var i = 0; i < data.x[0].data.length; i++) {
      var row = {};
      data.x.forEach(function(x, idx) {
        row[dimensions[idx]] = x.data[i];
      });
      row.value = +data.y[0].data[i];
      result.push(row);
    }
  }

  return {
    dimensions: dimensions,
    values: data.y[0].data.map(function(val) { return +val; }),
    table: result
  };
};

// 基础方法定义区
var handle = function() {
  var data = getData();
  var parsets = d3.parsets()
      .width(chart.$elem.width())
      .height(chart.$elem.height())
      .dimensions(data.dimensions)
      .value(function(item, idx) {
        return item.value;
      });
  
  var table = data.table;

  var vis = d3.select(".chart-box").append("svg")
      .attr("width", parsets.width())
      .attr("height", parsets.height())
      .datum(table)
      .call(parsets);

}

// 启动方法定义区
var init = function() {
    handleStyle();
    config.libSrc.indexOf('http') > -1
      ? thirdPluginLoader({
        libSrc: config.libSrc,
        initFun: handle,
        libId: window.xxx
      }) 
      : handle();
  
};
// 启动区
init();
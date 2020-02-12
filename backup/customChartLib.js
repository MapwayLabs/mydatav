/*
 * 自定义图表iframe运行环境
 */
//合并成一个文件
(function(){
    // __inline是fis在js引入外部文件的办法
    var __inline = function(src){document.write('<script src="/static/js/lib/' + src + ' "></script>')};
    __inline('../lib/jquery/jquery-1.11.3.min.js');
    __inline('../lib/moment/moment.min.js');
    __inline('../lib/moment/moment-timezone-with-data-2010-2020.min.js');
    __inline('../bdp-base.js');
    __inline('../lib/highcharts/js/highcharts.src.js');
    __inline('../chart/highcharts.extension.js');
    // __inline('lib/highcharts/js/highcharts-more.src.js');
    __inline('../lib/dalaba/dalaba.js');
    __inline('../lib/dalaba/dalaba.geo.js');
    __inline('../lib/dalaba/dalaba.cssparser.js');
    __inline('../lib/dalaba/dalaba.transformEvent.js');
    __inline('../lib/d3/d3.v3.min.js');
    __inline('../lib/d3/d3-color.js');
    __inline('../lib/d3/d3-interpolate.js');
    __inline('../lib/jquery-table-mergecell.js');
    __inline('../lib/jquery.cookie.min.js');
    __inline('../lib/vega/vega.js');
    __inline('../lib/alasql.min.js');
    __inline('../chart/chart-helper.js');
    __inline('../chart/chart-custom-table-spec.js');
    __inline('../chart/custom-chart.js');
    __inline('../lib/jquery-fixedheadertable/jquery.fixedheadertable.js');
    __inline('../chart/chart-custom-spec.js');
    __inline('../../nativeCustom/js/custom_bridge.js');
})();


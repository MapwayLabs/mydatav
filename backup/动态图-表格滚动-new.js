var scrollTable = (function($){
  var theme = chart.theme;
  var charSetting = chart.info.meta.custom_chart_setting.charSetting;
  theme = theme === 'default' ? 'light' : theme;
  var custromSetting = {
      light: {
          headBg: '#ECEFF1',
          oddBg: '#FFF',
          evenBg: '#F7F8F9',
          color: 'rgba(0,0,0,.6)'
      },
      dark: {
          headBg: '#1E2033',
          oddBg: '#313449',
          evenBg: '#2B2E44',
          color: '#fff'
      }
  };
  var defaults = {
      // chart唯一标识，主要用于识别对应的内容及删除结束的轮询
      scrollId: 'J_table_scroll_' + new Date().getTime(),
      // 滚动的父对象
      scrollWrapCls: 'J_table_scroll_body_wrap',
      // 要滚动的内容
      scrollBodyCls: 'J_table_scroll_body',
      // 表格的header，主要用于与格式td对齐
      scrollHeaderCls: 'J_table_scroll_header',
      // 每行标识
      trCls: 'J-scroll-line',
      // 每次移动行数
      line: 1,
      // 每次移动耗时ms
      speed: charSetting.speed,
      // 每次移动间隔ms
      timer: charSetting.timer,
      // 列设置
      styleHeadCol: [],
      // 列设置，主要是宽度
      styleBodyCol: [],
      // 表头框架样式
      styleHeadTable: "",
      // 表内容框架样式
      styleBodyTable: "",
      // 双行框架样式
      styleEven: "",
      // 单行框架样式
      styleOdd: "",
      // 表头字体区域
      styleTextHead: "",
      // 表内容字体区域
      styleTextBody: ""
  };
  function scrollTable(chart) {
      this.$elem = chart.$elem;
      this.views = chart.views && chart.views[0];
      // 兼容旧版本
      if (!this.views) {
          this.views = chart;
      }
      // 进一步防止滚动id一样
      defaults.scrollId += this.views.info.chart_id;
  };
  scrollTable.prototype = {
      constructor: scrollTable,
      init: function(userSetting) {
          var setting = $.extend(true, {}, defaults, userSetting);
          // 基础数据
          var scrollData = {
              setting: setting,
              // 表头[表头一、表头二]
              headerData: this.getHeaderData(this.views.info.x),
              // 表内容[[0行0列, 0行1列],[1行0列, 1行1列],[2行0列, 2行1列]]
              bodyData: this.getBodyData(this.views.data.x)
          };
          // 将表格数据注入chart
          this.$elem.append(this.getStyle(scrollData.setting)+ this.tmpl(this.getChartHtml())(scrollData));
          // th对齐td
          this.alignOnResize($('#' + scrollData.setting.scrollId + ' .' + scrollData.setting.scrollBodyCls, chart.$elem), $('#' + scrollData.setting.scrollId + ' .' + scrollData.setting.scrollHeaderCls, chart.$elem));
          // 滚动  数据大于图表大小时，才进行滚动
        if (this.$elem.height() < $('#' + scrollData.setting.scrollId, chart.$elem).height()) {
            $('#' + scrollData.setting.scrollId + ' .' + scrollData.setting.scrollWrapCls, chart.$elem).scrollTableTextSlider(scrollData.setting);
          }
      },
      // 表头数据处理
      getHeaderData: function(x) {
          var headerData = [];
          for (var i = 0, len = x.length; i < len; i ++) {
              headerData.push(x[i].name);
          }
          return headerData;
      },
      // 表内容数据处理
      getBodyData: function(data) {
          var bodyData = [];
          for (var i = 0, len = data[0].data.length; i < len; i ++) {
              var row = [];
              for (var j = 0, lenj = data.length; j < lenj; j ++) {   
                  row.push(data[j].data[i]);
              }
              bodyData.push(row);
          }
          return bodyData;
      },
      // 表格结构
      getChartHtml: function() {
          var html = '<div id="<#= setting.scrollId #>">\
                  <table class="<#= setting.scrollHeaderCls #> bdp-table-scroll bdp-table-scroll-head">\
                      <thead>\
                          <tr>\
                              <#for (var i = 0, len = headerData.length; i < len; i ++){ #>\
                                  <th style="<#= setting.styleHeadCol[i] #>"><div class="text-height text-head"><#= headerData[i] #></div></th>\
                              <# } #>\
                          </tr>\
                      </thead>\
                  </table>\
                  <div class="<#= setting.scrollWrapCls #> bdp-table-scroll-wrap">\
                      <div class="bdp-table-scroll-content">\
                          <table class="<#= setting.scrollBodyCls #> bdp-table-scroll bdp-table-scroll-body">\
                              <#for (var i = 0, len = bodyData.length; i < len; i ++){ #>\
                                  <#if ((i % 2) == 0) {#>\
                                  <tr class="<#= setting.trCls #> nthChildOdd">\
                                  <# } #>\
                                  <#if ((i % 2) != 0) {#>\
                                  <tr class="<#= setting.trCls #> nthChildEven">\
                                  <# } #>\
                                      <#for (var j = 0, lenj = bodyData[i].length; j < lenj; j ++){ #>\
                                          <td style="<#= setting.styleBodyCol[j] #>">\
                                              <div class="text-height text-body">\
                                                  <#= bodyData[i][j] #>\
                                              </div>\
                                          </td>\
                                      <# } #>\
                                  </tr>\
                              <# } #>\
                          </table>\
                      </div>\
                  </div>\
              </div>';
          return html;
      },
      // 表格样式
      getStyle: function(setting) {
          return '<style>\
              .bdp-table-scroll-wrap {\
                  width: 100%;\
                  height: 100%;\
                  overflow: hidden;\
              }\
              .bdp-table-scroll-content {\
                  width: 100%;\
                  height: 100%;\
                  overflow-x: auto;\
              }\
              .bdp-table-scroll {\
                  width: 100%;\
                  background: #09112D;\
                  color: ' + custromSetting[theme].color + ';\
                  text-align: left;\
              }\
              .bdp-table-scroll-head {\
                  ' + setting.styleHeadTable + '\
              }\
              .bdp-table-scroll-body {\
                  ' + setting.styleBodyTable + '\
              }\
              .bdp-table-scroll td {\
                  padding: 8px 16px;\
                  height: 32px;\
                  overflow: hidden;\
              }\
              .bdp-table-scroll th {\
                  height: 32px;\
                  padding: 8px 16px;\
                  font-weight: 700;\
              }\
              .bdp-table-scroll th {\
                  background-color: ' + custromSetting[theme].headBg + ';\
                  color: ' + custromSetting[theme].color + ';\
              }\
              .bdp-table-scroll tr.nthChildOdd {\
                  background-color: ' + custromSetting[theme].oddBg + ';\
                  ' + setting.styleOdd + '\
              }\
              .bdp-table-scroll tr.nthChildEven {\
                  background-color: ' + custromSetting[theme].evenBg + ';\
                  ' + setting.styleEven + '\
              }\
              .bdp-table-scroll td + td,\
              .bdp-table-scroll th + th {\
                  border-left: solid 1px #09112D;\
              }\
              .text-height {\
                  height: 16px;\
                  overflow: hidden;\
              }\
              .text-head {\
                  ' + setting.styleTextHead + '\
              }\
              .text-body {\
                  ' + setting.styleTextBody + '\
              }\
              .up{ margin-left:310px; width:50px; height:50px; background:#F90}\
              .down{ margin:0 0 0 310px; zoom:1; width:50px; height:50px; background:#960}\
              ::-webkit-scrollbar {\
                  width: 14px;\
                  height: 14px;\
                  padding: 0;\
              }\
              ::-webkit-scrollbar-button {\
                  display: block;\
                  width: 0;\
                  height: 0;\
              }\
              ::-webkit-scrollbar-corner {\
                  background-color: transparent;\
              }\
              ::-webkit-scrollbar-thumb {\
                  border-radius: 2px;\
                  background: rgba(128, 133, 144, 0.15);\
              }\
              ::-webkit-scrollbar-track {\
                  border-radius: 2px;\
                  background: rgba(128, 133, 144, 0.06);\
              }\
              .display-theme-light {\
                  scrollbar-track-color: transparent;\
                  scrollbar-3dlight-color: transparent;\
                  scrollbar-darkshadow-color: transparent;\
                  scrollbar-arrow-color: transparent;\
                  scrollbar-face-color: transparent;\
                  scrollbar-highlight-color: transparent;\
                  scrollbar-shadow-color: transparent;\
              }\
              .display-theme-dark {\
                  scrollbar-track-color: #1F2236;\
                  scrollbar-3dlight-color: #2B2E49;\
                  scrollbar-darkshadow-color: #2B2E49;\
                  scrollbar-arrow-color: #2B2E49;\
                  scrollbar-face-color: #2B2E49;\
                  scrollbar-highlight-color: #2B2E49;\
                  scrollbar-shadow-color: #2B2E49;\
              }\
              </style>';
      },
      // 表头宽度与内容对齐
      alignOnResize: function($el, hObj) {
          // 拿第一行td宽度给th赋值
          if (!$el) return;
          var header = hObj;
          var $theads = header.find('th');
          var totalWidth = 0;
          var $td = $el.find('tr').eq(0).find('td');

          $td.each(function(idx) {
              var thisWidth = $(this).outerWidth();

              var width = thisWidth;
              totalWidth += width;

              $theads.eq(idx).css('width', width);

          });
          header.css('width', totalWidth);
      },
      // 模板数据处理
      tmpl: function(str, data){
          var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
              tmpl($('#'+str, chart.$elem).get(0).innerHTML) :
            new Function("obj",
              "var p=[],print=function(){p.push.apply(p,arguments);};" +
              "with(obj){p.push('" +
              str
                .replace(/[\r\t\n]/g, " ")
                .split("<#").join("\t")
                .replace(/((^|#>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)#>/g, "',$1,'")
                .split("\t").join("');")
                .split("#>").join("p.push('")
                .split("\r").join("\\'")
            + "');}return p.join('');");
          return data ? fn( data ) : fn;
      }
  };
  $.fn.scrollTableTextSlider = function(settings){    
      settings = jQuery.extend({
          speed : "normal",
          line : 1,
          timer : 1000
      }, settings);
      return this.each(function() {
          $.fn.scrollTableTextSlider.scllor( $( this ), settings );
      });
  }; 
  $.fn.scrollTableTextSlider.scllor = function($this, settings){
      var table = $( ('.' + settings.scrollBodyCls + ":eq(0)"), $this );
      var timerID;
      var trs = table.children();
      var _btnUp=$(".up:eq(0)", $this)
      var _btnDown=$(".down:eq(0)", $this)
      var liHight=$(trs[0]).height();
      var upHeight=function() {
          var h = 0;
          var tableObj = $( ('.' + settings.scrollBodyCls + ":eq(0)"), $this );
          var trs = tableObj.find('.' + settings.trCls);
          for (var i = 0; i < settings.line; i ++) {
              h += $(trs[i]).height();
          }
          return 0-h;//滚动的高度；
      };
      var scrollUp=function(){
          if ($("#" + settings.scrollId, chart.$elem).length <= 0) {
              autoStop();
          }
          _btnUp.unbind("click",scrollUp);
          table.animate({marginTop:upHeight()},settings.speed,function(){
            for(i=0;i<settings.line;i++){
                  table.find("tr:first").appendTo(table);
              }
              table.css({marginTop:0});
              _btnUp.bind("click",scrollUp); //Shawphy:绑定向上按钮的点击事件
          }); 
      };
      var scrollDown=function(){
          if ($("#" + settings.scrollId, chart.$elem).length <= 0) {
              autoStop();
          }
          _btnDown.unbind("click",scrollDown);
          table.css({marginTop:upHeight()});
          for(i=0;i<settings.line;i++){
              table.find("tr:last").prependTo(table);
          }
          table.animate({marginTop:0},settings.speed,function(){
              _btnDown.bind("click",scrollDown); //Shawphy:绑定向上按钮的点击事件
          });
      };
      var autoPlay=function(){
          timerID = setInterval(scrollUp,settings.timer);
      };
      var autoStop = function(){
          clearInterval(timerID);
      };
      //事件绑定
      table.hover(autoStop,autoPlay).mouseout();
      _btnUp.css("cursor","pointer").click( scrollUp );
      _btnUp.hover(autoStop,autoPlay);
      _btnDown.css("cursor","pointer").click( scrollDown );
      _btnDown.hover(autoStop,autoPlay)
  };
//   window.scrollTable = scrollTable;
return scrollTable;
})(jQuery);

// 自定义的设置都在userSetting这里，其它的数据千万别动
var userSetting = {
  // 每次移动行数
  line: 1,
  // 每次移动耗时ms
  speed: 500,
  // 每次移动间隔ms
  timer: 2000,
  // 列设计
  // ["background: #F00;font-size: 20px;", "color: #FAA", ""]
  styleHeadCol: [],
  // 列宽，如果数组中的个数与表头个数一样，若不致，缺少的地方会自动适应剩余宽度
  // 如：想修改列宽，例子如下
  // ["width: 80px;", "width: 100", "width:200px"]
  styleBodyCol: [],
  // 下列的设置属于中，styleHeadCol、styleBodyCol也可以写
  // styleHeadTable、styleBodyTable、styleEven、styleOdd、styleTextHead、styleTextBody写法说明：
  // height: 高大小 40px 80px ...
  // width: 宽大小 100px 200px ...
  // background: 表格背景色 
  // color: 字体颜色
  // font-size: 字体大小 12px 18px ...
  // text-align: 字体排版 left center right
  // 例子如下：
  // width: 100%;background: #09112D;color: #FFF;text-align: left;
  // 表头表格框架样式
  // 如修改表头背景色且字体居中，例子为：background: #FFF;text-align: center;
  styleHeadTable: "",
  // 表内容表格框架样式
  // 如修改表内容表字体大小，例子为：font-size: 30px;
  styleBodyTable: "",
  // 双行框架样式
  styleEven: "",
  // 单行框架样式
  styleOdd: "",
  // 表头字体区域
  // 如：修改表头高度，例子为：height: 40px;
  styleTextHead: "",
  // 表内容字体区域
  // 如：修改表内容高度，例子为：height: 60px;
  styleTextBody: ""
};
var sctable = new scrollTable(chart);
sctable.init(userSetting);

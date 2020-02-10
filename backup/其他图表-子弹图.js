var chartSetting = chart.info.meta.custom_chart_setting.charSetting;
var measureColor = chartSetting.measureColor || "#4b85ee";  // 实际值和目标值的颜色 
var rangeColor0 = chartSetting.rangeColor0 || "#A3ABB0"; // 从左往右第1个区间颜色
var rangeColor1 = chartSetting.rangeColor1 || "#F6CC4E"; // 从左往右第2个区间颜色
var rangeColor2 = chartSetting.rangeColor2 || "#40A276"; // 从左往右第3个区间颜色
var rangeColor3 = chartSetting.rangeColor3 || "red"; // 从左往右第4个区间颜色

var measureTextOpt = {
  "enabled": true,  // 是否显示实际值标签
  "color": "#fff"  // 实际值标签颜色
}
var fontSizeScale = 1;  // 字体大小的缩放倍数, 推荐[1, 3]之间的值，支持小数如1.5，大了自适应可能会有问题

chart.$elem.html("");

(function() {

// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/
d3.bullet = function() {
  var orient = "left", // TODO top & bottom
      reverse = false,
      duration = 0,
      ranges = bulletRanges,
      markers = bulletMarkers,
      measures = bulletMeasures,
      width = 380,
      height = 30,
      tickFormat = null;

  // For each small multiple…
  function bullet(g) {
    g.each(function(d, i) {
      var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
          markerz = markers.call(this, d, i).slice().sort(d3.descending),
          measurez = measures.call(this, d, i).slice().sort(d3.descending),
          g = d3.select(this);
      
      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
          .range(reverse ? [width, 0] : [0, width]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Derive width-scales from the x-scales.
      var w0 = bulletWidth(x0),
          w1 = bulletWidth(x1);

      var barHeight = height * 0.7;
      
      // Update the range rects.
      var range = g.selectAll("rect.range")
          .data(rangez);

      range.enter().append("rect")
          .attr("class", function(d, i) { return "range s" + (rangez.length - i - 1); })
          .attr("width", w0)
          .attr("height", barHeight)
          .attr("x", reverse ? x0 : 0)
        .transition()
          .duration(duration)
          .attr("width", w1)
          .attr("x", reverse ? x1 : 0);

      range.transition()
          .duration(duration)
          .attr("x", reverse ? x1 : 0)
          .attr("width", w1)
          .attr("height", barHeight);

      // Update the measure rects.
      var measure = g.selectAll("rect.measure")
          .data(measurez);

      measure.enter().append("rect")
          .attr("class", function(d, i) { return "measure s" + i; })
          .attr("width", w0)
          .attr("height", barHeight / 2)
          .attr("x", reverse ? x0 : 0)
          .attr("y", barHeight / 4)
        .transition()
          .duration(duration)
          .attr("width", w1)
          .attr("x", reverse ? x1 : 0);

      measure.transition()
          .duration(duration)
          .attr("width", w1)
          .attr("height", barHeight / 2)
          .attr("x", reverse ? x1 : 0)
          .attr("y", barHeight / 4);
      
      // update the measure label
      var measureLabel = g.selectAll("text.measure")
          .data(measurez);

      measureLabel.enter().append("text")
          .attr("class", function(d, i) { return "measure s" + i; })
          .attr("dy", "0.5em")
          .attr("dx", "-0.5em")
      	  .attr('text-anchor', 'end')
          .text(String)
          .attr("x", reverse ? function(d) { return w0(d) + x0(d); } : w0)
          .attr("y", barHeight / 2);

      measureLabel.transition()
          .duration(duration)
          .attr("x", reverse ? function(d) { return w1(d) + x1(d); } : w1);

      // Update the marker lines.
      var marker = g.selectAll("line.marker")
          .data(markerz);

      marker.enter().append("line")
          .attr("class", "marker")
          .attr("x1", x0)
          .attr("x2", x0)
          .attr("y1", barHeight / 4)
          .attr("y2", barHeight * 3/ 4)
        .transition()
          .duration(duration)
          .attr("x1", x1)
          .attr("x2", x1);

      marker.transition()
          .duration(duration)
          .attr("x1", x1)
          .attr("x2", x1)
          .attr("y1", barHeight / 4)
          .attr("y2", barHeight * 3/ 4);

      // Compute the tick format.
      var format = tickFormat || x1.tickFormat(8);

      // Update the tick groups.
      var tick = g.selectAll("g.tick")
          .data(x1.ticks(8), function(d) {
            return this.textContent || format(d);
          });

      // Initialize the ticks with the old scale, x0.
      var tickEnter = tick.enter().append("g")
          .attr("class", "tick")
          .attr("transform", bulletTranslate(x0))
          .style("opacity", 1e-6);

      tickEnter.append("line")
          .attr("y1", barHeight)
          .attr("y2", barHeight * 0.8);

      tickEnter.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "1em")
          .attr("y", height * 0.8)
          .text(format);

      // Transition the entering ticks to the new scale, x1.
      tickEnter.transition()
          .duration(duration)
          .attr("transform", bulletTranslate(x1))
          .style("opacity", 1);

      // Transition the updating ticks to the new scale, x1.
      var tickUpdate = tick.transition()
          .duration(duration)
          .attr("transform", bulletTranslate(x1))
          .style("opacity", 1);

      tickUpdate.select("line")
          .attr("y1", barHeight)
          .attr("y2", height * 0.8);

      tickUpdate.select("text")
          .attr("y", height * 0.8);

      // Transition the exiting ticks to the new scale, x1.
      tick.exit().transition()
          .duration(duration)
          .attr("transform", bulletTranslate(x1))
          .style("opacity", 1e-6)
          .remove();
    });
    d3.timer.flush();
  }

  // left, right, top, bottom
  bullet.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    reverse = orient == "right" || orient == "bottom";
    return bullet;
  };

  // ranges (bad, satisfactory, good)
  bullet.ranges = function(x) {
    if (!arguments.length) return ranges;
    ranges = x;
    return bullet;
  };

  // markers (previous, goal)
  bullet.markers = function(x) {
    if (!arguments.length) return markers;
    markers = x;
    return bullet;
  };

  // measures (actual, forecast)
  bullet.measures = function(x) {
    if (!arguments.length) return measures;
    measures = x;
    return bullet;
  };

  bullet.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return bullet;
  };

  bullet.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return bullet;
  };

  bullet.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return bullet;
  };

  bullet.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return bullet;
  };

  return bullet;
};

function bulletRanges(d) {
  return d.ranges;
}

function bulletMarkers(d) {
  return d.markers;
}

function bulletMeasures(d) {
  return d.measures;
}

function bulletTranslate(x) {
  return function(d) {
    return "translate(" + x(d) + ",0)";
  };
}

function bulletWidth(x) {
  var x0 = x(0);
  return function(d) {
    return Math.abs(x(d) - x0);
  };
}

})();

// 构造数据
var data = [
  {"title":"Revenue","subtitle":"US$, in thousands","ranges":[8911,9802,10693],"measures":[10710],"markers":[null]},
  {"title":"Profit","subtitle":"%","ranges":[20,25,30],"measures":[21,23],"markers":[26]},
  {"title":"Order Size","subtitle":"US$, average","ranges":[350,500,620],"measures":[100,320],"markers":[550]},
  {"title":"New Customers","subtitle":"count","ranges":[1400,2000,2500],"measures":[1000,1650],"markers":[2100]},
  {"title":"Satisfaction","subtitle":"out of 5","ranges":[3.5,4.25,5],"measures":[3.2,4.7],"markers":[4.4]}
];
var maxTextWidth = 50;
var titleFontSize = 12 * fontSizeScale;
var subTitleFontSize = 10 * fontSizeScale;

if (chart.views && chart.views.length) {
  data = [];
  var maxTextWidth = 0;
  var fontFace = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  var getTextWidth = (function() { 
    var ctx = document.createElement('canvas').getContext('2d');
    return function(text, fontSize, fontFace) {   
      ctx.font = fontSize + 'px ' + fontFace;
      return ctx.measureText(text).width;
    }
  })();
  
  chart.views.forEach(function(view) {
    var viewData = view.data;
    if (view.data.x.length > 0 && view.data.y.length >= 3) {
      var x0 = view.data.x[0],
          x1 = view.data.x[1];
      x0.data.forEach(function(xVal, idx) {
        var item = {
          title: xVal,
          subtitle: '',
        }; 
        if (x1) {
          item.subtitle = x1.data[idx];
        }
        maxTextWidth = Math.max(maxTextWidth, getTextWidth(xVal, titleFontSize, fontFace), getTextWidth(title, subTitleFontSize, fontFace));
        item.measures = [viewData.y[0].data[idx]];
        item.markers = [viewData.y[1].data[idx]];
        item.ranges = viewData.y
          	.filter(function(item, index) { if(index > 1) return item; else return false; })
          	.map(function(item) { return +item.data[idx] })
        	.filter(function(item) { if (item === null || item === undefined) return false; else return item;});
        
        data.push(item);
      });
    }
    
  });
} 

// 添加样式 
var styles = ' \
.chart-box { \
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; \
  padding-top: 10px;\
  position: relative; \
  max-height: 100%;\
  max-width: 100%;\
  overflow: auto;\
} \
\
.bullet { font-size: ' + subTitleFontSize + 'px; } \
.bullet .marker { stroke: #4b85ee; stroke-width: 2px; } \
.bullet .tick line { stroke-width: .5px; } \
.bullet .range.s0 { fill: ' + rangeColor0 + '; } \
.bullet .range.s1 { fill: ' + rangeColor1 + '; } \
.bullet .range.s2 { fill: ' + rangeColor2 + '; } \
.bullet .range.s3 { fill: ' + rangeColor3 + '; } \
.bullet .measure.s0 { fill: ' + measureColor + '; } \
.bullet text.measure.s0 { fill: ' + measureTextOpt.color + '; display: ' + (measureTextOpt.enabled ? 'inherit' : 'none') + ';} \
.bullet .measure.s1 { fill: steelblue; } \
.bullet .title { font-size: ' + titleFontSize + 'px; } \
.chart-theme-light .bullet .title, \
.chart-theme-light .bullet .tick text { \
	fill: rgba(0, 0, 0, 0.8); \
} \
.chart-theme-light .bullet .tick line { \
	stroke: rgba(0, 0, 0, 0.3); \
} \
.chart-theme-light .bullet .subtitle { \
	fill: rgba(0, 0, 0, 0.5); \
} \
.chart-theme-dark .bullet .title, \
.chart-theme-dark .bullet .tick text { \
	fill: rgba(255, 255, 255, 0.5); \
} \
.chart-theme-dark .bullet .subtitle { \
	fill: rgba(255, 255, 255, 0.2); \
} \
.chart-theme-dark .bullet .tick line { \
	stroke: rgba(255, 255, 255, 0.1) \
} \
';


$("head").append("<style>" + styles + "</style>");

// 渲染图表
var margin = {top: 5, right: 20, bottom: 20, left: maxTextWidth + 10},
    width = chart.$elem.width() - margin.left - margin.right,
    height = Math.max((chart.$elem.height() - 20) / data.length, 50) - margin.top - margin.bottom;

var bullets = d3.bullet()
    .width(width)
    .height(height);

  var svg = d3.select(".chart-box").selectAll("svg")
      .data(data)
    .enter().append("svg")
      .attr("class", "bullet")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(bullets);

  var title = svg.append("g")
      .style("text-anchor", "end")
      .attr("transform", function(d) {
        if (!d.subtitle || d.subtitle == "") {
          return "translate(-6," + (height * 0.7 / 2) + ")";
        } else {
          return "translate(-6," + (height * 0.7 / 2) + ")";
        }
        
      });

  title.append("text")
      .attr("class", "title")
      .attr("dy", 0.5 + "em")
      .text(function(d) { return d.title; });


  title.append("text")
      .attr("class", "subtitle")
      .attr("dy", "2em")
      .text(function(d) { return d.subtitle; }); 
      




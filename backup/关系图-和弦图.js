var theme = chart.theme;
theme = theme=== 'default'? 'light': theme;
var setting = {
    // 浅色主题样式
    light: {
        textColor: '#000' // 文字颜色
    },
    // 深色主题样式
    dark: {
        textColor: '#fff' // 文字颜色
    }
};
// append css style
var styleCss = "\
.group path { \
  fill-opacity: .5; \
}\
path.chord { \
  stroke: #000; \
  stroke-width: .25px; \
}\
.circle:hover path.fade { \
  display: none; \
}\
";
if (!$("style#chart-style").length) {
  $("head").append("<style id='chart-style'>" + styleCss + "</style>");
}

var containerWidth = chart.$elem.width();
var containerHeight = chart.$elem.height();
var outerRadius = Math.min(containerWidth, containerHeight) / 2,
    innerRadius = outerRadius * 0.8;

var fill = d3.scale.category20c();

var chord = d3.layout.chord()
    .padding(.04)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(innerRadius + 20);

var formatValue = d3.format("s");

var svg = d3.select(".chart-box").append("svg")
	.attr("transform", "translate(" + (containerWidth - outerRadius * 2) / 2 + ", " + (containerHeight - outerRadius * 2) / 2 + ")")
    .attr("width", containerWidth)
    .attr("height", outerRadius * 2)
  	.append("g")
	.attr("class", "circle")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

// prepare matrix
if (chart.views && chart.views.length) {
  var data = chart.views[0].data;
  if (data.x.length == 2 && data.y.length == 1); {
    matrix = [];
    names = [];
    var matrixMap = {};
    data.x[0].data.forEach(function(val, idx) {
      if (!matrixMap[val]) {
        matrixMap[val] = {};
        names.push(val);
      }
      var target = data.x[1].data[idx];
      if (!matrixMap[target]) {
        matrixMap[target] = {};
        names.push(target);
      }
      var flow = data.y[0].data[idx];
      matrixMap[val][target] = flow;
    });
    
    names.sort(function(a,b) {
      return a - b;
    });
    
    names.forEach(function(name, idx) {
      var arr = names.map(function(n) { return +matrixMap[name][n] || 0; });
      matrix.push(arr);
    });
  }
}

chord.matrix(matrix);
var group = svg.selectAll(".group")
  .data(chord.groups)
  .enter().append("g")
  .attr("class", "group")
  .on("mouseover", mouseover);

group.append("path")
  .style("fill", function(d) { return fill(d.index); })
  .style("stroke", function(d) { return fill(d.index); })
  .attr("d", arc);

group.append("text")
  .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
  .attr("dy", ".35em")
  .attr('fill', setting[theme].textColor)
  .attr("transform", function(d) {
  return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
    + "translate(" + (innerRadius + 26) + ")"
    + (d.angle > Math.PI ? "rotate(180)" : "");
})
  .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  .text(function(d) { return names[d.index]; });


/*
// Returns an array of tick angles and values for a given group and step.
function groupTicks(d, step) {
  console.log(d);
  var k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, step).map(function(value) {
    return {value: value, angle: value * k + d.startAngle};
  });
}

var groupTick = group.selectAll(".group-tick")
  	.data(function(d) { return groupTicks(d, 1e3); })
  	.enter().append("g")
    .attr("class", "group-tick")
    .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + innerRadius + ",0)"; });

groupTick.append("line")
  .attr("x2", 6);

groupTick
  .filter(function(d) { return d.value % 5e3 === 0; })
  .append("text")
    .attr("x", 8)
    .attr("dy", ".35em")
    .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-36)" : "translate(18)"; })
    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    .text(function(d) { return formatValue(d.value); });
    */


var chordGraph = svg.selectAll(".chord")
  .data(chord.chords)
  .enter().append("path")
  .attr("class", "chord")
  .style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(); })
  .style("fill", function(d) { return fill(d.source.index); })
  .attr("d", d3.svg.chord().radius(innerRadius));

function mouseover(d, i) {
  chordGraph.classed("fade", function(p) {
    return p.source.index != i && p.target.index != i;
  });
}

if (chart.views && chart.views.length) {
  var data = chart.views[0].data;
  if (data.x.length == 2 && data.y.length == 1) {
    thirdPluginLoader({
      libSrc: chart.info.resourceUrl[0],
      initFun: drawGraph
    });
  } 
}

function drawGraph() {
  
  // 构造数据
  var graph = {
    nodes: [],
    links: []
  };
  
  var data = chart.views[0].data;
  var nodeMap = {};
  
  function handleNode(node) {
    var arr = node.split("-");
    var id = arr[0];
    var group = arr[1] || 0;
    if (!nodeMap[id]) {
      nodeMap[id] = 1;
      graph.nodes.push({
        id: id,
        group: group
      });
    }
    return id;
  }
  
  data.x[0].data.forEach(function(source, idx) {
    source = handleNode(source);
    var target = handleNode(data.x[1].data[idx]);
	var value = +data.y[0].data[idx];
    
    graph.links.push({
      source: source,
      target: target,
      value: value
    });  
  });
  
  var width = chart.$elem.width(),
      height = chart.$elem.height();

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

  var svg = d3.select(".chart-box").append("svg")
      .attr("width", width)
      .attr("height", height);
  
  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
  	  .attr("stroke", "#ccc")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d) { return color(d.group); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  } 
 
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}
  
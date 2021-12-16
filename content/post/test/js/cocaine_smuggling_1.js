const marginNetwork = { top: 0, right: 0, bottom: 0, left: 0};
const widthNetwork  = 680 - marginNetwork.left - marginNetwork.right;
const heightNetwork = 440 - marginNetwork.top  - marginNetwork.bottom;

//Create SVG element in chart id element
const svgNetwork = d3.select('#cocaine_smuggling_1')
	              .append('svg')
	               .attr("class", "content")
	               .attr("viewBox", `0 0 ${widthNetwork + marginNetwork.left + marginNetwork.right} ${heightNetwork + marginNetwork.top + marginNetwork.bottom}`)
	               .attr("preserveAspectRatio", "none")

var links_data = [{"source":"ABS","target":"ABS","count":8},{"source":"ABS","target":"ATS","count":1},{"source":"ABS","target":"CR","count":8},{"source":"ABS","target":"ENV","count":1},{"source":"ABS","target":"INT","count":16},{"source":"ABS","target":"ITS","count":9},{"source":"ABS","target":"PDG","count":1},{"source":"ABS","target":"PER","count":4},{"source":"ABS","target":"PRAC","count":3},{"source":"AC","target":"AC","count":1},{"source":"AC","target":"INT","count":9},{"source":"AC","target":"ITS","count":1},{"source":"ACDC","target":"ACDC","count":1},{"source":"ACDC","target":"CR","count":2},{"source":"ACDC","target":"ITS","count":13},{"source":"ACDC","target":"PER","count":4},{"source":"APL","target":"APL","count":8},{"source":"APL","target":"CR","count":3},{"source":"APL","target":"ENV","count":1},{"source":"APL","target":"INT","count":1},{"source":"APL","target":"ITS","count":29},{"source":"APL","target":"LA","count":1},{"source":"APL","target":"PEG","count":1},{"source":"APL","target":"PER","count":3},{"source":"AST","target":"AST","count":17},{"source":"AST","target":"COP","count":1},{"source":"AST","target":"DBT","count":2},{"source":"AST","target":"DEVOPS","count":1},{"source":"AST","target":"IGN","count":1},{"source":"AST","target":"INT","count":2},{"source":"AST","target":"ITS","count":32},{"source":"AST","target":"PDG","count":2},{"source":"AST","target":"PER","count":8},{"source":"ATS","target":"ABS","count":1},{"source":"ATS","target":"ATS","count":21},{"source":"ATS","target":"DBT","count":1},{"source":"ATS","target":"INT","count":3},{"source":"ATS","target":"PDG","count":1},{"source":"ATS","target":"PEG","count":1},{"source":"CAR","target":"APL","count":1},{"source":"CAR","target":"CAR","count":9},{"source":"CAR","target":"COP","count":1},{"source":"CAR","target":"INT","count":9},{"source":"CAR","target":"ITS","count":8},{"source":"IGN","target":"CR","count":4},{"source":"IGN","target":"IGN","count":13},{"source":"IGN","target":"INT","count":5},{"source":"IGN","target":"ITS","count":13},{"source":"IGN","target":"PER","count":4},{"source":"IGN","target":"PRAC","count":1},{"source":"LA","target":"AC","count":1},{"source":"LA","target":"INT","count":1},{"source":"LA","target":"ITS","count":37},{"source":"LA","target":"LA","count":18},{"source":"LA","target":"PER","count":2},{"source":"LOT","target":"LOT","count":18},{"source":"PDG","target":"ABS","count":1},{"source":"PDG","target":"AST","count":4},{"source":"PDG","target":"ATS","count":1},{"source":"PDG","target":"CAR","count":1},{"source":"PDG","target":"CR","count":8},{"source":"PDG","target":"ICS","count":1},{"source":"PDG","target":"IGN","count":3},{"source":"PDG","target":"INT","count":18},{"source":"PDG","target":"ITS","count":6},{"source":"PDG","target":"NRB","count":4},{"source":"PDG","target":"ONT","count":1},{"source":"PDG","target":"PDG","count":24},{"source":"PDG","target":"PER","count":1},{"source":"PEG","target":"CAR","count":1},{"source":"PEG","target":"ENV","count":1},{"source":"PEG","target":"INFRA","count":1},{"source":"PEG","target":"ITS","count":22},{"source":"PEG","target":"LA","count":1},{"source":"PEG","target":"PEG","count":51},{"source":"PEG","target":"PER","count":6},{"source":"RPT","target":"ABS","count":1},{"source":"RPT","target":"APL","count":1},{"source":"RPT","target":"IGN","count":1},{"source":"RPT","target":"INT","count":9},{"source":"RPT","target":"ITS","count":2},{"source":"RPT","target":"RPT","count":11},{"source":"RPT","target":"RTR","count":1},{"source":"RWWA","target":"INT","count":1},{"source":"RWWA","target":"ITS","count":1},{"source":"RWWA","target":"PER","count":1},{"source":"RWWA","target":"RWWA","count":1},{"source":"SCOR","target":"SCOR","count":5},{"source":"SPK","target":"INT","count":4},{"source":"SPK","target":"ITS","count":4},{"source":"SPK","target":"SPK","count":21},{"source":"TS","target":"CS","count":1},{"source":"TS","target":"TS","count":10}];
var nodes_data = [{"name":"ABS","total":11}, {"name":"ATS","total":23}, {"name":"CR","total":25},{"name":"ENV","total":3},{"name":"INT","total":78},{"name":"ITS","total":177},{"name":"PDG","total":28},{"name":"PER","total":33},{"name":"PRAC","total":4},{"name":"AC","total":2},{"name":"ACDC","total":1},{"name":"APL","total":10},{"name":"LA","total":20},{"name":"PEG","total":53},{"name":"AST","total":21},{"name":"COP","total":2},{"name":"DBT","total":3},{"name":"DEVOPS","total":1},{"name":"IGN","total":18},{"name":"CAR","total":11},{"name":"LOT","total":18},{"name":"ICS","total":1},{"name":"NRB","total":4},{"name":"ONT","total":1},{"name":"INFRA","total":1},{"name":"RPT","total":11},{"name":"RTR","total":1},{"name":"RWWA","total":1},{"name":"SCOR","total":5},{"name":"SPK","total":21},{"name":"CS","total":1},{"name":"TS","total":10}];

var nodeSizeScale = d3.scaleLinear()
  .domain(d3.extent(nodes_data, d => d.total/2))
  .range([30, 70]);

var linkSizeScale = d3.scaleLinear()
  .domain(d3.extent(links_data, d => d.count))
  .range([5, 30]);

var linkColourScale = d3.scaleLinear()
  .domain(d3.extent(links_data, d => d.count))
  .range(['blue', 'red']);

var radius = 15;
var simulation = d3.forceSimulation()
          .nodes(nodes_data);
                              
var link_force =  d3.forceLink(links_data)
          .id(function(d) {return d.name;})
          .distance(50);

var charge_force = d3.forceManyBody()
    .strength(-1500)
    .distanceMin(5)
    .distanceMax(700);    

var center_force = d3.forceCenter(widthNetwork / 2, heightNetwork / 2);  

simulation
    .force("charge_force", charge_force)
    .force("center_force", center_force)
    .force("link",link_force);
  
simulation.on("tick", tickActions);

svgNetwork.append("defs").selectAll("marker")
	.data(["dominating"])
	.enter().append("marker")
	.attr('markerUnits', 'userSpaceOnUse')
	.attr("id", function (d) {
		return d;
	})
	.attr("viewBox", "0 -5 10 10")
	.attr("refX", 0)
	.attr("refY", 0)
	.attr("markerWidth", 12)
	.attr("markerHeight", 12)
	.attr("orient", "auto-start-reverse")
	.append("path")
	.attr("d", "M0,-5L10,0L0,5")
	.attr("fill", "red");

// add encompassing group for the zoom 
var g = svgNetwork.append("g")
    .attr("class", "everything");

// add the curved links to our graphic
var link = g.selectAll(".link")
    .data(links_data)
    .enter()
    .append("path")
    .attr("class", "link")
    .style('stroke', d => {return linkColourScale(d.count);})
    .attr('stroke-opacity', 0.5)
    .attr('stroke-width', d => {return linkSizeScale(d.count);})
	  .attr("marker-end", function(d) {
        if(JSON.stringify(d.target) !== JSON.stringify(d.source))
           return "url(#dominating)";
    });

// draw circles for the nodes 
var node = g.append("g")
        .attr("class", "nodes") 
        .selectAll("circle")
        .data(nodes_data)
        .enter()
        .append("circle")
        .attr("r", d => {return nodeSizeScale(d.total/2);})
        .attr("fill", "#333")
        .on("mouseover", mouseOver(.1))
        .on("mouseout", mouseOut); 

// add text labels
var text = g.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes_data)
    .enter().append("text")
    .style("text-anchor","middle")
    .style("font-weight", "bold")
    .style("pointer-events", "none")
    .attr("dy", ".35em")
    .text(function(d) { return d.name });

//add drag capabilities  
var drag_handler = d3.drag()
  .on("start", drag_start)
  .on("drag", drag_drag)
  .on("end", drag_end); 

drag_handler(node);

//add zoom capabilities
var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

zoom_handler(svgNetwork);     

//Drag functions 
//d is the node 
function drag_start(event, d) {
 if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

//make sure you can't drag the circle outside the box
function drag_drag(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function drag_end(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

//Zoom functions 
function zoom_actions(event, d){
    g.attr("transform", event.transform)
}

function tickActions() {
    //update circle positions each tick of the simulation 
       node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
        
    //update link positions 
    link.attr("d", positionLink1);
	  link.filter(function(d){ return JSON.stringify(d.target) !== JSON.stringify(d.source); })
      .attr("d",positionLink2);

    text.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
}

function positionLink1(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

  // recalculate and back off the distance
function positionLink2(d) {
	    // length of current path
    var pl = this.getTotalLength(),
        // radius of circle plus marker head
        r = nodeSizeScale(d.target.total/2)+ 12, //12 is the "size" of the marker Math.sqrt(12**2 + 12 **2)
        // position close to where path intercepts circle	
        m = this.getPointAtLength(pl - r);          

     var dx = m.x - d.source.x,
        dy = m.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);

      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + m.x + "," + m.y;
}

// build a dictionary of nodes that are linked
var linkedByIndex = {};
links_data.forEach(function(d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
});

// check the dictionary to see if nodes are linked
function isConnected(a, b) {
    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
}

// fade nodes on hover
function mouseOver(opacity) {
    return function(event, d) {
        // check all other nodes to see if they're connected
        // to this one. if so, keep the opacity at 1, otherwise
        // fade
        node.style("stroke-opacity", function(o) {
            thisOpacity = isConnected(d, o) ? 1 : opacity;
            return thisOpacity;
        });
        node.style("fill-opacity", function(o) {
            thisOpacity = isConnected(d, o) ? 1 : opacity;
            return thisOpacity;
        });
        text.style("fill-opacity", function(o) {
            thisOpacity = isConnected(d, o) ? 1 : opacity;
            return thisOpacity;
        });
        // also style link accordingly
        link.style("stroke-opacity", function(o) {
            return o.source === d || o.target === d ? 1 : opacity;
        });
        link.style("stroke", function(o) {
            return o.source === d || o.target === d ? linkColourScale(o.count) : "#333";
        });
    };
}

function mouseOut() {
    node.style("stroke-opacity", 1);
    node.style("fill-opacity", 1);
    text.style("fill-opacity", 1);
    link.style("stroke-opacity", 0.5);
    link.style("stroke", d => {return linkColourScale(d.count);});
}
//Create SVG element in chart id element
const svgNetwork3 = d3.select('#cocaine_smuggling_3')
	              .append('svg')
	               .attr("class", "content")
	               .attr("viewBox", `0 35 ${widthNetwork + marginNetwork.left + marginNetwork.right} ${heightNetwork + marginNetwork.top + marginNetwork.bottom}`)
	               .attr("preserveAspectRatio", "none")
	               // .attr("transform", "translate(0,0) rotate(0)")

var color3 = ['#fbb4ae', '#b3cde3', '#decbe4', '#fed9a6', '#e5d8bd', '#fddaec', '#f2f2f2']

var simulation3 = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(widthNetwork / 2, heightNetwork / 2));
d3.json("data/cocaine_smuggling_3.json")
  .then(function(graph) {

	function ticked() {
	link
	    .attr("x1", function(d) { return d.source.x; })
	    .attr("y1", function(d) { return d.source.y; })
	    .attr("x2", function(d) { return d.target.x; })
	    .attr("y2", function(d) { return d.target.y; });

	node
	    .attr("transform", function(d) {
	      return "translate(" + d.x + "," + d.y + ")";
	    })
	}

	function dragstarted(event, d) {
	  if (!event.active) simulation3.alphaTarget(0.3).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	function dragged(event, d) {
	  d.fx = event.x;
	  d.fy = event.y;
	}

	function dragended(event, d) {
	  if (!event.active) simulation3.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}  

	// tooltip
	// var tooltipNetwork3 = d3.select("#cocaine_smuggling_3").append("div")
	                        // .attr("class", "tooltip-html")
	                        // .style("opacity", 0); 
	// tooltip mouseover event handler
	var mouseoverNetwork3 = function(event, d) {
		d3.select(this)
		   .transition()
		   .duration(300) 		  
		   .attr("r", function (d) {if (d.degree <= 1) {return 6} else {return 8*Math.log(d.degree);}});

		// var html3 = '<p style="color:black;">' + d.id                    + '</p>' +
		            // '<p style="color:black;">' + d.degree + ' conexões'  + '</p>' +
		            // '<p style="color:black;">' + d.group  + ' group' + '</p>';

		// tooltipNetwork3.html(html3)
					   // .style("left", (event.pageX) + "px")
					   // .style("top", (event.pageY)  + "px")
					   // .transition()
					   // .duration(300) // ms
					   // .style("opacity", 1); // started as 0!
	};
	// tooltip mouseout event handler
	var mouseoutNetwork3 = function(d) {
		d3.select(this)
		   .transition()
		   .duration(300) 		  
		   .attr("r", function (d) {if (d.degree <= 1) {return 3} else {return 5*Math.log(d.degree);}});

		// tooltipNetwork3.transition()
		               // .duration(300) // ms                       
		               // .style("opacity", 0); // don't care about position!;                       
	};
  var link = svgNetwork3.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .style('stroke-width', 0.4)
    .style('stroke','#000000');
  var node = svgNetwork3.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes)
    .enter().append("g")
    .call(d3.drag()
          .on("start", dragstarted)
          .on("drag",  dragged)
          .on("end",   dragended))

  var circles = node.append("circle")
      .attr("r",    function (d) {if (d.degree <= 1) {return 3} else {return 5*Math.log(d.degree);}})
      .attr("fill", function (d) {return color3[d.group-1];})
      .style("stroke-width", .7)
      .style("stroke", '#000000')
      .on("mouseover", mouseoverNetwork3)
      .on("mouseout", mouseoutNetwork3);
	     
  simulation3
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation3.force("link")
      .links(graph.links)
      .distance(50);

  simulation3.force("charge")
        .strength(-250)
        .distanceMin(5)
        .distanceMax(3000);

   simulation3.force("xAxis",d3.forceX(15))
          .force("yAxis",d3.forceY(5));

});
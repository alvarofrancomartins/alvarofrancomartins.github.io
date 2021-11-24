long_string1 = """
const marginNetwork = { top: 0, right: 0, bottom: 0	, left: 0 };
const widthNetwork  = 680 - marginNetwork.left - marginNetwork.right;
const heightNetwork = 440 - marginNetwork.top  - marginNetwork.bottom;

//Create SVG element in chart id element
const svgNetwork_ = d3.select('#dismantling_cocaine_networks')
	              .append('svg')
	               .attr("class", "content")
	               .attr("viewBox", `0 -250 ${widthNetwork + marginNetwork.left + marginNetwork.right} ${heightNetwork + marginNetwork.top + marginNetwork.bottom + 500}`)
	               .attr("preserveAspectRatio", "none")
	               // .attr("transform", "translate(0,0) rotate(0)")

var color_ = ['#fbb4ae', '#b3cde3', '#decbe4', '#ffffcc', '#fddaec', '#f2f2f2']

var simulation_ = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(widthNetwork / 2, heightNetwork / 2));

//svgNetwork_.append("text").attr("x", 3).attr("y", -100).text("ATTACK").style("font-size", "20px").style("font-weight", "bold").attr("alignment-baseline","middle")

d3.json("data/cocaine_smuggling_4_ç.json")
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
	  if (!event.active) simulation_.alphaTarget(0.3).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	function dragged(event, d) {
	  d.fx = event.x;
	  d.fy = event.y;
	}

	function dragended(event, d) {
	  if (!event.active) simulation_.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}  

	// tooltip
	var tooltipNetwork_ = d3.select("#dismantling_cocaine_networks").append("div")
	                        .attr("class", "tooltip-html")
	                        .style("opacity", 0); 
	// tooltip mouseover event handler
	var mouseoverNetwork_ = function(event, d) {
		d3.select(this)
		   .transition()
		   .duration(300) 		  
		   .attr("r", function (d) {if (d.degree <= 1) {return 6} else {return 8*Math.log(d.degree);}});

		var html_ = '<p style="color:black;">' + d.id                    + '</p>' +
		            '<p style="color:black;">' + d.degree + ' conexões'  + '</p>' +
		            '<p style="color:black;">' + d.group  + ' group'     + '</p>';

		tooltipNetwork_.html(html_)
					   .style("left", (event.pageX) + "px")
					   .style("top", (event.pageY)  + "px")
					   .transition()
					   .duration(300) // ms
					   .style("opacity", 1); // started as 0!
	};
	// tooltip mouseout event handler
	var mouseoutNetwork_ = function(d) {
		d3.select(this)
		   .transition()
		   .duration(300) 		  
		   .attr("r", function (d) {if (d.degree <= 1) {return 3} else {return 5*Math.log(d.degree);}});

		tooltipNetwork_.transition()
		               .duration(300) // ms                       
		               .style("opacity", 0); // don't care about position!;                       
	};
  var link = svgNetwork_.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .style('stroke-width', 0.8)
    .style('stroke','#000000');
  var node = svgNetwork_.append("g")
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
      .attr("fill", function (d) {return color_[d.group-1];})
      .style("stroke-width", 0.7)
      .style("stroke", '#000000')
      .on("mouseover", mouseoverNetwork_)
      .on("mouseout", mouseoutNetwork_);

  circles.filter((d) => d.nextarget == 1)
     .transition()
		 .delay(800)
		 .duration(100)
		 .attr("fill", '#e41a1c');

  circles.filter((d) => d.nextarget != 1)
     .transition()
		 .delay(500)
		 .duration(50)
		 .attr("fill", '');

  node.filter((d) => d.nextarget == 1).append("text")
    .transition()
		.delay(800)
		.duration(100)
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function(d) {if (d.nextarget == 1) { return 'TARGET'}})
    //.style("z-index", 1000).style("stroke", "#ffffff").style("stroke-width", 2)
    //.style("opacity", 1)
    .style('font-weight', 'bold');

  simulation_
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation_.force("link")
      .links(graph.links)
      .distance(50);

  simulation_.force("charge")
        .strength(-250)
        .distanceMin(5)
        .distanceMax(3000);

   simulation_.force("xAxis",d3.forceX(150))
          .force("yAxis",d3.forceY(5));
});
"""

addTARGET  = """svgNetwork_.append("text").attr("x", 3).attr("y", -100).transition().delay(2500).duration(0).text("REMOVING TARGET").style("font-size", "30px").style("font-weight", "bold").attr("alignment-baseline","middle")"""

from time import sleep

for i in range(52):

	if i  == 0:

		sleep(2.2)

		with open('dismantling_cocaine_networksa.js', 'w') as f:
			f.write(long_string1.replace('ç', str(i)) + addTARGET)

	else:

		sleep(2.2)

		with open('dismantling_cocaine_networksa.js', 'w') as f:
			f.write(long_string1.replace('ç', str(i)).replace('TARGET', 'NEW TARGET') + addTARGET)

	sleep(2.2)
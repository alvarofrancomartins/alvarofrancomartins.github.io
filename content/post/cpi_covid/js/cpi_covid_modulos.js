//Create SVG element in chart id element
const svgNetwork_modulos = d3.select('#cpi_covid_modulos')
	              .append('svg')
	               .attr("class", "content")
	               .attr("viewBox", `0 30 ${widthNetwork + marginNetwork.left + marginNetwork.right} ${heightNetwork + marginNetwork.top + marginNetwork.bottom - 50}`)
	               .attr("preserveAspectRatio", "none")

var color2 = ['#662506', '#cc4c02', '#fe9929', '#fee391', '#ffffe5']

svgNetwork_modulos.append("circle").attr("cx",10).attr("cy",35+10).attr("r", 8).style("fill", '#662506').style("stroke", "#000000").style("stroke-width", "0.5")
svgNetwork_modulos.append("circle").attr("cx",10).attr("cy",75+10).attr("r", 8).style("fill", '#cc4c02').style("stroke", "#000000").style("stroke-width", "0.5")
svgNetwork_modulos.append("circle").attr("cx",10).attr("cy",115+10).attr("r", 8).style("fill", '#fe9929').style("stroke", "#000000").style("stroke-width", "0.5")
svgNetwork_modulos.append("circle").attr("cx",10).attr("cy",155+10).attr("r", 8).style("fill", '#fee391').style("stroke", "#000000").style("stroke-width", "0.5")
svgNetwork_modulos.append("circle").attr("cx",10).attr("cy",195+10).attr("r", 8).style("fill", '#ffffe5').style("stroke", "#000000").style("stroke-width", "0.5")
svgNetwork_modulos.append("text").attr("x", 25).attr("y", 36+10).text("Comunidade 1").style("font-size", "10px").attr("alignment-baseline","middle")
svgNetwork_modulos.append("text").attr("x", 25).attr("y", 76+10).text("Comunidade 2").style("font-size", "10px").attr("alignment-baseline","middle")
svgNetwork_modulos.append("text").attr("x", 25).attr("y", 116+10).text("Comunidade 3").style("font-size", "10px").attr("alignment-baseline","middle")
svgNetwork_modulos.append("text").attr("x", 25).attr("y", 156+10).text("Comunidade 4").style("font-size", "10px").attr("alignment-baseline","middle")
svgNetwork_modulos.append("text").attr("x", 25).attr("y", 196+10).text("Comunidade 5").style("font-size", "10px").attr("alignment-baseline","middle")

var simulation_modulos = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(widthNetwork / 2, heightNetwork / 2));
d3.json("data/cpi_covid_modulos.json")
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

	function dragstarted_modulos(event, d) {
	  if (!event.active) simulation_modulos.alphaTarget(0.3).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	function dragged_modulos(event, d) {
	  d.fx = event.x;
	  d.fy = event.y;
	}

	function dragended_modulos(event, d) {
	  if (!event.active) simulation_modulos.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}  

	// tooltip
	var tooltipNetwork_modulos = d3.select("#cpi_covid_modulos").append("div")
	                        .attr("class", "tooltip-html")
	                        .style("opacity", 0); 
	// tooltip mouseover event handler
	var mouseoverNetwork_modulos = function(event, d) {
		d3.select(this)
		   .transition()
		   .duration(300) 		  
		   .attr("r", function (d) {if (d.degree < 18) {return 10;} else {return d.degree*0.5}});

		var html_modulos = '<p style="color:black;">' + d.id                    + '</p>' +
						           '<p style="color:black;">' + d.degree + ' conexões'  + '</p>' +
						           '<p style="color:black;"> comunidade: ' + d.group    + '</p>';


		tooltipNetwork_modulos.html(html_modulos)
					   .style("left", (event.pageX) + "px")
					   .style("top", (event.pageY)  + "px")
					   .transition()
					   .duration(300) // ms
					   .style("opacity", 1); // started as 0!
	};
	// tooltip mouseout event handler
	var mouseoutNetwork_modulos = function(d) {
		d3.select(this)
		   .transition()
		   .duration(300) 		  
			.attr("r", function (d) {if (d.degree <= 8) {return 3;} else {return d.degree*0.3}})

		tooltipNetwork_modulos.transition()
		               .duration(300)                       
		               .style("opacity", 0);                        
	};
  var link = svgNetwork_modulos.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value);})
  var node = svgNetwork_modulos.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes)
    .enter().append("g")
    .call(d3.drag()
          .on("start", dragstarted_modulos)
          .on("drag",  dragged_modulos)
          .on("end",   dragended_modulos))

  var circles = node.append("circle")
			.attr("r",    function (d) {if (d.degree <= 8) {return 3;} else {return d.degree*0.3}})
      .attr("fill", function (d) {return color2[d.group - 1];})
      .on("mouseover", mouseoverNetwork_modulos)
      .on("mouseout",  mouseoutNetwork_modulos);

  simulation_modulos
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation_modulos.force("link")
      .links(graph.links)
      .distance(20);

  simulation_modulos.force("charge")
        .strength(-110)
        .distanceMin(5)
        .distanceMax(3000);

   simulation_modulos.force("xAxis",d3.forceX(15))
          .force("yAxis",d3.forceY(5));
});
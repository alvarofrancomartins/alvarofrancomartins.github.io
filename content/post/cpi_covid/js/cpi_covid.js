const marginNetwork = { top: 0, right: 0, bottom: 0	, left: 0 };
const widthNetwork  = 680 - marginNetwork.left - marginNetwork.right;
const heightNetwork = 440 - marginNetwork.top  - marginNetwork.bottom;

//Create SVG element in chart id element
const svgNetwork = d3.select('#cpi_covid')
	              .append('svg')
	               .attr("class", "content")
	               .attr("viewBox", `0 12 ${widthNetwork + marginNetwork.left + marginNetwork.right} ${heightNetwork + marginNetwork.top + marginNetwork.bottom}`)
	               .attr("preserveAspectRatio", "none")
	               // .attr("transform", "translate(0,0) rotate(0)")

var color = ['#fcfcf5','#fee187','#f7941e','#fc5b2e','#d41020','#5c001d']

svgNetwork.append("circle").attr("cx",10).attr("cy",35+50).attr("r", 8).style("fill", '#fcfcf5').style("stroke", "#000000").style("stroke-width", "0.5")
svgNetwork.append("circle").attr("cx",10).attr("cy",75+50).attr("r", 8).style("fill", '#fee187').style("stroke", "#000000").style("stroke-width", "0.5")
svgNetwork.append("circle").attr("cx",10).attr("cy",115+50).attr("r", 8).style("fill", '#f7941e').style("stroke", "#000000").style("stroke-width", "0.5")
svgNetwork.append("circle").attr("cx",10).attr("cy",155+50).attr("r", 8).style("fill", '#fc5b2e').style("stroke", "#000000").style("stroke-width", "0.5")
svgNetwork.append("circle").attr("cx",10).attr("cy",195+50).attr("r", 8).style("fill", '#d41020').style("stroke", "#000000").style("stroke-width", "0.5")
svgNetwork.append("circle").attr("cx",10).attr("cy",235+50).attr("r", 8).style("fill", '#5c001d').style("stroke", "#000000").style("stroke-width", "0.5")
svgNetwork.append("text").attr("x", 25).attr("y", 36+50).text("1 Acusação").style("font-size", "10px").attr("alignment-baseline","middle")
svgNetwork.append("text").attr("x", 25).attr("y", 76+50).text("2  Acusações").style("font-size", "10px").attr("alignment-baseline","middle")
svgNetwork.append("text").attr("x", 25).attr("y", 116+50).text("3 Acusações").style("font-size", "10px").attr("alignment-baseline","middle")
svgNetwork.append("text").attr("x", 25).attr("y", 156+50).text("4 Acusações").style("font-size", "10px").attr("alignment-baseline","middle")
svgNetwork.append("text").attr("x", 25).attr("y", 196+50).text("5 Acusações").style("font-size", "10px").attr("alignment-baseline","middle")
svgNetwork.append("text").attr("x", 25).attr("y", 236+50).text("≥ 6 Acusações").style("font-size", "10px").attr("alignment-baseline","middle")

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(widthNetwork / 2, heightNetwork / 2));
d3.json("data/cpi_covid.json")
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
	  if (!event.active) simulation.alphaTarget(0.3).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	function dragged(event, d) {
	  d.fx = event.x;
	  d.fy = event.y;
	}

	function dragended(event, d) {
	  if (!event.active) simulation.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}  

	// tooltip
	var tooltipNetwork = d3.select("#cpi_covid").append("div")
	                        .attr("class", "tooltip-html")
	                        .style("opacity", 0); 
	// tooltip mouseover event handler
	var mouseoverNetwork = function(event, d) {
		d3.select(this)
		   .transition()
		   .duration(300) 		  
		   .attr("r", function (d) {if (d.degree < 18) {return 10;} else {return d.degree*0.5}});

		var html = '<p style="color:black;">' + d.id                    + '</p>' +
		           '<p style="color:black;">' + d.degree + ' conexões'  + '</p>' +
		           '<p style="color:black;">' + d.group  + ' acusações' + '</p>';

		tooltipNetwork.html(html)
					   .style("left", (event.pageX) + "px")
					   .style("top", (event.pageY)  + "px")
					   .transition()
					   .duration(300) // ms
					   .style("opacity", 1); // started as 0!
	};
	// tooltip mouseout event handler
	var mouseoutNetwork = function(d) {
		d3.select(this)
		   .transition()
		   .duration(300) 		  
		   .attr("r", function (d) {return d.degree*0.3;});

		tooltipNetwork.transition()
		               .duration(300) // ms                       
		               .style("opacity", 0); // don't care about position!;                       
	};
  var link = svgNetwork.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); })
  var node = svgNetwork.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes)
    .enter().append("g")
    .call(d3.drag()
          .on("start", dragstarted)
          .on("drag",  dragged)
          .on("end",   dragended))

  var circles = node.append("circle")
      .attr("r",    function (d) {return d.degree*0.3;})
      .attr("fill", function (d) {if (d.group < 6) {return color[d.group-1];} else {return '#5c001d';}})
      .on("mouseover", mouseoverNetwork)
      .on("mouseout", mouseoutNetwork);
	     
  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links)
      .distance(50);

  simulation.force("charge")
        .strength(-100)
        .distanceMin(5)
        .distanceMax(3000);

   simulation.force("xAxis",d3.forceX(15))
          .force("yAxis",d3.forceY(5));

});
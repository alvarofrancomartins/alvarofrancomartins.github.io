var collors2 = d3.scaleThreshold()
            .domain([0, 1, 2, 3, 4])
            .range(['#662506', '#cc4c02', '#fe9929', '#fee391', '#ffffe5']);

// append the svg object to the body of the page
const svg_c = d3.select("#barplots_nc")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 20)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const tooltipc = d3.select("#barplots_nc").append("div")
                            .attr("class", "tooltip-html")
                            .style("opacity", 0); 

// Initialize the X axis
const x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
const xAxis = svg_c.append("g")
  .style("font-size", "20px")
  .attr("transform", `translate(0,${height+10})`)

// Initialize the Y axis
const y = d3.scaleLinear()
  .range([ height, 0]);
const yAxis = svg_c.append("g")
  .style("font-size", "20px")
  .call(d3.axisLeft(y).ticks(5))
  .attr("class", "myYaxis");

function update(selectedVar) {

    // tooltip mouseover event handler
    var mouseoverc = function(event, d) {
      d3.select(this)
          .transition()
          .duration(300) 
          .style("opacity", 0.9);

      var html = d[selectedVar];

      tooltipc.html(html)
               .style("left", (event.pageX) + "px")
               .style("top",  (event.pageY) + "px")
               .transition()
               .duration(300) // ms
               .style("opacity", 1); // started as 0!
       }

    var mouseoutc = function(d) {
      d3.select(this)
          .transition()
          .duration(300)
          .style("opacity", 1)

      tooltipc.transition()
                     .duration(300) // ms                       
                     .style("opacity", 0); // don't care about position!;                       
    };

  // Parse the Data
  d3.csv("data/cpi_c.csv").then( function(data) {

    // X axis
    x.domain(data.map(d => d.x));
    xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    y.domain([0, d3.max(data, d => +d[selectedVar]) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y).ticks(5));

    const u = svg_c.selectAll("rect")
      .data(data)    

    // update bars
    u.join("rect")
      .transition('change')
      .duration(1000)
        .attr("class", "bar")
        .attr("x", d => x(d.x))
        .attr("y", d => y(d[selectedVar]))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d[selectedVar]))
        .style("fill", function (d,i) { return collors2(i - 1)});

    u.join("rect")
    .on('mouseover',  mouseoverc)
    .on('mouseleave', mouseoutc);

  })

}

// Initialize plot
update('npessoas')
update('npessoas')

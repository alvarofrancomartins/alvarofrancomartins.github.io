// append the svg object to the body of the page
const svg2 = d3.select('#barplots_bets')
                .append('svg')
                // .attr("width",  width + margin.left + margin.right)
                // .attr("height",  width + margin.left + margin.right)
                .attr("class", "content")
                .attr("viewBox", `${-margin.left} 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)

// Parse the Data
d3.csv("data/cpi_bets.csv").then(function(data) {

  const x = d3.scaleLinear()
    .domain([0, 0.28])
    .range([ 0, width]);
    // .ticks(50);

  svg2.append("g")
    .attr("transform", `translate(0, ${height})`)
    .style("font-size", "20px")
    .call(d3.axisBottom(x).ticks(5))
    .selectAll("text")
      .attr("transform", "translate(0,0) rotate(0)")
      .style("text-anchor", "middle");

  const y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(d => d.nomes))
    .padding(.1);
  svg2.append("g")
  .style("font-size", "18px")
    .call(d3.axisLeft(y))

    var tooltipbets = d3.select("#barplots_bets").append("div")
                            .attr("class", "tooltip-html")
                            .style("opacity", 0); 
    // tooltip mouseover event handler
    var mouseoverbets = function(event, d) {
      d3.select(this)
          .transition()
          .duration(300)
          .style("opacity", 0.8);

      var html = '<p style="color:black;">' +  d.bet + '</p>';

      tooltipbets.html(html)
               .style("left", (event.pageX) + "px")
               .style("top", (event.pageY) + "px")
               .transition()
               .duration(300) // ms
               .style("opacity", 1); // started as 0!
       }

      var mouseoutbets = function (event, d) {
         d3.select(this)
          .transition()
          .duration(300)
          .style("opacity", 1)

        tooltipbets.transition()
                     .duration(300) // ms 
                     .style("opacity", 0); 
      }

  svg2.selectAll("myRect")
    .data(data)
    .join("rect")
    .attr("x",           x(0.001))
    .attr("y",      d => y(d.nomes))
    .attr("width",  d => x(d.bet))
    .attr("height", y.bandwidth())
    .on("mouseover",  mouseoverbets)
    .on("mouseleave", mouseoutbets)

    .style("fill",   function (d,i){return collors(i)});
})

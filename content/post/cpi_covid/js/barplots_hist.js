const svg_hist = d3.select("#barplots_hist")
  .append('svg')
                // .attr("width",  width + margin.left + margin.right)
                // .attr("height",  width + margin.left + margin.right)
                .attr("class", "content")
                .attr("viewBox", `${-margin.left} 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)

d3.csv("data/cpi_hist.csv").then(function(data) {

const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(d => d.x))
  .padding(0.2);
svg_hist.append("g")
  .attr("transform", `translate(0, ${height})`)
  .style("font-size", "20px")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(6.5,0)rotate(0)")
    .style("text-anchor", "end");

const y = d3.scaleLinear()
  .domain([0, 0.7])
  .range([ height, 10]);
svg_hist.append("g")
.style("font-size", "20px")
  .call(d3.axisLeft(y).ticks(5));

    var tooltiphist = d3.select("#barplots_hist").append("div")
                            .attr("class", "tooltip-html")
                            .style("opacity", 0); 
    // tooltip mouseover event handler
    var mouseoverhist = function(event, d) {
      d3.select(this)
          .transition()
          .duration(300)
          .style("opacity", 0.8);

      var html = d.y + '';

      tooltiphist.html(html)
               .style("left", (event.pageX) + "px")
               .style("top", (event.pageY) + "px")
               .transition()
               .duration(300) // ms
               .style("opacity", 1); // started as 0!
       }

      var mouseouthist = function (event, d) {
         d3.select(this)
          .transition()
          .duration(300)
          .style("opacity", 1)

        tooltiphist.transition()
                     .duration(300) // ms 
                     .style("opacity", 0); 
      }

svg_hist.selectAll("mybar")
  .data(data)
  .join("rect")
    .attr("x", d => x(d.x))
    .attr("y", d => y(d.y))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.y))
    .attr("fill", "#69b3a2")
    .on("mouseover",  mouseoverhist)
    .on("mouseleave", mouseouthist)
    .style("fill",   function (d,i){return collors(i)});
})
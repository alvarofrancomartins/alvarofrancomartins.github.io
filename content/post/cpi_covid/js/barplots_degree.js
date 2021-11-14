// set the dimensions and margins of the graph
const margin = {top: 20, right: 100, bottom: 20, left: 250},
    width  = 1000 - margin.left - margin.right,
    height = 400  - margin.top  - margin.bottom;

var collors = d3.scaleThreshold()
            .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .range(['#67000d', '#8a0912', '#aa1016', '#c0151b', '#d52221', '#ea362a', '#f44f39', '#fb6a4a', '#fc8161', '#fc9879']);

// append the svg object to the body of the page
// const svg = d3.select("#barplots_degree")
//   .append("svg")
//     .attr("width",  width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

const svg = d3.select('#barplots_degree')
                .append('svg')
                // .attr("width",  width + margin.left + margin.right)
                // .attr("height",  width + margin.left + margin.right)
                .attr("class", "content")
                .attr("viewBox", `${-margin.left} 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)

d3.csv("data/cpi_degree.csv").then(function(data) {

  // Add X axis
  const x = d3.scaleLinear()
    .domain([0, 55])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", `translate(2, ${height})`)
    .style("font-size", "15px")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(0,0)rotate(0)")
      .style("text-anchor", "middle");

  const y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(d => d.nomes))
    .padding(.1);
  svg.append("g")
    .style("font-size", "18px")
    .call(d3.axisLeft(y))

    var tooltipdegree = d3.select("#barplots_degree").append("div")
                            .attr("class", "tooltip-html")
                            .style("opacity", 0); 

    // tooltip mouseover event handler
    var mouseoverdegree = function(event, d) {
      d3.select(this)
          .transition()
          .duration(300) 
          .style("opacity", 0.8);

      var html = '<p style="color:black;">' +  d.grau + ' conexões' + '</p>';

      tooltipdegree.html(html)
               .style("left", (event.pageX) + "px")
               .style("top",  (event.pageY) + "px")
               .transition()
               .duration(300) // ms
               .style("opacity", 1); // started as 0!
       }

    var mouseoutdegree = function(d) {
      d3.select(this)
          .transition()
          .duration(300)
          .style("opacity", 1)

      tooltipdegree.transition()
                     .duration(300) // ms                       
                     .style("opacity", 0); // don't care about position!;                       
    };

  // Bars
  svg.selectAll("myRect")
    .data(data)
    .join("rect")
    .attr("x", x(0.2))
    .attr("y", d => y(d.nomes))
    .attr("width", d => x(d.grau))
    .attr("height", y.bandwidth())
    .on("mouseover",  mouseoverdegree)
    .on("mouseleave", mouseoutdegree)
    .style("fill", function (d,i) { return collors(i)});
})

const marginNetwork = {top: 0, right: 0, bottom: 0, left: 0};
const widthNetwork  = 1200 - marginNetwork.left - marginNetwork.right;
const heightNetwork = 600  - marginNetwork.top  - marginNetwork.bottom;

const zoom = d3.zoom();

const x     = 200;
const y     = 100;
const k     = .55;
const scale = 1.0;

const svgNetwork = d3.select('#cocaine_smuggling_1')
	                 .append("svg")
                     .attr("width",  widthNetwork)
                     .attr("height", heightNetwork)
                     .call(zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale))
                     .call(zoom.on('zoom', (event) => {svgNetwork.attr('transform', event.transform)}))
                     .append("g")
                     .attr('transform', `translate(${x}, ${y})scale(${k})`);

var links_data = [{"source": "23rd of September Communist League", "target": "Government (Diplomatic)", "count": 4},
                  {"source": "23rd of September Communist League", "target": "Business", "count": 44},
                  {"source": "23rd of September Communist League", "target": "Military", "count": 2},
                  {"source": "23rd of September Communist League", "target": "Government (General)", "count": 8},
                  {"source": "23rd of September Communist League", "target": "Police", "count": 24},
                  {"source": "23rd of September Communist League", "target": "Journalists & Media", "count": 2},
                  {"source": "23rd of September Communist League", "target": "Educational Institution", "count": 4},
                  {"source": "Alpha-66 (Cuban counterrevolutionary)", "target": "Journalists & Media", "count": 2},
                  {"source": "Anarchists", "target": "Government (General)", "count": 2},
                  {"source": "Animal Liberation Front (ALF)", "target": "Business", "count": 4},
                  {"source": "Animal Liberation Front (ALF)", "target": "Government (General)", "count": 2},
                  {"source": "Anti-United States extremists", "target": "Government (Diplomatic)", "count": 2},
                  {"source": "Basque Fatherland and Freedom (ETA)", "target": "Business", "count": 4},
                  {"source": "Budget for the Popular Prep or Death", "target": "Educational Institution", "count": 2},
                  {"source": "Commando Internacionalista Simon Bolivar", "target": "Government (Diplomatic)", "count": 2},
                  {"source": "Democratic Revolutionary Party", "target": "Government (General)", "count": 6},
                  {"source": "Democratic Revolutionary Party", "target": "Private Citizens & Property", "count": 8},
                  {"source": "Democratic Revolutionary Party", "target": "Transportation", "count": 10},
                  {"source": "Earth Liberation Front (ELF)", "target": "Business", "count": 4},
                  {"source": "Evangelical Christians", "target": "Private Citizens & Property", "count": 2},
                  {"source": "Francisco Villa People's Front", "target": "Police", "count": 2},
                  {"source": "Francisco Villa People's Front", "target": "Violent Political Party", "count": 2},
                  {"source": "Fuerzas Armadas Revolucionarias del Pueblo (FARP)", "target": "Police", "count": 2},
                  {"source": "Fuerzas Armadas Revolucionarias del Pueblo (FARP)", "target": "Business", "count": 4},
                  {"source": "Gulf Cartel", "target": "Private Citizens & Property", "count": 2},
                  {"source": "Gunmen", "target": "Police", "count": 2},
                  {"source": "Gunmen", "target": "Business", "count": 2},
                  {"source": "Gunmen", "target": "Private Citizens & Property", "count": 4},
                  {"source": "Independent Peasants Union", "target": "Business", "count": 8},
                  {"source": "Independent Peasants Union", "target": "Private Citizens & Property", "count": 2},
                  {"source": "Indians", "target": "Violent Political Party", "count": 2},
                  {"source": "Individuals Tending Toward Savagery", "target": "Educational Institution", "count": 2},
                  {"source": "Individuals Tending Toward Savagery", "target": "Business", "count": 2},
                  {"source": "Institutional Revolutionary Party (PRI)", "target": "Private Citizens & Property", "count": 26},
                  {"source": "Institutional Revolutionary Party (PRI)", "target": "Government (General)", "count": 2},
                  {"source": "Jalisco New Generation Cartel (CJNG)", "target": "Government (Diplomatic)", "count": 2},
                  {"source": "Juarez Cartel (Carrillo-Fuentes / Mexico)", "target": "Police", "count": 2},
                  {"source": "Justice Army for Defenseless Peoples", "target": "Private Citizens & Property", "count": 2},
                  {"source": "Kidnapping gang", "target": "Police", "count": 2},
                  {"source": "Knights Templar (Caballeros Templarios)", "target": "Business", "count": 2},
                  {"source": "Mexican Students", "target": "Government (Diplomatic)", "count": 2},
                  {"source": "Militant Peasants (NFI)", "target": "Police", "count": 4},
                  {"source": "Militants of the National Action Party", "target": "Government (General)", "count": 2},
                  {"source": "Mob", "target": "Government (General)", "count": 2},
                  {"source": "Movement for Triqui Unification and Struggle", "target": "Government (General)", "count": 2},
                  {"source": "Movement of the Revolutionary Left (MIR) (Chile)", "target": "Private Citizens & Property", "count": 2},
                  {"source": "Narco-Terrorists", "target": "Business", "count": 2},
                  {"source": "National Front for the Liberation of Cuba (FLNC)", "target": "Business", "count": 2},
                  {"source": "National Front for the Liberation of Cuba (FLNC)", "target": "Government (General)", "count": 2},
                  {"source": "National Front for the Liberation of Cuba (FLNC)", "target": "Maritime", "count": 2},
                  {"source": "National Front for the Liberation of Cuba (FLNC)", "target": "Government (Diplomatic)", "count": 2},
                  {"source": "National Independent Committee for Political Prisoners and Persecuted and Missing Persons", "target": "Government (Diplomatic)", "count": 4},
                  {"source": "Pagan Sect of the Mountain", "target": "Transportation", "count": 18},
                  {"source": "Paramilitaries", "target": "Private Citizens & Property", "count": 4},
                  {"source": "People's Armed Revolutionary Branch", "target": "Business", "count": 2},
                  {"source": "People's Liberation Army (Mexico)", "target": "Government (Diplomatic)", "count": 2},
                  {"source": "People's National Liberation Movement", "target": "Government (General)", "count": 2},
                  {"source": "Poor People's Party", "target": "Government (General)", "count": 2},
                  {"source": "Poor People's Party", "target": "Business", "count": 2},
                  {"source": "Popular Revolutionary Army (Mexico)", "target": "Military", "count": 20},
                  {"source": "Popular Revolutionary Army (Mexico)", "target": "Police", "count": 10},
                  {"source": "Popular Revolutionary Army (Mexico)", "target": "Private Citizens & Property", "count": 2},
                  {"source": "Popular Revolutionary Army (Mexico)", "target": "Business", "count": 4},
                  {"source": "Popular Revolutionary Army (Mexico)", "target": "Journalists & Media", "count": 4},
                  {"source": "Popular Revolutionary Army (Mexico)", "target": "Utilities", "count": 4},
                  {"source": "Pumba and Tata Cartel", "target": "Business", "count": 2},
                  {"source": "Revolutionary Student Front", "target": "Government (Diplomatic)", "count": 4},
                  {"source": "Revolutionary Student Front", "target": "Business", "count": 2},
                  {"source": "Revolutionary Worker Clandestine Union of the People Party (PROCUP)", "target": "Police", "count": 2},
                  {"source": "Revolutionary Worker Clandestine Union of the People Party (PROCUP)", "target": "Business", "count": 4},
                  {"source": "Rival peasant band", "target": "Private Citizens & Property", "count": 2},
                  {"source": "Shining Path (SL)", "target": "Transportation", "count": 2},
                  {"source": "Southern Sierra Peasant Organization", "target": "Government (General)", "count": 4},
                  {"source": "State Council of Indian and Peasant Organization", "target": "Government (General)", "count": 2},
                  {"source": "Strikers", "target": "Police", "count": 2},
                  {"source": "Students", "target": "Private Citizens & Property", "count": 2},
                  {"source": "Taxi Drivers", "target": "Police", "count": 2},
                  {"source": "U/I Catholic Traditionalists", "target": "Private Citizens & Property", "count": 2},
                  {"source": "Union of Peoples and Organizations of the State of Guerrero (UPOEG)", "target": "Private Citizens & Property", "count": 2},
                  {"source": "Union of the People (UDP)", "target": "Government (General)", "count": 6},
                  {"source": "Union of the People (UDP)", "target": "Business", "count": 32},
                  {"source": "Union of the People (UDP)", "target": "Private Citizens & Property", "count": 2},
                  {"source": "Union of the People (UDP)", "target": "Police", "count": 2},
                  {"source": "United Popular Liberation Army of America", "target": "Business", "count": 2},
                  {"source": "Villagers", "target": "Government (General)", "count": 2},
                  {"source": "White Guard", "target": "Government (General)", "count": 2},
                  {"source": "Zapatista National Liberation Army", "target": "Business", "count": 2},
                  {"source": "Zapatista National Liberation Army", "target": "Private Citizens & Property", "count": 26},
                  {"source": "Zapatista National Liberation Army", "target": "Military", "count": 2},
                  {"source": "Zapatista National Liberation Army", "target": "Utilities", "count": 6},
                  {"source": "Zapatista National Liberation Army", "target": "Government (General)", "count": 6},
                  {"source": "Zapatista National Liberation Army", "target": "Journalists & Media", "count": 2},
                  {"source": "Zapatista National Liberation Army", "target": "Police", "count": 2},
                  {"source": "Zetas", "target": "Journalists & Media", "count": 4}];

var nodes_data = [{"name": "23rd of September Communist League", "total": 44},
                  {"name": "Alpha-66 (Cuban counterrevolutionary)", "total": 1},
                  {"name": "Anarchists", "total": 1},
                  {"name": "Animal Liberation Front (ALF)", "total": 3},
                  {"name": "Anti-United States extremists", "total": 1},
                  {"name": "Basque Fatherland and Freedom (ETA)", "total": 2},
                  {"name": "Budget for the Popular Prep or Death", "total": 1},
                  {"name": "Commando Internacionalista Simon Bolivar", "total": 1},
                  {"name": "Democratic Revolutionary Party", "total": 12},
                  {"name": "Earth Liberation Front (ELF)", "total": 2},
                  {"name": "Evangelical Christians", "total": 1},
                  {"name": "Francisco Villa People's Front", "total": 2},
                  {"name": "Fuerzas Armadas Revolucionarias del Pueblo (FARP)", "total": 3},
                  {"name": "Gulf Cartel", "total": 1},
                  {"name": "Gunmen", "total": 4},
                  {"name": "Independent Peasants Union", "total": 5},
                  {"name": "Indians", "total": 1},
                  {"name": "Individuals Tending Toward Savagery", "total": 2},
                  {"name": "Institutional Revolutionary Party (PRI)", "total": 14},
                  {"name": "Jalisco New Generation Cartel (CJNG)", "total": 1},
                  {"name": "Juarez Cartel (Carrillo-Fuentes / Mexico)", "total": 1},
                  {"name": "Justice Army for Defenseless Peoples", "total": 1},
                  {"name": "Kidnapping gang", "total": 1},
                  {"name": "Knights Templar (Caballeros Templarios)", "total": 1},
                  {"name": "Mexican Students", "total": 1},
                  {"name": "Militant Peasants (NFI)", "total": 2},
                  {"name": "Militants of the National Action Party", "total": 1},
                  {"name": "Mob", "total": 1},
                  {"name": "Movement for Triqui Unification and Struggle", "total": 1},
                  {"name": "Movement of the Revolutionary Left (MIR) (Chile)", "total": 1},
                  {"name": "Narco-Terrorists", "total": 1},
                  {"name": "National Front for the Liberation of Cuba (FLNC)", "total": 4},
                  {"name": "National Independent Committee for Political Prisoners and Persecuted and Missing Persons", "total": 2},
                  {"name": "Pagan Sect of the Mountain", "total": 9},
                  {"name": "Paramilitaries", "total": 2},
                  {"name": "People's Armed Revolutionary Branch", "total": 1},
                  {"name": "People's Liberation Army (Mexico)", "total": 1},
                  {"name": "People's National Liberation Movement", "total": 1},
                  {"name": "Poor People's Party", "total": 2},
                  {"name": "Popular Revolutionary Army (Mexico)", "total": 22},
                  {"name": "Pumba and Tata Cartel", "total": 1},
                  {"name": "Revolutionary Student Front", "total": 3},
                  {"name": "Revolutionary Worker Clandestine Union of the People Party (PROCUP)", "total": 3},
                  {"name": "Rival peasant band", "total": 1},
                  {"name": "Shining Path (SL)", "total": 1},
                  {"name": "Southern Sierra Peasant Organization", "total": 2},
                  {"name": "State Council of Indian and Peasant Organization", "total": 1},
                  {"name": "Strikers", "total": 1},
                  {"name": "Students", "total": 1},
                  {"name": "Taxi Drivers", "total": 1},
                  {"name": "U/I Catholic Traditionalists", "total": 1},
                  {"name": "Union of Peoples and Organizations of the State of Guerrero (UPOEG)", "total": 1},
                  {"name": "Union of the People (UDP)", "total": 21},
                  {"name": "United Popular Liberation Army of America", "total": 1},
                  {"name": "Villagers", "total": 1},
                  {"name": "White Guard", "total": 1},
                  {"name": "Zapatista National Liberation Army", "total": 23},
                  {"name": "Zetas", "total": 2},
                  {"name": "Business", "total": 65},
                  {"name": "Educational Institution", "total": 4},
                  {"name": "Government (Diplomatic)", "total": 12},
                  {"name": "Government (General)", "total": 27},
                  {"name": "Journalists & Media", "total": 7},
                  {"name": "Maritime", "total": 1},
                  {"name": "Military", "total": 12},
                  {"name": "Police", "total": 29},
                  {"name": "Private Citizens & Property", "total": 45},
                  {"name": "Transportation", "total": 15},
                  {"name": "Utilities", "total": 5},
                  {"name": "Violent Political Party", "total": 2}];

var nodeSizeScale = d3.scaleLinear()
  .domain(d3.extent(nodes_data, d => d.total/2))
  .range([20, 60]);

var linkSizeScale = d3.scaleLinear()
  .domain(d3.extent(links_data, d => d.count))
  .range([1, 6]);

var linkColourScale = d3.scaleLinear()
  .domain(d3.extent(links_data, d => d.count))
  .range(['#377eb8','#e41a1c']);

var radius = 12;
var simulation = d3.forceSimulation()
          .nodes(nodes_data);

var link_force =  d3.forceLink(links_data)
          .id(function(d) {return d.name;})
          .distance(200);

var charge_force = d3.forceManyBody()
    .strength(-900)
    .distanceMin(50)
    .distanceMax(1000);    

var center_force = d3.forceCenter(widthNetwork / 2, heightNetwork / 2);  

simulation
    .force("charge_force", charge_force)
    .force("center_force", center_force)
    .force("link",link_force);
  
simulation.on("tick", tickActions);

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
    .attr('stroke-opacity', 1.0)
    .attr('stroke-width', d => {return linkSizeScale(d.count);})
	.attr("marker-end", function(d) {
        if(JSON.stringify(d.target) !== JSON.stringify(d.source))
           return "url(#dominating)";
    });

var marker = g.selectAll("marker")
    .data(["dominating"])
    .enter()
    .append("marker")
    .attr('markerUnits', 'userSpaceOnUse')
    .attr("id", function (d) { return d;})
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 0)
    .attr("refY", 0)
    .attr("markerWidth", 12)
    .attr("markerHeight", 12)
    .attr("orient", "auto-start-reverse")
    .style("pointer-events", "none")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr('fill-opacity', 1)
    .attr("fill", "#d9595a");

// draw circles for the nodes 
var node = g.append("g")
        .attr("class", "nodes") 
        .selectAll("circle")
        .data(nodes_data)
        .enter()
        .append("circle")
        .attr("r", d => {return nodeSizeScale(d.total/3);})
        .attr("fill", "#7a7a7a")
        .attr("stroke", "#000000")
        .attr("stroke-width", "1.8px")
        .style('fill-opacity', 1)
        .attr("stroke-opacity", 1)
        .on("mouseover", mouseOver(0))
        .on("mouseout", mouseOut);

var text = g.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes_data)
    .enter().append("text")
    .style("text-anchor","middle")
    .style("font-weight", "bold")
    .style("font-size", 11)
    .style("opacity", 0.5)
    .style("pointer-events", "none")
    .attr("dy", ".35em")
    // .attr("stroke", "#000000")
    // .attr("stroke-width", "1.5px")
    .style("fill", "#000000")
    .text(function(d) {return d.name});

var drag_handler = d3.drag()
  .on("start", drag_start)
  .on("drag",  drag_drag)
  .on("end",   drag_end); 

drag_handler(node);

var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

zoom_handler(svgNetwork);     

function drag_start(event, d) {
 if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function drag_drag(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function drag_end(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function zoom_actions(event, d){
    g.attr("transform", event.transform)
}

function tickActions() {
    //update circle positions each tick of the simulation 
       node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
        .attr("transform", function(d) {
            return "translate(" + (d.x = Math.max(0, Math.min(width, d.x))) + "," 
            + (d.y = Math.max(0, Math.min(height, d.y))) + ")"
        });
              
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

function positionLink2(d) {
	    // length of current path
    var pl = this.getTotalLength(),
        // radius of circle plus marker head
        r = nodeSizeScale(d.target.total/2) + 25, //12 is the "size" of the marker Math.sqrt(12**2 + 12 **2)
        // position close to where path intercepts circle	
        m = this.getPointAtLength(pl - r);          

     var dx = m.x - d.source.x,
        dy = m.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);

      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + m.x + "," + m.y;
}

var linkedByIndex = {};
links_data.forEach(function(d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
});

function isConnected(a, b) {
    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
}

function isConnected2(a, b) {
    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index];
}

function mouseOver(opacity) {
    return function(event, d) {
        node.style("stroke-opacity", function(o) {
            thisOpacity = isConnected(d, o) ? 1 : opacity;
            return thisOpacity;
        });

        node.style("fill-opacity", function(o) {
            thisOpacity = isConnected(d, o) ? 1 : opacity;
            return thisOpacity;
        });

        node.style("fill", function(o) {
            thisOpacity = isConnected(d, o) ? '#6b6b6b' : '"#7a7a7a';
            return thisOpacity;
        });

        text.style("opacity", function(o) {

            if (isConnected(d, o)) {

                if (o.name === d.name) {
                  return 1;
                }
                else {
                  if (o.total < 5) {
                      return 0;
                  }
                }
            }
            else {
                return opacity;
            }
        });

        text.style("font-size", function(o) {
            thisOpacity = isConnected(d, o) ? 25 : 11;
            return thisOpacity;
        });

        link.style("stroke-opacity", function(o) {
            return o.source === d || o.target === d ? 1 : opacity;
        });

        link.style("stroke", function(o) {
            return o.source === d || o.target === d ? linkColourScale(o.count) : "#333";
        });

        link.attr("marker-end", function(o) {
            if (o.source === d || o.target === d) {
                return "url(#dominating)";
            }
        });
    };
}

function mouseOut() {
    node.style("stroke-opacity", 1);
    node.style("fill-opacity", 1);

    text.style("opacity", 0.5);
    text.style("font-size", 15);
    // text.text(function(d) {if (d.total > 3) {return d.name}});

    node.style("fill", "#7a7a7a");
    node.style('fill-opacity', 1);

    link.attr("marker-end", "url(#dominating)");
    link.style("stroke-opacity", 0.9);
    link.style("stroke", d => {return linkColourScale(d.count);});
}
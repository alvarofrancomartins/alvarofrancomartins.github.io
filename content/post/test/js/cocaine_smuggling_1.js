const marginNetwork = { top: 0, right: 0, bottom: 0, left: 0};
const widthNetwork  = 2000 - marginNetwork.left - marginNetwork.right;
const heightNetwork = 1000 - marginNetwork.top  - marginNetwork.bottom;

const zoom = d3.zoom();

const x = 300;
const y = 200;
const scale = 0.1;
const k = 1.0;

//Create SVG element in chart id element
const svgNetwork = d3.select('#cocaine_smuggling_1')
                  .append('svg')
                   .attr("class", "content")
                   .attr("viewBox", `0 0 ${widthNetwork + marginNetwork.left + marginNetwork.right} ${heightNetwork + marginNetwork.top + marginNetwork.bottom}`)
                   .attr("preserveAspectRatio", "none")

var links_data = [{"source": "Afghan War Veterans", "target": "Business", "count": 2},
{"source": "Anarchists", "target": "Government (General)", "count": 4},
{"source": "Ansaru ash-Sharia (Russia)", "target": "Business", "count": 2},
{"source": "Anti-Government extremists", "target": "Police", "count": 2},
{"source": "Anti-Semitic extremists", "target": "Religious Figures/Institutions", "count": 6},
{"source": "Anti-Semitic extremists", "target": "Private Citizens & Property", "count": 2},
{"source": "Armed Forces of the Chechen Republic of Ichkeria", "target": "Military", "count": 6},
{"source": "Armed Forces of the Chechen Republic of Ichkeria", "target": "Police", "count": 12},
{"source": "Armed Forces of the Chechen Republic of Ichkeria", "target": "Government (General)", "count": 2},
{"source": "Armed Forces of the Chechen Republic of Ichkeria", "target": "Business", "count": 4},
{"source": "Armenian extremists", "target": "Government (Diplomatic)", "count": 2},
{"source": "Balakhani Group", "target": "Private Citizens & Property", "count": 2},
{"source": "Black Hawks (Anti-Wahhabists)", "target": "Terrorists/Non-State Militia", "count": 2},
{"source": "Caspian Group", "target": "Police", "count": 2},
{"source": "Caucasus Emirate", "target": "Government (General)", "count": 26},
{"source": "Caucasus Emirate", "target": "Police", "count": 26},
{"source": "Caucasus Emirate", "target": "Private Citizens & Property", "count": 6},
{"source": "Caucasus Emirate", "target": "Business", "count": 6},
{"source": "Caucasus Emirate", "target": "Utilities", "count": 2},
{"source": "Caucasus Emirate", "target": "Religious Figures/Institutions", "count": 4},
{"source": "Caucasus Emirate", "target": "Transportation", "count": 12},
{"source": "Caucasus Emirate", "target": "Airports & Aircraft", "count": 2},
{"source": "Caucasus Emirate", "target": "Journalists & Media", "count": 2},
{"source": "Caucasus Emirate", "target": "Educational Institution", "count": 2},
{"source": "Caucasus Province of the Islamic State", "target": "Tourists", "count": 2},
{"source": "Caucasus Province of the Islamic State", "target": "Police", "count": 40},
{"source": "Caucasus Province of the Islamic State", "target": "Military", "count": 4},
{"source": "Caucasus Province of the Islamic State", "target": "Government (General)", "count": 2},
{"source": "Caucasus Province of the Islamic State", "target": "Religious Figures/Institutions", "count": 6},
{"source": "Chechen Lone Wolf Group", "target": "Unknown", "count": 4},
{"source": "Chechen Rebels", "target": "Private Citizens & Property", "count": 86},
{"source": "Chechen Rebels", "target": "Government (General)", "count": 114},
{"source": "Chechen Rebels", "target": "Journalists & Media", "count": 6},
{"source": "Chechen Rebels", "target": "Military", "count": 182},
{"source": "Chechen Rebels", "target": "Police", "count": 144},
{"source": "Chechen Rebels", "target": "Religious Figures/Institutions", "count": 4},
{"source": "Chechen Rebels", "target": "Transportation", "count": 50},
{"source": "Chechen Rebels", "target": "Educational Institution", "count": 4},
{"source": "Chechen Rebels", "target": "Business", "count": 16},
{"source": "Chechen Rebels", "target": "NGO", "count": 2},
{"source": "Chechen Rebels", "target": "Unknown", "count": 28},
{"source": "Chechen Rebels", "target": "Terrorists/Non-State Militia", "count": 2},
{"source": "Chechen Rebels", "target": "Utilities", "count": 2},
{"source": "Christian State-Holy Rus", "target": "Business", "count": 2},
{"source": "Congress of Kabardian People", "target": "Government (General)", "count": 2},
{"source": "Cossack Separatists", "target": "NGO", "count": 2},
{"source": "Dagestani Shari'ah Jamaat", "target": "Government (General)", "count": 2},
{"source": "Dagestani Shari'ah Jamaat", "target": "Military", "count": 4},
{"source": "Dagestani Shari'ah Jamaat", "target": "Private Citizens & Property", "count": 2},
{"source": "Dagestani Shari'ah Jamaat", "target": "Police", "count": 2},
{"source": "Grozny Jamaat", "target": "Military", "count": 2},
{"source": "Guerrillas", "target": "Religious Figures/Institutions", "count": 2},
{"source": "Gunib Group", "target": "Police", "count": 2},
{"source": "Gunmen", "target": "Police", "count": 4},
{"source": "Gunmen", "target": "Private Citizens & Property", "count": 4},
{"source": "Gunmen", "target": "Journalists & Media", "count": 2},
{"source": "Gunmen", "target": "Government (General)", "count": 10},
{"source": "Gunmen", "target": "NGO", "count": 2},
{"source": "Gunmen", "target": "Religious Figures/Institutions", "count": 2},
{"source": "Imam Shamil Battalion", "target": "Transportation", "count": 4},
{"source": "Ingush Rebels", "target": "Military", "count": 4},
{"source": "Ingush Rebels", "target": "Government (General)", "count": 2},
{"source": "Ingush Rebels", "target": "Police", "count": 2},
{"source": "Islambouli Brigades of al-Qaida", "target": "Airports & Aircraft", "count": 4},
{"source": "Islambouli Brigades of al-Qaida", "target": "Transportation", "count": 4},
{"source": "Islamic State of Iraq and the Levant (ISIL)", "target": "Police", "count": 4},
{"source": "Islamic State of Iraq and the Levant (ISIL)", "target": "Government (General)", "count": 2},
{"source": "Islamic State of Iraq and the Levant (ISIL)", "target": "Transportation", "count": 2},
{"source": "Islamic State of Iraq and the Levant (ISIL)", "target": "Private Citizens & Property", "count": 2},
{"source": "Islamist extremists", "target": "Police", "count": 4},
{"source": "Izberbash Gang", "target": "Unknown", "count": 2},
{"source": "Jihadi-inspired extremists", "target": "Transportation", "count": 2},
{"source": "Jihadi-inspired extremists", "target": "Police", "count": 2},
{"source": "Jihadi-inspired extremists", "target": "Government (General)", "count": 2},
{"source": "Karabulak Gang", "target": "Police", "count": 2},
{"source": "Kata'ib al-Khoul", "target": "Police", "count": 2},
{"source": "Kata'ib al-Khoul", "target": "Government (General)", "count": 2},
{"source": "Kizilyurtovskiy Group", "target": "Police", "count": 2},
{"source": "Makhachkala Gang", "target": "Police", "count": 6},
{"source": "Makhachkala Gang", "target": "Government (General)", "count": 2},
{"source": "Militant Organization of Russian Nationalists", "target": "Private Citizens & Property", "count": 2},
{"source": "Misanthropic Division", "target": "Journalists & Media", "count": 2},
{"source": "Muslim Separatists", "target": "Educational Institution", "count": 2},
{"source": "Muslim extremists", "target": "Police", "count": 12},
{"source": "Muslim extremists", "target": "Religious Figures/Institutions", "count": 6},
{"source": "Muslim extremists", "target": "Educational Institution", "count": 2},
{"source": "Muslim extremists", "target": "Government (General)", "count": 2},
{"source": "Muslim extremists", "target": "Business", "count": 4},
{"source": "Muslim extremists", "target": "Private Citizens & Property", "count": 4},
{"source": "NVF", "target": "Private Citizens & Property", "count": 4},
{"source": "NVF", "target": "Police", "count": 4},
{"source": "Neo-Nazi extremists", "target": "Private Citizens & Property", "count": 2},
{"source": "Neo-Nazi extremists", "target": "Journalists & Media", "count": 2},
{"source": "Neo-Nazi extremists", "target": "Religious Figures/Institutions", "count": 2},
{"source": "New Revolutionary Alternative (NRA)", "target": "Government (General)", "count": 2},
{"source": "People's Militia of Dagestan", "target": "Police", "count": 2},
{"source": "People's Militia of Dagestan", "target": "Journalists & Media", "count": 2},
{"source": "Pro-Khasbulaton Rebels", "target": "Telecommunication", "count": 4},
{"source": "Rebels", "target": "Government (General)", "count": 2},
{"source": "Rebels", "target": "Military", "count": 6},
{"source": "Revolutionary Military Council", "target": "Private Citizens & Property", "count": 2},
{"source": "Right-wing extremists", "target": "NGO", "count": 2},
{"source": "Riyadus-Salikhin Reconnaissance and Sabotage Battalion of Chechen Martyrs", "target": "Government (General)", "count": 8},
{"source": "Riyadus-Salikhin Reconnaissance and Sabotage Battalion of Chechen Martyrs", "target": "Educational Institution", "count": 2},
{"source": "Riyadus-Salikhin Reconnaissance and Sabotage Battalion of Chechen Martyrs", "target": "Police", "count": 4},
{"source": "Riyadus-Salikhin Reconnaissance and Sabotage Battalion of Chechen Martyrs", "target": "Transportation", "count": 2},
{"source": "Riyadus-Salikhin Reconnaissance and Sabotage Battalion of Chechen Martyrs", "target": "Utilities", "count": 2},
{"source": "Riyadus-Salikhin Reconnaissance and Sabotage Battalion of Chechen Martyrs", "target": "Private Citizens & Property", "count": 2},
{"source": "Russian separatists", "target": "Government (General)", "count": 2},
{"source": "SERB Group (Russian Liberation Movement)", "target": "Private Citizens & Property", "count": 2},
{"source": "SKIF Detachment", "target": "Government (Diplomatic)", "count": 2},
{"source": "Sayfullakh", "target": "Police", "count": 2},
{"source": "Shamil Group", "target": "Educational Institution", "count": 2},
{"source": "Skinheads", "target": "Private Citizens & Property", "count": 4},
{"source": "South Group (Russia)", "target": "Educational Institution", "count": 2},
{"source": "Special Purpose Islamic Regiment (SPIR)", "target": "Military", "count": 4},
{"source": "Special Purpose Islamic Regiment (SPIR)", "target": "Business", "count": 2},
{"source": "Sword of Islam", "target": "Government (General)", "count": 2},
{"source": "Vanguard of Red Youth (AKM)", "target": "Transportation", "count": 2},
{"source": "Wolves of Islam", "target": "Government (General)", "count": 2}];

var nodes_data = [{"name": "Afghan War Veterans", "total": 1},
{"name": "Anarchists", "total": 2},
{"name": "Ansaru ash-Sharia (Russia)", "total": 1},
{"name": "Anti-Government extremists", "total": 1},
{"name": "Anti-Semitic extremists", "total": 4},
{"name": "Armed Forces of the Chechen Republic of Ichkeria", "total": 12},
{"name": "Armenian extremists", "total": 1},
{"name": "Balakhani Group", "total": 1},
{"name": "Black Hawks (Anti-Wahhabists)", "total": 1},
{"name": "Caspian Group", "total": 1},
{"name": "Caucasus Emirate", "total": 44},
{"name": "Caucasus Province of the Islamic State", "total": 27},
{"name": "Chechen Lone Wolf Group", "total": 2},
{"name": "Chechen Rebels", "total": 320},
{"name": "Christian State-Holy Rus", "total": 1},
{"name": "Congress of Kabardian People", "total": 1},
{"name": "Cossack Separatists", "total": 1},
{"name": "Dagestani Shari'ah Jamaat", "total": 5},
{"name": "Grozny Jamaat", "total": 1},
{"name": "Guerrillas", "total": 1},
{"name": "Gunib Group", "total": 1},
{"name": "Gunmen", "total": 12},
{"name": "Imam Shamil Battalion", "total": 2},
{"name": "Ingush Rebels", "total": 4},
{"name": "Islambouli Brigades of al-Qaida", "total": 4},
{"name": "Islamic State of Iraq and the Levant (ISIL)", "total": 5},
{"name": "Islamist extremists", "total": 2},
{"name": "Izberbash Gang", "total": 1},
{"name": "Jihadi-inspired extremists", "total": 3},
{"name": "Karabulak Gang", "total": 1},
{"name": "Kata'ib al-Khoul", "total": 2},
{"name": "Kizilyurtovskiy Group", "total": 1},
{"name": "Makhachkala Gang", "total": 4},
{"name": "Militant Organization of Russian Nationalists", "total": 1},
{"name": "Misanthropic Division", "total": 1},
{"name": "Muslim Separatists", "total": 1},
{"name": "Muslim extremists", "total": 15},
{"name": "NVF", "total": 4},
{"name": "Neo-Nazi extremists", "total": 3},
{"name": "New Revolutionary Alternative (NRA)", "total": 1},
{"name": "People's Militia of Dagestan", "total": 2},
{"name": "Pro-Khasbulaton Rebels", "total": 2},
{"name": "Rebels", "total": 4},
{"name": "Revolutionary Military Council", "total": 1},
{"name": "Right-wing extremists", "total": 1},
{"name": "Riyadus-Salikhin Reconnaissance and Sabotage Battalion of Chechen Martyrs", "total": 10},
{"name": "Russian separatists", "total": 1},
{"name": "SERB Group (Russian Liberation Movement)", "total": 1},
{"name": "SKIF Detachment", "total": 1},
{"name": "Sayfullakh", "total": 1},
{"name": "Shamil Group", "total": 1},
{"name": "Skinheads", "total": 2},
{"name": "South Group (Russia)", "total": 1},
{"name": "Special Purpose Islamic Regiment (SPIR)", "total": 3},
{"name": "Sword of Islam", "total": 1},
{"name": "Vanguard of Red Youth (AKM)", "total": 1},
{"name": "Wolves of Islam", "total": 1},
{"name": "Airports & Aircraft", "total": 3},
{"name": "Business", "total": 19},
{"name": "Educational Institution", "total": 8},
{"name": "Government (Diplomatic)", "total": 2},
{"name": "Government (General)", "total": 96},
{"name": "Journalists & Media", "total": 8},
{"name": "Military", "total": 106},
{"name": "NGO", "total": 4},
{"name": "Police", "total": 141},
{"name": "Private Citizens & Property", "total": 63},
{"name": "Religious Figures/Institutions", "total": 16},
{"name": "Telecommunication", "total": 2},
{"name": "Terrorists/Non-State Militia", "total": 2},
{"name": "Tourists", "total": 1},
{"name": "Transportation", "total": 39},
{"name": "Unknown", "total": 17},
{"name": "Utilities", "total": 3}];

var nodeSizeScale = d3.scaleLinear()
  .domain(d3.extent(nodes_data, d => d.total/2))
  .range([20, 60]);

var linkSizeScale = d3.scaleLinear()
  .domain(d3.extent(links_data, d => d.count))
  .range([1, 15]);

var linkColourScale = d3.scaleLinear()
  .domain(d3.extent(links_data, d => d.count))
  .range(['#377eb8','#e41a1c']);

var radius = 15;
var simulation = d3.forceSimulation()
          .nodes(nodes_data);
                              
var link_force =  d3.forceLink(links_data)
          .id(function(d) {return d.name;})
          .distance(50);

var charge_force = d3.forceManyBody()
    .strength(-800)
    .distanceMin(35)
    .distanceMax(500);   

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
    .style("font-size", 15)
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
            thisOpacity = isConnected(d, o) ? 25 : 15;
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
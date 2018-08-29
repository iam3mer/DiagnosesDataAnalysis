var colorScaleNode = d3.scaleOrdinal(d3.schemeCategory10);
var colorScaleLink = d3.scaleSequential(d3["interpolateBlues"])
    .domain([0,9])
var colorScaleCluster = d3.scale.category20();

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(d => { return d.cie; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(d => { return d.radius; }));

//--------------------------------------------------------------------

d3.json("data/diagnosesSamplingData.json", function(error, myData) {
  if (error) throw error;console.log(myData.links)

  var minLink = d3.min(myData.links.map(d => { return d.weight; }));
  var maxLink = d3.max(myData.links.map(d => { return d.weight; }));

  var minNode = d3.min(myData.nodes.map(d => { return d.weight; }));
  var maxNode = d3.max(myData.nodes.map(d => { return d.weight; }));

  function normalizedLink (weight) {
    //return (weight-(minLink*7))/((maxLink/14)-(minLink*7));
    if (weight <= 6) {
    	return 0.25
    }
    return (weight / 60)
  }

  function normalizedNode (weight) {
  	// if (maxNode >= 100) {
  	// 	maxNode = 80;
  	// }
    // return (weight-(minNode))/((maxNode)-(minNode));
    if (weight <= 50){
    	return 1
    }
    return ((weight * 10) / 500);
  }

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(myData.links)
    .enter().append("line")

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(myData.nodes)
    .enter().append("circle")
      .attr("r", 2.5)
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(d => { 
      	var gender;
      	if (d.group == 1) {gender = "M";};
      	if (d.group == 2) {gender = "F"};
      	if (d.group == 3) {gender = "G"};
      	return "Diag-"+gender+": "+d.cie+", Weight: "+d.weight; 
      });

  simulation
      .nodes(myData.nodes)
      .on("tick", ticked);

  var force = d3.layout.force()
    .size([width, height])
    .nodes(myData.nodes)
    .linkDistance(30)
    .charge(-60)
    .on("tick", ticked);

  simulation.force("link")
      .links(myData.links);

  //.............................................................

  function ticked() {
    link
        .attr("x1", d => { return d.source.x; })
        .attr("y1", d => { return d.source.y; })
        .attr("x2", d => { return d.target.x; })
        .attr("y2", d => { return d.target.y; });

    node
        .attr("cx", d => { return d.x; })
        .attr("cy", d => { return d.y; });
  }

  //.............................................................

  d3.select("#watchLinksStrenght").on("click", function () {
    svg.selectAll("line").transition().duration(200)
       .style("stroke", "#585858")
       .style("stroke-opacity", d => { return normalizedLink (d.weight); });
    // var value = $("#watchLinksStrenght").val()
    // disabledNodeStrenght(value);
  })

  //.............................................................

  d3.select("#watchLinks").on("click", function () {
    svg.selectAll("line").transition().duration(200)
       .style("stroke", "#585858")
       .style("stroke-opacity", 0.35);
    // var value = $("#watchLinks").val()
    // disabledNodeStrenght(value);
  })

  //.............................................................

   d3.select("#noLinksStrenght").on("click", function () {
  		svg.selectAll("line").transition().duration(200)
	       .style("stroke-opacity", 0);
	    // var value = $("#noLinksStrenght").val()
    	// disabledNodeStrenght(value);
	}) 

  //.............................................................

  d3.select("#groupButton").on("click", function () {
    svg.selectAll("circle").transition().duration(2000)
       .style("fill", d => { return colorScaleNode(d.group); })
  });

  //.............................................................

  d3.select("input[type=range]")
    .on("input", linkStrength);

  //.............................................................

  d3.select("#clusterButton").on("click", function () {
      netClustering.cluster(myData.nodes, myData.links);
      svg.selectAll("circle").transition().duration(2000)
       .style("fill", d => { return colorScaleCluster(d.cluster); });
  });

  //.............................................................

  d3.select("#nodeRawButton").on("click", function () {
      svg.selectAll("circle").transition().duration(2000)
       .style("fill", "black");
  });

  //.............................................................

  d3.select("#weightNodesButton").on("click", function () {
  	if ($("#weightNodesButton").is(":checked")) {
  		svg.selectAll("circle").transition().duration(2000)
       .attr("r", d => { return normalizedNode (d.weight); });
  	} else {
  		svg.selectAll("circle").transition().duration(2000)
       .attr("r", 2.5 );
  	}
    
  });


});

//--------------------------------------------------------------------

// function disabledNodeStrenght(valueLinks) {
// 	if(valueLinks == "noLinksStrenght"){
// 		$("#weightNodesButton").prop("disabled",false);
// 	}else{
// 		svg.selectAll("circle").transition().duration(2000)
//        .attr("r", 2.5 );
// 		$("#weightNodesButton").prop("checked",false);
// 		$("#weightNodesButton").prop("disabled",true);
// 	}
// }

//--------------------------------------------------------------------

function linkStrength() {
  simulation.force("link").strength(+this.value);
  simulation.alpha(1).restart();
}

//--------------------------------------------------------------------

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

//--------------------------------------------------------------------

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

//--------------------------------------------------------------------

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

//--------------------------------------------------------------------


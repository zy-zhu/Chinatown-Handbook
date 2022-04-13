////////////////////////////////////////////////////////////
//////////////////////// Set-up ////////////////////////////
////////////////////////////////////////////////////////////

//Quick fix for resizing some things for mobile-ish viewers
var mobileScreen = ($( window ).innerWidth() < 500 ? true : false);

//Scatterplot
var margin = {left: 60, top: 20, right: 20, bottom: 60},
	width = Math.min($("#chart").width(), 840) - margin.left - margin.right,
	height = width*2/3;

var svg = d3.select("#chart").append("svg")
			.attr("width", (width + margin.left + margin.right))
			.attr("height", (height + margin.top + margin.bottom));
			
var wrapper = svg.append("g").attr("class", "chordWrapper")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//////////////////////////////////////////////////////
///////////// Initialize Axes & Scales ///////////////
//////////////////////////////////////////////////////

var opacityCircles = 0.7,
	maxDistanceFromPoint = 50;

//Set the color for each region
var color = d3.scale.ordinal()
					.range(["#EFB605", "#E58903", "#E01A25", "#C20049", "#991C71", "#66489F", "#2074A0", "#10A66E", "#7EB852"])
					.domain(["American", "Asian", "Drink", "Chinese", 
							 "French", "Italian", "Japanese", "Seafood", "Other"]);
							 
//Set the new x axis range
var xScale = d3.scale.linear()
    .range([0, width])
    .domain([0, 2300]);
	
//Set new x-axis
var xAxis = d3.svg.axis()
	.orient("bottom")
	.ticks(2)
	.tickFormat(function (d) {
		return xScale.tickFormat((mobileScreen ? 4 : 8),function(d) { 
			var prefix = d3.formatPrefix(d); 
			return prefix.scale(d) + prefix.symbol;
		})(d);
	})	
	.scale(xScale);	
//Append the x-axis
wrapper.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(" + 0 + "," + height + ")")
	.call(xAxis);
		
//Set the new y axis range
var yScale = d3.scale.linear()
	.range([height,0])
	.domain(d3.extent(chinatown, function(d) { return d.rates; }))
	.nice();	
var yAxis = d3.svg.axis()
	.orient("left")
	.ticks(6)  //Set rough # of ticks
	.scale(yScale);	
//Append the y-axis
wrapper.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + 0 + "," + 0 + ")")
		.call(yAxis);
		
		
//Scale for the bubble size
var rScale = d3.scale.linear()
			.range([mobileScreen ? 1 : 2, mobileScreen ? 10 : 16])
			.domain(d3.extent(chinatown, function(d) { return d.price_num; }));

//////////////////////////////////////////////////////
///////////////// Initialize Labels //////////////////
//////////////////////////////////////////////////////

//Set up X axis label
wrapper.append("g")
	.append("text")
	.attr("class", "x title")
	.attr("text-anchor", "end")
	.style("font-size", (mobileScreen ? 8 : 12) + "px")
	.style('font-family',"Futura")
	.attr("transform", "translate(" + width + "," + (height - 10) + ")")
	.text("Reviews");

//Set up y axis label
wrapper.append("g")
	.append("text")
	.attr("class", "y title")
	.attr("text-anchor", "end")
	.style('font-family',"Futura")
	.style("font-size", (mobileScreen ? 8 : 12) + "px")
	.attr("transform", "translate(18, 0) rotate(-90)")
	.text("Rates of Restaurant(Google)");

////////////////////////////////////////////////////////////// 
//////////////////// Set-up voronoi ////////////////////////// 
////////////////////////////////////////////////////////////// 

//Initiate the voronoi function
//Use the same variables of the data in the .x and .y as used in the cx and cy of the circle call
//The clip extent will make the boundaries end nicely along the chart area instead of splitting up the entire SVG
//(if you do not do this it would mean that you already see a tooltip when your mouse is still in the axis area, which is confusing)
var voronoi = d3.geom.voronoi()
	.x(function(d) { return xScale(d.Reviews); })
	.y(function(d) { return yScale(d.rates); })
	.clipExtent([[0, 0], [width, height]]);

var voronoiCells = voronoi(chinatown);
	
////////////////////////////////////////////////////////////	
///////////// Circles to capture close mouse event /////////
////////////////////////////////////////////////////////////	

//Create wrapper for the voronoi clip paths
var clipWrapper = wrapper.append("defs")
    .attr("class", "clipWrapper");

clipWrapper.selectAll(".clip")
	.data(voronoiCells)
	.enter().append("clipPath")
  	.attr("class", "clip")
  	//.attr("id", function(d) { return "clip-" + d.point.company_code; })
  	.append("path")
  	.attr("class", "clip-path-circle")
  	//.attr("d", function(d) { return "M" + d.join(",") + "Z"; });

//Initiate a group element for the circles	
var circleClipGroup = wrapper.append("g")
	.attr("class", "circleClipWrapper"); 
	
//Place the larger circles to eventually capture the mouse
var circlesOuter = circleClipGroup.selectAll(".circle-wrapper")
	.data(chinatown.sort(function(a,b) { return b.price_num > a.price_num; }))
	.enter().append("circle")
	.attr("class", function(d,i) { return "circle-wrapper " + d.company_code; })
	.attr("clip-path", function(d) { return "url(#clip-" + d.company_code + ")"; })
    .style("clip-path", function(d) { return "url(#clip-" + d.company_code + ")"; })
	.attr("cx", function(d) {return xScale(d.Reviews);})
	.attr("cy", function(d) {return yScale(d.rates);})
	.attr("r", maxDistanceFromPoint)
	.on("mouseover", showTooltip)
	.on("mouseout",  removeTooltip);;

////////////////////////////////////////////////////////////	
/////////////////// Scatterplot Circles ////////////////////
////////////////////////////////////////////////////////////	

//Initiate a group element for the circles	
var circleGroup = wrapper.append("g")
	.attr("class", "circleWrapper"); 
	
//Place the chinatown circles
circleGroup.selectAll("chinatown")
	.data(chinatown.sort(function(a,b) { return b.price_num > a.price_num; })) //Sort so the biggest circles are below
	.enter().append("circle")
		.attr("class", function(d,i) { return "chinatown " + d.company_code; })
		.attr("cx", function(d) {return xScale(d.Reviews);})
		.attr("cy", function(d) {return yScale(d.rates);})
		.attr("r", function(d) {return rScale(d.price_num);})
		.style("opacity", opacityCircles)
		.style("fill", function(d) {return color(d.cuisine);});
			
///////////////////////////////////////////////////////////////////////////
///////////////////////// Create the Legend////////////////////////////////
///////////////////////////////////////////////////////////////////////////

if (!mobileScreen) {
	//Legend			
	var	legendMargin = {left: 5, top: 10, right: 5, bottom: 10},
		legendWidth = 145,
		legendHeight = 270;
		
	var svgLegend = d3.select("#legend").append("svg")
				.attr("width", (legendWidth + legendMargin.left + legendMargin.right))
				.attr("height", (legendHeight + legendMargin.top + legendMargin.bottom));			

	var legendWrapper = svgLegend.append("g").attr("class", "legendWrapper")
					.attr("transform", "translate(" + legendMargin.left + "," + legendMargin.top +")");
		
	var rectSize = 15, //dimensions of the colored square
		rowHeight = 20, //height of a row in the legend
		maxWidth = 144; //widht of each row
		  
	//Create container per rect/text pair  
	var legend = legendWrapper.selectAll('.legendSquare')  	
			  .data(color.range())                              
			  .enter().append('g')   
			  .attr('class', 'legendSquare') 
			  .attr("transform", function(d,i) { return "translate(" + 0 + "," + (i * rowHeight) + ")"; })
			  .style("cursor", "pointer")
			  .on("mouseover", selectLegend(0.02))
			  .on("mouseout", selectLegend(opacityCircles));
	 
	//Non visible white rectangle behind square and text for better hover
	legend.append('rect')                                     
		  .attr('width', maxWidth) 
		  .attr('height', rowHeight) 			  		  
		  .style('fill', "white")
		  .style('opacity',0);
	//Append small squares to Legend
	legend.append('rect')                                     
		  .attr('width', rectSize) 
		  .attr('height', rectSize) 			  		  
		  .style('fill', function(d) {return d;});                                 
	//Append text to Legend
	legend.append('text')                                     
		  .attr('transform', 'translate(' + 22 + ',' + (rectSize/2) + ')')
		  .attr("class", "legendText")
		  .style("font-size", "10px")
		  .style('font-family',"Futura")
		  .attr("dy", ".35em")		  
		  .text(function(d,i) { return color.domain()[i]; });  

	//Create g element for bubble size legend
	var bubbleSizeLegend = legendWrapper.append("g")
							.attr("transform", "translate(" + (legendWidth/2 - 30) + "," + (color.domain().length*rowHeight + 20) +")");
	//Draw the bubble size legend
	bubbleLegend(bubbleSizeLegend, rScale, legendSizes = [1,2,4], legendName = "Restaurant Price ($)");		
}//if !mobileScreen
else {
	d3.select("#legend").style("display","none");
}

//////////////////////////////////////////////////////
/////////////////// Bubble Legend ////////////////////
//////////////////////////////////////////////////////

function bubbleLegend(wrapperVar, scale, sizes, titleName) {

	var legendSize1 = sizes[0],
		legendSize2 = sizes[1],
		legendSize3 = sizes[2],
		legendCenter = 0,
		legendBottom = 60,
		legendLineLength = 25,
		textPadding = 5,
		numFormat = d3.format(",");
	
	wrapperVar.append("text")
		.attr("class","legendTitle")
		.attr("transform", "translate(" + legendCenter + "," + 0 + ")")
		.attr("x", 0 + "px")
		.style('font-family',"Futura")
		.attr("y", 0 + "px")
		.attr("dy", "1em")
		.text(titleName);
		
	wrapperVar.append("circle")
        .attr('r', scale(legendSize1))
        .attr('class',"legendCircle")
        .attr('cx', legendCenter)
        .attr('cy', (legendBottom-scale(legendSize1)));
    wrapperVar.append("circle")
        .attr('r', scale(legendSize2))
        .attr('class',"legendCircle")
        .attr('cx', legendCenter)
        .attr('cy', (legendBottom-scale(legendSize2)));
    wrapperVar.append("circle")
        .attr('r', scale(legendSize3))
        .attr('class',"legendCircle")
        .attr('cx', legendCenter)
        .attr('cy', (legendBottom-scale(legendSize3)));
		
	wrapperVar.append("line")
        .attr('class',"legendLine")
        .attr('x1', legendCenter)
        .attr('y1', (legendBottom-2*scale(legendSize1)))
		.attr('x2', (legendCenter + legendLineLength))
        .attr('y2', (legendBottom-2*scale(legendSize1)));	
	wrapperVar.append("line")
        .attr('class',"legendLine")
        .attr('x1', legendCenter)
        .attr('y1', (legendBottom-2*scale(legendSize2)))
		.attr('x2', (legendCenter + legendLineLength))
        .attr('y2', (legendBottom-2*scale(legendSize2)));
	wrapperVar.append("line")
        .attr('class',"legendLine")
        .attr('x1', legendCenter)
        .attr('y1', (legendBottom-2*scale(legendSize3)))
		.attr('x2', (legendCenter + legendLineLength))
        .attr('y2', (legendBottom-2*scale(legendSize3)));
		
	wrapperVar.append("text")
        .attr('class',"legendText")
        .attr('x', (legendCenter + legendLineLength + textPadding))
        .attr('y', (legendBottom-2*scale(legendSize1)))
		.attr('dy', '0.25em')
		.text("$");
	wrapperVar.append("text")
        .attr('class',"legendText")
        .attr('x', (legendCenter + legendLineLength + textPadding))
        .attr('y', (legendBottom-2*scale(legendSize2)))
		.attr('dy', '0.25em')
		.text("$$");
	wrapperVar.append("text")
        .attr('class',"legendText")
        .attr('x', (legendCenter + legendLineLength + textPadding))
        .attr('y', (legendBottom-2*scale(legendSize3)))
		.attr('dy', '0.25em')
		.text("$$$$");
		
}//bubbleLegend

///////////////////////////////////////////////////////////////////////////
//////////////////// Hover function for the legend ////////////////////////
///////////////////////////////////////////////////////////////////////////
	
//Decrease opacity of non selected circles when hovering in the legend	
function selectLegend(opacity) {
	return function(d, i) {
		var chosen = color.domain()[i];
			
		wrapper.selectAll(".chinatown")
			.filter(function(d) { return d.cuisine != chosen; })
			.transition()
			.style("opacity", opacity);
	  };
}//function selectLegend

///////////////////////////////////////////////////////////////////////////
/////////////////// Hover functions of the circles ////////////////////////
///////////////////////////////////////////////////////////////////////////

//Hide the tooltip when the mouse moves away
function removeTooltip (d, i) {

	//Save the chosen circle (so not the voronoi)
	var element = d3.selectAll(".chinatown."+d.company_code);
		
	//Fade out the bubble again
	element.style("opacity", opacityCircles);
	
	//Hide tooltip
	$('.popover').each(function() {
		$(this).remove();
	}); 
  
	//Fade out guide lines, then remove them
	d3.selectAll(".guide")
		.transition().duration(200)
		.style("opacity",  0)
		.remove();
		
}//function removeTooltip

//Show the tooltip on the hovered over slice
function showTooltip (d, i) {
	
	//Save the chosen circle (so not the voronoi)
	var element = d3.selectAll(".chinatown."+d.company_code);
	
	//Define and show the tooltip
	$(element).popover({
		placement: 'auto top',
		container: '#chart',
		trigger: 'manual',
		html : true,
		content: function() { 
			return "<span style='font-size: 15px; text-align: center; font-family:futura'>" +  d.Company_Name + "</span>" + "<br>" +
				   "<span style='font-size: 11px; text-align: center;'>" + "Address: " + d.Address + "</span>" + "<br>" +
				   "<span style='font-size: 11px; text-align: center;'>" + "Phone Number: " + d.Phone + "</span>" + "<br>" +
				   "<span style='font-size: 11px; text-align: center;'>" + "Website: " + d.Website + "</span>" + "<br>" +
				   "<span style='font-size: 11px; text-align: center;'>" + "Cuisine type: " + d.type + "</span>" + "<br>"; }
	});
	$(element).popover('show');

	//Make chosen circle more visible
	element.style("opacity", 1);

	//Place and show tooltip
	var x = +element.attr("cx"),
		y = +element.attr("cy"),
		color = element.style("fill");

	//Append lines to bubbles that will be used to show the precise data points
	
	//vertical line
	wrapper
		.append("line")
		.attr("class", "guide")
		.attr("x1", x)
		.attr("x2", x)
		.attr("y1", y)
		.attr("y2", height + 20)
		.style("stroke", color)
		.style("opacity",  0)
		.transition().duration(200)
		.style("opacity", 0.5);
	//Value on the axis
	wrapper
		.append("text")
		.attr("class", "guide")
		.attr("x", x)
		.attr("y", height + 38)
		.style("fill", color)
		.style("opacity",  0)
		.style("text-anchor", "middle")
		.text( d3.format(".2s")(d.Reviews) )
		.transition().duration(200)
		.style("opacity", 0.5);

	//horizontal line
	wrapper
		.append("line")
		.attr("class", "guide")
		.attr("x1", x)
		.attr("x2", -20)
		.attr("y1", y)
		.attr("y2", y)
		.style("stroke", color)
		.style("opacity",  0)
		.transition().duration(200)
		.style("opacity", 0.5);
	//Value on the axis
	wrapper
		.append("text")
		.attr("class", "guide")
		.attr("x", -25)
		.attr("y", y)
		.attr("dy", "0.35em")
		.style("fill", color)
		.style("opacity",  0)
		.style("text-anchor", "end")
		.text( d3.format(".1f")(d.rates) )
		.transition().duration(200)
		
		.style("opacity", 0.5);	
					
}//function showTooltip
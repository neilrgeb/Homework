// @TODO: YOUR CODE HERE!

// height and width
var svgWidth = 900;
var svgHeight = 600;

// margins 
var margin = {
    top: 50,
    right: 40,
    bottom: 100,
    left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// build scatter plot
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// make chart fit into svg
var chart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// import data, check for errors, then run function to pull information
d3.csv("assets/data/data.csv").then(success, err);

function err(error) {
    throw err;
}

function success(HealthData) {

    HealthData.map(function (data) {
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
    });

    // set axis scales for scatter
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(HealthData, d => d.poverty) - 0.75, d3.max(HealthData, d => d.poverty) + 0.5])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(HealthData, d => d.smokes) - 0.75, d3.max(HealthData, d => d.smokes) + 1])
        .range([height, 0]);

    // create axis and make ticks
    var bottomAxis = d3.axisBottom(xLinearScale)  
        .ticks(8);
    var leftAxis = d3.axisLeft(yLinearScale)
        .ticks(10);

    // add axis to chart
    chart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis); 
    chart.append("g")
        .attr("transform", `translate(0, 0`)
        .call(leftAxis);


    // create markers for chart
    var markers = chart.selectAll("circle")
        .data(HealthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "13")
        .attr("fill", "silver")
        .attr("opacity", "0.75")
 
    // add state abbreviations to markers
    var markers = chart.selectAll()
        .data(HealthData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.smokes))
        .style("font-size", "11px")
        .style("text-anchor", "middle")
        .style('fill', 'maroon')
        .text(d => (d.abbr));

    //create tooltip to hover over markers and display information
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([75, -50])
        .html(function (d) {
            return (`${d.state}<br>Poverty: ${d.poverty}%<br>Smokes: ${d.smokes}% `);
        });

    chart.call(toolTip);

    markers.on("mouseover", function (data) {
        toolTip.show(data, this);
    })
        .on("mouseout", function (data) {
            toolTip.hide(data);
        });

    // create axis labels
    chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 18)
        .attr("x", 0 - (height / 2) - 20)
        .attr("class", "axisText")
        .text("Smokes (%)");

    chart.append("text")
        .attr("transform", `translate(${(width / 2) - 15}, ${height + margin.top + 10})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
}
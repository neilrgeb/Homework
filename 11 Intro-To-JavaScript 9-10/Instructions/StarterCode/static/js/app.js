
var tableData = data;

var tbody = d3.select("tbody");



tableData.forEach(function (UFOtable) {
    var row = tbody.append("tr");


    Object.entries(UFOtable).forEach(function ([key, value]) {
        // console.log(key, value);
        var cell = tbody.append("td");
        cell.text(value);
    });
});



var button = d3.select("#filter-btn");


button.on("click", function () {
    tbody.html("")
    d3.event.preventDefault();
    var dateValue = d3.select("#datetime").property("value");


    // console.log(dateValue);
    

    var filterData = tableData.filter(dateRow => dateRow.datetime === dateValue);

    // console.log(filterData);

    filterData.forEach(function (filterTable) {
        var row = tbody.append("tr");


        Object.entries(filterTable).forEach(function ([key, value]) {
            // console.log(key, value);
            var cell = tbody.append("td");
            cell.text(value);
        });
    });

    if (filterData.length == 0) {
        d3.select("tbody")
            .append("tr")
            .append("td")
            .attr("colspan", 7)
            .html("<h3>No Records Found! Try Another Date!<h3>");
    }
});



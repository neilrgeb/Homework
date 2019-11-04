var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: "pk.eyJ1IjoibmVpbHJnZWIiLCJhIjoiY2syamoweG8yMDB4bzNjcnlyYWZteThlNiJ9.g5vPeeBUNfWyqbNdEIcAMQ"
});

// create map
var map = L.map("mymap", {
    center: [39.0, -105.0],
    zoom: 5.0,
    layers: [lightmap]
});

var baseMaps = {
    "Light Map": lightmap
};

// add layer to map.
lightmap.addTo(map);


// new layer for json data
var earthquake = new L.LayerGroup();

// get earthquake json data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: Color(feature.properties.mag),
            color: "#000000",
            radius: Radius(feature.properties.mag),
            stroke: true,
            weight: 1.0
        };
    }

    function Color(magnitude) {
        if (magnitude > 6) {
            return '#241f1f'
        } else if (magnitude > 5) {
            return '#590404'
        } else if (magnitude > 4) {
            return '#e81717'
        } else if (magnitude > 3) {
            return '#ff8400'
        } else if (magnitude > 2) {
            return '#f6ff00'
        } else if (magnitude > 1) {
            return '#2f8217'
        } else {
            return '#6fed8f'
        }
    };

    // make radius of cirlce based off magnitude 

    function Radius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }

        return magnitude * 3;
    }

    // add json data layer to map
    L.geoJson(data, {
        pointToLayer: function(feature, lat_long) {
            return L.circleMarker(lat_long);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquake);

    earthquake.addTo(map);

    // create and add legend
    var legend = L.control({
        position: "bottomleft"
    });

    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "info legend");
        grades = [0, 1, 2, 3, 4, 5, 6],
            labels = ['#6fed8f',
                '#2f8217',
                '#f6ff00',
                '#ff8400',
                '#e81717',
                '#590404',
                '#241f1f'
            ];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                "<i style='background: " + labels[i] + "'></i> " +
                grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
    };

    legend.addTo(map);

});
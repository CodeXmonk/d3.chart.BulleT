(function() {

"use strict";
// I need whole path on my local server, I don't know why - must be something with Kohana 3.3
//d3.json("/assets/js/D3/D3.chart/examples_joey_GitHub/scripts/bulleTs-data.json", function(error, data) {
d3.json("bulleTs-data.json", function(error, data) {

	var myChart = d3.select("#BulleT_horizontal").chart("BulleTs", {
		seriesCount: data.length
	});

	myChart.margin({ top: 5, right: 40, bottom: 20, left: 120 })
		.width(400)
		.height(45)
		.duration(1000);

	myChart.draw(data);

	d3.selectAll("button").on("click", function() {
		data.forEach(randomize);
		myChart.draw(data);
	});
});
function randomize(d) {
  var k = 10;
  if (!d.randomizer) d.randomizer = randomizer(d);
//  d.ranges = d.ranges.map(d.randomizer); 
//  d.rangesLine = d.rangesLine.map(d.randomizer);
//  d.markers = d.markers.map(d.randomizer);
  d.markers[0] = d.randomizer(d.markers[0],40,60);
  d.markers[1] = d.randomizer(d.markers[1],21,78);
  k = d.randomizer(k,4,9);
  d.measures[0] = d.markers[0] - 2*k;
  d.measures[1] = d.markers[0] - k;
  d.measures[2] = d.markers[0] + k;
  d.measures[3] = d.markers[0] + 2*k;
//  d.measures = d.measures.map(d.randomizer);
  return d;
}

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizer(d,min,max) {
  return function(d,min,max) {
    return getRandomInt(min,max);
  };
}
/*
function randomizer(d) {
  var k = d3.max(d.ranges) * .2;
  return function(d) {
    return Math.max(0, d + k * (Math.random() - .5));
  };
}
*/
})();

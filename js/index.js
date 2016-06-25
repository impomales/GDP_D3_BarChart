$(document).ready(function() {
  var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  
  var data = {};
  
  function maxGDP(data) {
    var max = 0;
    data.forEach(function(d) {
      if (d[1] > max) max = d[1];
    });
    return max;
  }
  
  $.getJSON(url, function(data) {
    
    var x = d3.scale.linear()
      .domain([0, maxGDP(data.data)])
      .range([0, 100]);
    
    d3.select("#chart")
      .selectAll("div")
        .data(data.data)
      .enter().append("div")
        .style("width", function(d) {return x(d[1]) * 10 + "px";})
        .text(function(d) {return d[1];})
  });
});
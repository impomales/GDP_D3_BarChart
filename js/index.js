$(document).ready(function() {
  var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  
  var data = {};
  var margin = {top: 20, right: 30, bottom: 30, left: 70},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
  var x = d3.time.scale()
    .range([0, width]);
  
  var y = d3.scale.linear()
    .range([height, 0]);
  
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(14, "%Y");
  
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, ",f");
  
  var format = d3.format(',.2f');
 
  var tip = d3.tip()
    .attr('class', 'tip')
    .html(function(d) {
      var date = new Date(d[0]);
      var month = new Array();
          month[0] = "January";
          month[1] = "February";
          month[2] = "March";
          month[3] = "April";
          month[4] = "May";
          month[5] = "June";
          month[6] = "July";
          month[7] = "August";
          month[8] = "September";
          month[9] = "October";
          month[10] = "November";
          month[11] = "December";
      return "<strong> $" + format(d[1]) + " Billion </strong><div>" + date.getFullYear() + " - " + month[date.getMonth()] + "</div>"
    });
  
  var chart = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
   .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
  
  chart.call(tip);

  $.getJSON(url, function(data) {
    
    y.domain([0, d3.max(data.data.map(function(d) {return d[1];}))]);
    x.domain([d3.min(data.data.map(function(d) {return new Date(d[0]);})),
              d3.max(data.data.map(function(d) {return new Date(d[0]);}))]);
    
    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    
    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
     .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-size", "15px")
      .text("Gross Domestic Product, USA");
    
    chart.selectAll(".bar")
        .data(data.data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {return x(new Date(d[0]));})
        .attr("y", function(d) {return y(d[1]);})
        .attr("height", function(d) {return height - y(d[1]);})
        .attr("width", width/data.data.length)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
  });
});
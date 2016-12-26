$(document).ready(function(){
    
  var dataset = {
    lemons: [53245, 28479, 19697, 24037, 40245, 99244],
    pears: [53245, 28479, 19697, 24037, 40245],
    pineapples: [6, 3, 3],
  };

  var width = 560,
      height = 400,
      cwidth = 35;

  var color = d3.scale.category20();

  var pie = d3.layout.pie()
      .sort(null);

  var arc = d3.svg.arc();

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var gs = svg.selectAll("g").data(d3.values(dataset)).enter().append("g");
  var path = gs.selectAll("path")
      .data(function(d) { return pie(d); })
    .enter().append("path").transition().duration(150).attrTween("d", arcTween)
      .attr("fill", function(d, i) { return color(i); })
      .attr("d", function(d, i, j) { return arc.innerRadius(12+cwidth*j).outerRadius(cwidth*(j+1))(d); });

  function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    };
  }
});
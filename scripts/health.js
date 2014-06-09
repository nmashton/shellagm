define([
  "d3"
  , "underscore"
], function (
  d3
  , _
) {
  var rowlength = 10,
      baseIconWidth = 100,
      baseIconHeight = 66,
      xscale = 0.36,
      yscale = 0.36,
      iconWidth = baseIconWidth * xscale,
      iconHeight = Math.max(iconWidth,(baseIconHeight * yscale)),
      padding = 2,
      delay1 = 50,
      delay2 = 50;

  var timeout,
      panel = d3.select("#panel-3");

    d3.select("#health-graphic")
    .style("height", (iconWidth+padding)*rowlength)
    .style("width", (iconWidth+padding)*rowlength);

  var svg = d3.select("#health-graphic").append("g");

  function health () {

    function init () {

      var bind = svg.selectAll(".icons")
      .data(_.range(rowlength*rowlength));

      bind.enter()
      .append("g")
      .attr("transform", function (d,i) {
        return "translate(" +
          ((i%rowlength) * (iconWidth + padding)) +
          "," +
          ((Math.floor(i/rowlength)) * (iconHeight + padding)) +
          ")"
      })
      .append("use")
      .attr("transform", "scale(" + xscale + "," + yscale + ")")
      .attr("xlink:href", "#health")
      .style("fill", "grey")
      .style("opacity", 0);

      svg.selectAll("use").filter(function (d,i) { return i < 18;})
      .transition()
      .delay(function (d,i) {
        var row = Math.floor(i/rowlength),
            col = i%rowlength;
        return Math.max(row,col) * delay1;
      })
      .style("opacity", 1);

      timeout = setTimeout(function () {
        svg.selectAll("use").filter(function (d,i) { return i >= 18; })
        .style("fill", "#FF3900")
        .transition()
        .delay(function (d,i) {
          var row = Math.floor((i-2)/rowlength);
          return row * delay2;
        })
        .style("opacity", 1);

        panel.select("#punchline-health")
        .transition()
        .duration(500)
        .style("opacity",1);

        panel.select(".key")
        .transition()
        .duration(500)
        .style("opacity",1);
      }, 2500);

    };

    function kill () {
      svg.selectAll("g").remove();
      panel.select("#punchline-health").style("opacity",0);
      panel.select(".key").style("opacity",0);
      clearTimeout(timeout);
    };

    return {init:init,kill:kill};
  };

  return health;

});

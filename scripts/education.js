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
      delay = 75,
      panel = d3.select("#panel-2");

  var timeout;

  d3.select("#education-graphic")
  .style("height", (iconWidth+padding)*rowlength)
  .style("width", (iconWidth+padding)*rowlength);

  var svg = d3.select("#education-graphic").append("g");

  function education () {

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
      .attr("xlink:href", "#education")
      .style("fill", "grey")
      .style("opacity", 0)
      .transition()
      .delay(function (d,i) {
        var row = Math.floor(i/rowlength),
            col = i%rowlength;
        return Math.max(row,col) * delay;
      })
      .style("opacity", 1);

      timeout = setTimeout(function () {
        svg.selectAll("use").filter(function (d,i) { return i < 31;})
        .transition()
        .delay(function (d,i) {
          var row = Math.floor(i/rowlength);
          return row * delay;
        })
        .style("fill", "#FFBB00");

        panel.select("#punchline-education")
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
      panel.select("#punchline-education").style("opacity",0);
      panel.select(".key").style("opacity",0);
      clearTimeout(timeout);
    };

    return {init:init,kill:kill};
  };

  return education;
});

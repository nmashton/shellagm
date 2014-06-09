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
      delay = 20;

  var timeout,
      panel = d3.select("#panel-4");

  d3.select("#money-graphic")
  .style("height", (iconWidth+padding)*rowlength)
  .style("width", (iconWidth+padding)*rowlength);

  var svg = d3.select("#money-graphic").append("g");

  function money () {

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
      .attr("xlink:href", function (d,i) {
        if (i < 80) {
          return "#moneybag";
        } else if (i < 91) {
          return "#businessman";
        } else {
          return "#question";
        }})
      .style("fill", function (d,i) {
        if (i < 80) {
          return "#00B454";
        } else if (i < 91) {
          return "#FFBB00";
        } else {
          return "grey";
        }
      })
      .style("opacity", 0);

      timeout = setTimeout(transition1,1500);

      function transition1 () {
        svg.selectAll("use").filter(function (d,i) { return i < 80;})
        .transition()
        .delay(function (d,i) { return i * delay;})
        .style("opacity", 1);

        panel.select("#money-punchline-1")
        .transition()
        .duration(500)
        .style("opacity", 1);

        timeout = setTimeout(transition2,80*delay+500);
      };

      function transition2 () {
        svg.selectAll("use").filter(function (d,i) { return i >= 80 && i < 91;})
        .transition()
        .delay(function (d,i) { return i * delay;})
        .style("opacity", 1);

        panel.select("#money-punchline-2")
        .transition()
        .duration(500)
        .style("opacity", 1);

        timeout = setTimeout(transition3,11*delay+750);
      };
      function transition3 () {
        svg.selectAll("use").filter(function (d,i) { return i >= 91;})
        .transition()
        .delay(function (d,i) { return i * delay;})
        .style("opacity", 1);

        panel.select("#money-punchline-3")
        .transition()
        .duration(500)
        .style("opacity", 1);

        panel.select(".key")
        .transition()
        .duration(500)
        .style("opacity", 1);
      };

    };

    function kill () {
      svg.selectAll("g").remove();
      panel.selectAll(".punchline").style("opacity",0);
      clearTimeout(timeout);
    };

    return {init:init,kill:kill};
  };

  return money;

});

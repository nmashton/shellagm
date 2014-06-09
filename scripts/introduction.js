define([
  "d3"
], function (
  d3
) {

  var timeout,
      max = 1092000000,
      beat = 1500,
      panel = d3.select("#panel-1");

  function introduction () {

    function init () {

      timeout = setTimeout(function () {
        d3.select("#intro-counter").style("opacity",1);
        d3.select(".odometer").html(max);
        timeout = setTimeout(function () {
          reveal(1);
          timeout = setTimeout(function () {reveal(2);}, beat*1.5)
        },beat)
      },beat);

      function reveal (n) {
        d3.select("#intro-punchline-" + n)
        .transition()
        .style("opacity", 1);
      };
    };

    function kill () {
      panel.selectAll(".punchline").style("opacity",0);
      panel.select(".odometer").html("0");
      clearTimeout(timeout);
    };

    return {init:init,kill:kill};
  };

  return introduction;

});

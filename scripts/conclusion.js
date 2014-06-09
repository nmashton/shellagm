define([
  "d3"
], function (
  d3
) {

  var timeout,
      beat = 2000;

  function conclusion () {

    function init () {

      timeout = setTimeout(function () {
        reveal(1);
        timeout = setTimeout(function () {
          reveal(2);
          timeout = setTimeout(function () {
            reveal(3);
          },beat)
        },beat)
      },beat);

      function reveal (n) {
        d3.select("#conclusion-punchline-" + n)
        .transition()
        .style("opacity", 1);
      };
    };

    function kill () {
      d3.selectAll(".punchline").style("opacity",0);
      clearTimeout(timeout);
    };

    return {init:init,kill:kill};
  };

  return conclusion;

});

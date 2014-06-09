requirejs.config({
  baseURL: "scripts/",
  shim: {
    "sankey": {
      deps: ["d3.global"],
      exports: "d3"
    },
    "owl.carousel": {
      deps: ["jquery"],
      exports: "$"
    }
  }
});

// Workaround from https://github.com/mbostock/d3/issues/1693
define("d3.global", ["d3"], function(_) {
  d3 = _;
});

require([
  "config"
  , "owl.carousel"
  , "d3"
  , "underscore"

  , "introduction"
  , "education"
  , "health"
  , "money"
  , "conclusion"
], function(
  config
  , $
  , d3
  , _

  , introduction
  , education
  , health
  , money
  , conclusion
) {

  // Set up visualization functions.
  var vizFs = {};
  vizFs[0] = introduction();
  vizFs[1] = education();
  vizFs[2] = health();
  vizFs[3] = money();
  vizFs[4] = conclusion();

  function killOthers (n) {
    // Takes an index and calls the kill method on all panels not so indexed.
    var others = _.filter(_.keys(vizFs), function (d) {return (d != n);}) ;
    _.each(others, function (d) {vizFs[d].kill(); }) ;
  } ;

  // Use the global constants to size and position the carousel.
  $("#viz-carousel")
  .css("width", config.width)
  .css("height", config.height)
  .css("left", "50%")
  .css("margin-left", -(config.width/2))
  ;

  function init (n) {
    if (_.has(vizFs,n)) {
      vizFs[n].init();
    }
  }

  // Set up the carousel interactivity.
  $("#viz-carousel").owlCarousel({
    navigation: true,
    rewindNav: false,
    slideSpeed: 400,
    paginationSpeed: 400,
    singleItem: true,
    afterMove: function (el) {init(this.currentItem) ;
                              killOthers(this.currentItem); },
    afterInit: init(0)
  });

});

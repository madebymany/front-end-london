//= require waypoints.min

$(function () {

  var d = $(window),
      b = $("body"),
      opening = $('.opening'),
      reveal = $(".reveal"),
      speaker = $('.speaker');

  var setBodySize = function(){
    var viewport_height = d.height(),
        speaker_height = reveal.height(),
        base_height = viewport_height + speaker_height;

    console.log(viewport_height, speaker_height, base_height);

    b.css({ height: Math.max(viewport_height * 2, base_height) });
  };

  if (!Modernizr.touch) {
    setBodySize();
    $(window).on('resize', setBodySize);

    d.waypoint(function(direction) {
      var position, top;

      if (direction == "down") {
        position = 'relative';
        top = d.scrollTop();
      } else {
        position = 'fixed';
        top = 0;
      }

      reveal.css({
        position: position,
        'top': top
      });
    }, {
      offset: function() {
        return -$(this).height();
      }
    });

    $('.interested-in-speaking').on('click', function(){
      $("html, body").animate({ scrollTop: opening.height() }, 300);
    });
  }

  b.addClass("body--is-loaded");

  var page_classes = ['is-green', 'is-red', 'is-blue'];
  b.addClass("page--" + page_classes[Math.floor(Math.random() * page_classes.length)]);
});

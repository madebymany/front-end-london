var Accordion = function() {
  this.$el = $('.previous-months');
  this.$previous_months = this.$el.find('.previous-month');

  this.initialize();
};

Accordion.prototype.initialize = function() {
  this.$previous_months.first().addClass('previous-month--is-active');
  this.$previous_months.find('.previous-month-header').on('click', this.handleHeaderClick.bind(this));
};

Accordion.prototype.handleHeaderClick = function(e) {
  e.preventDefault();
  this.$el.find('.previous-month--is-active').removeClass('previous-month--is-active');
  $(e.currentTarget || e.srcElement).parent().addClass('previous-month--is-active');
};

$.domReady(function () {

  var container = $('#fel');
  var names = ['front', 'end', 'london'];
  var i = names.length;

  while (i--) {
      new ExpandText(document.getElementById(names[i]), container);
  }

  var $ne = $('#next-event-handle');
  if (new Date($ne.attr('data-eventdate')).getTime() < new Date().getTime()) {
    $ne.text('Previous event');
    var $netxt = $('#next-event-text-handle');
    $netxt.text("The next Front-end London is yet to be announced. The event usually takes place on the last Thursday of the month.");
  }

  new Accordion();
});
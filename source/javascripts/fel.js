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

  new Accordion();
});
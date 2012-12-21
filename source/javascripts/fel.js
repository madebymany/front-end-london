(function() {
  var container = document.getElementById('fel');
  var names = ['front', 'end', 'london'];
  var i = names.length;

  while (i--) {
      new ExpandText(document.getElementById(names[i]), container);
  }
})();
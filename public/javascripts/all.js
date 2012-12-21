if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
;
(function() {

    function ExpandText(element, parent) {
        this.i = 0;
        this.interval = 40;

        this.element = element;
        this.text = this.element.innerHTML;
        //this.element.innerHTML = '';

        parent.addEventListener('mouseover', this.addLetter.bind(this));
        parent.addEventListener('mouseout', this.removeLetter.bind(this));

        this.timer = setTimeout(function() {
            this.i = this.text.length;
            this.removeLetter();
        }.bind(this), 1000);
    }

    ExpandText.prototype.setText = function(length) {
        return this.element.innerHTML = this.text.substr(0, length || this.i);
    };

    ExpandText.prototype.addLetter = function() {
        clearTimeout(this.timer);

        if (this.i >= this.text.length) {
            return;
        }

        this.timer = setTimeout(function() {
            this.i++;
            this.setText();
            this.addLetter();
        }.bind(this), this.interval);
    };

    ExpandText.prototype.removeLetter = function() {
        clearTimeout(this.timer);

        if (this.i <= 0) {
            return;
        }

        this.timer = setTimeout(function() {
            this.i--;
            this.setText();
            this.removeLetter();
        }.bind(this), this.interval);
    };

    window.ExpandText = ExpandText;

})();
(function() {
  var container = document.getElementById('fel');
  var names = ['front', 'end', 'london'];
  var i = names.length;

  while (i--) {
      new ExpandText(document.getElementById(names[i]), container);
  }
})();




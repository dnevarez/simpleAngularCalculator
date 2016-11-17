'use strict';

angular.module('app', []);
"use strict";
'use strict';

angular.module('app').controller('calcCtrl', function ($scope) {

  ///////////////////////////////////
  // Array of data for the buttons //
  ///////////////////////////////////

  // Number buttons and a few others.
  $scope.buttonsLeft = [{ value: 'AC', id: 'clearall' }, { value: '+/-', id: 'plusMinus' }, { value: '%', id: 'percent' }, { value: '1', id: '1' }, { value: '2', id: '2' }, { value: '3', id: '3' }, { value: '4', id: '4' }, { value: '5', id: '5' }, { value: '6', id: '6' }, { value: '7', id: '7' }, { value: '8', id: '8' }, { value: '9', id: '9' }, { value: '0', id: 'zero' }, { value: '.', id: 'dot' }];

  // Operator buttons
  $scope.operators = [{ value: '/', id: 'divide' }, { value: '*', id: 'multi' }, { value: '-', id: 'minus' }, { value: '+', id: 'plus' }, { value: '=', id: 'equals' }];

  ///////////////
  // Variables //
  ///////////////

  // Variables to store number inputs and operator.
  var number = '',
      newnumber = '',
      operator = '';

  // Input the user will see in the total div.
  $scope.totaldiv = '0';

  ///////////////
  // Functions //
  ///////////////

  // Functions to limit total length to nine characters in the total display.
  var myNamespace = {};

  myNamespace.round = function (number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };

  function roundDec(c) {
    if (Math.round(c).toString().length === 9) {
      $scope.totaldiv = Math.round(c);
    } else if (Math.round(c).toString().length > 9) {
      number = "";
      $scope.totaldiv = "Err: Number too long for output";
    } else {
      var x = 8 - Math.round(c).toString().length;
      $scope.totaldiv = myNamespace.round(c, x).toString();
      console.log($scope.totaldiv);
    }
  }

  // Tests to see if input is too long, so it doesn't break out of container.
  var testNumLength = function testNumLength(num) {
    console.log(num, num.length);
    if (num.length > 9) {
      roundDec(num);
    } else {
      $scope.totaldiv = num;
    }
  };

  // Clears last value stored.
  var clear = function clear() {
    if (number.length === 0) $scope.operation = '';
    number = '';
    $scope.totaldiv = '0';
    $scope.buttonsLeft[0] = { value: 'AC', id: 'clearall' };
  };

  // Clears both stored values.
  var clearall = function clearall() {
    number = '';
    newnumber = '';
    $scope.operation = '';
    $scope.totaldiv = '0';
  };

  // Changes value to either negative or positive.
  var plusMinus = function plusMinus() {
    // Function checks which input is currently displayed in order to properly
    // assign the positive/negative attribute to the correct stored value.
    if (number === $scope.totaldiv) number = (parseFloat($scope.totaldiv) * -1).toString();
    if (newnumber === $scope.totaldiv) newnumber = (parseFloat($scope.totaldiv) * -1).toString();

    // Assigns pos/neg attribute to what the user sees.
    $scope.totaldiv = (parseFloat($scope.totaldiv) * -1).toString();
  };

  // Totals inputs
  var totalEquals = function totalEquals() {
    if (number.length === 0 && newnumber.length === 0) {
      $scope.totaldiv = '0';
    } else {
      // Parse numbers to do Math.
      number = parseFloat(number);
      newnumber = parseFloat(newnumber);
      // Total container for answer.
      var total = 0;
      // Check operator.
      if (operator === '+') {
        total = newnumber + number;
      } else if (operator === '-') {
        total = newnumber - number;
      } else if (operator === '/') {
        total = newnumber / number;
      } else if (operator === '*') {
        total = newnumber * number;
      }

      // Tests for length of total and sets totaldiv value for user.
      testNumLength(total.toString());

      // Stores total and resets newnumber for chained operations.
      number = total.toString();
      newnumber = '';
    }
  };

  var percent = function percent() {
    if (number.length > 0) {
      $scope.operation = '%';
      // Variable to store total.
      var percentTotal;
      // Parse number to use in equation.
      number = parseFloat(number);

      // Check if newnumber has no stored value to avoid parse error (NaN)
      if (newnumber.length === 0) {
        percentTotal = number / 100;
      } else {
        // Otherwise parse newnumber as well and find percentage.
        newnumber = parseFloat(newnumber);
        percentTotal = newnumber / 100 * number;
      }
      number = percentTotal.toString();
      testNumLength(number);
      // Stores total and resets newnumber for chained operations.
      // number = percentTotal.toString();
      newnumber = '';
    }
  };

  // Finds the total if equals button is pressed, otherwise stores the operator and also sets it to scope for user.
  $scope.storeOperator = function () {
    $scope.operation = operator;

    if (this.operator.value === '=') {
      operator = '=';
      $scope.operation = operator;
      totalEquals();
    } else if (number.length > 0 && newnumber.length > 0) {
      totalEquals();
      operator = this.operator.value;
      $scope.operation = operator;
      newnumber = number;
      number = "";
    } else {
      operator = this.operator.value;
      $scope.operation = operator;
      newnumber = number;
      number = "";
    }
  };

  // This is where all our functions will be invoked.
  $scope.click = function () {
    if ($scope.operation === '=') clearall();
    if (this.button.id === 'clear') {
      clear();
    } else if (this.button.id === 'clearall') {
      clearall();
    } else if (this.button.id === 'plusMinus') {
      plusMinus();
    } else if (this.button.value === "%") {
      percent();
    } else {
      $scope.buttonsLeft[0] = { value: 'C', id: 'clear' };
      number += this.button.value;
      $scope.totaldiv = number;
    }
    console.log('op is', operator);
  };

  // Color change when buttons are momentarily changed when pressed.

  $scope.mouseDown = function () {
    if (this.button) {
      document.getElementById(this.button.id).style.background = '-webkit-gradient(linear, left top, left bottom, from(#1F1F1F), to(#141414))';
    } else {
      if (this.operator.id === 'equals') {
        document.getElementById(this.operator.id).style.background = '-webkit-gradient(linear, left top, left bottom, from(#CED600), to(#BFC52C))';
      } else {
        document.getElementById(this.operator.id).style.background = '-webkit-gradient(linear, left top, left bottom, from(#1F1F1F), to(#141414))';
      }
    }
  };
  $scope.mouseUp = function () {
    if (this.button) {
      document.getElementById(this.button.id).style.background = '';
    } else {
      document.getElementById(this.operator.id).style.background = '';
    }
  };
});

angular.module('app').directive('dragMe', function () {
  return {
    restrict: 'A',
    link: function link(scope, elem, attr, ctrl) {
      elem.draggable();
    }
  };
});
angular.module('app',[])
.controller('calcCtrl', function($scope){

///////////////////////////////////
// Array of data for the buttons //
///////////////////////////////////

// Number buttons and a few others.
  $scope.buttonsLeft = [
    {value: 'C', id: 'clear'},
    {value: 'AC', id: 'clearall'},
    {value: '+/-', id: 'plusMinus'},
    {value: '1', id: '1'},
    {value: '2', id: '2'},
    {value: '3', id: '3'},
    {value: '4', id: '5'},
    {value: '5', id: '5'},
    {value: '6', id: '6'},
    {value: '7', id: '7'},
    {value: '8', id: '8'},
    {value: '9', id: '9'},
    {value: '0', id: 'zero'},
    {value: '.', id: 'dot'}
  ]

// Operators
$scope.operators = [
  {value: '/'},
  {value: '*'},
  {value: '-'},
  {value: '+'},
  {value: '%'},
  {value: '=', id: 'equals'}
]

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

// Tests to see if input is too long, so it doesn't break out of container.
var testNumLength = function(number) {
      if (number.length > 9) {
          totaldiv.text(number.substr(number.length-9,9));
          if (number.length > 15) {
              number = "";
              totaldiv.text("Err");
          }
      }
  };

// Clears last value stored.
  var clear = function(){
    number = '';
    $scope.totaldiv = '0';
    console.log('what');
  }
// Clears both stored values.
  var clearall = function(){
    number = '';
    newnumber = ''
    $scope.totaldiv = '0';
    console.log('hi');
  }
// Changes value to either negative or positive.
  var plusMinus = function(){

    // Function checks which input is currently displayed in order to properly
    // assign the positive/negative attribute to the correct stored value.
    if(number === $scope.totaldiv) number = (parseInt($scope.totaldiv) * -1).toString();
    if(newnumber === $scope.totaldiv) newnumber = (parseInt($scope.totaldiv) * -1).toString();

    // Assigns pos/neg attribute to what the user sees.
    $scope.totaldiv = (parseInt($scope.totaldiv) * -1).toString();
  }

// Totals inputs
var totalEquals = function(){
  // Parse numbers to do Math.
  number = parseFloat (number)
  newnumber = parseFloat(newnumber)
  // Total container for answer.
  var total = 0;
  // Check operator.
  if(operator === '+') {
      total = newnumber + number;
  } else if (operator === '-') {
      total = newnumber - number;
  } else if (operator === '/') {
      total = newnumber / number;
  } else if (operator === '*') {
      total = newnumber * number;
  }
  $scope.totaldiv = total.toString();
  testNumLength($scope.totaldiv);
  // Stores total and resets newnumber for chained operations.
  number = total;
  newnumber = '';
}

// Finds the total if equals button is pressed, otherwise stores the operator.
$scope.storeOperator = function(){
  if(this.operator.value === '='){
    totalEquals();
  } else {
    console.log(this.operator.value);
    operator = this.operator.value;
    newnumber = number;
    number = "";
  }
}

// This is where all our functions will be invoked.
$scope.click = function(x){
  if(this.button.id === 'clear'){
    clear();
  }
  else if (this.button.id === 'clearall'){
    clearall();
  }
  else if (this.button.id === 'plusMinus'){
    console.log("heck yes");
    plusMinus();
  }
  else {
      number += this.button.value;
      $scope.totaldiv = number;
  }
}



})

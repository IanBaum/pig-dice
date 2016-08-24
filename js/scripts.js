//business logic
var Player = function() {
  this.score = 0;
}

var Dice = function() {
  this.side = 1;
  this.total = 0;
}

Dice.prototype.roll = function(){
  return Math.ceil(Math.random()*6);
}



//user logic

$(document).ready(function(){
  var dice = new Dice();

  $("#twoPlayer").click(function(){
    $(".pigRules").hide();
    $(".pigDice").show();
  });

  $("#diceRoll").click(function(){
    $("#currentRoll").text(dice.roll());
  });

});

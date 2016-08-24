//business logic
var Player = function() {
  this.score = 0;
  this.active = false;
}

var Dice = function() {
  this.side = 1;
  this.total = 0;
}

Dice.prototype.roll = function(){
  this.side = Math.ceil(Math.random()*6);
  if (this.side === 1){
    this.total = 0;
  } else {
    this.total += this.side;
  }
  $("#possiblePoints").text(this.total);
}

//user logic

$(document).ready(function(){
  var dice = new Dice();
  var playerOne = new Player();
  playerOne.active = true;
  var playerTwo = new Player();


  $("#twoPlayer").click(function(){
    $(".pigRules").hide();
    $(".pigDice").show();
  });

  $("#diceRoll").click(function(){
    dice.roll();
    $("#currentRoll").text(dice.side);
  });

});

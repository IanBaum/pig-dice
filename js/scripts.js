//business logic
var Player = function() {
  this.score = 0;
  this.active = false;
}

Player.prototype.switch = function(){
  if(this.active === false){
    this.active = true;
  }else{
    this.active = false;
  }
}

var Dice = function() {
  this.side = 1;
  this.total = 0;
}

Dice.prototype.roll = function(playerOne,playerTwo){
  this.side = Math.ceil(Math.random()*6);
  if (this.side === 1){
    this.total = 0;
    playerOne.switch();
    playerTwo.switch();
    $("#playerOneTurn").toggle();
    $("#playerTwoTurn").toggle();
  } else {
    this.total += this.side;
  }
  console.log("player1 = " + playerOne.active);
  console.log("player2 = " + playerTwo.active);
  $("#possiblePoints").text(this.total);
  return this.side;
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
    dice.roll(playerOne,playerTwo);
    $("#currentRoll").text(dice.side);
  });

});

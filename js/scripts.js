//business logic
var diceSides = ["img/one.png", "img/two.png", "img/three.png", "img/four.png", "img/five.png", "img/six.png"]


var Player = function() {
  this.score = 0;
  this.active = false;
  this.computer = false;
  this.difficulty;
}

var Dice = function() {
  this.side = 1;
  this.total = 0;
}

var playerSwitch = function(playerOne,playerTwo) {
  playerOne.switch();
  playerTwo.switch();
  $("#playerOneTurn").toggle();
  $("#playerTwoTurn").toggle();
}

Player.prototype.switch = function(){
  if(this.active === false){
    this.active = true;
  }else{
    this.active = false;
  }
}

Dice.prototype.roll = function(playerOne,playerTwo){
  this.side = Math.ceil(Math.random()*6);

  if(this.side === 1 && playerOne.active === true && playerTwo.computer === true) {
    this.total = 0;
    playerOne.switch();
    playerTwo.switch();
    $("#playerOneTurn").toggle();
    $("#playerTwoTurn").toggle();
    $("#diceRoll").toggle();
    $("#diceHold").toggle();
    // alert("you rolled a 1, computer's turn");
    if(playerTwo.difficulty === "easy"){
      this.easyAI(playerOne,playerTwo);
    }else if(playerTwo.difficulty === "hard"){
      this.hardAI(playerOne,playerTwo);
    }

  }else if (this.side === 1){
    this.total = 0;
    playerOne.switch();
    playerTwo.switch();
    $("#playerOneTurn").toggle();
    $("#playerTwoTurn").toggle();
    $("#diceRoll").toggle();
    $("#diceHold").toggle();
  }else{
    this.total += this.side;
  }
  $("#possiblePoints").text(this.total);
  $("#currentRoll").text("");
  $("#currentRoll").append("<img src='" + diceSides[this.side -1] + "'>");
  return this.side;
}

Dice.prototype.hold = function(playerOne,playerTwo){
  if (playerOne.active === true) {
    playerOne.score += this.total;
    $("#playerOneScore").text(playerOne.score);
  } else if (playerTwo.active === true) {
    playerTwo.score += this.total;
    $("#playerTwoScore").text(playerTwo.score);
  }
  if (playerOne.score >= 100){
    alert("Player One Wins!");
    location.reload(true);
  } else if (playerTwo.score >= 100){
    alert("Player Two Wins!");
    location.reload(true);
  }
  this.total = 0;
  $("#possiblePoints").text(this.total);
  playerOne.switch();
  playerTwo.switch();
  $("#playerOneTurn").toggle();
  $("#playerTwoTurn").toggle();
  $("#diceRoll").toggle();
  $("#diceHold").toggle();
}

// Dice.prototype.slowRoll = function(playerOne,playerTwo) {
//   setTimeout(function(){this.roll();}.bind(this), 2000);
// }

Dice.prototype.easyAI = function(playerOne,playerTwo){

  setTimeout(function(){
    this.roll(playerOne,playerTwo);
    console.log(this.side);
    if(this.side != 1){
      setTimeout(function(){
        this.roll(playerOne,playerTwo);
        console.log(this.side);
        if(this.side != 1){
          setTimeout(function(){
            this.hold(playerOne,playerTwo);
          }.bind(this), 500);
        }
      }.bind(this), 500);
    }
    else if (this.side === 1){
    }
  }.bind(this), 500);
}

Dice.prototype.hardAI = function(playerOne,playerTwo){
  var numberOfRolls = 1;
  var differanceArray = [0,6,12,18,24,30,36,42,48]
  var differanceRolls = [1,2,3,4,5,6,7,8,9]

  this.roll(playerOne,playerTwo);
  console.log(this.side);
  for(i=0;i<numberOfRolls;i++){
    var differance = Math.abs(playerTwo.score - playerOne.score);
    if(this.side != 1 && playerTwo.score + this.total < 100){
      this.roll(playerOne,playerTwo);
      console.log(this.side);

      for(j=0;j<differanceArray.length;j++){
        if(differance >= differanceArray[j]){
          numberOfRolls = differanceRolls[j];
        }
      }
    }
  }
  if(this.side != 1){
    this.hold(playerOne,playerTwo);
    console.log(" ");
  }
}

//user logic

$(document).ready(function(){
  var dice = new Dice();
  var playerOne = new Player();
  playerOne.active = true;
  var playerTwo = new Player();

  $("#onePlayer").click(function(){
    $("#difficulty").show();
    $("#onePlayer").hide();
    $("#twoPlayer").hide();
  });

  $("#aiEasy").click(function(){
    playerTwo.computer = true;
    playerTwo.difficulty = "easy";
    $(".pigRules").hide();
    $(".pigDice").show();
  });

  $("#aiHard").click(function(){
    playerTwo.computer = true;
    playerTwo.difficulty = "hard";
    $(".pigRules").hide();
    $(".pigDice").show();
  });

  $("#twoPlayer").click(function(){
    $(".pigRules").hide();
    $(".pigDice").show();
  });

  $("#diceRoll").click(function(){
    dice.roll(playerOne,playerTwo);
  });

  $("#diceHold").click(function(){
    dice.hold(playerOne,playerTwo);
    if(playerTwo.computer === true && playerTwo.difficulty === "easy"){
      dice.easyAI(playerOne,playerTwo);
    }
    else if(playerTwo.computer === true && playerTwo.difficulty === "hard"){
      dice.hardAI(playerOne,playerTwo);
    }
  });
});

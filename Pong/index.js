/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Assign movement to each key for P1
  var KEY1 = {
      "Left": 37,
      "Up": 38,
      "Right": 39,
      "Down": 40
  };

  // Assign movement to each key for P2
  var KEY2 = {
      "Left": 65,
      "Up": 87,
      "Right": 68,
      "Down": 83
  };

  // Game Item Objects
  var pad1 = factoryMachine("#paddle1");
  var pad2 = factoryMachine("#paddle2");
  var pong = factoryMachine("#pong");
  var points1 = 0;
  var points2 = 0;
  $("#scoreOne").text(points1);
  $("#scoreTwo").text(points2);

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown1);                           // Triggers paddle1 to move
  $(document).on("keyup", handleKeyUp1);                               // Triggers paddle1 to stop moving
  $(document).on("keydown", handleKeyDown2);                           // Triggers paddle2 to move
  $(document).on("keyup", handleKeyUp2);                               // Triggers paddle2 to stop moving

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    borderBoard();
    increaseScore();

    // Determines whether or not the pong reflects
    if (doCollide(pad1, pong)) {
        pong.speedX = -pong.speedX;
    }
    if (doCollide(pad2, pong)) {
        pong.speedX = -pong.speedX;
    }

    if (points1 >= 3) {
        $("h2").text("GAME OVER, PLAYER 1 WINS!");
        pong.speedX = 0;
        pong.speedY = 0;
    } else if (points2 >= 3) {
        $("h2").text("GAME OVER, PLAYER 2 WINS!");
        pong.speedX = 0;
        pong.speedY = 0;
    }
}
  
  /* 
  Called in response to events.
  */

  // Allows the paddle to move
  function handleKeyDown1(event) {
        if (event.which === KEY1.Up){
            console.log("Pressed Up");
            pad1.speedY = -5;
        } else if (event.which === KEY1.Down){
            console.log("Pressed Down");
            pad1.speedY = 5;
        }
  }

  // Allows the paddle to stop moving
  function handleKeyUp1(event) {
        if (event.which === KEY1.Up){
          console.log("Lifted Up");
          pad1.speedY = 0;
      } else if (event.which === KEY1.Down){
          console.log("Lifted Down");
          pad1.speedY = 0;
      }
  }

  // This allows the second paddle to move
  function handleKeyDown2(event){
        if (event.which === KEY2.Up){
          console.log("Pressed Up1");
          pad2.speedY = -5;
      } else if (event.which === KEY2.Down){
          console.log("Pressed Down1");
          pad2.speedY = 5;
      }
  }

  // This allows the second paddle to stop moving
  function handleKeyUp2(event){
        if (event.which === KEY2.Up){
          console.log("Lifted Up");
          pad2.speedY = 0;
      } else if (event.which === KEY2.Down){
          console.log("Lifted Down");
          pad2.speedY = 0;
      }
  }

// Randomizes the ball's direction at the start
function decideSpeed() {
  var randomNum = Math.floor(Math.random() * Math.floor(2));
  if (randomNum === 0) {
      pong.speedX = 4;
      pong.speedY = 4;
      pong.x = 210;
      pong.y = 200;
  } else {
      pong.speedX = -4;
      pong.speedY = 4;
      pong.x = 210;
      pong.y = 200;
  }
}

decideSpeed();

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

// Create Objects
function factoryMachine($id){
  var gameObject = {};
  gameObject.id = $id;
  gameObject.x = Number($($id).css('left').replace(/[^-\d\.]/g, ''));
  gameObject.y = Number($($id).css('top').replace(/[^-\d\.]/g, ''));
  gameObject.width = $($id).width();
  gameObject.height = $($id).height();
  gameObject.speedX = 0;
  gameObject.speedY = 0;
  return gameObject;
}

console.log(pad1);
console.log(pad2);

function repositionGameItem(){
    pad1.y += pad1.speedY; // Repositions paddle1 in the y-direction
    pad2.y += pad2.speedY; // Repositions paddle2 in the y-direction
    pong.x += pong.speedX; // Repositions pong in the x-direction
    pong.y += pong.speedY; // Repositions pong in the y-direction
  }

function redrawGameItem(){
    $("#paddle1").css("top", pad1.y); // Redraws box up or down
    $("#paddle2").css("top", pad2.y); // Redraws box2 up or down
    $("#pong").css("top", pong.y);
    $("#pong").css("left", pong.x);
  }
  
// Keeps all the moving elements within the board
function borderBoard(){
    if (pad1.y > 355) {
        pad1.y = 355;
    } else if (pad1.y < 5) {
        pad1.y = 5;
    }
    if (pad2.y > 355) {
        pad2.y = 355;
    } else if (pad2.y < 5) {
        pad2.y = 5;
    }
    if (pong.y > 420) {
        pong.speedY = -pong.speedY;
    } else if (pong.y < 0) {
        pong.speedY = -pong.speedY;
    }
  }

// Increases the score of the game
function increaseScore(){
    if (pong.x > 420) {
        var pointsIncrease = ++points1;
        $("#scoreOne").text(pointsIncrease);
        pong.x = 210;
        pong.speedX = -pong.speedX;
    } 
    if (pong.x < 0) {
        var pointsIncrease = ++points2;
        $("#scoreTwo").text(pointsIncrease);
        pong.x = 210;
        pong.speedX = -pong.speedX;
    }
}

// Determines if the pong collides w/ either paddle
function doCollide(pad, pong) {

    pad.left = pad.x;
    pad.top = pad.y;
    pad.right = pad.x + pad.width;
    pad.bottom = pad.y + pad.height;
  
    pong.left = pong.x;
    pong.top = pong.y;
    pong.right = pong.x + pong.width;
    pong.bottom = pong.y + pong.height;
  
    // TODO: Return true if they are overlapping, false otherwise
	
    var result = (pad.left < pong.right && pad.right > pong.left && pad.top < pong.bottom && pad.bottom > pong.top) ? true : false;
    if (result) {
        return true;
    } else {
        return false;
    }
}

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

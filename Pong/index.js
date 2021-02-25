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

  var doubleMaxSpeed = 5;

  // Game Item Objects

    var paddle1PositionX = 30; // the x-coordinate location for the paddle1
    var paddle1PositionY = 180; // the y-coordinate location for the paddle1
    var paddle2PositionX = 390; // the x-coordinate location for the paddle2
    var paddle2PositionY = 180; // the y-coordinate location for the paddle2
    var paddle1SpeedY = 0; // the speed for the paddle1 along the y-axis
    var paddle2SpeedY = 0; // the speed for the paddle2 along the y-axis
    var pongPositionX = 210;
    var pongPositionY = 200;
    var pongSpeedX = 0;
    var pongSpeedY = 0;

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
  }
  
  /* 
  Called in response to events.
  */

  // Allows the paddle to move
  function handleKeyDown1(event) {
        if (event.which === KEY1.Up){
            console.log("Pressed Up");
            paddle1SpeedY = -5;
        } else if (event.which === KEY1.Down){
            console.log("Pressed Down");
            paddle1SpeedY = 5;
        }
  }

  // Allows the paddle to stop moving
  function handleKeyUp1(event) {
        if (event.which === KEY1.Up){
          console.log("Lifted Up");
          paddle1SpeedY = 0;
      } else if (event.which === KEY1.Down){
          console.log("Lifted Down");
          paddle1SpeedY = 0;
      }
  }

  // This allows the second paddle to move
  function handleKeyDown2(event){
        if (event.which === KEY2.Up){
          console.log("Pressed Up1");
          paddle2SpeedY = -5;
      } else if (event.which === KEY2.Down){
          console.log("Pressed Down1");
          paddle2SpeedY = 5;
      }
  }

  // This allows the second paddle to stop moving
  function handleKeyUp2(event){
        if (event.which === KEY2.Up){
          console.log("Lifted Up");
          paddle2SpeedY = 0;
      } else if (event.which === KEY2.Down){
          console.log("Lifted Down");
          paddle2SpeedY = 0;
      }
  }

function decideSpeed(){
    return Math.random() * doubleMaxSpeed/2 - doubleMaxSpeed;
}

pongSpeedX = decideSpeed();
pongSpeedY = decideSpeed();

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

function repositionGameItem(){
    paddle1PositionY += paddle1SpeedY; // Repositions paddle1 in the y-direction
    paddle2PositionY += paddle2SpeedY; // Repositions paddle2 in the y-direction
    pongPositionX += pongSpeedX;
    pongPositionY += pongSpeedY;
  }

function redrawGameItem(){
    $("#paddle1").css("top", paddle1PositionY); // Redraws box up or down
    $("#paddle2").css("top", paddle2PositionY); // Redraws box2 up or down
  }
  
function borderBoard(){
    if (paddle1PositionY > 355) {
        paddle1PositionY = 355;
    } else if (paddle1PositionY < 5) {
        paddle1PositionY = 5;
    }
    if (paddle2PositionY > 355) {
        paddle2PositionY = 355;
    } else if (paddle2PositionY < 5) {
        paddle2PositionY = 5;
    }
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

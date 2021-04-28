/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

/* 

Notes

This is used to get the behind blocks (on the snake) moving
- var snakeArray = [1, 2, 3];

for (var i = snakeArray.length - 1; i >= 1; i--){
  snakeArray[i] = snakeArray[i - 1];
  console.log(snakeArray);
}

*/


  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var KEY1 = {
      "Left": 65,
      "Up": 87,
      "Right": 68,
      "Down": 83
  };

var apple = factoryMachine("#apple");
var snakeArray = [factoryMachine(".snake")];
var head = snakeArray[0];
var tail = snakeArray[snakeArray.length - 1];

var points = 0;
$("#score").text("Score: 0");


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown1);                           // Triggers paddle1 to move

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
    checkCollision();
}
  
  /* 
  Called in response to events.
  */

  function handleKeyDown1(event) {
        if (event.which === KEY1.Up){
            console.log("Pressed Up");
            head.speedY = -20;
            head.speedX = 0;
            KEY1.Down = false;
            KEY1.Right = 68;
            KEY1.Left = 65;
        } else if (event.which === KEY1.Down){
            console.log("Pressed Down");
            head.speedY = 20;
            head.speedX = 0;
            KEY1.Up = false;
            KEY1.Right = 68;
            KEY1.Left = 65;
        }   
        
// Use a flag variable
/*        if ((event.which === KEY1.Up) && (event.which === KEY1.Left)){
            head.speedX = -20;
            head.speedY = 0;
        } else if ((event.which === KEY1.Up) && (event.which === KEY1.Right)) {
            head.speedX = 20;
            head.speedY = 0;
        }
*/

        if (event.which === KEY1.Left){
            console.log("Pressed Left");
            head.speedX = -20;
            head.speedY = 0;
            KEY1.Right = false;
            KEY1.Up = 87;
            KEY1.Down = 83;
    }   else if (event.which === KEY1.Right){
            console.log("Pressed Right");
            head.speedX = 20;
            head.speedY = 0;
            KEY1.Left = false;
            KEY1.Up = 87;
            KEY1.Down = 83;

    }
  }

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

// Changes the x and y values on collision
function checkCollision(){

    if ((head.x === apple.x) && (head.y === apple.y)){
       
        var randomTwenty_1 = Math.floor(Math.random() * 20);
        var randomTwenty_2 = Math.floor(Math.random() * 20);

        var blockPixel_1 = randomTwenty_1 * 20;
        var blockPixel_2 = randomTwenty_2 * 20;

        apple.x = blockPixel_1;
        apple.y = blockPixel_2;

        $("#apple").css("left", blockPixel_1);
        $("#apple").css("top", blockPixel_2);

        console.log(apple.x);
        console.log(apple.y);

        points = points + 1;
        $("#score").text("Score: " + points);

    } else {
        return;
    }

    for (var i = snakeArray.length - 1; i >= 1; i--){
        snakeArray[i] = snakeArray[i - 1];
        console.log(snakeArray);
    }

    for (var i = 0; i < snakeArray.length; i++){
            if (doCollide(apple, snakeArray[i])){
            checkCollision();
            return;
        }
    }
}

function doCollide(obj1, obj2) {
    if (obj1.x === obj2.x && obj1.y === obj2.y) {
        return true;
    }
    else {
        return false;
    }
}

function repositionGameItem(){
    head.x += head.speedX; // Repositions snake in the y-direction
    head.y += head.speedY; // Respositions snake in the x-direction
}

function redrawGameItem(){
    $(".snake").css("top", head.y); // Redraws snake up or down
    $(".snake").css("left", head.x); // Redraws snake left or right
  }

function borderBoard(){
    if (head.y > 400) {
        head.speedY = 0;
    } else if (head.y < 0) {
        head.speedY = 0;
    }
    if (head.x > 400) {
        head.speedX = 0;
    } else if (head.x < 0) {
        head.speedX = 0;
    }
}

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
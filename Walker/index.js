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

    var positionX = 0; // the x-coordinate location for the box
    var positionY = 0; // the y-coordinate location for the box
    var positionX2 = 0 // the x-coordinate location for the box2
    var positionY2 = 0 // the y-coordinate location for the box2
    var speedX = 0; // the speed for the box along the x-axis
    var speedY = 0; // the speed for the box along the y-axis
    var speedX2 = 0; // the speed for the box2 along the x-axis
    var speedY2 = 0; // the speed for the box2 along the y-axis

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown1);                           // Triggers ball to move
  $(document).on("keyup", handleKeyUp1);                               // Triggers ball to stop moving
  $(document).on("keydown", handleKeyDown2);                           // Triggers ball2 to move
  $(document).on("keyup", handleKeyUp2);                               // Triggers ball2 to stop moving

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
  function handleKeyDown1(event) {
    //   console.log("Key Pressed: " + event.key); // event.key allows function to tell which key is pressed
    // event.which allows certain keys, when pressed, to equal a certain variable
      if (event.which === KEY1.Left){
          console.log("Pressed Left");
          speedX = -5;
      } else if (event.which === KEY1.Up){
          console.log("Pressed Up");
          speedY = -5;
      } else if (event.which === KEY1.Right){
          console.log("Pressed Right");
          speedX = 5;
      } else if (event.which === KEY1.Down){
          console.log("Pressed Down");
          speedY = 5;
      }
  }

  // Allows the ball to stop moving
  function handleKeyUp1(event) {
      
      if (event.which === KEY1.Left){
          console.log("Lifted Left");
          speedX = 0;
      } else if (event.which === KEY1.Up){
          console.log("Lifted Up");
          speedY = 0;
      } else if (event.which === KEY1.Right){
          console.log("Lifted Right");
          speedX = 0;
      } else if (event.which === KEY1.Down){
          console.log("Lifted Down");
          speedY = 0;
      }
  }

  // This allows the second box to move
  function handleKeyDown2(event){
      if (event.which === KEY2.Left){
          console.log("Pressed Left1");
          speedX2 = -5;
      } else if (event.which === KEY2.Up){
          console.log("Pressed Up1");
          speedY2 = -5;
      } else if (event.which === KEY2.Right){
          console.log("Pressed Right1");
          speedX2 = 5;
      } else if (event.which === KEY2.Down){
          console.log("Pressed Down1");
          speedY2 = 5;
      }
  }

  // This allows the second box to stop moving
  function handleKeyUp2(event){
      if (event.which === KEY2.Left){
          console.log("Lifted Left");
          speedX2 = 0;
      } else if (event.which === KEY2.Up){
          console.log("Lifted Up");
          speedY2 = 0;
      } else if (event.which === KEY2.Right){
          console.log("Lifted Right");
          speedX2 = 0;
      } else if (event.which === KEY2.Down){
          console.log("Lifted Down");
          speedY2 = 0;
      }
  }

//   function tagGame(){
//         if ($("#gameItem").css("background-color", "red")){
//             if (positionX === positionX2){
//                 $(".gameItem2").css("background-color", "red");
//                 $("#gameItem").css("background-color", "teal");
//             }
//         }
//         if ($(".gameItem2").css("background-color", "red")){
//              if (positionX2 === positionX){
//                 $("#gameItem").css("background-color", "red");
//                 $(".gameItem2").css("background-color", "violet");
//             }
//         }
//     }

    // function tagGameStart(){
    //   var numberGen = Math.floor((Math.random() * 2));
    //   if (numberGen === 1){
    //       $("#gameItem").css("background-color", "red");
    //   } else if (numberGen === 0){
    //       $(".gameItem2").css("background-color", "red");
    //   }
    // }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
      positionX += speedX; // Repositions box in the x-direction
      positionY += speedY; // Repositions box in the y-direction
      positionX2 += speedX2; // Repositions box2 in the x-direction
      positionY2 += speedY2; // Repositions box2 in the y-direction
  }

  function redrawGameItem(){
      $("#gameItem").css("left", positionX); // Redraws box left or right
      $("#gameItem").css("top", positionY); // Redraws box up or down
      $(".gameItem2").css("left", positionX2); // Redraws box2 left or right
      $(".gameItem2").css("top", positionY2); // Redraws box2 up or down
  }

  // This function causes the ball to stay within the board
  function borderBoard(){
      if (positionX > 390) {
          positionX = 390;
      } else if (positionX < 0) {
          positionX = 0;
      } 
      if (positionY > 390) {
          positionY = 390;
      } else if (positionY < 0) {
          positionY = 0;
      }
      if (positionX2 > 390) {
          positionX2 = 390;
      } else if (positionX2 < 0) {
          positionX2 = 0;
      } 
      if (positionY2 > 390) {
          positionY2 = 390;
      } else if (positionY2 < 0) {
          positionY2 = 0;
      }
  }

  // Calls in the function
//   tagGameStart();
//   tagGame();

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

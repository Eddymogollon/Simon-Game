$(document).ready(function() {
  //Variable to hold the order of the colors
  var pressOrder = [];
  var userPressOrder = [];

  //Variables to hold the color buttons
  var $green = $('.green');
  var $red = $('.red');
  var $yellow = $('.yellow');
  var $blue = $('.blue');

  /* Audio variables for the buttons*/
  var audioGreen = $('#audio-green')[0];
  var audioRed = $('#audio-red')[0];
  var audioYellow = $('#audio-yellow')[0];
  var audioBlue = $('#audio-blue')[0];

  //Flag variables
  var gameStarted = false;
  var switchOn = false;
  var strictOn = false;
  var checkColorsMatching = false;

  //Holds how many times the sequence of colors are to be repeated
  var indexGameOrder = 0;
  //The level you are in now, and to also manage the sequence of colors.
  var gameLevel = 0;
  //Speeds between each color interval
  var colorSpeed = 1500;
  //Variable to hold clearTimeout(waitTime);
  var stopTime;
  //Variable to hold clearTimeout(nextOrder);
  var stopNextOrder; //Probably erase this
  //Variable that indicates that you can only start playing once
  var startOnlyOnce = true;


  $('.start').click(function() {
    if (switchOn) {
      pressOrder = [];

      colorSpeed = 1300;
      window.clearTimeout(stopTime);

      userPressOrder = [];
      gameLevel = 0;
      indexGameOrder = 0;

      $('#counter-text').html("--");

      //If statement used so the program won't get bugged if the
      //user pressed the Start button several times.
      if (startOnlyOnce) {
        console.log("Did it once!");
        getRandomOrder();
        stopNextOrder = window.setTimeout(nextOrder, colorSpeed);
        startOnlyOnce = false;
      }
    }
  });

  $('.switch').click(function() {
    if (!switchOn) {
      $('.switch > span').removeClass('off').addClass('on');
      switchOn = true;
      $('.counter').css("color", "red");
      startOnlyOnce = true;
    }
    else {
      $('.switch > span').removeClass('on').addClass('off');
      switchOn = false;
      $('.counter').css("color", "#8B0000");
      $('.strict-switch').css("background-color", "#333");
      gameStarted = false;
      userPressOrder = [];
      gameLevel = 0;
      indexGameOrder = 0;
      pressOrder = [];
      colorSpeed = 2000;
      strictOn = false;
      window.clearTimeout(stopTime);
      $('#counter-text').html("--");
      window.clearTimeout(window.setTimeout(nextOrder, colorSpeed));

    }
  });

  $('.strict').click(function() {
    if (switchOn) {
      if (!strictOn) {
        $('.strict-switch').css("background-color", "red");
        strictOn = true;
      }
      else {
        $('.strict-switch').css("background-color", "#333");
        strictOn = false;
      }
    }
  });

  $('.green').click(function() {
    if (gameStarted) {
      userPressOrder.push("green");
      audioGreen.play();
      $green.css("background-color", "#13ff7c");
      window.setTimeout(changeGreenColor, 200);
      afterButtonPressed();
    }
  });

  $('.red').click(function() {
    if (gameStarted) {
      userPressOrder.push("red");
      audioRed.play();
      $red.css("background-color", "#ff4c4c");
      window.setTimeout(changeRedColor, 200);
      afterButtonPressed();
    }
  });

  $('.yellow').click(function() {
    if (gameStarted) {
      userPressOrder.push("yellow");
      audioYellow.play();
      $yellow.css("background-color", "#fed93f");
      window.setTimeout(changeYellowColor, 200);
      afterButtonPressed();
    }
  });

  $('.blue').click(function() {
    if (gameStarted) {
      userPressOrder.push("blue");
      audioBlue.play();
      $blue.css("background-color", "#1c8cff");
      window.setTimeout(changeBlueColor, 200);
      afterButtonPressed();
    }
  });

  /**************************
   *        FUNCTIONS       *
   **************************/


  function getRandomOrder() {
    pressOrder = [];
    for (var i = 0; i < 10; i++) {
      var randomNumber = Math.ceil(Math.random() * 12);

      switch (randomNumber) {
        case 1:
        case 5:
        case 9:
          randomNumber = "green";
          break;
        case 2:
        case 6:
        case 10:
          randomNumber = "red";
          break;
        case 3:
        case 7:
        case 11:
          randomNumber = "yellow";
          break;
        case 4:
        case 8:
        case 12:
          randomNumber = "blue";
          break;
        default:
          randomNumber = "error!";
          break;
      }
      pressOrder.push(randomNumber);
    }
    console.log(pressOrder);
  }

  function nextTurn() {
    indexGameOrder = 0;

    //Checks if there is a match up to the current level
    for (var colorIndex = 0; colorIndex <= gameLevel; colorIndex++) {

      if (userPressOrder[colorIndex] === pressOrder[colorIndex]) {
        checkColorsMatching = true;

      }
      else {
        checkColorsMatching = false;
      }

    }
    //If the orders match, then you passed the game
    if (checkColorsMatching && pressOrder.length === (gameLevel + 1)) {
      gameLevel = 0;
      $('#counter-text').html("--");
      return alert("You just won the game!");
    }
    //Pass to next level, else, repeat.
    if (checkColorsMatching) {
      gameLevel++;
      colorSpeed = colorSpeed - 75;
      stopNextOrder = window.setTimeout(nextOrder, colorSpeed);
    }
    else {
      wrongColor();
      stopNextOrder = window.setTimeout(nextOrder, colorSpeed);
    }

  }
  //If the counter is less than 9, add an extra 0
  function counterLevel() {
    if (gameLevel < 9) {
      return "0" + (gameLevel + 1);
    }
    else {
      return gameLevel + 1;
    }
  }

  function nextOrder() {

    startOnlyOnce = true;
    if (pressOrder[indexGameOrder] !== undefined) {
      $('#counter-text').html(counterLevel());
    }
    else {
      $('#counter-text').html("??");
    }

    if (pressOrder[indexGameOrder] === "green" && switchOn) {
      $green.css("background-color", "#13ff7c");
      audioGreen.play();
      window.setTimeout(changeGreenColor, (colorSpeed / 2));
      showPressOrder();

    }
    else if (pressOrder[indexGameOrder] === "red" && switchOn) {
      $red.css("background-color", "#ff4c4c");
      audioRed.play();
      window.setTimeout(changeRedColor, (colorSpeed / 2));
      showPressOrder();
    }
    else if (pressOrder[indexGameOrder] === "yellow" && switchOn) {
      $yellow.css("background-color", "#fed93f");
      audioYellow.play();
      window.setTimeout(changeYellowColor, (colorSpeed / 2));
      showPressOrder();
    }
    else if (pressOrder[indexGameOrder] === "blue" && switchOn) {
      $blue.css("background-color", "#1c8cff");
      audioBlue.play();
      window.setTimeout(changeBlueColor, (colorSpeed / 2));
      showPressOrder();
    }

  }

  //After the program decides on the order of colors,
  //show the order.
  function showPressOrder() {
    indexGameOrder++;
    console.log("Index game order: " + indexGameOrder);
    if (indexGameOrder <= gameLevel) {
      stopNextOrder = window.setTimeout(nextOrder, colorSpeed);
    }
    else {
      stopTime = window.setTimeout(waitTime, 8000);
      gameStarted = true;
      $('.green, .red, .yellow, .blue').css("cursor", "pointer");
    }
    userPressOrder = [];
  }


  //After any color buttons are pressed, execute this function
  function afterButtonPressed() {
    console.log(userPressOrder); //
    console.log("Game level: " + gameLevel); //
    console.log(userPressOrder.length); //
    window.clearTimeout(stopTime); //
    if ((gameLevel + 1) === userPressOrder.length) {

      gameStarted = false;
      $('.green, .red, .yellow, .blue').css("cursor", "auto");
      nextTurn();

    }
    else if ((userPressOrder[userPressOrder.length - 1] !== pressOrder[userPressOrder.length - 1]) && strictOn) {
      wrongColor();
      gameLevel = 0;
      pressOrder = [];
      getRandomOrder();
      window.setTimeout(nextOrder, colorSpeed);
    }
    else if (userPressOrder[userPressOrder.length - 1] !== pressOrder[userPressOrder.length - 1]) {
      console.log(strictOn);
      wrongColor();
      window.setTimeout(nextOrder, colorSpeed);
    }
  }

  //Let the user now that after some time, his answer will be marked wrong.
  function waitTime() {
    wrongColor();
    window.clearTimeout(stopTime);
    window.clearTimeout(stopTime);
    window.clearTimeout(stopTime);
    stopNextOrder = window.setTimeout(nextOrder, colorSpeed);

  }
  //Functions to change colors back to normal
  function changeGreenColor() {
    $green.css("background-color", "#00a74a");
  }

  function changeRedColor() {
    $red.css("background-color", "#9f0f17");
  }

  function changeYellowColor() {
    $yellow.css("background-color", "#cca707");
  }

  function changeBlueColor() {
    $blue.css("background-color", "#094a8f");
  }

  function wrongColor() {
    audioBlue.play();
    audioGreen.play();
    audioRed.play();
    audioYellow.play();
    userPressOrder = [];
    indexGameOrder = 0;
    console.log("Wrong Color called");
    gameStarted = false;
    $('.green, .red, .yellow, .blue').css("cursor", "auto");
  }

});

/* Things to fix:
        
  None yet.

*/
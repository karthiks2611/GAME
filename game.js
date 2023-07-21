let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;
let highScore = 0;

let redSound = new Audio("sounds/red.mp3");
let blueSound = new Audio("sounds/blue.mp3");
let greenSound = new Audio("sounds/green.mp3");
let yellowSound = new Audio("sounds/yellow.mp3");
let wrongSound = new Audio("sounds/wrong.mp3");

// Start the game when the screen is touched on mobile devices
$(document).on("click touchstart", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click touchstart", function (event) {
  event.preventDefault(); // Prevent the default behavior of the touch event
  if (started) {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over");
    $("#score").text(level - 1); // Display the score in the modal

    if (level - 1 > highScore) {
      highScore = level - 1;
    }

    // Show the Game Over modal
    $("#game-over-modal").css("display", "block");

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  switch (name) {
    case "red":
      redSound.play();
      break;
    case "blue":
      blueSound.play();
      break;
    case "green":
      greenSound.play();
      break;
    case "yellow":
      yellowSound.play();
      break;
    case "wrong":
      wrongSound.play();
      break;
    default:
      break;
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Event listener for the "Restart" button in the Game Over modal
$("#restart-btn").on("click", function () {
  closeModal(); // Close the Game Over modal
  startGame(); // Restart the game
});

function startGame() {
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  started = false;
}

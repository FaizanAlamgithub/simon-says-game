// Initialize the sequence for the game
let gameSeq = [];

// Initialize the user's sequence of button presses
let usrSeq = [];

// Define the array of button colors
let btns = ["yellow", "red", "purple", "blue"];

// Variable to track if the game has started
let started = false;

// Variable to track the current level
let level = 0;

// Variable to track the maximum score
let maxScore = 0;

// Select the heading element where the level is displayed
let h2 = document.querySelector(".heading");

// Select the element where the maximum score is displayed
let max = document.querySelector(".score");

// Start the game
let start = document.querySelector("#startgame");

// Add an event listener for keypress events to start the game
start.addEventListener("click", function () {
  // Check if the game has not started yet
  if (started == false) {
    console.log("game started");

    // Set the game as started
    started = true;

    // Move to the next level
    levelUp();
  }
});

// Function to add a flash effect to the game button
function gameFlash(btn) {
  // Add the flash class to the button
  btn.classList.add("flash");

  // Remove the flash class after 250 milliseconds
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

// Refresh page to start again

let refresh = document.querySelector("#refresh");
refresh.addEventListener("click", () => {
  ref();
});

function ref() {
  location.reload();
}

// Function to add a flash effect to the user button
function userFlash(btn) {
  // Add the userflash class to the button
  btn.classList.add("userflash");

  // Remove the userflash class after 250 milliseconds
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

// Function to move to the next level
function levelUp() {
  // Reset the user's sequence
  usrSeq = [];

  // Increment the level
  level++;

  // Update the heading text with the current level
  h2.innerText = `level ${level}`;

  // Choose a random button color
  let ranIndx = Math.floor(Math.random() * 3);
  let ranColor = btns[ranIndx];

  // Select the button element with the random color
  let ranBtn = document.querySelector(`.${ranColor}`);

  // Add the random color to the game sequence
  gameSeq.push(ranColor);
  console.log(gameSeq);

  // Add a flash effect to the selected button
  gameFlash(ranBtn);
}

// Function to check the user's answer
function checkAns(idx) {
  // Check if the user's input matches the game sequence
  if (usrSeq[idx] === gameSeq[idx]) {
    // Check if the user has completed the sequence
    if (usrSeq.length === gameSeq.length) {
      // Move to the next level after a delay
      setTimeout(levelUp, 1000);
    }
  } else {
    // Display game over message and score
    h2.innerHTML = `Game Over! <b> Your Score Was ${level} <b> <br> Press any key to Start`;

    // Change the background color to red
    document.querySelector("body").style.backgroundColor = "red";

    // Change the background color back to white after a delay
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    // Update the maximum score if needed
    updateScore();

    // Reset the game
    reset();
  }
}

// Function to handle button press events
function btnPress() {
  // Reference to the button that was pressed
  let btn = this;

  // Add a flash effect to the button
  userFlash(btn);

  // Get the color of the pressed button
  userColor = btn.getAttribute("id");

  // Add the color to the user's sequence
  usrSeq.push(userColor);

  // Check the user's answer
  checkAns(usrSeq.length - 1);
}

// Select all buttons with the class "btn"
let allBtns = document.querySelectorAll(".btn");

// Add event listeners to all buttons
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// Function to reset the game
function reset() {
  // Set the game as not started
  started = false;

  // Reset the game sequence
  gameSeq = [];

  // Reset the user's sequence
  usrSeq = [];

  // Reset the level
  level = 0;
}

// Function to update the maximum score
function updateScore() {
  // Check if the current level is greater than the maximum score
  if (level > maxScore) {
    // Update the maximum score
    maxScore = level;

    // Update the score display
    max.innerText = `Max score is : ${maxScore}`;
  }
}

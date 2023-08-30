//DECLERATION VARIABLES

//Selecting the button on the home page using the dom tree and giving it the variable of startQuiz
var startQuiz = document.querySelector("#start");
//Selecting the hidden div using the dom tree an assigning it a variable
var quizPageOne = document.querySelector("#question");
//Selecting the other hidden div under results using the dom tree, will use later for results page
var resultsPage = document.querySelector("#results");
//selecting the h2 inside the questions div so i can present questions using this later
var qTitle = document.querySelector("#q");
//this will be used to check answer if they are right or wrong
var validate = document.querySelector("#right-or-wrong");
//setting up a timer variable that links to the header
var timer = document.querySelector("#timer");
//this is setting the amount of time a user will have to finish the quiz
var timedScore = 60;
//setting up a blank variable that i will use later in a function
var timerInterval;
//setting up the question index at 0 so when i use a function later itll start at index 0
var questionIndex = 0;
//setting up a blank variable that will be used to display the current question in a future function
var currentQ;
//setting up a variable named current score that will be used to log the users current score into local memory later
var currentScore;
//this will help me log the score into global memory to be pulled out later and put in the high scores page
var hiScores = [];
// selecting the button in the html using the dom tree
var scores = document.querySelector("#scores");
//this will be used to show text saying if they were right or wrong
var resultAnswer = document.querySelector("#answer");
//setting up an object array that includes the questions, the multiples choices, and the answer
var questions = [
  {
    Title: "first-question",
    Choices: ["red", "green", "blue", "yellow"],
    answer: 1,
  },
  {
    Title: "second-question",
    Choices: ["red", "green", "blue", "yellow"],
    answer: 1,
  },
  {
    Title: "third-question",
    Choices: ["red", "green", "blue", "yellow"],
    answer: 1,
  },
  {
    Title: "fourth-question",
    Choices: ["red", "green", "blue", "yellow"],
    answer: 1,
  },
];

// Functions
//this function is used to display the questions in order
function displayQuestion() {
  //currentQ a global variable is going to be equal to the questions variable with an idex of question index (0)
  currentQ = questions[questionIndex];
  //a For loop to increase the index of question index one at a time after the user hits click
  for (let i = 0; i < currentQ.Choices.length; i++) {
    const currentChoice = currentQ.Choices[i];
    var li = document.getElementById(i);
    //setting the qtitle text content to the currentQ's title in its object array
    qTitle.textContent = currentQ.Title;
    //setting the text in the list to the current choices which indicates the choices available for the question
    li.textContent = currentChoice;
    //adding a click event so when the user hits click it will run the check answer function
    li.addEventListener("click", checkAnswers);
  }
}
//this function will be used to check answers
function checkAnswers(event) {
  //setting up a variable userChoice that will be equal to whatever answer the user chooses by deciding what ID they choose
  var userChoice = event.target.id;
  //if the current question answer index is equal to the user choice index then the statement will be true
  if (currentQ.answer == userChoice) {
    //if true itll display this content in the validate section
    validate.textContent = "Thats Correct!☑️";
  } else {
    //if not it will display this content instead
    validate.textContent = "Thats Incorrect!😭";
    //it will then subtract x amount of time from the score
    timedScore -= 10;
    //if the score is equal to or less the 0
    if (timedScore <= 0) {
      timedScore = 0;
      //it will stop the timer
      clearInterval(timerInterval);
    }
    //the timer variables text content is equal to the timed score
    timer.textContent = timedScore;
  }
//increasing the question index by 1 so it will go to the next question
  questionIndex++;
  //if the question index comes back as undefined or the timed score is less then or equal to 0 
  if (!questions[questionIndex] || timedScore <= 0) {
    //then it will stop the timer
    clearInterval(timerInterval);
    //clear the quiz pages out so they dont display anything 
    quizPageOne.textContent = "";
    //remove the hidden attribute from the results page so the page will now show up 
    resultsPage.removeAttribute("hidden");
    //otherwise it will replay the display questions loop
  } else displayQuestion();
}

function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function () {
    timedScore--;
    timer.textContent = timedScore;

    if (timedScore === 0) {
      checkAnswers({ target: { id: null } });
    }
  }, 1000);
}

function init() {
  var storedScores = JSON.parse(localStorage.getItem("hiScores"));
  if (storedScores !== null) {
    hiScores = storedScores;
  }
}

function storeScores() {
  localStorage.setItem("hiScores", JSON.stringify(hiScores));
}

//Event Listeners
startQuiz.addEventListener("click", function () {
  var homePage = document.querySelector("section");
  homePage.textContent = "";
  quizPageOne.removeAttribute("hidden");
  timer.textContent = timedScore;
  setTime();
  displayQuestion();
});

//local storage

scores.addEventListener("click", function (event) {
  event.preventDefault();
  var userInitials = document.querySelector("#initials").value;
  if (userInitials === "") {
    resultAnswer.textContent = "Error, must have initials or name in box";
  } else {
    resultAnswer.textContent =
      "Thank you! Your record has been saved in the local memory, check it out!";
    currentScore = {
      initials: userInitials,
      points: timedScore,
    };
    hiScores.push(currentScore);
  }
  storeScores();
});

init();

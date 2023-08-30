//DECLERATION VARIABLES

var startQuiz = document.querySelector("#start");
var quizPageOne = document.querySelector("#question");
var resultsPage = document.querySelector("#results");
var qTitle = document.querySelector("#q");
var validate = document.querySelector("#right-or-wrong");
var timer = document.querySelector("#timer");
var timedScore = 60;
var timerInterval;
var questionIndex = 0;
var currentQ;
var currentScore;
var hiScores = [];
var scores = document.querySelector("#scores");
var wrong = document.querySelector("#wrong");
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
function displayQuestion() {
  currentQ = questions[questionIndex];
  for (let i = 0; i < currentQ.Choices.length; i++) {
    const currentChoice = currentQ.Choices[i];
    var li = document.getElementById(i);
    qTitle.textContent = currentQ.Title;
    li.textContent = currentChoice;
    li.addEventListener("click", checkAnswers);
  }
}

function checkAnswers(event) {
  var userChoice = event.target.id;
  if (currentQ.answer == userChoice) {
    validate.textContent = "Thats Correct!☑️";
  } else {
    validate.textContent = "Thats Incorrect!😭";
    timedScore -= 10;
    if (timedScore <= 0) {
      timedScore = 0;
      clearInterval(timerInterval);
    }
    timer.textContent = timedScore;
  }
  questionIndex++;
  if (!questions[questionIndex] || timedScore <= 0) {
    clearInterval(timerInterval);
    quizPageOne.textContent = "";
    resultsPage.removeAttribute("hidden");
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
    wrong.textContent = "Error, must have initials or name in box";
  } else {
    wrong.textContent =
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

// function descendingOrder(a, b) {
//   if (a.score < b.score) {
//     return 1;
//   }
//   if (a.score > b.score) {
//     return -1;

//   }
//   return 0;
// }

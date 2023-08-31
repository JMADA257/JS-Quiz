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
    Title: "What can you use to style the color and effects of a webpage?",
    Choices: ["Microsoft paint", "CSS", "BSS", "Photoshop"],
    answer: 1,
  },
  {
    Title: "What is a good place to go to if your lost in code?",
    Choices: ["Down the rabbit hole", "Google", "My proffessor Ben", "DarkWeb"],
    answer: 1,
  },
  {
    Title: "Choose the correct heading that will be the largest.",
    Choices: ["main", "H6", "Footer", "H1"],
    answer: 3,
  },
  {
    Title: "Which character indicates an end tag?",
    Choices: [">", "!", "🛑", "|"],
    answer: 0,
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
    validate.textContent = "Thats Incorrect!😭. Minus 10 Seconds!";
    //it will then subtract x amount of time from the score
    timedScore -= 10;
    //if the score is equal to or less the 0
    if (timedScore <= 0) {
      timedScore = 0;
      //it will stop the timer
      clearInterval(timerInterval);
    }
    //the timer variables text content is equal to the timed score
    timer.textContent = "Time left: " + timedScore;
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

//setting up a function for the timer!
function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function () {
    //the timed score will subtract by 1 every second
    timedScore--;
    //the timer text content will be updated with timedscore to show its subtracting every second
    timer.textContent = "Time left: " + timedScore;
    //if the timer hits 0 it will run the check answers loop with a null target since check answers is an event function
    if (timedScore === 0) {
      checkAnswers({ target: { id: null } });
    }
    //time subtracts by 1000ms or 1 second
  }, 1000);
}

//Adding a function called init
function init() {
  //setting up a local variable to have parsed  =  json is a way of storing and transporting data, parse is turning the values of the score and name into a string in local memory
  var storedScores = JSON.parse(localStorage.getItem("hiScores"));
  //if the variable is null
  if (storedScores !== null) {
    hiScores = storedScores;
  }
}
//setting up a function called storescores
function storeScores() {
  //still kinda confused on both these functions, i kinda stumbled my way through so if the grader could write notes explaining this function and the init function a little more id appreciate it
  localStorage.setItem("hiScores", JSON.stringify(hiScores));
}

//Event Listeners
//adding an event listener to the startquiz button for a click event
startQuiz.addEventListener("click", function () {
  //making a local variable named homepage which is the page the user first sees
  var homePage = document.querySelector("section");
  //basically making the homepage disappear
  homePage.textContent = "";
  //having quiz page one have the hidden attribute removed so itll pop up on the page
  quizPageOne.removeAttribute("hidden");
  //putting the timer up in the header so the user can see it
  timer.textContent = "Time left: " + timedScore;
  //running the set time function
  setTime();
  //running the display question function
  displayQuestion();
});

//adding an event listener for the user to submit there score to highscores
scores.addEventListener("click", function (event) {
  //preventing the page from refreshing after clicking
  event.preventDefault();
  //setting up a variable that tracts what the user will put in the input field for there initials
  var userInitials = document.querySelector("#initials").value;
  //if the user doesnt put any initials
  if (userInitials === "") {
    //then the <p> under it will say error
    resultAnswer.textContent = "Error, must have initials or name in box";
  } else {
    //otheriwse it will say thank you
    resultAnswer.textContent =
      "Thank you! Your record has been saved in the local memory, check it out!";
    //setting up a object array of current score to put into local memory later consisting of the initials, and score
    currentScore = {
      initials: userInitials,
      points: timedScore,
    };
    //pushing the hiscores variable into the current score object array
    hiScores.push(currentScore);
  }
  //running the store scores function
  storeScores();
});

//when everything else is done it will finally run the init function
init();

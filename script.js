// store references to the various divs containing the screens
var startScreen = document.querySelector("#start-screen");
var multipleChoiceScreen = document.querySelector("#multiple-choice");
var scoreScreen = document.querySelector("#score-screen");
var leaderBoardScreen = document.querySelector("#leaderboard-screen");

// store button references
var startButton = document.querySelector(".start-button");

// store various object references
var timerDisplay = document.querySelector("#time");

//answer choice div references
var questionDisplay = document.querySelector(".question-display");
var questionBoxes = document.querySelectorAll(".answer-choice");
console.log(questionDisplay);

// functional variables
var time = 0;
var currentQuestion = 0;

function displayTime(time_input){
    timerDisplay.textContent = time_input;
}

function startTimer(){
    time = 10;
    displayTime(time);
    var gameTimer = setInterval( function(){
        time--;
        displayTime(time);
    },
    1000);
}

function displayQuestion(question_input){
    questionDisplay.textContent = question_input.myQuestion;
    questionBoxes[0].textContent = question_input.choice1;
    questionBoxes[1].textContent = question_input.choice2;
    questionBoxes[2].textContent = question_input.choice3;
    questionBoxes[3].textContent = question_input.choice4;
}

function startQuiz(){
    console.log("test");
    startScreen.style.display = "none";
    multipleChoiceScreen.style.display = "flex";
    startTimer();
    displayQuestion(questions[currentQuestion]);
}

startButton.onclick = startQuiz;
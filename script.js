// store references to the various divs containing the screens
var startScreen = document.querySelector("#start-screen");
var multipleChoiceScreen = document.querySelector("#multiple-choice");
var scoreScreen = document.querySelector("#score-screen");
var leaderBoardScreen = document.querySelector("#leaderboard-screen");

// store button references
var startButton = document.querySelector(".start-button");

// store various object references
var timerDisplay = document.querySelector("#time");


// functional variables
var time = 0;


function displayTime(time_input){
    console.log("test");
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

function startQuiz(){
    startScreen.style.display = "none";
    multipleChoiceScreen.style.display = "flex";
    startTimer();
}

startButton.onclick = startQuiz;
// store references to the various divs containing the screens
var startScreen = document.querySelector("#start-screen");
var multipleChoiceScreen = document.querySelector("#multiple-choice");
var scoreScreen = document.querySelector("#score-screen");
var leaderBoardScreen = document.querySelector("#leaderboard-screen");

// store button references
var startButton = document.querySelector(".start-button");
var confirmScoreButton = document.querySelector(".confirm-button");
var restartButton = document.querySelector(".restart-button");



// store various object references
var timerDisplay = document.querySelector("#time");
var finalScoreDisplay = document.querySelector(".final-score-display");
var nameInput = document.querySelector(".name-input");
var leaderBoardList = document.querySelector(".list-of-scores");

//answer choice div references
var questionDisplay = document.querySelector(".question-display");
var questionBoxes = document.querySelectorAll(".answer-choice");

// functional variables
var timerActive = false;
var time = 0;
var currentQuestion = 0;

if(localStorage.getItem("scoresList") === null){
    localStorage.setItem("scoresList", JSON.stringify([]));
    
} 

function displayTime(time_input){
    timerDisplay.textContent = time_input;
}

function startTimer(){
    timerActive = true;
    time = 10;
    displayTime(time);
    var gameTimer = setInterval( function(){
        if(timerActive){
            time--;
            displayTime(time);
        } else {
            clearInterval(gameTimer);
        }
    },
    1000);
}

function finishQuiz(){
    timerActive = false;
    multipleChoiceScreen.style.display = "none";
    scoreScreen.style.display = "flex";
    finalScoreDisplay.textContent = time;
    
}

function displayQuestion(question_input){
    if(question_input === undefined){
        finishQuiz();
    } else {
        questionDisplay.textContent = question_input.myQuestion;
        questionBoxes[0].textContent = question_input.choice1;
        questionBoxes[1].textContent = question_input.choice2;
        questionBoxes[2].textContent = question_input.choice3;
        questionBoxes[3].textContent = question_input.choice4;
    }
    
}

function startQuiz(){
    startScreen.style.display = "none";
    multipleChoiceScreen.style.display = "flex";
    startTimer();
    displayQuestion(questions[currentQuestion]);
}

function compare(a,b){
    var aScore = a.score;
    var bScore = b.score;
    if(aScore<bScore){
        return 1;
    }
    if (bScore<aScore){
        return -1;
    }
    return 0;
}

function displayScores(currentScores){
    var workingList = Array.from(currentScores);
    var elementToAdd = document.createElement("li");
    leaderBoardList.innerHTML = '';
    workingList.sort(compare);
    for(var i = 0; i<workingList.length; i++){
        elementToAdd = document.createElement("li");
        elementToAdd.textContent = workingList[i].player + ": " + workingList[i].score;
        leaderBoardList.append(elementToAdd);
    }

}

function confirmScore(){
 
    scoreScreen.style.display = "none";
    leaderBoardScreen.style.display = "flex";
    currentScores = JSON.parse(localStorage.getItem("scoresList"));
    currentScores.push({player: nameInput.value, score: time});
    displayScores(currentScores);
    currentScores = JSON.stringify(currentScores);
    localStorage.setItem("scoresList", currentScores);
}

startButton.onclick = startQuiz;
confirmScoreButton.onclick = confirmScore;
restartButton.onclick = function(){location.reload()};

questionBoxes.forEach(element => {
    element.addEventListener("click", function(){
        if(element.textContent === questions[currentQuestion].correctChoice){
            time+=10;
            displayTime(time);
        } else {
            time-=10;
            displayTime(time);
        }
        currentQuestion++;
        displayQuestion(questions[currentQuestion]);
    });
});
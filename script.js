// READ ME
// the flow of this script may not seem intuitive at first so this explanation is to shed light on its inner workings
// the first bit is fairly simple, we are simply adding references to all relevant objects and creating important functional values
// next we create a local variable scoresList if it does not already exist
// after this we run into a bunch of even listeners, on click events, and functions
// the flow is essentially a loop with only the option to progress forwards

// #### Start Screen ####
// when the website opens it starts with the start screen div open
// the start screen div has only 1 button to begin the game
// this button calls the start quiz method

// #### Multiple Choice Screen ####
// this leads into the multple choice div being activated
// it has a timer and questions displayed, clicking an answer choice will award time to the timer based on whether or not it is a correct answer
// then it will display the next question, until it runs out of questions, at whic point it will display the score

// #### Final Score Screen ####
// the display score will display the left over time as the score and a textinput box to enter the name of the player
// it also has a confirm box that hides the final score screen and activates the leaderboard div

// #### LeaderBoardScreen ####
// the leader board div shows the scores on a ul
// it also has a button to restart which simply refreshes the page bringing us back to the start screen







// store references to the various divs containing the screens
var startScreen = document.querySelector("#start-screen");
var multipleChoiceScreen = document.querySelector("#multiple-choice");
var scoreScreen = document.querySelector("#score-screen");
var leaderBoardScreen = document.querySelector("#leaderboard-screen");

// store button references
var startButton = document.querySelector(".start-button");
var confirmScoreButton = document.querySelector(".confirm-button");
var restartButton = document.querySelector(".restart-button");

// store various display object references
var timerDisplay = document.querySelector("#time");
var finalScoreDisplay = document.querySelector(".final-score-display");
var nameInput = document.querySelector(".name-input");
var leaderBoardList = document.querySelector(".list-of-scores");

// multiple choice div references
var questionDisplay = document.querySelector(".question-display");
var questionBoxes = document.querySelectorAll(".answer-choice");

// functional variables
var timerActive = false;
var time = 0;
var currentQuestion = 0;

// creates the scoresList local storage if it does not exist yet
if(localStorage.getItem("scoresList") === null){
    localStorage.setItem("scoresList", JSON.stringify([])); 
} 

// displays the time based on time input
function displayTime(time_input){
    timerDisplay.textContent = time_input;
}

// begins the timer and runs it until the bool timer active is false
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

// end the quiz by stopping the timer hiding the multiple choice screen and setting up score screen
function finishQuiz(){
    timerActive = false;
    multipleChoiceScreen.style.display = "none";
    scoreScreen.style.display = "flex";
    finalScoreDisplay.textContent = time;
    
}

// handles the displaying of the question and deciding when to finish quiz
// finishes quiz when the next question to be displayed is undefined, meaning it has run out of questions
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

// begins the quiz by hiding start screen, showing multiple choice screen, starting timer, then displaying the first question
function startQuiz(){
    startScreen.style.display = "none";
    multipleChoiceScreen.style.display = "flex";
    startTimer();
    displayQuestion(questions[currentQuestion]);
}

// comparator used to sort the user scores array
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

// displays scores on the leaderboard screen, first it sorts the scores from local storage, then appends them all as LI to the leaderboard ul
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

// activated when user presses confirm score, hides scores screen, open leaderboard screen
// gets user scores, pushes new score
// displays he scores, then sets the scores to local storage
function confirmScore(){
    scoreScreen.style.display = "none";
    leaderBoardScreen.style.display = "flex";
    currentScores = JSON.parse(localStorage.getItem("scoresList"));
    currentScores.push({player: nameInput.value, score: time});
    displayScores(currentScores);
    currentScores = JSON.stringify(currentScores);
    localStorage.setItem("scoresList", currentScores);
}

// onclick events set to each button
startButton.onclick = startQuiz;
confirmScoreButton.onclick = confirmScore;
// refreshes the page to restart the quiz
restartButton.onclick = function(){location.reload()};

// on click event for each question box, determines if time should be added or removed based on if the correct answer was selected
// then displays the next question
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
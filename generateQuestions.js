// this script creates an array of objects used to store and display the questions
// this function returns an object that holds the question data
// first argument is the question, next 4 are the questions and last is which one is the correct answer
function createQuestionObject(questionInput, choice1Input, choice2Input, choice3Input, choice4Input, correctChoiceInput){
    var correctSet;
    if(correctChoiceInput === 1){
        correctSet = choice1Input;
    } else if(correctChoiceInput === 2){
        correctSet = choice2Input;
    } else if(correctChoiceInput === 3){
        correctSet = choice3Input;
    }else if(correctChoiceInput === 4){
        correctSet = choice4Input;
    }
    return {
        myQuestion: questionInput,
        choice1: choice1Input,
        choice2: choice2Input,
        choice3: choice3Input,
        choice4: choice4Input,
        correctChoice: correctSet
    }
}

// list containing the question objects
var questions = []
// the function is called various times to create object
// questions will be displayed in this order
questions.push(createQuestionObject("Who is considered as the first programmer",
                                    "Ada lovelace",
                                    "Albert einstein",
                                    "Steven hawking",
                                    "Jack black",
                                    1));

questions.push(createQuestionObject("Where does the programming term bug originate from?",
                                    "As an acronym",
                                    "as a figure of speech",
                                    "As real bug inside computer",
                                    "Named after someone",
                                    3));
                                    
questions.push(createQuestionObject("What was the first computer game ever made",
                                    "Tetris",
                                    "SpaceWars",
                                    "Pong",
                                    "Fortnite",
                                    2));


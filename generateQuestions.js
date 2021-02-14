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
questions.push(createQuestionObject("Who is considered as the first programmer",
                                    "Ada lovelace",
                                    "Albert einstein",
                                    "Steven hawking",
                                    "Jack black",
                                    1));



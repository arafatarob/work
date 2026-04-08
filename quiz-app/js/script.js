const startBtn = document.querySelector('.start_button');
const next_button = document.querySelector('.next_button');
const quiz_app = document.querySelector('.quiz_app');
const result_box = document.querySelector('.result_box');
const qus_text = document.querySelector('.qus_text');
const options = document.querySelector('.options');
const footer_left = document.querySelector('.footer_left');


const totalQuestion = document.querySelector('#totalQuestion');
const rightAnswer = document.querySelector("#rightAnswer");
const wrongAnswer = document.querySelector("#wrongAnswer");
const percent = document.querySelector("#percent");
const againQuiz = document.querySelector("#againQuiz");
const exit = document.querySelector("#exit");

startBtn.addEventListener('click', function(){
    quiz_app.classList.remove('inactive');
    this.classList.add('inactive');
});



var questionIndex = 0;

var right_answers = 0;
var wrong_answers = 0;

totalQuestion.innerHTML = questions.length;

showQuestions(questionIndex);

function showQuestions(q_index){
    qus_text.innerHTML = questions[q_index].num + ". " + questions[q_index].question;

    footer_left.innerText = `${questions[q_index].num} of ${questions.length} questions`;

    var option_statement = "";

    for(var i =0; i < questions.length - 1; i++){
        option_statement += `<div class="option">${questions[q_index].options[i]}</div>`;
    }

    options.innerHTML = option_statement;
    
    const optionBox = document.querySelectorAll('.option');

    for(var j = 0; j < optionBox.length; j++){

        optionBox[j].setAttribute('onclick', 'userAnswer(this)')
        
    }
    
    next_button.classList.add('inactive');

}

function userAnswer(answer){
    let userAnswer = answer.innerText;
    const optionBox2 = document.querySelectorAll('.option');

    let correctAnswer = questions[questionIndex].answer;
    next_button.classList.remove('inactive');

    if(userAnswer == correctAnswer){
        console.log(
            "Correct Answer"
        )
        answer.classList.add('correct');
        right_answers++;
    }else{
        console.log('wrong answer');
        answer.classList.add('incorrect');
        wrong_answers++;

        for(var i = 0; i < optionBox2.length; i++){
            if(optionBox2[i].innerText == correctAnswer){
                optionBox2[i].classList.add('correct');
            }
        }
    }

    for(let j = 0; j < optionBox2.length; j++){

        optionBox2[j].classList.add('disabled');

    }
}



next_button.onclick=()=>{
    questionIndex++;
    if(questions.length>questionIndex){
        showQuestions(questionIndex);
    }else{
        console.log('Question Complete');
        quiz_app.classList.add('inactive');
        result_box.classList.remove('inactive');

        rightAnswer.innerText = right_answers;
        wrongAnswer.innerText = wrong_answers;
        percent.innerText = (right_answers * 100) / questions.length + "%";
    }
    if(questions.length - 1 == questionIndex){
        next_button.innerText = 'finished';
    }
}

againQuiz.onclick=()=>{
    quiz_app.classList.remove('inactive');
    result_box.classList.add('inactive');
    reset();
}

exit.onclick=()=>{
    quiz_app.classList.add('inactive');
    startBtn.classList.remove('inactive');
    result_box.classList.add('inactive');
    reset();
    
}

function reset(){
    questionIndex = 0;
    right_answers = 0;
    wrong_answers = 0;
    showQuestions(questionIndex);
}





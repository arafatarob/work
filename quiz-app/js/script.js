const startBtn = document.querySelector('.start_button');
const next_button = document.querySelector('.next_button');
const quiz_app = document.querySelector('.quiz_app');
const result_box = document.querySelector('.result_box');
const result_boxh2 = document.querySelector('.result_box h2');
const qus_text = document.querySelector('.qus_text');
const options = document.querySelector('.options');
const footer_left = document.querySelector('.footer_left');


const totalQuestion = document.querySelector('#totalQuestion');
const rightAnswer = document.querySelector("#rightAnswer");
const wrongAnswer = document.querySelector("#wrongAnswer");
const percent = document.querySelector("#percent");
const againQuiz = document.querySelector("#againQuiz");
const exit = document.querySelector("#exit");


const minit = document.querySelector('#minute');
const second = document.querySelector('#seconds');
const totalT = document.querySelector('#totalTime');

// start btn
var startTime;
var setTimer;
startBtn.addEventListener('click', function(){
    quiz_app.classList.remove('inactive');
    this.classList.add('inactive');

    startTime = new Date();
    onTimer();
});


// quiz index
var questionIndex = 0;

var right_answers = 0;
var wrong_answers = 0;

totalQuestion.innerHTML = questions.length;

showQuestions(questionIndex);

function showQuestions(q_index){
    qus_text.innerHTML = questions[q_index].num + ". " + questions[q_index].question;

    footer_left.innerText = `${questions[q_index].num} of ${questions.length} questions`;

    var option_statement = "";

    for(var i =0; i < questions[q_index].options.length; i++){
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
        clearInterval(setTimer);
        console.log('Question Complete');
        quiz_app.classList.add('inactive');
        result_box.classList.remove('inactive');

        rightAnswer.innerText = right_answers;
        wrongAnswer.innerText = wrong_answers;
        percent.innerText = (right_answers * 100) / questions.length + "%";

        const endTime = new Date();

        const finalTime = endTime - startTime;

    let totalSeconds = Math.floor(finalTime / 1000);
    let minutesSpent = Math.floor(totalSeconds / 60);
    let secondsSpent = totalSeconds % 60;

    let totalTime = (minutesSpent < 10 ? "0" + minutesSpent : minutesSpent) + ":" + 
                (secondsSpent < 10 ? "0" + secondsSpent : secondsSpent);

    totalT.innerHTML = totalTime;
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
    clearInterval(setTimer);
    questionIndex = 0;
    right_answers = 0;
    wrong_answers = 0;
    next_button.innerText = "Next Question";
    showQuestions(questionIndex);
}


// timer

    
function onTimer(){
let timer = 600;
clearInterval(setTimer);
    setTimer = setInterval(function(){
        timer--;
        let m = Math.floor(timer / 60);
        let s = timer % 60;

        minit.innerHTML = (m < 10 ? "0" + m : m);
        second.innerHTML = (s < 10 ? "0" + s : s);

        if(timer <= 0){
            clearInterval(setTimer);
            minit.innerHTML = "00";
            second.innerHTML = "00";
            quiz_app.classList.add('inactive');
            startBtn.classList.add('inactive');
            result_box.classList.remove('inactive');

        }

    }, 1000);
}


const timerText = document.getElementById('totalTime');




const toggle = document.querySelector('#toggle');
const slider = document.querySelector('.slider');
const body = document.body;

const theme = localStorage.getItem('theme');

if(theme === 'dark'){
    body.classList.add('dark');
    quiz_app.classList.add('dark');
    toggle.checked = true;
}

toggle.addEventListener('change', function(){
    if(this.checked){
        body.classList.add('dark');
        quiz_app.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }else{
        body.classList.remove('dark');
        quiz_app.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});






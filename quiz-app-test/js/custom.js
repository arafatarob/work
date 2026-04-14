const question_text = document.querySelector('.question_text');
const option_text = document.querySelector('.options');
const nextBtn = document.querySelector('#nextBtn');
const q_index = document.querySelector('#q_index');
const startBtn = document.querySelector('#startBtn');
const quiz_container = document.querySelector('.quiz_container');
const quiz_result = document.querySelector('.quiz_result');
const nameEl = document.querySelector('#name');
const input = document.querySelector('.input');
const date = document.querySelector('.date');
const output = document.querySelector('#inputName');
const quiz = document.querySelector('#quiz');
const exit = document.querySelector('#exit');
const totalQuestion = document.querySelector('#totalQuestion');
const right = document.querySelector('#right');
const wrong = document.querySelector('#wrong');
const percentage = document.querySelector('#percentage');
const q_number = document.querySelector('#q_number');
const toggle = document.querySelector('#toggle');
const time = document.querySelector('#time');
const timeToday = document.querySelector('.timeToday');
const body = document.body;

const minit = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');



let questionIndex = 0;
let rightAnswers = 0;
let wrongAnswers = 0;
var startTime;
var setTimer;

questonbox(questionIndex);

startBtn.addEventListener('click', function(){
    if(nameEl.value === ''){
        alert('Please enter your name');
    }else{
        quiz_container.classList.remove('inactive');
        this.classList.add('inactive');
        input.classList.add('inactive');
    }

    output.innerHTML = nameEl.value;
    startTime = new Date();
    onTimer();
});

function timeDate(){
    const today = new Date();

const y = today.getFullYear();
const m = today.getMonth() + 1;
const d = today.getDate();
const t = today.getHours();
const min = today.getMinutes();
const sec = today.getSeconds();



let         dateNow   =   (y < 10 ? "0" + y : y);
            months    =     (m < 10 ? "0" + m : m);
            days      =     (d < 10 ? "0" + d : d);
            timeIs      =     (t < 10 ? "0" + t : t);

            let ampm = t >= 12 ? "PM" : "AM";

date.innerText = days + "-" + months + "-" + dateNow;
timeToday.innerText = timeIs + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec) + " " + ampm;
}

setInterval(timeDate, 1000);

timeDate();



function questonbox(index){
    question_text.innerHTML = questions[index].num + ". " + questions[index].question;
    q_index.innerHTML = questions[index].num;
    q_number.innerHTML = questions.length;
    totalQuestion.innerHTML = questions.length;

    var option_statement = "";

    for(var i = 0; i < questions[index].options.length; i++){
        option_statement += 
            `<div class="option">
                ${questions[index].options[i]}
            </div>`;
    }

    option_text.innerHTML = option_statement;

    const optionBox = document.querySelectorAll('.option');

    for(var j = 0; j < optionBox.length; j++){
        optionBox[j].setAttribute('onclick', 'userAnswer(this)');
    }

    nextBtn.classList.add('inactive');

}

function userAnswer(answer){
    let userAnswer = answer.innerText;

    const optionBox2 = document.querySelectorAll('.option');

    let correctAnswer = questions[questionIndex].answer;
    nextBtn.classList.remove('inactive');

    if(userAnswer == correctAnswer){
        console.log('correct answer')
        answer.classList.add('correct');
        rightAnswers++;
    }else{
        console.log('wrong answer')
        answer.classList.add('incorrect');
        wrongAnswers++;

        for(var i = 0; i < optionBox2.length; i++){
            if(optionBox2[i].innerText == correctAnswer){
                optionBox2[i].classList.add('correct');
            }
        }

    }

    for(var j = 0; j < optionBox2.length; j++){
        optionBox2[j].classList.add('disabled');
    }

}

nextBtn.addEventListener('click', function(){
    questionIndex++;
    if(questions.length>questionIndex){
        questonbox(questionIndex);
    }else{
        clearInterval(setTimer);
        console.log('question complete');
        quiz_result.classList.remove('inactive');
        quiz_container.classList.add('inactive');

        totalQuestion.innerHTML = questions.length;
        right.innerHTML = rightAnswers;
        wrong.innerHTML = wrongAnswers;
        percentage.innerHTML = (rightAnswers * 100) / questions.length + "%";

        const endTime = new Date();

        const finalTime = endTime - startTime;

        let totalSpends = Math.floor(finalTime / 1000);
        let minutesSpent = Math.floor(totalSpends / 60);
        let secondSpends = totalSpends % 60;

        let totalTimes = (minutesSpent < 10 ? '0' + minutesSpent : minutesSpent) + ":" +
                            (secondSpends < 10 ? '0' + secondSpends : secondSpends);

        time.innerHTML = totalTimes;

    }
    if(questions.length -1  == questionIndex){
        nextBtn.innerHTML = 'finished';
    }
});

quiz.addEventListener('click', function(){
    quiz_container.classList.remove('inactive');
    quiz_result.classList.add('inactive');
    startBtn.classList.add('inactive');
    reset();
});

exit.onclick =()=>{
    quiz_container.classList.add('inactive');
    quiz_result.classList.add('inactive');
    startBtn.classList.remove('inactive');
    reset();
}

function reset(){
    clearInterval(setTimer);
    questionIndex = 0;
    rightAnswers = 0;
    wrongAnswers = 0;
    nextBtn.innerText = 'Next Question';
    questonbox(questionIndex);
}

const theme = localStorage.getItem('theme');

if(theme == 'dark'){
    body.classList.toggle('dark');
    toggle.checked = true;
}

toggle.addEventListener('change', function(){
    if(this.checked){
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }else{
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});


function onTimer(){
        let quizTime = 1500;
        clearInterval(setTimer);
    setTimer = setInterval(function(){
        quizTime--;
        let m = Math.floor(quizTime / 60);
        let s = quizTime % 60;

        minit.innerHTML = (m < 10 ? '0' + m : m);
        seconds.innerHTML = (s < 10 ? '0' + s : s);

        if(quizTime <= 0){
            clearInterval(setTimer);
            minit.innerHTML = "00";
            seconds.innerHTML = "00";
            quiz_container.classList.add('inactive');
            quiz_result.classList.remove('inactive');
        }
    }, 1000);
}
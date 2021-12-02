let questions = [
    {
        question: 'The number of spots on a ladybird (or ladybug) indicates its age.',
        choices: ['True', 'False'],
        correctAnswer: 1
    },
    {
        question: 'All ladybirds have spots.',
        choices: ['True', 'False'],
        correctAnswer: 1
    },
    {
        question: 'Which of the following was a legendary Wild West outlaw?',
        choices: ['Buffalo Bill', 'Sundance Kid', 'Billy the Kid', 'All of the above'],
        correctAnswer: 3
    },
    {
        question: 'The star or disc-shaped object attached to a cowboy’s heel is called a:',
        choices: ['Spur', 'Bracket', 'Peg', 'Arch'],
        correctAnswer: 0
    },
    {
        question: 'Butterflies live all around the world except in:',
        choices: ['North Pole', 'Sand dunes', 'Antarctica', 'Marine Salt Marshes'],
        correctAnswer: 2
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let quizOver = false;

window.addEventListener('DOMContentLoaded', function(e){
    displayCurrentQuestion();

    let quizMessage = document.querySelector('.quizMessage');

        quizMessage.style.display = 'none';

    document.querySelector('.nextButton').addEventListener('click', function(){
        
        if(!quizOver){
            let radioBtnsChecked = document.querySelector('input[type=radio]:checked');

            if (radioBtnsChecked === null){
                quizMessage.innerText = 'Please select an answer';
                quizMessage.style.display = 'block';
            } else {
                console.log(radioBtnsChecked.value);
                quizMessage.style.display = 'none';
                if (parseInt(radioBtnsChecked.value) === questions[currentQuestion].correctAnswer){
                    correctAnswers++;
                }

                currentQuestion++;

                if (currentQuestion < questions.length){
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    document.querySelector('.nextButton').innerText = 'Play Again?';
                    quizOver = true;
                 }
                }   
        } else {
            quizOver = false;
            document.querySelector('.nextButton').innerText = 'Next Question';
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
});

function displayCurrentQuestion(){
    console.log('In display current Questions');

    let question = questions[currentQuestion].question;
    let questionClass = document.querySelector('.quizContainer > .question');
    let choiceList = document.querySelector('.quizContainer > .choiceList');
    let numChoices = questions[currentQuestion].choices.length;

    questionClass.innerText = question;

    choiceList.innerHTML = '';

    let choice;
    for (i = 0; i < numChoices; i++){
        choice = questions[currentQuestion].choices[i];
        let li = document.createElement('li');
            li.innerHTML = '<li><input type="radio" value="' + i + '" name="dynradio" />' + choice + '</li>'
        choiceList.appendChild(li);

    }
}

function resetQuiz(){
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore(){
    document.querySelector('.quizContainer > .result').innerText = 'You scored: ' + correctAnswers + ' out of ' + questions.length;
    document.querySelector('.quizContainer > .result').style.display = 'block';
}

function hideScore(){
    document.querySelector('.result').style.display = 'none';
}
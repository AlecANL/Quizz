'use strict';

import { countriesQuestions } from './questions.js';

const $btnNextQuestion = document.getElementById('btnNext'),
  $listAnswers = document.getElementById('answers'),
  $answers = [...document.querySelectorAll('.question-item')],
  $nameQuestion = document.querySelector('.question-name'),
  $windowWinner = document.querySelector('.window-winner'),
  $score = document.getElementById('score'),
  $btnRestart = document.getElementById('restart');

$btnNextQuestion.style.display = 'none';

let answer = undefined;
let currentQuestion = 0;
const correctAnswers = [];
let isSelectedAnswer = true;

function initQuiz() {
  if (!countriesQuestions[currentQuestion]) {
    $score.textContent = correctAnswers.length;
    $windowWinner.classList.remove('disabled');
    return;
  }
  const question = countriesQuestions[currentQuestion];
  $nameQuestion.textContent = question.getQuestionsName();
  $answers.forEach((a, i) => {
    a.textContent = question.getAllAnswers()[i];
  });
}

function verifyAnswer(e) {
  if (e.target.classList.contains('question-item') && isSelectedAnswer) {
    isSelectedAnswer = false;
    $btnNextQuestion.style.display = 'block';
    answer = e.target.textContent.toLowerCase();
    if (answer !== countriesQuestions[currentQuestion].getCorrectQuestion()) {
      e.target.classList.add('error');
      isCorrectAnswer(
        $answers,
        countriesQuestions[currentQuestion].getCorrectQuestion()
      );
      return;
    }
    e.target.classList.add('success');
  }
}

/**
 * This function get element as contain correct answer, and add class success.
 * @param arrElements
 * @param correctAnswer
 *
 **/
function isCorrectAnswer(arrElements, correctAnswer) {
  const isCorrect = arrElements.filter(el => el.textContent === correctAnswer);
  isCorrect[0].classList.add('success');
}

function nextQuestion() {
  if (!answer) {
    console.log('whoops a wrong was happend');
    return;
  }
  if (answer === countriesQuestions[currentQuestion].getCorrectQuestion()) {
    correctAnswers.push(answer);
  }
  $answers.forEach(el => {
    if (el.classList.contains('error') || el.classList.contains('success')) {
      el.classList.remove('error') || el.classList.remove('success');
    }
  });

  currentQuestion++;
  initQuiz();
  answer = undefined;
  isSelectedAnswer = true;
  $btnNextQuestion.style.display = 'none';
}

function restartQuizz() {
  $windowWinner.classList.add('disabled');
  answer = undefined;
  currentQuestion = 0;
  isSelectedAnswer = true;
  initQuiz();
  while (correctAnswers.length > 0) {
    correctAnswers.pop();
  }
}
initQuiz();
$btnNextQuestion.addEventListener('click', nextQuestion);
$listAnswers.addEventListener('click', verifyAnswer);
$btnRestart.addEventListener('click', restartQuizz);

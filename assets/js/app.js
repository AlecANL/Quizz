'use strict';
import { questions } from './questions.js';

const $btnNextQuestion = document.getElementById('btnNext'),
  $listAnswers = document.getElementById('answers'),
  $answers = [...document.querySelectorAll('.question-item')],
  $nameQuestion = document.querySelector('.question-name'),
  $windowWinner = document.querySelector('.window-winner'),
  $score = document.getElementById('score'),
  $btnRestart = document.getElementById('restart'),
  $logo = document.querySelector('article img');
let answer, isSelectedAnswer;
let currentScore = 0;
let currentQuestion = 0;

async function initQuiz() {
  const data = await questions;
  const question = data[currentQuestion];
  if (question) {
    const options = question.options;
    $nameQuestion.textContent = question.question;
    $answers.forEach((el, index) => {
      el.setAttribute('data-name', options[index].name.toLowerCase());
      el.textContent = options[index].name;
    });
  }
}

async function verifyAnswer(e) {
  const data = await questions;
  if (e.target.classList.contains('question-item') && isSelectedAnswer) {
    isSelectedAnswer = false;
    $btnNextQuestion.style.display = 'block';
    answer = e.target.dataset.name;
    const correctAnswer = data[currentQuestion].correctAnswer.toLowerCase();
    if (answer !== correctAnswer) {
      e.target.classList.add('error');
      isCorrectAnswer(
        $answers,
        data[currentQuestion].correctAnswer.toLowerCase()
      );
      return;
    }
    e.target.classList.add('success');
  }
}

/**
 * @param arrElements
 * @param correctAnswer
 *
 * This function get all elements with an possible option to quizz and correct answer,
 *  ans review all elements on data atrribute if is equal to @param correctAnswer
 *
 **/
function isCorrectAnswer(arrElements, correctAnswer) {
  const isCorrect = arrElements.find(el => el.dataset.name === correctAnswer);
  isCorrect.classList.add('success');
}

async function nextQuestion() {
  const data = await questions;
  if (!answer) {
    alert('please enter a answer');
    console.log('whoops a wrong was happend');
    return;
  }
  if (answer === data[currentQuestion].correctAnswer.toLowerCase()) {
    currentScore++;
  }
  $answers.forEach(el => {
    if (el.classList.contains('error') || el.classList.contains('success')) {
      el.classList.remove('error') || el.classList.remove('success');
    }
  });

  currentQuestion++;
  initQuiz();
  initalState();
  if (currentQuestion >= data.length) {
    $windowWinner.classList.remove('disabled');
    $logo.classList.add('disabled');
    $score.textContent = currentScore;
  }
}

function initalState() {
  answer = undefined;
  isSelectedAnswer = true;
  $btnNextQuestion.style.display = 'none';
}

function restartQuizz() {
  $windowWinner.classList.add('disabled');
  $logo.classList.remove('disabled');
  answer = undefined;
  currentQuestion = 0;
  currentScore = 0;
  isSelectedAnswer = true;
  initQuiz();
  window.location.reload();
}
initQuiz();
initalState();
$btnNextQuestion.addEventListener('click', nextQuestion);
$listAnswers.addEventListener('click', verifyAnswer);
$btnRestart.addEventListener('click', restartQuizz);

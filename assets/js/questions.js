class GenerateQuestions {
  #questionsName;
  #correctAnswer;
  #answers;

  constructor(questionName, correctAnswer, answers) {
    this.#questionsName = questionName;
    this.#correctAnswer = correctAnswer;
    this.#answers = answers;
  }

  getQuestionsName() {
    return this.#questionsName;
  }
  getCorrectQuestion() {
    return this.#correctAnswer;
  }
  getAllAnswers() {
    return this.#answers;
  }
}

const a = new GenerateQuestions('Kuala Lumpur is the capital of?', 'malaysia', [
  'vietname',
  'malaysia',
  'sweden',
  'austria',
]);

const b = new GenerateQuestions('Madrid is the capital of?', 'spain', [
  'spain',
  'malaysia',
  'vietnam',
  'washintog',
]);

const c = new GenerateQuestions('berlin is the capital of?', 'germany', [
  'germany',
  'spain',
  'rusia',
  'england',
]);

const d = new GenerateQuestions(
  'washington is the capital of?',
  'united states',
  ['berlin', 'malaysia', 'vietnam', 'united states']
);

const e = new GenerateQuestions('Sidney is the capital of?', 'australia', [
  'kawai',
  'australia',
  'united states',
  'germany',
]);

export const countriesQuestions = [a, b, c, d, e];

const api = 'https://restcountries.eu/rest/v2/all';

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

/**
 *
 * @param {*} countries
 * @returns country,
 * this function receive all countries and return only one country
 */
function getRandomCountry(countries) {
  const random = Math.floor(Math.random() * countries.length);
  return {
    name: countries[random].name,
    capital: countries[random].capital,
  };
}

/**
 *
 * @param {*} country
 * @param {*} countries
 * @returns {*} randomCountries
 *
 * this function get currentQuestion and all questions,
 * clea all questios with slice method and loop arr and build posibles answers
 */
function getRandomCountries(country, countries) {
  const random = Math.floor(Math.random() * (countries.length - 50));
  const randomCountries = countries.slice(random, random + 3);
  return randomCountries.map(el => {
    // add tag isCorrect a posibble answer
    country.isCorrect = true;
    return {
      name: el.name,
      capital: el.capital,
      isCorrect: false,
    };
  });
  /**
   * return randomCountries.filter(el => {
   * return el.name !== country.name
   * })
   *
   */
}

// Change position into arr with posible options
function moveRandomOptions(arr) {
  let currentIdx = arr.length,
    tempValue,
    randomIdx;

  while (0 !== +currentIdx) {
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx -= 1;

    tempValue = arr[currentIdx];
    arr[currentIdx] = arr[randomIdx];
    arr[randomIdx] = tempValue;
  }
  return arr;
}

// build object to contain question, correctQuestion an options
// options contain all posibles answers and correct
async function buildQuestion() {
  try {
    const countries = await getData(api);
    const country = getRandomCountry(countries);

    const quizz = {
      question: `${country.capital} is capital of`,
      correctAnswer: country.name,
      options: moveRandomOptions([
        country,
        ...getRandomCountries(country, countries),
      ]),
    };
    return quizz;
  } catch (err) {
    console.warn(err);
  }
}

// this function generate all questions to populate quizz
async function generateQuestions(limit = 5) {
  const questions = [];
  for (let i = 0; i < limit; i++) {
    const q = await buildQuestion();
    questions.push(q);
  }
  return questions;
}

const questions = generateQuestions();

export { questions };

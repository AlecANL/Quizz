const api = 'https://restcountries.eu/rest/v2/all';

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function getRandomCountry(countries) {
  const random = Math.floor(Math.random() * countries.length);
  return {
    name: countries[random].name,
    capital: countries[random].capital,
  };
}

function getRandomCountries(country, countries) {
  const random = Math.floor(Math.random() * (countries.length - 50));
  const randomCountries = countries.slice(random, random + 3);
  return randomCountries.filter(el => {
    return el.name !== country.name;
  });
}
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
    console.log(quizz);
  } catch (err) {
    console.warn(err);
  }
}
buildQuestion();
buildQuestion();
buildQuestion();
buildQuestion();
buildQuestion();

// async function cleanData() {
//   const data = await getData(api);
//   const random = Math.floor(Math.random() * 200 + 0);
//   const countries = data.slice(random, random + 5);
//   return countries;
// }

// async function buildQuestions() {
//   const countries = await cleanData();

//   const questions = countries.map((country, index) => {
//     const orderedOptions = countries.map(c => {
//       if (c.name === countries[index].name) {
//         return {
//           capital: country.capital,
//           isCorrect: true,
//         };
//       } else {
//         return {
//           capital: c.capital,
//           isCorrect: false,
//         };
//       }
//     });
//     const random = Math.floor(Math.random() * countries.length + 0);
//     const options = moveRandomOptions(orderedOptions, 0, random);

//     return {
//       name: country.name,
//       options,
//     };
//   });
//   return questions;
// }

// function moveRandomOptions(arr, fromIndex, toIndex) {
//   const element = arr[fromIndex];
//   arr.splice(fromIndex, 1);
//   arr.splice(toIndex, 0, element);
//   return arr;
// }

// buildQuestions();

const api = 'https://restcountries.eu/rest/v2/all';

async function getDataByApi(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function cleanDataByApi(url) {
  const data = await getDataByApi(url);
  return data.map(el => {
    return {
      name: el.name,
      capital: el.capital,
      answers: [],
      hasAnswerCorrect: el.capital,
    };
  });
}

async function returnCountriesByLimit(limit = 5) {
  const data = await cleanDataByApi(api);
  const obj = [];
  for (let i = 0; i < limit; i++) {
    const random = Math.floor(Math.random() * 250 + 0);
    obj.push(data[random]);
  }
  return obj;
}
returnCountriesByLimit().then(data => console.log(data));

import { getData } from './api';

export const getCharacters = async() => {
  let result = await getData('people/?page=1').then(response => response);
  let allCharacters = [...result.results];

  while(result.next !== null) {
    const nextPage = result.next.slice(21);
    result = await getData(nextPage).then(result => result);
    allCharacters = [
      ...allCharacters,
      ...result.results
    ]
  }
  return allCharacters;
}


export const getHomeWorld = async(id) => {
  const endPoint = id.slice(21);
  const result = await getData(endPoint);

  return result;
}


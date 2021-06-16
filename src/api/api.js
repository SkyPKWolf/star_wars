export const BASE_URL = 'https://swapi.dev/api/';

export const getData = async(endPoint) => {
  const response = await fetch(`${BASE_URL}${endPoint}`);
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const result = await response.json();

  return result;
};

export const getPlanets = async(url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const result = await response.json();
  
  return result;
};
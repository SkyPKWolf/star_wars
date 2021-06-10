import React, { useEffect, useState } from 'react';

import { getCharacters, getHomeWorld } from '../../api/characters';

import './CharactersList.css'
export const CharactersList = () => {
  const [characters, setCharacters] = useState([]);

  const loadCharacters = async() => {
    const charactersFromServer = await getCharacters();

    setCharacters(charactersFromServer);
  };


  useEffect(() => {
    loadCharacters();
  }, []);



  return (
    <div className="CharactersList">
      <h2>Characters:</h2>

      <ul className="CharactersList__list">
        {characters.map(character => {
          return (
          <li
            key={character.url}
            className="CharactersList__item"
          >
            <div>
              {`Name: ${character.name}`}
            </div>
            <div>
              {`Gender: ${character.gender}`}
            </div>
          </li>
        )})}
      </ul>
    </div>
  );
};

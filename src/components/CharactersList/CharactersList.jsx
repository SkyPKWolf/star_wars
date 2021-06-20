import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';

import { getCharacters } from '../../api/characters';
import { getPlanets } from '../../api/api';

import { DetailsCharacters } from '../DetailsCharacter/DetailsCharacters';
import { LoaderExampleText } from '../Loader';

import 'semantic-ui-css/semantic.min.css';
import './CharactersList.css';

export const CharactersList = ({match}) => {
  const [characters, setCharacters] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [preparedCharacters, setPreparedCharacters] = useState([]);
  const [loader, setLoader] = useState(false);

  const characterName = match.params.characterName;

  const loadCharacters = async() => {
    setLoader(true);
    const charactersFromServer = await getCharacters();

    setCharacters(charactersFromServer);
    setLoader(false);
  };

  const UpdateCharacters = async() => {
    setLoader(true);
    const updateCharacters = await Promise.all(characters
      .map(async character => {
        const homeworld = await getPlanets(character.homeworld);
        return {
          ...character, 
          homeworld
        };    
      }));
    setPreparedCharacters(updateCharacters);
    setLoader(false);
  };


  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {
    UpdateCharacters();
  }, [characters]);

  return (
    <div className="CharactersList">
      <input
        type="text"
        className="search"
        placeholder="Input character name"
        value={searchName}
        onChange={({target}) => setSearchName(target.value)}
      >
      </input>
      <h2 className="CharactersList__title">Characters:</h2>
      {loader 
        ? <LoaderExampleText />
        : (
          <ul className="CharactersList__list">
            {preparedCharacters.filter(character => character.name.includes(searchName))
              .map(({name, gender, homeworld, url}) => {
                return (
                <li
                  key={url}
                  className="CharactersList__item"
                >
                  <div>
                    {`Name: ${name}`}
                  </div>
                  <div>
                    {`Gender: ${gender}`}
                  </div>
                  <div>
                    {`Home World: ${homeworld.name}`}
                  </div>
                  <Link
                    className="btn"
                    to={`/characters/${name}`}
                    name={name}
                  >
                    Show Details
                  </Link>
                </li>
            )})}
          </ul>
        )}
      <Route path={`/characters/${characterName}`}>
        <DetailsCharacters
          selectedCharacter={preparedCharacters.find(character => character.name === characterName)}
        />
      </Route>

    </div>
  );
};
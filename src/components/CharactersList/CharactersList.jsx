import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';

import { getCharacters } from '../../api/characters';
import { getInfo } from '../../api/api';

import { DetailsCharacters } from '../DetailsCharacter/DetailsCharacters';
import { LoaderExampleText } from '../Loader';

import 'semantic-ui-css/semantic.min.css';
import './CharactersList.css';

export const CharactersList = ({match}) => {
  const useLocalStorage = (key, initialValue) => {
    const [characters, setCharacters] = useState (
      JSON.parse(localStorage.getItem(key)) || initialValue,
    );

    const save = (value) => {
      setCharacters(value);
      localStorage.setItem(key, JSON.stringify(value));
    };

    return [ characters, save ]
  }

  const [searchName, setSearchName] = useState('');
  const [preparedCharacters, setPreparedCharacters] = useLocalStorage('preparedCharacters', []);
  const [characters, setCharacters] = useLocalStorage('characters', []);
  const [loader, setLoader] = useState(false);
  const characterName = match.params.characterName;

  const loadCharacters = async() => {
    const charactersFromServer = await getCharacters();

    setCharacters(charactersFromServer);
  };

  const UpdateCharacters = async() => {
    if(preparedCharacters.length === 0) {
      setLoader(true);
      const updateCharacters = await Promise.all(characters
        .map(async character => {
          const homeworld = await getInfo(character.homeworld);
          return {
            ...character, 
            homeworld
          };    
        }));
      setPreparedCharacters(updateCharacters);
      setLoader(false);
    }
  };


  useEffect(() => {
    if(characters.length === 0) {
      loadCharacters();
    }
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
            {preparedCharacters.filter(character => 
              (character.name.toLowerCase()).includes(searchName.toLowerCase()))
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

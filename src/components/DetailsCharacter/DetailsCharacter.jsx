import React, { useEffect, useState } from 'react';

import { getCharacters } from '../../api/characters';


export const DetailsCharacters = () => {
  const [characters, setCharacters] = useState([]);

  const loadCharacter = async() => {
    const characterFromServer = await getCharacters();

    setCharacters(characterFromServer);
  };

  useEffect(() => {
    loadCharacter();
  }, []);

  return (
    <div className="DetailsCharacters">
      <h2>Details:</h2>
      <div>
        
      </div>
    </div>
  );
};

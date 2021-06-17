import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getPlanets } from '../../api/api';
import PropTypes from 'prop-types';

import './DetailsCharacters.css'

export const DetailsCharacters = ({ 
  selectedCharacter, 
  clearSelectCharacter, 
  correctedUrl
}) => {
  
  const [character, setCharacter] = useState([]);
  
  const UpdateCharacter = async() => {
    const films = await Promise.all(selectedCharacter.films
      .map(async film => {
        const objFilms = await getPlanets(correctedUrl(film));
        return {
          ...objFilms
        };    
      }));
    const vehicles = await Promise.all(selectedCharacter.vehicles
      .map(async vehicle => {
        const objVehicles = await getPlanets(correctedUrl(vehicle));
        return {
          ...objVehicles
        };    
      }));
    
    const updatedCharacter = {
      ...selectedCharacter,
      films,
      vehicles
    }
    setCharacter(updatedCharacter);
  };



  useEffect(() => {
    if(selectedCharacter !== '') {
      UpdateCharacter();
    }
  }, [selectedCharacter]);


  return (
      <div className="DetailsCharacters">
        <h2>Details:</h2>
        <Link
          className="btn btn__close"
          type="button"
          onClick={clearSelectCharacter}
          to="/star_wars/characters"
        >
          X
        </Link>
        {character !== [] 
          && (
            <>
              <div className="DetailsCharacters__info">
              {`Name: ${selectedCharacter.name}`}
              </div>
              <div className="DetailsCharacters__info">
                {`Height: ${selectedCharacter.height}`}
              </div>
              <div className="DetailsCharacters__info">
                {`Mass: ${selectedCharacter.mass}`}
              </div>
              <div className="DetailsCharacters__info">
                {`Hair color: ${selectedCharacter.hair_color}`}
              </div>
              <div className="DetailsCharacters__info">
                {`Skin color: ${selectedCharacter.skin_color}`}
              </div>
              <div className="DetailsCharacters__info">
                {`Eye color: ${selectedCharacter.eye_color}`}
              </div>
              <div className="DetailsCharacters__info">
                {`Birth year: ${selectedCharacter.birth_year}`}
              </div>
              <div className="DetailsCharacters__info">
                {`Gender: ${selectedCharacter.gender}`}
              </div>
              <div className="DetailsCharacters__info">
                {`Home World: ${selectedCharacter.homeworld.name}`}
              </div>
              <div className="DetailsCharacters__info">
                {`Films: `}
                {character.films 
                  ? 
                    character.films.map(film => (
                      <div key={film.title}> 
                        {`${film.title}`}
                      </div>
                    ))
                  
                  : (
                    <div>
                      {`Loading`}
                    </div>
                  )}
              </div>
              <div className="DetailsCharacters__info">
                {selectedCharacter.vehicles.length > 0 && <span>Vehicles:</span>}
                {character.vehicles
                  ? (
                    character.vehicles.map(vehicle => {
                      return (
                        <div key={vehicle.name}> 
                          {`${vehicle.name} - ${vehicle.model}`}
                        </div>
                      )
                    })
                  )
                  : (
                    <span>
                      {`Loading`}
                    </span>
                  ) }
              </div>
            </>
        )}
      </div>
    );
};

DetailsCharacters.propTypes = {
  selectedCharacter: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  clearSelectCharacter: PropTypes.func.isRequired,
  correctedUrl: PropTypes.func.isRequired,
}
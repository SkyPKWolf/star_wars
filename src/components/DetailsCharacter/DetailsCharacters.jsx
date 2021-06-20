import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getPlanets } from '../../api/api';
import PropTypes from 'prop-types';

import './DetailsCharacters.css'

export const DetailsCharacters = ({ 
  selectedCharacter, 
}) => {
  
  const [character, setCharacter] = useState([]);
  
  const UpdateCharacter = async() => {
    if(selectedCharacter !== []) {
      const films = await Promise.all(selectedCharacter.films
        .map(async film => {
          const objFilms = await getPlanets(film);
          return {
            ...objFilms
          };    
        }));
      const vehicles = await Promise.all(selectedCharacter.vehicles
        .map(async vehicle => {
          const objVehicles = await getPlanets(vehicle);
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
    }
  };



  useEffect(() => {
    console.log(selectedCharacter);
    if(selectedCharacter) {
      UpdateCharacter();
    }
  }, [selectedCharacter]);


  return (
    <div className="DetailsCharacters">
              <h2>Details:</h2>
              <Link
                className="btn btn__close"
                type="button"
                to="/characters"
              >
                X
              </Link>
      {character.name ? (
          <>
            <div className="DetailsCharacters__info">
              {`Name: ${character.name}`}
            </div>
            <div className="DetailsCharacters__info">
              {`Height: ${character.height}`}
            </div>
            <div className="DetailsCharacters__info">
              {`Mass: ${character.mass}`}
            </div>
            <div className="DetailsCharacters__info">
              {`Hair color: ${character.hair_color}`}
            </div>
            <div className="DetailsCharacters__info">
              {`Skin color: ${character.skin_color}`}
            </div>
            <div className="DetailsCharacters__info">
              {`Eye color: ${character.eye_color}`}
            </div>
            <div className="DetailsCharacters__info">
              {`Birth year: ${character.birth_year}`}
            </div>
            <div className="DetailsCharacters__info">
              {`Gender: ${character.gender}`}
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
        )
        : <div>
            Loading
        </div>
      }
    </div>
  );
};

DetailsCharacters.propTypes = {
  selectedCharacter: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
}
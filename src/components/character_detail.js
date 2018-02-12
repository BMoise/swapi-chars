import React from 'react';

const CharacterDetail = ({ character }) => {
  return (
    <div className="details col-lg-12">
      <div className="row">
        <h5 className="col-lg-12">{character.name}</h5>
        <div className="col-lg-4">
          <h6>Gender:</h6>
          <p>{character.gender}</p>
        </div>
        <div className="col-lg-4 bordered">
          <h6>Height:</h6>
          <p>{character.height}</p>
        </div>
        <div className="col-lg-4">
          <h6>Mass:</h6>
          <p>{character.mass}</p>
        </div>
        <div className="col-lg-4">
          <h6>Birth Year:</h6>
          <p>{character.birth_year}</p>
        </div>
        <div className="col-lg-4 bordered">
          <h6>Eye Color:</h6>
          <p>{character.eye_color}</p>
        </div>
        <div className="col-lg-4">
          <h6>Hair Color:</h6>
          <p>{character.hair_color}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;

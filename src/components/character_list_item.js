import React, { Component } from 'react';

class CharacterListItem extends Component {
  render() {
    const { name, height, mass, gender } = this.props.character;

    return (
      <a
        className="char-list-item"
        onClick={event =>
          this.props.onCharacterSelect(this.props.character, event)
        }
        href="#"
      >
        <div className="row">
          <h5 className="col-lg-12">{name}</h5>

          <div className="col-lg-4">
            <h6>Gender:</h6>
            <p>{gender}</p>
          </div>
          <div className="bordered col-lg-4">
            <h6>Height:</h6>
            <p>{height}</p>
          </div>
          <div className="col-lg-4">
            <h6>Mass:</h6>
            <p>{mass}</p>
          </div>
        </div>
      </a>
    );
  }
}

export default CharacterListItem;

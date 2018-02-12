import React, { Component } from 'react';
import _ from 'lodash';

import './App.css';

import Pagination from './components/pagination';
import CharacterListItem from './components/character_list_item';
import CharacterSearch from './components/character_search';
import CharacterDetail from './components/character_detail';

const ROOT_URL = 'https://swapi.co/api/people';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      characterList: [],
      searched: false,
      searchResult: [],
      selectedChar: null,
      searchError: false
    };

    this.onPageChange = this.onPageChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onCharacterSelect = this.onCharacterSelect.bind(this);
  }

  componentDidMount() {
    this.fetchCharacters(ROOT_URL);
  }

  fetchCharacters(url) {
    fetch(url)
      .then(response => response.json())
      .then(result => this.setCharacters(result));
  }

  setCharacters(result) {
    const data = result.results;
    const { characters } = this.state;
    characters.push(...data);

    if (result.next) {
      this.fetchCharacters(result.next);
    } else {
      this.setState({ characters });
    }
  }

  onPageChange(startIndex, endIndex) {
    const { characters } = this.state;
    const characterList = characters.slice(startIndex, endIndex);

    this.setState({ characterList });
  }

  onSearchSubmit(searchTerm) {
    if (searchTerm === '') {
      this.setState({
        searchResult: [],
        searchError: false,
        searched: false
      });
      return;
    }
    fetch(`${ROOT_URL}/?search=${searchTerm}`)
      .then(response => response.json())
      .then(result => this.searchResult(result));
  }

  searchResult(result) {
    if (result.count === 0) {
      this.setState({
        searchError: true,
        searched: false,
        selectedChar: null
      });
    } else {
      this.setState({
        searchError: false,
        searchResult: result.results,
        searched: true,
        selectedChar: null
      });
    }
  }

  onCharacterSelect(character, e) {
    e.preventDefault();
    if (this.state.searched) {
      this.setState({
        searched: false,
        searchError: false,
        selectedChar: character
      });
    } else {
      this.setState({
        selectedChar: character
      });
    }
  }

  render() {
    const {
      characterList,
      characters,
      searchResult,
      selectedChar,
      searched,
      searchError
    } = this.state;

    const characterSearch = _.debounce(searchTerm => {
      this.onSearchSubmit(searchTerm);
    }, 400);

    return (
      <div className="App row">
        <div className="char-list col-lg-5">
          <h3>All Characters</h3>

          {this.state.characters.length > 0 ? (
            characterList.map(character => (
              <CharacterListItem
                key={character.name}
                character={character}
                onCharacterSelect={this.onCharacterSelect}
              />
            ))
          ) : (
            <span className="notice">Loading...</span>
          )}
        </div>
        <div className="char-details col-lg-7">
          <div className="row">
            <CharacterSearch onSubmit={characterSearch} />
            {selectedChar ? (
              <CharacterDetail character={selectedChar} />
            ) : searched ? (
              searchResult.map(character => (
                <CharacterListItem
                  key={character.name}
                  character={character}
                  onCharacterSelect={this.onCharacterSelect}
                />
              ))
            ) : searchError ? (
              <span className="notice">This Character does not exist.</span>
            ) : (
              <span className="notice">
                Search for a Character or select a character from the list
              </span>
            )}
          </div>
        </div>
        <div>
          {this.state.characters.length > 0 ? (
            <Pagination
              characters={characters}
              onPageChange={this.onPageChange}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default App;

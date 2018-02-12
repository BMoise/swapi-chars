import React, { Component } from 'react';

class CharacterSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(searchTerm) {
    this.setState({ value: searchTerm });
    this.props.onSubmit(searchTerm);
  }

  render() {
    return (
      <form className="col-lg-12" onSubmit={event => event.preventDefault()}>
        <div className="row">
          <input
            className="search col-lg-12"
            type="text"
            value={this.state.value}
            placeholder="Search for specific characters..."
            onChange={event => this.onInputChange(event.target.value)}
          />
        </div>
      </form>
    );
  }
}

export default CharacterSearch;

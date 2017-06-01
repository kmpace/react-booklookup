//components are reuable code
import React, { Component } from 'react';
import {FormGroup, FormControl , InputGroup } from 'react-bootstrap';
import Gallery from './gallery';

//State - data is particular to a react component



class Global extends Component {
  constructor(props) {
    super(props);
    this.state ={ //Initialize a state object
      query:'' ,//query key maps to blank string
      items: []
    }

  }



  search(){ //Search helper methond
    const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

    fetch(`${BASE_URL}${this.state.query}`, { method: 'GET'})
      .then(response => response.json())
      .then(json => {
        let { items } = json;
        this.setState({items})
      });
  }
  render() { //render method returns some JSX
    return (
      <div className="Global">
        <h2>Book Explorer!</h2>
        <FormGroup>
          <InputGroup>
            <FormControl
            type="text"
            placeholder="Search for a book"
            onChange={event => this.setState({query: event.target.value})}
            onKeyPress={event => {
              if (event.key === 'Enter'){
                this.search();
              }
            }}

            />
          <InputGroup.Addon onClick={() => this.search()}>
            <button>Search</button>
          </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Gallery items={this.state.items}/>
      </div>

    )
  }


}

export default Global;

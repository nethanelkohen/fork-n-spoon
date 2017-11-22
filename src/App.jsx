import React, {
  Component
} from 'react';
import axios from 'axios';
import Ingredients from './Ingredients.js';
import Nutrition from './Nutrition.js';
import Toggle from 'react-toggled'


class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      response: {
        hits: []
      },
/*      isCardHidden: true */
    }

  /*  this.toggleCard = this.toggleCard.bind(this); */
  }

/*  toggleCard(event) {
    console.log('working', event.target.id);

    this.setState(prevState => ({
      isCardHidden: !this.state.isCardHidden
    }));
  } */

  handleChange(event) {
    this.setState({
      searchText: event.target.value,
      response: {
        recipe: event.target.value
      }
    })
  };

  handleClick() {
    const configuration = {
      params: {
        q: this.state.searchText,
        app_key: '203a3d88',
        apiKey: 'fcd579b60f0da96887c592b4fbaf0265',
        from: 0,
        to: 30,
      }
    }

    axios
      .get('https://api.edamam.com/search', configuration)
      .then(res => {
        console.log(res);
        this.setState({
          response: res.data
        });
      })
      .catch(error => console.log(error))
  }

  render() {
    const edamamResponse = this.state.response;
  /*  const card = this.state.isCardHidden; */

    return (
      <div className="container">
        <input
          placeholder='search'
          className="searchBar"
          onChange={(event) => this.handleChange(event)} />
        <button className="goButton" onClick={() => this.handleClick()}>
          go
        </button>
        <h2 className="searchText">
          {this.state.searchText}
        </h2>
        {
          edamamResponse.hits
          ? <div className="searchResult">
              {
                edamamResponse.hits.map((item, index) => {
                  return (
                    <div key={index} className="searchInfo">
                      <div>
                        <img key={index} src={item.recipe.image} className="searchImage" />
                      </div>
                      <div>
                        <div className="label">
                          <p key={index}>
                            {item.recipe.label}
                          </p>
                        </div>
                        <div>
                          <p key={index}>
                            Recipe Yields {item.recipe.yield} Servings
                          </p>
                        </div>
                        <div className="calories">
                          <p key={index}>
                            Calories Per Serving: {Math.round(item.recipe.calories/item.recipe.yield)}
                          </p>
                        </div>
                      </div>
                      <Toggle>
                          {({on, getTogglerProps}) => (
                            <div>
                              <button {...getTogglerProps()}>See More!</button>
                              {!on ? null :

                                <div>
                                  <Nutrition digest={item.recipe.digest} />
                                  <Ingredients ingredients={item.recipe.ingredientLines} />
                                  <a href={item.recipe.url}>Click here for the recipe!</a>
                                </div>
                              }
                            </div>
                          )}
                        </Toggle>
                    </div>
                  )
                })
              }
            </div>
          : null
        }
      </div>
    );
  }
}

export default App;

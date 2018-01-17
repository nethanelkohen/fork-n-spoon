import React, { Component } from 'react';
import axios from 'axios';
import Ingredients from './components/Ingredients.jsx';
import Nutrition from './components/Nutrition.jsx';
import Toggle from 'react-toggled';
import Logo from './components/Logo.jsx';
import BarcodeRead from './components/BarcodeRead';
// import addUrlProps from './components/Parameters';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      response: {
        hits: []
      },
      needCode: true
    };
  }

  //////// MAKES EDAMAM API CALL  //////////

  handleChange(event) {
    this.setState({
      searchText: event.target.value,
      /*   code: null, */
      response: {
        recipe: this.state.searchText
      }
    });
  }

  //////// TAKES UPC NUMBER AND PASSES IT TO //////
  /////// SEARCHTEXT THEN MAKES EDAMAM API CALL //////////

  onCodeChange(code) {
    this.setState({
      searchText: this.state.code
    });

    const configuration = {
      headers: {
        'X-Mashape-Key': 'SEHxbUG4JNmshq5esXxrSnkcAtjOp1AwYTLjsnoIzz3NSZcpe7',
        Accept: 'application/json'
      }
    };
    axios
      .get(
        'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/upc/' +
          code,
        configuration
      )
      .then(res => {
        this.setState({
          searchText: res.data.title
        });
      })
      .then(res => {
        const configuration = {
          params: {
            q: this.state.searchText,
            app_key: '94a66a76',
            apiKey: '7110d39470a8b9d598845ceeefad5420',
            from: 0,
            to: 30
          }
        };

        axios
          .get('https://api.edamam.com/search', configuration)
          .then(res => {
            console.log(res);
            this.setState({
              response: res.data
            });
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  //////// API CALL THROUGH NORMAL SEARCH //////////

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      const configuration = {
        params: {
          q: this.state.searchText,
          app_key: '94a66a76',
          apiKey: '7110d39470a8b9d598845ceeefad5420',
          from: 0,
          to: 30
        }
      };

      axios
        .get('https://api.edamam.com/search', configuration)
        .then(res => {
          console.log(res);
          this.setState({
            response: res.data
          });
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    const edamamResponse = this.state.response;
    console.log(this.state.response);

    return (
      <div className="container">
        <Logo />
        <input
          placeholder={
            this.state.searchText ? 'Search Again' : 'Enter an Ingredient'
          }
          className="search-bar"
          onChange={event => this.handleChange(event)}
          onKeyPress={this.handleKeyPress}
        />

        {this.state.needCode && (
          <BarcodeRead onCodeChange={code => this.onCodeChange(code)} />
        )}

        {edamamResponse.hits ? (
          <div className="search-result">
            {edamamResponse.hits.map((item, index) => {
              return (
                <div key={index} className="search-info">
                  <div className="initial-results">
                    <div>
                      <img
                        alt={index}
                        src={item.recipe.image}
                        className="search-image"
                      />
                    </div>
                    <div className="label">
                      <p key={index}>{item.recipe.label}</p>
                    </div>
                    <div className="recipe-yield">
                      <p key={index}>
                        Recipe Yields {item.recipe.yield} Servings
                      </p>
                    </div>
                    <div className="calories">
                      <p key={index}>
                        Calories Per Serving:{' '}
                        {Math.round(item.recipe.calories / item.recipe.yield)}
                      </p>
                    </div>
                  </div>
                  <div className="new-box">
                    <Toggle>
                      {({ on, getTogglerProps }) => (
                        <div>
                          <button {...getTogglerProps()}>See More!</button>
                          {!on ? null : (
                            <div className="see-more">
                              <Nutrition
                                digest={item.recipe.digest}
                                y={item.recipe.yield}
                              />
                              <Ingredients
                                ingredients={item.recipe.ingredientLines}
                              />
                              <div className="recipe-link">
                                <a href={item.recipe.url} target="_blank">
                                  Click here for the recipe!
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Toggle>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;

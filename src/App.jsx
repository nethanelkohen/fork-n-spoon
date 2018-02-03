// Import React and component from react library.
import React, { Component } from 'react';
// Import axios for API call.
import axios from 'axios';
// Import Ingredients component.
import Ingredients from './components/Ingredients.jsx';
// Import Nutrition component.
import Nutrition from './components/Nutrition.jsx';
// Import Logo component.
import Logo from './components/Logo.jsx';
// Import BarcodeRead component.
import BarcodeRead from './components/BarcodeRead';
// Import Toggle libray.
import Toggle from 'react-toggled';
// Import jQuery.
import $ from 'jquery';

// Create config variables for Edamam API call.
let id = '94a66a76';
let key = '7110d39470a8b9d598845ceeefad5420';

// Set Edamam API call URL.
let url = 'https://api.edamam.com/search?';

// Create App component.
class App extends Component {
  constructor() {
    super();

// Create state to handle search text input, API reponse and
// barcode functionality.
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
        $.ajax({
          url: url,
          jsonp: 'callback',
          dataType: 'jsonp',
          data: {
            q: this.state.searchText,
            app_id: id,
            app_key: key,
            from: 0,
            to: 30
          },
          success: res => {
            console.log(res);

            this.setState({
              response: res
            });
          },
          error: err => {
            console.log(err);
          }
        });
      });

    // .then(res => {
    //   const configuration = {
    //     params: {
    //       q: this.state.searchText,
    //       app_key: '94a66a76',
    //       apiKey: '7110d39470a8b9d598845ceeefad5420',
    //       from: 0,
    //       to: 30
    //     }
    //   };
    //
    //   axios
    //     .get('https://api.edamam.com/search', configuration)
    //     .then(res => {
    //       console.log(res);
    //       this.setState({
    //         response: res.data
    //       });
    //     })
    //     .catch(error => console.log(error));
    // })
    // .catch(error => console.log(error));
  }

  //////// API CALL THROUGH NORMAL SEARCH //////////

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      $.ajax({
        url: url,
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {
          q: this.state.searchText,
          app_id: id,
          app_key: key,
          from: 0,
          to: 30
        },
        success: res => {
          console.log(res);

          this.setState({
            response: res
          });
        },
        error: err => {
          console.log(err);
        }
      });
      //   const configuration = {
      //     headers: {
      //       'Access-Control-Allow-Origin': '*',
      //       'Access-Control-Allow-Headers':
      //         'Origin, X-Requested-With, Content-Type, Accept'
      //     },
      //     params: {
      //       q: this.state.searchText,
      //       app_key: '94a66a76',
      //       apiKey: '7110d39470a8b9d598845ceeefad5420',
      //       from: 0,
      //       to: 30
      //     }
      //   };
      //
      //   axios
      //     .get('https://api.edamam.com/search', configuration)
      //     .then(res => {
      //       console.log(res);
      //       this.setState({
      //         response: res.data
      //       });
      //     })
      //     .catch(error => console.log(error));
      // }
    }
  };

  render() {
    const edamamResponse = this.state.response;
    console.log('state response', this.state.response);

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

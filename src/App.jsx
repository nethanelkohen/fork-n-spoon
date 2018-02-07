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

// TEST

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

  // Listens to keypress event and sets state with text from text input.
  handleChange(event) {
    this.setState({
      searchText: event.target.value,
      /*   code: null, */
      response: {
        recipe: this.state.searchText
      }
    });
  }

  // Takes barcode from Quagga component and sets searchText state to UPC barcode.
  onCodeChange(code) {
    this.setState({
      searchText: this.state.code
    });

    // Sets spoonacular config variables.
    const configuration = {
      headers: {
        'X-Mashape-Key': 'SEHxbUG4JNmshq5esXxrSnkcAtjOp1AwYTLjsnoIzz3NSZcpe7',
        Accept: 'application/json'
      }
    };
    // Makes API call with UPC from Quagga barcode scan.
    axios
      .get(
        'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/upc/' +
          code,
        configuration
      )
      // Sets searchText state to Spoonacular's response. E.g. UPC barcode
      // (123456789) is queried and spits out 'Rice'.
      .then(res => {
        this.setState({
          searchText: res.data.title
        });
      })
      // Queries Edamam API using jsonp callback (to bypass CORS) with
      // searchText state.
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
          // If API call is successful, then response state is set to the
          // response from API call.
          success: res => {
            this.setState({
              response: res
            });
          },
          // Handles error.
          error: err => {
            console.log(err);
          }
        });
      });
  }

  // Handles API call through search input.
  handleKeyPress = e => {
    // If enter is pressed, then API call is made through jsonp callback.
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
        // If API call is successful, then response state is set to the
        // response from API call.
        success: res => {
          this.setState({
            response: res
          });
        },
        // Handles error.
        error: err => {
          console.log(err);
        }
      });
    }
  };

  // Render to DOM.
  render() {
    // Cache response state to variable.
    const edamamResponse = this.state.response;

    return (
      <div className="container">
        {/* Render Logo */}
        <Logo />
        <input
          placeholder={'Enter an Ingredient'}
          className="search-bar"
          // HandleChange takes in text from input and sets searchText state.
          onChange={event => this.handleChange(event)}
          // Makes API call.
          onKeyPress={this.handleKeyPress}
        />

        {/* If needCode state is true, then BarcodeRead component will appear
        after user click scan.  */}
        {this.state.needCode && (
          // When barcode is scanned, then result from Barcode scan (UPC code)
          // is queried on Spoonacular API.
          <BarcodeRead onCodeChange={code => this.onCodeChange(code)} />
        )}

        {/* If API response exists, then search result will display on DOM. */}
        {edamamResponse.hits ? (
          <div className="search-result">
            {/* Map through response to gain access to API response array
              and return its objects. */}
            {edamamResponse.hits.map((item, index) => {
              return (
                // Assign a key to items from map.
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
                        Calories Per Serving:
                        {/* Round number from calories divided by
                          serving yield */}
                        {Math.round(item.recipe.calories / item.recipe.yield)}
                      </p>
                    </div>
                  </div>
                  <div className="new-box">
                    {/* Toggle component to quickly toggle open each recipe's
                      'See More' box. */}
                    <Toggle>
                      {({ on, getTogglerProps }) => (
                        <div>
                          <button {...getTogglerProps()}>See More!</button>
                          {/* If on is false, then box does not open. If user
                          clicks 'See More' then div with Nutrition component,
                          Ingredients component and link to recipe opens. */}
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
        ) : // If no API call has been made, then nothing will render.
        null}
      </div>
    );
  }
}

export default App;

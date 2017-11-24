import React, {
  Component
} from 'react';
import axios from 'axios';
import Ingredients from './components/Ingredients.jsx';
import Nutrition from './components/Nutrition.jsx';
import Toggle from 'react-toggled'
import Logo from './components/Logo.jsx';
import BarcodeRead from './components/BarcodeRead'


class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      response: {
        hits: []
      },
      code: null,
      needCode: true
/*      isCardHidden: true */
    }
  /*  this.toggleCard = this.toggleCard.bind(this); */
  }

  onCodeChange(code) {
    this.setState({ code })
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
       code: null,
       response: {
         recipe: event.target.value
       }
     })
   };

  handleKeyPress = (e) => {
     if (e.key === 'Enter') {
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
}

/*   handleClick() {
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
   } */

  render() {
    const edamamResponse = this.state.response;

    return (
      <div className="container">
        <Logo />
        <input
          placeholder='search'
          className="search-bar"
          onChange={(event) => this.handleChange(event)}
          onKeyPress={this.handleKeyPress}
           />
         {/*<button className="go-button" onClick={() => this.handleClick()}>
          Go!
          </button>*/}
        <h2 className="search-text">
          {this.state.searchText}
        </h2>
        { this.state.needCode &&  <BarcodeRead onCodeChange={code => this.onCodeChange(code)}/> }

        {
          edamamResponse.hits
          ? <div className="search-result">
              {
                edamamResponse.hits.map((item, index) => {
                  return (
                    <div key={index} className="search-info">
                      <div>
                        <img key={index} src={item.recipe.image} className="search-image" />

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

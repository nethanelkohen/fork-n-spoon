import React, {
  Component
} from 'react';
import axios from 'axios';
import Ingredients from './Ingredients.js';
import Nutrition from './Nutrition.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      response: {
          hits: []
  }
    };
  }
  render() {
      const edamamResponse = this.state.response;
      // console.log("STATE", edamamResponse.hits)
      // if (edamamResponse.hits) {
      //   edamamResponse.hits.map(item => {
      //     console.log(item.recipe.image)
      //   })
      // }

      return (
          <div>
        <input
          placeholder='search'
          onChange={(event) => this.handleChange(event)}
        />
        <button onClick={() => this.handleClick()}>
          go
        </button>
        <h3>
          {this.state.searchText}
        </h3>
        {edamamResponse.hits ?
          <div>
            {edamamResponse.hits.map(function (item,index) {
              return (
                <div key={index}>

                  <div>
                    <img key={index} src={item.recipe.image}/>
                  </div>

                  <div>
                    <p key={index}>
                      {item.recipe.label}
                    </p>
                  </div>

                  <div>
                    <p key={index}>
                      Recipe Yields {item.recipe.yield} Servings
                    </p>
                  </div>

                  <div>
                    <p key={index}>
                      Calories Per Serving: {Math.round(item.recipe.calories/item.recipe.yield)}
                    </p>
                  </div>

                  <div>
                    <Ingredients ingredients={item.recipe.ingredientLines}/>
                  </div>

                </div>
              )
            })}
          </div>
          :
          null
        }

      </div>
    );
  }

   handleChange(event) {
    // const stuff = event.target.value;
    this.setState({
      searchText: event.target.value,
      response: {
        recipe: event.target.value
    }
  })
};

  handleClick() {
    // let self = this
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

export default App;

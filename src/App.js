import React, {
  Component
} from 'react';
import axios from 'axios';
class App extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      response: { }
    };
  }
  render() {
      const edamamResponse = this.state.response;
      console.log("STATE", this.state.response.hits)
      if (this.state.response.hits) {
        this.state.response.hits.map(item => {
          console.log(item.recipe.image)
        })
      }
    
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
        <p>
          label: {edamamResponse.label}
        </p>
        {this.state.response.hits ?
          <div>
            {this.state.response.hits.map(item=>{
              return (
                <div>
                <img src={item.recipe.image}/>
                <p>{item.recipe.label}</p>
                <p>Calories {item.recipe.calories}</p>
                <p>Ingredients {item.recipe.ingredientLines}</p>
                </div>
              )
            })}
          </div>
          :
          null
        }
        <p>
          recipe: {edamamResponse.recipe}
        </p>
        <p>
          image: {edamamResponse.image}
        </p>
        <p>
          ingredients: {edamamResponse.ingredients}
        </p>
        <p>
          totalNutrients: {edamamResponse.totalNutrients}
        </p>
      </div>
    );
  }
   handleChange(event) {
    // const stuff = event.target.value;
    this.setState({
      response: {
        recipe: event.target.value,
        image: event.target.value,
        totalNutrients: event.target.value
    }
  })
};
 componentDidMount() {
     const configuration = {
      params: {
        q: 'chicken',
        // r: '',
        app_key: '203a3d88',
        apiKey: 'fcd579b60f0da96887c592b4fbaf0265',
        from: 0,
        to: 0,
      }
    }
    axios
      .get('https://api.edamam.com/search')
      .then((res) => {
      console.log(res.data);
      this.setState({
            response: res.data
        });
      });
    }
  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }
  handleClick() {
    // let self = this
    const configuration = {
      params: {
        q: this.state.searchText,
        app_key: '203a3d88',
        apiKey: 'fcd579b60f0da96887c592b4fbaf0265',
        from: 0,
        to: 10,
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
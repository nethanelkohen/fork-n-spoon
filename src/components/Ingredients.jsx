import React from 'react';
import PropTypes from 'prop-types';

// Stateless functional component that maps through data from Edamam API call
// and returns ingredients objects.
const Ingredients = ({ ingredients }) => (
  <div>
    <ul className="ingredients">
      {ingredients.map(function(name, index) {
        return <li key={index}>{name}</li>;
      })}
    </ul>
  </div>
);

// Type check Ingredients to make sure type is array.
Ingredients.propTypes = {
  ingredients: PropTypes.array.isRequired
};

export default Ingredients;

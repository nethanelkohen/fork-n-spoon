import React from 'react';
import PropTypes from 'prop-types';

const Ingredients = ({ ingredients }) => (
  <div>
    <ul className='ingredients'>
      {ingredients.map(function(name, index){
          return <li key={index}>{name}</li>;
          })}
    </ul>
   </div>
);

Ingredients.propTypes = {
  ingredients: PropTypes.array.isRequired
};

export default Ingredients;

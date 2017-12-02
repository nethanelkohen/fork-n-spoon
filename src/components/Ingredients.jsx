import React from 'react';

const Ingredients = ({ ingredients }) => (
  <div>
    <ul className='ingredients'>
      {ingredients.map(function(name, index){
          return <li key={index}>{name}</li>;
          })}
    </ul>
   </div>
);

export default Ingredients;

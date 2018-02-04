import React from 'react';
import PropTypes from 'prop-types';

// Stateless functional component that maps through data from Edamam API call
// and returns nutrition objects.
const Nutrition = ({ digest, y }) => (
  <div>
    <ul id="nutrition">
      {digest.map(function(digest, i) {
        if (i < 5) {
          const equals = digest.total / y;
          return (
            <li key={i}>
              {digest.label}: {Math.round(equals)} {digest.unit}
            </li>
          );
        } else return null;
      })}
    </ul>
  </div>
);

// Type check digest to make sure type is array and y to make sure
// type is number.
Nutrition.propTypes = {
  digest: PropTypes.array.isRequired,
  y: PropTypes.number.isRequired
};

export default Nutrition;

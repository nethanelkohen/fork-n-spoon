import React from 'react';

const Nutrition = ({ nut }) => (
  <div>
    <ul>
      {nut.map(function(name, index){
          return <li key={index}>{name}</li>;
          })}
    </ul>
   </div>
);

export default Nutrition;

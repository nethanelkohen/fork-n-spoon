/* import React, {
  Component
} from 'react';

export default class Nutrition extends Component {
  render() {
    const digest = this.props.digest;
    const serving = this.props.yield;
    return (
      <div>
        <ul id='nutrition'>
          {digest.map(function(digest, i) {
            if (i < 5){
              const equals = Math.round(digest.total/serving);
              return <li key={i}>{digest.label}: {equals} {digest.unit} </li>}
                else return null
            })}
        </ul>
      </div>
    )
  }
} */

import React from 'react';

const Nutrition = ({ digest, y }) => (
  <div>
    <ul id='nutrition'>
      {digest.map(function(digest, i) {
        if (i < 5){
          const equals = (digest.total/y);
          return <li key={i}>{digest.label}: {Math.round(equals)} {digest.unit} </li>}
            else return null
        })}
    </ul>
  </div>
);

export default Nutrition;

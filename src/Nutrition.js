import React, { Component } from 'react';

export default class Nutrition extends Component {
  render(){
    const digest = this.props.digest;

    return (
      <div>
        <ul>
          {digest.map(function(digest, i) {
            if (i === 0 ||
                i === 1 ||
                i === 2 ||
                i === 3 ||
                i === 4
              ){
              return <li key={i}>{digest.label}: {Math.round(digest.total)} {digest.unit}</li>
            }
            })}
        </ul>
      </div>
    )
  }
}

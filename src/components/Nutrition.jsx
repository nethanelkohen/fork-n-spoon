import React, {
  Component
} from 'react';

export default class Nutrition extends Component {
  render() {
    const digest = this.props.digest;

    return (
      <div>
        <ul id='nutrition'>
          {digest.map(function(digest, i) {
            if (i < 5){
              return <li key={i}>{digest.label}: {Math.round(digest.total)} {digest.unit}</li>}
                else return null
            })}
        </ul>
      </div>
    )
  }
}

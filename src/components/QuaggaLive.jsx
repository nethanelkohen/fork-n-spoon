import React, { Component } from 'react';
import Quagga from 'quagga';

export default class QuaggaWrap extends Component {
  constructor(props) {
    super(props)

    this._onDetected = this._onDetected.bind(this)
  }
  componentDidMount() {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        constraints: {
          width: 500,
          height: 300,
          facingMode: "environment",
        },
        singleChannel: false,
        target: '#scanner',
      },
      locator: {
        patchSize: "medium",
        halfSample: true,
      },
      numOfWorkers: 2,
      decoder: {
        readers: [{
          format: "ean_reader",
          config: {},
        }, {
          format: 'upc_reader',
          config: {},
        }, {
          format: 'i2of5_reader',
          config: {},
        }],
      },
      locate: true,
    }, function(err) {
      if (err) {
        alert(err)
        return console.log(err);
      }
      Quagga.start();
    });
    Quagga.onDetected(this._onDetected);
  }

  componentWillUnmount() {
    Quagga.stop()
    Quagga.offDetected(this._onDetected);
  }

  _onDetected(result) {
    this.props.onDetected(result);
  }

  render() {
    return (
      <div id="interactive" className="viewport"/>
    );
  }
}

QuaggaWrap.propTypes = {
  onDetected: React.PropTypes.func.isRequired
}

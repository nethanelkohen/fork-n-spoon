import React, { Component } from 'react';
import Quagga from 'quagga';

export default class QuaggaScan extends Component {
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
          format: "upc_reader",
          config: {},
        }, {
          format: 'upc_e_reader',
          config: {},
        }],
      },
      locate: true,
    }, function(err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
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
      <div id="interactive" className="viewport" playsinline/>
    );
  }
}

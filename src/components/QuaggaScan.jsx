import React, { Component } from 'react';
import Quagga from 'quagga';

// Create QuaggaScan component.
export default class QuaggaScan extends Component {
  constructor(props) {
    super(props);

    this._onDetected = this._onDetected.bind(this);
  }

  // When component mounts, Quagga initializes with the options listed below.
  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          constraints: {
            width: 500,
            height: 300,
            facingMode: 'environment'
          },
          singleChannel: false,
          target: '#scanner'
        },
        locator: {
          patchSize: 'medium',
          halfSample: true
        },
        numOfWorkers: 2,
        decoder: {
          // Here's the important part! Make sure the correct UPC labels are
          // listed.
          readers: [
            {
              format: 'upc_reader',
              config: {}
            },
            {
              format: 'upc_e_reader',
              config: {}
            }
          ]
        },
        locate: true
      },
      // Handle error.
      err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Initialization finished. Ready to start');
        Quagga.start();
      }
    );
    Quagga.onDetected(this._onDetected);
  }

  // When scan finishes, end Quagga.
  componentWillUnmount() {
    Quagga.stop();
    Quagga.offDetected(this._onDetected);
  }

  // Send barcode results props to other components.
  _onDetected(result) {
    this.props.onDetected(result);
  }

  render() {
    return <div id="interactive" className="viewport" playsInline />;
  }
}

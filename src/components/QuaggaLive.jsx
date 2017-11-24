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
        target: '#scanner',
      },
      decoder : {
            readers : ["upc_reader"]
          }
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
      <div id="interactive" className="viewport"/>
    );
  }
}

import React from 'react';
import QuaggaScan from './QuaggaScan';
import PropTypes from 'prop-types';

// Create BarcodeRead component.
export default class BarcodeRead extends React.Component {
  constructor(props) {
    super(props);
    // Create state for scanning and empty string for resultCode.
    this.state = {
      scanning: false,
      resultCode: ''
    };

    this.onDetect = this.onDetect.bind(this);
    this.startScan = this.startScan.bind(this);
    this.stopScan = this.stopScan.bind(this);
  }

  // Sets scanning state to true, which begins scanning of barcode.
  startScan() {
    this.setState({
      scanning: true
    });
  }

  // Stops scan and sets state back to false.
  stopScan() {
    this.setState({
      scanning: false
    });
  }

  // Takes in result from barcode scan.
  onDetect(result) {
    // If barcode scan is successful, resultCode is set to the result, if not
    // state stays null. scanning state is set to false to disable scanning.
    this.setState({
      resultCode: result ? result.codeResult.code : null,
      scanning: false
    });

    this.props.onCodeChange(result.codeResult.code);
  }

  render() {
    return (
      <div>
        {/* Webcam scanner is hidden if scanning state is false.*/}
        <div style={!this.state.scanning ? { visibility: 'hidden' } : null}>
          <div
            id="scanner"
            style={{
              width: '500px',
              height: '300px',
              margin: 'auto',
              overflow: 'hidden'
            }}
          />
        </div>
        {/* If scanning state is true then QuaggaScan renders.*/}
        {this.state.scanning ? (
          <div>
            {navigator.mediaDevices ? (
              <QuaggaScan onDetected={this.onDetect} />
            ) : null}

            <button className="scan" onClick={this.stopScan}>
              Stop scan
            </button>
          </div>
        ) : (
          <div>
            <button className="scan" onClick={this.startScan}>
              Scan
            </button>
          </div>
        )}
      </div>
    );
  }
}

BarcodeRead.propTypes = {
  onCodeChange: PropTypes.func.isRequired
};

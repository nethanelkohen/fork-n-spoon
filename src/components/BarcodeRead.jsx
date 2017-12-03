import React from 'react';
import QuaggaScan from './QuaggaScan';
import PropTypes from 'prop-types';

export default class BarcodeRead extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scanning: false,
      resultCode: '',
    }

    this.onDetect = this.onDetect.bind(this)
    this.startScan = this.startScan.bind(this)
    this.stopScan = this.stopScan.bind(this)
  }

  startScan() {
    this.setState({
      scanning: true
    })
  }

  stopScan() {
    this.setState({
      scanning: false
    })
  }

  onDetect(result) {    
    this.setState({      
      resultCode: result ? result.codeResult.code : null,
            scanning: false    
    });

        
    this.props.onCodeChange(result.codeResult.code);  
  }

  render() {
    return (
      <div>
        <div style={!this.state.scanning ? { visibility: 'hidden' } : null}>
          <div id="scanner"
               style={{ width: '500px', height: '300px', margin: 'auto', overflow: 'hidden' }} />
        </div>

        {this.state.scanning ?
          <div>
            {navigator.mediaDevices
              ? <QuaggaScan onDetected={this.onDetect} />
            : null
            }

            <button className="scan" onClick={this.stopScan}>Stop scan</button>
          </div>
          :
          <div>

            <button className="scan" onClick={this.startScan}> Scan </button>
          </div>
        }

      </div>
    )
  }
}

BarcodeRead.propTypes = {
  onCodeChange: PropTypes.func.isRequired
};

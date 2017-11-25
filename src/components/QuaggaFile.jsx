import React from 'react'
import Quagga from 'quagga'

export default class QuaggaFile extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.cfg = {
      inputStream: {
        size: 800,
        singleChannel: false,
      },
      locator: {
        patchSize: "medium",
        halfSample: true,
      },
      decoder: {
        readers: [{
          format: "upc_reader",
          config: {},
        }],
      },
      locate: true,
      src: null,
    }

    Quagga.onDetected(props.onDetected)
  }

  decode(src) {
    const config = { ...this.cfg, src: src }

    Quagga.decodeSingle(config, result => {
    })
  }

  onChange(ev) {
    const input = ev.target
    if (input.files && input.files.length) {
      this.decode(URL.createObjectURL(input.files[0]))

    }
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.onChange}></input>

      </div>
    )
  }
}

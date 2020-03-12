import React, { Component } from "react";
import "./App.css";
import ipfs from './ipfs'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: null
    };
  }

  captureFile = event => {
    event.preventDefault();
    console.log("file captured...")
    // Process file for IPFS..
    console.log("file captured...")
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }
  }

  onSubmit = (event) =>{
    event.preventDefault()
    console.log("Submit")
    ipfs.add(this.state.buffer, (err, result) => {
      console.log('ipfs result', result)
      if(err){
        console.error(err)
        return
      }
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            Health Data
          </a>
        </nav>
        <div className="container-fluid mt-5 ml-5">
          <div className="row">
            <p className="h1">Upload Health Data</p>
          </div>
          <div className="row">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control-file mb-2"
                  onChange={this.captureFile}
                />
                <input type="submit" className="btn btn-primary" />
              </div>
            </form>
            {/* <p>Open a PDF file <a target="_blank" href="%PUBLIC_URL%/src/data/sample_health_data.pdf">example</a>.</p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

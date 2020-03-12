import React, { Component } from "react";
import "./App.css";
import ipfs from "./ipfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      fileHash: ""
    };
  }

  captureFile = event => {
    event.preventDefault();
    // Process file for IPFS upload
    console.log("file captured...");
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
    };
  };

  // Example: "QmP736EiaZcXmPSigDmbDrQVNkqN1ZrbqDSvfAcvt2RZvf"
  // Example url: https://ipfs.io/ipfs/QmP736EiaZcXmPSigDmbDrQVNkqN1ZrbqDSvfAcvt2RZvf
  onSubmit = event => {
    event.preventDefault();
    console.log("Submit");
    ipfs.add(this.state.buffer, (err, result) => {
      console.log("ipfs result", result);
      const fileHash = result[0].hash;
      this.setState({ fileHash: fileHash });
      console.log("the set hash is ", this.state.fileHash);
      if (err) {
        console.error(err);
        return;
      }
    });
  };

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
            <div className="row"></div>
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">#</th> */}
                  <th scope="col">Your Files</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <th scope="row">1</th> */}
                  <td>
                    <p>
                      <a
                        target="_blank"
                        href={`https://ipfs.io/ipfs/${this.state.fileHash}`}
                      >
                        File
                      </a>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

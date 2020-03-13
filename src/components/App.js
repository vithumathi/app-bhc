import React, { Component } from "react";
import "./App.css";
import ipfs from "./ipfs";
import Web3 from "web3";
import Patient from "../abis/Patient.json";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockChainData();
  }

  async loadBlockChainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Patient.networks[networkId];
    if (networkData) {
      const abi = Patient.abi;
      const address = networkData.address;
      const contract = web3.eth.Contract(abi, address);
      this.setState({ contract: contract });
      const fileHash = await contract.methods.get().call();
      this.setState({ fileHash: fileHash });
    } else {
      window.alert("Smart contract not deployed to deteced network");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      buffer: null,
      contract: null,
      fileHash: ""
    };
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Please use metamask!");
    }
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

      if (err) {
        console.error(err);
        return;
      }
      // put the hash on blockchain
      this.state.contract.methods
        .set(fileHash)
        .send({ from: this.state.account })
        .then(r => {
          this.setState({ fileHash: fileHash });
          console.log("the set hash is ", this.state.fileHash);
        });
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0 text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Health Data
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">{this.state.account}</small>
            </li>
          </ul>
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
                  <th scope="col">Your Files</th>
                </tr>
              </thead>
              <tbody>
                <tr>
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

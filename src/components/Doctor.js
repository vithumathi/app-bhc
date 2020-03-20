import React, { Component } from "react";
import "./App.css";
import ipfs from "./ipfs";
import Web3 from "web3";
import Patient from "../abis/Patient.json";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

class Doctor extends Component {
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
      console.log(this.state.account);
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
      fileHash: "",
      docAccessCodeIput: 0
    };

    this.handleChange = this.handleChange.bind(this);
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

  // Example: "QmP736EiaZcXmPSigDmbDrQVNkqN1ZrbqDSvfAcvt2RZvf"
  // Example url: https://ipfs.io/ipfs/QmP736EiaZcXmPSigDmbDrQVNkqN1ZrbqDSvfAcvt2RZvf
  onSubmit = async event => {
    event.preventDefault();
    console.log("On Submite - Retreving documents");

    // put the hash on blockchain
    await this.state.contract.methods
      .get(this.state.docAccessCodeIput)
      .call()
      .then(fileHash => {
        console.log("Doctor's read", fileHash);
        this.setState({ fileHash: fileHash });
      })
      .catch(err => {
        console.log("Failed with error: " + err);
        alert("You do not have the permission to view the patients PHR");
        this.setState({ fileHash: null });
      });
  };

  handleChange(event) {
    this.setState({ docAccessCodeIput: event.target.value });
  }

  render() {
    return (
      <div>
        <div class=" row mt-3 jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Access Health Records</h1>
            <p class="lead">
              Please enter the access code to access patients records
            </p>
          </div>
        </div>
        <div class="container align-middle">
          <div className="row">
            <form onSubmit={this.onSubmit}>
              <div className="form-row align-items-center">
                <div className="col-auto">
                  <label className="col-sm-2 col-form-label">Access Code</label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="inlineFormInput"
                    value={this.state.docAccessCodeIput}
                    onChange={this.handleChange}
                    placeholder="99999"
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary mb-2"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="row mt-5">
            <FileList fileHash={this.state.fileHash} />
          </div>
        </div>
      </div>
    );
  }
}

export default Doctor;

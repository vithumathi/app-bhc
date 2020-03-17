import React, { Component } from "react";
import "./App.css";
import ipfs from "./ipfs";
import Web3 from "web3";
import Patient from "../abis/Patient.json";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

class PatientComp extends Component {
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
      console.log(fileHash);
      this.setState({ fileHash: fileHash });
      //fileHash ? console.log(fileHash.length) : null;
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
      console.log(fileHash);
      if (err) {
        console.error(err);
        return;
      }
      // put the hash on blockchain
      this.state.contract.methods
        .set(fileHash)
        .send({ from: this.state.account });
    });
  };

  render() {
    return (
      <div className="container-fluid mt-5 ml-5">
        <div className="row">
          <FileUpload onSubmit={this.onSubmit} captureFile={this.captureFile} />
        </div>
        <div className="row"></div>
        <FileList fileHash={this.state.fileHash} />
      </div>
    );
  }
}

export default PatientComp;

import React, { Component } from "react";
import "./App.css";


import Navigation from "./Navigation";

import Patient from "./PatientComp";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      buffer: null,
      contract: null,
      fileHash: ""
    };
  }

  render() {
    return (
      <div>
        <Navigation />
        <Patient />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import Navigation from "./Navigation";
import Patient from "./PatientComp";
import Doc from "./Doctor";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route path="/patient" component={Patient} />
            <Doc path="/doctor" component={Doc} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

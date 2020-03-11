import React, { Component } from "react";
import "./App.css";

class App extends Component {
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
              <form>
                <div className="form-group">
                <input type="file" className="form-control-file mb-2"/>
                <input type="submit" className="btn btn-primary"/>
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

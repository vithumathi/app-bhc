import React, { Component } from "react";

class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0 text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Health Data
        </a>
      </nav>
    );
  }
}

export default Navigation;

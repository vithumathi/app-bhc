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
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white">{this.props.account}</small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;

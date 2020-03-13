import React, { Component } from "react";

class FileUpload extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <p className="h1">Upload Health Data</p>
        </div>
        <div className="row">
          <form onSubmit={this.props.onSubmit}>
            <div className="form-group">
              <input
                type="file"
                className="form-control-file mb-2"
                onChange={this.props.captureFile}
              />
              <input type="submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FileUpload;

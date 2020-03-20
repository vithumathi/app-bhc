import React, { Component } from "react";

class FileUpload extends Component {
  render() {
    return (
      <div>
        <div class="row mt-3 jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Upload Your Health Record</h1>
            <p class="lead">
              Doctor's with your access code will be able to see all your
              records
            </p>
          </div>
        </div>
        <div className="container align-middle">
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
      </div>
    );
  }
}

export default FileUpload;

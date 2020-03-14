import React, { Component } from "react";

class FileList extends Component {
  render() {
    return (
      <div>
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
                  {this.props.fileHash ? <a
                    target="_blank"
                    href={`https://ipfs.io/ipfs/${this.props.fileHash}`}
                  >
                    File
                  </a> : null}
                  
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default FileList;

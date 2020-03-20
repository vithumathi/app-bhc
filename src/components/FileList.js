import React, { Component } from "react";

class FileList extends Component {
  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Your Files</th>
            </tr>
          </thead>
          <tbody>
            {this.props.fileHash
              ? this.props.fileHash.map((fHash, index) => {
                  return (
                    <tr>
                      <th scope="row">{++index}</th>
                      <td>
                        <a
                          target="_blank"
                          href={`https://ipfs.io/ipfs/${fHash}`}
                        >
                          {" "}
                          File {index}
                        </a>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FileList;

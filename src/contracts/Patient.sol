pragma solidity 0.5.0;

contract Patient{
    string fileHash;

     function set(string memory _fileHash) public {
        fileHash = _fileHash;
    }

    function get() public view returns (string memory){
        return fileHash;
    }
}
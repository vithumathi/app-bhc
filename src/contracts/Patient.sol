pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;
// Experimental (string[]) - Do not use experimental features on live deployments.

contract Patient {
    address owner;
    uint accessCode;
    string[] fileHash;

    constructor() public {
        // Owner of contract
        owner = msg.sender;
        accessCode = 26793;

    }

    // checks whether the address(msg.sender) is same with owner address defined on contract.
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner of the contract is able to modify the data.");
        _;
    }

    function set(string memory _fileHash) public {
        fileHash.push(_fileHash);
    }

    function get(uint _accessCode) public view returns (string[] memory) {
        require(accessCode == _accessCode, "User not authorized.");
        return fileHash;
    }

    function getAccessCode() public onlyOwner view returns (uint) {
        return accessCode;
    }

    function changeAccessCode(uint _accessCode) public onlyOwner {
        accessCode = _accessCode;
    }
}

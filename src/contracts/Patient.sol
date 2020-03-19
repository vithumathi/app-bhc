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
        accessCode = 2255;

    }

    // checks whether the address(msg.sender) is same with owner address defined on contract.
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function set(string memory _fileHash) public {
        fileHash.push(_fileHash);
    }

    function get() public view returns (string[] memory) {
        return fileHash;
    }

    function getAccessCode() public view returns (uint) {
        return accessCode;
    }

    function getOwnerAddress() public view returns (address) {
        return owner;
    }

    function changeAccessCode(uint _accessCode) public onlyOwner {
        accessCode = _accessCode;
    }
}

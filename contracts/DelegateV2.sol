pragma solidity 0.6.8;

import "./DelegateV1.sol";
import "./StorageState.sol";
import "./Ownable.sol";

contract DelegateV2 is StorageState {
    modifier onlyOwner() {
        require(msg.sender == _storage.getAddress("owner"));
        _;
    }

    function setNumberOfOwners(uint256 num) public onlyOwner {
        _storage.setUint("total", num);
    }

    function getNumberOfOwners() public view returns (uint256) {
        return _storage.getUint("total");
    }
}

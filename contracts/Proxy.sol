pragma solidity 0.6.8;

import "./Ownable.sol";
import "./StorageState.sol";

contract Proxy is StorageState, Ownable {
    uint256 deadline = 10 seconds;
    event Deadline(uint256 indexed deadline);

    constructor(KeyValueStorage storage_, address _owner) public {
        _storage = storage_;
        _storage.setAddress("owner", _owner);
    }

    modifier checkUpgradeTime() {
        require(deadline < now, "Time not completed");
        _;
    }
    event Upgraded(address indexed implementation);

    address public _implementation;

    function implementation() public view returns (address) {
        return _implementation;
    }

    function upgradeTo(address impl) public onlyOwner checkUpgradeTime {
        require(_implementation != impl);
        _implementation = impl;
        deadline += now;

        emit Upgraded(impl);
        emit Deadline(deadline);
    }

    fallback() external payable {
        address _impl = implementation();
        require(_impl != address(0));
        bytes memory data = msg.data;

        assembly {
            let result := delegatecall(
                gas,
                _impl,
                add(data, 0x20),
                mload(data),
                0,
                0
            )
            let size := returndatasize
            let ptr := mload(0x40)
            returndatacopy(ptr, 0, size)
            switch result
                case 0 {
                    revert(ptr, size)
                }
                default {
                    return(ptr, size)
                }
        }
    }
}

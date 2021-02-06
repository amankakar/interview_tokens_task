//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.4.18;

import "./Ownable.sol";
import "./StorageState.sol";

contract Proxy is StorageState, Ownable {
    uint256 deadline = 10 seconds;
    event Deadline(uint256 indexed deadline);

    function Proxy(KeyValueStorage storage_, address _owner) public {
        _storage = storage_;
        _storage.setAddress("owner", _owner);
    }

    modifier checkUpgradeTime() {
        require(deadline < now);
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

        Upgraded(impl);
        Deadline(deadline);
    }

    function() external payable {
        address _impl = implementation();
        require(_impl != address(0));
        bytes memory data = msg.data;
        assembly {
            let succeeded := delegatecall(
                gas,
                _impl,
                add(data, 0x20),
                mload(data),
                0,
                0
            )
            let response := mload(0x40)
            switch iszero(succeeded)
                case 1 {
                    revert(0, 0)
                }
        }
    }
}

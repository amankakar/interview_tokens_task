pragma solidity 0.6.8;

/**
 * @dev Collection of functions related to the address type,
 */
library Address {
    function isContract(address account) internal view returns (bool) {
        // This method relies in extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    function toPayable(address account)
        internal
        pure
        returns (address payable)
    {
        return address(uint160(account));
    }
}

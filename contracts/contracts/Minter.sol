// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Minter {
    using SafeERC20 for IERC20;
    IERC20 private token;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function mint(address to, uint256 value) external {
        token.safeTransfer(to, value);
    }
}

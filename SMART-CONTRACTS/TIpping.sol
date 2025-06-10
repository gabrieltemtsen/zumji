// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Zumji.sol";

contract ZumjiTipping {
    Zumji public zumjiContract;

    event Tipped(address indexed sender, address indexed recipient, uint256 points);

    constructor(address _zumjiContract) {
        zumjiContract = Zumji(_zumjiContract);
    }

    modifier onlyOnboarded() {
        require(zumjiContract.isUserOnboarded(msg.sender), "User not onboarded");
        _;
    }

    function tipZumjiPoints(address recipient, uint256 points) external onlyOnboarded {
        zumjiContract.tipZumjiPoints(recipient, points);
        emit Tipped(msg.sender, recipient, points);
    }

    function getZumjiPoints(address user) external view returns (uint256) {
        return zumjiContract.getZumjiPoints(user);
    }
}

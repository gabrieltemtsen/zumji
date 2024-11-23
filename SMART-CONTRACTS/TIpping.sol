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

    // function tipZumjiPoints(address recipient, uint256 points) external onlyOnboarded {
    //     require(recipient != address(0), "Cannot tip to zero address");
    //     require(recipient != msg.sender, "Cannot tip yourself");
    //     require(zumjiContract.isUserOnboarded(recipient), "Recipient not onboarded");
    //     require(zumjiContract.getZumjiPoints(msg.sender) >= points, "Not enough Zumji points");

    //     // Deduct points from sender
    //     zumjiContract.redeemZumji(points);

    //     // Add points to recipient
    //     zumjiContract.claimDailyPointsForUser(recipient, points);

    //     emit Tipped(msg.sender, recipient, points);
    // }

    function getZumjiPoints(address user) external view returns (uint256) {
        return zumjiContract.getZumjiPoints(user);
    }
}

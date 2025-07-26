// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ZumjiReferral {
    
    event Onboarded(address indexed user, address indexed referrer);
    event PointsEarned(address indexed referrer, uint256 points);

    mapping(address => bool) public isOnboarded;
    mapping(address => address) public referrers;
    mapping(address => uint256) public points;

    uint256 public constant REWARD_POINTS = 10;
 
    function onboard(address _referrer) external {
        require(!isOnboarded[msg.sender], "Already onboarded");

        isOnboarded[msg.sender] = true;

        if (
            _referrer != address(0) &&
            _referrer != msg.sender &&
            isOnboarded[_referrer]
        ) {
            referrers[msg.sender] = _referrer;
            points[_referrer] += REWARD_POINTS;

            emit PointsEarned(_referrer, REWARD_POINTS);
        }

        emit Onboarded(msg.sender, _referrer);
    }

    function getReferrer(address user) public view returns (address) {
        return referrers[user];
    }

    function getPoints(address user) public view returns (uint256) {
        return points[user];
    }
}

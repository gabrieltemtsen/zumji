// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract Zumji {
    IERC20 public cUSD;
    address public owner;
    
    struct Trader {
        uint256 stakedAmount;
        uint256 zumjiPoints;
        bool isOnboarded;
    }

    mapping(address => Trader) public traders;
    mapping(address => uint256) public borrowedAmount;
    uint256 public totalStaked;
    uint256 public totalBorrowed;
    uint256 public interestRate; // Example: 5% annual interest

    event Staked(address indexed trader, uint256 amount);
    event Borrowed(address indexed trader, uint256 amount);
    event Repaid(address indexed trader, uint256 amount);
    event AdPosted(address indexed trader, uint256 fee);
    event ZumjiRedeemed(address indexed trader, uint256 amount);
    event Onboarded(address indexed trader);

    constructor(IERC20 _cUSD) {
        cUSD = _cUSD;
        owner = msg.sender;
        interestRate = 5;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyOnboarded() {
        require(traders[msg.sender].isOnboarded, "User not onboarded");
        _;
    }

    function onboard() external {
        require(!traders[msg.sender].isOnboarded, "Already onboarded");

        traders[msg.sender] = Trader({
            stakedAmount: 0,
            zumjiPoints: 0,
            isOnboarded: true
        });

        emit Onboarded(msg.sender);
    }

    function stake(uint256 amount) external onlyOnboarded {
        require(amount > 0, "Cannot stake 0");

        cUSD.transferFrom(msg.sender, address(this), amount);
        
        traders[msg.sender].stakedAmount += amount;
        traders[msg.sender].zumjiPoints += amount / 10; // Example: 10 Zumji points per cUSD staked
        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    function borrow(uint256 amount) external onlyOnboarded {
        require(traders[msg.sender].stakedAmount > 0, "Must stake cUSD to borrow");
        require(amount <= traders[msg.sender].stakedAmount / 2, "Can only borrow up to 50% of staked amount");

        cUSD.transfer(msg.sender, amount);
        
        borrowedAmount[msg.sender] += amount;
        totalBorrowed += amount;

        emit Borrowed(msg.sender, amount);
    }

    function repay(uint256 amount) external onlyOnboarded {
        require(borrowedAmount[msg.sender] >= amount, "Cannot repay more than borrowed");

        uint256 interest = (amount * interestRate) / 100;
        cUSD.transferFrom(msg.sender, address(this), amount + interest);
        
        borrowedAmount[msg.sender] -= amount;
        totalBorrowed -= amount;
        traders[msg.sender].zumjiPoints += amount / 20; // Example: 5 Zumji points per cUSD repaid

        emit Repaid(msg.sender, amount);
    }

    function postAd(uint256 fee) external onlyOnboarded {
        require(fee > 0, "Ad fee must be greater than 0");

        cUSD.transferFrom(msg.sender, address(this), fee);
        
        // Logic to handle ad posting in the UI
        emit AdPosted(msg.sender, fee);
    }

    function redeemZumji(uint256 points) external onlyOnboarded {
        require(traders[msg.sender].zumjiPoints >= points, "Not enough Zumji points");

        uint256 cUSDAmount = points * 10; // Example: 1 Zumji point = 10 cUSD
        require(cUSD.balanceOf(address(this)) >= cUSDAmount, "Insufficient cUSD in contract");

        traders[msg.sender].zumjiPoints -= points;
        cUSD.transfer(msg.sender, cUSDAmount);

        emit ZumjiRedeemed(msg.sender, cUSDAmount);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IERC20.sol";

contract Zumji {
    // Use constants for cUSD address to avoid repetition
    address public constant CUSD_ADDRESS = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    
    struct Trader {
        uint256 stakedAmount;
        uint256 zumjiPoints;
        uint256 stakeTimestamp;
        bool isOnboarded;
        string username;
        string profileImage;
        uint256 lastClaimTimestamp;
    }

    struct Advert {
        address trader;
        string cid;
    }

    mapping(address => Trader) public traders;
    mapping(address => uint256) public borrowedAmount;
    Advert[] public adverts;
    uint256 public totalStaked;
    uint256 public totalBorrowed;
    
    // Constants should be in CAPS and use more precise naming
    uint256 public constant INTEREST_RATE = 10; // 10% interest rate
    uint256 public constant BORROW_RATIO = 2; // Must have staked at least 50% of the amount to borrow
    uint256 public constant POINTS_PER_CUSD_STAKED = 10; // 10 Zumji points per cUSD staked
    uint256 public constant POINTS_PER_CUSD_REPAID = 5; // 5 Zumji points per cUSD repaid
    uint256 public constant ZUMJI_TO_CUSD_RATE = 100; // 100 Zumji points = 1 cUSD
    uint256 public constant LOCK_PERIOD = 30 days;
    uint256 public constant EARLY_UNSTAKE_PENALTY = 1e18; // 1 cUSD penalty
    uint256 public constant AD_FEE = 1e18; // 1 cUSD fee
    uint256 public constant DAILY_CLAIM_POINTS = 100; // 100 Zumji points per day

    event Staked(address indexed trader, uint256 amount);
    event Unstaked(address indexed trader, uint256 amount, bool early);
    event Borrowed(address indexed trader, uint256 amount);
    event Repaid(address indexed trader, uint256 amount);
    event AdPosted(address indexed trader, string cid);
    event ZumjiRedeemed(address indexed trader, uint256 amount);
    event Onboarded(address indexed trader);
    event UsernameUpdated(address indexed trader, string username);
    event PointsClaimed(address indexed trader, uint256 points);
    event ProfileImageUpdated(address indexed trader, string profileImage);

    IERC20 private immutable cUSD;

    constructor() {
        cUSD = IERC20(CUSD_ADDRESS);
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
            stakeTimestamp: 0,
            isOnboarded: true,
            username: "Zumji OG",
            profileImage: "",
            lastClaimTimestamp: 0
        });

        emit Onboarded(msg.sender);
    }

    function isUserOnboarded(address user) external view returns (bool) {
        return traders[user].isOnboarded;
    }

    function getUsername(address user) external view returns (string memory) {
        return traders[user].username;
    }

    function getProfileImage(address user) external view returns (string memory) {
        return traders[user].profileImage;
    }

    function updateUsername(string calldata newUsername) external onlyOnboarded {
        require(bytes(newUsername).length > 0, "Username cannot be empty");
        traders[msg.sender].username = newUsername;
        emit UsernameUpdated(msg.sender, newUsername);
    }

    function updateImage(string calldata newImage) external onlyOnboarded {
        traders[msg.sender].profileImage = newImage;
        emit ProfileImageUpdated(msg.sender, newImage);
    }

    function stake(uint256 amount) external onlyOnboarded {
        require(amount > 0, "Cannot stake 0");
        require(cUSD.transferFrom(msg.sender, address(this), amount), "Deposit failed");

        traders[msg.sender].stakedAmount += amount;
        traders[msg.sender].zumjiPoints += amount * POINTS_PER_CUSD_STAKED;
        traders[msg.sender].stakeTimestamp = block.timestamp;
        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external onlyOnboarded {
        require(amount > 0, "Cannot unstake 0");
        require(traders[msg.sender].stakedAmount >= amount, "Not enough staked amount");

        bool early = block.timestamp < traders[msg.sender].stakeTimestamp + LOCK_PERIOD;
        uint256 penalty = early ? EARLY_UNSTAKE_PENALTY : 0;
        uint256 zumjiDeduction = early ? amount * POINTS_PER_CUSD_STAKED : 0;

        if (penalty > 0) {
            require(cUSD.balanceOf(msg.sender) >= penalty, "Insufficient cUSD for penalty");
            require(cUSD.transferFrom(msg.sender, address(this), penalty), "Penalty transfer failed");
        }

        traders[msg.sender].stakedAmount -= amount;
        if (traders[msg.sender].zumjiPoints >= zumjiDeduction) {
            traders[msg.sender].zumjiPoints -= zumjiDeduction;
        } else {
            traders[msg.sender].zumjiPoints = 0;
        }
        totalStaked -= amount;
        
        require(cUSD.transfer(msg.sender, amount), "Transfer failed");

        emit Unstaked(msg.sender, amount, early);
    }

    function getStakedAmount(address _user) public view returns (uint256) {
        return traders[_user].stakedAmount;
    }

    function getZumjiPoints(address _user) public view returns (uint256) {
        return traders[_user].zumjiPoints;
    }

    function borrow(uint256 amount) external onlyOnboarded {
        require(amount > 0, "Cannot borrow 0");
        require(
            traders[msg.sender].stakedAmount >= amount / BORROW_RATIO, 
            "Must stake at least 50% of the amount to borrow"
        );
        require(
            cUSD.balanceOf(address(this)) >= amount,
            "Insufficient cUSD in contract"
        );

        require(cUSD.transfer(msg.sender, amount), "Transfer failed");

        borrowedAmount[msg.sender] += amount;
        totalBorrowed += amount;

        emit Borrowed(msg.sender, amount);
    }

    function repay(uint256 amount) external onlyOnboarded {
        require(amount > 0, "Cannot repay 0");
        require(borrowedAmount[msg.sender] >= amount, "Cannot repay more than borrowed");

        uint256 interest = (amount * INTEREST_RATE) / 100;
        require(
            cUSD.transferFrom(msg.sender, address(this), amount + interest),
            "Transfer failed"
        );

        borrowedAmount[msg.sender] -= amount;
        totalBorrowed -= amount;
        traders[msg.sender].zumjiPoints += amount * POINTS_PER_CUSD_REPAID;

        emit Repaid(msg.sender, amount);
    }

    function postAd(string memory cid) external onlyOnboarded {
        require(bytes(cid).length > 0, "CID cannot be empty");
        require(cUSD.balanceOf(msg.sender) >= AD_FEE, "Insufficient cUSD for ad fee");
        require(cUSD.transferFrom(msg.sender, address(this), AD_FEE), "Transfer failed");

        adverts.push(Advert({
            trader: msg.sender,
            cid: cid
        }));

        emit AdPosted(msg.sender, cid);
    }

    function redeemZumji(uint256 points) external onlyOnboarded {
        require(points > 0, "Cannot redeem 0 points");
        require(traders[msg.sender].zumjiPoints >= points, "Not enough Zumji points");

        uint256 cUSDAmount = points / ZUMJI_TO_CUSD_RATE;
        require(cUSD.balanceOf(address(this)) >= cUSDAmount, "Insufficient cUSD in contract");
        require(cUSD.transfer(msg.sender, cUSDAmount), "Transfer failed");

        traders[msg.sender].zumjiPoints -= points;

        emit ZumjiRedeemed(msg.sender, cUSDAmount);
    }

    function claimDailyPoints() external onlyOnboarded {
        require(
            block.timestamp >= traders[msg.sender].lastClaimTimestamp + 1 days, 
            "Can only claim once per day"
        );

        traders[msg.sender].zumjiPoints += DAILY_CLAIM_POINTS;
        traders[msg.sender].lastClaimTimestamp = block.timestamp;

        emit PointsClaimed(msg.sender, DAILY_CLAIM_POINTS);
    }

    function hasClaimedToday(address user) external view returns (bool) {
        return block.timestamp < traders[user].lastClaimTimestamp + 1 days;
    }

    function getAdvertCount() external view returns (uint256) {
        return adverts.length;
    }

    function getAdvert(uint256 index) external view returns (Advert memory) {
        require(index < adverts.length, "Index out of bounds");
        return adverts[index];
    }

    // Remove receive() if not needed for ETH transfers
}
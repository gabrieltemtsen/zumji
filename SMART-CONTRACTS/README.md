# Zumji - Blockchain-Enabled Financial and Marketing Platform for SMEs.

This repository contains a set of Solidity smart contracts developed using [Hardhat](https://hardhat.org/) to support a tipping and referral reward system on the Ethereum Virtual Machine (EVM). It includes contracts for ownership control, ERC20 token management, safe token transfers, tipping functionality, and a referral reward mechanism.


## Overview:

Zumji is a dynamic platform tailored for small and medium-sized enterprises (SMEs), built on the Celo blockchain. Zumji revolutionizes loyalty and rewards systems by enabling traders to stake, borrow, and earn rewards effortlessly. Traders can stake their cUSD to earn Zumji points, borrow cUSD against their staked amount, and post ads to reach a targeted audience. Zumji's comprehensive features empower SMEs to save, earn rewards, and access liquidity for their business operations, fostering a thriving and engaged community.

## 📁 Project Structure

```
SMART-CONTRACT/
└── contracts/
    ├── IERC20.sol           // Standard ERC20 interface
    ├── Owned.sol            // Access control for owner-only actions
    ├── SafeERC20.sol        // Secure wrappers for ERC20 interactions
    ├── Tipping.sol          // Core tipping functionality
    ├── Zumji.sol            // Referral and point reward system
    └── referalRewards.sol   // Referral-based rewards smart contract

scripts/
  └── deploy.js         // Deployment script for smart contracts

test/
  └── *.js              // Unit and integration tests for contracts

hardhat.config.js       // Hardhat configuration file
```

## 🧾 Contracts Overview

### `IERC20.sol`

Standard interface for interacting with ERC20 tokens. Used to ensure compatibility with any compliant token.

### `Owned.sol`

Provides basic access control mechanisms, defining an owner account with exclusive privileges for certain functions.

### `SafeERC20.sol`

Includes wrappers around ERC20 operations that throw on failure, ensuring safer transfers and approvals.

### `Tipping.sol`

Enables users to send tips using ERC20 tokens. Designed to promote user-to-user appreciation or micropayments in dApps.

### `Zumji.sol`

Handles referral-based point rewards. Users can accumulate points based on referrals, allowing for gamification or loyalty incentives.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Compile Contracts

```bash
npx hardhat compile
```

### 3. Start a Local Hardhat Node

```bash
npx hardhat node
```

### 4. Deploy Contracts (Example)

```bash
npx hardhat run scripts/deploy.js --network localhost
```

> Make sure to configure your deployment scripts properly inside the `scripts/` folder.

## ✅ Requirements

* Node.js v20 or above
* Hardhat
* Solidity ^0.8.x

## 🧪 Testing

All smart contracts can be tested using Hardhat’s test environment. Extend or modify the tests in the `test/` directory.

```bash
npx hardhat test
```

## 🛡️ Security Considerations

* All transfers are handled using `SafeERC20` to prevent reentrancy and low-level call issues.
* `Owned` contract ensures only authorized access to administrative functions.
* Follow additional security best practices before deploying to production.

## 📜 License

MIT License. See `LICENSE` file for details.

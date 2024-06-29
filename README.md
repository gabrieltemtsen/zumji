# Zumji - Decentralized Marketplace (peer to peer)

## Overview:

Zumji is a decentralized marketplace built on the Celo  (Mainnet) that enables users to buy and sell digital items. The platform operates on a peer-to-peer structure, facilitating transactions directly between buyers and sellers. Funds are securely stored in the Zumji smart contract until the seller delivers or sends the item to the buyer, and the buyer confirms receipt of the product. Zumji also integrates a DAO (Decentralized Autonomous Organization) structure to manage disputes, ensuring fair and transparent resolution mechanisms.

## Technology Stack:

- **Next.js:** Zumji's frontend is built using Next.js, a React framework for building web applications.
- **KONSTA UI:** The user interface of Zumji is designed using KONSTA UI, providing a sleek and intuitive experience for users.
- **Lighthouse Storage (IPFS):** Zumji utilizes IPFS (InterPlanetary File System) for decentralized storage of data and files, ensuring resilience and availability.
- **Solidity:** Zumji's smart contracts are written in Solidity, the programming language for creating smart contracts on the Ethereum and Celo blockchains.
- **Tailwind CSS:** Tailwind CSS is used for styling the user interface of Zumji, providing utility-first CSS classes for efficient and flexible design.
  
## Key Features

### Staking

**Description**: Traders can stake their cUSD to earn Zumji points.  
**Benefits**: Provides a way for traders to save and earn rewards simultaneously.  
**Process**:
1. Connect wallet.
2. Stake a specified amount of cUSD.
3. Earn Zumji points based on the staked amount.

### Borrowing

**Description**: Traders can borrow cUSD against their staked amount.  
**Benefits**: Offers access to liquidity for business operations while still earning rewards.  
**Process**:
1. Connect wallet.
2. Stake cUSD to become eligible for borrowing.
3. Borrow up to 50% of the staked amount.
4. Repay with interest to earn additional Zumji points.

### Advertising

**Description**: Traders can post ads by paying a fee.  
**Benefits**: Provides visibility for traders' products and services to a targeted audience.  
**Process**:
1. Connect wallet.
2. Pay the ad fee in cUSD.
3. Submit ad content for display.

### Play to Earn (P2E)

**Description**: Users can earn Zumji points by participating in a tapping game.  
**Benefits**: Engages users in a fun activity while viewing ads from traders.  
**Process**:
1. Connect wallet.
2. Access the tapping game.
3. Earn Zumji points by tapping and viewing ads.

### Gifting and Tipping

**Description**: Users can send Zumji points to others via email.  
**Benefits**: Encourages community building and allows for peer-to-peer rewards.  
**Process**:
1. Connect wallet.
2. Enter recipient's email and Zumji amount.
3. Recipient receives an email to claim Zumji points.

### Redeeming Points

**Description**: Users can redeem Zumji points for cUSD.  
**Benefits**: Provides a tangible value for the rewards earned on the platform.  
**Process**:
1. Connect wallet.
2. Convert Zumji points to cUSD.
3. Receive cUSD in wallet.


## Future Development:

- **Physical Items and Shipping:** Zumji plans to expand its offerings to include physical items and shipping services, broadening its scope and appeal to users.
- **Enhanced User Experience:** Continual improvements will be made to the user interface and overall user experience of Zumji, ensuring a seamless and enjoyable marketplace experience.
- **Integration with Additional Blockchain Platforms:** Zumji may explore integration with additional blockchain platforms to offer increased accessibility and interoperability for users.

For any further questions or inquiries about Zumji, please feel free to reach out to our team. We are committed to providing a transparent and efficient marketplace experience for our users.

*Note: This ReadMe provides a high-level overview of Zumji's features and technology stack. For detailed technical documentation and instructions, please refer to the respective repositories and documentation of the technologies used in the project.*






## Technical Overview

### Smart Contracts

The Zumji platform is built using Solidity smart contracts on the Celo blockchain. Key components include:

- **Onboarding**: A function that registers users on the platform with an initial zero Zumji points balance.
- **Staking**: Functions to allow users to stake cUSD and earn Zumji points.
- **Borrowing**: Functions to facilitate borrowing against staked cUSD, including repayment and interest calculation.
- **Advertising**: Functions to handle ad fee payments and ad content management.
- **Play to Earn**: Functions to manage the tapping game and allocate Zumji points.
- **Gifting**: Functions to handle the transfer of Zumji points to other users via email.
- **Redemption**: Functions to convert Zumji points back to cUSD.

### Frontend Integration

The frontend is built using Next.js, TypeScript, KonstaUI, and Tailwind CSS. Key elements include:

- **User Interface**: A responsive UI with a gradient background and moving stars for a visually appealing experience.
- **Navbar Component**: Customizable properties for a consistent look and feel.
- **Wallet Integration**: Seamless integration with Celo wallets for connecting, staking, borrowing, and more.
- **Interactive Elements**: A tapping game for earning Zumji points and ad display areas for traders' advertisements.
- **Rewards System**: Real-time updates on Zumji points earned, staked amounts, and available balances.

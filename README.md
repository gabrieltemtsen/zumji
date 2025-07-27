# Zumji - Blockchain-Enabled Financial and Marketing Platform for SMEs.

## Overview:

Zumji is a dynamic platform tailored for small and medium-sized enterprises (SMEs), built on the Celo blockchain. Zumji revolutionizes loyalty and rewards systems by enabling traders to stake, borrow, and earn rewards effortlessly. Traders can stake their cUSD to earn Zumji points, borrow cUSD against their staked amount, and post ads to reach a targeted audience. Zumji's comprehensive features empower SMEs to save, earn rewards, and access liquidity for their business operations, fostering a thriving and engaged community.

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
3. Receive cUSD in wallet.'

## How It Works

1. **Connect Wallet** - Users begin by connecting a compatible Celo wallet to the platform.
2. **Stake cUSD** - Traders deposit cUSD to start earning Zumji points and unlock borrowing power.
3. **Borrow Funds** - Up to 50% of the staked amount can be borrowed for business operations.
4. **Promote Products** - Pay ad fees in cUSD to display ads and reach potential customers.
5. **Send Tips or Gifts** - Transfer Zumji points to others via email for community engagement.
6. **Redeem Rewards** - Convert accumulated points back to cUSD at any time.

## NEXT FEATURES 
- Mobile responsitivity _(Mobile FIRST)
- Landing page (to fit multi-platforms)
- Contract Refactor
- Onchain tipping and redeemables 
- wallet connect integration (upgrade/refactor)

## Installation

To set up the Zumji project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/gabrieltemtsen/zumji
    ```

2. **Navigate to the project directory:**

    ```bash
    cd zumji
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

4. **Run the application:**

    ```bash
    npm run dev
    ```


## 📄 Smart Contracts

Zumji's smart contracts are written in **Solidity** and live in the [`SMART-CONTRACTS`](./SMART-CONTRACTS) folder.

To learn how to:
- Compile the contracts
- Deploy to the Celo blockchain
- Run tests
- Interact with the contracts locally or via scripts

👉 **Please read the [README](./SMART-CONTRACTS/README.md) inside the `SMART-CONTRACTS` folder.**




## Future Development:

- **Physical Items and Shipping:** Zumji plans to expand its offerings to include physical items and shipping services, broadening its scope and appeal to users.
- **Enhanced User Experience:** Continual improvements will be made to the user interface and overall user experience of Zumji, ensuring a seamless and enjoyable marketplace experience.
- **Integration with Additional Blockchain Platforms:** Zumji may explore integration with additional blockchain platforms to offer increased accessibility and interoperability for users.

For any further questions or inquiries about Zumji, please feel free to reach out to our team. We are committed to providing a transparent and efficient marketplace experience for our users.

*Note: This ReadMe provides a high-level overview of Zumji's features and technology stack. For detailed technical documentation and instructions, please refer to the respective repositories and documentation of the technologies used in the project.*

## FAQs

**Q: What blockchain does Zumji run on?**

Zumji is built on the Celo blockchain, enabling fast and low-cost transactions.

**Q: Can I borrow cUSD without staking?**

No. Borrowing is only available after staking cUSD, which determines your borrowing limit.

**Q: How do I earn Zumji points?**

Points are accrued by staking cUSD, borrowing and repaying with interest, and participating in community activities.

**Q: How can I redeem my points?**

You can convert accumulated Zumji points back to cUSD directly within the platform.







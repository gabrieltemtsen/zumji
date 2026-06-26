---
name: zumji
description: >
  Blockchain-enabled financial and marketing platform for SMEs built on the Celo blockchain.
  Zumji enables traders to stake cUSD, borrow against collateral, earn loyalty points,
  post advertisements, and manage on-chain profiles — all through a mobile-first Next.js dApp.
---

# Zumji — Blockchain Financial & Marketing Platform for SMEs

## Overview

Zumji is a decentralized application (dApp) tailored for small and medium-sized enterprises (SMEs), deployed on the **Celo blockchain**. It provides a comprehensive loyalty and rewards ecosystem where traders can:

- **Stake** cUSD to earn Zumji points
- **Borrow** cUSD against staked collateral (up to 50%)
- **Repay** loans with interest to earn additional points
- **Post advertisements** by paying a fee
- **Claim daily points** via a tap-to-earn (Play2Earn) mechanic
- **Redeem** Zumji points back to cUSD
- **Manage on-chain profiles** (username + profile image)

The platform targets the Celo Mainnet with RainbowKit wallet integration and a Konsta UI-powered mobile-first interface.

---

## Technology Stack

| Layer            | Technology                                                        |
| ---------------- | ----------------------------------------------------------------- |
| **Framework**    | Next.js 14 (Pages Router, TypeScript)                             |
| **UI Library**   | Konsta UI (React) — iOS/Material adaptive components              |
| **Styling**      | Tailwind CSS 3.x (wrapped with `konsta/config`)                   |
| **Animations**   | Framer Motion, LottieFiles (`@lottiefiles/dotlottie-react`)       |
| **Wallet**       | RainbowKit v1 + Wagmi v1 + Viem                                  |
| **Blockchain**   | Celo Mainnet & Alfajores Testnet                                  |
| **Smart Contracts** | Solidity ^0.8.20                                               |
| **Storage**      | Lighthouse Web3 SDK (IPFS) — for decentralized file storage       |
| **Forms**        | React Hook Form + Yup validation                                  |
| **HTTP Client**  | Axios                                                             |
| **Notifications**| React Toastify                                                    |
| **Carousel/Slides** | Swiper                                                         |

---

## Project Structure

```
zumji/
├── SMART-CONTRACTS/          # Solidity smart contracts
│   ├── IERC20.sol            # ERC-20 interface
│   ├── Zumji.sol             # Main platform contract (staking, borrowing, ads, points)
│   └── TIpping.sol           # Tipping contract (WIP — core function commented out)
├── src/
│   ├── animation/            # Framer Motion wrappers + Lottie animation component
│   ├── components/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── CustomButton.tsx
│   │   ├── CustomConnectButton.tsx   # RainbowKit connect button wrapper
│   │   └── logo/
│   ├── constants/            # Static assets, text constants, URLs
│   │   ├── images/
│   │   ├── texts.ts
│   │   └── urls/
│   ├── context/
│   │   └── ConnectContext.tsx # Wallet connection context provider
│   ├── hooks/
│   │   ├── use-connect/      # Wallet connection hook
│   │   ├── use-get-is-onboarded/  # Checks if user is onboarded on-chain
│   │   └── use-mounted/      # Client-side mount detection
│   ├── pages/
│   │   ├── _app.tsx          # App root — Wagmi, RainbowKit, Konsta providers
│   │   ├── _document.tsx     # Custom document
│   │   ├── index.tsx         # Landing / onboarding page
│   │   ├── Layout.tsx        # Shared layout with bottom navigation
│   │   ├── api/
│   │   │   └── hello.ts      # Default Next.js API route
│   │   ├── finance/          # DeFi dashboard (stake, unstake, borrow, repay, redeem)
│   │   │   ├── index.tsx
│   │   │   ├── cards/        # Finance stat cards component
│   │   │   └── sheets(modals)/  # Bottom sheet modals for finance actions
│   │   ├── p2e/              # Play-to-Earn (tap-to-earn + daily claim)
│   │   │   ├── index.tsx
│   │   │   └── components/   # P2E-specific components (Swiper carousel)
│   │   └── profile/          # User profile management (username, image)
│   │       └── index.tsx
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── contracts.ts      # Contract addresses + ABIs (Zumji + cUSD)
├── public/                   # Static assets (images, icons)
├── tailwind.config.ts        # Tailwind config wrapped with Konsta
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## Smart Contracts

### Zumji.sol (Main Contract)

**Deployed at:** `0x634C2024026211537b265b4056d394037e41E4ed` (Celo Mainnet)

The core contract managing all platform operations:

| Function             | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| `onboard()`          | Register a new trader (sets default username "Zumji OG")          |
| `stake(amount)`      | Stake cUSD → earn 10 Zumji points per cUSD staked                 |
| `unstake(amount)`    | Withdraw staked cUSD (1 cUSD penalty if before 30-day lock)       |
| `borrow(amount)`     | Borrow cUSD (must have staked ≥ 50% of borrow amount)             |
| `repay(amount)`      | Repay borrowed cUSD + 10% interest → earn 5 points per cUSD       |
| `postAd(cid)`        | Post an ad (1 cUSD fee), content stored as IPFS CID               |
| `redeemZumji(points)`| Convert Zumji points → cUSD (100 points = 1 cUSD)                 |
| `claimDailyPoints()` | Claim 100 Zumji points (once per 24 hours)                        |
| `updateUsername()`   | Update on-chain username                                           |
| `updateImage()`      | Update on-chain profile image (stored as base64 string)            |

**Key Constants:**

| Constant                | Value            |
| ----------------------- | ---------------- |
| `INTEREST_RATE`         | 10%              |
| `BORROW_RATIO`          | 2 (50% collateral) |
| `POINTS_PER_CUSD_STAKED`| 10               |
| `POINTS_PER_CUSD_REPAID`| 5                |
| `ZUMJI_TO_CUSD_RATE`    | 100 points = 1 cUSD |
| `LOCK_PERIOD`           | 30 days          |
| `EARLY_UNSTAKE_PENALTY` | 1 cUSD           |
| `AD_FEE`                | 1 cUSD           |
| `DAILY_CLAIM_POINTS`    | 100 points       |

### TIpping.sol (Tipping Contract — WIP)

A companion contract for peer-to-peer Zumji point tipping. The core `tipZumjiPoints()` function is **currently commented out** and requires architectural changes to the main contract (external point transfer functions) before it can work.

### cUSD Token

| Network   | Address                                      |
| --------- | -------------------------------------------- |
| Mainnet   | `0x765DE816845861e75A25fCA122bb6898B8B1282a`  |
| Testnet   | `0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1`  |

---

## Frontend Pages

### `/` — Home / Onboarding
- Displays hero section with gradient background
- If user is **not onboarded**: shows "Join Zumji" button → calls `onboard()`
- If user **is onboarded**: shows "Stats" link → navigates to `/finance`
- Uses Framer Motion entrance animations (left, right, bottom)

### `/finance` — DeFi Dashboard
- Three stat cards showing: Staked Amount, Zumji Points Balance, Borrowed Amount
- Each card has two action buttons opening Konsta `Sheet` modals
- Modal actions: Stake, Unstake, Borrow, Repay, Redeem
- All transactions use `writeContract` → `waitForTransaction` pattern with toast notifications

### `/p2e` — Play-to-Earn
- Tap-to-earn mechanic: tap a button up to 100 times per day to accumulate points
- "Claim Points" button calls `claimDailyPoints()` on-chain
- Includes a Swiper carousel for P2E content/ads
- Daily limit resets at midnight (client-side timer)

### `/profile` — Profile Management
- Displays on-chain username and profile image
- Edit profile via bottom sheet: update username + upload image
- Profile image stored as base64 on-chain via `updateImage()`

---

## Key Patterns & Conventions

### Wallet Integration
- **Wagmi v1** with `configureChains` + `publicProvider`
- **RainbowKit v1** for wallet connection UI
- Chain config: Celo Mainnet + Alfajores Testnet
- Contract reads use `readContract()`, writes use `writeContract()` + `waitForTransaction()`

### UI Framework
- **Konsta UI** wraps the entire app via `<App>` component in `_app.tsx`
- Theme auto-detects iOS vs Material based on user agent
- Dark mode enabled globally (`dark={true}`)
- Bottom sheet modals (`<Sheet>`) for transactional forms

### Device Detection
- User agent sniffing in `_app.tsx` determines `ios` | `material` theme
- Konsta components render platform-adaptive styles

### Onboarding Guard
- Pages (Finance, P2E, Profile) check onboarding status via `useGetIsOnboarded` hook
- Non-onboarded users see a redirect prompt to the home page

### Transaction Flow
1. For token transfers: first `approve()` the cUSD spend → `waitForTransaction`
2. Then call the platform function (stake, unstake, etc.) → `waitForTransaction`
3. Toast notification on success/failure
4. Refresh balances via `getBalances()` or equivalent

---

## Environment & Configuration

### Environment Variables
- `NEXT_PUBLIC_ENABLE_TESTNETS` — Set to `"true"` to include Alfajores testnet in chain config

### WalletConnect
- Project ID: `063d0bf7cbe66b2e8291f29dc850fb19`
- App Name: `"Fuse Pay"` (legacy name in config)

---

## Development

### Prerequisites
- Node.js (v18+)
- npm

### Setup
```bash
git clone https://github.com/gabrieltemtsen/zumji
cd zumji
npm install
```

### Run Development Server
```bash
npm run dev        # Standard Next.js dev server
npm run fast       # Next.js dev with Turbopack (--turbo)
```

### Build
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

---

## Planned / In-Progress Features

- [ ] Mobile-first responsive redesign
- [ ] Landing page for multi-platform support
- [ ] Smart contract refactor
- [ ] On-chain tipping and redeemables (TIpping.sol completion)
- [ ] Wallet connect integration upgrade/refactor
- [ ] Physical items and shipping integration
- [ ] Integration with additional blockchain platforms

---

## Contributing

When working on this codebase:

1. **Smart contract changes** go in `SMART-CONTRACTS/` — update the ABI in `src/utils/contracts.ts` after redeploying
2. **New pages** follow the Pages Router pattern under `src/pages/`
3. **Shared components** go in `src/components/`
4. **Page-specific components** stay co-located (e.g., `finance/cards/`, `p2e/components/`)
5. **All contract interactions** should follow the approve → execute → wait → toast → refresh pattern
6. **Guard all protected pages** with the `useGetIsOnboarded` hook
7. **Use Konsta UI components** (`Sheet`, `Block`, `Button`, etc.) for consistency
8. **Styling** uses Tailwind CSS — the config is wrapped with `konsta/config` for theme integration

# SHIELDRWA: The Guardian Architecture for Institutional RWAs

**ShieldRWA** is a policy-enforced settlement infrastructure built on **Mantle Network**. It bridges the $10T institutional capital gap by encoding compliance, custody, and accounting directly into the smart contract layer.

---

## Compliance Declaration
Regulated Assets Disclosure: ShieldRWA involves and manages regulated assets.

The project provides institutional-grade tokenization and settlement for the following asset classes:

US Treasury Bills (S-BILL): 3-Month sovereign debt, valued via Chainlink (Live).
Corporate Bonds (S-TECH): Investment-grade debt (e.g., Apple), valued via Pyth Network.
Invoice Factoring (S-INV4): SME trade receivables, valued via Trabal Attestations.
Commercial Real Estate (S-REIT): Luxury property yields (Miami), valued via EstatePro Oracle.
Compliance Framework: ShieldRWA is built on a "Policy-Driven" architecture. It implements mandatory on-chain compliance controls via the ComplianceVault smart account:

KYC/AML Registry: Entry gatekeeping where all users must pass identity verification before interacting with deposit or requestWithdrawal functions.
Jurisdictional Fencing: Real-time bytecode-level blocking and whitelisting (e.g., North Korea, Iran, Russia) via the restrictedJurisdictions mapping.
Tri-Layered Execution Pipeline: All withdrawals require (1) User Request, (2) COMPLIANCE_ROLE approval, and (3) OPS_ROLE finalization after a 24-hour mandatory timelock.




 ## One-Pager Pitch: ShieldRWA
The Problem: The $10T Institutional Lockdown
Regulated entities face four systemic barriers that make standard DeFi unusable:

Direct Custody Violations: Risk of "God Mode" admin keys rugging the treasury.
The Compliance Black Hole: Legal liability for sanction contamination (OFAC).
The Accounting Vacuum: Lack of GAAP-compliant reporting and ledger snapshots.
Capital Destruction: Emerging market erosion due to local currency devaluation and lack of USD yield access.
The Solution: The Guardian Architecture
ShieldRWA (built on Mantle Network) is a policy-enforced settlement engine that replaces human trust with Programmable Policy:

Programmable Custody: Our multi-role pipeline (GOV, OPS, CMP) ensures funds can ONLY be settled back to the original authorized account after regulatory sign-off.
NAV-Based Share Minting: Dynamic issuance tied to real-time valuation of both on-chain liquidity (USDC) and off-chain assets (RWA).
GAAP Ledger Generation: Built-in "Institutional Financial Inventory" that exports on-chain events into QuickBooks (.QBO), Monthly Statements (PDF), and Tax Form 1099 formats.

## Business Model
ShieldRWA operates on a sustainable institutional fee structure:

AUM Fee: Annual management fee (e.g., 0.5% - 1.5%) on Total Value Locked (TVL).
Withdrawal Fee: A default 10 bps (0.1%) fee on all settlements (capped at 5%).
Performance Fee: A carry percentage on yield generated above benchmarks.
Platform Licensing: Licensing the policy-driven smart account infrastructure to private institutional sub-networks.

## Roadmap
Q1 2026 (Launch Phase): Deployment on Mantle Mainnet with initial S-BILL and S-REIT vaults.
Q2 2026 (Asset Expansion): Underwriting for S-GOLD (Physical Gold) and S-SOLAR (Solar Farm Yield Fund).
Q3 2026 (Regional Scaling): Launching liquidity bridges for LATAM and SE Asia, focusing on logistics finance.
Q4 2026 (Fiat Integration): Direct settlement into traditional banking rails for instant institutional off-ramping.




## The $10T Problem: Why Institutions Are "Locked Out"

Regulated entities (Neobanks, Fund Managers, Corporate Treasuries) face four systemic barriers that make standard DeFi unusable:

1.  **Direct Custody Violations**: Regulated capital cannot exist in "God Mode" pools where a single admin key can rug the treasury.
2.  **The Compliance Black Hole**: Global entities are legally liable for where their money goes. One transfer to a sanctioned wallet (OFAC) results in total license revocation.
3.  **The Accounting Vacuum**: Blockchains emit hashes; auditors require GAAP-compliant line items, accrual reporting, and bank-grade statements.
4.  **Capital Destruction (FX & Erosion)**: Institutions in emerging markets lose 10-20% of their base capital annually to local currency devaluation while lacking access to high-quality USD yields.

---

## 🛡 The Multi-Layer Solution: ShieldRWA

ShieldRWA doesn't just "tokenize" assets; it **governs** them. We replace human trust with **Programmable Policy**.

### **Problem ➔ Solution Matrix**

| Institutional Pain Point | ShieldRWA Architectural Solution | Status |
| :--- | :--- | :--- |
| **Admin Hijack Risk** | **Multi-Role Pipeline**: Separates Compliance, Ops, and Governance. 24h Mandatory Time-locks on all exits. | ✅ **Solved** |
| **Sanction Contamination** | **On-Chain Jurisdiction Fencing**: Automated Kill-Switch based on regional whitelist/blocklist at the bytecode level. | ✅ **Solved** |
| **Audit Failures** | **GAAP Ledger Generation**: Built-in "Monthly Statement" export that translates on-chain events into corporate-ready PDF/QBO formats. | ✅ **Solved** |
| **Bank Run / Liquidity Risk** | **Dynamic Liquidity Buffers**: Specialized cash reserves (e.g. 10% for T-Bills, 30% for Real Estate) enforced by the contract. | ✅ **Solved** |
| **Share Dilution Exploits** | **NAV-Based Share Minting**: Dynamic share issuance tied to real-time asset valuation via Oracles. | ✅ **Solved** |
| **Stale Price Trading** | **Temporal Oracle Guards**: Automatic execution freeze if the Price Feed Heartbeat (Chainlink/Pyth) is older than 24 hours. | ✅ **Solved** |

---

## 🚀 Key Features (v4.0 Guardian Edition)

### **1. Programmable Custody (Non-Custodial)**
ShieldRWA uses a triple-layered execution pipeline. A withdrawal requires:
*   **Step 1**: User Request (Share locking).
*   **Step 2**: Compliance Approval (Regulatory sign-off).
*   **Step 3**: Operational Settlement (After 24h cooldown).
*   *Funds can ONLY be settled back to the original authorized account.*

### **2. Regional Fencing (Capital Control Management)**
While other protocols are "permissionless," ShieldRWA is **"Policy-Driven."** Compliance Officers can instantly block a specific jurisdiction (e.g. due to new sanctions) and the contract will refuse all interactions from that region's residents automatically.

### **3. The Institutional Financial Inventory**
Our dashboard provides a high-fidelity view of the underlying assets, including **Oracle Sources** and **Liquidity Depth**, ensuring that the CFO has a real-time view of their Net Asset Value (NAV).

---

## 🛠 Hardened Tech Stack

*   **Network**: [Mantle Sepolia](https://explorer.sepolia.mantle.xyz/address/0x4E036e3017b6c784c79553F3BD5dC3B103B6f6BB)
*   **Smart Contracts**: Solidity 0.8.20 + OpenZeppelin (AccessControl, Pausable, ReentrancyGuard).
*   **Oracles**: Integrated interfaces for Chainlink (US Benchmarks) and Proprietary Attestations (Real Estate/Invoices).
*   **Frontend**: React, Vite, Wagmi, Framer-Motion (Institutional Glassmorphism).

---

## 🏦 Institutional Workflow

1.  **KYC/Fencing**: User jurisdiction is mapped and validated.
2.  **Allocation**: Deploy idle cash into **S-BILL (Treasury)** or **S-REIT (Real Estate)**.
3.  **Governance**: Policy Engine manages risk parameters without touching user funds.
4.  **Accounting**: Export cross-chain activity into a bank-ready statement.

---

## 🏆 Mentorship Verdict

> "ShieldRWA has evolved from a DApp to a **Financial Primitive.** By encoding jurisdictional law and liquidity safety into the bytecode, they have built the first platform a bank can actually trust."

---

---

## 📁 Project Structure

```
ShieldRWA/
├── frontend/                    # React + Vite frontend application
│   ├── components/              # React components (Modals, Dashboard, etc.)
│   ├── pages/                   # Page components (Dashboard, Vaults, Reports, etc.)
│   ├── layouts/                 # Layout wrappers
│   ├── utils/                   # Utility functions (wagmi config, cn.js)
│   ├── App.jsx                  # Main React component
│   ├── main.jsx                 # React entry point
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS config
│   ├── package.json             # Frontend dependencies
│   └── *.css                    # Styling files
│
├── src/
│   └── contracts/               # Foundry smart contracts
│       └── ComplianceVault.sol  # Main institutional vault contract
│
├── script/                      # Foundry deployment scripts
│   ├── Deploy.s.sol             # Main deployment script
│   └── DeployComplianceVault.s.sol
│
├── test/                        # Foundry test files
│
├── lib/                         # External dependencies
│   ├── forge-std/               # Foundry standard library
│   └── openzeppelin/            # OpenZeppelin contracts
│
├── foundry.toml                 # Foundry configuration
├── README.md                    # This file
└── ComplianceVault.json         # Contract ABI/deployment info
```

---

### Getting Started

#### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

#### Smart Contract Development
```bash
# Build contracts
forge build

# Run tests
forge test

# Deploy to Mantle Sepolia
forge script script/DeployComplianceVault.s.sol --rpc-url https://rpc.sepolia.mantle.xyz --broadcast --verify
```

#### Environment Setup
Create `.env` file with:
```
PRIVATE_KEY=your_private_key
MANTLE_EXPLORER_KEY=your_explorer_api_key
```

---

## 📊 Architecture Overview

**ShieldRWA** combines:
- **Smart Contract Layer**: Compliance-enforced vault with multi-role governance
- **Frontend Layer**: React dashboard for institutional asset management
- **Deployment Layer**: Foundry scripts for mainnet & testnet deployments

---

**SHIELDRWA: WHERE REGULATION MEETS PERFORMANCE.**

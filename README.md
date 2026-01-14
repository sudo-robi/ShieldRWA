# SHIELDRWA: The Guardian Architecture for Institutional RWAs

**ShieldRWA** is a policy-enforced settlement infrastructure built on **Mantle Network**. It bridges the $10T institutional capital gap by encoding compliance, custody, and accounting directly into the smart contract layer.

---

## 🏛 The $10T Problem: Why Institutions Are "Locked Out"

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

### Getting Started

1.  **Clone**: `git clone https://github.com/your-repo/shieldrwa`
2.  **Install**: `npm install --legacy-peer-deps`
3.  **Env**: Add `PRIVATE_KEY` to `.env`.
4.  **Launch**: `npm run dev`

**SHIELDRWA: WHERE REGULATION MEETS PERFORMANCE.**

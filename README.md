# Crypto Merchant POS

A modern, non-custodial Web3 Point of Sale (POS) and invoicing dApp built with **Next.js**, **Tailwind CSS**, and **Wagmi/Viem**. It enables physical and online merchants to accept direct, peer-to-peer stablecoin payments (USDT/USDC) with zero intermediary fees and instant on-chain settlement.

## Key Highlights

- **100% Non-Custodial:** Payments flow directly from the customer's wallet to the merchant's address. No funds are ever held by the platform.
- **Zero Intermediary Fees:** Eliminates the 1.5%–3.5% payment gateway processing cut.
- **EIP-681 Dynamic QR Invoicing:** Generates standard Ethereum URI QR codes containing pre-filled target contract, recipient address, and precise token values to prevent manual user input errors.
- **Real-Time Settlement Listener:** Automated UI status synchronization (`Pending` → `Broadcasting` → `Confirmed`) via RPC/event watchers.
- **Dual Security Model Ready:** Supports both direct Cold Wallet settlement (watch-only POS) and Hot Wallet sweeping mechanisms for secure physical retail environments.
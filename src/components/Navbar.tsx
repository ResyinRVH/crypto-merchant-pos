'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight text-white">
                <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    Logo
                </span>
            </div>
            <ul className="hidden md:flex items-center gap-8 text-sm font-normal text-white/50">
                <Link href="/#home" className="text-white transition-colors">Home</Link>
                <Link href="/#features" className="hover:text-white transition-colors">
                    Features
                </Link>
                <Link href="/#docs" className="hover:text-white transition-colors">
                    Docs
                </Link>
                <Link href="/merchant/dashboard" className="hover:text-white transition-colors">
                    Merchant
                </Link>
            </ul>

            <div>
                <ConnectButton.Custom>
                    {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted,
                    }) => {
                        const ready = mounted && authenticationStatus !== 'loading'
                        const connected =
                            ready &&
                            account &&
                            chain &&
                            (!authenticationStatus || authenticationStatus === 'authenticated')

                        return (
                            <div
                                {...(!ready && {
                                    'aria-hidden': true,
                                    style: {
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        userSelect: 'none',
                                    },
                                })}
                            >
                                {(() => {
                                    if (!connected) {
                                        return (
                                            <button
                                                onClick={openConnectModal}
                                                type="button"
                                                className="bg-[#FC5E00] hover:bg-[#FF7315] text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[2px_2px_20px_rgba(252,94,0,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                                            >
                                                Connect Wallet
                                            </button>
                                        )
                                    }

                                    if (chain.unsupported) {
                                        return (
                                            <button
                                                onClick={openChainModal}
                                                type="button"
                                                className="bg-red-600 hover:bg-red-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
                                            >
                                                Wrong Network
                                            </button>
                                        )
                                    }

                                    return (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={openChainModal}
                                                type="button"
                                                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200 hover:bg-white/10 transition backdrop-blur-md cursor-pointer"
                                            >
                                                {chain.hasIcon && (
                                                    <div
                                                        style={{
                                                            background: chain.iconBackground,
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: 999,
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        {chain.iconUrl && (
                                                            <img
                                                                alt={chain.name ?? 'Chain icon'}
                                                                src={chain.iconUrl}
                                                                style={{ width: 16, height: 16 }}
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                                <span>{chain.name}</span>
                                            </button>

                                            <button
                                                onClick={openAccountModal}
                                                type="button"
                                                className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-medium text-white hover:bg-white/10 transition backdrop-blur-md shadow-sm cursor-pointer"
                                            >
                                                {account.displayName}
                                            </button>
                                        </div>
                                    )
                                })()}
                            </div>
                        )
                    }}
                </ConnectButton.Custom>
            </div>
        </nav>
    )
}
'use client'

import { Wallet, Info } from 'lucide-react'

interface BalanceCardProps {
  availableBalance: string
}

export default function BalanceCard({ availableBalance }: BalanceCardProps) {
  return (
    <div className="lg:col-span-5 space-y-4">
      <div className="bg-[#03000A] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <span className="text-xs uppercase font-medium text-white/50 tracking-wider">
            Balance
          </span>
          <div className="w-8 h-8 rounded-xl bg-[#FC5E00]/10 flex items-center justify-center text-[#FC5E00]">
            <Wallet className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black font-mono text-white">{availableBalance}</span>
          <span className="text-sm font-bold text-[#FC5E00]">USDT</span>
        </div>

        <div className="pt-2 border-t border-white/5 space-y-2 text-xs text-white/60">
          <div className="flex justify-between py-1">
            <span>Network</span>
            <span className="text-white font-mono">Base Sepolia</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Estimated Gas Costs</span>
            <span className="text-white font-mono">&lt; 0.0001 ETH</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Confirmation Time</span>
            <span className="text-emerald-400 font-semibold">~2 Detik</span>
          </div>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex gap-3 text-xs text-white/50 leading-relaxed">
        <Info className="w-4 h-4 text-[#FC5E00] shrink-0 mt-0.5" />
        <span>
          Pastikan alamat tujuan mendukung token ERC-20 pada jaringan Base. Pengiriman ke alamat yang salah tidak dapat dibatalkan secara on-chain.
        </span>
      </div>
    </div>
  )
}
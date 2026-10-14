'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Wallet, Info } from 'lucide-react'

export default function WithdrawPage() {
  const [withdrawAddress, setWithdrawAddress] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const availableBalance = '25.25'

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    if (!withdrawAddress || !withdrawAmount) return
    alert(`Memproses transfer on-chain ${withdrawAmount} USDT ke ${withdrawAddress}`)
  }

  const handleSetMax = () => {
    setWithdrawAmount(availableBalance)
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Withdraw</h1>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-[#03000A] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-xl">
          <form onSubmit={handleWithdraw} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs text-white/70">Wallet Address</Label>
              <Input
                placeholder="0x..."
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                className="bg-[#03000A] border-white/10 text-white rounded-xl h-12 text-xs font-mono placeholder:text-white/20 focus-visible:ring-[#FC5E00]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-xs text-white/70">Nominal (USDT)</Label>
                <button
                  type="button"
                  onClick={handleSetMax}
                  className="text-[11px] font-semibold text-[#FC5E00] hover:text-[#FF7315] cursor-pointer"
                >
                  Tarik Semua (Max)
                </button>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="bg-[#03000A] border-white/10 text-white rounded-xl h-12 text-xs font-mono pr-16 placeholder:text-white/20 focus-visible:ring-[#FC5E00]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-white/40 pointer-events-none">
                  USDT
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FC5E00] hover:bg-[#FF7315] text-white font-semibold rounded-xl h-12 transition-all duration-200 shadow-[0_4px_20px_rgba(252,94,0,0.35)] cursor-pointer"
            >
              Kirim ke Cold Wallet
            </Button>
          </form>
        </div>

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
      </div>
    </div>
  )
}
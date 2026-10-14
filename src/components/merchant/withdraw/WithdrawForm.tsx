'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface WithdrawFormProps {
  withdrawAddress: string
  setWithdrawAddress: (val: string) => void
  withdrawAmount: string
  setWithdrawAmount: (val: string) => void
  onSetMax: () => void
  onSubmit: (e: React.FormEvent) => void
}

export default function WithdrawForm({
  withdrawAddress,
  setWithdrawAddress,
  withdrawAmount,
  setWithdrawAmount,
  onSetMax,
  onSubmit,
}: WithdrawFormProps) {
  return (
    <div className="lg:col-span-7 bg-[#03000A] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-xl">
      <form onSubmit={onSubmit} className="space-y-6">
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
              onClick={onSetMax}
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
  )
}
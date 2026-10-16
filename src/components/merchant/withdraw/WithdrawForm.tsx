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
  isPending?: boolean 
  isConfirming?: boolean
}

export default function WithdrawForm({
  withdrawAddress,
  setWithdrawAddress,
  withdrawAmount,
  setWithdrawAmount,
  onSetMax,
  onSubmit,
  isPending = false,
  isConfirming = false,
}: WithdrawFormProps) {
  const isLoading = isPending || isConfirming
  const isFormValid = Boolean(withdrawAddress && withdrawAmount && Number(withdrawAmount) > 0)

  return (
    <div className="lg:col-span-7 bg-[#03000A] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-xl">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label className="text-xs text-white/70">Wallet Address</Label>
          <Input
            placeholder="0x..."
            value={withdrawAddress}
            disabled={isLoading}
            onChange={(e) => setWithdrawAddress(e.target.value)}
            className="bg-[#03000A] border-white/10 text-white rounded-xl h-12 text-xs font-mono placeholder:text-white/20 focus-visible:ring-[#FC5E00] disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-white/70">Nominal (USDT)</Label>
            <button
              type="button"
              onClick={onSetMax}
              disabled={isLoading}
              className="text-[11px] font-semibold text-[#FC5E00] hover:text-[#FF7315] disabled:opacity-50 cursor-pointer"
            >
              Tarik Semua (Max)
            </button>
          </div>
          <div className="relative">
            <Input
              type="number"
              step="any"
              min="0"
              placeholder="0.00"
              value={withdrawAmount}
              disabled={isLoading}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="bg-[#03000A] border-white/10 text-white rounded-xl h-12 text-xs font-mono pr-16 placeholder:text-white/20 focus-visible:ring-[#FC5E00] disabled:opacity-50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-white/40 pointer-events-none">
              USDT
            </span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full bg-[#FC5E00] hover:bg-[#FF7315] disabled:bg-neutral-800 disabled:text-white/40 text-white font-semibold rounded-xl h-12 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
        >
          {isPending
            ? 'Konfirmasi di MetaMask...'
            : isConfirming
            ? 'Memproses On-Chain...'
            : 'Kirim ke Cold Wallet'}
        </Button>
      </form>
    </div>
  )
}
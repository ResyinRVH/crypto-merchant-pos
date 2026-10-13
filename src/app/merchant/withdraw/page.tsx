'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function WithdrawPage() {
  const [withdrawAddress, setWithdrawAddress] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    if (!withdrawAddress || !withdrawAmount) return
    alert(`Memproses transfer on-chain ${withdrawAmount} USDT ke ${withdrawAddress}`)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Tarik Saldo Toko</h1>
        <p className="text-xs text-white/50 mt-1">
          Pindahkan saldo USDT kasir langsung ke cold wallet atau dompet pribadi pemilik.
        </p>
      </div>

      <div className="bg-[#12131A] border border-white/10 rounded-2xl p-8 shadow-xl">
        <form onSubmit={handleWithdraw} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-xs text-white/70">Alamat Dompet Tujuan</Label>
            <Input
              placeholder="0x..."
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              className="bg-white/5 border-white/10 text-white rounded-xl h-11 text-xs font-mono placeholder:text-white/20 focus-visible:ring-[#FC5E00]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-white/70">Nominal (USDT)</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="Contoh: 50.00"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="bg-white/5 border-white/10 text-white rounded-xl h-11 text-xs font-mono placeholder:text-white/20 focus-visible:ring-[#FC5E00]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FC5E00] hover:bg-[#FF7315] text-white font-semibold rounded-xl h-11 transition cursor-pointer mt-4"
          >
            Kirim ke Cold Wallet
          </Button>
        </form>
      </div>
    </div>
  )
}
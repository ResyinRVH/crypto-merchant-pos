'use client'

import { useState } from 'react'
import WithdrawForm from '@/components/merchant/withdraw/WithdrawForm'
import BalanceCard from '@/components/merchant/withdraw/BalanceCard'

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
        <WithdrawForm
          withdrawAddress={withdrawAddress}
          setWithdrawAddress={setWithdrawAddress}
          withdrawAmount={withdrawAmount}
          setWithdrawAmount={setWithdrawAmount}
          onSetMax={handleSetMax}
          onSubmit={handleWithdraw}
        />

        <BalanceCard availableBalance={availableBalance} />
      </div>
    </div>
  )
}
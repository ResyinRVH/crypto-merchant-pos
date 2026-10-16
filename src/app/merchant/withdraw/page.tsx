'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatUnits, parseUnits } from 'viem'
import WithdrawForm from '@/components/merchant/withdraw/WithdrawForm'
import BalanceCard from '@/components/merchant/withdraw/BalanceCard'
import { USDC_ADDRESS, ERC20_ABI } from '@/constants/contracts'

export default function WithdrawPage() {
  const [withdrawAddress, setWithdrawAddress] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [availableBalance, setAvailableBalance] = useState('0.00')

  const { address: merchantAddress, isConnected } = useAccount()

  const { data: rawBalance, isSuccess, refetch: refetchBalance } = useReadContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: merchantAddress ? [merchantAddress] : undefined,
    query: {
      enabled: Boolean(isConnected && merchantAddress),
      refetchInterval: 5000,
    },
  })

  useEffect(() => {
    if (isSuccess && rawBalance !== undefined) {
      const formatted = formatUnits(rawBalance, 6)
      setAvailableBalance(Number(formatted).toFixed(2))
    }
  }, [rawBalance, isSuccess])

  const { data: hash, isPending, writeContract } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, })

  useEffect(() => {
    if (isConfirmed) {
      refetchBalance()
      setWithdrawAmount('')
      alert('Penarikan dana berhasil')
    }
  }, [isConfirmed, refetchBalance])

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    if (!withdrawAddress || !withdrawAmount) return

    const amountInUnits = parseUnits(withdrawAmount, 6)

    writeContract({
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'transfer',
      args: [withdrawAddress as `0x${string}`, amountInUnits],
    })
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
'use client'

import { Wallet, Info } from 'lucide-react'
import { useAccount, useGasPrice } from 'wagmi'
import { useState, useEffect, useMemo } from 'react'
import { formatEther } from 'viem'

interface BalanceCardProps {
  availableBalance: string
}

const BLOCK_TIME_BY_CHAIN: Record<number, string> = {
  8453: '~2 Detik',   
  84532: '~2 Detik',
  11155111: '~12 Detik',
  1: '~12 Detik',   
  42161: '~0.25 Detik',
  10: '~2 Detik',
}
export default function BalanceCard({ availableBalance }: BalanceCardProps) {
  const { chain, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  const { data: gasPrice } = useGasPrice({
    query: {
      refetchInterval: 10000,
      enabled: isConnected,
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const estimatedGasText = useMemo(() => {
    if (!gasPrice || !isConnected) return '< 0.0001 ETH'
    try {
      const estimatedUnits = BigInt(65000)
      const totalGasWei = gasPrice * estimatedUnits
      const ethValue = parseFloat(formatEther(totalGasWei))

      if (ethValue < 0.00001) {
        return '< 0.00001 ETH'
      }
      return `${ethValue.toFixed(5)} ETH`
    } catch {
      return '< 0.0001 ETH'
    }
  }, [gasPrice, isConnected])

  const confirmationTime = useMemo(() => {
    if (!chain?.id) return '~2 Detik'
    return BLOCK_TIME_BY_CHAIN[chain.id] ?? '~2-5 Detik'
  }, [chain?.id])

  const networkName = mounted && isConnected && chain ? chain.name : 'Not Connected'

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
          <span className="text-sm font-bold text-[#FC5E00]">USDC</span>
        </div>

        <div className="pt-2 border-t border-white/5 space-y-2 text-xs text-white/60">
          <div className="flex justify-between py-1">
            <span>Network</span>
            <span className="text-white font-mono">{networkName}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Estimated Gas Costs</span>
            <span className="text-white font-mono">{mounted ? estimatedGasText : '< 0.0001 ETH'}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Confirmation Time</span>
            <span className="text-emerald-400 font-semibold">{mounted ? confirmationTime : '~2 Detik'}</span>
          </div>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex gap-3 text-xs text-white/50 leading-relaxed">
        <Info className="w-4 h-4 text-[#FC5E00] shrink-0 mt-0.5" />
        <span>
          Pastikan alamat tujuan mendukung token ERC-20 pada jaringan {''} {mounted && chain?.name ? chain.name : 'terkait'}. Pengiriman ke alamat yang salah tidak dapat dibatalkan secara on-chain.
        </span>
      </div>
    </div>
  )
}
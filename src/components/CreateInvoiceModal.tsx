'use client'

import { useState } from 'react'
import { generateERC681URI } from '@/utils/Inovice.ts'

const USDT_TESTNET_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  merchantAddress: `0x${string}`
  onInvoiceCreated: (data: { title: string; amount: string; uri: string }) => void
}

export default function CreateInvoiceModal({
  isOpen,
  onClose,
  merchantAddress,
  onInvoiceCreated,
}: ModalProps) {
  const [itemName, setItemName] = useState('')
  const [amount, setAmount] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0) return

    const uri = generateERC681URI({
      merchantAddress,
      usdtAmount: amount,
      chainId: 84532, // Base Sepolia
      usdtContractAddress: USDT_TESTNET_ADDRESS,
    })

    onInvoiceCreated({ title: itemName, amount, uri })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#13141b] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <h3 className="text-lg font-bold text-white">Create New Invoice</h3>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">
              Item / Deskripsi Pesanan
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Kopi Latte"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FC5E00]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">
              Nominal (USDT)
            </label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="Contoh: 12.50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FC5E00]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#FC5E00] hover:bg-[#FF7315] text-white font-bold py-3 rounded-xl shadow-[2px_2px_15px_rgba(252,94,0,0.35)] transition-all cursor-pointer"
            >
              Generate Payment Payload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
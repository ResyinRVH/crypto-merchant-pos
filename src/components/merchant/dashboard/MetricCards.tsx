'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, Receipt, ShieldCheck } from 'lucide-react'

interface MetricCardsProps {
  activeFilter?: string
}

export default function MetricCards({ activeFilter }: MetricCardsProps) {
  const [omzet, setOmzet] = useState('25.25')
  const [paidInvoicesCount, setPaidInvoicesCount] = useState(3)

  useEffect(() => {
    const stored = localStorage.getItem('pos_invoices')
    if (stored) {
      try {
        const list = JSON.parse(stored)
        if (Array.isArray(list) && list.length > 0) {
          const total = list.reduce(
            (acc: number, item: { amount?: string | number }) =>
              acc + (Number(item.amount) || 0),
            0
          )
          setOmzet(total.toFixed(2))
          setPaidInvoicesCount(list.length)
        }
      } catch (err) {
        console.error('Gagal membaca pos_invoices untuk metric cards:', err)
      }
    }
  }, [activeFilter])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="bg-[#03000A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <span className="text-xs uppercase font-medium text-white/50 tracking-wider">
            Omzet Token Harian
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-white">{omzet}</span>
            <span className="text-xs font-bold text-white/70">USDT</span>
          </div>
        </div>
        <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-[#03000A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <span className="text-xs uppercase font-medium text-white/50 tracking-wider">
            Faktur Terbayar Hari Ini
          </span>
          <div className="text-3xl font-black font-mono text-white">{paidInvoicesCount}</div>
        </div>
        <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60">
          <Receipt className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-[#03000A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <span className="text-xs uppercase font-medium text-white/50 tracking-wider">
            Metode Settlement
          </span>
          <div className="text-xl font-bold text-emerald-400">
            Non-Custodial (Direct)
          </div>
        </div>
        <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
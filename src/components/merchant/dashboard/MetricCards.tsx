'use client'

import { useState } from 'react'
import { ArrowUpRight, Receipt, ShieldCheck } from 'lucide-react'

const TIME_FILTERS = ['Yesterday', 'Last 7 days', 'Last 30 days', 'Last 12 month']

export default function MetricCards() {
  const [activeFilter, setActiveFilter] = useState('Yesterday')

  return (
    <div className="space-y-6">
      <div className="flex justify-start">
        <div className="inline-flex items-center gap-1 bg-[#12141D] border border-white/10 p-1.5 rounded-2xl shadow-lg">
          {TIME_FILTERS.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-black text-white shadow-md border border-white/10'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#03000A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2">
            <span className="text-xs uppercase font-medium text-white/50 tracking-wider">
              Omzet Token Harian
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-white">25.25</span>
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
            <div className="text-3xl font-black font-mono text-white">3</div>
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
    </div>
  )
}
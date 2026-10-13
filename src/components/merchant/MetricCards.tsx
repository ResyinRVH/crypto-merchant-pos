import { ArrowUpRight, Receipt, ShieldCheck } from 'lucide-react'

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="bg-[#12131A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
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

      <div className="bg-[#12131A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
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

      <div className="bg-[#12131A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
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
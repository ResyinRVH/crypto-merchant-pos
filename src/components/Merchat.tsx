'use client'

import { useState } from 'react'
import { useConnection } from 'wagmi'

interface PaidInvoice {
  id: string
  title: string
  amount: string
  date: string
  txHash: string
}

export default function Merchant() {
  const { isConnected, address } = useConnection()
  const [invoices] = useState<PaidInvoice[]>([
    {
      id: 'INV-001',
      title: 'Kopi Latte',
      amount: '12.50',
      date: 'Hari ini, 14:20',
      txHash: '0x3a1b...89f2',
    },
    {
      id: 'INV-002',
      title: 'Croissant Butter',
      amount: '4.75',
      date: 'Hari ini, 11:05',
      txHash: '0x7c9e...44a1',
    },
    {
      id: 'INV-003',
      title: 'Espresso Double',
      amount: '8.00',
      date: 'Hari ini, 09:30',
      txHash: '0x1d2f...bb09',
    },
  ])

  const [withdrawAddress, setWithdrawAddress] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const dailyTurnover = invoices.reduce((sum, item) => sum + parseFloat(item.amount), 0)
  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    if (!withdrawAddress || !withdrawAmount) return

    setIsProcessing(true)
    setTimeout(() => {
      alert(`Permintaan transfer ${withdrawAmount} USDT ke ${withdrawAddress} sedang diproses.`)
      setIsProcessing(false)
      setWithdrawAmount('')
    }, 1000)
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 text-white">
      <div className="border-b border-white/10 pb-6 mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Merchant Portal</h1>
          <p className="text-sm text-white/60 mt-1">
            Pantau omzet harian, riwayat pembayaran faktur, dan kelola penarikan dana kasir.
          </p>
        </div>

        {isConnected && address && (
          <div className="bg-[#13141b] border border-white/10 px-4 py-2 rounded-xl text-xs font-mono text-white/70">
            Merchant: <span className="text-[#FC5E00]">{address.slice(0, 6)}...{address.slice(-4)}</span>
          </div>
        )}
      </div>

      {!isConnected ? (
        <div className="bg-[#13141b] border border-white/10 rounded-2xl p-8 text-center max-w-lg mx-auto mt-12">
          <h3 className="text-lg font-bold">Dompet Belum Terhubung</h3>
          <p className="text-sm text-white/60 mt-2">
            Silakan hubungkan dompet merchant melalui tombol di atas untuk mengakses data omzet dan faktur.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#13141b] border border-white/10 p-6 rounded-2xl">
              <span className="text-xs text-white/50 uppercase tracking-wider">Omzet Token Harian</span>
              <p className="text-3xl font-extrabold text-[#FC5E00] mt-2">
                {dailyTurnover.toFixed(2)} <span className="text-sm font-semibold text-white">USDT</span>
              </p>
            </div>

            <div className="bg-[#13141b] border border-white/10 p-6 rounded-2xl">
              <span className="text-xs text-white/50 uppercase tracking-wider">Faktur Terbayar Hari Ini</span>
              <p className="text-3xl font-extrabold text-white mt-2">{invoices.length}</p>
            </div>

            <div className="bg-[#13141b] border border-white/10 p-6 rounded-2xl">
              <span className="text-xs text-white/50 uppercase tracking-wider">Metode Settlement</span>
              <p className="text-xl font-bold text-emerald-400 mt-2">Non-Custodial (Direct)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-[#13141b] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <h2 className="text-lg font-bold">Riwayat Faktur Terbayar</h2>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  Status: Settled
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase text-white/40 border-b border-white/5">
                    <tr>
                      <th className="pb-3 font-semibold">ID / Item</th>
                      <th className="pb-3 font-semibold">Waktu</th>
                      <th className="pb-3 font-semibold">Nominal</th>
                      <th className="pb-3 font-semibold text-right">Bukti Tx</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-white/[0.02] transition">
                        <td className="py-3.5">
                          <p className="font-semibold text-white">{inv.title}</p>
                          <p className="text-xs font-mono text-white/40">{inv.id}</p>
                        </td>
                        <td className="py-3.5 text-xs text-white/60">{inv.date}</td>
                        <td className="py-3.5 font-bold text-white">
                          +{inv.amount} <span className="text-xs text-[#FC5E00]">USDT</span>
                        </td>
                        <td className="py-3.5 text-right font-mono text-xs text-white/50 hover:text-[#FC5E00] cursor-pointer">
                          {inv.txHash} ↗
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:col-span-4 bg-[#13141b] border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-1">Tarik Saldo Toko</h2>
              <p className="text-xs text-white/60 mb-5 leading-relaxed">
                Pindahkan saldo USDT kasir langsung ke cold wallet atau dompet pribadi pemilik.
              </p>

              <form onSubmit={handleWithdraw} className="space-y-4">
                <div>
                  <label className="block text-xs text-white/70 mb-1">Alamat Dompet Tujuan</label>
                  <input
                    type="text"
                    required
                    placeholder="0x..."
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#FC5E00]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/70 mb-1">Nominal (USDT)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="Contoh: 50.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FC5E00]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#FC5E00] hover:bg-[#FF7315] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition text-sm cursor-pointer shadow-[2px_2px_15px_rgba(252,94,0,0.35)] mt-2"
                >
                  {isProcessing ? 'Memproses...' : 'Tarik ke Cold Wallet'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
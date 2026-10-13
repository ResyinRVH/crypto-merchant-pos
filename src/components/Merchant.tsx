'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { 
  LayoutDashboard, 
  Receipt, 
  Wallet, 
  ArrowUpRight, 
  PlusCircle, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Store,
  Layers,
  Settings,
  HelpCircle,
  Bell
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function MerchantDashboardPage() {
  const { address: merchantAddress, isConnected } = useAccount()
  const [withdrawAddress, setWithdrawAddress] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const transactions = [
    {
      id: 'INV-001',
      title: 'Kopi Latte',
      time: 'Hari ini, 14:20',
      amount: '+12.50',
      txHash: '0x3a1b...89f2',
      status: 'Settled',
    },
    {
      id: 'INV-002',
      title: 'Croissant Butter',
      time: 'Hari ini, 11:05',
      amount: '+4.75',
      txHash: '0x7c9e...44a1',
      status: 'Settled',
    },
    {
      id: 'INV-003',
      title: 'Espresso Double',
      time: 'Hari ini, 09:12',
      amount: '+8.00',
      txHash: '0x1d4a...55e3',
      status: 'Settled',
    },
  ]

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    if (!withdrawAddress || !withdrawAmount) return
    alert(`Memproses transfer on-chain ${withdrawAmount} USDT ke ${withdrawAddress}`)
  }

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-white flex">
      <aside className="w-64 border-r border-white/10 bg-[#0E1017] flex flex-col justify-between shrink-0 hidden md:flex sticky top-0 h-screen">
        <div className="p-6 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FC5E00]/10 border border-[#FC5E00]/30 flex items-center justify-center text-[#FC5E00] shadow-[0_0_15px_rgba(252,94,0,0.2)]">
              <Store className="w-5 h-5 text-[#FC5E00]" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block">
                Arsa POS
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                Merchant Core
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-white/30 px-3 font-semibold block mb-2">
              Menu Utama
            </span>
            <Link
              href="/merchant"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#FC5E00]/10 text-[#FC5E00] font-semibold text-xs transition border border-[#FC5E00]/20"
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <Link
              href="/create-invoice"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium text-xs transition"
            >
              <div className="flex items-center gap-3">
                <Receipt className="w-4 h-4" /> POS Terminal
              </div>
              <PlusCircle className="w-3.5 h-3.5 text-[#FC5E00]" />
            </Link>
            <a
              href="#withdraw-section"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium text-xs transition"
            >
              <Wallet className="w-4 h-4" /> Tarik Saldo
            </a>
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium text-xs transition"
            >
              <Layers className="w-4 h-4" /> Beranda Publik
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-white/10 space-y-4">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-white/40 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Non-Custodial Mode
            </span>
            <p className="text-[11px] font-mono text-white/70 truncate">
              {merchantAddress || '0x9E91...D0B8'}
            </p>
          </div>
          <div className="text-[11px] text-white/40 flex items-center justify-between px-1">
            <span>Base Sepolia</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/10 px-6 lg:px-10 flex items-center justify-between bg-[#0E1017]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40">Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <span className="text-xs font-semibold text-white">Merchant Portal</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/create-invoice">
              <Button className="bg-[#FC5E00] hover:bg-[#FF7315] text-white font-semibold text-xs rounded-xl h-9 px-4 gap-1.5 shadow-[0_0_15px_rgba(252,94,0,0.3)]">
                <PlusCircle className="w-3.5 h-3.5" /> Buat Faktur Baru
              </Button>
            </Link>
            <div className="h-4 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-mono text-white/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {merchantAddress
                ? `${merchantAddress.slice(0, 6)}...${merchantAddress.slice(-4)}`
                : '0x9E91...D0B8'}
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-10 space-y-8 flex-1 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Merchant Portal</h1>
            <p className="text-xs text-white/50 mt-1">
              Pantau omzet harian, riwayat pembayaran faktur, dan kelola penarikan dana kasir toko.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#12131A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="space-y-2">
                <span className="text-xs uppercase font-medium text-white/50 tracking-wider">
                  Omzet Token Harian
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono text-[#FC5E00]">25.25</span>
                  <span className="text-xs font-bold text-white/70">USDT</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#FC5E00]/10 flex items-center justify-center text-[#FC5E00]">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-[#12131A] border border-white/10 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-base font-bold text-white">Riwayat Faktur Terbayar</h2>
                  <p className="text-xs text-white/40 mt-0.5">Transaksi instan di jaringan Base Sepolia</p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[11px] font-semibold">
                  Status: Settled
                </Badge>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-[11px] uppercase tracking-wider text-white/40">ID / Item</TableHead>
                      <TableHead className="text-[11px] uppercase tracking-wider text-white/40">Waktu</TableHead>
                      <TableHead className="text-[11px] uppercase tracking-wider text-white/40">Nominal</TableHead>
                      <TableHead className="text-[11px] uppercase tracking-wider text-white/40 text-right">Bukti TX</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id} className="border-white/5 hover:bg-white/[0.02]">
                        <TableCell className="py-3.5">
                          <div className="font-semibold text-white text-xs">{tx.title}</div>
                          <div className="text-[10px] font-mono text-white/40">{tx.id}</div>
                        </TableCell>
                        <TableCell className="text-xs text-white/60">{tx.time}</TableCell>
                        <TableCell className="text-xs font-mono font-bold text-white">
                          {tx.amount} <span className="text-[#FC5E00] text-[10px]">USDT</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <a
                            href={`https://sepolia.basescan.org/tx/${tx.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-white/50 hover:text-[#FC5E00] transition"
                          >
                            {tx.txHash} <ExternalLink className="w-3 h-3" />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div id="withdraw-section" className="lg:col-span-4 bg-[#12131A] border border-white/10 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-base font-bold text-white">Tarik Saldo Toko</h2>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">
                  Pindahkan saldo USDT kasir langsung ke cold wallet atau dompet pribadi pemilik.
                </p>
              </div>

              <form onSubmit={handleWithdraw} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/70">Alamat Dompet Tujuan</Label>
                  <Input
                    placeholder="0x..."
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    className="bg-white/5 border-white/10 text-white rounded-xl h-11 text-xs font-mono placeholder:text-white/20 focus-visible:ring-[#FC5E00]"
                  />
                </div>

                <div className="space-y-1.5">
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
                  className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl h-11 transition cursor-pointer border border-white/10 mt-2"
                >
                  Kirim ke Cold Wallet
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
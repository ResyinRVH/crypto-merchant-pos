'use client'

import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface StoredInvoice {
  id: string
  customerName?: string
  tableNumber?: string
  items?: { name: string; qty: number; price: number }[]
  amount: string
  status?: string
  createdAt?: string
  txHash?: string
}

const DEFAULT_TRANSACTIONS = [
  {
    id: 'INV-001',
    title: 'Kopi Latte',
    time: 'Hari ini, 14:20',
    amount: '+12.50',
    txHash: '0x3a1b...89f2',
  },
  {
    id: 'INV-002',
    title: 'Croissant Butter',
    time: 'Hari ini, 11:05',
    amount: '+4.75',
    txHash: '0x7c9e...44a1',
  },
  {
    id: 'INV-003',
    title: 'Espresso Double',
    time: 'Hari ini, 09:12',
    amount: '+8.00',
    txHash: '0x1d4a...55e3',
  },
]

export default function TransactionTable() {
  const [mounted, setMounted] = useState(false)
  const [transactions, setTransactions] = useState(DEFAULT_TRANSACTIONS)

  const tableHeadText = [
    { id: 1, text: 'Invoice' },
    { id: 2, text: 'Waktu' },
    { id: 3, text: 'Nominal' },
    { id: 4, text: 'Bukti TX' },
  ]

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('pos_invoices')
    if (stored) {
      try {
        const parsed: StoredInvoice[] = JSON.parse(stored)
        if (parsed.length > 0) {
          const mapped = parsed.map((inv) => {
            const dateObj = inv.createdAt ? new Date(inv.createdAt) : new Date()
            const timeStr = isNaN(dateObj.getTime())
              ? 'Baru saja'
              : `${dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}, ${dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`

            const titleStr =
              inv.items && inv.items.length > 0
                ? inv.items.map((i) => i.name).slice(0, 2).join(', ')
                : 'Pesanan POS'

            return {
              id: inv.id,
              title: titleStr,
              time: timeStr,
              amount: `+${Number(inv.amount).toFixed(2)}`,
              txHash: inv.txHash || '0x' + inv.id.replace('INV-', '') + '...mock',
              customerInfo: `Meja ${inv.tableNumber || '-'} (${inv.customerName || 'Guest'})`,
            }
          })
          setTransactions(mapped)
        }
      } catch (err) {
        console.error('Gagal membaca data transaksi dari localStorage:', err)
      }
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-[#03000A] border border-white/10 rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-base font-bold text-white">Riwayat Faktur Terbayar</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-white/10">
              {tableHeadText.map((txt) => (
                <TableHead key={txt.id} className="text-white/60">
                  {txt.text}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-white/5 border-white/5">
                <TableCell className="py-3.5">
                  <div className="font-semibold text-white">{tx.title}</div>
                  <div className="text-[11px] font-mono text-white/40">
                    {tx.id} {'customerInfo' in tx && `• ${tx.customerInfo}`}
                  </div>
                </TableCell>
                <TableCell className="text-white/70">{tx.time}</TableCell>
                <TableCell className="font-mono font-bold text-white">
                  {tx.amount} <span className="text-white/50 text-xs font-normal">USDT</span>
                </TableCell>
                <TableCell>
                  <a
                    href={`https://sepolia.basescan.org/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-emerald-400 hover:text-emerald-300 transition"
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
  )
}
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
import { isDateInFilterRange } from '@/utils/dateFilter'

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

interface TransactionItem {
  id: string
  title: string
  time: string
  amount: string
  txHash: string
  customerInfo?: string
  createdAt?: string
}

interface TransactionTableProps {
  activeFilter?: string
}

export default function TransactionTable({ activeFilter = 'Today' }: TransactionTableProps) {
  const [mounted, setMounted] = useState(false)
  const [transactions, setTransactions] = useState<TransactionItem[]>([])

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
        if (Array.isArray(parsed) && parsed.length > 0) {
          const filtered = parsed.filter((inv) =>
            isDateInFilterRange(inv.createdAt, activeFilter)
          )
          const mapped: TransactionItem[] = filtered.map((inv) => {
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
              createdAt: inv.createdAt,
            }
          })

          setTransactions(mapped)
        } else {
          setTransactions([])
        }
      } catch (err) {
        console.error('Gagal membaca data transaksi dari localStorage:', err)
        setTransactions([])
      }
    } else {
      setTransactions([])
    }
  }, [activeFilter])

  if (!mounted) return null

  return (
    <div className="bg-[#03000A] border border-white/10 rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-base font-bold text-white">
            Riwayat Faktur Terbayar ({activeFilter})
          </h2>
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
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-white/5 border-white/5">
                  <TableCell className="py-3.5">
                    <div className="font-semibold text-white">{tx.title}</div>
                    <div className="text-[11px] font-mono text-white/40">
                      {tx.id} {tx.customerInfo && `• ${tx.customerInfo}`}
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-white/40 text-xs">
                  Tidak ada transaksi pada periode ini
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
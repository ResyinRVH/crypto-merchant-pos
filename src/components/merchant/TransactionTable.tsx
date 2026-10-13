import { ExternalLink } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function TransactionTable() {
  const transactions = [
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

  const tableHeadText = [
    { 
      id:1,
      text: "Invoice" },
    { 
      id:2,
      text: "Waktu" },
    { 
      id:3,
      text: "Nominal" },
    { text: "Bukti TX" },
  ]

  return (
    <div className="bg-[#12131A] rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-base font-bold text-white">Riwayat Faktur Terbayar</h2>
        </div>   
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className=" hover:bg-transparant">
              {tableHeadText.map((txt, id) => (
                <TableHead key={id}className='text-white'>{txt.text}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-white/2">
                <TableCell className="py-3.5">
                  <div>{tx.title}</div>
                  <div>{tx.id}</div>
                </TableCell>
                <TableCell>{tx.time}</TableCell>
                <TableCell>
                  {tx.amount} <span>USDT</span>
                </TableCell>
                <TableCell >
                  <a
                    href={`https://sepolia.basescan.org/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition"
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
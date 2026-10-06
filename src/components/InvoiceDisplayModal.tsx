'use client'

import { QRCodeSVG } from 'qrcode.react'

interface InvoiceDisplayModalProps {
  isOpen: boolean
  onClose: () => void
  invoice: {
    title: string
    amount: string
    uri: string
  } | null
}

export default function InvoiceDisplayModal({
  isOpen,
  onClose,
  invoice,
}: InvoiceDisplayModalProps) {
  if (!isOpen || !invoice) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-sm bg-[#13141b] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition"
        >
          ✕
        </button>
        <div className="mb-4">
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Invoice Ready
          </span>
          <h3 className="text-xl font-bold text-white mt-3">{invoice.title}</h3>
          <p className="text-3xl font-extrabold text-white mt-1">
            {invoice.amount} <span className="text-sm font-semibold text-[#FC5E00]">USDT</span>
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-inner my-2">
          <QRCodeSVG value={invoice.uri} size={180} />
        </div>

        <p className="text-xs text-white/60 mt-4 leading-relaxed">
          Pindai QR ini menggunakan dompet Web3 (MetaMask, Trust Wallet, atau Rainbow) untuk menyelesaikan pembayaran.
        </p>
        <button
          onClick={onClose}
          className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition cursor-pointer"
        >
          Tutup / Transaksi Baru
        </button>
      </div>
    </div>
  )
}
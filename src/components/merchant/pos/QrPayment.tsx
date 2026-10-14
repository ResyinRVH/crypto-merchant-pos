'use client'

import { QRCodeSVG } from 'qrcode.react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ActiveInvoice } from '@/types/pos'

interface QrPaymentProps {
  isOpen: boolean
  onClose: () => void
  activeInvoice: ActiveInvoice | null
}

export function QrPayment({ isOpen, onClose, activeInvoice }: QrPaymentProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1C1F2A] border-white/10 text-white sm:max-w-md rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center">
        <DialogHeader className="w-full flex flex-col items-center space-y-1">
          <DialogTitle className="text-xl font-bold text-white pt-2">
            Pindai QR EIP-681
          </DialogTitle>
          <DialogDescription className="text-xs text-white/60">
            {activeInvoice?.id} • Jaringan Base Sepolia
          </DialogDescription>
        </DialogHeader>

        <div className="bg-white p-5 rounded-2xl shadow-xl my-4 flex items-center justify-center">
          {activeInvoice?.uri && (
            <QRCodeSVG value={activeInvoice.uri} size={210} level="M" />
          )}
        </div>

        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-3xl font-extrabold font-mono text-white">
            {activeInvoice?.amount}
          </span>
          <span className="text-sm font-bold text-[#FC5E00]">USDT</span>
        </div>

        <p className="text-xs text-white/50 max-w-xs leading-relaxed">
          Arahkan kamera MetaMask, Rainbow, atau Trust Wallet pembeli untuk menyetujui transfer token secara on-chain.
        </p>

        <Button
          type="button"
          onClick={onClose}
          className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white rounded-xl h-11 cursor-pointer border-0"
        >
          Selesai & Buat Transaksi Baru
        </Button>
      </DialogContent>
    </Dialog>
  )
}
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navbar from './Navbar'
import { useConnection } from 'wagmi'
import CreateInvoiceModal from './CreateInvoiceModal'
import InvoiceDisplayModal from './InvoiceDisplayModal'

export default function HeroSection() {
  const { isConnected, address } = useConnection()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDisplayModalOpen, setIsDisplayModalOpen] = useState(false)
  const [activeInvoice, setActiveInvoice] = useState<{
    title: string
    amount: string
    uri: string
  } | null>(null)

  return (
    <div className="relative min-h-screen lg:px-20 text-white overflow-hidden">
      <Navbar />
      <div className="absolute -top-60 left-20 w-[700px] h-[700px] bg-radial from-[#714CBC] to-[#3D268C] blur-[100px] rounded-full pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-linear-to-r from-[#714CBC] to-[#3D268C] blur-[100px] pointer-events-none translate-x-1/4 translate-y-1/4" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <div className="lg:col-span-6 space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.5]">
            Accept Crypto Payments as Effortlessly as Cash
          </h1>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl font-normal">
            Instant settlement in USDT with zero middleman fees, automatic invoicing, and seamless UX
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                if (!isConnected) {
                  alert('Silakan hubungkan dompet merchant terlebih dahulu.')
                  return
                }
                setIsModalOpen(true)
              }}
              className="bg-[#FC5E00] hover:bg-[#FF7315] text-white font-semibold text-base px-8 py-4 rounded-xl shadow-[4px_4px_20px_rgba(252,94,0,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Create Invoice
            </button>

            <button className="bg-[#3D414D] hover:bg-[#4A4F5E] text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer">
              Try Demo
            </button>
          </div>
        </div>

        <div className="lg:col-span-2"></div>

        <div className="lg:col-span-4 relative flex justify-center">
          <Image src="/images/Phone.webp" alt="Hero Image" width={350} height={350} priority />

          <div className="bg-white rounded-xl w-[200px] h-[170px] flex items-center justify-center absolute top-45 left-5 rotate-13 lg:top-45 lg:left-4 lg:rotate-13 shadow-lg shadow-[#000000]/20">
            <Image src="/images/QR.webp" alt="QR Image" width={120} height={120} priority className="rounded-xl -rotate-13" />
          </div>

          <Image src="/images/Bitcoin.webp" alt="Hero Image" width={150} height={150} priority className="absolute top-0 -left-8 lg:top-0 lg:left-0 lg:-translate-x-1/4 lg:-translate-y-1/4" />
          <Image src="/images/Usdt.webp" alt="Hero Image" width={150} height={150} priority className="absolute top-50 -left-10 lg:top-58 lg:-left-15 lg:-translate-x-1/4 lg:-translate-y-1/4" />
          <Image src="/images/Etherium.webp" alt="Hero Image" width={250} height={250} priority className="absolute top-80 left-32 lg:top-80 lg:left-60 lg:-translate-x-1/4 lg:-translate-y-1/4" />
        </div>

      </main>

      {address && (
        <CreateInvoiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          merchantAddress={address}
          onInvoiceCreated={(invoice) => {
            setActiveInvoice(invoice)
            setIsModalOpen(false)
            setIsDisplayModalOpen(true)
          }}
        />
      )}
      <InvoiceDisplayModal
        isOpen={isDisplayModalOpen}
        onClose={() => setIsDisplayModalOpen(false)}
        invoice={activeInvoice}
      />
    </div>
  )
}
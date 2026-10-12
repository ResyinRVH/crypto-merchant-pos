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

        <div className="lg:col-span-4 flex justify-center items-center">
          <div className="relative w-[280px] xs:w-[310px] sm:w-[350px]">
            <Image
              src="/images/Phone.webp"
              alt="Hero Image"
              width={350}
              height={350}
              priority
              className="w-full h-auto object-contain block drop-shadow-2xl"
            />

            <div className="bg-white rounded-xl sm:rounded-2xl w-[58%] aspect-[1.18/1] flex items-center justify-center absolute top-[35%] left-[5%] rotate-12 shadow-lg shadow-black/30 z-20">
              <div className="relative w-[65%] aspect-square">
                <Image
                  src="/images/QR.webp"
                  alt="QR Image"
                  fill
                  sizes="150px"
                  priority
                  className="rounded-lg object-contain -rotate-12"
                />
              </div>
            </div>

            <div className="absolute -top-[10%] -left-[5%] w-[38%] aspect-square z-20">
              <Image
                src="/images/Bitcoin.webp"
                alt="Bitcoin"
                fill
                sizes="150px"
                priority
                className="object-contain drop-shadow-xl"
              />
            </div>

            <div className="absolute top-[45%] -left-[20%] w-[38%] aspect-square z-20">
              <Image
                src="/images/Usdt.webp"
                alt="USDT"
                fill
                sizes="150px"
                priority
                className="object-contain drop-shadow-xl"
              />
            </div>

            <div className="absolute top-[72%] -right-[0%] w-[38%] aspect-square z-20">
              <Image
                src="/images/Ethereum.webp"
                alt="Ethereum"
                fill
                sizes="150px"
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
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
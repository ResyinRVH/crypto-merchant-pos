'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { QRCodeSVG } from 'qrcode.react'
import { generateERC681URI } from '@/utils/Inovice.ts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  QrCode,
  Plus,
  Minus,
} from 'lucide-react'

const USDT_TESTNET_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`

interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  icon?: string
}

interface CartItem extends MenuItem {
  qty: number
}

const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Margherita', category: 'PIZZA', price: 10 },
  { id: '2', name: 'Hawaii', category: 'PIZZA', price: 8 },
  { id: '3', name: '4 seasons', category: 'PIZZA', price: 10 },
  { id: '4', name: '4 cheese', category: 'PIZZA', price: 15 },
  { id: '5', name: 'Teriyaki', category: 'PIZZA', price: 10 },
  { id: '6', name: 'Chicken Ranch', category: 'PIZZA', price: 12 },
  { id: '7', name: 'Double Pepperoni', category: 'PIZZA', price: 10 },
  { id: '8', name: 'Ham & Mushrooms', category: 'PIZZA', price: 8 },
  { id: '9', name: 'Icecream Vanilla', category: 'DESSERT', price: 3 },
  { id: '10', name: 'Kopi Latte', category: 'COFFEE', price: 4.5 },
  { id: '11', name: 'Espresso Double', category: 'COFFEE', price: 2.8 },
  { id: '12', name: 'Croissant Butter', category: 'BREAKFAST', price: 3.5 },
]

const CATEGORIES = ['All categories', 'Italian food', 'Coffee', 'Breakfast']

export default function PosTerminalPage() {
  const { address: merchantAddress, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [tableNumber, setTableNumber] = useState('A12')
  const [customerName, setCustomerName] = useState('Ivan Dragunov')

  useEffect(() => {
    setMounted(true)
  }, [])

  const [activeCategory, setActiveCategory] = useState('Italian food')
  const [cart, setCart] = useState<CartItem[]>([
    { id: '9', name: 'Icecream', category: 'DESSERT', price: 1.5, qty: 2 },
    { id: '1', name: 'Margarita pizza', category: 'PIZZA', price: 10, qty: 1 },
  ])

  const [isQrOpen, setIsQrOpen] = useState(false)
  const [activeInvoice, setActiveInvoice] = useState<{
    id: string
    uri: string
    amount: string
  } | null>(null)

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === item.id)
      if (exists) {
        return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c))
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.id === id) {
            const nextQty = c.qty + delta
            return nextQty > 0 ? { ...c, qty: nextQty } : null
          }
          return c
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const subtotal = cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
  const totalAmount = subtotal.toFixed(2)

  const handleGenerateInvoice = () => {
    if (!merchantAddress || Number(totalAmount) <= 0) return

    const uri = generateERC681URI({
      merchantAddress,
      usdtAmount: totalAmount,
      chainId: 84532,
      usdtContractAddress: USDT_TESTNET_ADDRESS,
    })

    const invoiceId = `INV-${Date.now().toString().slice(-4)}`
    const newInvoice = {
      id: invoiceId,
      customerName: customerName.trim() || 'Guest',
      tableNumber: tableNumber.trim() || '-',
      items: cart,
      amount: totalAmount,
      uri,
      status: 'Ready',
      createdAt: new Date().toISOString(),
    }

    const history = JSON.parse(localStorage.getItem('pos_invoices') || '[]')
    localStorage.setItem('pos_invoices', JSON.stringify([newInvoice, ...history]))

    setActiveInvoice({ id: invoiceId, uri, amount: totalAmount })
    setIsQrOpen(true)
  }

  const filteredItems =
    activeCategory === 'All categories'
      ? MENU_ITEMS
      : activeCategory === 'Italian food'
      ? MENU_ITEMS.filter((i) => i.category === 'PIZZA')
      : activeCategory === 'Coffee'
      ? MENU_ITEMS.filter((i) => i.category === 'COFFEE')
      : MENU_ITEMS.filter((i) => i.category === 'BREAKFAST' || i.category === 'DESSERT')

  return (
    <>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-5rem)] gap-0">

        <div className="lg:col-span-8 flex flex-col justify-between pr-0 lg:pr-6">
          <div>
            <div className="pb-6 flex items-center justify-between border-b border-white/5">
              <h2 className="text-2xl font-bold tracking-tight text-white capitalize">
                {activeCategory}
              </h2>
              
            </div>

            <div className="py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 overflow-y-auto max-h-[560px]">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#03000A] hover:bg-[#1E212D] border border-white/10 hover:border-[#FC5E00]/40 rounded-2xl p-5 flex flex-col justify-between aspect-square text-center transition-all duration-200 active:scale-95 group cursor-pointer shadow-md"
                >
                  <span className="text-[10px] tracking-widest text-white/40 uppercase font-semibold block">
                    {item.category}
                  </span>

                  <div className="my-auto">
                    {item.icon && <span className="text-xl mb-1 block">{item.icon}</span>}
                    <p className="text-sm font-semibold text-white group-hover:text-[#FC5E00] transition line-clamp-2">
                      {item.name}
                    </p>
                  </div>

                  <span className="text-sm font-bold font-mono text-white/90 block">
                    ${item.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center gap-8 overflow-x-auto">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative py-2 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FC5E00] rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between bg-[#03000A] border-l border-white/5 p-6 rounded-2xl lg:rounded-3xl mt-6 lg:mt-0">
          <div>
            <div className="pb-6 border-b border-white/5 space-y-3">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-4 space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-semibold block">
                    Meja
                  </label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="A12"
                    className="w-full bg-[#03000A] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono font-semibold text-white placeholder:text-white/20 focus:outline-none focus:border-[#FC5E00] transition"
                  />
                </div>

                <div className="col-span-8 space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-semibold block">
                    Nama Pelanggan
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ketik nama pelanggan..."
                    className="w-full bg-[#03000A] border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white placeholder:text-white/20 focus:outline-none focus:border-[#FC5E00] transition"
                  />
                </div>
              </div>
            </div>

            <div className="py-4 space-y-3 overflow-y-auto max-h-[380px]">
              {cart.length === 0 ? (
                <p className="text-center text-xs text-white/30 py-10">Keranjang belanja kosong</p>
              ) : (
                cart.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between py-2 border-b border-white/[0.03]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white">
                        {c.qty}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white leading-tight">{c.name}</p>
                        <p className="text-[10px] text-white/40 font-mono">${c.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold font-mono text-white">
                        ${(c.qty * c.price).toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(c.id, -1)}
                          className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(c.id, 1)}
                          className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Discount</span>
              <button
                type="button"
                className="text-white/40 hover:text-[#FC5E00] flex items-center gap-1 cursor-pointer transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-white/60">Total</span>
              <span className="text-xl font-bold font-mono text-white">
                ${totalAmount}
              </span>
            </div>

            <Button
              type="button"
              disabled={!mounted || !isConnected || Number(totalAmount) <= 0}
              onClick={handleGenerateInvoice}
              className="w-full bg-[#FC5E00] hover:bg-[#FF7315] text-white font-bold h-14 rounded-2xl flex items-center justify-between px-6 text-base tracking-wide transition-all shadow-[0_4px_20px_rgba(252,94,0,0.35)] cursor-pointer disabled:opacity-40"
            >
              <span>PAY</span>
              <span className="font-mono text-lg">${totalAmount}</span>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
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
            onClick={() => {
              setIsQrOpen(false)
              setCart([])
            }}
            className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white rounded-xl h-11 cursor-pointer border-0"
          >
            Selesai & Buat Transaksi Baru
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
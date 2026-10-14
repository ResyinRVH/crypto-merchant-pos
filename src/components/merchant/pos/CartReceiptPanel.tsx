'use client'

import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'
import { CartItem } from '@/types/pos'

interface CartReceiptPanelProps {
  tableNumber: string
  setTableNumber: (val: string) => void
  customerName: string
  setCustomerName: (val: string) => void
  cart: CartItem[]
  onUpdateQty: (id: string, delta: number) => void
  totalAmount: string
  canPay: boolean
  onPay: () => void
}

export function CartReceiptPanel({
  tableNumber,
  setTableNumber,
  customerName,
  setCustomerName,
  cart,
  onUpdateQty,
  totalAmount,
  canPay,
  onPay,
}: CartReceiptPanelProps) {
  return (
    <div className="lg:col-span-4 flex flex-col justify-between bg-[#03000A] border border-white/10 p-6 rounded-2xl lg:rounded-3xl mt-6 lg:mt-0">
      <div>
        <div className="pb-6 border-b border-white/10 space-y-3">
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
                className="flex items-center justify-between py-2 border-b border-white/10"
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
                      onClick={() => onUpdateQty(c.id, -1)}
                      className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(c.id, 1)}
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

      <div className="pt-4 border-t border-white/10 space-y-4">
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
          disabled={!canPay}
          onClick={onPay}
          className="w-full bg-[#FC5E00] hover:bg-[#FF7315] text-white font-bold h-14 rounded-2xl flex items-center justify-between px-6 text-base tracking-wide transition-all shadow-[0_4px_20px_rgba(252,94,0,0.35)] cursor-pointer disabled:opacity-40"
        >
          <span>PAY</span>
          <span className="font-mono text-lg">${totalAmount}</span>
        </Button>
      </div>
    </div>
  )
}
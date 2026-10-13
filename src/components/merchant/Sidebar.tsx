'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  SquareArrowLeft,
  Store
} from 'lucide-react'

export default function MerchantSidebar() {
  const pathname = usePathname()
  const navItems = [
    {
      label: 'Dashboard',
      href: '/merchant/dashboard',
      icon: LayoutDashboard,
      active: pathname === '/merchant/dashboard',
    },
    {
      label: 'POS Terminal',
      href: '/merchant/pos',
      icon: Receipt,
      active: pathname === '/merchant/pos',
    },
    {
      label: 'Withdraw',
      href: '/merchant/withdraw',
      icon: Wallet,
      active: pathname === '/merchant/withdraw',
    },
  ]

  return (
    <aside className="w-64 border-r border-white/10 bg-[#0E1017] flex flex-col justify-between shrink-0 hidden md:flex sticky top-0 h-screen">
      <div className="p-6 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#714CBC]/10 border border-[#714CBC]/30 flex items-center justify-center text-[#FC5E00] shadow-[#714CBC]">
            <Store className="w-5 h-5 text-[#714CBC]" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white block">
              Crypto POS
            </span>
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
              Merchant
            </span>
          </div>
        </div>

        <nav className="space-y-1.5">
          <span className="text-[10px] uppercase tracking-wider text-white/30 px-3 font-semibold block mb-2">
            Menu Utama
          </span>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${item.active
                    ? 'bg-[#714CBC]/10 text-white/60 border border-[#714CBC]/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" /> {item.label}
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-white/10 flex justify-end items-center">
        <Link
          href="/"
          title="Kembali ke Beranda"
          className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition flex items-center justify-center"
        >
          <SquareArrowLeft className="w-5 h-5" />
        </Link>
      </div>
    </aside>
  )
}
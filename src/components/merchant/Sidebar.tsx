'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Store,
  Home,
} from 'lucide-react'

export default function MerchantSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

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
    <aside
      className={`relative hidden md:flex flex-col justify-between shrink-0 h-[calc(100vh-2rem)] my-4 ml-4 transition-all duration-300 ease-in-out z-30 select-none
        ${isCollapsed ? 'w-20' : 'w-64'}
        bg-[#111319]/90 backdrop-blur-2xl  rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.6)]
      `}
    >
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 w-6 h-6 rounded-full bg-[#181A22] border border-white/15 text-white/60 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg cursor-pointer z-40"
        title={isCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      <div className={`p-5 space-y-6 ${isCollapsed ? 'flex flex-col items-center p-3.5' : ''}`}>
        <div className={`flex items-center gap-3 pt-1 ${isCollapsed ? 'justify-center' : 'px-1'}`}>
          <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center text-white  shrink-0">
            <Store className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden whitespace-nowrap transition-opacity duration-200">
              <span className="text-[10px] text-white/40 uppercase tracking-widest block leading-none mb-1">
                Merchant
              </span>
              <span className="font-bold text-base tracking-tight text-white block leading-none">
                Crypto POS
              </span>
            </div>
          )}
        </div>

        <nav className="space-y-2 pt-2 w-full">
          

          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={`group flex items-center rounded-2xl text-xs font-semibold transition-all duration-200 ${
                  isCollapsed
                    ? 'justify-center w-11 h-11 mx-auto'
                    : 'px-3.5 py-3 justify-between'
                } ${
                  item.active
                    ? 'bg-[#714CBC] text-white shadow-xl shadow-[#714CBC]/30'
                    : 'text-white hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      item.active ? 'text-white scale-105' : 'text-white group-hover:text-white'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className={`p-4 border-t border-white/10 ${isCollapsed ? 'flex flex-col items-center gap-3' : 'space-y-3'}`}>
        <Link
          href="/"
          title="Kembali ke Beranda"
          className={`flex items-center rounded-xl text-white hover:text-white hover:bg-white/5 transition-all duration-200 ${
            isCollapsed ? 'w-10 h-10 justify-center' : 'px-3 py-2 justify-between text-xs font-semibold'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Home className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Home Page</span>}
          </div>
        </Link>
      </div>
    </aside>
  )
}
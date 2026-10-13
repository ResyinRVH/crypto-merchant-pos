'use client'

import React from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { PlusCircle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MerchantSidebar from '../../components/merchant/Sidebar'

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { address: merchantAddress } = useAccount()

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-white flex">
      <MerchantSidebar />
        <main className="p-6 lg:p-10 space-y-8 flex-1 overflow-y-auto">
          {children}
        </main>
     
    </div>
  )
}
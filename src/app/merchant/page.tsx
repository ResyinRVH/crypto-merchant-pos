'use client'

import Navbar from '@/components/Navbar'
import Merchant from '@/components/Merchat'

export default function MerchantPortalPage() {
  return (
    <div className="relative min-h-screen lg:px-20 bg-[#000000] text-white">
      <Navbar />
      <Merchant />
    </div>
  )
}
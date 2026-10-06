'use client'

import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import DocsSection from '@/components/DocsSection'

export default function App() {
  return (
    <main className="min-h-screen bg-[#03000A]">
      <HeroSection />
      <FeaturesSection />
      <DocsSection />
    </main>
  )
}

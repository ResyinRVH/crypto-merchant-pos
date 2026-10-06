'use client'

import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useState, type ReactNode } from 'react'
import { config } from '@/wagmi'
import { RainbowKitProvider,darkTheme } from "@rainbow-me/rainbowkit";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
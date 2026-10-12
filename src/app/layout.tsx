import './globals.css'
import { Providers } from './providers'
import { Poppins, Geist } from 'next/font/google'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("scroll-smooth", poppins.className, "font-sans", geist.variable)}>
      <body className={`${poppins.className} bg-[#03000A] text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
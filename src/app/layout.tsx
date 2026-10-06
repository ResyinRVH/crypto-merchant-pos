import './globals.css'
import { Providers } from './providers'
import { Poppins } from 'next/font/google'

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
    <html lang="en" className={`${poppins.className} scroll-smooth`}>
      <body className={`${poppins.className} bg-[#03000A] text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
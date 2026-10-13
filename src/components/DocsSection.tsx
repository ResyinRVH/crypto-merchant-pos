export default function DocsSection() {
  const steps = [
    {
      number: '01',
      title: 'Wallet Connection',
      description:
        'Merchant menghubungkan dompet Web3 (seperti MetaMask) melalui RainbowKit. Alamat publik dompet digunakan sebagai tujuan penerima dana transaksi',
    },
    {
      number: '02',
      title: 'EIP-681 Payload',
      description:
        'Sistem mengemas token kontrak, alamat merchant, dan nominal (6 desimal) menjadi URI standar yang langsung dapat dibaca oleh dompet mobile',
    },
    {
      number: '03',
      title: 'Instant Settlement',
      description:
        'Pelanggan memindai QR code, menandatangani transaksi, dan transfer token dieksekusi on-chain langsung ke saldo merchant tanpa potongan gateway',
    },
  ]

  return (
    <section id="docs" className="scroll-mt-24 relative max-w-7xl mx-auto px-6 py-24 text-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#6041C2] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          How It Works Under the Hood
        </h2>
        <p className="text-white/70 text-base leading-relaxed">
          Arsitektur pembayaran <em>peer-to-peer</em> non-custodial yang memanfaatkan protokol terbuka EVM tanpa perantara pihak ketiga
        </p>
      </div>

      <div className="relative z-10 divide-y divide-white/10 border-y border-white/10">
        {steps.map((step) => (
          <div
            key={step.number}
            className="group py-10 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center transition-colors duration-300 hover:bg-white/[0.02] px-4 -mx-4 rounded-xl"
          >
            <div className="md:col-span-2">
              <span className="text-sm sm:text-base font-mono font-medium text-white/40 group-hover:text-[#FC5E00] transition-colors">
                {step.number}
              </span>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">
                {step.title}
              </h3>
            </div>

            <div className="md:col-span-6">
              <p className="text-sm text-white/60 leading-relaxed max-w-xl">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
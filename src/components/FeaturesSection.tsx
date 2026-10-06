import Image from 'next/image';
import Card from '@/ui/card';

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: "Zero Gateway Fees & Zero Middlemen",
      image: "/images/Bitcoin.webp",
      glowColor: "from-[#F7931A]/40",
    },
    {
      id: 2,
      title: "Instant Settlement in Stable USDT",
      image: "/images/Usdt.webp",
      glowColor: "from-[#9B51E0]/45",
    },
    {
      id: 3,
      title: "Non Custodial Smart Contract Security",
      image: "/images/Ethereum.webp",
      glowColor: "from-[#0088FF]/45",
    },
  ];

  return (
    <section id="features" className="scroll-mt-24 relative bg-[#03000A] text-white py-24 px-6 overflow-hidden">
      <div className="absolute left-1/5 bottom-1 -translate-y-1/2  w-[800px] h-[800px] bg-gradient-to-tr from-[#6041C2] to-transparent rounded-full blur-[50px] pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-white/60 font-semibold">
            NEXT GEN POINT OF SALE
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            <span className="text-[#FC5E00]">Direct</span> Crypto Settlement
          </h2>

          <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-normal pt-1 max-w-lg mx-auto">
            Accept on chain USDT payments directly to your non custodial wallet with zero gateway deductions and instant QR verification
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4">
          {features.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              glowColor={item.glowColor}
              icon={
                <Image
                  src={item.image}
                  alt={item.title}
                  width={110}
                  height={110}
                  priority
                  className="object-contain"
                />
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
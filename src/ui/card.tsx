import React, { ReactNode } from 'react';

export interface CardProps {
  icon: ReactNode;
  title: string;
  glowColor: string;
}

export default function Card({ icon, title, glowColor }: CardProps) {
  return (
    <div className="relative pt-16 flex flex-col items-center group">
      <div className="absolute top-2 z-20 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        {icon}
      </div>
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#0b0c16]/80 border border-white/5 px-8 pt-20 pb-12 flex flex-col items-center justify-center text-center min-h-[190px] shadow-xl backdrop-blur-sm">
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-28 bg-gradient-to-b ${glowColor} to-transparent blur-2xl rounded-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
        />
        <h3 className="relative z-10 text-sm sm:text-base font-medium text-white/85 leading-relaxed max-w-[220px]">
          {title}
        </h3>
      </div>
    </div>
  );
}
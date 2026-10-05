import React from 'react';

interface MarqueeTickerProps {
  text?: string[];
  reverse?: boolean;
  bg?: string;
  textColor?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  text = [
    'HANDMADE WITH DESI GHEE & PURE BUTTER',
    '100% EGGLESS SPECIALS AVAILABLE',
    'FRESH SOURDOUGH EVERY MORNING AT 7 AM',
    'HERITAGE SHREWSBURY COOKIES',
    'CELEBRATION CAKES & CUSTOM BAKING',
    'GOPAL BAKERY EST. 1998'
  ],
  reverse = false,
  bg = 'bg-bakery-terracotta',
  textColor = 'text-bakery-cream',
}) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap py-3.5 ${bg} ${textColor} border-y border-bakery-chocolate/10 select-none`}>
      <div className={`inline-flex gap-8 items-center ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...text, ...text, ...text, ...text].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 font-serif font-black text-sm tracking-widest uppercase">
            <span>{item}</span>
            <span className="text-bakery-gold text-xs">★</span>
          </div>
        ))}
      </div>
    </div>
  );
};

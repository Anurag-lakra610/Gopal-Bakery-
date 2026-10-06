import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Plus, Minus } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   INGREDIENT TAGS — shown on card hover (per product)
───────────────────────────────────────────────────────────── */
const INGREDIENT_TAGS: Record<
  string,
  Array<{ label: string; x: number; y: number; rotate: number }>
> = {
  'gopal-shrewsbury-cookies': [
    { label: 'PURE BUTTER',  x: 10, y: 16, rotate: -13 },
    { label: 'VANILLA',      x: 52, y: 10, rotate: 8  },
    { label: 'NUTMEG',       x: 14, y: 65, rotate: -6  },
  ],
  'gopal-nan-khatai': [
    { label: 'PISTACHIO',    x: 8,  y: 18, rotate: -11 },
    { label: 'CARDAMOM',     x: 50, y: 12, rotate: 7   },
    { label: 'DESI GHEE',    x: 16, y: 68, rotate: -8  },
  ],
  'gopal-kesar-rasmalai-cake': [
    { label: 'KESAR',        x: 8,  y: 20, rotate: -14 },
    { label: 'RASMALAI',     x: 50, y: 11, rotate: 6   },
    { label: 'PISTACHIOS',   x: 12, y: 70, rotate: -7  },
  ],
  'gopal-artisanal-sourdough': [
    { label: 'WILD YEAST',   x: 8,  y: 20, rotate: -11 },
    { label: 'SEA SALT',     x: 52, y: 13, rotate: 9   },
    { label: 'STONE WHEAT',  x: 10, y: 66, rotate: -6  },
  ],
  'gopal-french-croissant': [
    { label: 'FR. BUTTER',   x: 7,  y: 17, rotate: -14 },
    { label: 'WHOLE MILK',   x: 50, y: 11, rotate: 7   },
    { label: 'WILD YEAST',   x: 13, y: 68, rotate: -8  },
  ],
  'gopal-methi-ajwain-biscuits': [
    { label: 'KASURI METHI', x: 6,  y: 18, rotate: -12 },
    { label: 'AJWAIN',       x: 52, y: 13, rotate: 8   },
    { label: 'ROCK SALT',    x: 12, y: 66, rotate: -6  },
  ],
};

/* ─────────────────────────────────────────────────────────────
   HAND-DRAWN CHOCOLATE LAYER CAKE SLICE SVG
───────────────────────────────────────────────────────────── */
const CakeSliceSVG = () => (
  <svg
    viewBox="0 0 520 370"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={120}
    height={88}
    aria-label="Chocolate layer cake slice illustration"
  >
    <path
      d="M18 352 C95 364 310 364 508 364 L508 46
         Q288 30 84 64 Q42 76 18 172 Z"
      fill="#111111"
      stroke="#000000"
      strokeWidth="9"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path
      d="M84 64 Q288 30 508 46 L508 148
         Q288 134 86 160 Q46 170 20 212
         L18 172 Q42 76 84 64 Z"
      fill="#FFFFFF"
      stroke="#000000"
      strokeWidth="8"
      strokeLinejoin="round"
    />
    {[0,1,2,3,4,5,6,7].map((i) => {
      const x1 = 110 + i * 30;
      const y1 = 56 + i * 2;
      const x2 = x1 - 22;
      const y2 = 158 + i * 2;
      return (
        <line
          key={i}
          x1={x1} y1={y1}
          x2={x2} y2={y2}
          stroke="#111111"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      );
    })}
    <path d="M296 66 C305 20 322 16 334 62" fill="#111111" stroke="#000" strokeWidth="6" strokeLinejoin="round" />
    <path d="M334 60 C344 12 362 8 374 58" fill="#111111" stroke="#000" strokeWidth="6" strokeLinejoin="round" />
    <path d="M374 56 C384 8 403 5 414 54" fill="#111111" stroke="#000" strokeWidth="6" strokeLinejoin="round" />
    <path d="M414 52 C424 7 442 5 454 50" fill="#111111" stroke="#000" strokeWidth="6" strokeLinejoin="round" />
    <path d="M454 50 L508 46 L508 110 L454 108 Z" fill="#111111" />
    <path d="M18 218 Q262 204 508 218" stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" />
    <path d="M18 218 Q262 204 508 218" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    <path d="M17 288 Q262 274 508 288" stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" />
    <path d="M17 288 Q262 274 508 288" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
    <path
      d="M72 126 C50 102 46 72 63 60
         C72 52 84 55 88 68
         C92 55 104 51 114 59
         C132 72 126 104 103 128
         Q88 142 72 126 Z"
      fill="#E8142A" stroke="#000000" strokeWidth="6" strokeLinejoin="round"
    />
    <ellipse cx="76"  cy="94"  rx="3" ry="2.2" fill="#8B0000" transform="rotate(-12 76 94)" />
    <ellipse cx="92"  cy="86"  rx="3" ry="2.2" fill="#8B0000" />
    <ellipse cx="104" cy="99"  rx="3" ry="2.2" fill="#8B0000" transform="rotate(11 104 99)" />
    <ellipse cx="80"  cy="113" rx="3" ry="2.2" fill="#8B0000" transform="rotate(-5 80 113)" />
    <ellipse cx="97"  cy="117" rx="3" ry="2.2" fill="#8B0000" />
    <path d="M80 60 C68 33 53 30 49 42 L63 55 Z" fill="#1c7a1c" stroke="#000" strokeWidth="4.5" strokeLinejoin="round" />
    <path d="M88 57 C83 32 95 23 98 37 L91 52 Z" fill="#1c7a1c" stroke="#000" strokeWidth="4.5" strokeLinejoin="round" />
    <path d="M96 59 C107 33 121 33 116 47 L103 56 Z" fill="#1c7a1c" stroke="#000" strokeWidth="4.5" strokeLinejoin="round" />
    <path d="M88 57 L85 42" stroke="#000" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   ALTERNATING MARQUEE ROW
───────────────────────────────────────────────────────────── */
const MarqueeRow = ({ reverse }: { reverse: boolean }) => {
  const chunk = (
    <>
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className={i % 2 === 0 ? 'text-primary' : 'bmc-stroke'}
          style={{ marginRight: '3.5rem' }}
        >
          BESTSELLERS
        </span>
      ))}
    </>
  );

  return (
    <div className="overflow-hidden w-full flex">
      <div
        className={`flex whitespace-nowrap font-heading font-black tracking-tighter leading-none select-none
          text-[60px] sm:text-[88px] lg:text-[108px] ${reverse ? 'bmc-right' : 'bmc-left'}`}
      >
        <span className="flex items-center">{chunk}</span>
        <span className="flex items-center" aria-hidden>{chunk}</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PRODUCT CARD — Bernice-style arch card
   1. WHITE FILLED card body — hides watermark behind it
   2. RED BORDER OUTLINE with 100px top radius (smooth arch)
   3. Image pops out above the outline, radius matches card
   4. Watermark scrolls BEHIND the white-filled cards
───────────────────────────────────────────────────────────── */
interface ProductCardProps {
  product: Product;
  qty: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onAddToCart: () => void;
  onQuickView: () => void;
  index: number;
}

const BestsellersCard: React.FC<ProductCardProps> = ({
  product, qty, onIncrease, onDecrease, onAddToCart, onQuickView, index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const tags = INGREDIENT_TAGS[product.id] ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col p-[10px] pb-0"
      style={{ willChange: 'transform' }}
    >
      {/* ── WHITE FILLED CARD BODY — blocks watermark from showing through ── */}
      <div
        className="absolute inset-0 bg-white rounded-t-[999px] rounded-b-[40px]"
      />

      {/* ── RED BORDER OUTLINE — perfect tomb/arch shape (999px radius) ── */}
      <div
        className="absolute inset-0 border-[3px] border-primary rounded-t-[999px] rounded-b-[40px] pointer-events-none"
      />

      {/* ── IMAGE — pops out above the outline, radius matches card arch perfectly ── */}
      <div
        className="relative z-10 w-full cursor-pointer overflow-hidden bg-white shadow-sm flex-shrink-0"
        style={{
          aspectRatio: '1 / 1',
          borderRadius: '999px 999px 12px 12px',
        }}
        onClick={onQuickView}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.4 }}
          loading="lazy"
        />
        <motion.img
          src={product.hoverImage}
          alt={`${product.name} — inside view`}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.96 }}
          transition={{ duration: 0.4 }}
          loading="lazy"
        />

        {/* ── INGREDIENT TAGS ── */}
        <AnimatePresence>
            {isHovered && tags.map((tag, i) => (
              <motion.div
                key={tag.label}
                initial={{ opacity: 0, scale: 0.6, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.6, x: -10 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                style={{
                  position: 'absolute',
                  left: `${tag.x}%`,
                  top: `${tag.y}%`,
                  pointerEvents: 'none',
                }}
                className="flex items-center gap-1.5 whitespace-nowrap z-20"
              >
                {/* SVG Pointer without background */}
                <svg width="28" height="12" viewBox="0 0 28 12" fill="none" className="drop-shadow-md overflow-visible">
                  <circle cx="4" cy="6" r="3.5" fill="#E3000F" stroke="#ffffff" strokeWidth="1.5" />
                  <path d="M8 6 L26 6" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2" />
                </svg>
                <span 
                  className="font-heading font-black text-[10px] sm:text-[12px] uppercase tracking-widest text-white"
                  style={{ textShadow: '0px 2px 8px rgba(0,0,0,0.9), 0px 0px 4px rgba(0,0,0,0.8), 0px 0px 2px rgba(0,0,0,1)' }}
                >
                  {tag.label}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
      </div>

      {/* ── PRODUCT INFO ── */}
      <div className="relative z-10 px-[16px] pb-[20px] pt-6 flex flex-col gap-4">
        <div>
          <h3
            onClick={onQuickView}
            className="font-heading font-black text-[15px] uppercase tracking-tight text-black
                       hover:text-primary transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>
          <p className="text-[13px] text-gray-500 font-medium mt-1">
            Box of 6&nbsp;•&nbsp;4oz
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-heading font-black text-[16px] text-black">
            ₹{product.price}
          </span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onDecrease}
              aria-label="Decrease quantity"
              className="w-8 h-8 rounded-full bg-primary text-white
                         flex items-center justify-center hover:bg-primary-dark transition-colors"
            >
              <Minus className="w-3.5 h-3.5" strokeWidth={3} />
            </button>
            <span className="font-sans font-bold text-base w-5 text-center text-black select-none">
              {qty}
            </span>
            <button
              onClick={onIncrease}
              aria-label="Increase quantity"
              className="w-8 h-8 rounded-full bg-accent text-black
                         flex items-center justify-center hover:bg-accent-dark transition-colors"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={3} />
            </button>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onAddToCart}
          className="w-full bg-accent hover:bg-accent-dark text-black font-heading font-black
                     text-[13px] uppercase tracking-[0.16em] py-3.5 rounded-full transition-colors"
        >
          ADD TO CART
        </motion.button>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN SECTION EXPORT
───────────────────────────────────────────────────────────── */
interface BestsellersSectionProps {
  onQuickView: (product: Product) => void;
  onExploreAll: () => void;
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({
  onQuickView,
}) => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 3);

  const getQty  = (id: string) => quantities[id] || 1;
  const adjust  = (id: string, d: number) =>
    setQuantities((p) => ({ ...p, [id]: Math.max(1, (p[id] || 1) + d) }));

  return (
    <section
      id="bestsellers"
      className="relative bg-[#F9F8F3] overflow-hidden py-24"
    >
      {/* CSS for marquee + stroke text */}
      <style>{`
        @keyframes bmc-l {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes bmc-r {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .bmc-left  { animation: bmc-l 80s linear infinite; }
        .bmc-right { animation: bmc-r 80s linear infinite; }

        .bmc-stroke {
          -webkit-text-stroke: 2px #E3000F;
          color: transparent;
        }
      `}</style>

      

      {/* ════════════════════════════════════════════
          CONTENT — z-[2] so cards sit IN FRONT of watermark
      ════════════════════════════════════════════ */}
      <div className="relative z-[2] px-[16px] sm:px-[40px] lg:px-[100px]">

        {/* ── TOP TEXT ROW ── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          <div className="lg:col-span-7 space-y-6">
            <h2
              className="font-heading font-black text-[2rem] sm:text-[2.6rem] lg:text-[2.8rem]
                         text-black uppercase leading-[0.95] tracking-tight max-w-2xl"
            >
              GOOD FOOD SHOULD BOTH COMFORT AND NOURISH THE SOUL.
            </h2>
            <CakeSliceSVG />
          </div>

          <div className="lg:col-span-5 text-black text-[14px] sm:text-[16px] font-medium leading-relaxed lg:pt-1">
            We are located in Mullanpur Dakha, Ludhiana, Punjab. Stop by for a
            coffee, catch up on work, or grab some of our delicious goodies to
            go. With cookies and cakes available for online order, there's
            something for everyone, and every occasion.
          </div>
        </div>

        {/* ── PRODUCT CARDS GRID + WATERMARK WRAPPER ── */}
        <div className="relative py-4">
          {/* WATERMARK — exactly 4 rows, full screen width horizontally, unclipped vertically to prevent sharp cuts */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen z-[0] pointer-events-none flex flex-col justify-center items-center opacity-100"
          >
            <div className="w-[150%] flex flex-col justify-center" style={{ transform: 'rotate(-12deg) scale(1.4)', gap: '1rem' }}>
              {[false, true, false, true].map((rev, i) => (
                <MarqueeRow key={i} reverse={rev} />
              ))}
            </div>
          </div>

          <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-[62px] lg:gap-[92px] items-start">
            {bestsellers.map((product, idx) => (
              <BestsellersCard
                key={product.id}
                product={product}
                qty={getQty(product.id)}
                onIncrease={() => adjust(product.id, +1)}
                onDecrease={() => adjust(product.id, -1)}
                onAddToCart={() =>
                  addToCart(product, product.weightOptions[0], getQty(product.id))
                }
                onQuickView={() => onQuickView(product)}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

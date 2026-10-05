import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Plus, Minus } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   INGREDIENT TAGS — shown on card hover (per product)
   Positions in % from top-left of image container
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
   Exact trace of the Bernice reference illustration:
   • 3 dark chocolate layers
   • 2 white cream separator lines  
   • White frosting top with vertical hatch marks
   • 4 dark chocolate ganache peaks top-right
   • Red strawberry with leaves top-left
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
    {/* ── 1. OUTER DARK BODY (full wedge silhouette) ── */}
    <path
      d="M18 352 C95 364 310 364 508 364 L508 46
         Q288 30 84 64 Q42 76 18 172 Z"
      fill="#111111"
      stroke="#000000"
      strokeWidth="9"
      strokeLinejoin="round"
      strokeLinecap="round"
    />

    {/* ── 2. WHITE FROSTING TOP (upper ~30% of slice) ── */}
    <path
      d="M84 64 Q288 30 508 46 L508 148
         Q288 134 86 160 Q46 170 20 212
         L18 172 Q42 76 84 64 Z"
      fill="#FFFFFF"
      stroke="#000000"
      strokeWidth="8"
      strokeLinejoin="round"
    />

    {/* ── 3. VERTICAL HATCH MARKS on white frosting ── */}
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

    {/* ── 4. DARK CHOCOLATE GANACHE PEAKS (top-right) ── */}
    {/* Each peak is a bell-curve arc pointing up */}
    <path
      d="M296 66 C305 20 322 16 334 62"
      fill="#111111" stroke="#000" strokeWidth="6" strokeLinejoin="round"
    />
    <path
      d="M334 60 C344 12 362 8 374 58"
      fill="#111111" stroke="#000" strokeWidth="6" strokeLinejoin="round"
    />
    <path
      d="M374 56 C384 8 403 5 414 54"
      fill="#111111" stroke="#000" strokeWidth="6" strokeLinejoin="round"
    />
    <path
      d="M414 52 C424 7 442 5 454 50"
      fill="#111111" stroke="#000" strokeWidth="6" strokeLinejoin="round"
    />
    {/* Fill gap between last peak and right edge */}
    <path d="M454 50 L508 46 L508 110 L454 108 Z" fill="#111111" />

    {/* ── 5. CREAM SEPARATOR LINE 1 (layer 1 ↔ 2) ── */}
    <path d="M18 218 Q262 204 508 218"
      stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" />
    <path d="M18 218 Q262 204 508 218"
      stroke="#000000" strokeWidth="3" strokeLinecap="round" />

    {/* ── 6. CREAM SEPARATOR LINE 2 (layer 2 ↔ 3) ── */}
    <path d="M17 288 Q262 274 508 288"
      stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" />
    <path d="M17 288 Q262 274 508 288"
      stroke="#000000" strokeWidth="3" strokeLinecap="round" />

    {/* ── 7. STRAWBERRY BODY (red teardrop on top-left) ── */}
    <path
      d="M72 126 C50 102 46 72 63 60
         C72 52 84 55 88 68
         C92 55 104 51 114 59
         C132 72 126 104 103 128
         Q88 142 72 126 Z"
      fill="#E8142A"
      stroke="#000000"
      strokeWidth="6"
      strokeLinejoin="round"
    />
    {/* Strawberry seeds */}
    <ellipse cx="76"  cy="94"  rx="3" ry="2.2" fill="#8B0000" transform="rotate(-12 76 94)" />
    <ellipse cx="92"  cy="86"  rx="3" ry="2.2" fill="#8B0000" />
    <ellipse cx="104" cy="99"  rx="3" ry="2.2" fill="#8B0000" transform="rotate(11 104 99)" />
    <ellipse cx="80"  cy="113" rx="3" ry="2.2" fill="#8B0000" transform="rotate(-5 80 113)" />
    <ellipse cx="97"  cy="117" rx="3" ry="2.2" fill="#8B0000" />

    {/* Strawberry leaves (3 pointed leaves) */}
    <path d="M80 60 C68 33 53 30 49 42 L63 55 Z"
      fill="#1c7a1c" stroke="#000" strokeWidth="4.5" strokeLinejoin="round" />
    <path d="M88 57 C83 32 95 23 98 37 L91 52 Z"
      fill="#1c7a1c" stroke="#000" strokeWidth="4.5" strokeLinejoin="round" />
    <path d="M96 59 C107 33 121 33 116 47 L103 56 Z"
      fill="#1c7a1c" stroke="#000" strokeWidth="4.5" strokeLinejoin="round" />
    {/* Central stem */}
    <path d="M88 57 L85 42" stroke="#000" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   ALTERNATING MARQUEE ROW
   even index → scroll left  (translateX 0 → -50%)
   odd  index → scroll right (translateX -50% → 0)
───────────────────────────────────────────────────────────── */
const MarqueeRow = ({ reverse }: { reverse: boolean }) => {
  const chunk = (
    <>
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className={i % 2 === 0 ? 'text-[#0F6270]' : 'bmc-stroke'}
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
          text-[88px] sm:text-[108px] ${reverse ? 'bmc-right' : 'bmc-left'}`}
      >
        {/* two identical copies — seamless infinite loop */}
        <span className="flex items-center">{chunk}</span>
        <span className="flex items-center" aria-hidden>{chunk}</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PRODUCT CARD — with hover image-swap + ingredient tags
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
      className="flex flex-col bg-[#F4F2EC] border-2 border-[#0F6270] rounded-t-[180px] rounded-b-[44px] overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* ── IMAGE ZONE (fills top of arch, clipped by overflow-hidden) ── */}
      <div
        className="relative mx-5 mt-8 cursor-pointer overflow-hidden rounded-t-[140px] rounded-b-[28px] bg-white shadow-inner flex-shrink-0"
        style={{ aspectRatio: '1 / 1' }}
        onClick={onQuickView}
      >
        {/* Image with cross-fade swap on hover */}
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

        {/* ── INGREDIENT TAGS — animate in on hover ── */}
        <AnimatePresence>
          {isHovered && tags.map((tag, i) => (
            <motion.span
              key={tag.label}
              initial={{ opacity: 0, scale: 0.6, rotate: tag.rotate - 15 }}
              animate={{ opacity: 1, scale: 1, rotate: tag.rotate }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{
                duration: 0.28,
                delay: i * 0.07,
                ease: [0.34, 1.56, 0.64, 1],   /* spring overshoot for playfulness */
              }}
              style={{
                position: 'absolute',
                left: `${tag.x}%`,
                top:  `${tag.y}%`,
                rotate: `${tag.rotate}deg`,
                transformOrigin: 'center center',
              }}
              className="bg-[#FA88CB] text-black font-heading font-black text-[9px] sm:text-[10px]
                         uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md pointer-events-none
                         whitespace-nowrap"
            >
              {tag.label}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* ── PRODUCT INFO ── */}
      <div className="px-6 pb-7 pt-5 flex flex-col gap-3.5">
        <div>
          <h3
            onClick={onQuickView}
            className="font-heading font-black text-[11px] uppercase tracking-tight text-black
                       hover:text-[#0F6270] transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-400 font-medium mt-0.5">
            Box of 6&nbsp;•&nbsp;4oz
          </p>
        </div>

        {/* Price + qty controls */}
        <div className="flex items-center justify-between">
          <span className="font-heading font-black text-sm text-black">
            ₹{product.price}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onDecrease}
              aria-label="Decrease quantity"
              className="w-7 h-7 rounded-full bg-[#0F6270] text-white
                         flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <Minus className="w-3 h-3" strokeWidth={3} />
            </button>
            <span className="font-sans font-bold text-sm w-4 text-center text-black select-none">
              {qty}
            </span>
            <button
              onClick={onIncrease}
              aria-label="Increase quantity"
              className="w-7 h-7 rounded-full bg-[#FA88CB] text-black
                         flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <Plus className="w-3 h-3" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* ADD TO CART */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onAddToCart}
          className="w-full bg-[#FA88CB] hover:bg-[#f775c0] text-black font-heading font-black
                     text-[11px] uppercase tracking-[0.14em] py-3.5 rounded-full transition-colors"
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
      {/* ═══════════════════════════════════════
          CSS for marquee + stroke text + card
      ════════════════════════════════════════ */}
      <style>{`
        @keyframes bmc-l {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes bmc-r {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        /* SLOWER SPEED: 80s */
        .bmc-left  { animation: bmc-l 80s linear infinite; }
        .bmc-right { animation: bmc-r 80s linear infinite; }

        .bmc-stroke {
          -webkit-text-stroke: 2.5px #0F6270;
          color: transparent;
        }
      `}</style>

      {/* ══════════════════════════════════════════════════
          BACKGROUND — ALTERNATING LEFT / RIGHT MARQUEE ROWS
          Row 0 → left   Row 1 → right   Row 2 → left …
      ═════════════════════════════════════════════════════ */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden
                   flex flex-col justify-around opacity-[0.17]"
        style={{ transform: 'rotate(-12deg) scale(1.55)' }}
      >
        {[false, true, false, true, false, true].map((rev, i) => (
          <MarqueeRow key={i} reverse={rev} />
        ))}
      </div>

      {/* ════════════════════════════════════════════
          CONTENT — 100px padding left & right (hard px)
      ════════════════════════════════════════════ */}
      <div className="relative z-10 px-[24px] sm:px-[50px] lg:px-[100px]">

        {/* ── TOP TEXT ROW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left: headline + SVG doodle */}
          <div className="lg:col-span-7 space-y-6">
            <h2
              className="font-heading font-black text-[2rem] sm:text-[2.6rem] lg:text-[2.8rem]
                         text-[#0F6270] uppercase leading-[0.95] tracking-tight max-w-2xl"
            >
              GOOD FOOD SHOULD BOTH COMFORT AND NOURISH THE SOUL.
            </h2>
            {/* Hand-drawn cake slice — rendered as pure SVG component */}
            <CakeSliceSVG />
          </div>

          {/* Right: description */}
          <div className="lg:col-span-5 text-[#0F6270] text-xs sm:text-sm font-medium leading-relaxed lg:pt-1">
            We are centrally located in Sector 17, New Delhi. Stop by for a
            coffee, catch up on work, or grab some of our delicious goodies to
            go. With cookies and cakes available for online order, there's
            something for everyone, and every occasion.
          </div>
        </div>

        {/* ── PRODUCT CARDS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
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
    </section>
  );
};

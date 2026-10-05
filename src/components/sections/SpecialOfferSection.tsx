import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, ArrowRight, Tag } from 'lucide-react';
import { BAKERY_INFO } from '../../data/bakeryInfo';

interface SpecialOfferSectionProps {
  onClaimOffer: () => void;
}

export const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({ onClaimOffer }) => {
  return (
    <section id="offers" className="py-16 bg-bakery-pastry/40 relative overflow-hidden border-y border-bakery-chocolate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-bakery-terracotta to-bakery-terracotta-dark text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Background Icon Overlay */}
          <Gift className="w-64 h-64 absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none" />

          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-bakery-gold" />
              <span>Limited Time Bakery Offer</span>
            </div>

            <h2 className="font-serif font-black text-3xl sm:text-5xl text-white leading-tight">
              Order Any 2 Boxes of Cookies & Get 1 Fresh Muffin Free!
            </h2>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans">
              Enjoy our signature Shrewsbury & Nan Khatai cookies with a complimentary oven-fresh blueberry muffin. Offer valid for online orders over ₹499.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/10 border border-white/30 px-4 py-2 rounded-xl text-xs font-mono font-bold">
                <Tag className="w-4 h-4 text-bakery-gold" />
                <span>PROMO CODE: <span className="text-bakery-gold uppercase tracking-wider font-extrabold">FRESHGOPAL</span></span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClaimOffer}
                className="bg-white text-bakery-terracotta font-extrabold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:bg-bakery-cream transition-all text-xs sm:text-sm"
              >
                <span>Claim Offer Now</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

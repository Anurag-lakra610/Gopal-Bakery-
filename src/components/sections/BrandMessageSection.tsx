import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Flame, Shield } from 'lucide-react';

export const BrandMessageSection: React.FC = () => {
  return (
    <section className="py-20 bg-bakery-pastry/30 border-y border-bakery-chocolate/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-script text-3xl text-bakery-terracotta"
          >
            "Made with love, butter, & family tradition"
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-black text-3xl sm:text-5xl text-bakery-chocolate leading-tight"
          >
            We believe that every slice of cake and every cookie should bring warmth to your soul.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-bakery-chocolate-light font-sans leading-relaxed"
          >
            Since 1998, Gopal Bakery has remained committed to pure artisanal baking. We never shortcut quality—using 100% real butter, stone-ground flour, organic milk, and authentic cardamom. From our famous melt-in-your-mouth Shrewsbury cookies to slow-fermented sourdoughs and custom eggless cakes, every batch is made fresh daily right here in our ovens.
          </motion.p>
        </div>

        {/* 4 Feature Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-bakery-chocolate/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-6 bg-white/60 rounded-2xl border border-bakery-chocolate/5 shadow-sm"
          >
            <span className="font-serif font-black text-4xl text-bakery-terracotta block">26+</span>
            <span className="text-xs font-bold text-bakery-chocolate uppercase tracking-wider mt-1 block">Years of Heritage</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center p-6 bg-white/60 rounded-2xl border border-bakery-chocolate/5 shadow-sm"
          >
            <span className="font-serif font-black text-4xl text-bakery-mint block">100%</span>
            <span className="text-xs font-bold text-bakery-chocolate uppercase tracking-wider mt-1 block">Eggless Delights</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center p-6 bg-white/60 rounded-2xl border border-bakery-chocolate/5 shadow-sm"
          >
            <span className="font-serif font-black text-4xl text-bakery-gold block">50k+</span>
            <span className="text-xs font-bold text-bakery-chocolate uppercase tracking-wider mt-1 block">Happy Customers</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center p-6 bg-white/60 rounded-2xl border border-bakery-chocolate/5 shadow-sm"
          >
            <span className="font-serif font-black text-4xl text-bakery-chocolate block">0%</span>
            <span className="text-xs font-bold text-bakery-chocolate uppercase tracking-wider mt-1 block">Artificial Additives</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

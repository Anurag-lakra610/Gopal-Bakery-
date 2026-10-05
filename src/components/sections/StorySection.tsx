import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, CheckCircle, Wheat, Clock, ShieldCheck } from 'lucide-react';
import { BAKERY_INFO } from '../../data/bakeryInfo';

export const StorySection: React.FC = () => {
  return (
    <section id="craft" className="py-24 bg-bakery-chocolate text-bakery-cream relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bakery-terracotta/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Imagery Grid (5 columns) */}
          <div className="lg:col-span-5 relative space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden border-4 border-bakery-terracotta/30 shadow-2xl aspect-[4/5]"
            >
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80"
                alt="Baking Process"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-6 -right-6 bg-bakery-cream text-bakery-chocolate p-6 rounded-3xl shadow-2xl max-w-xs border border-bakery-chocolate/10 hidden sm:block"
            >
              <span className="font-script text-bakery-terracotta text-2xl block">Established 1998</span>
              <p className="text-xs font-bold leading-relaxed mt-1">
                "Our secret lies in using 100% pure butter and slow stone-deck baking—never taking shortcuts."
              </p>
            </motion.div>
          </div>

          {/* Right Editorial Story (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-bakery-gold flex items-center gap-2 mb-2">
                <Wheat className="w-4 h-4" />
                <span>Our Heritage & Craftsmanship</span>
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-5xl text-white leading-tight">
                Crafted by Hand, Baked with Heart Since 1998.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-bakery-cream-dark/90 leading-relaxed font-sans">
              Founded in Sector 17 by master baker Gopal Krishan, our bakery started with a single stone deck oven and a commitment to pure ingredients. Over two decades later, we still mix every dough batch by hand, use organic whole wheat flour, and refuse to use palm oil or artificial improvers.
            </p>

            {/* 3 Pillars of Quality */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="p-3 bg-bakery-terracotta text-white rounded-xl">
                  <Wheat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-white">Pure Whole Ingredients</h4>
                  <p className="text-xs text-bakery-cream-dark/80 mt-1 leading-relaxed">
                    100% golden butter, aromatic green cardamom, stoneground wheat, and organic unrefined sugar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="p-3 bg-bakery-mint text-white rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-white">36-Hour Sourdough Fermentation</h4>
                  <p className="text-xs text-bakery-cream-dark/80 mt-1 leading-relaxed">
                    Our wild starter yeast ferments naturally over 36 hours for optimal gut digestibility and crispy crust.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="p-3 bg-bakery-gold text-bakery-chocolate rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-white">Dedicated Eggless Kitchen</h4>
                  <p className="text-xs text-bakery-cream-dark/80 mt-1 leading-relaxed">
                    All eggless cakes and cookies are prepared in dedicated sanitized mixing bowls for complete peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

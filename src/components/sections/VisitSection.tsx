import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, MessageSquare, Star, Navigation } from 'lucide-react';
import { BAKERY_INFO } from '../../data/bakeryInfo';

export const VisitSection: React.FC = () => {
  return (
    <section id="visit" className="py-24 bg-grain relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-script text-3xl text-bakery-terracotta">
            Visit Our Bakery & Smell The Fresh Bread
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-bakery-chocolate">
            Visit Us or Order Fresh
          </h2>
          <p className="text-sm sm:text-base text-bakery-chocolate-light leading-relaxed">
            Come say hello at our flagship bakery in Sector 17, or place an express WhatsApp order for home delivery.
          </p>
        </div>

        {/* 3 Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl border border-bakery-chocolate/10 shadow-sm space-y-4"
          >
            <div className="w-12 h-12 bg-bakery-terracotta/10 text-bakery-terracotta rounded-2xl flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-bakery-mint/10 text-bakery-mint text-[11px] font-bold uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-bakery-mint animate-ping" />
                <span>Open Now</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-bakery-chocolate">Opening Hours</h3>
            </div>
            <div className="text-xs sm:text-sm text-bakery-chocolate-light space-y-2 pt-2 border-t border-bakery-chocolate/5">
              <div className="flex justify-between">
                <span className="font-semibold text-bakery-chocolate">Monday – Friday</span>
                <span>{BAKERY_INFO.hours.weekdays}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-bakery-chocolate">Saturday – Sunday</span>
                <span>{BAKERY_INFO.hours.weekends}</span>
              </div>
              <p className="text-[11px] text-bakery-terracotta italic font-medium pt-1">
                *First batch of fresh sourdough pulls at 7:00 AM daily
              </p>
            </div>
          </motion.div>

          {/* Card 2: Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-bakery-chocolate/10 shadow-sm space-y-4"
          >
            <div className="w-12 h-12 bg-bakery-mint/10 text-bakery-mint rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-bakery-chocolate">Store Location</h3>
            <p className="text-xs sm:text-sm text-bakery-chocolate-light leading-relaxed">
              {BAKERY_INFO.address}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(BAKERY_INFO.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-bakery-terracotta hover:underline pt-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Google Maps Directions →</span>
            </a>
          </motion.div>

          {/* Card 3: Contact & Direct WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl border border-bakery-chocolate/10 shadow-sm space-y-4"
          >
            <div className="w-12 h-12 bg-bakery-gold/10 text-bakery-gold rounded-2xl flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-bakery-chocolate">Call or WhatsApp</h3>
            <p className="text-xs sm:text-sm text-bakery-chocolate-light leading-relaxed">
              Need custom party cake orders or corporate cookie tin boxes? Reach our master baker directly.
            </p>
            <a
              href={BAKERY_INFO.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-bakery-mint text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:bg-emerald-700 transition-colors text-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Order via WhatsApp ({BAKERY_INFO.phone})</span>
            </a>
          </motion.div>
        </div>

        {/* Customer Testimonials Carousel Section */}
        <div className="pt-12 border-t border-bakery-chocolate/10 space-y-8">
          <div className="text-center">
            <span className="font-script text-2xl text-bakery-terracotta">Loved By Thousands</span>
            <h3 className="font-serif font-black text-2xl sm:text-4xl text-bakery-chocolate">
              What Our Bakery Lovers Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BAKERY_INFO.testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-3xl border border-bakery-chocolate/10 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-bakery-gold">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-bakery-gold text-bakery-gold" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-bakery-chocolate-light italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-bakery-chocolate/5 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-bakery-chocolate">{t.name}</h4>
                    <span className="text-[11px] text-bakery-chocolate-light">{t.city}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-bakery-cream text-bakery-terracotta px-2.5 py-1 rounded-full border border-bakery-chocolate/10">
                    ♥ {t.favoriteItem}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

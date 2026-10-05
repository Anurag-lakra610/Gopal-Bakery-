import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Instagram, Facebook, MessageSquare, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { BAKERY_INFO } from '../../data/bakeryInfo';

interface FooterSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-bakery-chocolate text-bakery-cream pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Newsletter Card Banner */}
        <div className="bg-gradient-to-r from-bakery-terracotta/20 to-bakery-chocolate border border-bakery-terracotta/30 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-md">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <span className="font-script text-2xl text-bakery-gold">Stay In The Oven Loop</span>
            <h3 className="font-serif font-black text-2xl sm:text-4xl text-white">
              Get 10% Off Your First Cookie Order!
            </h3>
            <p className="text-xs sm:text-sm text-bakery-cream-dark/80">
              Subscribe to receive weekly secret oven specials, seasonal cake drops, and fresh recipes.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-bakery-cream-dark/50 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm min-w-[280px]"
            />
            <button
              type="submit"
              className="bg-bakery-terracotta hover:bg-bakery-terracotta-dark text-white font-bold px-8 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all text-sm whitespace-nowrap"
            >
              {subscribed ? (
                <span>Subscribed! 🎉</span>
              ) : (
                <>
                  <span>Join Newsletter</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Main Footer Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-4">
          {/* Brand Col (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🥐</span>
              <span className="font-serif font-black text-2xl tracking-tight text-white">
                GOPAL BAKERY
              </span>
            </div>
            <p className="text-xs text-bakery-cream-dark/80 leading-relaxed max-w-sm">
              Delhi's beloved artisanal bakery crafting iconic Shrewsbury cookies, sourdoughs, and celebration eggless cakes since 1998.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BAKERY_INFO.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram page"
                className="p-2.5 bg-white/5 hover:bg-bakery-terracotta text-white rounded-full transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BAKERY_INFO.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook page"
                className="p-2.5 bg-white/5 hover:bg-bakery-terracotta text-white rounded-full transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BAKERY_INFO.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp order"
                className="p-2.5 bg-white/5 hover:bg-bakery-mint text-white rounded-full transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-bakery-cream-dark/80">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-bakery-terracotta transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-bakery-terracotta transition-colors">
                  Fresh Bakery Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bestsellers')} className="hover:text-bakery-terracotta transition-colors">
                  Bestsellers & Cookies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('craft')} className="hover:text-bakery-terracotta transition-colors">
                  Our Story & Craft
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visit')} className="hover:text-bakery-terracotta transition-colors">
                  Store Hours & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Bakery Specialties (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Bakery Specialties</h4>
            <ul className="space-y-2 text-xs text-bakery-cream-dark/80">
              <li>Shrewsbury Butter Cookies</li>
              <li>Pista & Elaichi Nan Khatai</li>
              <li>Royal Kesar Rasmalai Cake</li>
              <li>Country Style Rustic Sourdough</li>
              <li>Belgian Chocolate Truffle</li>
              <li>100% Eggless Custom Cakes</li>
            </ul>
          </div>

          {/* Quality Guarantee (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Quality Promise</h4>
            <div className="space-y-2 text-[11px] text-bakery-cream-dark/70">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-bakery-mint flex-shrink-0" />
                <span>100% Pure Desi Ghee & Butter</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-bakery-gold flex-shrink-0" />
                <span>Zero Palm Oil or Additives</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-bakery-rose flex-shrink-0" />
                <span>Hand-baked with love</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bakery-cream-dark/60">
          <p>© {new Date().getFullYear()} Gopal Bakery. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span className="font-script text-sm text-bakery-gold">Baked Fresh Daily</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

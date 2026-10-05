import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Clock, ShoppingBag } from 'lucide-react';
import { BAKERY_INFO } from '../data/bakeryInfo';
import { useCart } from '../context/CartContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const { openCart, totalItemsCount } = useCart();

  const menuItems = [
    { label: 'Shop Menu', id: 'catalog' },
    { label: 'Bestsellers', id: 'bestsellers' },
    { label: 'Our Bakery Craft', id: 'craft' },
    { label: 'Special Offers', id: 'offers' },
    { label: 'Visit & Hours', id: 'visit' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-50 bg-bakery-cream flex flex-col justify-between p-6 overflow-y-auto"
        >
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-bakery-chocolate/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥐</span>
              <span className="font-serif font-black text-xl tracking-tight text-bakery-chocolate">
                GOPAL BAKERY
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-bakery-chocolate/5 hover:bg-bakery-chocolate/10 text-bakery-chocolate transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-8 flex flex-col gap-6">
            {menuItems.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                onClick={() => handleLinkClick(item.id)}
                className="text-left font-serif text-3xl font-bold text-bakery-chocolate hover:text-bakery-terracotta transition-colors flex items-center justify-between group"
              >
                <span>{item.label}</span>
                <span className="text-sm font-sans font-normal text-bakery-terracotta group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </motion.button>
            ))}
          </div>

          {/* Cart CTA & Info Footer */}
          <div className="space-y-6 pt-6 border-t border-bakery-chocolate/10">
            <button
              onClick={() => {
                onClose();
                openCart();
              }}
              className="w-full bg-bakery-terracotta text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-3 shadow-lg shadow-bakery-terracotta/30 hover:bg-bakery-terracotta-dark transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>View Cart ({totalItemsCount} items)</span>
            </button>

            <div className="bg-bakery-cream-dark/60 p-4 rounded-2xl text-xs space-y-2 text-bakery-chocolate-light">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-bakery-terracotta" />
                <span>Daily Fresh: {BAKERY_INFO.hours.weekdays}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-bakery-terracotta" />
                <span className="truncate">{BAKERY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bakery-terracotta" />
                <span>Call/Order: {BAKERY_INFO.phone}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

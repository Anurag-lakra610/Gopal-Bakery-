import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, Star } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const results = PRODUCTS.filter(
    (p) =>
      query.trim() !== '' &&
      (p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bakery-chocolate/60 backdrop-blur-md"
        />

        {/* Search Modal Box */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-bakery-chocolate/10 p-6 space-y-6"
        >
          {/* Header Search Input */}
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-bakery-chocolate-light" />
            <input
              type="text"
              placeholder="Search cookies, cakes, sourdough, pastries..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full pl-12 pr-12 py-3.5 bg-bakery-cream rounded-2xl border border-bakery-chocolate/10 text-bakery-chocolate placeholder:text-bakery-chocolate-light/60 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-bakery-terracotta"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 text-bakery-chocolate-light hover:text-bakery-chocolate p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Category Tags */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-xs font-bold text-bakery-chocolate-light whitespace-nowrap">
              Suggestions:
            </span>
            {['Shrewsbury', 'Nan Khatai', 'Rasmalai Cake', 'Sourdough', 'Croissant'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="text-xs font-semibold px-3 py-1 bg-bakery-cream hover:bg-bakery-terracotta hover:text-white text-bakery-chocolate rounded-full transition-colors whitespace-nowrap border border-bakery-chocolate/5"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto space-y-3 pt-2 border-t border-bakery-chocolate/5">
            {query.trim() === '' ? (
              <p className="text-xs text-center text-bakery-chocolate-light py-8">
                Type above to search our artisanal products by name or ingredients.
              </p>
            ) : results.length === 0 ? (
              <p className="text-xs text-center text-bakery-chocolate-light py-8">
                No products found matching "{query}".
              </p>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-bakery-cream/70 transition-colors cursor-pointer border border-transparent hover:border-bakery-chocolate/5 group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-bakery-chocolate group-hover:text-bakery-terracotta transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-bakery-chocolate-light line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-sans font-extrabold text-sm text-bakery-chocolate">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="p-2 bg-bakery-terracotta text-white rounded-full hover:bg-bakery-terracotta-dark transition-colors"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

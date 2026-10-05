import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { QuantitySelector } from './QuantitySelector';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<string>(
    product ? product.weightOptions[0] : ''
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentWeight = selectedWeight || product.weightOptions[0];

  const handleAddToCart = () => {
    addToCart(product, currentWeight, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bakery-chocolate/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-bakery-chocolate/10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-bakery-chocolate hover:bg-bakery-terracotta hover:text-white transition-all shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Gallery */}
            <div className="relative aspect-square md:aspect-auto bg-bakery-cream">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.isEggless && (
                  <span className="bg-bakery-mint text-white font-sans text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    🌱 100% Eggless
                  </span>
                )}
                {product.badge && (
                  <span className="bg-bakery-terracotta text-white font-sans text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                {/* Rating */}
                <div className="flex items-center gap-2 text-xs text-bakery-gold mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-bakery-gold text-bakery-gold'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-bakery-chocolate">
                    {product.rating} ({product.reviewsCount} reviews)
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-bakery-chocolate leading-tight">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="font-sans font-extrabold text-3xl text-bakery-terracotta">
                    ₹{product.price * quantity}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-bakery-chocolate-light/60 line-through">
                      ₹{product.originalPrice * quantity}
                    </span>
                  )}
                  <span className="text-xs text-bakery-chocolate-light">
                    (₹{product.price} / portion)
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-bakery-chocolate-light leading-relaxed mt-4">
                  {product.description}
                </p>

                {/* Ingredients list */}
                <div className="mt-5 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-bakery-chocolate">
                    Key Pure Ingredients:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="bg-bakery-cream text-bakery-chocolate text-xs px-2.5 py-1 rounded-md border border-bakery-chocolate/10 font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Options & Add to Cart Action */}
              <div className="space-y-4 pt-4 border-t border-bakery-chocolate/10">
                {/* Weight selection */}
                <div>
                  <label className="text-xs font-bold text-bakery-chocolate block mb-2">
                    Select Size / Package:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.weightOptions.map((w) => (
                      <button
                        key={w}
                        onClick={() => setSelectedWeight(w)}
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${
                          currentWeight === w
                            ? 'bg-bakery-chocolate text-white border-bakery-chocolate shadow-md'
                            : 'bg-bakery-cream/60 text-bakery-chocolate border-bakery-chocolate/10 hover:border-bakery-chocolate/30'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & CTA Button */}
                <div className="flex items-center gap-4 pt-2">
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => setQuantity((q) => q + 1)}
                    onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                    size="lg"
                  />

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-bakery-terracotta text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-3 shadow-lg shadow-bakery-terracotta/30 hover:bg-bakery-terracotta-dark transition-all text-sm sm:text-base"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart • ₹{product.price * quantity}</span>
                  </button>
                </div>

                {/* Trust guarantee snippet */}
                <div className="flex items-center justify-around text-[11px] text-bakery-chocolate-light pt-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-bakery-mint" /> 100% Fresh Oven Guaranteed
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-bakery-rose" /> Baked Fresh Daily
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

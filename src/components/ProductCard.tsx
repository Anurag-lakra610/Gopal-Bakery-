import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { QuantitySelector } from './QuantitySelector';
import { Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedWeight, quantity);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden border border-bakery-chocolate/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
    >
      {/* Product Image Section */}
      <div
        className="relative aspect-square overflow-hidden bg-bakery-cream cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* Main & Hover Image Cross-fade */}
        <img
          src={isHovered ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.badge && (
            <span className="bg-bakery-terracotta text-white font-sans text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {product.isEggless && (
            <span className="bg-bakery-mint text-white font-sans text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <span>🌱</span> Eggless
            </span>
          )}
        </div>

        {/* Quick View Floating Eye Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-bakery-chocolate p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-bakery-terracotta hover:text-white shadow-md transform translate-y-2 group-hover:translate-y-0"
          aria-label="Quick View product"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Content & Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-bakery-gold mb-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-bakery-gold text-bakery-gold'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-bakery-chocolate text-[11px]">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif font-bold text-lg text-bakery-chocolate group-hover:text-bakery-terracotta transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-bakery-chocolate-light mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Options & Price Row */}
        <div className="space-y-3 pt-3 border-t border-bakery-chocolate/5">
          {/* Weight selector options */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {product.weightOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedWeight(option)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all whitespace-nowrap ${
                  selectedWeight === option
                    ? 'bg-bakery-chocolate text-white border-bakery-chocolate'
                    : 'bg-bakery-cream/50 text-bakery-chocolate-light border-bakery-chocolate/10 hover:border-bakery-chocolate/30'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Price & Quantity & Add to Cart button */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-sans font-extrabold text-xl text-bakery-chocolate">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-bakery-chocolate-light/60 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                size="sm"
              />

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handleAddToCart}
                className="bg-bakery-terracotta text-white font-bold p-2.5 rounded-full shadow-md shadow-bakery-terracotta/20 hover:bg-bakery-terracotta-dark transition-colors flex items-center justify-center"
                aria-label="Add to Cart"
              >
                <ShoppingBag className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

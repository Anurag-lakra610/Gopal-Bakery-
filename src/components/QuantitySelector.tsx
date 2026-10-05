import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  size = 'md',
}) => {
  const sizeStyles = {
    sm: 'h-8 px-2 text-xs gap-2',
    md: 'h-10 px-3 text-sm gap-3',
    lg: 'h-12 px-4 text-base gap-4',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={`flex items-center justify-between bg-bakery-cream-dark/80 border border-bakery-chocolate/10 rounded-full ${sizeStyles[size]}`}>
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={onDecrease}
        className="text-bakery-chocolate hover:text-bakery-terracotta transition-colors flex items-center justify-center p-1"
        aria-label="Decrease quantity"
      >
        <Minus className={iconSizes[size]} />
      </motion.button>
      <span className="font-sans font-bold text-bakery-chocolate min-w-[20px] text-center select-none">
        {quantity}
      </span>
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={onIncrease}
        className="text-bakery-chocolate hover:text-bakery-terracotta transition-colors flex items-center justify-center p-1"
        aria-label="Increase quantity"
      >
        <Plus className={iconSizes[size]} />
      </motion.button>
    </div>
  );
};

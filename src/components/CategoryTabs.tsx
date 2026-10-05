import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/products';

interface CategoryTabsProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full flex items-center justify-center py-6 px-4">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 bg-bakery-cream-dark/80 rounded-full border border-bakery-chocolate/10 max-w-full">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm whitespace-nowrap transition-colors duration-200 flex items-center gap-2 ${
                isActive
                  ? 'text-white font-bold'
                  : 'text-bakery-chocolate hover:text-bakery-terracotta'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-bakery-terracotta rounded-full shadow-md shadow-bakery-terracotta/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.icon}</span>
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

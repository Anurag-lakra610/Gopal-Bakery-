import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryTabs } from '../CategoryTabs';
import { ProductCard } from '../ProductCard';
import { PRODUCTS, Product } from '../../data/products';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ProductCatalogSectionProps {
  onQuickView: (product: Product) => void;
  searchQuery?: string;
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  onQuickView,
  searchQuery = '',
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [localSearch, setLocalSearch] = useState('');
  const [egglessOnlyFilter, setEgglessOnlyFilter] = useState(false);

  const effectiveSearch = searchQuery || localSearch;

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory =
        activeCategory === 'all' || p.category === activeCategory;

      const matchesSearch =
        effectiveSearch === '' ||
        p.name.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
        p.ingredients.some((ing) =>
          ing.toLowerCase().includes(effectiveSearch.toLowerCase())
        );

      const matchesEggless = !egglessOnlyFilter || p.isEggless;

      return matchesCategory && matchesSearch && matchesEggless;
    });
  }, [activeCategory, effectiveSearch, egglessOnlyFilter]);

  return (
    <section id="catalog" className="py-24 bg-grain relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-script text-3xl text-bakery-terracotta">
            Fresh From Our Stone Deck Ovens
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-bakery-chocolate">
            Explore The Bakery Menu
          </h2>
          <p className="text-sm sm:text-base text-bakery-chocolate-light leading-relaxed">
            Select a category below to discover handcrafted cookies, artisan breads, French pastries, and celebratory eggless cakes.
          </p>
        </div>

        {/* Category Navigation Bar */}
        <CategoryTabs
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Filter Bar Row (Search + Eggless Toggle) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/70 p-4 rounded-2xl border border-bakery-chocolate/10 shadow-sm max-w-4xl mx-auto">
          {/* Local Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-bakery-chocolate-light" />
            <input
              type="text"
              placeholder="Search cookies, cakes, sourdough..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full text-xs font-medium pl-10 pr-4 py-2.5 bg-bakery-cream rounded-xl border border-bakery-chocolate/10 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-bakery-chocolate"
            />
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Eggless Only Filter Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-bakery-chocolate select-none">
              <input
                type="checkbox"
                checked={egglessOnlyFilter}
                onChange={(e) => setEgglessOnlyFilter(e.target.checked)}
                className="w-4 h-4 rounded text-bakery-terracotta focus:ring-bakery-terracotta accent-bakery-terracotta cursor-pointer"
              />
              <span>🌱 100% Eggless Only</span>
            </label>

            {/* Total Results Count Badge */}
            <span className="text-xs text-bakery-chocolate-light font-bold bg-bakery-pastry/50 px-3 py-1.5 rounded-full">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* Animated Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Fallback */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center space-y-4">
            <span className="text-5xl opacity-40">🔍</span>
            <h3 className="font-serif font-bold text-xl text-bakery-chocolate">
              No matching treats found
            </h3>
            <p className="text-xs text-bakery-chocolate-light max-w-sm mx-auto">
              Try adjusting your search terms or select another category to view our delicious offerings.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setLocalSearch('');
                setEgglessOnlyFilter(false);
              }}
              className="text-xs font-bold text-bakery-terracotta underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

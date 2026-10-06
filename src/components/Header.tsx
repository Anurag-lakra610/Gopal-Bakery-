import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onOpenSearch,
  onNavigate,
}) => {
  const { openCart, totalItemsCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'glass-header py-4 border-b border-bakery-chocolate/10 shadow-md'
          : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-8'
      }`}
    >
      {/* 100px padding left/right to match reference */}
      <div className="w-full px-[16px] sm:px-[40px] lg:px-[100px] flex items-center justify-between">
        
        {/* Left Brand Logo - Replacing text with new image logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="focus:outline-none flex items-center gap-2 group"
        >
          <img 
            src="/logo.png" 
            alt="The Gopal's" 
            className="h-14 sm:h-16 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        {/* Right Section: Navigation Links + Icons */}
        <div className="flex items-center gap-10">
          
          {/* Navigation Menu Links */}
          <div className="hidden lg:flex items-center gap-8">
            {['COOKIES', 'CAKES', 'ABOUT', 'CONTACT'].map((link) => (
              <button
                key={link}
                onClick={() => onNavigate(link.toLowerCase())}
                className={`text-[14px] font-heading font-black uppercase tracking-widest transition-colors duration-300 ${
                  isScrolled ? 'text-black hover:text-primary' : 'text-white hover:text-accent'
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <button
              onClick={openCart}
              aria-label="Open cart drawer"
              className={`relative flex items-center transition-colors duration-300 ${
                isScrolled ? 'text-black hover:text-primary' : 'text-white hover:text-accent'
              }`}
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
              {totalItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenSearch}
              aria-label="Search bakery products"
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-black hover:text-primary' : 'text-white hover:text-accent'
              }`}
            >
              <Search className="w-5 h-5" strokeWidth={2.5} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={onOpenMobileMenu}
              aria-label="Open Mobile Navigation Menu"
              className={`lg:hidden p-1 transition-colors ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

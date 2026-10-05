import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer } from './components/Toast';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { MarqueeTicker } from './components/MarqueeTicker';

import { HeroSection } from './components/sections/HeroSection';
import { BestsellersSection } from './components/sections/BestsellersSection';
import { ProductCatalogSection } from './components/sections/ProductCatalogSection';
import { StorySection } from './components/sections/StorySection';
import { SpecialOfferSection } from './components/sections/SpecialOfferSection';
import { VisitSection } from './components/sections/VisitSection';
import { FooterSection } from './components/sections/FooterSection';

import { Product } from './data/products';

export const AppContent: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col font-sans relative">
      {/* Header Bar */}
      <Header
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Cart Drawer Panel */}
      <CartDrawer />

      {/* Notification Toast Container */}
      <ToastContainer />

      {/* Search Overlay Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onExploreClick={() => handleNavigate('catalog')}
          onBestsellersClick={() => handleNavigate('bestsellers')}
        />

        {/* 2. Bestsellers Section - EXACT replica of Bernice section right after Hero */}
        <BestsellersSection
          onQuickView={(p) => setSelectedProduct(p)}
          onExploreAll={() => handleNavigate('catalog')}
        />

        {/* 3. Top Marquee Brand Banner */}
        <MarqueeTicker />

        {/* 4. Product Discovery Catalog */}
        <ProductCatalogSection
          onQuickView={(p) => setSelectedProduct(p)}
        />

        {/* 5. Storytelling & Craft */}
        <StorySection />

        {/* 6. Reverse Marquee Banner */}
        <MarqueeTicker reverse bg="bg-bakery-chocolate" textColor="text-bakery-cream" />

        {/* 7. Special Promotional Offer */}
        <SpecialOfferSection
          onClaimOffer={() => handleNavigate('catalog')}
        />

        {/* 8. Visit Bakery & Location */}
        <VisitSection />
      </main>

      {/* 9. Rich Footer */}
      <FooterSection onNavigate={handleNavigate} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;

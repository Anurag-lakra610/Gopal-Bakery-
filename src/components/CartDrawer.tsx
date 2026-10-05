import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Calendar, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { QuantitySelector } from './QuantitySelector';
import confetti from 'canvas-confetti';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryDate,
    setDeliveryDate,
    clearCart,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const freeDeliveryThreshold = 499;
  const progressPercentage = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        clearCart();
        setOrderComplete(false);
        closeCart();
      }, 4000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-bakery-chocolate/60 backdrop-blur-sm"
          />

          {/* Side Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-bakery-cream shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-bakery-chocolate/10 flex items-center justify-between bg-white/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-bakery-terracotta/10 text-bakery-terracotta rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-bakery-chocolate">
                    Your Fresh Order
                  </h3>
                  <p className="text-xs text-bakery-chocolate-light">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in your basket
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-bakery-chocolate-light hover:text-bakery-chocolate rounded-full hover:bg-bakery-chocolate/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            {subtotal > 0 && (
              <div className="bg-bakery-pastry/40 px-6 py-3 border-b border-bakery-chocolate/5">
                <div className="flex justify-between items-center text-xs font-semibold mb-1.5 text-bakery-chocolate">
                  <span>
                    {remainingForFreeDelivery === 0 ? (
                      <span className="text-bakery-mint font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> You unlocked Free Express Delivery!
                      </span>
                    ) : (
                      `Add ₹${remainingForFreeDelivery} more for Free Delivery`
                    )}
                  </span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full h-2 bg-bakery-cream-dark rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${
                      remainingForFreeDelivery === 0 ? 'bg-bakery-mint' : 'bg-bakery-terracotta'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Cart Body Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {orderComplete ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 bg-bakery-mint/10 text-bakery-mint rounded-full flex items-center justify-center text-3xl animate-bounce">
                    🎉
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-bakery-chocolate">
                    Order Received with Love!
                  </h4>
                  <p className="text-sm text-bakery-chocolate-light leading-relaxed">
                    Thank you! Our master bakers are getting your oven-fresh items ready. We will notify you when it leaves the bakery.
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <span className="text-5xl opacity-40">🥐</span>
                  <h4 className="font-serif text-xl font-bold text-bakery-chocolate">
                    Your basket is currently empty
                  </h4>
                  <p className="text-xs text-bakery-chocolate-light max-w-xs">
                    Explore our oven-fresh cookies, artisanal sourdoughs, and celebration cakes to fill your box!
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 text-xs font-bold text-bakery-terracotta hover:underline"
                  >
                    Start Exploring Menu →
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.cartId}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white p-4 rounded-2xl border border-bakery-chocolate/5 shadow-sm flex items-center gap-4"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-bakery-chocolate/10 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-sm text-bakery-chocolate truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-bakery-chocolate-light mt-0.5">
                        Size: <span className="font-semibold text-bakery-terracotta">{item.selectedWeight}</span>
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() => updateQuantity(item.cartId, item.quantity + 1)}
                          onDecrease={() => updateQuantity(item.cartId, item.quantity - 1)}
                          size="sm"
                        />
                        <span className="font-sans font-extrabold text-sm text-bakery-chocolate">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-bakery-chocolate-light/50 hover:text-red-500 p-1 transition-colors self-start"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && !orderComplete && (
              <div className="p-6 bg-white border-t border-bakery-chocolate/10 space-y-4">
                {/* Preferred Pickup/Delivery Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-bakery-chocolate flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-bakery-terracotta" />
                    <span>Select Preferred Pickup / Delivery Date</span>
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full text-xs bg-bakery-cream p-2.5 rounded-xl border border-bakery-chocolate/10 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta"
                  />
                </div>

                {/* Subtotal summary */}
                <div className="pt-2 border-t border-bakery-chocolate/5 space-y-2">
                  <div className="flex justify-between text-xs text-bakery-chocolate-light">
                    <span>Subtotal</span>
                    <span className="font-bold text-bakery-chocolate">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-bakery-chocolate-light">
                    <span>Estimated Tax & Packaging</span>
                    <span className="font-bold text-bakery-chocolate">
                      {subtotal > 0 ? '₹30' : '₹0'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-bakery-chocolate-light">
                    <span>Delivery Charges</span>
                    <span className="font-bold text-bakery-mint">
                      {remainingForFreeDelivery === 0 ? 'FREE' : '₹50'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-bakery-chocolate pt-2 border-t border-bakery-chocolate/10">
                    <span>Total Amount</span>
                    <span className="text-bakery-terracotta">
                      ₹{subtotal + (subtotal > 0 ? 30 : 0) + (remainingForFreeDelivery === 0 ? 0 : 50)}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-bakery-terracotta text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-3 shadow-lg shadow-bakery-terracotta/30 hover:bg-bakery-terracotta-dark disabled:opacity-50 transition-all text-sm"
                >
                  {isCheckingOut ? (
                    <span>Processing Fresh Order...</span>
                  ) : (
                    <>
                      <span>Proceed to Fresh Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

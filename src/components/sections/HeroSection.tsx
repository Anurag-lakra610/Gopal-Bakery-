import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  onExploreClick: () => void;
  onBestsellersClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const { scrollY } = useScroll();
  
  // ZOOM PARALLAX EFFECT: 
  // Image starts at exactly 100% (no zoom, max HD quality). As you scroll down, it zooms in.
  const scaleImage = useTransform(scrollY, [0, 1000], [1, 1.15]);
  
  // Foreground text moves down gently, capped at 120px to ensure it stays well above the bottom (maintaining >70px padding)
  const yContent = useTransform(scrollY, [0, 1000], [0, 120]);

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center pt-24 pb-[70px] overflow-hidden bg-black select-none"
    >
      {/* Background High Definition Image with Zoom-in Scroll Animation */}
      <motion.div 
        className="absolute inset-0 z-0 will-change-transform origin-center"
        style={{ scale: scaleImage }}
      >
        <img
          src="/hero-bg-5.jpg"
          alt="Gopal Bakery Flatlay Spread"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Overlay Gradient for High Contrast Typography */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Main Content Container - 100px padding */}
      <div className="relative z-10 w-full px-[24px] sm:px-[50px] lg:px-[100px] flex flex-col justify-center h-full">
        {/* Apply Parallax to Content */}
        <motion.div 
          className="relative flex flex-col items-start w-full will-change-transform"
          style={{ y: yContent }}
        >
          
          {/* Main Giant Typography */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col"
          >
            {/* LINE 1 */}
            <h1 
              className="font-heading font-black text-white uppercase drop-shadow-2xl w-full"
              style={{ 
                fontSize: 'clamp(4rem, 12vw, 170px)', // Exactly 170px on desktop
                lineHeight: '0.85',
                letterSpacing: '4px' // Changed to 4px per user request
              }}
            >
              A BAKING
            </h1>
            
            {/* LINE 2 + PERFECT CIRCLE REVOLVING BADGE */}
            <div className="relative flex items-end">
              <h1 
                className="font-heading font-black text-white uppercase drop-shadow-2xl"
                style={{ 
                  fontSize: 'clamp(4rem, 12vw, 170px)', // Exactly 170px on desktop
                  lineHeight: '0.85',
                  letterSpacing: '4px' // Changed to 4px per user request
                }}
              >
                LOVE AFFAIR
              </h1>

              {/* INDULGE BADGE - Proper Perfect Circle with Revolving Rings */}
              <motion.button
                onClick={onExploreClick}
                className="absolute right-0 translate-x-[20%] lg:translate-x-[40%] -translate-y-[10%] w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 flex items-center justify-center focus:outline-none cursor-pointer group"
                whileHover="hover"
              >
                {/* Solid Perfect Pink Circle Background */}
                <motion.div 
                  className="absolute inset-0 bg-[#FA88CB] rounded-full shadow-2xl origin-center"
                  variants={{
                    hover: { 
                      scale: 1.1,
                      backgroundColor: "#F86BBE",
                      transition: { duration: 0.3 }
                    }
                  }}
                />

                {/* Revolving Inner Dashed Ring (makes the rotation visibly obvious on a perfect circle) */}
                <motion.div 
                  className="absolute inset-2 border-[3px] border-dashed border-white/60 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" } 
                  }}
                  variants={{
                    hover: { 
                      borderColor: "rgba(255,255,255,1)",
                      transition: { duration: 0.3 }
                    }
                  }}
                />

                {/* Secondary inner thin ring revolving opposite direction */}
                <motion.div 
                  className="absolute inset-4 border border-dotted border-white/40 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ 
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" } 
                  }}
                  variants={{
                    hover: { 
                      borderColor: "rgba(255,255,255,0.8)",
                      transition: { duration: 0.3 }
                    }
                  }}
                />

                {/* INDULGE TEXT */}
                <motion.span 
                  className="relative z-10 font-heading font-black text-base sm:text-xl lg:text-2xl uppercase text-white drop-shadow-sm pointer-events-none"
                  style={{ letterSpacing: '4px' }}
                  variants={{
                    hover: { 
                      scale: 1.1,
                      letterSpacing: "6px",
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }
                  }}
                >
                  INDULGE
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

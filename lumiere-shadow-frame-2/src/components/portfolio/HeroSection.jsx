import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection({ heroImage }) {
  const [loaded, setLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden" aria-label="Hero">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="A bride walking through an ancient stone corridor with dramatic cinematic lighting"
          className="w-full h-full object-cover object-[25%_center] md:object-left"
        />
      </div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 z-[2] grain-overlay pointer-events-none" />

      {/* Shutter panels */}
      {!prefersReducedMotion ? (
        <>
          <div
            className={`absolute inset-y-0 left-0 w-1/2 bg-obsidian z-[5] ${loaded ? 'shutter-left' : ''}`}
          />
          <div
            className={`absolute inset-y-0 right-0 w-1/2 bg-obsidian z-[5] ${loaded ? 'shutter-right' : ''}`}
          />
        </>
      ) : (
        <motion.div
          className="absolute inset-0 bg-obsidian z-[5]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Bottom overlay with studio info */}
      <div className="absolute top-[32%] left-0 right-0 z-[3] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <p className="font-interface text-[10px] md:text-xs tracking-editorial uppercase text-champagne mb-3">
            Wedding Films & Photography
          </p>
          <h2 className="font-display italic font-light text-parchment text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
            Acuña Cinema
          </h2>
          <p className="font-narrative text-parchment/60 text-base md:text-lg mt-4 max-w-md leading-relaxed">
            Capturing the eternal in every fleeting moment
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
        >
          <button
            onClick={() => {
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-champagne/50 hover:text-champagne transition-colors duration-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Scroll to portfolio"
          >
            <ChevronDown className="w-6 h-6 animate-bounce" style={{ animationDuration: '2s' }} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

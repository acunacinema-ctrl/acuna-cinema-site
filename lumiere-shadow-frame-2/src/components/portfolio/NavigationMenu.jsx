import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Films', href: '#films' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'The Journal', href: '/Journal', isPage: true },
  { label: 'Contact', href: '#contact' },
  {
  label: "Behind The Lens",
  href: "/BehindTheLens",
  isPage: true
}
];

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (item) => {
    setIsOpen(false);
    if (item.isPage) {
      setTimeout(() => navigate(item.href), 300);
    } else {
      setTimeout(() => {
        const el = document.querySelector(item.href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <>
      {/* Top bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-obsidian/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <a href="#" className="font-display italic text-parchment text-xl md:text-2xl tracking-tight">
            Acuña Cinema
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="font-interface text-[10px] md:text-xs tracking-editorial uppercase text-parchment border border-parchment/30 px-4 py-2 hover:border-champagne hover:text-champagne transition-colors duration-500 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-champagne"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? 'Close' : 'Index'}
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col justify-center px-8 md:px-20 lg:px-32 w-full md:w-1/2">
              <nav aria-label="Main navigation">
                <ul className="space-y-6 md:space-y-8">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                      <button
                        onClick={() => handleNavClick(item)}
                        className="group flex items-center gap-6 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-champagne rounded"
                      >
                        <span className="font-interface text-[10px] tracking-editorial text-champagne/40 group-hover:text-champagne transition-colors">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display italic font-light text-parchment text-4xl md:text-5xl lg:text-6xl group-hover:text-champagne transition-colors duration-500">
                          {item.label}
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-16 md:mt-20">
                <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/40 mb-3">
                  Get in touch
                </p>
                <a
                  href="mailto:acunacinema@gmail.com"
                  className="font-narrative text-parchment/60 hover:text-champagne transition-colors text-sm md:text-base"
                >
                  acunacinema@gmail.com
                </a>
              </div>
            </div>

            {/* Right side - hidden on mobile */}
            <div className="hidden md:flex items-center justify-center w-1/2 px-12">
              <div className="text-center">
                <p className="font-display italic text-parchment/20 text-8xl lg:text-9xl leading-none">
                  A
                </p>
                <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/30 mt-4">
                  Est. MMXX
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

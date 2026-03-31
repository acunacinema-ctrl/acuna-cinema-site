import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-20 py-24 md:py-32" aria-label="Footer">
      {/* Poetic statement */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="font-display italic font-light text-parchment/30 text-2xl md:text-4xl lg:text-5xl leading-snug">
          "A photograph is a secret about a secret. The more it tells you, the less you know."
        </p>
        <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/30 mt-8">
          — Diane Arbus
        </p>
      </motion.div>

      {/* Full-width line */}
      <div className="w-full h-px bg-parchment/10 mb-8" />

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/acunacinema/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-interface text-[10px] tracking-editorial uppercase text-parchment/30 hover:text-champagne transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            Instagram
          </a>
          <a
  href="https://www.facebook.com/profile.php?id=61550870555249"
  target="_blank"
  rel="noopener noreferrer"
  className="font-interface text-[10px] tracking-editorial uppercase text-parchment/30 hover:text-champagne transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
>
  Facebook
</a>
        </div>

        <p className="font-display italic text-parchment/15 text-sm">
          Acuña Cinema
        </p>

        <div className="flex items-center gap-6">
          <a
            href="mailto:acunacinema@gmail.com"
            className="font-interface text-[10px] tracking-editorial uppercase text-parchment/30 hover:text-champagne transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            Email
          </a>
          <span className="font-interface text-[10px] tracking-editorial text-parchment/15">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}

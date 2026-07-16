import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Foundation Collection',
    description: 'A refined, intentional approach to documenting your wedding day — focused on the moments that matter most.',
    details: '6 hours coverage\nDocumentary film',
    nudge: 'Crafted for couples who value authenticity, emotion, and simplicity — preserving your day in a way that feels honest and timeless.',
    pricing: 'Investment begins at $2,000',
  },
  {
    title: 'Essential Story Collection',
    description: 'Designed to preserve your story in full — from the vows you exchange to the words shared by those closest to you.',
    details: '8 hours coverage\nSocial Media Teaser film\nFull documentary film\n5–7 minute cinematic highlight film',
    nudge: 'A complete and immersive way to relive your wedding day — with depth, emotion, and intention in every frame.',
    pricing: 'Investment begins at $2,600',
  },
  {
    title: 'Signature Collection',
    subtitle: 'Most Popular',
    description: 'A more expansive approach to storytelling — capturing not just the day, but the atmosphere, energy, and in-between moments that make it yours.',
    details: '9 hours coverage\n+1 photo-focused professional artist\nSocial Media Teaser film\nFull documentary Film\n8–10 minute heirloom wedding film\n500 professionally edited photos',
    nudge: 'For couples who want a richer, more detailed narrative — crafted with a cinematic and artistic perspective.',
    pricing: 'Investment begins at $4,500',
  },
  {
    title: 'Luxury Collection',
    description: 'A fully immersive, high-touch experience — designed to document your wedding with the highest level of care, artistry, and intention.',
    details: '10+ hours coverage\n+2 photo/video focused professional artists\nSocial Media Teaser film\nFull documentary Film\n12–15 minute heirloom film\n800 professionally edited photos\nPriority delivery',
    nudge: 'An elevated, bespoke approach for couples who want their story told at the highest level — timeless, cinematic, and deeply personal.',
    pricing: 'Investment begins at $7,000',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="px-6 md:px-12 lg:px-20 py-24 md:py-40" aria-label="Services">
      <motion.div
        className="mb-16 md:mb-24 md:ml-[8%]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-interface text-[10px] md:text-xs tracking-editorial uppercase text-champagne mb-4">
          Offerings
        </p>
        <h2 className="font-display italic font-light text-parchment text-3xl md:text-5xl lg:text-6xl leading-[1.15]">
          Wedding Films That Let You<br />Relive Every Feeling
        </h2>
        <p className="font-narrative text-parchment/60 text-base md:text-lg leading-relaxed mt-6 max-w-xl">
          Thoughtfully crafted films and imagery designed to preserve not just how your day looked — but how it felt.
        </p>
        <p className="font-narrative text-parchment/40 text-sm leading-relaxed mt-4">
          Foundation collection begins at $2,800. Most couples invest around $3,500 - $4,700.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            className="relative flex flex-col p-8 md:p-10 border border-parchment/10 hover:border-champagne/30 transition-colors duration-700"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.7 }}
          >
            {/* Corner accent */}
            <span className="absolute top-0 left-0 w-6 h-px bg-champagne/40" />
            <span className="absolute top-0 left-0 w-px h-6 bg-champagne/40" />

            <span className="font-interface text-[10px] tracking-editorial text-champagne/30 mb-8">
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="mb-6">
              <h3 className="font-display italic font-light text-parchment text-2xl md:text-3xl leading-tight">
                {service.title}
              </h3>
              {service.subtitle && (
                <p className="font-narrative text-parchment/30 text-xs leading-relaxed mt-2 italic">
                  {service.subtitle}
                </p>
              )}
            </div>

            <p className="font-narrative text-parchment/45 text-sm leading-relaxed mb-8">
              {service.description}
            </p>

            <div className="mt-auto space-y-2">
              {service.details.split('\n').map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-champagne/40 mt-[3px] text-[8px]">—</span>
                  <p className="font-interface text-[10px] tracking-wide text-champagne/50 uppercase leading-relaxed">{line}</p>
                </div>
              ))}
            </div>

            {service.nudge && (
              <p className="font-narrative text-parchment/25 text-xs leading-relaxed mt-6 italic">
                {service.nudge}
              </p>
            )}

            {service.pricing && (
              <p className="font-display italic text-parchment text-xl mt-6">
                {service.pricing}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Enhancements */}
      <motion.div
        className="max-w-7xl mx-auto mt-16 md:mt-20 border border-parchment/10 p-8 md:p-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="md:grid md:grid-cols-12 md:gap-12 items-start">
          <div className="md:col-span-4 mb-8 md:mb-0">
            <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne mb-3">
              Enhancements
            </p>
            <p className="font-narrative text-parchment/40 text-sm leading-relaxed">
              Tailor your selection with thoughtful additions designed to elevate your experience and preserve even more of your story.
            </p>
          </div>
          <div className="md:col-span-8 space-y-5">
            {[
              { label: 'Additional Coverage', price: '$100/hr' },
              { label: 'Engagement Photo/Film Session', price: '$1,000' },
              { label: 'Foundation & Essential Collections Photo Coverage', price: '$2,500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-6 border-b border-parchment/8 pb-5 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="text-champagne/30 text-[8px]">—</span>
                  <p className="font-narrative text-parchment/70 text-sm md:text-base">{item.label}</p>
                </div>
                <p className="font-display italic text-parchment/60 text-base whitespace-nowrap">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}

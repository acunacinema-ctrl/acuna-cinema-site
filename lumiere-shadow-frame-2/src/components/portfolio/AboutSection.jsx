import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection({ portraitImage }) {
  return (
    <section id="about" className="px-6 md:px-12 lg:px-20 py-24 md:py-40" aria-label="About">
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
        {/* Portrait - offset right on desktop */}
        <motion.div
          className="col-span-12 md:col-span-5 md:col-start-2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="relative">
            <img
              src={portraitImage}
              alt="Portrait of the filmmaker and photographer at Acuña Cinema"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 grain-overlay pointer-events-none" />
          </div>
        </motion.div>

        {/* Text content - offset further right */}
        <motion.div
          className="col-span-12 md:col-span-5 md:col-start-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="font-interface text-[10px] md:text-xs tracking-editorial uppercase text-champagne mb-6">
            The Auteur, Davíd Roel Acuña
          </p>
          <h2 className="font-display italic font-light text-parchment text-3xl md:text-4xl lg:text-5xl leading-[0.95] mb-8">
            Behind<br />the lens
          </h2>
          <div className="space-y-6">
            <p className="font-narrative text-parchment/60 text-base md:text-lg leading-relaxed">
              With over 8 years dedicated to the art of visual storytelling, I approach every wedding as a singular, 
              unrepeatable work of cinema. My philosophy is simple: the most profound moments are the ones that exist 
              between the expected.
            </p>
            <p className="font-narrative text-parchment/60 text-base md:text-lg leading-relaxed">
              A hand reaching for another. The way fabric catches the light in a corridor. 
              The silence before a vow. These are the fragments I preserve — as legacy.
            </p>
            <p className="font-narrative text-parchment/40 text-sm leading-relaxed mt-8">
              Based in Michigan. Available worldwide.
            </p>
          </div>


        </motion.div>
      </div>
    </section>
  );
}
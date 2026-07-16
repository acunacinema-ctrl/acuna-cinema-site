import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FilmCard from './FilmCard';

const films = [
  {
    title: 'Rachel & Martin',
    location: 'Holland, Michigan',
    year: '2026',
    cover: 'https://media.base44.com/images/public/69af8d2c4b2e24d43b5fa37a/b54ec9c85_67a7b444-7ebf-4528-9b7f-64aafc9c949e.png',
    filmUrl: 'https://vimeo.com/1178909337?share=copy&fl=sv&fe=ci',
  },
  {
    title: 'Anna & Chris',
    location: 'Saline, Michigan',
    year: '2025',
    cover: 'https://media.base44.com/images/public/69af8d2c4b2e24d43b5fa37a/ca4922e43_wedding_parasol_16x9_download.png',
    filmUrl: 'https://vimeo.com/1173873620',
  },
  {
    title: 'Abby & Ryan',
    location: 'Grand Rapids, Michigan',
    year: '2025',
    cover: 'https://media.base44.com/images/public/69af8d2c4b2e24d43b5fa37a/7ecd00f04_3f2ce8f8-4487-4f31-a31b-6b8a2588c21d.png',
    filmUrl: 'https://vimeo.com/1178909337?fl=pl&fe=sh',
  },
];

export default function FilmsSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <section id="films" className="px-6 md:px-12 lg:px-20 py-24 md:py-40" aria-label="Films">
      <motion.div
        className="mb-16 md:mb-24 md:ml-auto md:mr-[8%] md:text-right"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-interface text-[10px] md:text-xs tracking-editorial uppercase text-champagne mb-4">
          Cinematic Films
        </p>
        <h2 className="font-display italic font-light text-parchment text-3xl md:text-5xl lg:text-6xl leading-[0.95]">
          Stories told<br />in motion
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
       {films.map((film, i) => (
  <FilmCard
    key={film.title}
    film={film}
    index={i}
    activeIndex={activeIndex}
    setActiveIndex={setActiveIndex}
  />
))}
      </div>

      <motion.p
        className="font-interface text-[10px] tracking-editorial uppercase text-parchment/20 text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Hover to preview · Click to watch full film
      </motion.p>
    </section>
  );
}

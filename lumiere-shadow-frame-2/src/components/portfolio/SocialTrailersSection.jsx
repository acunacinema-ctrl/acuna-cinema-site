import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FilmCard from './FilmCard';
import tahlorRonnellBed from '@/assets/images/TahlorRonnellBedPhoto.png';
import kyleNatalieBridge from '@/assets/images/KyleNatalieBridge.jpg';

const trailers = [
  {
    title: 'Social Media Trailer 1',
    cover: tahlorRonnellBed,
    filmUrl: 'https://vimeo.com/1241807493/4fb8e7485d?share=copy&fl=sv&fe=ci',
  },
  {
    title: 'Social Media Trailer 2',
    cover: kyleNatalieBridge,
    filmUrl: 'https://vimeo.com/1241809505/866fbd351a?share=copy&fl=sv&fe=ci',
  },
];

export default function SocialTrailersSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section
      id="social-trailers"
      className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-12 md:pb-20"
      aria-label="Social Media Trailers"
    >
      <motion.div
        className="mb-12 md:mb-16 md:ml-auto md:mr-[8%] md:text-right"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-interface text-[10px] md:text-xs tracking-editorial uppercase text-champagne mb-4">
          Social Media Trailers
        </p>

        <h2 className="font-display italic font-light text-parchment text-3xl md:text-5xl lg:text-6xl leading-[0.95]">
          Moments made
          <br />
          to share
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
        {trailers.map((film, i) => (
          <FilmCard
            key={film.title}
            film={film}
            index={i}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            showInfo={false}
          />
        ))}
      </div>

      <motion.p
        className="font-interface text-[10px] tracking-editorial uppercase text-parchment/30 text-center mt-12 md:mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Tap a trailer to watch
      </motion.p>
    </section>
  );
}

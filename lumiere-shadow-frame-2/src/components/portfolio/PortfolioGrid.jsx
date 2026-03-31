import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function PortfolioImage({ src, alt, aspect, className = '' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <img
        src={src}
        alt={alt}
        className={`portfolio-image w-full h-full object-cover ${inView ? 'in-view' : ''}`}
        loading="lazy"
      />
    </motion.div>
  );
}

export default function PortfolioGrid({ images }) {
  return (
    <section id="portfolio" className="px-6 md:px-12 lg:px-20 py-24 md:py-40" aria-label="Portfolio">
      <motion.div
        className="mb-16 md:mb-24 md:ml-[8%]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-interface text-[10px] md:text-xs tracking-editorial uppercase text-champagne mb-4">
          Selected Works
        </p>
        <h2 className="font-display italic font-light text-parchment text-3xl md:text-5xl lg:text-6xl leading-[0.95]">
          A curation of<br />timeless moments
        </h2>
      </motion.div>

      {/* Asymmetric masonry grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
        {/* Row 1 */}
        <PortfolioImage
          src={images[0]?.src}
          alt={images[0]?.alt}
          className="col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[3/4]"
        />
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6 lg:gap-8">
          <PortfolioImage
            src={images[1]?.src}
            alt={images[1]?.alt}
            className="aspect-[16/9]"
          />

        </div>

        {/* Row 2 */}
        <div className="col-span-12 md:col-span-4 md:col-start-2 flex flex-col justify-end">
          <motion.p
            className="font-narrative text-parchment/40 text-sm md:text-base leading-relaxed mb-8 hidden md:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Every frame is a fragment of eternity — a whisper between two souls, preserved in light and shadow.
          </motion.p>
          <PortfolioImage
            src={images[2]?.src}
            alt={images[2]?.alt}
            className="aspect-square"
          />
        </div>
        <PortfolioImage
          src={images[3]?.src}
          alt={images[3]?.alt}
          className="col-span-12 md:col-span-6 md:col-start-7 aspect-[3/4]"
        />

        {/* Row 3 */}
        <PortfolioImage
          src={images[4]?.src}
          alt={images[4]?.alt}
          className="col-span-12 aspect-[16/9] md:aspect-[21/9]"
        />
      </div>
    </section>
  );
}

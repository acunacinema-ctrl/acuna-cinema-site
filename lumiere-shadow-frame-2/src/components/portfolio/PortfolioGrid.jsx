import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function PortfolioImage({ images = [], alt, className = '' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    if (images.length <= 1) return;

    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length <= 1) return;

    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;

    const diff = touchStartX - e.changedTouches[0].clientX;

    if (diff > 50) nextImage();

    if (diff < -50) prevImage();

    setTouchStartX(null);
  };

  return (
    <motion.div
      ref={ref}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative overflow-hidden group ${className}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images?.[index]?.src || images?.[index]}
          alt={images?.[index]?.alt || alt}
          className={`portfolio-image w-full h-full object-cover ${
            inView ? 'in-view' : ''
          }`}
          loading="lazy"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut'
          }}
        />
      </AnimatePresence>

      {/* Image progress indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-4 flex gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-[2px] w-4 transition-all duration-300 ${
                i === index
                  ? 'bg-champagne'
                  : 'bg-champagne/30'
              }`}
            />
          ))}
        </div>
      )}

      {/* View More button */}
      {images.length > 1 && (
        <button
          onClick={nextImage}
          className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] tracking-editorial uppercase text-parchment/70 hover:text-champagne transition-all duration-300"
        >
          <span className="font-interface">
            View More
          </span>

          <span className="font-display italic text-lg">
            ›
          </span>
        </button>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />
    </motion.div>
  );
}

export default function PortfolioGrid({ images }) {
  return (
    <section
      id="portfolio"
      className="px-6 md:px-12 lg:px-20 py-24 md:py-40"
      aria-label="Portfolio"
    >
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
          A curation of
          <br />
          timeless moments
        </h2>

        <p className="font-interface text-[10px] tracking-editorial uppercase text-parchment/40 mt-6">
          Swipe to view more
        </p>
      </motion.div>

      {/* Existing portfolio layout */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
        {/* Left feature gallery */}
        <PortfolioImage
          images={images[0]?.images}
          alt={images[0]?.alt}
          className="col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[3/4]"
        />

        {/* Right stacked galleries */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6 lg:gap-8">
          <PortfolioImage
            images={images[1]?.images}
            alt={images[1]?.alt}
            className="aspect-[16/9]"
          />

          <PortfolioImage
            images={images[2]?.images}
            alt={images[2]?.alt}
            className="aspect-[3/4]"
          />
        </div>

        {/* New JT wedding gallery */}
        {images[3]?.images && (
          <PortfolioImage
            images={images[3]?.images}
            alt={images[3]?.alt}
            className="col-span-12 md:col-span-8 md:col-start-3 aspect-[4/5] md:aspect-[16/10]"
          />
        )}
      </div>
    </section>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import NavigationMenu from '../components/portfolio/NavigationMenu';
import Footer from '../components/portfolio/Footer';

function GalleryImage({ src, alt }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="overflow-hidden aspect-[3/4] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-all duration-700 ease-out"
        style={{
          filter: inView && hovered ? 'grayscale(0%)' : 'grayscale(100%)',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
      />
    </div>
  );
}

export default function CoupleStoryPage() {
  const { id } = useParams();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['couple-story', id],
    queryFn: () => base44.entities.JournalStory.filter({ published: true }),
  });

  const story = stories.find(s => s.id === id);

  if (isLoading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin" />
    </div>
  );

  if (!story) return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <p className="font-display italic text-parchment/40 text-2xl">Story not found.</p>
    </div>
  );

  const gallery = (story.images || []).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavigationMenu />

      {/* Full-bleed Hero */}
      <section className="relative h-[90vh] min-h-[560px] flex items-end overflow-hidden">
        {story.cover_image ? (
          <img
            src={story.cover_image}
            alt={story.couple_names}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-secondary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />

        <motion.div
          className="relative z-10 px-6 md:px-12 lg:px-20 pb-16 md:pb-28 w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {story.location_name && (
            <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne mb-4">
              {story.location_name}{story.location_name && story.venue_name ? ' · ' : ''}{story.venue_name}
            </p>
          )}
          <h1 className="font-display italic font-light text-parchment text-5xl md:text-7xl lg:text-8xl leading-[0.9]">
            {story.couple_names}
          </h1>
        </motion.div>
      </section>

      {/* Story Text */}
      {story.story_text && (
        <>
          <div className="w-full h-px bg-parchment/10" />
          <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/40 mb-8">Their Story</p>
              <p className="font-narrative text-parchment/60 text-base md:text-lg leading-relaxed">
                {story.story_text}
              </p>
            </motion.div>
          </section>
        </>
      )}

      {/* Photo Gallery */}
      {gallery.length > 0 && (
        <>
          <div className="w-full h-px bg-parchment/10" />
          <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/40 mb-8">Photography</p>
              <div className={`grid gap-4 ${gallery.length === 1 ? 'grid-cols-1 max-w-md' : gallery.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
                {gallery.map((url, i) => (
                  <GalleryImage key={i} src={url} alt={`${story.couple_names} ${i + 1}`} />
                ))}
              </div>
              <p className="font-interface text-[9px] tracking-editorial uppercase text-parchment/20 mt-4">
                Hover to reveal colour
              </p>
            </motion.div>
          </section>
        </>
      )}

      {/* Venue & Location Links */}
      <div className="w-full h-px bg-parchment/10" />
      <section className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-20">
          {story.venue_name && story.venue_slug && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/30 mb-3">Venue</p>
              <Link
                to={`/venue/${story.venue_slug}`}
                className="font-display italic font-light text-parchment text-2xl md:text-3xl hover:text-champagne transition-colors duration-500"
              >
                {story.venue_name}
              </Link>
              <p className="font-interface text-[9px] tracking-editorial uppercase text-parchment/20 mt-2">View venue →</p>
            </motion.div>
          )}
          {story.location_name && story.location_slug && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/30 mb-3">Location</p>
              <Link
                to={`/location/${story.location_slug}`}
                className="font-display italic font-light text-parchment text-2xl md:text-3xl hover:text-champagne transition-colors duration-500"
              >
                {story.location_name}, Michigan
              </Link>
              <p className="font-interface text-[9px] tracking-editorial uppercase text-parchment/20 mt-2">Explore location →</p>
            </motion.div>
          )}
        </div>
      </section>

      <div className="px-6 md:px-12 lg:px-20 py-10">
        <Link to="/Journal" className="font-interface text-[10px] tracking-editorial uppercase text-champagne/50 hover:text-champagne transition-colors">
          ← Back to Journal
        </Link>
      </div>

      <Footer />
    </div>
  );
}
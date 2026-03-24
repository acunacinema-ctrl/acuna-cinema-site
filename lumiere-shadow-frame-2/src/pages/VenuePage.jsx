import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import NavigationMenu from '../components/portfolio/NavigationMenu';
import Footer from '../components/portfolio/Footer';
import FilmPreviewCard from '../components/portfolio/FilmPreviewCard';

function toEmbedUrl(url) {
  if (!url) return null;
  // Vimeo: https://vimeo.com/123456 → https://player.vimeo.com/video/123456
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?title=0&byline=0&portrait=0`;
  // YouTube watch: https://youtube.com/watch?v=ID
  const ytWatch = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;
  // YouTube short: https://youtu.be/ID
  const ytShort = url.match(/youtu\.be\/([\w-]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;
  // Already an embed URL
  return url;
}

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

export default function VenuePage() {
  const { slug } = useParams();

  const { data: venues = [], isLoading } = useQuery({
    queryKey: ['venue', slug],
    queryFn: () => base44.entities.Venue.filter({ slug, published: true }),
  });

  const { data: stories = [] } = useQuery({
    queryKey: ['venue-stories', slug],
    queryFn: () => base44.entities.JournalStory.filter({ venue_slug: slug, published: true }, '-wedding_date'),
    enabled: venues.length > 0,
  });

  const venue = venues[0];

  if (isLoading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin" />
    </div>
  );

  if (!venue) return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <p className="font-display italic text-parchment/40 text-2xl">Venue not found.</p>
    </div>
  );

  const gallery = (venue.gallery_images || []).slice(0, 3);
  const embedUrl = toEmbedUrl(venue.film_url);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavigationMenu />

      {/* Full-bleed Hero with overlay text */}
      <section className="relative h-[85vh] min-h-[520px] flex items-end overflow-hidden">
        {venue.cover_image ? (
          <img
            src={venue.cover_image}
            alt={venue.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-secondary" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />

        {/* Text overlay on photo */}
        <motion.div
          className="relative z-10 px-6 md:px-12 lg:px-20 pb-16 md:pb-24 w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne mb-4">
            {[venue.city, venue.state].filter(Boolean).join(', ')}
          </p>
          <h1 className="font-display italic font-light text-parchment text-5xl md:text-7xl lg:text-8xl leading-[0.9]">
            {venue.name}
          </h1>
        </motion.div>
      </section>

      {/* Gallery — 3 grayscale-to-color images */}
      {gallery.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <motion.div
            className={`grid gap-4 ${gallery.length === 1 ? 'grid-cols-1 max-w-lg' : gallery.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {gallery.map((url, i) => (
              <GalleryImage key={i} src={url} alt={`${venue.name} ${i + 1}`} />
            ))}
          </motion.div>
          <p className="font-interface text-[9px] tracking-editorial uppercase text-parchment/20 mt-4">
            Hover to reveal colour
          </p>
        </section>
      )}

      {/* Featured Film */}
      {venue.film_url && (
        <>
          <div className="w-full h-px bg-parchment/10" />
          <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
            <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/40 mb-6">
              Featured Film
            </p>
            <FilmPreviewCard
              filmUrl={venue.film_url}
              coverImage={venue.cover_image}
            />
          </section>
        </>
      )}

      {/* Description */}
      {venue.description && (
        <>
          <div className="w-full h-px bg-parchment/10" />
          <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/40 mb-6">
                About the Venue
              </p>
              <p className="font-narrative text-parchment/60 text-base md:text-lg leading-relaxed">
                {venue.description}
              </p>
            </motion.div>
          </section>
        </>
      )}

      {/* Related Stories */}
      {stories.length > 0 && (
        <>
          <div className="w-full h-px bg-parchment/10" />
          <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
            <motion.div className="max-w-2xl mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/40 mb-4">Films at this venue</p>
              <h2 className="font-display italic font-light text-parchment text-2xl md:text-4xl">Wedding Stories</h2>
            </motion.div>
            <div className="border-t border-parchment/10 max-w-3xl">
              {stories.map((story, i) => (
                <motion.div key={story.id} className="flex gap-6 py-8 border-b border-parchment/10 items-start"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}>
                  {story.cover_image && <img src={story.cover_image} alt={story.couple_names} className="w-24 h-16 object-cover shrink-0 hidden sm:block" loading="lazy" />}
                  <div>
                    <h3 className="font-display italic font-light text-parchment text-xl mb-2">{story.couple_names}</h3>
                    <Link to="/Journal" className="font-interface text-[10px] tracking-editorial uppercase text-champagne/50 hover:text-champagne transition-colors">View in Journal →</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}

      <div className="px-6 md:px-12 lg:px-20 py-10">
        <Link to="/Journal" className="font-interface text-[10px] tracking-editorial uppercase text-champagne/50 hover:text-champagne transition-colors">← Back to Journal</Link>
      </div>

      <Footer />
    </div>
  );
}
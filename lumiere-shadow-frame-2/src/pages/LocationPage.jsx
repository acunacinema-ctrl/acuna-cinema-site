import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import NavigationMenu from '../components/portfolio/NavigationMenu';
import Footer from '../components/portfolio/Footer';

export default function LocationPage() {
  const { slug } = useParams();

  const { data: locations = [], isLoading } = useQuery({
    queryKey: ['location', slug],
    queryFn: () => base44.entities.Location.filter({ slug, published: true }),
  });

  const { data: stories = [] } = useQuery({
    queryKey: ['location-stories', slug],
    queryFn: () => base44.entities.JournalStory.filter({ location_slug: slug, published: true }, '-wedding_date'),
    enabled: locations.length > 0,
  });

  const location = locations[0];

  if (isLoading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin" />
    </div>
  );

  if (!location) return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <p className="font-display italic text-parchment/40 text-2xl">Location not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavigationMenu />

      {/* Hero */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-40 pb-24 overflow-hidden">
        {location.cover_image && (
          <div className="absolute inset-0 z-0">
            <img src={location.cover_image} alt={location.name} className="w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          </div>
        )}
        <motion.div className="relative z-10 max-w-2xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne mb-4">
            Location · {location.region || 'Michigan'}
          </p>
          <h1 className="font-display italic font-light text-parchment text-4xl md:text-6xl leading-[0.95] mb-8">
            {location.name}
          </h1>
          {location.description && (
            <p className="font-narrative text-parchment/60 text-base md:text-lg leading-relaxed max-w-xl">
              {location.description}
            </p>
          )}
        </motion.div>
      </section>

      <div className="w-full h-px bg-parchment/10" />

      {/* Stories in this location */}
      {stories.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-28">
          <motion.div className="max-w-2xl mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/40 mb-4">Films in this area</p>
            <h2 className="font-display italic font-light text-parchment text-2xl md:text-4xl">Wedding Stories</h2>
          </motion.div>
          <div className="border-t border-parchment/10 max-w-3xl">
            {stories.map((story, i) => (
              <motion.div key={story.id} className="flex gap-6 py-8 border-b border-parchment/10 items-start"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}>
                {story.cover_image && <img src={story.cover_image} alt={story.couple_names} className="w-24 h-16 object-cover shrink-0 hidden sm:block" loading="lazy" />}
                <div>
                  <h3 className="font-display italic font-light text-parchment text-xl mb-2">{story.couple_names}</h3>
                  {story.venue_name && <p className="font-interface text-[10px] tracking-editorial uppercase text-parchment/30 mb-2">{story.venue_name}</p>}
                  <Link to="/Journal" className="font-interface text-[10px] tracking-editorial uppercase text-champagne/50 hover:text-champagne transition-colors">View in Journal →</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <div className="px-6 md:px-12 lg:px-20 py-10">
        <Link to="/Journal" className="font-interface text-[10px] tracking-editorial uppercase text-champagne/50 hover:text-champagne transition-colors">← Back to Journal</Link>
      </div>

      <Footer />
    </div>
  );
}
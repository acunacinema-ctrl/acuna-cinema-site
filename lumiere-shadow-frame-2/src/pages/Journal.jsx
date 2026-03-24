import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import NavigationMenu from '../components/portfolio/NavigationMenu';
import Footer from '../components/portfolio/Footer';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

function CoupleCard({ story, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: index * 0.07 }}
    >
      <Link to={`/story/${story.id}`} className="block group relative overflow-hidden">
        {/* Photo */}
        <div className="relative overflow-hidden aspect-[3/4] md:aspect-[16/9]">
          {story.cover_image ? (
            <img
              src={story.cover_image}
              alt={story.couple_names}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-secondary" />
          )}

          {/* Permanent dark gradient from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
            {story.location_name && (
              <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne mb-3 transition-opacity duration-500">
                {story.location_name}, Michigan
                {story.venue_name ? ` · ${story.venue_name}` : ''}
              </p>
            )}
            <h2 className="font-display italic font-light text-parchment text-4xl md:text-6xl lg:text-7xl leading-[0.9] transition-colors duration-500 group-hover:text-champagne">
              {story.couple_names}
            </h2>
          </div>

          {/* Hover reveal line */}
          <div className="absolute bottom-0 left-0 h-px bg-champagne/60 w-0 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function Journal() {
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['journal-stories-public'],
    queryFn: () => base44.entities.JournalStory.filter({ published: true }, '-wedding_date'),
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavigationMenu />

      {/* Hero Header */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-40 pb-24 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
            alt="Cinematic wedding"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <motion.div
          className="relative z-10 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="font-interface text-[10px] md:text-xs tracking-editorial uppercase text-champagne mb-4">
            The Journal · Acuña Cinema
          </p>
          <h1 className="font-display italic font-light text-parchment text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-8">
            Featured Wedding<br />Stories
          </h1>
          <p className="font-narrative text-parchment/55 text-base md:text-lg leading-relaxed max-w-xl">
            A curated archive of cinematic wedding films — each one a singular document of love, place, and the unrepeatable beauty of a single day.
          </p>
        </motion.div>
      </section>

      <div className="w-full h-px bg-parchment/10" />

      {/* Couples List */}
      <section className="py-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-40">
            <div className="w-6 h-6 border-2 border-champagne/30 border-t-champagne rounded-full animate-spin" />
          </div>
        ) : (
          <div className="divide-y divide-parchment/10">
            {stories.map((story, i) => (
              <CoupleCard key={story.id} story={story} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <div className="w-full h-px bg-parchment/10" />
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32 bg-secondary/30">
        <motion.div className="max-w-xl" {...fadeUp}>
          <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne mb-6">
            Planning a Wedding in Michigan?
          </p>
          <h2 className="font-display italic font-light text-parchment text-3xl md:text-5xl leading-[0.95] mb-8">
            We accept a limited number of weddings each year
          </h2>
          <p className="font-narrative text-parchment/50 text-base leading-relaxed mb-10">
            Every film receives a cinematic level of attention. Reach out to check availability for your date.
          </p>
          <a
            href="/#contact"
            className="inline-block font-interface text-[10px] tracking-editorial uppercase text-primary-foreground bg-champagne px-10 py-4 hover:bg-parchment transition-colors duration-500"
          >
            Check Availability
          </a>
        </motion.div>
      </section>

      <div className="px-6 md:px-12 lg:px-20 py-12">
        <Link
          to="/"
          className="font-interface text-[10px] tracking-editorial uppercase text-champagne/50 hover:text-champagne transition-colors duration-500"
        >
          ← Return home
        </Link>
      </div>

      <Footer />
    </div>
  );
}
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function toEmbedUrl(url) {
  if (!url) return null;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&title=0&byline=0&portrait=0`;
  const ytWatch = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}?autoplay=1`;
  const ytShort = url.match(/youtu\.be\/([\w-]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}?autoplay=1`;
  return url;
}

function toPreviewUrl(url) {
  if (!url) return null;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?background=1&autoplay=1&muted=1&loop=1`;
  return null;
}

export default function FilmCard({ film, index, activeIndex, setActiveIndex }) {
  const videoRef = useRef(null);
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const isActive = isMobile ? activeIndex === index : isHovered;

  const isVimeo = !!film.filmUrl;
  const previewUrl = toPreviewUrl(film.filmUrl);

  useEffect(() => {
    setIsMobile('ontouchstart' in window || window.innerWidth < 768);
  }, []);
  useEffect(() => {
  if (!isMobile) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setActiveIndex(index);
      }
    },
    { threshold: 0.6 }
  );

  if (ref.current) observer.observe(ref.current);

  return () => observer.disconnect();
}, [index, isMobile]);

  const handleEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
    if (!isVimeo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    if (!isVimeo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (isVimeo) {
      setModalOpen(true);
      return;
    }
    if (!isMobile) return;
    if (isPlaying) {
      setIsHovered(false);
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      setIsHovered(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <motion.div
  ref={ref}
  className="group relative cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        tabIndex={0}
        role="button"
        aria-label={`Watch preview of ${film.title}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
        onFocus={handleEnter}
        onBlur={handleLeave}
      >
        {/* Card */}
        <div className="relative overflow-hidden aspect-[16/9]">
          {/* Cover photo */}
          <img
            src={film.cover}
            alt={`${film.title} - wedding film cover`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              isActive && !isVimeo ? 'scale-105 opacity-0' : isActive ? 'scale-105' : 'scale-100 opacity-100'
            }`}
          />

          {/* Video preview — mp4 */}
          {!isVimeo && (
            <video
              ref={videoRef}
              src={film.video}
              muted
              playsInline
              loop
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Vimeo background preview iframe */}
          {isVimeo && previewUrl && (
            <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}>
              {isActive && (
                <iframe
                  src={previewUrl}
                  className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  allow="autoplay; fullscreen"
                  title={`${film.title} preview`}
                />
              )}
            </div>
          )}

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent z-10" />

          {/* Grain overlay */}
          <div className="absolute inset-0 z-[11] grain-overlay pointer-events-none opacity-60" />

          {/* "Watch Full Film" text — appears on hover */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                className="absolute inset-0 z-20 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="h-px bg-champagne w-16 mx-auto mb-5 origin-left"
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="font-interface text-[11px] md:text-xs tracking-editorial uppercase text-champagne"
                  >
                    Watch Full Film
                  </motion.p>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                    className="h-px bg-champagne w-16 mx-auto mt-5 origin-right"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner brackets */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-4 h-px bg-champagne" />
              <div className="w-px h-4 bg-champagne" />
            </div>
          </div>
          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <div className={`flex flex-col items-end transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-4 h-px bg-champagne" />
              <div className="w-px h-4 bg-champagne ml-auto" />
            </div>
          </div>
        </div>

        {/* Card info below */}
        <div className="pt-5 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`font-display italic font-light text-xl md:text-2xl leading-tight transition-colors duration-500 ${
                isActive ? 'text-champagne' : 'text-parchment'
              }`}>
                {film.title}
              </h3>
              <p className="font-interface text-[10px] tracking-editorial uppercase text-parchment/30 mt-2">
                {film.location}
              </p>
            </div>
            <span className="font-interface text-[10px] tracking-editorial text-champagne/30 mt-1">
              {film.year}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Vimeo Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 backdrop-blur-sm p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={e => e.stopPropagation()}
            >
              <iframe
                src={toEmbedUrl(film.filmUrl)}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={film.title}
              />
              <button
                onClick={() => setModalOpen(false)}
                className="absolute -top-10 right-0 font-interface text-[10px] tracking-editorial uppercase text-parchment/50 hover:text-champagne transition-colors flex items-center gap-2"
              >
                <X className="w-3 h-3" /> Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

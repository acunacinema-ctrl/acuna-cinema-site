import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function toEmbedUrl(url) {
  if (!url) return null;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?title=0&byline=0&portrait=0&autoplay=1`;
  const ytWatch = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}?autoplay=1`;
  const ytShort = url.match(/youtu\.be\/([\w-]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}?autoplay=1`;
  if (url.includes('?')) return url + '&autoplay=1';
  return url + '?autoplay=1';
}

export default function FilmPreviewCard({ filmUrl, coverImage, title, subtitle }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const embedUrl = toEmbedUrl(filmUrl);

  return (
    <>
      {/* Preview Card */}
      <motion.div
        className="relative overflow-hidden aspect-video cursor-pointer group max-w-4xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Cover image */}
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ${hovered ? 'scale-105' : 'scale-100'}`}
          />
        ) : (
          <div className="w-full h-full bg-secondary" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />

        {/* Grain */}
        <div className="absolute inset-0 grain-overlay pointer-events-none opacity-60" />

        {/* Corner brackets */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className={`transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-4 h-px bg-champagne" />
            <div className="w-px h-4 bg-champagne" />
          </div>
        </div>
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <div className={`flex flex-col items-end transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-4 h-px bg-champagne" />
            <div className="w-px h-4 bg-champagne ml-auto" />
          </div>
        </div>

        {/* Watch Full Film label */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} className="h-px bg-champagne w-16 mx-auto mb-5 origin-left" />
              <p className="font-interface text-[11px] md:text-xs tracking-editorial uppercase text-champagne">Watch Full Film</p>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: [0.76, 0, 0.24, 1] }} className="h-px bg-champagne w-16 mx-auto mt-5 origin-right" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom meta */}
        {(title || subtitle) && (
          <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5">
            {subtitle && <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/60 mb-1">{subtitle}</p>}
            {title && <p className="font-display italic font-light text-parchment text-xl md:text-2xl">{title}</p>}
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 backdrop-blur-sm p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(false)}
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
                src={embedUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={title}
              />
              <button
                onClick={() => setOpen(false)}
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
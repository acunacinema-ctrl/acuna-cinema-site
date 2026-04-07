import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    couple_names: "Anna & Chris",
    location: "Saline, Michigan",
    wedding_year: "2025",
    review:
      "Davíd has a gift for finding the moments you didn’t even know were happening. Watching our film for the first time, we were in tears — not because it was sad, but because it captured something true. We felt like ourselves, not performers.",
  },
  {
    couple_names: "Rachel & Martin",
    location: "Holland, Michigan",
    wedding_year: "2025",
    review:
      "From the first conversation, we knew Acuña Cinema was different. Davíd listened — really listened — to what our day meant to us. The film he created is something we’ll pass down for generations. It doesn’t just show our wedding, it tells our story.",
  },
  {
    couple_names: "Janae & Sergio",
    location: "Orlando, Florida",
    wedding_year: "2023",
    review:
      "I’ve never experienced a videographer so present, yet so invisible. He moved through our day like a shadow, and what he captured was pure magic. Every glance, every laugh, every quiet in-between moment — all of it preserved exactly as it was.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 text-center overflow-hidden"
    >
      {/* Background quote */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="font-display italic text-parchment/[0.03] text-[18rem] leading-none">
          ”
        </p>
      </div>

      {/* Heading */}
      <div className="mb-20">
        <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne mb-4">
          In Their Words
        </p>
        <h2 className="font-display italic font-light text-parchment text-3xl md:text-5xl lg:text-6xl leading-[1.1]">
          Stories from those<br />who lived them
        </h2>
      </div>

      {/* Locked height container (prevents page jumping) */}
      <div className="max-w-3xl mx-auto relative min-h-[280px] md:min-h-[320px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute w-full"
          >
            {/* Review text */}
            <p className="font-narrative text-parchment/70 text-lg md:text-xl lg:text-2xl leading-relaxed italic mb-10">
              “{t.review}”
            </p>

            {/* Couple info */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-px bg-champagne/30 mb-4" />
              <p className="font-display italic text-parchment text-xl md:text-2xl">
                {t.couple_names}
              </p>
              <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/40 mt-1">
                {t.location} · {t.wedding_year}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

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
  const [direction, setDirection] = useState(0);

  const paginate = (dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 7000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
      
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
        <h2 className="font-display italic font-light text-parchment text-3xl md:text-5xl lg:text-6xl">
          Stories from those<br />who lived them
        </h2>
      </div>

      {/* Locked height container */}
      <div className="max-w-3xl mx-auto relative min-h-[280px] md:min-h-[320px] flex items-center justify-center">

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x < -50) paginate(1);
              if (info.offset.x > 50) paginate(-1);
            }}
            className="absolute w-full cursor-grab active:cursor-grabbing"
          >
            <p className="font-narrative text-parchment/70 text-lg md:text-xl lg:text-2xl leading-relaxed italic mb-10">
              “{t.review}”
            </p>

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

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 mt-14">

        {/* Left */}
        <button
          onClick={() => paginate(-1)}
          className="text-parchment/30 hover:text-champagne transition duration-500"
        >
          ←
        </button>

        {/* Dots */}
        <div className="flex gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
            >
              <span
                className={`block transition-all duration-500 ${
                  i === current
                    ? "w-6 h-px bg-champagne"
                    : "w-2 h-2 bg-parchment/20 rounded-full"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Right */}
        <button
          onClick={() => paginate(1)}
          className="text-parchment/30 hover:text-champagne transition duration-500"
        >
          →
        </button>
      </div>
    </section>
  );
}

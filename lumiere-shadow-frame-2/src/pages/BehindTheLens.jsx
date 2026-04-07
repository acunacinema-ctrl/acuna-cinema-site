import pic1 from "../pic1.JPG";
import pic2 from "../pic2.JPG";
import pic3 from "../pic3.JPG";
import pic4 from "../pic4.JPG";
import pic5 from "../pic5.jpg";
import pic6 from "../pic6.jpg";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavigationMenu from "../components/portfolio/NavigationMenu";
import Footer from "../components/portfolio/Footer";
import { X } from "lucide-react";

const photos = [
  pic1, pic2, pic3, pic4, pic5, pic6];

const testimonials = [
  {
    couple: "Anna & Chris",
    location: "Saline, Michigan · 2025",
    text: "Davíd has a gift for finding the moments you didn’t even know were happening. We felt like ourselves, not performers.",
  },
  {
    couple: "Rachel & Martin",
    location: "Holland, Michigan · 2025",
    text: "From the first conversation, we knew this was different. The film didn’t just show our wedding — it told our story.",
  },
  {
    couple: "Janae & Sergio",
    location: "Orlando, Florida · 2023",
    text: "He moved through our day like a shadow. What he captured was pure magic.",
  },
];

export default function BehindTheLens() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-background min-h-screen text-parchment">
      <NavigationMenu />

      {/* HERO */}
      <section className="px-6 md:px-12 lg:px-20 pt-32 pb-20 max-w-5xl">
        <p className="font-interface text-xs tracking-editorial uppercase text-champagne mb-4">
          Unscripted
        </p>

        <h1 className="font-display italic text-4xl md:text-6xl leading-[1.1] mb-6">
          Behind<br />The Lens
        </h1>

        <p className="font-narrative text-parchment/70 text-lg md:text-xl max-w-2xl">
          The candid between-moments. Laughter before the ceremony. Tears no one planned for.
          This is where the unguarded truth of each day lives.
        </p>
      </section>

      {/* PHOTO GRID */}
      <section className="px-6 md:px-12 lg:px-20 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer overflow-hidden"
              onClick={() => setSelected(src)}
            >
              <img
                src={src}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 text-white">
              <X />
            </button>
            <img src={selected} className="max-w-[90%] max-h-[90%]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TESTIMONIALS */}
      <section className="px-6 md:px-12 lg:px-20 pb-40 max-w-3xl mx-auto text-center">
        <p className="font-interface text-xs tracking-editorial uppercase text-champagne mb-6">
          Reflections
        </p>

        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="font-narrative italic text-lg md:text-xl text-parchment/70 mb-6">
              “{t.text}”
            </p>

            <p className="font-display italic text-xl">{t.couple}</p>

            <p className="font-interface text-xs tracking-editorial uppercase text-champagne/40 mt-1">
              {t.location}
            </p>
          </motion.div>
        ))}
      </section>

      <Footer />
    </div>
  );
}

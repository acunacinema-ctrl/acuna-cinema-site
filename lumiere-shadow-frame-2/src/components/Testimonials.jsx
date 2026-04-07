import { useState, useEffect } from "react";

const testimonials = [
  {
    couple_names: "Anna & Chris",
    location: "Saline, Michigan",
    wedding_year: "2025",
    review:
      "Davíd has a gift for finding the moments you didn’t even know were happening. Watching our film for the first time, we were in tears — not because it was sad, but because it captured something true.",
  },
  {
    couple_names: "Rachel & Martin",
    location: "Holland, Michigan",
    wedding_year: "2025",
    review:
      "From the first conversation, we knew Acuña Cinema was different. The film he created is something we’ll pass down for generations.",
  },
  {
    couple_names: "Janae & Sergio",
    location: "Orlando, Florida",
    wedding_year: "2023",
    review:
      "I’ve never experienced a videographer so present, yet so invisible. He moved through our day like a shadow, and what he captured was pure magic.",
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
    <section id="testimonials" className="py-32 text-center">
      <p className="uppercase tracking-widest text-sm mb-4 opacity-60">
        In Their Words
      </p>

      <h2 className="text-4xl md:text-6xl italic mb-16">
        Stories from those who lived them
      </h2>

      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xl md:text-2xl italic leading-relaxed mb-10 opacity-80">
          "{t.review}"
        </p>

        <div className="mt-6">
          <p className="text-xl italic">{t.couple_names}</p>
          <p className="text-xs uppercase tracking-widest opacity-50 mt-1">
            {t.location} · {t.wedding_year}
          </p>
        </div>
      </div>
    </section>
  );
}

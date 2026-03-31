import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    location: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="px-6 md:px-12 lg:px-20 py-24 md:py-40" aria-label="Contact">
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        {/* Left side text */}
        <motion.div
          className="col-span-12 md:col-span-5 md:col-start-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-interface text-[10px] md:text-xs tracking-editorial uppercase text-champagne mb-4">
            Begin the Conversation
          </p>
          <h2 className="font-display italic font-light text-parchment text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-8">
            Let us tell<br />your story
          </h2>
          <p className="font-narrative text-parchment/50 text-base md:text-lg leading-relaxed mb-12">
            I accept a limited number of commissions each year to ensure that every project receives 
            the singular attention it deserves. Inquire early to secure your date.
          </p>
          <div className="space-y-4 hidden md:block">
            <div>
              <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/40 mb-1">Email</p>
              <a href="mailto:acunacinema@gmail.com?subject=Wedding%20Film%20Inquiry&body=Hi,%0A%0AI%27m%20interested%20in%20your%20wedding%20films.%0A%0ADate:%0ALocation:%0AVenue:%0A%0AEstimated%20Budget:%0A%0AThank%20you!" className="font-narrative text-parchment/60 hover:text-champagne transition-colors text-sm">
                acunacinema@gmail.com
              </a>
            </div>
            <div>
              <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne/40 mb-1">Based in</p>
              <p className="font-narrative text-parchment/60 text-sm">Grand Rapids, Michigan — Traveling Worldwide</p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="col-span-12 md:col-span-5 md:col-start-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-display italic text-champagne text-3xl mb-4">Thank you</p>
              <p className="font-narrative text-parchment/50 text-base">
                Your inquiry has been received. I will be in touch within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-interface text-[10px] tracking-editorial uppercase text-parchment/40 block mb-2">
                  Your Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-transparent border-0 border-b border-parchment/15 rounded-none px-0 py-3 text-parchment font-narrative text-base focus-visible:ring-0 focus-visible:border-champagne placeholder:text-parchment/20"
                  placeholder="First & Last Name"
                  required
                />
              </div>
              <div>
                <label className="font-interface text-[10px] tracking-editorial uppercase text-parchment/40 block mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-transparent border-0 border-b border-parchment/15 rounded-none px-0 py-3 text-parchment font-narrative text-base focus-visible:ring-0 focus-visible:border-champagne placeholder:text-parchment/20"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="font-interface text-[10px] tracking-editorial uppercase text-parchment/40 block mb-2">
                    Wedding Date
                  </label>
                  <Input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-transparent border-0 border-b border-parchment/15 rounded-none px-0 py-3 text-parchment font-narrative text-base focus-visible:ring-0 focus-visible:border-champagne placeholder:text-parchment/20"
                    placeholder="Month / Year"
                  />
                </div>
                <div>
                  <label className="font-interface text-[10px] tracking-editorial uppercase text-parchment/40 block mb-2">
                    Location
                  </label>
                  <Input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-transparent border-0 border-b border-parchment/15 rounded-none px-0 py-3 text-parchment font-narrative text-base focus-visible:ring-0 focus-visible:border-champagne placeholder:text-parchment/20"
                    placeholder="City, Country"
                  />
                </div>
              </div>
              <div>
                <label className="font-interface text-[10px] tracking-editorial uppercase text-parchment/40 block mb-2">
                  Tell me about your vision
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-transparent border-0 border-b border-parchment/15 rounded-none px-0 py-3 text-parchment font-narrative text-base focus-visible:ring-0 focus-visible:border-champagne placeholder:text-parchment/20 min-h-[100px] resize-none"
                  placeholder="Your love story, the venue, the atmosphere you envision..."
                />
              </div>
              <div className="pt-4">
                <Button
                  type="submit"
                  className="group bg-transparent border border-parchment/20 text-parchment hover:bg-champagne/10 hover:border-champagne hover:text-champagne font-interface text-[10px] tracking-editorial uppercase px-8 py-6 transition-all duration-500 min-h-[44px]"
                >
                  Send Inquiry
                  <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

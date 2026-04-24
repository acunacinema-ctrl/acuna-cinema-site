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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/xqewnlvb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          date: '',
          location: '',
          message: '',
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Submission failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="px-6 md:px-12 lg:px-20 py-24 md:py-40" aria-label="Contact">
      <div className="grid grid-cols-12 gap-8 md:gap-12">

        {/* LEFT SIDE */}
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
        </motion.div>

        {/* FORM */}
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

              <Input
                type="text"
                placeholder="First & Last Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <div className="grid grid-cols-2 gap-6">
                <Input
                  type="text"
                  placeholder="Wedding Date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />

                <Input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <Textarea
                placeholder="Tell me about your vision..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              <Button
                type="submit"
                disabled={loading}
                className="group"
              >
                {loading ? "Sending..." : "Send Inquiry"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

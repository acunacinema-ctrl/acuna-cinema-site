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
    phone: '',
    date: '',
    venue: '',
    priorities: '',
    budget: '',
    fun: '',
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
          phone: '',
          date: '',
          venue: '',
          priorities: '',
          budget: '',
          fun: '',
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
    <section id="contact" className="px-6 md:px-12 lg:px-20 py-24 md:py-40">
      <div className="grid grid-cols-12 gap-8 md:gap-12">

        {/* LEFT SIDE */}
        <motion.div
          className="col-span-12 md:col-span-5 md:col-start-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-interface text-[10px] tracking-editorial uppercase text-champagne mb-4">
            Begin the Conversation
          </p>

          <h2 className="font-display italic font-light text-parchment text-4xl md:text-6xl leading-[0.95] mb-8">
            Let us tell your story
          </h2>

          <p className="font-narrative text-parchment/50 text-base md:text-lg leading-relaxed">
            I accept a limited number of commissions each year to ensure every couple receives 
            a film that feels truly personal. Inquire early to secure your date.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.div
          className="col-span-12 md:col-span-5 md:col-start-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          {submitted ? (
            <div className="text-center py-20">
              <p className="font-display italic text-champagne text-3xl mb-4">Thank you</p>
              <p className="font-narrative text-parchment/50 text-base">
                Your inquiry has been received. I will be in touch within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />

              <Input
                placeholder="Wedding Date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />

              <Input
                placeholder="What venue have you booked or are considering?"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              />

              <Textarea
                placeholder="What is most important to you in your wedding films & photos?"
                value={formData.priorities}
                onChange={(e) => setFormData({ ...formData, priorities: e.target.value })}
                className="min-h-[100px]"
                required
              />

              <Input
                placeholder="Estimated budget for Film and/or Photo"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                required
              />

              <Textarea
                placeholder="What’s something fun you and your fiancé like to do together? :)"
                value={formData.fun}
                onChange={(e) => setFormData({ ...formData, fun: e.target.value })}
                className="min-h-[100px]"
              />

              <Button
                type="submit"
                disabled={loading}
                className="group w-full border border-parchment/20 text-parchment hover:bg-champagne/10 hover:border-champagne hover:text-champagne transition-all duration-500 py-6"
              >
                {loading ? "Sending..." : "Send Inquiry"}
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>

            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

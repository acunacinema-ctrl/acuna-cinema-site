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
          <h2 className="text-4xl md:text-6xl mb-6">
            Let us tell your story
          </h2>

          <p className="text-white/60">
            Limited availability each year. Inquire early to secure your date.
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
              <h3 className="text-3xl mb-4">Thank you</h3>
              <p className="text-white/60">
                I’ll be in touch within 48 hours.
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
                placeholder="Phone Number (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

              <select
                value={formData.priorities}
                onChange={(e) => setFormData({ ...formData, priorities: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white"
                required
              >
                <option value="">What is most important to you in your wedding films & photos?</option>
                <option>Cinematic storytelling</option>
                <option>Emotional moments</option>
                <option>Documentary coverage</option>
                <option>Just capturing everything</option>
              </select>

              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white"
                required
              >
                <option value="">What is your estimated budget for Film and/or Photo?</option>
                <option>$1,500 – $2,500</option>
                <option>$2,500 – $4,000</option>
                <option>$4,000+</option>
              </select>

              <Textarea
                placeholder="What’s something fun you and your fiancé like to do together? :)"
                value={formData.fun}
                onChange={(e) => setFormData({ ...formData, fun: e.target.value })}
              />

              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Inquiry"}
                <ArrowRight className="ml-2" />
              </Button>

            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

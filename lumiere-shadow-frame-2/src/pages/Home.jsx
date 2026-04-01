import React from 'react';
import NavigationMenu from '../components/portfolio/NavigationMenu';
import HeroSection from '../components/portfolio/HeroSection.jsx';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import FilmsSection from '../components/portfolio/FilmsSection';
import AboutSection from '../components/portfolio/AboutSection';
import ServicesSection from '../components/portfolio/ServicesSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';
import myPhoto from '../assets/me.png';

const HERO_IMAGE = 'https://media.base44.com/images/public/69af8d2c4b2e24d43b5fa37a/650c6366d_ChatGPTImageJan232026at06_31_22PM.png';
const PORTRAIT_IMAGE = myPhoto;

const PORTFOLIO_IMAGES = [
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af8d2c4b2e24d43b5fa37a/6ffe0cdc3_generated_10d79496.png',
    alt: 'Extreme close-up of delicate bridal lace veil and antique pearl jewelry in dramatic chiaroscuro light',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af8d2c4b2e24d43b5fa37a/d7eee4470_generated_88c8d672.png',
    alt: 'A couple as silhouettes walking through an Italian countryside vineyard at golden hour',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af8d2c4b2e24d43b5fa37a/1b438ad8b_generated_91916937.png',
    alt: 'Intimate close-up of hands intertwined with wedding bands during ceremony',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af8d2c4b2e24d43b5fa37a/58fae338d_generated_27cac89b.png',
    alt: 'Bride descending a grand marble staircase in a historic European palace with dramatic side lighting',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af8d2c4b2e24d43b5fa37a/1219f7e70_generated_b5456f49.png',
    alt: 'First dance in a grand ballroom, couple embracing in warm spotlight surrounded by candlelight',
  },
];

export default function Home() {
  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <NavigationMenu />
      <HeroSection heroImage={HERO_IMAGE} />
      <PortfolioGrid images={PORTFOLIO_IMAGES} />
      <FilmsSection />
      <AboutSection portraitImage={PORTRAIT_IMAGE} />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

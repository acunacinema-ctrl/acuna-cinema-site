import React from 'react';
import NavigationMenu from '../components/portfolio/NavigationMenu';
import HeroSection from '../components/portfolio/HeroSection.jsx';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import FilmsSection from '../components/portfolio/FilmsSection';
import AboutSection from '../components/portfolio/AboutSection';
import ServicesSection from '../components/portfolio/ServicesSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';
import myPhoto from '../m1.jpg';
import Testimonials from "../components/Testimonials";
import AR1 from '../assets/images/AR1.png';
import AR2 from '../assets/images/AR2.png';
import AR3 from '../assets/images/AR3.png';
import AR4 from '../assets/images/AR4.png';

import CD1 from '../assets/images/CD1.png';
import CD2 from '../assets/images/CD2.png';
import CD3 from '../assets/images/CD3.png';
import CD4 from '../assets/images/CD4.png';

import RM1 from '../assets/images/RM1.png';
import RM2 from '../assets/images/RM2.jpg';
import RM3 from '../assets/images/RM3.png';
import RM4 from '../assets/images/RM4.png';

const PORTRAIT_IMAGE = myPhoto;

const PORTFOLIO_IMAGES = [
  { src: AR1, alt: 'Artistic bridal portrait' },
  { src: CD1, alt: 'Candid wedding moment' },
  { src: RM1, alt: 'Romantic portrait' },

  { src: AR2, alt: 'Bride in soft natural light' },
  { src: CD2, alt: 'Couple during ceremony' },
  { src: RM2, alt: 'Golden hour couple' },

  { src: AR3, alt: 'Editorial wedding detail' },
  { src: CD3, alt: 'Emotional exchange' },
  { src: RM3, alt: 'Intimate connection' },

  { src: AR4, alt: 'Elegant bridal composition' },
  { src: CD4, alt: 'Reception atmosphere' },
  { src: RM4, alt: 'Final cinematic frame' },
];

export default function Home() {
  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <NavigationMenu />
      <HeroSection />
      <FilmsSection />
      <PortfolioGrid images={PORTFOLIO_IMAGES} />
      <AboutSection portraitImage={PORTRAIT_IMAGE} />
      <ServicesSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}

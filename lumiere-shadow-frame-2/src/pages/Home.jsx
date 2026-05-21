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
  {
    images: [AR1, AR2, AR3, AR4],
    alt: 'Abbie & Ryan wedding photo and video at Egypt Valley Country Club in Ada Michigan'
  },
  {
    images: [CD1, CD2, CD3, CD4],
    alt: 'Cailin & Devin wedding photo and video at The Homestead in Glen Arbor Michigan'
  },
  {
    images: [RM1, RM2, RM3, RM4],
    alt: 'Rachel & Martin wedding photo and video at The Felt Estate in Holland Michigan'
  }
];

export default function Home() {
  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <NavigationMenu />

      <HeroSection />

      {/* SEO Section */}

      <section
        className="
        max-w-3xl
        mx-auto
        px-8
        pt-20
        pb-32
        text-center
        "
      >

        <h1
          className="
          text-xs
          md:text-sm
          tracking-[0.4em]
          uppercase
          font-light
          text-[#B8A78C]
          mb-8
          "
        >
          Michigan Wedding Videographer & Wedding Photographer
        </h1>

        <p
          className="
          text-[#A6A6A6]
          text-base
          md:text-lg
          leading-8
          font-light
          max-w-2xl
          mx-auto
          "
        >
          Creating cinematic wedding films and timeless
          photography for couples throughout Michigan.
          Serving Grand Rapids, Muskegon, Detroit, Traverse City and
          destination weddings.
        </p>

      </section>

      <FilmsSection />

      <PortfolioGrid
        images={PORTFOLIO_IMAGES}
      />

      <AboutSection
        portraitImage={PORTRAIT_IMAGE}
      />

      <ServicesSection />

      <Testimonials />

      <ContactSection />

      <Footer />

    </div>
  );
}

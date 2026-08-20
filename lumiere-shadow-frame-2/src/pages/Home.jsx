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

import JT1 from '../assets/images/JT1.jpg';
import JT2 from '../assets/images/JT2.jpg';
import JT22 from '../assets/images/JT2.2.jpg';
import JT3 from '../assets/images/JT3.jpg';
import JT4 from '../assets/images/JT4.jpg';
import JT5 from '../assets/images/JT5.jpg';
import JT6 from '../assets/images/JT6.jpg';
import JT7 from '../assets/images/JT7.jpg';

const PORTRAIT_IMAGE = myPhoto;

const PORTFOLIO_IMAGES = [
  {
    images: [
      {
        src: AR1,
        alt: 'Bride and groom portrait at Egypt Valley Country Club wedding in Ada Michigan by Acuna Cinema'
      },
      {
        src: AR2,
        alt: 'Bride with wedding florals photographed at Egypt Valley Country Club wedding in Ada Michigan'
      },
      {
        src: AR3,
        alt: 'Luxury wedding getting ready details before ceremony at Egypt Valley Country Club in Ada Michigan'
      },
      {
        src: AR4,
        alt: 'Bride and groom cinematic wedding film coverage by Acuna Cinema'
      }
    ]
  },

  {
    images: [
      {
        src: CD1,
        alt: 'Luxury wedding floral details photographed by Acuna Cinema in Michigan'
      },
      {
        src: CD2,
        alt: 'Bride and groom first look portrait with Lake Michigan in background photographed in Glen Arbor Michigan'
      },
      {
        src: CD3,
        alt: 'Wedding videography coverage at The Homestead wedding venue in Glen Arbor Michigan'
      },
      {
        src: CD4,
        alt: 'Wedding reception first dance photography at The Homestead in Glen Arbor Michigan by Acuna Cinema'
      }
    ]
  },

  {
    images: [
      {
        src: RM1,
        alt: 'Bride and groom portrait at The Felt Estate wedding venue in Holland Michigan'
      },
      {
        src: RM2,
        alt: 'Bride and bridesmaids portrait outside The Felt Estate wedding venue in Holland Michigan'
      },
      {
        src: RM3,
        alt: 'Luxury wedding videography coverage of groom and groomsmen toasting wine at The Felt Estate in Holland Michigan'
      },
      {
        src: RM4,
        alt: 'Bride and groom sharing romantic kiss during Michigan wedding film by Acuna Cinema'
      }
    ]
  },

  {
    images: [
      {
        src: JT1,
        alt: 'Bride and groom wedding portrait photographed by Acuna Cinema'
      },
      {
        src: JT2,
        alt: 'Bride and groom wedding photography by Acuna Cinema'
      },
      {
        src: JT22,
        alt: 'Bride and groom wedding portrait photography by Acuna Cinema'
      },
      {
        src: JT3,
        alt: 'Timeless wedding photography by Acuna Cinema'
      },
      {
        src: JT4,
        alt: 'Bride and groom wedding day portrait by Acuna Cinema'
      },
      {
        src: JT5,
        alt: 'Wedding couple portrait photographed by Acuna Cinema'
      },
      {
        src: JT6,
        alt: 'Luxury wedding photography captured by Acuna Cinema'
      },
      {
        src: JT7,
        alt: 'Bride and groom candid wedding moment by Acuna Cinema'
      }
    ]
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
          Creating cinematic wedding films and timeless photography for couples
          throughout Michigan. Serving Detroit, Grand Rapids, Muskegon,
          Traverse City and destination weddings.
        </p>
      </section>

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

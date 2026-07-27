import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from './i18n/context';
import { SanityProvider } from './context/SanityContext';
import { SmoothScrollProvider } from './components/ui/SmoothScrollProvider';
import { IntroLoader } from './components/ui/IntroLoader';
import { Navbar } from './components/navigation/Navbar';

import { Hero } from './sections/Hero';
import { FeaturedProjects } from './sections/FeaturedProjects';
import { Services } from './sections/Services';
import { Statistics } from './sections/Statistics';
import { About } from './sections/About';
import { OurProcess } from './sections/OurProcess';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { ContactCTA } from './sections/ContactCTA';
import { Footer } from './sections/Footer';

import { StudioPage } from './pages/StudioPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { PreviewPage } from './pages/PreviewPage';
import { LandingPage } from './pages/LandingPage';

export const MainPortfolio: React.FC = () => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#0F1D38] text-slate-100 selection:bg-[#FF5E3A] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Intro Loader */}
      {isLoading && (
        <IntroLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* Main Website App */}
      <SmoothScrollProvider>
        <Navbar />

        {/* Smooth Language Change Transition Wrapper */}
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <main>
              <Hero />
              <FeaturedProjects />
              <Services />
              <Statistics />
              <About />
              <OurProcess />
              <Testimonials />
              <FAQ />
              <ContactCTA />
            </main>

            <Footer />
          </motion.div>
        </AnimatePresence>
      </SmoothScrollProvider>
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  const path = window.location.pathname;

  if (path.startsWith('/studio') || window.location.hash.startsWith('#studio')) {
    return <StudioPage />;
  }

  if (path.startsWith('/thank-you')) {
    return <ThankYouPage />;
  }

  if (path.startsWith('/preview')) {
    return <PreviewPage />;
  }

  if (path.startsWith('/landing/')) {
    const slug = path.replace('/landing/', '').replace(/\/$/, '');
    return <LandingPage slug={slug || 'web-design'} />;
  }

  return <MainPortfolio />;
};

export default function App() {
  return (
    <LanguageProvider>
      <SanityProvider>
        <AppRoutes />
      </SanityProvider>
    </LanguageProvider>
  );
}

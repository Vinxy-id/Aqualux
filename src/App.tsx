import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AqualuxDataProvider } from './context/AqualuxDataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AchievementsBar } from './components/AchievementsBar';
import { ProgramsSection } from './components/ProgramsSection';
import { PricingSection } from './components/PricingSection';
import { LocationsSection } from './components/LocationsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { UrgencyBanner } from './components/UrgencyBanner';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { WhatsAppModal } from './components/WhatsAppModal';

const AdminLogin = lazy(() => import('./components/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminPage = lazy(() => import('./components/AdminPage').then(m => ({ default: m.AdminPage })));
const LinkBioPage = lazy(() => import('./components/LinkBioPage').then(m => ({ default: m.LinkBioPage })));

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [route, setRoute] = useState<'landing' | 'admin' | 'links'>(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.includes('/admin') || hash === '#admin') {
      return 'admin';
    }
    if (path.includes('/links') || path.includes('/link') || path.includes('/bio') || hash === '#links' || hash === '#link' || hash === '#bio') {
      return 'links';
    }
    return 'landing';
  });

  useEffect(() => {
    // Reset scroll position to Hero section on page refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const hash = window.location.hash;
    if (!hash || (hash !== '#admin' && hash !== '#links' && hash !== '#link' && hash !== '#bio')) {
      window.scrollTo(0, 0);
    }

    const handlePopState = () => {
      const path = window.location.pathname;
      const currentHash = window.location.hash;
      if (path.includes('/admin') || currentHash === '#admin') {
        setRoute('admin');
      } else if (path.includes('/links') || path.includes('/link') || path.includes('/bio') || currentHash === '#links' || currentHash === '#link' || currentHash === '#bio') {
        setRoute('links');
      } else {
        setRoute('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', 'admin');
    setRoute('admin');
    window.scrollTo(0, 0);
  };

  const navigateToLinks = () => {
    window.history.pushState({}, '', 'links');
    setRoute('links');
    window.scrollTo(0, 0);
  };

  const navigateToLanding = () => {
    window.history.pushState({}, '', './');
    setRoute('landing');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  if (route === 'admin') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-mono text-xs">Memuat Portal Admin...</div>}>
        {!isAuthenticated ? (
          <AdminLogin onBackToLanding={navigateToLanding} />
        ) : (
          <AdminPage onBackToLanding={navigateToLanding} />
        )}
      </Suspense>
    );
  }

  if (route === 'links') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-blue-900 font-mono text-xs">Memuat...</div>}>
        <LinkBioPage onBackToLanding={navigateToLanding} onOpenAdmin={navigateToAdmin} />
        <WhatsAppModal />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar onOpenAdmin={navigateToAdmin} />
      <main>
        <Hero />
        <AchievementsBar />
        <ProgramsSection />
        <PricingSection />
        <LocationsSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <UrgencyBanner />
        <FAQSection />
      </main>
      <Footer onOpenAdmin={navigateToAdmin} />
      <WhatsAppModal />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AqualuxDataProvider>
        <AppContent />
      </AqualuxDataProvider>
    </AuthProvider>
  );
}

export default App;

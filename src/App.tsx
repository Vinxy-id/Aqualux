import React, { useState, useEffect } from 'react';
import { AqualuxDataProvider } from './context/AqualuxDataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AchievementsBar } from './components/AchievementsBar';
import { ProgramsSection } from './components/ProgramsSection';
import { LocationsSection } from './components/LocationsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { UrgencyBanner } from './components/UrgencyBanner';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { AdminLogin } from './components/AdminLogin';
import { AdminPage } from './components/AdminPage';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [route, setRoute] = useState<'landing' | 'admin'>(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.includes('/admin') || hash === '#admin') {
      return 'admin';
    }
    return 'landing';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('/admin') || hash === '#admin') {
        setRoute('admin');
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
    window.history.pushState({}, '', '/admin');
    window.location.hash = 'admin';
    setRoute('admin');
  };

  const navigateToLanding = () => {
    window.history.pushState({}, '', '/');
    window.location.hash = '';
    setRoute('landing');
  };

  if (route === 'admin') {
    if (!isAuthenticated) {
      return <AdminLogin onBackToLanding={navigateToLanding} />;
    }
    return <AdminPage onBackToLanding={navigateToLanding} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar onOpenAdmin={navigateToAdmin} />
      <main>
        <Hero />
        <AchievementsBar />
        <ProgramsSection />
        <LocationsSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <UrgencyBanner />
        <FAQSection />
      </main>
      <Footer onOpenAdmin={navigateToAdmin} />
      <StickyMobileBar />
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

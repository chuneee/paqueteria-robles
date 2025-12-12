// ========================================
// LANDING PAGE
// ========================================

import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { CoverageSection } from '@/components/CoverageSection';
import { WhyChooseUsSection } from '@/components/WhyChooseUsSection';
import { BusinessSection } from '@/components/BusinessSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

/**
 * Página de inicio (Landing Page)
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <CoverageSection />
      <WhyChooseUsSection />
      <BusinessSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

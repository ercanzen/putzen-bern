import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustSection } from './components/TrustSection';
import { StatsSection } from './components/StatsSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { GallerySection } from './components/GallerySection';
import { ProcessSection } from './components/ProcessSection';
import { ReferencesSection } from './components/ReferencesSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { TeamSection } from './components/TeamSection';
import { FaqSection } from './components/FaqSection';
import { ContactFormSection } from './components/ContactFormSection';
import { CtaSection } from './components/CtaSection';
import { FooterSection } from './components/FooterSection';
import { LanguageProvider } from './i18n';
import { FloatingContact } from './components/FloatingContact';
import { MobileStickyBar } from './components/MobileStickyBar';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Preloader } from './components/Preloader';
import { ConsentNotice } from './components/ConsentNotice';

export default function App() {
  return (
    <LanguageProvider>
      <Preloader />
      <div className="bg-white min-h-screen text-black overflow-x-clip selection:bg-black/10 selection:text-black relative">
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <HeroSection />
        <MarqueeSection />
        <TrustSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <BeforeAfterSection />
        <GallerySection />
        <ProcessSection />
        <ReferencesSection />
        <ServiceAreaSection />
        <TeamSection />
        <FaqSection />
        <CtaSection />
        <ContactFormSection />
        <FooterSection />
        <FloatingContact />
        <MobileStickyBar />
        <ConsentNotice />
      </div>
    </LanguageProvider>
  );
}

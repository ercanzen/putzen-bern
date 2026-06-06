import { useEffect, useState } from 'react';
import { useLanguage, Language } from '../i18n';
import { OfferteModal } from './OfferteModal';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [offerteOpen, setOfferteOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fn = () => setOfferteOpen(true);
    window.addEventListener('openOfferte', fn);
    return () => window.removeEventListener('openOfferte', fn);
  }, []);

  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.services, href: '#leistungen' },
    { label: t.nav.about, href: '#ueber-uns' },
    { label: t.nav.references, href: '#referenzen' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.footer.contact, href: '#kontakt' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
      scrolled ? 'bg-white/90 backdrop-blur-md border-black/5 py-3 md:py-4' : 'bg-transparent border-transparent py-4 md:py-6'
    }`}>
      <div className="flex justify-between items-center px-4 md:px-8 max-w-7xl mx-auto w-full animate-fade-rise">
        <a href="/" aria-label="Home" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl md:text-3xl tracking-tight text-[#000000]">
          Putzen<sup className="text-[10px] md:text-xs align-super relative -top-2 md:-top-3 ml-px font-sans font-normal">&reg;</sup>
        </a>
        
        <div className="hidden lg:flex items-center gap-8 text-sm">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm transition-colors duration-200 ${index === 0 ? 'text-[#000000]' : 'text-[#6F6F6F] hover:text-[#000000]'}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setOfferteOpen(true)}
            className="hidden lg:flex items-center bg-black text-white text-xs font-medium rounded-full px-5 py-2.5 hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            {t.nav.offerte}
          </button>

          <div className="relative group">
            <button className="flex items-center gap-1 text-xs font-medium text-[#6F6F6F] hover:text-black transition-colors uppercase px-2 py-1 rounded-md hover:bg-black/5">
              {language}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white border border-black/8 rounded-xl shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {(['de', 'en', 'fr', 'it'] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`block w-full text-left px-4 py-2 text-xs uppercase font-medium transition-colors ${language === lang ? 'bg-black text-white' : 'text-[#6F6F6F] hover:bg-black/5 hover:text-black'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="lg:hidden ml-2 text-black focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-black/5 shadow-2xl py-6 px-6 flex flex-col gap-6 animate-fade-rise">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg font-medium text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => { setMobileMenuOpen(false); setOfferteOpen(true); }}
            className="bg-black text-white text-sm font-medium rounded-full px-6 py-3 w-full text-center"
          >
            {t.nav.offerte}
          </button>
        </div>
      )}

      <OfferteModal isOpen={offerteOpen} onClose={() => setOfferteOpen(false)} />
    </nav>
  );
}

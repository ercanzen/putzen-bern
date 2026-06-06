import { useState } from 'react';
import { FadeUp } from './shared';
import { useLanguage } from '../i18n';
import { LegalModal } from './LegalModal';

export function FooterSection() {
  const { t } = useLanguage();
  const [legalOpen, setLegalOpen] = useState<'datenschutz' | 'impressum' | null>(null);

  return (
    <footer className="relative min-h-screen overflow-hidden bg-black text-white flex justify-center items-end py-12 px-6 md:px-12">
      {/* BACKGROUND VIDEO */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
        muted
        autoPlay
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover bg-black"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* FOOTER CONTENT */}
      <div className="w-full max-w-7xl flex flex-col justify-between relative z-10 h-full pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 pb-24">
          <FadeUp className="flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] tracking-tight leading-[0.9] mb-8">
                {t.footer.title1}<br /><em className="italic text-white/50">{t.footer.title2}</em>
              </h2>
              <a href="mailto:hello@putzen.ch" className="inline-block text-2xl font-serif text-white hover:text-white/70 transition-colors duration-300">
                hello@putzen.ch
              </a>
            </div>
          </FadeUp>
          
          <div className="flex flex-col gap-16 justify-between border-t border-white/20 pt-16 md:border-t-0 md:pt-0">
            <FadeUp delay={0.1} className="flex gap-16 sm:gap-32">
              <div className="flex flex-col gap-6">
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">{t.footer.nav}</span>
                <a href="#top" className="font-serif italic text-lg md:text-2xl text-white/70 hover:text-white transition-colors">{t.nav.home}</a>
                <a href="#leistungen" className="font-serif italic text-lg md:text-2xl text-white/70 hover:text-white transition-colors">{t.nav.services}</a>
                <a href="#ueber-uns" className="font-serif italic text-lg md:text-2xl text-white/70 hover:text-white transition-colors">{t.nav.about}</a>
                <a href="#referenzen" className="font-serif italic text-lg md:text-2xl text-white/70 hover:text-white transition-colors">{t.nav.references}</a>
                <a href="#faq" className="font-serif italic text-lg md:text-2xl text-white/70 hover:text-white transition-colors">{t.nav.faq}</a>
                <a href="#kontakt" className="font-serif italic text-lg md:text-2xl text-white/70 hover:text-white transition-colors">{t.footer.contact}</a>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                 {t.footer.slogan}
              </p>
            </FadeUp>
           </div>
        </div>

        <div className="relative mt-auto w-full pt-16 border-t border-white/20 flex flex-col items-center select-none text-center">
            <FadeUp delay={0.3} className="w-full">
              <h1 className="font-serif text-[22vw] sm:text-[18vw] max-text-[200px] leading-none tracking-tighter text-transparent uppercase text-center font-bold hover:text-white/10 transition-colors duration-700 cursor-default" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", fontSize: 'clamp(80px, 18vw, 260px)' }}>
               PUTZEN
              </h1>
            </FadeUp>
            <div className="w-full flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/50 pt-8 gap-4 px-4 pb-4">
              <p>&copy; 2026 Putzen Bern. {t.footer.rights}</p>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-4 md:mt-0">
                <button onClick={() => setLegalOpen('datenschutz')} className="hover:text-white transition-colors">{t.footer.privacy}</button>
                <button onClick={() => setLegalOpen('impressum')} className="hover:text-white transition-colors">{t.footer.imprint}</button>
              </div>
            </div>
        </div>
      </div>
      <LegalModal open={legalOpen} onClose={() => setLegalOpen(null)} />
    </footer>
  );
}


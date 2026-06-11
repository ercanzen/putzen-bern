import { FadeUp } from './shared';
import womanImg from '../assets/images/putzen-woman.webp';
import { useLanguage } from '../i18n';

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <section id="kontakt" className="bg-[#F9F9F9] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden flex justify-center border-t border-black/10">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 w-full">
          <FadeUp>
            <div className="max-w-xl">
              <h2 className="font-sans font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] tracking-tight text-black leading-[1.05] drop-shadow-sm mb-6">
                {t.cta.title1}<br className="hidden md:block" />
                {t.cta.title2}
              </h2>
              <p className="text-[#6F6F6F] text-lg lg:text-xl leading-relaxed max-w-xl mb-10">
                {t.cta.form_desc}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-wrap">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openOfferte'))}
                  className="bg-[#000000] text-[#FFFFFF] font-medium rounded-full px-8 py-4 text-sm hover:scale-[1.03] hover:shadow-xl transition-all duration-300 text-center"
                >
                  Offerte anfragen
                </button>
                <a href="mailto:hello@putzen.ch" className="flex items-center justify-center gap-2 border border-black text-black font-medium rounded-full px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  hello@putzen.ch
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
        
        <div className="flex-1 w-full flex justify-end">
          <FadeUp delay={0.2} className="w-full max-w-md md:max-w-lg lg:max-w-xl relative">
            <div className="aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-lg relative border border-black/5">
               <img
                 src={womanImg}
                 alt={t.cta.image_alt}
                 loading="lazy"
                 decoding="async"
                 className="absolute inset-0 w-full h-full object-cover object-top"
               />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n';

export function MobileStickyBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 300);

      const footer = document.querySelector('footer');
      const ctaSection = document.getElementById('kontakt');
      if (footer || ctaSection) {
        const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
        const ctaTop = ctaSection ? ctaSection.getBoundingClientRect().top : Infinity;
        setHidden(Math.min(footerTop, ctaTop) < window.innerHeight * 0.85);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-300 ${
      visible && !hidden ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
    }`}>
      <div className="p-3 bg-white/95 backdrop-blur-md border-t border-black/10 shadow-2xl">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('openOfferte'))}
          className="w-full bg-black text-white text-sm font-medium rounded-full py-4 text-center hover:bg-black/80 transition-colors active:scale-95"
        >
          {t.nav.offerte}
        </button>
      </div>
    </div>
  );
}

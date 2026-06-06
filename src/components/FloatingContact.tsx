import { useLanguage } from '../i18n';

export function FloatingContact() {
  const { t } = useLanguage();
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('openOfferte'))}
      aria-label={t.nav.offerte}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 lg:flex hidden items-center gap-2 bg-black text-white text-xs font-medium rounded-full px-5 py-3 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-rise"
      style={{ animationDelay: '1s', animationFillMode: 'both' }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
      {t.nav.offerte}
    </button>
  );
}

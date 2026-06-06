import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n';

export function ConsentNotice() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[300] px-4 py-4 md:px-8 md:py-5 bg-white border-t border-black/10 shadow-[0_-8px_32px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-rise">
      <p className="text-xs sm:text-sm text-[#6F6F6F] max-w-2xl leading-relaxed">
        {t.cookie.message}
      </p>
      <div className="flex gap-3 flex-shrink-0">
        <button
          onClick={handleDecline}
          className="px-5 py-2.5 text-xs sm:text-sm border border-black/20 rounded-full text-[#6F6F6F] hover:bg-black/5 hover:text-black transition-colors duration-200"
        >
          {t.cookie.decline}
        </button>
        <button
          onClick={handleAccept}
          className="px-5 py-2.5 text-xs sm:text-sm bg-black text-white rounded-full hover:bg-black/80 transition-colors duration-200"
        >
          {t.cookie.accept}
        </button>
      </div>
    </div>
  );
}

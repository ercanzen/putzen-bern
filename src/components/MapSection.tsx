import { FadeUp } from './shared';
import { useLang } from '../context/LangContext';

export function MapSection() {
  const { t } = useLang();

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-white border-t border-black/8">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
            <div>
              <div className="eyebrow mb-5"><span className="dot" />{t.map_eyebrow}</div>
              <h2 className="display-md" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
                {t.map_h2a}<br /><em>{t.map_h2b}</em>
              </h2>
            </div>
            <div className="flex flex-col gap-3 pb-2">
              <div className="flex items-center gap-3 text-sm text-[#4A4F4B]">
                <div className="w-8 h-8 rounded-full bg-black/6 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                Bern, Schweiz
              </div>
              <div className="flex items-center gap-3 text-sm text-[#4A4F4B]">
                <div className="w-8 h-8 rounded-full bg-black/6 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                Mo–Fr 08:00–18:00
              </div>
              <div className="flex items-center gap-3 text-sm text-[#4A4F4B]">
                <div className="w-8 h-8 rounded-full bg-black/6 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                +41 79 850 15 03
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="w-full rounded-[2rem] overflow-hidden border border-black/8 shadow-sm" style={{ height: '460px' }}>
            <iframe
              title="Putzen Standort Bern"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43557.71897393397!2d7.3948!3d46.9481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e39af66be1c4d%3A0x1a2c7ede2e6ae4c6!2sBern!5e0!3m2!1sde!2sch!4v1716000000000!5m2!1sde!2sch"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(15%) contrast(1.02)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

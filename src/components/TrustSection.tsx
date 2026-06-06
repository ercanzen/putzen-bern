import { FadeUp } from './shared';
import { useLanguage } from '../i18n';

export function TrustSection() {
  const { t } = useLanguage();

  const STATS = [
    { label: t.trust.stat1, value: '500+' },
    { label: t.trust.stat2, value: '10+' },
    { label: t.trust.stat3, value: '150+' },
  ];

  return (
    <section className="py-20 md:py-24 bg-black text-white px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="md:w-1/3">
          <FadeUp>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-snug">
              {t.trust.title1}<br className="hidden md:block"/> <em className="italic text-white/50">{t.trust.title2}</em>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mt-4 max-w-xs">
              {t.trust.desc}
            </p>
          </FadeUp>
        </div>

        <div className="md:w-2/3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-12 lg:gap-20">
          {STATS.map((stat, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="flex flex-col gap-2">
                <span className="font-serif italic text-4xl md:text-6xl lg:text-7xl tracking-tighter">
                  {stat.value}
                </span>
                <span className="text-xs text-white/60 uppercase tracking-widest max-w-[150px] leading-relaxed">
                  {stat.label}
                </span>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}

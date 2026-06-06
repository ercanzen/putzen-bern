import { useLanguage } from '../i18n';

export function MarqueeSection() {
  const { t } = useLanguage();

  return (
    <div className="bg-black py-5 md:py-6 overflow-hidden flex whitespace-nowrap relative border-y border-white/10">
      <div className="animate-marquee inline-flex gap-12 md:gap-24 items-center">
        {[...t.marquee, ...t.marquee, ...t.marquee, ...t.marquee].map((text, i) => (
          <div key={i} className="flex items-center gap-12 md:gap-24">
            <span className="text-white font-mono text-xs md:text-sm tracking-[0.3em] uppercase">{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n';

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

export function StatsSection() {
  const { t } = useLanguage();
  const stat1 = useCountUp(1200);
  const stat2 = useCountUp(100);
  const stat3 = useCountUp(10);

  const fmt1 = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k+` : `${n}`;

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-black/10">

          <div ref={stat1.ref} className="flex flex-col items-center justify-center pt-8 md:pt-0">
            <span className="font-serif text-6xl md:text-7xl tracking-tighter text-[#000000] mb-4 block text-center tabular-nums">
              {fmt1(stat1.value)}
            </span>
            <span className="text-sm uppercase tracking-widest text-[#6F6F6F] font-semibold text-center block">
              {t.stats.stat1_text}
            </span>
          </div>

          <div ref={stat2.ref} className="flex flex-col items-center justify-center pt-12 md:pt-0">
            <span className="font-serif text-6xl md:text-7xl tracking-tighter text-[#000000] mb-4 block text-center tabular-nums">
              {stat2.value}%
            </span>
            <span className="text-sm uppercase tracking-widest text-[#6F6F6F] font-semibold text-center block">
              {t.stats.stat2_text}
            </span>
          </div>

          <div ref={stat3.ref} className="flex flex-col items-center justify-center pt-12 md:pt-0">
            <span className="font-serif text-6xl md:text-7xl tracking-tighter text-[#000000] mb-4 block text-center tabular-nums">
              {stat3.value}
            </span>
            <span className="text-sm uppercase tracking-widest text-[#6F6F6F] font-semibold text-center block">
              {t.stats.stat3_text}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

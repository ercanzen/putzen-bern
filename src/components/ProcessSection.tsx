import { FadeUp } from './shared';
import { useLanguage } from '../i18n';

export function ProcessSection() {
  const { t } = useLanguage();
  
  const processSteps = t.process.items.map((item, index) => ({
    num: `0${index + 1}`,
    title: item.title,
    desc: item.desc
  }));

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-white text-black relative z-10 border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.9]">
              {t.process.title1}<br className="hidden md:block"/> <em className="italic text-[#6F6F6F]">{t.process.title2}</em>
            </h2>
            <p className="text-[#6F6F6F] max-w-sm text-sm leading-relaxed pb-2">
              {t.process.desc}
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {processSteps.map((step, idx) => (
            <FadeUp key={step.num} delay={idx * 0.15}>
              <div className="relative p-8 md:p-12 rounded-[2rem] bg-[#F9F9F9] h-full flex flex-col justify-end min-h-[280px] md:min-h-[360px] group hover:bg-[#F0F0F0] transition-colors duration-500 overflow-hidden">
                <div className="absolute top-4 right-4 font-serif italic text-8xl md:text-[8rem] leading-none text-black/[0.03] group-hover:text-black/[0.08] transition-colors duration-500 pointer-events-none select-none group-hover:scale-110 transform origin-top-right">
                  {step.num}
                </div>
                
                <div className="relative z-10">
                  <h3 className="font-sans font-medium text-2xl mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{step.title}</h3>
                  <p className="text-[#6F6F6F] text-sm leading-relaxed group-hover:translate-x-2 transition-transform duration-500 delay-75">
                    {step.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

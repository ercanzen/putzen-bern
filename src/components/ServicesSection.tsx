import { FadeUp } from './shared';
import { useLanguage } from '../i18n';

export function ServicesSection() {
  const { t } = useLanguage();
  
  const services = t.services.items.map((item, index) => ({
    id: `0${index + 1}`,
    title: item.title,
    desc: item.desc
  }));

  return (
    <section id="leistungen" className="py-32 md:py-48 bg-[#F9F9F9] text-black px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-[5.5rem] tracking-tight leading-[0.9]">
              {t.services.title1}<br /><em className="italic text-[#6F6F6F]">{t.services.title2}</em>
            </h2>
            <p className="text-[#6F6F6F] max-w-sm text-sm leading-relaxed pb-2">
              {t.services.desc}
            </p>
          </div>
        </FadeUp>

        <div className="flex flex-col border-t border-black/10">
          {services.map((s, i) => (
            <FadeUp key={s.id} delay={i * 0.1}>
              <div className="group flex flex-col md:flex-row gap-6 md:gap-12 py-12 md:py-16 border-b border-black/10 cursor-pointer items-center relative overflow-hidden px-6 -mx-6 rounded-2xl hover:bg-white transition-colors duration-500">
                <div className="font-serif italic text-2xl md:text-5xl text-black/20 group-hover:text-[#6F6F6F] transition-colors duration-500 w-10 md:w-32 flex-shrink-0">
                  {s.id}
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-serif text-2xl md:text-5xl tracking-tight md:group-hover:translate-x-4 transition-transform duration-500 ease-out">{s.title}</h3>
                  <div className="md:grid md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:transition-[grid-template-rows] md:duration-500 md:ease-out">
                    <div className="md:overflow-hidden">
                      <p className="text-[#6F6F6F] text-sm md:text-base max-w-2xl leading-relaxed mt-3 md:group-hover:translate-x-4 transition-transform duration-500 ease-out delay-75">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center justify-end w-24">
                  <div className="w-14 h-14 rounded-full border border-black/20 group-hover:border-black group-hover:bg-black group-hover:text-white text-black/30 flex items-center justify-center transition-all duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45 group-hover:rotate-0 transition-transform duration-500"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

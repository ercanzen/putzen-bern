import { FadeUp } from './shared';
import { useLanguage } from '../i18n';

export function ServiceAreaSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-white border-t border-black/5" id="einsatzgebiet">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24">
        
        <div className="md:w-5/12 flex flex-col justify-center">
          <FadeUp>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.9] mb-8">
              {t.service_area.title1}<br />
              <em className="italic text-[#6F6F6F]">{t.service_area.title2}</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-base md:text-lg text-[#6F6F6F] leading-relaxed max-w-md">
              {t.service_area.desc}
            </p>
          </FadeUp>
        </div>

        <div className="md:w-7/12">
          <FadeUp delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {t.service_area.regions.map((region, index) => (
                <div 
                  key={index} 
                  className="bg-[#F7F7F7] px-4 py-8 md:py-10 rounded-2xl flex items-center justify-center border border-black/5 hover:border-black/20 hover:shadow-md transition-all duration-300 group"
                >
                  <span className="font-serif text-base md:text-xl tracking-tight text-center group-hover:scale-105 transition-transform duration-300 break-words">{region}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

      </div>
    </section>
  );
}

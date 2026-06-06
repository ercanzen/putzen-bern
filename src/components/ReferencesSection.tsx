import { FadeUp } from './shared';
import { useLanguage } from '../i18n';

export function ReferencesSection() {
  const { t } = useLanguage();

  const references = t.references.items.map((item, index) => ({
    id: index + 1,
    quote: item.quote,
    author: item.author,
    role: item.role
  }));

  return (
    <section id="referenzen" className="py-32 md:py-48 px-6 md:px-12 bg-white text-black border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.9]">
              {t.references.title1}<br className="hidden md:block"/> <em className="italic text-[#6F6F6F]">{t.references.title2}</em>
            </h2>
            <p className="text-[#6F6F6F] max-w-sm text-sm leading-relaxed pb-2">
              {t.references.desc}
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {references.map((ref, idx) => (
            <FadeUp key={ref.id} delay={idx * 0.15}>
              <div className="relative p-8 md:p-12 rounded-[2rem] bg-[#F9F9F9] h-full flex flex-col justify-between group hover:bg-white border border-transparent hover:border-black/5 transition-all duration-500">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <div className="font-serif italic text-6xl text-black/10 mb-8">
                  "
                </div>
                
                <p className="text-base md:text-xl leading-relaxed tracking-tight mb-8 md:mb-12">
                  {ref.quote}
                </p>
                
                <div>
                  <h4 className="font-sans font-medium text-base mb-1">{ref.author}</h4>
                  <p className="text-[#6F6F6F] text-xs uppercase tracking-widest">{ref.role}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

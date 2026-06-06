import { FadeUp } from './shared';
import { useLanguage } from '../i18n';
import { CleaningCloudCharacter } from './CleaningCloudCharacter';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="ueber-uns" className="py-32 md:py-48 px-6 md:px-12 bg-white text-black max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
      <div className="flex-1 w-full relative">
        <FadeUp>
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden">
            <CleaningCloudCharacter />
          </div>
        </FadeUp>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <FadeUp>
          <span className="text-xs uppercase tracking-[0.2em] text-[#6F6F6F] mb-6 block font-medium">{t.about.philosophy_label}</span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-8">
            {t.about.title1}<br className="hidden lg:block"/>{t.about.title2}
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-[#6F6F6F] text-base md:text-lg leading-relaxed max-w-lg mb-6">
            {t.about.p1}
          </p>
          <p className="text-[#6F6F6F] text-base md:text-lg leading-relaxed max-w-lg mb-10">
            {t.about.p2}
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <a href="#leistungen" className="inline-block border border-black px-8 py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300 shadow-sm">
            {t.about.cta}
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

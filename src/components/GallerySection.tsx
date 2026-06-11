import { FadeUp } from './shared';
import { useLanguage } from '../i18n';

import imgKitchen from '../assets/images/putzen-workers-portrait.webp';
import imgTruck from '../assets/images/putzen-truck.webp';
import imgMoving from '../assets/images/putzen-moving-boxes.webp';

export function GallerySection() {
  const { t } = useLanguage();

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-[#F9F9F9] text-black shrink-0 border-t border-black/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <FadeUp>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.9]">
            {t.gallery.title1}<br className="hidden md:block"/> <em className="italic text-[#6F6F6F]">{t.gallery.title2}</em>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-[#6F6F6F] max-w-sm text-sm leading-relaxed pb-2">
            {t.gallery.desc}
          </p>
        </FadeUp>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">

        {/* Workers Portrait - full width */}
        <FadeUp delay={0.2} className="group relative rounded-[2rem] overflow-hidden aspect-[16/7] shadow-sm border border-black/5">
          <img src={imgKitchen} alt="Putzen Team" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
        </FadeUp>

        {/* Truck */}
        <FadeUp delay={0.3} className="group relative rounded-[2rem] overflow-hidden aspect-[16/7] shadow-sm border border-black/5">
          <img src={imgTruck} alt="Putzen Truck" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-left transition-transform duration-700 ease-out group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
        </FadeUp>

        {/* Moving Boxes */}
        <FadeUp delay={0.4} className="group relative rounded-[2rem] overflow-hidden aspect-[16/7] shadow-sm border border-black/5">
          <img src={imgMoving} alt="Putzen Umzug Kartons" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
        </FadeUp>

      </div>
    </section>
  );
}

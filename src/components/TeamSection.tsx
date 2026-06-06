import { FadeUp } from './shared';
import img1 from '../assets/images/team_member_1_1779367353765.png';
import img2 from '../assets/images/team_member_2_1779367370138.png';
import { useLanguage } from '../i18n';

export function TeamSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-[#F7F7F7] border-t border-black/5" id="team">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24">
        
        <div className="md:w-5/12 flex flex-col justify-center">
          <FadeUp>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.9] mb-8">
              {t.team.title1}<br />
              <em className="italic text-[#6F6F6F]">{t.team.title2}</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-base md:text-lg text-[#6F6F6F] leading-relaxed max-w-md">
              {t.team.desc}
            </p>
          </FadeUp>
        </div>

        <div className="md:w-7/12 flex flex-col sm:flex-row gap-8 lg:gap-12">
          
          <FadeUp delay={0.2} className="flex-1 group">
             <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white mb-6 shadow-sm border border-black/5 relative">
                <img src={img1} alt={t.team.member1_name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" />
             </div>
             <h3 className="font-serif text-2xl tracking-tight mb-1 text-[#000000]">{t.team.member1_name}</h3>
             <p className="text-xs uppercase tracking-widest text-[#6F6F6F] font-semibold">{t.team.member1_role}</p>
          </FadeUp>

          <FadeUp delay={0.3} className="flex-1 group">
             <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white mb-6 shadow-sm border border-black/5 relative">
                <img src={img2} alt={t.team.member2_name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" />
             </div>
             <h3 className="font-serif text-2xl tracking-tight mb-1 text-[#000000]">{t.team.member2_name}</h3>
             <p className="text-xs uppercase tracking-widest text-[#6F6F6F] font-semibold">{t.team.member2_role}</p>
          </FadeUp>

        </div>

      </div>
    </section>
  );
}

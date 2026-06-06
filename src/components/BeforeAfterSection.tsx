import { useState, useRef, useEffect } from 'react';
import { FadeUp } from './shared';
import { useLanguage } from '../i18n';
import imgBefore from '../assets/images/kitchen_before_1779366929176.png';
import imgAfter from '../assets/images/kitchen_after_1779366951039.png';

export function BeforeAfterSection() {
  const { t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const onMouseMove = (e: globalThis.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: globalThis.TouchEvent) => handleMove(e.touches[0].clientX);

  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <section className="py-24 md:py-32 bg-[#F7F7F7] px-4 md:px-8 border-t border-black/5" id="resultate">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-4 flex flex-col justify-center">
            <FadeUp>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.95] mb-6 text-[#000000]">
                {t.before_after.title1}<br /><em className="italic text-[#6F6F6F]">{t.before_after.title2}</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-base md:text-lg text-[#6F6F6F] leading-relaxed mb-8">
                {t.before_after.desc}
              </p>
            </FadeUp>
          </div>

          <div className="lg:col-span-8">
            <FadeUp delay={0.2} className="relative aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-2xl">
              
              <div 
                ref={containerRef}
                className="absolute inset-0 select-none touch-none cursor-ew-resize"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                role="slider"
                aria-valuenow={sliderPosition}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t.before_after.slider_handle}
                tabIndex={0}
              >
                {/* After Image (Background) */}
                <div className="absolute inset-0">
                  <img src={imgAfter} alt={t.before_after.after} loading="lazy" decoding="async" className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wider font-mono uppercase shadow-sm">
                    {t.before_after.after}
                  </div>
                </div>

                {/* Before Image (Clipped) */}
                <div 
                  className="absolute inset-0 overflow-hidden" 
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img src={imgBefore} alt={t.before_after.before} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                  <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wider font-mono uppercase shadow-sm">
                    {t.before_after.before}
                  </div>
                </div>

                {/* Slider Handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.3)] transform -translate-x-1/2 flex items-center justify-center transition-opacity duration-300"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className={`w-11 h-11 md:w-14 md:h-14 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-200 ${isDragging ? 'scale-110' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black/50">
                      <path d="M15 18L21 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 18L3 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}

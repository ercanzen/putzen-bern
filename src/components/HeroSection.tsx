import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const FADE = 0.5; // seconds
    let rafId: number;
    let resetTimer: NodeJS.Timeout;
    let stopped = false;

    const tick = () => {
      if (stopped) return;
      const d = video.duration;
      const t = video.currentTime;
      if (d && !isNaN(d)) {
        let op = 1;
        if (t < FADE) {
          op = Math.max(0, Math.min(1, t / FADE));
        } else if (t > d - FADE) {
          op = Math.max(0, Math.min(1, (d - t) / FADE));
        }
        video.style.opacity = String(op);
      }
      rafId = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      video.style.opacity = '0';
      resetTimer = setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    const onLoaded = () => {
      video.play().catch(() => {});
      rafId = requestAnimationFrame(tick);
    };

    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('ended', onEnded);
    if (video.readyState >= 1) onLoaded();

    return () => {
      stopped = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (resetTimer) clearTimeout(resetTimer);
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="metadata"
      crossOrigin="anonymous"
      className="w-full h-full object-cover block opacity-0"
    />
  );
}

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <div id="top" className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Background Video Layer */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-0 bg-white" style={{ top: 'clamp(260px, 40vh, 400px)' }}>
        <HeroVideo />
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 70%, #FFFFFF 100%)' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-7xl mx-auto" style={{ paddingTop: 'clamp(110px, 18vh, 180px)', paddingBottom: 'clamp(60px, 10vh, 120px)' }}>
        <h1 className="font-serif font-normal text-4xl sm:text-6xl md:text-8xl max-w-7xl text-[#000000] tracking-[-0.04em] md:tracking-[-2.46px] animate-fade-rise" style={{ lineHeight: 0.95 }}>
          {t.hero.title1}<em className="italic text-[#6F6F6F]">{t.hero.title2}</em>{t.hero.title3}<em className="italic text-[#6F6F6F]">{t.hero.title4}</em>
        </h1>

        <p className="text-base sm:text-lg text-[#6F6F6F] max-w-2xl mt-8 sm:mt-12 md:mt-16 leading-relaxed animate-fade-rise-delay">
          {t.hero.desc}
        </p>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent('openOfferte'))}
          className="inline-block rounded-full px-14 py-5 text-base mt-10 bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform duration-300 shadow-lg animate-fade-rise-delay-2"
        >
          {t.nav.offerte}
        </button>
      </div>
    </div>
  );
}

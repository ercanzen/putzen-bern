import { useRef, useEffect } from 'react';
import { Globe, ArrowRight, Instagram, Twitter } from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4';
const FADE_DURATION = 500;
const FADE_OUT_TRIGGER = 0.55;

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  function cancelFade() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  function fadeIn(el: HTMLVideoElement) {
    cancelFade();
    const start = performance.now();
    const fromOpacity = el.style.opacity !== '' ? parseFloat(el.style.opacity) : 0;

    function step(now: number) {
      const progress = Math.min((now - start) / FADE_DURATION, 1);
      el.style.opacity = String(fromOpacity + (1 - fromOpacity) * progress);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    }
    rafRef.current = requestAnimationFrame(step);
  }

  function fadeOut(el: HTMLVideoElement, onComplete: () => void) {
    cancelFade();
    const start = performance.now();
    const fromOpacity = el.style.opacity !== '' ? parseFloat(el.style.opacity) : 1;

    function step(now: number) {
      const progress = Math.min((now - start) / FADE_DURATION, 1);
      el.style.opacity = String(fromOpacity * (1 - progress));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
        onComplete();
      }
    }
    rafRef.current = requestAnimationFrame(step);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';

    function handleCanPlay() {
      if (!video) return;
      video.play().catch(() => {});
    }

    function handlePlaying() {
      if (!video) return;
      fadingOutRef.current = false;
      fadeIn(video);
    }

    function handleTimeUpdate() {
      if (!video) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= FADE_OUT_TRIGGER && !fadingOutRef.current && !isNaN(video.duration)) {
        fadingOutRef.current = true;
        fadeOut(video, () => {});
      }
    }

    function handleEnded() {
      if (!video) return;
      cancelFade();
      video.style.opacity = '0';
      fadingOutRef.current = false;
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    }

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      cancelFade();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          loop={false}
          className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 pl-6 pr-6 py-6">
        <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
          {/* Left: logo + links */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Globe size={24} className="text-white" />
              <span className="text-white font-semibold text-lg">Asme</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['Features', 'Pricing', 'About'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Right: auth buttons */}
          <div className="flex items-center gap-4">
            <button className="text-white text-sm font-medium hover:text-white/80 transition-colors">
              Sign Up
            </button>
            <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Built for the curious
        </h1>

        <div className="max-w-xl w-full space-y-4">
          {/* Email input */}
          <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-base outline-none"
            />
            <button className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-colors flex-shrink-0">
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-white text-sm leading-relaxed px-4">
            Stay updated with the latest news and insights. Subscribe to our newsletter today and
            never miss out on exciting updates.
          </p>

          {/* Manifesto button */}
          <div className="flex justify-center">
            <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
              Read our manifesto
            </button>
          </div>
        </div>
      </div>

      {/* Social icons footer */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <button
          aria-label="Instagram"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Instagram size={20} />
        </button>
        <button
          aria-label="Twitter"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Twitter size={20} />
        </button>
        <button
          aria-label="Website"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Globe size={20} />
        </button>
      </div>
    </div>
  );
}

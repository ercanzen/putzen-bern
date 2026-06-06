import { useEffect, useRef } from 'react';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

export function PageBg() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const FADE = 0.5;
    let rafId: number, resetTimer: ReturnType<typeof setTimeout>, stopped = false;

    const tick = () => {
      if (stopped) return;
      const d = video.duration, t = video.currentTime;
      if (d && !isNaN(d)) {
        let op = 1;
        if (t < FADE) op = Math.max(0, Math.min(1, t / FADE));
        else if (t > d - FADE) op = Math.max(0, Math.min(1, (d - t) / FADE));
        video.style.opacity = String(op);
      }
      rafId = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      video.style.opacity = '0';
      resetTimer = setTimeout(() => { video.currentTime = 0; video.play().catch(() => {}); }, 100);
    };
    const onLoaded = () => { video.play().catch(() => {}); rafId = requestAnimationFrame(tick); };

    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('ended', onEnded);
    if (video.readyState >= 1) onLoaded();

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      clearTimeout(resetTimer);
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <div className="page-bg">
      <video ref={videoRef} src={VIDEO_SRC} muted playsInline preload="auto" crossOrigin="anonymous" />
    </div>
  );
}

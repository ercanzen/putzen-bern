import { useEffect, useRef } from 'react';
import putzenManVideo from '../assets/images/putzen-man-animated.mp4';

export function CleaningCloudCharacter() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.src = putzenManVideo;
          video.play().catch(() => {});
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#f5f0eb' }}>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.15)', transformOrigin: 'center center' }}
      />
    </div>
  );
}

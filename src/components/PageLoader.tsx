import { useEffect, useState } from 'react';

export function PageLoader() {
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOut(true), 1100);
    const t2 = setTimeout(() => setGone(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#fff',
        zIndex: 9500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        opacity: out ? 0 : 1,
        pointerEvents: out ? 'none' : 'all',
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <p
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(60px, 12vw, 140px)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: '#000',
          animation: 'fadeRise 0.55s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        PUTZEN
      </p>
      <div
        style={{
          height: '2px',
          background: '#C49A2B',
          borderRadius: '2px',
          animation: 'growBar 1.05s cubic-bezier(0.16,1,0.3,1) 0.1s both',
        }}
      />
    </div>
  );
}

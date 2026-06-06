import putzenManVideo from '../assets/images/putzen-man-animated.mp4';

export function CleaningCloudCharacter() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#f5f0eb' }}>
      <video
        src={putzenManVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', transform: 'scale(1.15)', transformOrigin: 'center center' }}
      />
    </div>
  );
}

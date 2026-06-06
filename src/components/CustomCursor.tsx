import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(hover: none)').matches) {
      return;
    }
    
    setIsVisible(true);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null;
      
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] mix-blend-difference transition-transform duration-150 ease-out flex items-center justify-center`}
      style={{
        transform: `translate3d(${position.x - 8}px, ${position.y - 8}px, 0) scale(${isHovering ? 2 : 1})`,
        backgroundColor: 'white'
      }}
    >
    </div>
  );
}

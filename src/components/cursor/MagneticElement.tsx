import React, { useRef, useEffect } from 'react';
import { useCursor, CursorState } from '../../context/CursorContext';

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  cursorState?: CursorState;
  cursorText?: string;
  magneticStrength?: number; // 0.1 to 0.4 (default 0.2)
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
}

export const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  className = '',
  cursorState = 'hover',
  cursorText = '',
  magneticStrength = 0.2,
  onClick,
  disabled = false
}) => {
  const { setCursor, resetCursor, setMagneticTarget, isMobile } = useCursor();
  const elRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    return () => {
      if (isHovered.current) {
        resetCursor();
        setMagneticTarget(null);
      }
    };
  }, [resetCursor, setMagneticTarget]);

  const handleMouseEnter = () => {
    if (disabled || isMobile) return;
    isHovered.current = true;
    setCursor(cursorState, cursorText);
    if (elRef.current) {
      setMagneticTarget(elRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isMobile || !elRef.current) return;
    const rect = elRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;

    // Constrain offset to reasonable bounds
    const maxOffset = 14;
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

    // Direct DOM manipulation - zero React state overhead!
    elRef.current.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
    elRef.current.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    if (disabled || isMobile) return;
    isHovered.current = false;
    resetCursor();
    setMagneticTarget(null);

    if (elRef.current) {
      elRef.current.style.transform = 'translate3d(0, 0, 0)';
      elRef.current.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  };

  return (
    <div
      ref={elRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
};

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export type CursorState = 'default' | 'hover' | 'product' | 'video' | 'image' | 'link' | 'drag';

export interface MousePosData {
  x: number;
  y: number;
  normX: number;
  normY: number;
}

// Global shared ref for zero-react-render high-frequency animations
export const globalMousePos: MousePosData = {
  x: -100,
  y: -100,
  normX: 0,
  normY: 0
};

interface CursorContextType {
  cursorState: CursorState;
  cursorText: string;
  setCursor: (state: CursorState, text?: string) => void;
  resetCursor: () => void;
  isMobile: boolean;
  magneticTarget: HTMLElement | null;
  setMagneticTarget: (el: HTMLElement | null) => void;
  isDragging3D: boolean;
  setIsDragging3D: (dragging: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDragging3D, setIsDragging3D] = useState<boolean>(false);
  const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null);

  // Detect mobile or touch-only devices once
  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches ||
                      'ontouchstart' in window ||
                      navigator.maxTouchPoints > 0;
      setIsMobile(isTouch);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track raw cursor position purely in ref - NO REACT STATE UPDATES ON MOUSE MOVE!
  useEffect(() => {
    if (isMobile) return;

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      globalMousePos.x = e.clientX;
      globalMousePos.y = e.clientY;

      if (!ticking) {
        requestAnimationFrame(() => {
          // Normalized coordinates (-1 to 1) for 3D shaders & lighting
          globalMousePos.normX = (globalMousePos.x / window.innerWidth) * 2 - 1;
          globalMousePos.normY = -(globalMousePos.y / window.innerHeight) * 2 + 1;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const setCursor = useCallback((state: CursorState, text: string = '') => {
    setCursorState(state);
    setCursorText(text);
  }, []);

  const resetCursor = useCallback(() => {
    setCursorState('default');
    setCursorText('');
  }, []);

  return (
    <CursorContext.Provider
      value={{
        cursorState,
        cursorText,
        setCursor,
        resetCursor,
        isMobile,
        magneticTarget,
        setMagneticTarget,
        isDragging3D,
        setIsDragging3D,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

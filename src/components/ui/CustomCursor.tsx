import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

export const CustomCursor: React.FC = () => {
  const { x, y } = useMousePosition();
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Enable custom cursor mode on document body
    document.body.classList.add('custom-cursor-active');

    const handleMouseOver = (e: MouseEvent) => {
      setIsVisible(true);
      const target = e.target as HTMLElement;
      
      const projectCard = target.closest('[data-cursor-text]');
      const clickable = target.closest('a, button, [role="button"], input, textarea, select');

      if (projectCard) {
        const text = projectCard.getAttribute('data-cursor-text') || 'View';
        setCursorText(text);
        setIsHovered(true);
      } else if (clickable) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible || typeof window === 'undefined' || window.innerWidth < 1024) {
    return null;
  }

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#FF5E3A] rounded-full pointer-events-none z-[999] shadow-[0_0_10px_#FF5E3A]"
        animate={{
          x: x - 5,
          y: y - 5,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Outer Ring / Card Badge */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[998] flex items-center justify-center rounded-full border border-[#FF5E3A]/60 bg-[#FF5E3A]/10 backdrop-blur-xs transition-colors duration-200 ${
          cursorText ? 'px-4 py-2 bg-[#FF5E3A] text-white border-transparent shadow-glow-accent' : ''
        }`}
        animate={{
          x: cursorText ? x - 60 : x - (isHovered ? 28 : 18),
          y: cursorText ? y - 20 : y - (isHovered ? 28 : 18),
          width: cursorText ? 'auto' : isHovered ? 56 : 36,
          height: cursorText ? 'auto' : isHovered ? 56 : 36,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        {cursorText && (
          <span className="text-xs font-bold font-heading uppercase tracking-wider whitespace-nowrap text-white">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};

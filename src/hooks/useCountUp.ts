import { useState, useEffect } from 'react';

export const useCountUp = (end: number, duration: number = 2000, startOnInView: boolean = true, isVisible: boolean = true): number => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (startOnInView && !isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease Out Expo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, startOnInView, isVisible]);

  return count;
};

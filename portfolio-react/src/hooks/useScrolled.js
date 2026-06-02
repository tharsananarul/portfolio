import { useState, useEffect } from 'react';

/**
 * Retourne true si window.scrollY > threshold px
 * Passive listener pour éviter le jank sur iOS
 */
export function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

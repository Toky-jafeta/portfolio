import { useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15, ...options }
    );

    const current = ref.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, isInView];
}

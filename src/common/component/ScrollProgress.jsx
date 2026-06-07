import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  z-index: 10000;
  transition: width 0.1s linear;
  box-shadow: 0 0 12px var(--accent-primary);
`;

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) setProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <Bar style={{ width: `${progress}%` }} />;
}

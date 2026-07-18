import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, animate, useInView } from 'framer-motion';
import profil from '../../assets/img/profil_nobg.png';
import { useLang } from '../../common/context/LanguageContext';
import { t, tr } from '../../i18n/translations';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const pulseRing = keyframes`
  0% { transform: scale(0.95); opacity: 0.6; }
  70% { transform: scale(1.08); opacity: 0; }
  100% { transform: scale(0.95); opacity: 0; }
`;

const gridMove = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
`;

const Section = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 0 8%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(99, 102, 241, 0.04) 60px, rgba(99, 102, 241, 0.04) 61px),
      repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(99, 102, 241, 0.04) 60px, rgba(99, 102, 241, 0.04) 61px);
    animation: ${gridMove} 20s linear infinite;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    text-align: center;
    padding: 120px 5% 60px;
    gap: 40px;
  }
`;

const Left = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  z-index: 1;
`;

const Right = styled(motion.div)`
  flex: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Eyebrow = styled.span`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent-primary);
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 3.2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.15;

  .highlight {
    background: linear-gradient(120deg, var(--accent-primary), var(--accent-tertiary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 900px) { font-size: 2.2rem; }
`;

const Desc = styled.p`
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 550px;

  @media (max-width: 900px) { max-width: 90%; margin: 0 auto; }
`;

const Metrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 10px;

  @media (max-width: 900px) { justify-content: center; gap: 20px; }
`;

const Metric = styled.div`
  text-align: left;

  .number {
    font-family: var(--font-heading);
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--accent-primary);
  }

  .label {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  @media (max-width: 900px) { text-align: center; }
`;

const CTAs = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 15px;

  @media (max-width: 900px) { justify-content: center; flex-wrap: wrap; }
`;

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--accent-primary), #4f46e5);
  color: #0a0e17;
  padding: 14px 28px;
  border-radius: 50px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
  }
`;

const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--text-primary);
  padding: 14px 28px;
  border-radius: 50px;
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
    transform: translateY(-2px);
  }
`;

const PhotoWrapper = styled.div`
  position: relative;
  width: 420px;
  height: 520px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 900px) {
    width: 280px;
    height: 360px;
  }
`;

const PhotoGlowBase = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 120px;
  background: radial-gradient(ellipse, rgba(99, 102, 241, 0.35) 0%, transparent 70%);
  filter: blur(30px);
  border-radius: 50%;
  z-index: 0;

  @media (max-width: 900px) {
    width: 200px;
    height: 80px;
  }
`;

const PhotoCyberGlow = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 340px;
  height: 340px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(168, 85, 247, 0.1) 55%, transparent 75%);
  filter: blur(35px);
  z-index: 1;
  pointer-events: none;
  border-radius: 50%;

  @media (max-width: 900px) {
    width: 220px;
    height: 220px;
    top: 10%;
  }
`;

const PulseRing = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  height: 320px;
  border-radius: 50%;
  border: 1.5px solid rgba(99, 102, 241, 0.3);
  animation: ${pulseRing} 3s ease-out infinite;
  z-index: 0;

  @media (max-width: 900px) {
    width: 220px;
    height: 220px;
  }
`;

const PulseRing2 = styled(PulseRing)`
  animation-delay: 1s;
  border-color: rgba(0, 212, 170, 0.2);
`;

const DecorRing = styled.div`
  position: absolute;
  top: 20px;
  right: -10px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 1px dashed rgba(99, 102, 241, 0.4);
  z-index: 0;
`;

const DecorDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-tertiary);
  box-shadow: 0 0 12px var(--accent-tertiary);
  z-index: 3;

  &.d1 { top: 60px; right: 20px; }
  &.d2 { top: 180px; left: -15px; opacity: 0.6; }
  &.d3 { bottom: 100px; right: -5px; opacity: 0.8; }
`;

const PhotoImg = styled.img`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  -webkit-mask-image: linear-gradient(to bottom, black 65%, transparent 98%);
  mask-image: linear-gradient(to bottom, black 65%, transparent 98%);
  filter: brightness(1.03) contrast(1.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: scale(1.02);
    filter: brightness(1.06) contrast(1.08);
  }
`;

function Counter({ value, suffix = '', duration = 1.5 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: 'easeOut',
        onUpdate: (latest) => setCount(Math.round(latest)),
      });
      return controls.stop;
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  const { lang } = useLang();
  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="accueil">
      <Left
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <Eyebrow>{tr(t.hero.eyebrow, lang)}</Eyebrow>
        <Title>
          {tr(t.hero.title1, lang)}{' '}
          <span className="highlight">{tr(t.hero.title2, lang)}</span>
        </Title>
        <Desc>{tr(t.hero.desc, lang)}</Desc>
        <Metrics>
          <Metric>
            <div className="number"><Counter value={12} suffix="+" /></div>
            <div className="label">{tr(t.hero.yearsExp, lang)}</div>
          </Metric>
          <Metric>
            <div className="number"><Counter value={50} suffix="+" /></div>
            <div className="label">{tr(t.hero.projects, lang)}</div>
          </Metric>
          <Metric>
            <div className="number"><Counter value={4} /></div>
            <div className="label">{tr(t.hero.certs, lang)}</div>
          </Metric>
          <Metric>
            <div className="number"><Counter value={5} suffix="+" /></div>
            <div className="label">{tr(t.hero.clients, lang)}</div>
          </Metric>
        </Metrics>
        <CTAs>
          <PrimaryBtn href="#realisations" onClick={(e) => handleClick(e, 'realisations')}>
            {tr(t.hero.cta1, lang)}
          </PrimaryBtn>
          <SecondaryBtn href="#contact" onClick={(e) => handleClick(e, 'contact')}>
            {tr(t.hero.cta2, lang)}
          </SecondaryBtn>
        </CTAs>
      </Left>

      <Right
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <PhotoWrapper>
          <PhotoGlowBase />
          <PhotoCyberGlow />
          <PulseRing />
          <PulseRing2 />
          <DecorRing />
          <DecorDot className="d1" />
          <DecorDot className="d2" />
          <DecorDot className="d3" />
          <PhotoImg src={profil} alt="Toky Rasolomanitra — Ingénieur IT & Cybersécurité" />
        </PhotoWrapper>
      </Right>
    </Section>
  );
}

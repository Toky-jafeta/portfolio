import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import profil from '../../assets/img/profil.jpg';

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.3), 0 0 60px rgba(99, 102, 241, 0.1); }
  50% { box-shadow: 0 0 50px rgba(0, 212, 170, 0.5), 0 0 80px rgba(99, 102, 241, 0.2); }
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

const PhotoContainer = styled.div`
  width: 340px;
  height: 340px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent-primary);
  animation: ${glow} 4s ease-in-out infinite;
  transition: transform 0.3s ease;

  &:hover { transform: scale(1.03); }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    width: 250px;
    height: 250px;
  }
`;

export default function Hero() {
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
        <Eyebrow>Ingénieur Systèmes, Réseaux & Cybersécurité</Eyebrow>
        <Title>
          Je conçois, sécurise et pilote{' '}
          <span className="highlight">vos infrastructures IT critiques.</span>
        </Title>
        <Desc>
          Expert en architectures réseau, cybersécurité et automatisation Python,
          j'aide les entreprises à innover tout en renforçant leur résilience numérique.
        </Desc>
        <Metrics>
          <Metric><div className="number">12+</div><div className="label">Ans d'expérience</div></Metric>
          <Metric><div className="number">50+</div><div className="label">Projets livrés</div></Metric>
          <Metric><div className="number">4</div><div className="label">Certifs Fortinet</div></Metric>
          <Metric><div className="number">5+</div><div className="label">Clients majeurs</div></Metric>
        </Metrics>
        <CTAs>
          <PrimaryBtn href="#realisations" onClick={(e) => handleClick(e, 'realisations')}>
            Voir mes réalisations →
          </PrimaryBtn>
          <SecondaryBtn href="#contact" onClick={(e) => handleClick(e, 'contact')}>
            Me contacter
          </SecondaryBtn>
        </CTAs>
      </Left>

      <Right
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <PhotoContainer>
          <img src={profil} alt="Toky Rasolomanitra — Ingénieur IT & Cybersécurité" />
        </PhotoContainer>
      </Right>
    </Section>
  );
}

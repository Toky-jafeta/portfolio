import React, { useState } from 'react';
import styled from 'styled-components';
import { useInView } from '../../common/hooks/useInView';
import LinkedinLogo from '../../assets/logo/linkedin.png';
import gitLogo from '../../assets/logo/git.png';
import DownloadLogo from '../../assets/logo/download.png';
import AtsModal from './AtsModal';

const Section = styled.section`
  padding: 100px 8%;
  background: var(--bg-secondary);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
  }

  @media (max-width: 768px) { padding: 60px 5%; }
`;

const Header = styled.div`
  margin-bottom: 50px;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transform: translateY(${({ $visible }) => $visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const SectionLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent-primary);
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 10px 0 15px;

  @media (max-width: 768px) { font-size: 2rem; }
`;

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 700px;
  line-height: 1.7;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;

  a, button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 50px;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.3s ease;
    background: transparent;
    cursor: pointer;

    img { width: 18px; height: 18px; filter: brightness(0) invert(0.7); }

    &:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
      transform: translateY(-2px);
      img { filter: brightness(0) invert(1); }
    }
  }
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 50px;
`;

const PillarCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 30px 25px;
  transition: all 0.4s ease;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transform: translateY(${({ $visible }) => $visible ? 0 : '30px'});
  transition-delay: ${({ $delay }) => $delay || '0s'};

  &:hover {
    border-color: var(--border-accent);
    transform: translateY(-6px);
    box-shadow: var(--shadow-accent);
  }
`;

const PillarIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const PillarTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
`;

const PillarDesc = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const pillars = [
  {
    icon: '🏗️',
    title: 'Architecture & Infrastructure',
    desc: 'Conception et déploiement d\'architectures réseau complexes : firewalls Fortinet, switches Cisco, VPN, haute disponibilité, segmentation VLAN/VRF.'
  },
  {
    icon: '🛡️',
    title: 'Cybersécurité & Pentesting',
    desc: 'Audits de sécurité, tests d\'intrusion, bug bounty, détection de vulnérabilités. Certifié Fortinet (FCP, FCA, FCF). Actif sur RootMe et HackTheBox.'
  },
  {
    icon: '⚡',
    title: 'Développement & Automatisation',
    desc: 'Développement Python avancé, scripting d\'automatisation, applications web React/Django, outils de monitoring et génération de rapports.'
  },
  {
    icon: '📋',
    title: 'Pilotage de Projets IT',
    desc: 'Chef de projet sur des missions critiques : coordination d\'équipes, gestion des délais, communication client, documentation technique complète.'
  }
];

export default function About() {
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView();
  const [showAtsModal, setShowAtsModal] = useState(false);

  return (
    <Section id="apropos">
      <Header ref={headerRef} $visible={headerVisible}>
        <SectionLabel>{"// À propos"}</SectionLabel>
        <Title>Ingénieur polyvalent, orienté résultats.</Title>
        <Subtitle>
          Basé à Antananarivo, je combine une expertise en systèmes & réseaux,
          une passion pour la cybersécurité et un savoir-faire en développement pour
          concevoir des solutions IT robustes et sécurisées. De l'architecture réseau
          au pentest, du scripting Python au pilotage de projets — je couvre l'ensemble
          de la chaîne de valeur IT.
        </Subtitle>
        <SocialLinks>
          <a href="https://www.linkedin.com/in/toky-rasolomanitra-121896220/" target="_blank" rel="noopener noreferrer">
            <img src={LinkedinLogo} alt="LinkedIn" /> LinkedIn
          </a>
          <a href="https://github.com/Toky-jafeta" target="_blank" rel="noopener noreferrer">
            <img src={gitLogo} alt="GitHub" /> GitHub
          </a>
          <button onClick={() => setShowAtsModal(true)}>
            <img src={DownloadLogo} alt="CV" /> Generate ATS Resume
          </button>
        </SocialLinks>
      </Header>

      {showAtsModal && <AtsModal onClose={() => setShowAtsModal(false)} />}

      <PillarsGrid ref={gridRef}>
        {pillars.map((p, i) => (
          <PillarCard key={i} $visible={gridVisible} $delay={`${i * 0.15}s`}>
            <PillarIcon>{p.icon}</PillarIcon>
            <PillarTitle>{p.title}</PillarTitle>
            <PillarDesc>{p.desc}</PillarDesc>
          </PillarCard>
        ))}
      </PillarsGrid>
    </Section>
  );
}

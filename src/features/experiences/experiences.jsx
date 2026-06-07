import React from 'react';
import styled from 'styled-components';
import { useInView } from '../../common/hooks/useInView';
import { ExperienceList } from '../../datas/experienceList';
import formationsData from '../../datas/formations.json';

const Section = styled.section`
  padding: 100px 8%;
  background: var(--bg-secondary);
  position: relative;
  @media (max-width: 768px) { padding: 60px 5%; }
`;

const Header = styled.div`
  margin-bottom: 50px;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transform: translateY(${({ $v }) => $v ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const Label = styled.span`
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
  max-width: 600px;
  line-height: 1.7;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 50px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 30px;

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    bottom: 5px;
    left: 4px;
    width: 2px;
    background: var(--border);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 40px;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transform: translateY(${({ $v }) => $v ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: ${({ $d }) => $d || '0s'};

  &:last-child { margin-bottom: 0; }

  &::before {
    content: '';
    position: absolute;
    left: -30px;
    top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--bg-secondary);
    border: 2px solid var(--accent-primary);
    box-shadow: 0 0 12px var(--accent-primary);
    z-index: 2;
    transition: background 0.3s ease;
  }

  &:hover::before {
    background: var(--accent-primary);
  }
`;

const Time = styled.span`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Role = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 5px 0;
`;

const Company = styled.div`
  font-size: 0.9rem;
  color: var(--accent-secondary);
  font-weight: 500;
  margin-bottom: 12px;
  span { color: var(--text-muted); font-size: 0.85rem; font-weight: 400; }
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

/* Education section on the right side */
const EduCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--accent-secondary);
  }
`;

const EduTitle = styled.h4`
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
`;

const EduSchool = styled.div`
  font-size: 0.85rem;
  color: var(--accent-secondary);
  margin-bottom: 10px;
`;

const EduDesc = styled.p`
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
`;

export default function Experiences() {
  const [headerRef, headerV] = useInView();
  const [listRef, listV] = useInView();

  const sortedExperiences = [...ExperienceList].sort((a, b) => b.id - a.id);

  return (
    <Section id="experiences">
      <Header ref={headerRef} $v={headerV}>
        <Label>{"// Parcours"}</Label>
        <Title>Expériences & Formations</Title>
        <Subtitle>
          Un résumé de mon parcours professionnel et universitaire au cours des dernières années.
        </Subtitle>
      </Header>

      <Layout ref={listRef}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '30px' }}>
            Expérience Professionnelle
          </h3>
          <TimelineContainer>
            {sortedExperiences.map((item, index) => (
              <TimelineItem key={item.id} $v={listV} $d={`${index * 0.1}s`}>
                <Time>{item.periode}</Time>
                <Role>{item.poste}</Role>
                <Company>{item.entreprise} <span>• {item.lieu}</span></Company>
                <Description>{item.description_court}</Description>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '30px' }}>
            Formations Académiques
          </h3>
          {formationsData.map((f, i) => (
            <EduCard key={i}>
              <Time style={{ color: 'var(--accent-secondary)' }}>{f.annee}</Time>
              <EduTitle>{f.titre}</EduTitle>
              <EduSchool>{f.ecole}</EduSchool>
              <EduDesc>{f.description}</EduDesc>
            </EduCard>
          ))}
        </div>
      </Layout>
    </Section>
  );
}
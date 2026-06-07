import React, { useState } from 'react';
import styled from 'styled-components';
import { useInView } from '../../common/hooks/useInView';
import realisationsData from '../../datas/realisationsData';

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

const FilterTabs = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transition: opacity 0.8s ease 0.2s;
`;

const FilterButton = styled.button`
  background: ${({ $active }) => $active ? 'rgba(99, 102, 241, 0.1)' : 'transparent'};
  color: ${({ $active }) => $active ? 'var(--accent-primary)' : 'var(--text-secondary)'};
  border: 1px solid ${({ $active }) => $active ? 'var(--accent-primary)' : 'var(--border)'};
  padding: 8px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 30px;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transform: translateY(${({ $v }) => $v ? 0 : '30px'});
  transition: all 0.8s ease 0.4s;
`;

const Card = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary));
  }

  &:hover {
    border-color: var(--border-accent);
    transform: translateY(-6px);
    box-shadow: var(--shadow-accent);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const ClientName = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const Periode = styled.span`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const DomainBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(59, 130, 246, 0.1);
  color: var(--accent-secondary);
  padding: 4px 10px;
  border-radius: 50px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

const RoleBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.1);
  color: var(--accent-primary);
  padding: 4px 10px;
  border-radius: 50px;
  border: 1px solid rgba(99, 102, 241, 0.2);
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
`;

const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TaskItem = styled.li`
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.4;
  padding-left: 18px;
  position: relative;

  &::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent-primary);
    font-weight: bold;
  }
`;

export default function Realisations() {
  const [headerRef, headerV] = useInView();
  const [tabsRef, tabsV] = useInView();
  const [activeFilter, setActiveFilter] = useState('All');

  // Dynamically group filters based on domain/keywords
  const getFilterCategory = (domaine) => {
    const d = domaine.toLowerCase();
    if (d.includes('firewall') || d.includes('security') || d.includes('cyber')) return 'Securite';
    if (d.includes('switch') || d.includes('network') || d.includes('routing')) return 'Reseau';
    return 'Projet';
  };

  const filteredData = realisationsData.filter(item => {
    if (activeFilter === 'All') return true;
    return getFilterCategory(item.domaine) === activeFilter;
  });

  return (
    <Section id="realisations">
      <Header ref={headerRef} $v={headerV}>
        <Label>{"// Portfolio"}</Label>
        <Title>Réalisations marquantes</Title>
        <Subtitle>
          Découvrez mes récents projets de migration, sécurisation d'infrastructure et pilotage chez des grands comptes.
        </Subtitle>
      </Header>

      <FilterTabs ref={tabsRef} $v={tabsV}>
        <FilterButton $active={activeFilter === 'All'} onClick={() => setActiveFilter('All')}>Tous les projets</FilterButton>
        <FilterButton $active={activeFilter === 'Reseau'} onClick={() => setActiveFilter('Reseau')}>Réseau & Routage</FilterButton>
        <FilterButton $active={activeFilter === 'Securite'} onClick={() => setActiveFilter('Securite')}>Sécurité & Firewalling</FilterButton>
      </FilterTabs>

      <Grid $v={tabsV}>
        {filteredData.map((item) => (
          <Card key={item.id}>
            <div>
              <CardHeader>
                <ClientName>{item.client}</ClientName>
                <Periode>{item.periode}</Periode>
              </CardHeader>
              <BadgeContainer>
                <DomainBadge>{item.domaine}</DomainBadge>
                <RoleBadge>{item.role}</RoleBadge>
              </BadgeContainer>
              <Description>{item.description}</Description>
            </div>
            <TaskList>
              {item.taches.map((tache, index) => (
                <TaskItem key={index}>{tache}</TaskItem>
              ))}
            </TaskList>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

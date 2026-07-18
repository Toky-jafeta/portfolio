import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../common/hooks/useInView';
import { useLang } from '../../common/context/LanguageContext';
import { t, tr } from '../../i18n/translations';
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
  background: ${({ $active }) => $active ? 'rgba(99,102,241,0.1)' : 'transparent'};
  color: ${({ $active }) => $active ? 'var(--accent-primary)' : 'var(--text-secondary)'};
  border: 1px solid ${({ $active }) => $active ? 'var(--accent-primary)' : 'var(--border)'};
  padding: 8px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  &:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
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
    top: 0; left: 0;
    width: 4px; height: 100%;
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
  background: rgba(59,130,246,0.1);
  color: var(--accent-secondary);
  padding: 4px 10px;
  border-radius: 50px;
  border: 1px solid rgba(59,130,246,0.2);
`;

const RoleBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(99,102,241,0.1);
  color: var(--accent-primary);
  padding: 4px 10px;
  border-radius: 50px;
  border: 1px solid rgba(99,102,241,0.2);
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

const DetailBtn = styled.button`
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 15px;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  &:hover { border-color: var(--accent-primary); color: var(--accent-primary); transform: translateY(-2px); }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--bg-primary) 75%, transparent);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  max-width: 700px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 40px;
  position: relative;
  box-shadow: var(--shadow-accent);
  display: flex;
  flex-direction: column;
  gap: 24px;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  @media (max-width: 500px) { padding: 25px 20px; }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px; right: 20px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s ease;
  &:hover { color: var(--accent-primary); }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid var(--border);
  padding-bottom: 15px;
  gap: 15px;
  @media (max-width: 500px) { flex-direction: column; align-items: flex-start; gap: 8px; }
`;

const ModalClient = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const ModalPeriod = styled.span`
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--text-muted);
  white-space: nowrap;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ModalSection = styled.div`
  h4 {
    font-family: var(--font-heading);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 10px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  p {
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

export default function Realisations() {
  const { lang } = useLang();
  const [headerRef, headerV] = useInView();
  const [tabsRef, tabsV] = useInView();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const getFilterCategory = (domaine) => {
    const d = domaine.toLowerCase();
    if (d.includes('firewall') || d.includes('security') || d.includes('cyber') || d.includes('sécurité')) return 'Securite';
    if (d.includes('switch') || d.includes('network') || d.includes('routing') || d.includes('réseau')) return 'Reseau';
    return 'Projet';
  };

  const filteredData = realisationsData
    .filter(item => activeFilter === 'All' || getFilterCategory(tr(item.domaine, lang)) === activeFilter)
    .sort((a, b) => b.id - a.id);

  return (
    <Section id="realisations">
      <Header ref={headerRef} $v={headerV}>
        <Label>{tr(t.realisations.label, lang)}</Label>
        <Title>{tr(t.realisations.title, lang)}</Title>
        <Subtitle>{tr(t.realisations.subtitle, lang)}</Subtitle>
      </Header>

      <FilterTabs ref={tabsRef} $v={tabsV}>
        <FilterButton $active={activeFilter === 'All'} onClick={() => setActiveFilter('All')}>
          {tr(t.realisations.filterAll, lang)}
        </FilterButton>
        <FilterButton $active={activeFilter === 'Reseau'} onClick={() => setActiveFilter('Reseau')}>
          {tr(t.realisations.filterNet, lang)}
        </FilterButton>
        <FilterButton $active={activeFilter === 'Securite'} onClick={() => setActiveFilter('Securite')}>
          {tr(t.realisations.filterSec, lang)}
        </FilterButton>
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
                <DomainBadge>{tr(item.domaine, lang)}</DomainBadge>
                <RoleBadge>{tr(item.role, lang)}</RoleBadge>
              </BadgeContainer>
              <Description>{tr(item.description, lang)}</Description>
            </div>
            <DetailBtn onClick={() => setSelectedProject(item)}>
              {tr(t.realisations.details, lang)}
            </DetailBtn>
          </Card>
        ))}
      </Grid>

      <AnimatePresence>
        {selectedProject && (
          <ModalOverlay
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedProject(null)}>&times;</CloseButton>
              <ModalHeader>
                <ModalClient>{selectedProject.client}</ModalClient>
                <ModalPeriod>{selectedProject.periode}</ModalPeriod>
              </ModalHeader>
              <BadgeContainer>
                <DomainBadge>{tr(selectedProject.domaine, lang)}</DomainBadge>
                <RoleBadge>{tr(selectedProject.role, lang)}</RoleBadge>
              </BadgeContainer>
              <ModalBody>
                <ModalSection>
                  <h4>{tr(t.realisations.modalDesc, lang)}</h4>
                  <p>{tr(selectedProject.description, lang)}</p>
                </ModalSection>
                <ModalSection>
                  <h4>{tr(t.realisations.modalTasks, lang)}</h4>
                  <TaskList style={{ marginTop: '10px' }}>
                    {tr(selectedProject.taches, lang).map((tache, index) => (
                      <TaskItem key={index}>{tache}</TaskItem>
                    ))}
                  </TaskList>
                </ModalSection>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Section>
  );
}

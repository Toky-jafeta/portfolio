import React, { useState } from 'react';
import styled from 'styled-components';
import { useInView } from '../../common/hooks/useInView';
import { useLang } from '../../common/context/LanguageContext';
import { t, tr } from '../../i18n/translations';
import { ServiceList } from '../../datas/servicesList';

const Section = styled.section`padding: 100px 8%; background: var(--bg-primary); @media (max-width: 768px) { padding: 60px 5%; }`;
const Header = styled.div`margin-bottom: 50px; opacity: ${({ $v }) => $v ? 1 : 0}; transform: translateY(${({ $v }) => $v ? 0 : '30px'}); transition: all 0.8s ease;`;
const Label = styled.span`font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-primary); letter-spacing: 2px; text-transform: uppercase;`;
const Title = styled.h2`font-family: var(--font-heading); font-size: 2.5rem; font-weight: 700; color: var(--text-primary); margin: 10px 0 15px; @media (max-width: 768px) { font-size: 2rem; }`;
const Subtitle = styled.p`font-size: 1.05rem; color: var(--text-secondary); max-width: 600px; line-height: 1.7;`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; opacity: ${({ $v }) => $v ? 1 : 0}; transform: translateY(${({ $v }) => $v ? 0 : '30px'}); transition: all 0.8s ease 0.3s;`;
const Card = styled.div`background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 30px; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.4s ease; cursor: pointer; &:hover { border-color: var(--border-accent); transform: translateY(-6px); box-shadow: var(--shadow-accent); }`;
const CardTitle = styled.h3`font-family: var(--font-heading); font-size: 1.25rem; font-weight: 600; color: var(--text-primary); margin-bottom: 15px; transition: color 0.3s ease; ${Card}:hover & { color: var(--accent-primary); }`;
const Description = styled.p`font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; flex-grow: 1;`;
const LearnMore = styled.span`font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-primary); display: flex; align-items: center; gap: 8px; &::after { content: '→'; transition: transform 0.3s ease; } ${Card}:hover &::after { transform: translateX(5px); }`;
const ModalOverlay = styled.div`position: fixed; inset: 0; background: color-mix(in srgb, var(--bg-primary) 80%, transparent); backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 10000; padding: 20px;`;
const ModalContent = styled.div`background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 40px; max-width: 600px; width: 100%; position: relative; box-shadow: var(--shadow); border-top: 4px solid var(--accent-primary);`;
const CloseButton = styled.button`position: absolute; top: 20px; right: 20px; background: transparent; border: none; font-size: 2rem; color: var(--text-secondary); cursor: pointer; &:hover { color: var(--accent-primary); }`;
const ModalTitle = styled.h3`font-family: var(--font-heading); font-size: 1.6rem; font-weight: 700; color: var(--text-primary); margin-bottom: 20px;`;
const ModalDesc = styled.p`font-size: 1rem; color: var(--text-secondary); line-height: 1.7;`;

export default function Services() {
  const { lang } = useLang();
  const [headerRef, headerV] = useInView();
  const [gridRef, gridV] = useInView();
  const [selectedService, setSelectedService] = useState(null);

  return (
    <Section id="services">
      <Header ref={headerRef} $v={headerV}>
        <Label>{tr(t.services.label, lang)}</Label>
        <Title>{tr(t.services.title, lang)}</Title>
        <Subtitle>{tr(t.services.subtitle, lang)}</Subtitle>
      </Header>
      <Grid ref={gridRef} $v={gridV}>
        {ServiceList.map((service) => (
          <Card key={service.id} onClick={() => setSelectedService(service)}>
            <div>
              <CardTitle>{tr(service.name, lang)}</CardTitle>
              <Description>{tr(service.description, lang)}</Description>
            </div>
            <LearnMore>{tr(t.services.learnMore, lang)}</LearnMore>
          </Card>
        ))}
      </Grid>
      {selectedService && (
        <ModalOverlay onClick={() => setSelectedService(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedService(null)}>&times;</CloseButton>
            <ModalTitle>{tr(selectedService.name, lang)}</ModalTitle>
            <ModalDesc>{tr(selectedService.description, lang)}</ModalDesc>
          </ModalContent>
        </ModalOverlay>
      )}
    </Section>
  );
}

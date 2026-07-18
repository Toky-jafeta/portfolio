import React, { useState } from 'react';
import styled from 'styled-components';
import { useInView } from '../../common/hooks/useInView';
import { useLang } from '../../common/context/LanguageContext';
import { t, tr } from '../../i18n/translations';
import certificationsData from '../../datas/certifications.json';

const Section = styled.section`padding: 100px 8%; background: var(--bg-primary); @media (max-width: 768px) { padding: 60px 5%; }`;
const Header = styled.div`margin-bottom: 50px; opacity: ${({ $v }) => $v ? 1 : 0}; transform: translateY(${({ $v }) => $v ? 0 : '30px'}); transition: all 0.8s ease;`;
const Label = styled.span`font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-primary); letter-spacing: 2px; text-transform: uppercase;`;
const Title = styled.h2`font-family: var(--font-heading); font-size: 2.5rem; font-weight: 700; color: var(--text-primary); margin: 10px 0 15px; @media (max-width: 768px) { font-size: 2rem; }`;
const Subtitle = styled.p`font-size: 1.05rem; color: var(--text-secondary); max-width: 600px; line-height: 1.7;`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; opacity: ${({ $v }) => $v ? 1 : 0}; transform: translateY(${({ $v }) => $v ? 0 : '30px'}); transition: all 0.8s ease 0.3s;`;
const Card = styled.div`background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.4s ease; &:hover { border-color: var(--border-accent); transform: translateY(-6px); box-shadow: var(--shadow-accent); }`;
const CardHeader = styled.div`margin-bottom: 15px;`;
const Org = styled.span`font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-secondary); text-transform: uppercase; letter-spacing: 1px;`;
const CertName = styled.h3`font-family: var(--font-heading); font-size: 1.15rem; font-weight: 600; color: var(--text-primary); margin-top: 5px;`;
const CertMeta = styled.div`font-size: 0.85rem; color: var(--text-secondary); margin-top: 10px; span { color: var(--text-muted); }`;
const ImageWrapper = styled.div`margin-top: 15px; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border); cursor: zoom-in; img { width: 100%; transition: transform 0.3s ease; } &:hover img { transform: scale(1.05); }`;
const ModalOverlay = styled.div`position: fixed; inset: 0; background: color-mix(in srgb, var(--bg-primary) 85%, transparent); backdrop-filter: blur(10px); display: flex; justify-content: center; align-items: center; z-index: 10000; padding: 20px;`;
const ModalContent = styled.div`max-width: 800px; width: 100%; position: relative; img { width: 100%; border-radius: var(--radius-lg); border: 1px solid var(--border); box-shadow: var(--shadow); }`;
const CloseButton = styled.button`position: absolute; top: -40px; right: 0; background: transparent; border: none; font-size: 2rem; color: var(--text-primary); cursor: pointer; &:hover { color: var(--accent-primary); }`;

export default function Certifications() {
  const { lang } = useLang();
  const [headerRef, headerV] = useInView();
  const [gridRef, gridV] = useInView();
  const [activeImage, setActiveImage] = useState(null);

  return (
    <Section id="certifications">
      <Header ref={headerRef} $v={headerV}>
        <Label>{tr(t.certifications.label, lang)}</Label>
        <Title>{tr(t.certifications.title, lang)}</Title>
        <Subtitle>{tr(t.certifications.subtitle, lang)}</Subtitle>
      </Header>
      <Grid ref={gridRef} $v={gridV}>
        {certificationsData.map((c, i) => (
          <Card key={i}>
            <div>
              <CardHeader>
                <Org>{c.organisme}</Org>
                <CertName>{c.nom}</CertName>
              </CardHeader>
              <CertMeta>
                <div>ID: <span>{c.id || 'N/A'}</span></div>
                <div>{tr(t.certifications.year, lang)}: <span>{c.annee}</span></div>
              </CertMeta>
            </div>
            {c.image && (
              <ImageWrapper onClick={() => setActiveImage(c.image)}>
                <img src={c.image} alt={c.nom} />
              </ImageWrapper>
            )}
          </Card>
        ))}
      </Grid>
      {activeImage && (
        <ModalOverlay onClick={() => setActiveImage(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setActiveImage(null)}>&times;</CloseButton>
            <img src={activeImage} alt="Certificate view" />
          </ModalContent>
        </ModalOverlay>
      )}
    </Section>
  );
}

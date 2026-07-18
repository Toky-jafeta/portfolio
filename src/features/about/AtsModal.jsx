import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { generateAtsDocx, generateAtsPdf } from './AtsGenerator';
import { atsResumeData } from '../../datas/atsResumeData';
const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--bg-card, #1e1e2f);
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  color: var(--text-primary, #fff);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border: 1px solid var(--border-accent, #008080);
`;

const Title = styled.h3`
  margin-top: 0;
  font-family: var(--font-heading, "Poppins", sans-serif);
  color: var(--accent-primary, #008080);
`;

const StepItem = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: ${props => props.$active ? 1 : 0.4};
  font-family: var(--font-body, "Quicksand", sans-serif);
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--accent-primary, #008080);
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: ${props => props.$primary ? 'var(--accent-primary, #008080)' : 'transparent'};
  color: ${props => props.$primary ? '#fff' : 'var(--text-primary, #fff)'};
  border: 1px solid var(--accent-primary, #008080);
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font-heading, "Poppins", sans-serif);
  transition: all 0.3s;
  &:hover {
    background: ${props => props.$primary ? '#006666' : 'rgba(0,128,128,0.1)'};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;


const PreviewBox = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: #fff;
  color: #000;
  max-height: 250px;
  overflow-y: auto;
  border-radius: 4px;
  font-family: Arial, sans-serif;
  font-size: 0.85rem;
  border: 1px solid #ccc;
`;

const stepsData = [
  "Analyse du portfolio...",
  "Extraction des informations...",
  "Optimisation ATS...",
  "Génération du CV...",
  "Préparation des fichiers...",
  "Terminé !"
];

export default function AtsModal({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    if (currentStep < stepsData.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 800 + Math.random() * 500); // Simulate processing time
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const isDone = currentStep === stepsData.length - 1;

  const handleRegenerate = () => setCurrentStep(0);

  return (
    <Overlay>
      <ModalContent>
        <Title>Générateur de CV ATS (Optimisé IA)</Title>
        {!isDone && (
          <div style={{ margin: '20px 0' }}>
            {stepsData.map((step, idx) => (
              <StepItem key={idx} $active={idx <= currentStep}>
                {idx === currentStep && !isDone ? <Spinner /> : (idx < currentStep || isDone ? "✅" : "⏳")}
                {step}
              </StepItem>
            ))}
          </div>
        )}

        {isDone && (
          <>
            <PreviewBox>
              <h2 style={{textAlign: 'center', margin: '0 0 4px 0'}}>{atsResumeData.personalInfo.firstName} {atsResumeData.personalInfo.lastName}</h2>
              <p style={{textAlign: 'center', margin: '0 0 4px 0', fontStyle:'italic'}}>{lang === 'fr' ? atsResumeData.personalInfo.currentRole.fr : atsResumeData.personalInfo.currentRole.en}</p>
              <p style={{textAlign: 'center', margin: '0 0 12px 0', fontSize:'0.8rem'}}>{atsResumeData.personalInfo.location} | {atsResumeData.personalInfo.email}</p>
              <h3 style={{borderBottom: '1px solid #000', margin: '10px 0 5px'}}>{lang === 'fr' ? 'PROFIL PROFESSIONNEL' : 'PROFESSIONAL SUMMARY'}</h3>
              <p style={{margin: '0 0 10px'}}>{atsResumeData.personalInfo.summary[lang]}</p>
              <h3 style={{borderBottom: '1px solid #000', margin: '10px 0 5px'}}>{lang === 'fr' ? 'DERNIÈRES RÉALISATIONS' : 'LATEST ACHIEVEMENTS'}</h3>
              {atsResumeData.realisations.slice().reverse().slice(0, 3).map((r, i) => (
                <div key={i} style={{marginBottom: '8px'}}>
                  <strong>{r.client}</strong> | {r.role[lang]} | {r.periode}
                  <p style={{margin: '2px 0', fontStyle:'italic', fontSize:'0.8rem'}}>{r.domaine[lang]}</p>
                </div>
              ))}
              <h3 style={{borderBottom: '1px solid #000', margin: '10px 0 5px'}}>{lang === 'fr' ? 'EXPÉRIENCE PROFESSIONNELLE' : 'PROFESSIONAL EXPERIENCE'}</h3>
              {atsResumeData.experience.slice().reverse().slice(0, 3).map((exp, i) => (
                <div key={i} style={{marginBottom: '6px'}}>
                  <strong>{exp.entreprise}</strong> | {exp.poste[lang]} | {exp.periode}
                </div>
              ))}
              <p style={{color: '#666', textAlign: 'center', marginTop: '10px'}}>
                ... ({atsResumeData.realisations.length} réalisations · {atsResumeData.experience.length} expériences · {atsResumeData.certifications.length} certifications) ...
              </p>
            </PreviewBox>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', opacity: 0.8 }}>Langue :</span>
              <Button $primary={lang === 'fr'} onClick={() => setLang('fr')}>🇫🇷 FR</Button>
              <Button $primary={lang === 'en'} onClick={() => setLang('en')}>🇬🇧 EN</Button>
            </div>
            <ButtonGroup>
              <Button $primary onClick={() => generateAtsPdf(lang)}>Télécharger PDF</Button>
              <Button $primary onClick={() => generateAtsDocx(lang)}>Télécharger DOCX</Button>
              <Button onClick={handleRegenerate}>Régénérer</Button>
              <Button onClick={onClose} style={{ marginLeft: 'auto', border: 'none' }}>Fermer</Button>
            </ButtonGroup>
          </>
        )}
      </ModalContent>
    </Overlay>
  );
}

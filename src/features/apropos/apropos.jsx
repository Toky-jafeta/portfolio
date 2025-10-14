import styled from "styled-components";
import LinkedinLogo from "../../assets/logo/linkedin.png";
import ResumPDF from "../../assets/cv/Cv_Rasolomanitra.pdf";
import DownloadLogo from "../../assets/logo/download.png";
import gitLogo from "../../assets/logo/git.png";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CompetencePrincipale } from "../../datas/competences";
import { Outils } from "../../datas/outils";
import formationsData from "../../datas/formations.json";
import certificationsData from "../../datas/certifications.json";

const AproposContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 10vh);
  background: linear-gradient(135deg, #f0f4f8, #e8eef6);
  padding: 5% 10%;
  box-sizing: border-box;
  @media (max-width: 900px) {
    padding: 5% 5%;
  }
`;

const SectionHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 40px;

  h1 {
    font-family: "Poppins", sans-serif;
    font-size: 3rem;
    color: #008080;
    margin: 0;
  }

  p {
    font-family: "Quicksand", sans-serif;
    font-size: 1.1rem;
    color: #333;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px;

  a {
    display: flex;
    align-items: center;
    gap: 5px;
    text-decoration: none;
    font-family: "Quicksand-Bold", sans-serif;
    font-size: 0.95rem;
    color: #0072b1;
    border: 2px solid #0072b1;
    padding: 8px 15px;
    border-radius: 50px;
    transition: all 0.3s ease;

    img {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background-color: #0072b1;
      color: white;
      transform: scale(1.05);
    }
  }
`;

const DescriptionCard = styled(motion.div)`
  background-color: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
`;

const TableWrapper = styled(motion.div)`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 40px;

  table {
    width: 100%;
    border-collapse: collapse;
    font-family: "Quicksand", sans-serif;

    caption {
      font-weight: bold;
      font-size: 1.2rem;
      margin-bottom: 10px;
      text-align: left;
      color: #008080;
    }

    td {
      border: 1px solid #ddd;
      padding: 12px 15px;
      text-align: center;
      color: #444;
    }

    tr:nth-child(even) {
      background-color: #f7f7f7;
    }
  }
`;

const AnimatedPrompt = styled(motion.pre)`
  background-color: #1e1e2f;
  color: #00ff00;
  font-family: "Courier New", monospace;
  padding: 20px;
  border-radius: 15px;
  overflow-x: auto;
  margin-top: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

const InfoCard = styled(motion.div)`
  background-color: #ffffff;
  border-left: 6px solid #008080;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  h3 {
    color: #008080;
    font-family: "Poppins", sans-serif;
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  p {
    font-family: "Quicksand", sans-serif;
    color: #444;
    margin: 5px 0;
  }
`;

const InfoCardCertif = styled(InfoCard)`
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    border-radius: 8px;
    margin-top: 10px;
    cursor: pointer;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  max-width: 90%;
  max-height: 90%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 12px;
  }
`;

function Apropos() {
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [promptText, setPromptText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const descriptionText =
      "Spécialiste en systèmes et réseaux et développement web. Basé à Antananarivo, Madagascar.";
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(descriptionText.substring(0, index));
      index++;
      if (index > descriptionText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const text =
      "Nom:~$ Rasolomanitra\nPrénom:~$ Toky Jafeta\nDate de Naissance:~$ 15 Janvier 1994\nLieu de Naissance:~$ HJRA Antananarivo\nAdresse:~$ Lot FVF 03A Firavahana Fenoarivo\nVille:~$ Antananarivo\nPays:~$ Madagascar";

    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
      setPromptText(text.substring(0, currentIndex) + (cursorVisible ? "_" : ""));
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, cursorVisible]);

  const renderPromptText = () =>
    promptText.split("\n").map((line, index) => (
      <span key={index}>
        {line.split(":").map((part, i) =>
          i === 0 ? (
            <GreenSpan key={i}>{part}</GreenSpan>
          ) : (
            <BlueSpan key={i}>:{part}</BlueSpan>
          )
        )}
        <br />
      </span>
    ));

  const numberOfRows = Math.ceil(CompetencePrincipale.length / 5);
  let tableRows = [];
  for (let i = 0; i < numberOfRows; i++) {
    let cells = [];
    for (let j = 0; j < 5; j++) {
      const index = i * 5 + j;
      cells.push(<td key={index}>{CompetencePrincipale[index] || ""}</td>);
    }
    tableRows.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <AproposContainer>
      <SectionHeader
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>À propos de moi</h1>
        <p>
          {typedText}
          <span>{cursorVisible && "|"}</span>
        </p>
        <SocialLinks>
          <a href="https://www.linkedin.com/in/toky-rasolomanitra-121896220/">
            <img src={LinkedinLogo} alt="linkedin" /> LinkedIn
          </a>
          <a href="https://github.com/Toky-jafeta">
            <img src={gitLogo} alt="github" /> GitHub
          </a>
          <a href={ResumPDF} download>
            <img src={DownloadLogo} alt="download" /> CV
          </a>
        </SocialLinks>
      </SectionHeader>

      <DescriptionCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <AnimatedPrompt>{renderPromptText()}</AnimatedPrompt>
      </DescriptionCard>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ color: "#008080", marginBottom: "15px" }}
      >
        Formations
      </motion.h2>
      <CardGrid>
        {formationsData.map((f, i) => (
          <InfoCard key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3>{f.titre}</h3>
            <p><strong>Établissement :</strong> {f.ecole}</p>
            <p><strong>Année :</strong> {f.annee}</p>
            <p><strong>Détails :</strong> {f.description}</p>
          </InfoCard>
        ))}
      </CardGrid>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ color: "#008080", marginBottom: "15px" }}
      >
        Certifications
      </motion.h2>
      <CardGrid>
        {certificationsData.map((c, i) => (
          <InfoCardCertif key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3>{c.nom}</h3>
            <p><strong>Organisation :</strong> {c.organisme}</p>
            <p><strong>Année :</strong> {c.annee}</p>
            <p><strong>ID :</strong> {c.id || "N/A"}</p>
            {c.image && (
              <img
                src={c.image}
                alt={c.nom}
                onClick={() => setModalImage(c.image)}
              />
            )}
          </InfoCardCertif>
        ))}
      </CardGrid>

      {modalImage && (
        <ModalOverlay onClick={() => setModalImage(null)}>
          <ModalContent>
            <img src={modalImage} alt="agrandi" />
          </ModalContent>
        </ModalOverlay>
      )}

      <TableWrapper>
        <table>
          <caption>Compétences principales</caption>
          <tbody>{tableRows}</tbody>
        </table>
      </TableWrapper>

      <TableWrapper>
        <table>
          <caption>Outils / Années</caption>
          <tbody>
            {Array.from({ length: Math.ceil(Outils.length / 5) }, (row, rowIndex) => (
              <tr key={rowIndex}>
                {Outils.slice(rowIndex * 5, rowIndex * 5 + 5).map((outils, index) => (
                  <td key={index}>
                    {outils.tecno}/{outils.annees}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </AproposContainer>
  );
}

const GreenSpan = styled.span`
  color: #00ff00;
`;
const BlueSpan = styled.span`
  color: #00bfff;
`;

export default Apropos;

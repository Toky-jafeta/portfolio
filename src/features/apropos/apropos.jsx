import styled from "styled-components";
import LinkedinLogo from "../../assets/logo/linkedin.png";
import ResumPDF from "../../assets/cv/Cv_Rasolomanitra.pdf";
import DownloadLogo from "../../assets/logo/download.png";
import gitLogo from "../../assets/logo/git.png";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CompetencePrincipale } from "../../datas/competences";
import { Outils } from "../../datas/outils";

const AproposContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 10vh); /* header fixe */
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
    font-family: 'Poppins', sans-serif;
    font-size: 3rem;
    color: #008080;
    margin: 0;
  }

  p {
    font-family: 'Quicksand', sans-serif;
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
    font-family: 'Quicksand-Bold', sans-serif;
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
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-bottom: 40px;
`;

const TableWrapper = styled(motion.div)`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 40px;

  table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Quicksand', sans-serif;

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
  font-family: 'Courier New', monospace;
  padding: 20px;
  border-radius: 15px;
  overflow-x: auto;
  margin-top: 25px;
`;

function Apropos() {
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [promptText, setPromptText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Effet pour description
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

  // Effet pour prompt
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
      cells.push(
        <td key={index}>{CompetencePrincipale[index] || ""}</td>
      );
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
        <p>{typedText}<span>{cursorVisible && "|"}</span></p>
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

      <TableWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <table>
          <caption>Compétences principales</caption>
          <tbody>{tableRows}</tbody>
        </table>
      </TableWrapper>

      <TableWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <table>
          <caption>Outils / Années</caption>
          <tbody>
            {Array.from({ length: Math.ceil(Outils.length / 5) }, (row, rowIndex) => (
              <tr key={rowIndex}>
                {Outils.slice(rowIndex * 5, rowIndex * 5 + 5).map((outils, index) => (
                  <td key={index}>{outils.tecno}/{outils.annees}</td>
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

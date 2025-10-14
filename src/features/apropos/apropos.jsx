import styled from "styled-components";
import LinkedinLogo from "../../assets/logo/linkedin.png";
import ResumPDF from "../../assets/cv/Cv_Rasolomanitra.pdf";
import DownloadLogo from "../../assets/logo/download.png";
import gitLogo from "../../assets/logo/git.png";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CompetencesTechniques } from "../../datas/competences.js";
import { OutilsTechniques } from "../../datas/outils";
import { GestionProjet } from "../../datas/gestionProjet";
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

const GreenSpan = styled.span`
  color: #00ff00;
`;
const BlueSpan = styled.span`
  color: #00bfff;
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

const CompetenceGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin: 50px 0;
`;

const CompetenceCard = styled(motion.div)`
  background: linear-gradient(145deg, #ffffff, #f2f8f9);
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0, 128, 128, 0.1);
  padding: 25px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 30px rgba(0, 128, 128, 0.2);
  }

  h3 {
    color: #008080;
    font-family: "Poppins", sans-serif;
    font-size: 1.4rem;
    margin-bottom: 15px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      font-family: "Quicksand", sans-serif;
      color: #333;
      margin-bottom: 8px;
      display: flex;
      align-items: flex-start;
      gap: 8px;

      &::before {
        content: "🔹";
        color: #00a6a6;
        font-size: 1rem;
      }
    }
  }
`;

const StyledToolsTable = styled(motion.table)`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 128, 128, 0.1);
  font-family: "Quicksand", sans-serif;

  thead {
    background: linear-gradient(90deg, #008080, #00a6a6);
    color: white;
    text-align: left;

    th {
      padding: 15px 20px;
      font-size: 1.1rem;
      letter-spacing: 0.5px;
    }
  }

  tbody {
    tr {
      transition: all 0.3s ease;
      &:nth-child(even) {
        background-color: #f9fafa;
      }
      &:hover {
        background-color: #e8f7f7;
        transform: scale(1.01);
      }
    }

    td {
      padding: 15px 20px;
      color: #333;
      vertical-align: top;
    }

    td:first-child {
      font-weight: bold;
      color: #008080;
      width: 22%;
    }

    ul {
      list-style: none;
      padding-left: 0;

      li {
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 8px;

        &::before {
          content: "▹";
          color: #00a6a6;
          font-size: 1rem;
        }
      }
    }
  }
`;

const TimelineContainer = styled(motion.div)`
  position: relative;
  padding-left: 40px;
  border-left: 3px solid #008080;

  @media (max-width: 600px) {
    padding-left: 25px;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 30px;
  padding-left: 20px;

  &::before {
    content: "";
    position: absolute;
    left: -12px;
    top: 8px;
    width: 15px;
    height: 15px;
    background: radial-gradient(circle, #00a6a6 0%, #008080 80%);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 128, 128, 0.4);
  }

  p {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 15px 20px;
    box-shadow: 0 8px 25px rgba(0, 128, 128, 0.08);
    color: #333;
    font-family: "Quicksand", sans-serif;
    line-height: 1.5;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(0, 128, 128, 0.15);
    }
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

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ color: "#008080", marginBottom: "15px" }}
      >
        Compétences Techniques Principales
      </motion.h2>

      <CompetenceGrid>
        {CompetencesTechniques.map((cat, index) => (
          <CompetenceCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
          >
            <h3>{cat.categorie}</h3>
            <ul>
              {cat.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CompetenceCard>
        ))}
      </CompetenceGrid>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ color: "#008080", marginBottom: "15px" }}
      >
        Outils & Technologies
      </motion.h2>

      <StyledToolsTable
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <thead>
          <tr>
            <th>Domaine</th>
            <th>Outils / Technologies</th>
          </tr>
        </thead>
        <tbody>
          {OutilsTechniques.map((row, index) => (
            <tr key={index}>
              <td>{row.domaine}</td>
              <td>
                <ul>
                  {row.outils.map((outil, i) => (
                    <li key={i}>{outil}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledToolsTable>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ color: "#008080", marginBottom: "15px" }}
      >
        Gestion de Projet et Rédaction Technique
      </motion.h2>

      <TimelineContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {GestionProjet.map((point, i) => (
          <TimelineItem
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <p>{point}</p>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </AproposContainer>
  );
}


export default Apropos;

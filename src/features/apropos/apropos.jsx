import styled from "styled-components"
import LinkedinLogo from "../../assets/logo/linkedin.png"
import ResumPDF from "../../assets/cv/Cv_Rasolomanitra.pdf"
import DownloadLogo from "../../assets/logo/download.png"
import gitLogo from "../../assets/logo/git.png"
import React, { useState, useEffect } from "react";
import { CompetencePrincipale } from "../../datas/competences"
import { Outils } from "../../datas/outils"

const AproposContainer = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    background-color:#eeeeee;
    overflow-y: hidden
`

const SectionAbout = styled.section`
  margin-left: 20%;
  margin-right: 3%;
  padding: 20px;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 10px;
    border: 2px solid #3498db;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #3498db;
      border-radius: 10px;
    }
  }
`

const SectionAboutTytle = styled.h1`
  font-size: 60px;
  font-family: 'Quicksand-Bold', sans-serif;
`

const SectionAboutIntro = styled.div`

`

const SectionPresentation = styled.div`
`

const SectionPresentationLi = styled.li`
`

const SectionPresentationLiSpan = styled.span`
`

const SectionAboutIntroParagraph = styled.p`
    display: flex;
    align-items: center;
    font-family: 'Quicksand-Bold', sans-serif;
`

const DownloadCv = styled.a`
    display: flex;
    border: solid #0072b1;
    color: white;
    border-radius: 100px;
    align-items: center;
    margin-left: 10px;
    padding-left: 10px;
    height: 2em;
    text-decoration: None;
    background-color: #0072b1;
`

const AboutTable = styled.table`
    width: 100%;
    margin-bottom: 20px;
    font-family: 'Quicksand-Bold', sans-serif;
`

const LinkedinImage = styled.img`
    max-width: 100%;
    max-height: 3em;
    margin-right: 10px;
`
const AboutImage = styled.img`
    max-width: 50%;
    max-height: 2em;
    margin-right: 10px;
`

const SectionDescription = styled.p`
  color: #0072b1;
  font-family: 'Orbitron', sans-serif;
`

const SectionExperience = styled.p`
  color: grey;
  font-family: 'Quicksand-SemiBold', sans-serif;
`

const LineGradient = styled.div`
    position: absolute;
    top: 10vh;
    left: 18%;
    width: 2px;
    height: 80vh;
    background: linear-gradient(to bottom, #ffffff 0%, #000000 50%, #ffffff 100%, #000000 100%);
`
const SectionPrompt = styled.div`
  font-family: 'Quicksand-Bold', sans-serif;
  height: 20vh;
  padding-left: 20px;
  color: white;
  background-color: #8B008B
`

const GreenSpan = styled.span`
  color: #00FF00;
`

const BlueSpan = styled.span`
  color: blue;
`

function Apropos(){
    const [typedText, setTypedText] = useState("")
    const [cursorVisible, setCursorVisible] = useState(true);
    const [promptText, setPromptText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const text = "Nom:~$ Rasolomanitra\nPrénom:~$ Toky Jafeta\nDate de Naissance:~$ 15 Janvier 1994\nLieu de Naissance:~$ HJRA Antananarivo\nAdresse:~$ Lot FVF 03A Firavahana Fenoarivo\nVille:~$ Antananarivo\nPays:~$ Madagascar";
  
      const interval = setInterval(() => {
        setCursorVisible((prev) => !prev);
        setPromptText(text.substring(0, currentIndex) + (cursorVisible ? "_" : ""));
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100);
  
      return () => clearInterval(interval);
    }, [currentIndex, cursorVisible]);
  
    const renderPromptText = () => {
      return promptText.split('\n').map((line, index) => (
        <span key={index}>
          {line.split(':').map((part, i) => (
            i === 0 ? <GreenSpan key={i}>{part}</GreenSpan> : <BlueSpan key={i}>:{part}</BlueSpan>
          ))}
          <br />
        </span>
      ));
    }
    const numberOfRows = Math.ceil(CompetencePrincipale.length / 5);

    let tableRows = [];
    for (let i = 0; i < numberOfRows; i++) {
      let cells = [];
      for (let j = 0; j < 5; j++) {
        const index = i * 5 + j;
        if (index < CompetencePrincipale.length) {
          cells.push(<td key={index}>{CompetencePrincipale[index]}</td>);
        } else {
          cells.push(<td key={index}></td>);
        }
      }
      tableRows.push(<tr key={i}>{cells}</tr>);
    }


    useEffect(() => {
        const cursorIntervalId = setInterval(() => {
          setCursorVisible((prev) => !prev);
        }, 600)
      
        return () => clearInterval(cursorIntervalId);
      }, []);
    useEffect(() => {
        const descriptionText = "Je suis un spécialiste en systèmes et réseaux ainsi qu'en développement web. Résidant à Madagascar, basé à Antananarivo.";
        let currentIndex = 0;
      
        const intervalId = setInterval(() => {
          setTypedText(descriptionText.substring(0, currentIndex));
          currentIndex++;
      
          if (currentIndex > descriptionText.length) {
            clearInterval(intervalId);
          }
        }, 50);
      
        return () => clearInterval(intervalId);
      }, []);
    return (
        <AproposContainer>
            <SectionAbout>
                <LineGradient />
                <SectionAboutTytle>about()</SectionAboutTytle>
                <SectionAboutIntro>
                    <SectionAboutIntroParagraph>
                        <a href="https://www.linkedin.com/in/toky-rasolomanitra-121896220/">
                            <LinkedinImage  src={LinkedinLogo} alt="linkedin-logo" />
                        </a>
                        <a href="https://github.com/Toky-jafeta">
                            <LinkedinImage  src={gitLogo} alt="git-logo" />
                        </a>
                        télécharger mon
                        <DownloadCv href={ResumPDF}>resumé <AboutImage  src={DownloadLogo} alt="download-logo" /></DownloadCv>
                    </SectionAboutIntroParagraph>
                    <SectionDescription>
                        {typedText}
                        {cursorVisible && <span>|</span>}
                    </SectionDescription>
                    <SectionExperience>\\ + de 100ans d'experience</SectionExperience>
                    <SectionPrompt>{renderPromptText()}</SectionPrompt>
                    <AboutTable>
                        <caption>Compétence principale</caption>
                        <tbody>
                          {
                            tableRows
                          }
                        </tbody>
                    </AboutTable>
                    <AboutTable>
                      <caption>Outils/Année</caption>
                      <tbody>
                          {Array.from({ length: Math.ceil(Outils.length / 5) }, (row, rowIndex) => (
                              <tr key={rowIndex}>
                                  {Outils.slice(rowIndex * 5, rowIndex * 5 + 5).map((outils, index) => (
                                      <td key={index}>{outils.tecno}/{outils.annees}</td>
                                  ))}
                              </tr>
                          ))}
                      </tbody>
                  </AboutTable>
                </SectionAboutIntro>
            </SectionAbout>
        </AproposContainer>
    )
}

export default Apropos
import styled from "styled-components";
import { Link } from "react-router-dom";
import profil from "../../assets/img/profil.jpg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DivSection = styled.section`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 10vh);
  background: linear-gradient(135deg, #e0f7fa, #ede7f6);
  overflow: hidden;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    min-height: auto;
  }
`;

const HomeSectionDescription = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5% 8%;
  color: #222;

  @media (max-width: 900px) {
    padding: 2% 5%; /* réduit le padding sur mobile */
  }
`;

const HomeSectionImage = styled(motion.div)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  @media (max-width: 900px) {
    padding-top: 0;    /* supprime le padding supérieur */
  }
`;

const ImgContainer = styled.div`
  width: 65%;
  max-width: 450px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-out;
`;

const HomeSectionImageImage = styled.img`
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
  transform: scale(1.05);
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 900px) {
    max-width: 300px;
    margin-top: 0;
  }
`;

const HomeSectionDescriptionTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 3.5rem;
  margin-bottom: 10px;
  color: #111;
`;

const HomeSectionDescriptionSecondTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #008080;
`;

const HomeSectionDescriptionDescription = styled.p`
  font-family: 'Quicksand', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  text-align: justify;
`;

const HomeSectionDescriptionLinks = styled.div`
  margin-top: 35px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 900px) {
    flex-direction: column; /* force les boutons à se mettre en colonne */
    align-items: center;    /* centre les boutons */
  }
`;

const HomeSectionDescriptionLink = styled(Link)`
  background: transparent;
  color: #008080;
  border: 2px solid #008080;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  padding: 12px 25px;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    background: #008080;
    color: white;
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 128, 128, 0.5);
  }
`;

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateImageTransform = () => {
    const xOffset = (mousePosition.x / window.innerWidth - 0.5) * 20;
    const yOffset = (mousePosition.y / window.innerHeight - 0.5) * 20;
    return `translate(${xOffset}px, ${yOffset}px)`;
  };

  return (
    <DivSection>
      <HomeSectionDescription
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <HomeSectionDescriptionTitle>Hello 👋</HomeSectionDescriptionTitle>
        <HomeSectionDescriptionSecondTitle>
          Je suis Rasolomanitra Toky Jafeta
        </HomeSectionDescriptionSecondTitle>
        <HomeSectionDescriptionDescription>
          Spécialiste en <strong>réseaux, systèmes</strong> et{" "}
          <strong>développement web</strong>, je conçois des solutions fiables et modernes.
          <br />
          Bienvenue sur mon portfolio — découvrez mes réalisations et compétences.
        </HomeSectionDescriptionDescription>
        <HomeSectionDescriptionLinks>
          <HomeSectionDescriptionLink to="/experiences">
            Mes expériences
          </HomeSectionDescriptionLink>
          <HomeSectionDescriptionLink to="/services">
            Mes services
          </HomeSectionDescriptionLink>
        </HomeSectionDescriptionLinks>
      </HomeSectionDescription>

      <HomeSectionImage
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <ImgContainer style={{ transform: calculateImageTransform() }}>
          <HomeSectionImageImage src={profil} alt="Profil" />
        </ImgContainer>
      </HomeSectionImage>
    </DivSection>
  );
}

export default Home;

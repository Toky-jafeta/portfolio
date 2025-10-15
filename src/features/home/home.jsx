import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import profil from "../../assets/img/profil.jpg";

const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.6); }
  100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
`;

const DivSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: calc(100vh - 10vh);
  background: linear-gradient(135deg, #f0f4f8, #e8eef6);
  color: #f0f0f0;
  overflow: hidden;
  padding: 0 5%;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    text-align: center;
    padding: 8% 5%;
  }
`;

const HomeSectionDescription = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
`;

const HomeSectionImage = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ImgContainer = styled.div`
  width: 65%;
  max-width: 420px;
  border-radius: 50%;
  overflow: hidden;
  animation: ${glow} 4s ease-in-out infinite;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 900px) {
    max-width: 300px;
  }
`;

const HomeSectionImageImage = styled.img`
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const HomeSectionDescriptionTitle = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 3.2rem;
  font-weight: 700;
  color: #008080;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.4);

  @media (max-width: 900px) {
    font-size: 2.2rem;
  }
`;

const HomeSectionDescriptionSecondTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 1.8rem;
  color: #1e90ff;
  font-weight: 500;
`;

const HomeSectionDescriptionDescription = styled.p`
  font-family: "Quicksand", sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
  max-width: 600px;

  @media (max-width: 900px) {
    max-width: 90%;
    margin: 0 auto;
  }
`;

const HomeSectionDescriptionLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 25px;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const ButtonLink = styled(Link)`
  background: transparent;
  color: #008080;
  border: 2px solid #008080;
  padding: 12px 28px;
  border-radius: 50px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  text-decoration: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &:hover {
    background: #008080;
    color: white;
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.6);
  }
`;

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateImageTransform = () => {
    const xOffset = (mousePosition.x / window.innerWidth - 0.5) * 15;
    const yOffset = (mousePosition.y / window.innerHeight - 0.5) * 15;
    return `translate(${xOffset}px, ${yOffset}px)`;
  };

  return (
    <DivSection>
      <HomeSectionDescription
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <HomeSectionDescriptionTitle>
          Hello, je suis Toky 👋
        </HomeSectionDescriptionTitle>
        <HomeSectionDescriptionSecondTitle>
          Ingénieur Systèmes, Réseaux & Cybersécurité
        </HomeSectionDescriptionSecondTitle>
        <HomeSectionDescriptionDescription>
          Passionné par la <strong>sécurité informatique</strong>, le{" "}
          <strong>développement Python</strong> et les{" "}
          <strong>architectures réseau modernes</strong>, j’aide les entreprises
          à innover tout en renforçant leur résilience numérique.
          <br />
          Découvrez mes projets, mes services et ma vision pour un numérique
          plus sûr et plus intelligent.
        </HomeSectionDescriptionDescription>

        <HomeSectionDescriptionLinks>
          <ButtonLink to="/experiences">Mes Expériences</ButtonLink>
          <ButtonLink to="/services">Mes Services</ButtonLink>
        </HomeSectionDescriptionLinks>
      </HomeSectionDescription>

      <HomeSectionImage
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <ImgContainer style={{ transform: calculateImageTransform() }}>
          <HomeSectionImageImage src={profil} alt="Profil Toky Rasolomanitra" />
        </ImgContainer>
      </HomeSectionImage>
    </DivSection>
  );
}

export default Home;

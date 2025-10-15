import styled from "styled-components";
import { motion } from "framer-motion";

const ExperienceItemWrapper = styled(motion.div)`
  position: relative;
  width: 45%;
  padding: 25px;
  margin: 30px 0;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 2;

  align-self: ${({ position }) => (position === "left" ? "flex-start" : "flex-end")};

  &::before {
    content: "";
    position: absolute;
    top: 20px;
    ${({ position }) => (position === "left" ? "right: -15px;" : "left: -15px;")}
    width: 15px;
    height: 15px;
    background-color: #0072b1;
    border: 3px solid #00bfff;
    border-radius: 50%;
    z-index: 3;
  }

  @media (max-width: 900px) {
    width: 90%;
    align-self: center;

    &::before {
      left: 50%;
      right: auto;
      transform: translateX(-50%);
    }
  }
`;

const Title = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #008080;
`;

const Detail = styled.p`
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;

  span {
    font-weight: 600;
    color: #0072b1;
  }
`;

function ExperienceItem({ position, lieu, entreprise, poste, description_court, periode }) {
  return (
    <ExperienceItemWrapper
      position={position}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <Title>{poste}</Title>
      <Detail><span>Période:</span> {periode}</Detail>
      <Detail><span>Lieu:</span> {lieu}</Detail>
      <Detail><span>Entreprise:</span> <b>{entreprise}</b></Detail>
      <Detail><span>Description:</span> {description_court}</Detail>
    </ExperienceItemWrapper>
  );
}

export default ExperienceItem;

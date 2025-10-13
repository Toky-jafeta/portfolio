import { ExperienceList } from "../../datas/experienceList";
import ExperienceItem from "../../common/component/ExperienceItem";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(-10px); opacity: 0.7; }
  100% { transform: translateY(0); opacity: 1; }
`;

const ExperiencesSection = styled.section`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px 20px; /* plus de top padding pour flèche */
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f9fc;

  &::before {
    content: "";
    position: absolute;
    top: 40px; /* espace pour la flèche */
    bottom: 0;
    left: 50%;
    width: 6px;
    background: linear-gradient(to bottom, #0072b1, #00bfff);
    transform: translateX(-50%);
    border-radius: 3px;
    z-index: 1;
  }
`;

const ChronoArrow = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 25px solid #0072b1;
  z-index: 2;
  animation: ${pulse} 1.2s infinite;
`;

function Experiences() {
  return (
    <ExperiencesSection>
      <ChronoArrow />
      {ExperienceList.map(({ id, lieu, entreprise, poste, description_court, periode }, index) => (
        <ExperienceItem
          key={id}
          position={index % 2 === 0 ? "left" : "right"}
          lieu={lieu}
          periode={periode}
          entreprise={entreprise}
          poste={poste}
          description_court={description_court}
        />
      ))}
    </ExperiencesSection>
  );
}

export default Experiences;

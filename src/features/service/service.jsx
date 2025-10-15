import { ServiceList } from "../../datas/servicesList";
import styled, { keyframes } from "styled-components";
import { useState } from "react";


const zoomIn = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const ServiceContainer = styled.section`
  background: linear-gradient(135deg, #f0f4f8 0%, #e0f7f7 100%);
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ServicesGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  padding: 0;
  list-style: none;
`;

const ServiceCard = styled.li`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0,0,0,0.15);
  }
`;

const ServiceTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  color: #008080;
  margin-bottom: 15px;
`;

const ServiceDesc = styled.p`
  color: #555;
  flex-grow: 1;
  line-height: 1.6;
`;

const ReadMore = styled.button`
  margin-top: 20px;
  background: transparent;
  border: 1px solid #008080;
  color: #008080;
  padding: 6px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 128, 128, 0.1);
    transform: scale(1.02);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 8vh;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 650px;
  width: 90%;
  animation: ${zoomIn} 0.4s ease-in-out;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #008080;
`;

function Services() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  return (
    <ServiceContainer>
      <h1 style={{ fontFamily: "'Poppins', sans-serif", color: "#008080", marginBottom: "50px" }}>
        MES SERVICES
      </h1>
      <ServicesGrid>
        {ServiceList.map(({ id, name, description }) => (
          <ServiceCard key={id} onClick={() => handleServiceClick({ id, name, description })}>
            <ServiceTitle>{name}</ServiceTitle>
            <ServiceDesc>{description.substring(0, 80)}...</ServiceDesc>
            <ReadMore>Lire plus</ReadMore>
          </ServiceCard>
        ))}
      </ServicesGrid>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
            <h2 style={{ color: "#008080", marginBottom: "20px" }}>{selectedService.name}</h2>
            <p style={{ color: "#444", lineHeight: "1.6" }}>{selectedService.description}</p>
          </ModalContent>
        </ModalOverlay>
      )}
    </ServiceContainer>
  );
}

export default Services;

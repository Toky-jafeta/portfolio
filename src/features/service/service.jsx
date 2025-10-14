import { ServiceList } from "../../datas/servicesList";
import ServiceItem from "../../common/component/ServiceItem";
import styled, { keyframes } from "styled-components";
import { useState } from "react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ServiceContainer = styled.section`
  background-color: #f0f4f8;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ServicesGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  padding: 0;
  list-style: none;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10vh;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  position: relative;
  animation: ${fadeIn} 0.3s ease-in-out;
`;


const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #008080;
  z-index: 10000;
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
      <h1 style={{ fontFamily: "'Poppins', sans-serif", color: "#008080", marginBottom: "40px" }}>
        Mes Services
      </h1>
      <ServicesGrid>
        {ServiceList.map(({ id, name, description }) => (
          <ServiceItem
            key={id}
            id={id}
            name={name}
            description={description}
            onClick={() => handleServiceClick({ id, name, description })}
          />
        ))}
      </ServicesGrid>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton
                onClick={() => setShowModal(false)}
                style={{ zIndex: 1001, position: "absolute", top: "15px", right: "25px" }}
                >
                &times;
                </CloseButton>
                <h2 style={{ color: "#008080" }}>{selectedService.name}</h2>
                <p style={{ lineHeight: "1.6", color: "#444" }}>{selectedService.description}</p>
            </ModalContent>
            </ModalOverlay>
      )}
    </ServiceContainer>
  );
}

export default Services;

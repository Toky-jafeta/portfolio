import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import MailIcon from "../../assets/img/mail.png";
import PhoneIcon from "../../assets/img/phone.jpg";
import LocationIcon from "../../assets/img/location.png";
import SendIcon from "../../assets/img/send.png";

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// --- Styled Components ---
const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f0f4f8, #e8eef6);
  min-height: 100vh;
  padding: 6% 10%;
  font-family: "Quicksand", sans-serif;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 10% 6%;
  }
`;

const SectionTitle = styled(motion.h1)`
  color: #008080;
  font-family: "Poppins", sans-serif;
  font-size: 2.8rem;
  margin-bottom: 15px;
`;

const SectionSubtitle = styled(motion.p)`
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 50px;
  max-width: 700px;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  border-radius: 15px;
  padding: 18px 20px;
  box-shadow: 0 8px 25px rgba(0, 128, 128, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 30px rgba(0, 128, 128, 0.2);
  }

  img {
    width: 35px;
    height: 35px;
  }

  div {
    display: flex;
    flex-direction: column;

    h4 {
      font-size: 1rem;
      color: #008080;
      margin: 0;
    }

    p {
      color: #333;
      margin: 0;
      font-size: 0.95rem;
    }
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 128, 128, 0.1);
  animation: ${fadeIn} 0.8s ease forwards;

  input,
  textarea {
    font-family: "Quicksand", sans-serif;
    border: none;
    outline: none;
    padding: 14px 18px;
    border-radius: 10px;
    background-color: #f7f9fa;
    font-size: 1rem;
    transition: all 0.3s ease;
    resize: none;

    &:focus {
      background-color: #ffffff;
      box-shadow: 0 0 0 2px #00bfbf;
    }
  }

  textarea {
    min-height: 120px;
  }

  button {
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(90deg, #008080, #00a6a6);
    border: none;
    color: white;
    padding: 14px 25px;
    border-radius: 50px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: "Poppins", sans-serif;
    min-width: 160px;
    justify-content: center;

    img {
      width: 20px;
      height: 20px;
    }

    &:hover {
      animation: ${pulse} 0.6s ease infinite;
      background: linear-gradient(90deg, #00a6a6, #008080);
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  color: #008080;
  font-weight: bold;
  margin-top: 10px;
`;

const ErrorMessage = styled(motion.div)`
  color: red;
  font-weight: bold;
  margin-top: 10px;
`;

const Loader = styled.div`
  border: 3px solid #e0f7f7;
  border-top: 3px solid #008080;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  animation: ${spin} 1s linear infinite;
`;

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    emailjs
      .sendForm(
        "service_2f0t0gp",
        "template_4dxnzka",
        formRef.current,
        "eJUU_ODe3Re7ujzWD"
      )
      .then(
        () => {
          setSuccess(true);
          formRef.current.reset();
          setTimeout(() => setSuccess(false), 4000);
        },
        (err) => {
          console.error("Erreur EmailJS:", err);
          setError(true);
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <ContactContainer>
      <SectionTitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Contact
      </SectionTitle>

      <SectionSubtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Une question, une collaboration ou un projet à me confier ?  
        N’hésitez pas à m’envoyer un message — je vous répondrai rapidement.
      </SectionSubtitle>

      <ContactGrid>
        <ContactInfo
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <InfoItem>
            <img src={MailIcon} alt="email" />
            <div>
              <h4>Email</h4>
              <p>trasolomanitra@gmail.com</p>
            </div>
          </InfoItem>

          <InfoItem>
            <img src={PhoneIcon} alt="phone" />
            <div>
              <h4>Téléphone</h4>
              <p>+261 38 90 016 79</p>
            </div>
          </InfoItem>

          <InfoItem>
            <img src={LocationIcon} alt="location" />
            <div>
              <h4>Localisation</h4>
              <p>Antananarivo, Madagascar</p>
            </div>
          </InfoItem>
        </ContactInfo>

        <ContactForm
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <input type="text" name="from_name" placeholder="Votre nom" required />
          <input type="email" name="from_email" placeholder="Votre adresse email" required />
          <textarea name="message" placeholder="Votre message" required />

          <button type="submit" disabled={loading}>
            {loading ? <Loader /> : <><img src={SendIcon} alt="send" /> Envoyer</>}
          </button>

          {success && (
            <SuccessMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ✅ Message envoyé avec succès !
            </SuccessMessage>
          )}

          {error && (
            <ErrorMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ❌ Une erreur est survenue. Réessayez plus tard.
            </ErrorMessage>
          )}
        </ContactForm>
      </ContactGrid>
    </ContactContainer>
  );
};

export default Contact;
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useInView } from '../../common/hooks/useInView';
import emailjs from '@emailjs/browser';
import MailIcon from '../../assets/img/mail.png';
import PhoneIcon from '../../assets/img/phone.jpg';
import LocationIcon from '../../assets/img/location.png';

const Section = styled.section`
  padding: 100px 8%;
  background: var(--bg-primary);
  position: relative;
  @media (max-width: 768px) { padding: 60px 5%; }
`;

const Header = styled.div`
  margin-bottom: 50px;
  opacity: ${({ $v }) => $v ? 1 : 0};
  transform: translateY(${({ $v }) => $v ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const Label = styled.span`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent-primary);
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 10px 0 15px;
  @media (max-width: 768px) { font-size: 2rem; }
`;

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 50px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--border-accent);
    transform: translateY(-2px);
  }

  img {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(0.8);
  }
`;

const InfoDetails = styled.div`
  h4 {
    font-family: var(--font-heading);
    font-size: 1rem;
    color: var(--text-primary);
    margin-bottom: 4px;
  }
  p {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
`;

const Form = styled.form`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;

  @media (max-width: 500px) { padding: 24px; }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Input = styled.input`
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.15);
  }
`;

const TextArea = styled.textarea`
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 0.95rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.15);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, var(--accent-primary), #4f46e5);
  color: #0a0e17;
  border: none;
  border-radius: 50px;
  padding: 14px 30px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Status = styled.div`
  margin-top: 10px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: ${({ $success }) => $success ? '#22c55e' : '#ef4444'};
`;

export default function Contact() {
  const [headerRef, headerV] = useInView();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    const form = formRef.current;
    const name = form.from_name.value.trim();
    const email = form.from_email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      setStatus({ type: 'error', msg: 'Veuillez remplir tous les champs.' });
      setLoading(false);
      return;
    }

    emailjs
      .sendForm(
        'service_2f0t0gp',
        'template_4dxnzka',
        form,
        'eJUU_ODe3Re7ujzWD'
      )
      .then(
        () => {
          setStatus({ type: 'success', msg: 'Message envoyé avec succès !' });
          form.reset();
        },
        (err) => {
          console.error('EmailJS Error:', err);
          setStatus({ type: 'error', msg: 'Une erreur est survenue. Veuillez réessayer.' });
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <Section id="contact">
      <Header ref={headerRef} $v={headerV}>
        <Label>{"// Contact"}</Label>
        <Title>Discutons de votre projet</Title>
        <Subtitle>
          Une question, une collaboration ou un projet d'infrastructure à sécuriser ? N'hésitez pas à me contacter.
        </Subtitle>
      </Header>

      <Grid>
        <InfoCol>
          <InfoCard>
            <img src={MailIcon} alt="Email" />
            <InfoDetails>
              <h4>Email</h4>
              <p>contact@innovasec.io</p>
            </InfoDetails>
          </InfoCard>

          <InfoCard>
            <img src={PhoneIcon} alt="Téléphone" />
            <InfoDetails>
              <h4>Téléphone</h4>
              <p>+261 38 90 016 79</p>
            </InfoDetails>
          </InfoCard>

          <InfoCard>
            <img src={LocationIcon} alt="Localisation" />
            <InfoDetails>
              <h4>Localisation</h4>
              <p>Antananarivo, Madagascar</p>
            </InfoDetails>
          </InfoCard>
        </InfoCol>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormGroup>
            <InputLabel htmlFor="from_name">Votre nom</InputLabel>
            <Input id="from_name" type="text" name="from_name" placeholder="John Doe" required />
          </FormGroup>

          <FormGroup>
            <InputLabel htmlFor="from_email">Adresse email</InputLabel>
            <Input id="from_email" type="email" name="from_email" placeholder="john@example.com" required />
          </FormGroup>

          <FormGroup>
            <InputLabel htmlFor="message">Message</InputLabel>
            <TextArea id="message" name="message" placeholder="Votre message..." required />
          </FormGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Envoi en cours...' : 'Envoyer le message'}
          </Button>

          {status.msg && (
            <Status $success={status.type === 'success'}>
              {status.type === 'success' ? '✓ ' : '✗ '}
              {status.msg}
            </Status>
          )}
        </Form>
      </Grid>
    </Section>
  );
}

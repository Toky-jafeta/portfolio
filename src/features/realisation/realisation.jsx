// src/components/Realisations.jsx
import React from "react";
import styled from "styled-components";
import realisationsData from "../../datas/realisationsData";

const Container = styled.section`
  padding: 50px;
  background-color: #f8f9fa;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2b2d42;
  text-align: center;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 25px 30px;
  margin-bottom: 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: baseline;
  margin-bottom: 8px;
`;

const Client = styled.h3`
  font-size: 1.4rem;
  color: #1d3557;
`;

const Periode = styled.span`
  font-size: 0.95rem;
  color: #6c757d;
  font-style: italic;
`;

const Role = styled.p`
  font-size: 1rem;
  color: #0077b6;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Domaine = styled.p`
  color: #0077b6;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #343a40;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const List = styled.ul`
  margin-left: 20px;
  color: #495057;
`;

const ListItem = styled.li`
  margin-bottom: 6px;
  position: relative;

  &::before {
    content: "•";
    color: #0077b6;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

export default function Realisations() {
  return (
    <Container>
      <Title>Mes Réalisations</Title>
      {realisationsData.map((item) => (
        <Card key={item.id}>
          <Header>
            <Client>{item.client}</Client>
            <Periode>{item.periode}</Periode>
          </Header>
          <Role>{item.role}</Role>
          <Domaine>{item.domaine}</Domaine>
          <Description>{item.description}</Description>
          <List>
            {item.taches.map((tache, index) => (
              <ListItem key={index}>{tache}</ListItem>
            ))}
          </List>
        </Card>
      ))}
    </Container>
  );
}

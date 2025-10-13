import styled from "styled-components";

const Card = styled.li`
  background: #ffffff;
  border-radius: 20px;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
  border: 2px solid #008080;
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 15px 40px rgba(0,128,128,0.3);
    background-color: #008080;
    color: white;
  }

  h2 {
    margin-bottom: 15px;
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
  }

  p {
    font-family: 'Quicksand', sans-serif;
    font-size: 1rem;
    line-height: 1.5;
  }
`;

function ServiceItem({ id, name, description, onClick }) {
  const truncatedDescription = description.split(' ').slice(0, 35).join(' ') + "...";

  return (
    <Card onClick={onClick}>
      <h2>{name}</h2>
      <p>{truncatedDescription}</p>
    </Card>
  );
}

export default ServiceItem;

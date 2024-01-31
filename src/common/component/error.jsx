import { Link } from "react-router-dom"
import styled from "styled-components"

const NotFoundContainer = styled.section`
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const NotFoundTitle = styled.h1`
    font-size: 36px;
    color: #333;
    margin-bottom: 10px;
`

const NotFoundParagraph = styled.p`
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
`

const NotFoundLink  = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    &:hover{
        background-color: #0056b3;
    }
`

function Error(){
    return (
    <NotFoundContainer>
        <NotFoundTitle>Oops! Page non trouvée</NotFoundTitle>
        <NotFoundParagraph>Désolé, la page que vous recherchez n'existe pas..</NotFoundParagraph>
        <NotFoundLink to="/">Retour à l'accueil</NotFoundLink>
    </NotFoundContainer>
    )
}

export default Error
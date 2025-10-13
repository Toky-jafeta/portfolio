import styled from "styled-components"
import { Link } from "react-router-dom"
import profil from '../../assets/img/profil.jpg'
import { useEffect, useState } from "react"

const DivSection = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    background-color:#eeeeee;
`
const HomeSectionDescription = styled.section`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5%;
`
const HomeSectionDescriptionLinks = styled.p`
    margin-top: 20px;
`
const HomeSectionDescriptionLink = styled(Link)`
    border: solid grey;
    font-family: 'Quicksand-SemiBold', sans-serif;
    text-decoration: None;
    padding:10px;
    margin-right: 30px;
    border-radius: 20px 20px;
    color:black;
    &:hover{
        background-color:#008080;
        color:white;
        border: solid white;
    }
`
const HomeSectionImage = styled.section`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    padding: 5%;
`

const HomeSectionImageImage = styled.img`
    width: 100%;
    border: solid;

`

const HomeSectionDescriptionTitle = styled.h1`
    font-family: 'Quicksand-Bold', sans-serif;
    font-size: 50px;
    margin-bottom: 0;
`

const HomeSectionDescriptionsecondTitle = styled.h3`
    font-family: 'Quicksand-Bold', sans-serif;
    font-size: 30px;
    margin-bottom: 0;
`
const HomeSectionDescriptionDescription = styled.p`
    font-family: 'Quicksand-SemiBold', sans-serif;
    font-size: 15px;
    text-align: justify;
    color: grey;
`

const ImgContainer = styled.div`
    width: 60%;
`

function Home(){
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const calculateImageTransform = () => {
        const xOffset = (mousePosition.x / window.innerWidth - 0.5) * 25;
        const yOffset = (mousePosition.y / window.innerHeight - 0.5) * 25;
    
        return `translate(${xOffset}px, ${yOffset}px)`;
      };

    return(
        <DivSection>
            <HomeSectionDescription>
                <HomeSectionDescriptionTitle>Hello test!</HomeSectionDescriptionTitle>
                <HomeSectionDescriptionsecondTitle>Je suis Rasolomanitra Toky Jafeta</HomeSectionDescriptionsecondTitle>
                <HomeSectionDescriptionDescription>Je suis spécialiste en réseaux et systèmes, ainsi que dans le développement web. <br />
                ceci est mon portfolio, où j'espère que vous pourrez mieux me connaître en parcourant mes réalisations et mes competences.
                </HomeSectionDescriptionDescription>
                <HomeSectionDescriptionLinks>
                    <HomeSectionDescriptionLink to="/experiences">Mes experiences</HomeSectionDescriptionLink>
                    <HomeSectionDescriptionLink to="/services">Mes services</HomeSectionDescriptionLink>
                </HomeSectionDescriptionLinks>
            </HomeSectionDescription>
            <HomeSectionImage>
                <ImgContainer>
                    <HomeSectionImageImage src={profil} alt="img-descrip" style={{ transform: calculateImageTransform() }}/>
                </ImgContainer>
            </HomeSectionImage>
        </DivSection>
    )
}

export default Home
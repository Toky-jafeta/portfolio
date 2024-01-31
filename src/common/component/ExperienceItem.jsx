import styled from "styled-components"

const ExperienceItemArticle = styled.article`
    position: relative;
    background: #eeeeee;
    width: calc( 50% - 40px );
    padding: 15px;
`

const ExperienceItemArticleLi = styled.li`
    border-bottom: solid 1px;
    padding-bottom: 20px;
    width: 90%;
    text-align: justify;
`

const ExperienceItemArticleUl = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ExperienceItemArticleLiSpan = styled.span`
    color: #0072b1;
    display: flex;
    flex-direction: row;
    font-family: 'Quicksand-SemiBold', sans-serif;
    font-size: 18px;
`
const ExperienceItemArticleTitle = styled.h1`
    font-family: 'Quicksand-Bold', sans-serif;
    font-size: 22px;
`

function ExperienceItem({id, lieu, entreprise, poste, description_court, periode}){
    return (
        <ExperienceItemArticle>
            <ExperienceItemArticleTitle>{poste}</ExperienceItemArticleTitle>
            <ExperienceItemArticleUl>
                <ExperienceItemArticleLi>
                    <ExperienceItemArticleLiSpan>Periode : </ExperienceItemArticleLiSpan>{periode}
                </ExperienceItemArticleLi>
                <ExperienceItemArticleLi>
                    <ExperienceItemArticleLiSpan>Lieu : </ExperienceItemArticleLiSpan>{lieu}
                </ExperienceItemArticleLi>
                <ExperienceItemArticleLi>
                    <ExperienceItemArticleLiSpan>Entreprise : </ExperienceItemArticleLiSpan>{entreprise}
                </ExperienceItemArticleLi>
                <ExperienceItemArticleLi>
                    <ExperienceItemArticleLiSpan>Description : </ExperienceItemArticleLiSpan>{description_court}
                </ExperienceItemArticleLi>
            </ExperienceItemArticleUl>
        </ExperienceItemArticle>
    )
}

export default ExperienceItem
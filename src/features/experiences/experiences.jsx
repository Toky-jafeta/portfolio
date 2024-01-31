import { ExperienceList } from "../../datas/experienceList"
import ExperienceItem from "../../common/component/ExperienceItem"
import styled from "styled-components"

const ExperiencesSection = styled.section`
    position: relative;
    width: 100%;
    min-width: 900px;
    margin: 0 auto;
    padding: 40px 60px;
    background: #d6d6d6;
    overflow: scroll;
    &:after {
        content: "";
        position: absolute;
        top: 20px;
        bottom: 20px;
        left: 50%;
        width: 8px;
        background: #346abf;
        border-radius: 3px;
        z-index: 1;
    }
`

function Experiences(){
    return (
        <ExperiencesSection className="timeline">
            {
                ExperienceList.map(({id, lieu, entreprise, poste, description_court, periode}) => (
                    <ExperienceItem 
                        key={id}
                        lieu={lieu}
                        periode={periode}
                        entreprise={entreprise}
                        poste={poste}
                        description_court={description_court}
                    />
                ))
            }
        </ExperiencesSection>
    )
}

export default Experiences
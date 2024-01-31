import styled from "styled-components"

const ListItem = styled.li`
	margin: 10px;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-direction: column;
	text-transform: capitalize;
	position: relative;
    border: 1px solid #008080;
    width: 30%;
    height: 40vh;
    overflow: auto;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 20px;
    
    &:hover {
        background-color: #008080;
        border: solid #77B5FE;
        color: white;
        transition-property: background-color, color, border;
        transition-duration: 300ms;
        transition-delay: 0s;
        transition-timing-function: ease-out;
    }
`

function ServiceItem({id, name, description}){
    const words = description.split(' ');

    const truncatedDescription = words.slice(0, 40).join(' ');

    return(
        <ListItem>
            <h2>{name}</h2>
            <p>{truncatedDescription}...</p>
        </ListItem>
    )
}

export default ServiceItem
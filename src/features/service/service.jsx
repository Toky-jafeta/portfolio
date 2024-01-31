import { ServiceList } from "../../datas/servicesList"
import ServiceItem from "../../common/component/ServiceItem"
import styled from "styled-components";
import { useState } from "react";

const ServiceContainer = styled.section`
    background-color:#eeeeee;
    padding-top: 0.1px;
`
const ServicesUl = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-arround;
`

function Services(){
    const [showModal, setShowModal] = useState(false)
    const [selectedService, setSelectedService] = useState(null)

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setShowModal(true);
    }

    return (
        <ServiceContainer>
            <ServicesUl>
                {
                    ServiceList.map(({id, name, description}) => (
                        <ServiceItem
                            key={id}
                            id={id}
                            name={name}
                            description={description}
                            onClick={() => handleServiceClick({ id, name, description })}
                        />
                    ))
                }
            </ServicesUl>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <h2>{selectedService.name}</h2>
                        <p>{selectedService.description}</p>
                    </div>
                </div>
            )}
        </ServiceContainer>
    )
}

export default Services
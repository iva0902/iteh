import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import iva from "../slike/iva.png";
import andjela from "../slike/andjela.jpeg";

const About = () => {
    // name, role, image, description
    const team = [
        {
            name: "Iva Mijailovic",
            role: "CEO",
            image: iva,
            description: "Love kids. Want to make them happy. Let them listen to music."
        },
        {
            name: "Andjela Jovanovic",
            role: "CTO",
            image: andjela,
            description: "We want to make them sing. We want to make them dance. We want to make them happy."
        }
    ];

    return (
        <div>
            <Container>
                <h1>Something about us</h1>
                <p>We love music and want to share it for your kids!</p>


                <h2>Our team</h2>
                <Row>

                {
                    team.map((member, index) => {
                        return (

                            <Col md={6} key={index}>
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                                <img width={600} height={600} className="img img-responsive" src={member.image} alt={member.name}/>
                                <p>{member.description}</p>
                            </Col>
                        );
                    })
                }

                </Row>
            </Container>


        </div>
    );
};

export default About;
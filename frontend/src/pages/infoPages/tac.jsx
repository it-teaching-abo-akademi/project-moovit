import React from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import "../../styles/FormBase.css";
import InfoCustomizableTextComponent from "./infoComponent";
import BackButton from "../components/BackButton";

export default function tac() {
    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <BackButton navigateTo="/login" /> <br />
                                    <div>
                                        <InfoCustomizableTextComponent
                                            headerText="Terms and Conditions"
                                            paragraphText="Lorem iorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                        />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

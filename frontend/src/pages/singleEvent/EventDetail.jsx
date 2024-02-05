import React from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import "../../styles/FormBase.css";
import BackButton from "../components/BackButton";

export default function eventDetail() {
    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <BackButton navigateTo="/login" /> <br />
                                    
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

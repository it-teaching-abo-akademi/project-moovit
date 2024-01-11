import React from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import "../../styles/FormBase.css";
import InfoCustomizableTextComponent from "./infoComponent";
import BackButton from "../components/BackButton";

export default function about() {
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
                                            headerText="About Muuvit"
                                            paragraphText="Muuvit is a social platform (on the web) where members can create and participate in small scale outdoor sport/exercise events (eg. skiing, yoga in the park, functional training at the outdoor gym). When one hosts events the event gets an own page where one can add information about the event. The events are open so everybody can participate. The events may have an upper limit of participants"
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

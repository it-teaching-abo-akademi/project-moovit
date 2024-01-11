import React from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import "../../styles/FormBase.css";
import InfoCustomizableTextComponent from "./infoComponent";
import BackButton from "../components/BackButton";

export default function privacypolicy() {
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
                                            headerText="Privacy Policy"
                                            paragraphText="Muuvit is a social platform on the web where members can create and participate in small scale outdoor sport or exercise events eg skiing, yoga in the park, functional training at the outdoor gym. When one hosts events the event gets an own page where one can add information about the event. The events are open so everybody can participate. The events may have an upper limit of participants and may or may not require previous experience of the sport. The events has a time and place and may be recurring. One can add images to the event page and change the outlook. One can review past events and collect points.
                                            Muuvit should be easy to use and inspiring. It would enable people to share skills/knowledge and have fun. It would meet the need for people to exercise and be social."
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

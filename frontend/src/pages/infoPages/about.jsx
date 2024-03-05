import React from "react";
import { Container, Card } from "react-bootstrap";
import InfoCustomizableTextComponent from "./infoComponent";
import BackButton from "../components/BackButton";

export default function About() {
    return (
        <div
            style={{
                marginTop: "30px",
                marginBottom: "20px",
                marginLeft: "10px",
                marginRight: "10px",
            }}
        >
            <Container>
                <Card>
                    <Card.Body>
                        <div>
                            <BackButton navigateTo="/" /> <br />
                            <div>
                                <InfoCustomizableTextComponent
                                    headerText="About Muuvit"
                                    paragraphText="Muuvit is a social platform (on the web) where members can create and participate in small scale outdoor sport/exercise events (eg. skiing, yoga in the park, functional training at the outdoor gym). When one hosts events the event gets an own page where one can add information about the event. The events are open so everybody can participate. The events may have an upper limit of participants"
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

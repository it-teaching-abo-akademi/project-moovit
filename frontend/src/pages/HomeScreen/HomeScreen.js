import React from "react";
import { Container, Button } from "react-bootstrap";
import { default as logo } from "../../assets/muuvitLogo.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { EVENTSSERVICE } from "../../constants";
import EventCard from "../components/EventCard";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const HomeScreen = () => {
    const [randomEventData, setRandomEventData] = useState([]);

    const getRandomEventData = async () => {
        const fetchURL = EVENTSSERVICE + "/getRandomEvents/" + 5; //it will fetch 5 random data
        try {
            const response = await fetch(fetchURL);
            const responseData = await response.json();
            console.log(responseData);
            setRandomEventData(responseData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleLogout = () => {
        // Clear JWT token from cookie
        Cookies.remove("jwt");
        // Update state to reflect user is logged out
        
    };

    useEffect(() => {
        console.log(randomEventData.length);
        if (randomEventData.length === 0) 
            getRandomEventData();

        
    }, []);

    return (
        <div
            style={{
                padding: "30px 20px 10px 10px",
                background:
                    "linear-gradient(120deg, rgba(255,205,210,1) 0%, rgba(242,72,85,1) 100%)",
            }}
        >
            <Container>
            <div className="logo-container">
                        <img
                            src={logo}
                            width={100}
                            height={100}
                            className=""
                            alt="muuvitLogo"
                        />
                    
                </div>
                <div
                    className="d-flex searchEvent button"
                    style={{
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Link to="/events/search" style={{ width: "100%" }}>
                        <Button
                            variant="primary"
                            style={{
                                color: "white",
                                backgroundColor: "#30306d",
                                borderRadius: "10px",
                                marginTop: "5px",
                                marginBottom: "5px",
                                width: "100%",
                                border: "none",
                                padding: "10px",
                            }}
                        >
                            <i className="bi bi-search"></i>
                            <p
                                style={{
                                    display: "inline-block",
                                    margin: "0 0 0 10px",
                                }}
                            >
                                Search for events
                            </p>
                        </Button>
                    </Link>
                </div>

                <div
                    className="eventList d-flex flex-column align-items-center"
                    style={{ width: "100%" }}
                >
                    {randomEventData.length > 0 ? (
                        randomEventData.map((event) => (
                            <Link
                                to={"/event/" + event._id}
                                style={{
                                    textDecoration: "none",
                                    width: "100%",
                                }}
                            >
                                <EventCard key={event._id} eventData={event} />
                            </Link>
                        ))
                    ) : (
                        <div className="w-100 d-flex justify-content-center">
                            <p>Currently no event created.</p>
                        </div>
                    )}
                </div>
                <div
                    className="d-flex buttons justify-content-center"
                    style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "none",
                    }}
                >
                    <Link to="/about" style={{ width: "100%" }}>
                        <Button
                            variant="primary"
                            style={{
                                color: "white",
                                backgroundColor: "#30306d",
                                borderRadius: "10px",
                                marginTop: "5px",
                                marginBottom: "5px",
                                width: "100%",
                                border: "none",
                                padding: "10px",
                            }}
                        >
                            About Muuvit
                        </Button>
                    </Link>
                    <Link to="/pp" style={{ width: "100%" }}>
                        <Button
                            variant="primary"
                            style={{
                                color: "white",
                                backgroundColor: "#30306d",
                                borderRadius: "10px",
                                marginTop: "5px",
                                marginBottom: "5px",
                                width: "100%",
                                border: "none",
                                padding: "10px",
                            }}
                        >
                            Privacy Policy
                        </Button>
                    </Link>
                    {/* <Link to="#"
                                style={{width: "100%"}}>
                                    <Button
                                        variant="primary"
                                        style={{
                                            color: "white",
                                            backgroundColor: "#30306d",
                                            borderRadius: "10px",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                            width: "200px",
                                            border: "none",
                                        }}
                                    >
                                        Help Center
                                    </Button>
                                </Link> */}
                    <Link to="/tac" style={{ width: "100%" }}>
                        <Button
                            variant="primary"
                            style={{
                                color: "white",
                                backgroundColor: "#30306d",
                                borderRadius: "10px",
                                marginTop: "5px",
                                marginBottom: "5px",
                                width: "100%",
                                border: "none",
                                padding: "10px",
                            }}
                        >
                            Terms & Conditions
                        </Button>
                    </Link>
                </div>
                {/* You can place additional divs here for other components that might align left or right */}
            </Container>
        </div>
    );
};

export default HomeScreen;

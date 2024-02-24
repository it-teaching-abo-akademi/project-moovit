import React from "react";
import EventCard from "../components/EventCard";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import events from "../events";
import {
    Container,
    Card,
    Row,
    Col,
    Button,
    Form,
    InputGroup,
} from "react-bootstrap";
import BackButton from "../components/BackButton";
import { default as logo } from "../../assets/muuvitLogo.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { EVENTSSERVICE } from "../../constants";
import Filters from "./Filters";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./filter.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchScreen = () => {
    const [filters, setFilters] = useState({
        city: "",
        categories: [],
        date: "",
        time: "",
        tags: [],
    });

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(EVENTSSERVICE + "/getFiltedEvnets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add any additional headers if required
                },
                body: JSON.stringify(filters), // Send filters data in the request body
            });
            if (response.ok) {
                const data = await response.json();
                // Handle response data
                console.log("Response Data:", data);
                setFiltedEventData(data);
                setRandomEventData([]);
            } else {
                // Handle error response
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            // Handle network error
            console.error("Network Error:", error);
        }
    };

    const [filtedEventData, setFiltedEventData] = useState([]);
    const [randomEventData, setRandomEventData] = useState([]);
    const [filtersVisible, setFiltersVisible] = useState(false);

    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    const getRandomEventData = async () => {
        const fetchURL = EVENTSSERVICE + "/getRandomEvents/" + 5; //it will fetch 5 random data
        try {
            const response = await fetch(fetchURL);
            const responseData = await response.json();
            setRandomEventData(responseData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getRandomEventData();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div
            style={{
                padding: "30px 20px 10px 10px",
                background:
                    "linear-gradient(120deg, rgba(255,205,210,1) 0%, rgba(242,72,85,1) 100%)",
            }}
        >
            <Container>
                <div>
                    <BackButton navigateTo="/" /> <br />
                </div>
                <div
                    className="logoAndSignIn"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={logo}
                        width={100}
                        height={100}
                        className=""
                        alt="muuvitLogo"
                    />
                    <Link to="/login">
                        <Button
                            variant="primary"
                            style={{
                                color: "white",
                                backgroundColor: "#30306d",
                                borderRadius: "10px",
                                marginTop: "5px",
                                marginBottom: "5px",
                                marginLeft: "5px",
                                marginRight: "5px",
                                width: "100px",
                                border: "none",
                            }}
                        >
                            Sign In
                        </Button>
                    </Link>
                </div>
                <br></br>
                <Container fluid>
                    <div
                        className="d-flex searchEvent button"
                        style={{
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        {/* new */}
                        <div>
                            <Form onSubmit={handleSearchSubmit}>
                                <Row className="mb-3">
                                    <Col>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search for events"
                                                aria-label="Search for events"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                style={{
                                                    height: "100%",
                                                }}
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                type="submit"
                                            >
                                                <FontAwesomeIcon
                                                    variant="outline-secondary"
                                                    icon={faSearch}
                                                />
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Form>

                            <Button
                                onClick={toggleFilters}
                                className="filter-toggle-btn btn-lg"
                                type="button"
                                style={{
                                    background: "#FF5252", // Replace with your gradient start color
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "20px", // Adjust as needed to match your design
                                    padding: "10px 20px",
                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", // Adjust for desired shadow effect
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <FontAwesomeIcon icon={faSlidersH} />
                                <span className="ms-2">Filters</span>
                            </Button>
                            {filtersVisible && (
                                <Filters onFiltersChange={setFilters} />
                            )}
                        </div>
                    </div>

                    <div
                        className="eventList d-flex flex-column align-items-center"
                        style={{ width: "100%" }}
                    >
                        {filtedEventData.length > 0 ? (
                            filtedEventData.map((event) => (
                                <Link
                                    to={"/event/" + event._id}
                                    style={{ textDecoration: "none" }}
                                >
                                    <EventCard
                                        key={event._id}
                                        eventData={event}
                                    />
                                </Link>
                            ))
                        ) : randomEventData.length > 0 ? (
                            randomEventData.map((event) => (
                                <Link
                                    to={"/event/" + event._id}
                                    style={{ textDecoration: "none" }}
                                >
                                    <EventCard
                                        key={event._id}
                                        eventData={event}
                                    />
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
                    ></div>
                </Container>
            </Container>
        </div>
    );
};

export default SearchScreen;

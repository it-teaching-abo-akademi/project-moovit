import React, { useState, useEffect } from "react";
import { CATEGORIESSERVICE, EVENTSSERVICE, TAGSSERVICE } from "../../constants";
import createBlurhash from "./createBlurhash";
import Select from "react-select";
import InputField from "./InputField";
import "./event.css";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { default as logo } from "../../assets/muuvitLogo.svg";

const validateField = (data) => {
    const invalidFields = {};
    [
        "eventName",
        "description",
        "host",
        "date",
        "time",
        "duration",
        "file",
        "location",
        "maxParticipants",
    ].forEach((value, index) => (invalidFields.value = false));

    // console.log(invalidFields);

    // const COORDINATE_PATTERN = /^-?\d{1,3}\.[0-9]*,\s-?\d{1,3}\.[0-9]+$/;
};

const createEvent = async (e, data) => {
    const submitButton = document.getElementById("submit-button");

    // TODO: Add some loading animation. Anything really.

    submitButton.disabled = false;
    let errorsInFields = false;
    const jwt =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjUzZDg2OTNlMjU0ZTk5MWE0OTdlYTg2IiwiaWF0IjoxNjk5NTMxNzAxfQ.8kC3sw3tRefxoNsHrJCPTnR7pk9-pfc4wba_wPNz1vU";
    e.preventDefault();

    validateField(data);

    // Terminate if any errors.
    if (errorsInFields) {
        submitButton.disabled = false;
        return;
    }

    // Make blurhash
    const blurhash = await createBlurhash(data.file);
    data.blurhash = blurhash;

    // Setup form data
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (key === "categories" || key === "tags") {
            // Convert the array of objects to an array of string IDs
            const ids = value.map((item) => item.value);
            // Append the array of IDs as a string
            formData.append(key, JSON.stringify(ids));
        } else {
            formData.append(key, value);
        }
    });
    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    // Send the create request
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: "Bearer " + jwt,
        },
        body: formData,
    };

    const fetchURL = EVENTSSERVICE + "/create";
    const response = await fetch(fetchURL, requestOptions);

    // Handle response.
    if (response.status === 400) {
    }
    if (response.status === 201) {
        // Navigate home if successful.
        //window.location.href = "/";
    } else {
        console.log("error code: " + response.status);
    }

    submitButton.disabled = false;
};

const CreateEventPage = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [tagsData, setTagsData] = useState([]);

    useEffect(() => {
        const jwt =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjUzZDg2OTNlMjU0ZTk5MWE0OTdlYTg2IiwiaWF0IjoxNjk5NTMxNzAxfQ.8kC3sw3tRefxoNsHrJCPTnR7pk9-pfc4wba_wPNz1vU";
        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + jwt,
            },
        };
        const fetchCategoriesAndTags = async () => {
            try {
                const catResponse = await fetch(
                    CATEGORIESSERVICE + "/getAll",
                    requestOptions,
                );
                const tagResponse = await fetch(
                    TAGSSERVICE + "/getAll",
                    requestOptions,
                );
                const categories = await catResponse.json();
                const tags = await tagResponse.json();
                setCategoriesData(categories);
                setTagsData(tags);
                console.log(categories);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCategoriesAndTags();
    }, []);

    const [eventData, setEventData] = useState({
        eventName: "",
        description: "",
        host: "",
        date: "",
        time: "",
        duration: "",
        file: null,
        location: "",
        maxParticipants: "",
        categories: [], // Initialize categories as an empty array
        tags: [], // Initialize tags as an empty array
    });

    const [location, setLocation] = useState({});

    const updateEventData = (prop, value) => {
        const newData = Object.assign(
            {},
            eventData,
            { [prop]: value },
            location,
        );
        setEventData(newData);
    };

    const handleMultiselectChange = (fieldName, selectedOptions) => {
        updateEventData(fieldName, selectedOptions);
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
                    <Link to="/">
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
                            Home
                        </Button>
                    </Link>
                </div>
                <br />
                <h2>Create Event</h2>
                <br />
                <form
                    onSubmit={(e) => createEvent(e, eventData)}
                    encType="multipart/form-data"
                >
                    <div className="form-section">
                        <InputField
                            type="text"
                            label="Event name"
                            onValueChange={(value) =>
                                updateEventData("eventName", value)
                            }
                        />
                    </div>

                    <div className="form-section">
                        <label>Description:</label>
                        <textarea
                            style={{
                                borderRadius: "5px",
                                border: "1px solid #cccccc",
                            }}
                            type="text"
                            value={setEventData.description}
                            onChange={(e) =>
                                updateEventData("description", e.target.value)
                            }
                        />
                    </div>

                    <div className="form-section">
                        <InputField
                            type="text"
                            label="Host name"
                            onValueChange={(value) =>
                                updateEventData("host", value)
                            }
                        />
                    </div>
                    <div className="form-section">
                        <InputField
                            type="date"
                            label="Date"
                            onValueChange={(value) =>
                                updateEventData("date", value)
                            }
                        />
                    </div>

                    <div className="form-section">
                        <InputField
                            type="text"
                            label="Time"
                            onValueChange={(value) =>
                                updateEventData("time", value)
                            }
                        />
                    </div>
                    <div className="form-section">
                        <InputField
                            type="number"
                            label="Duration"
                            onValueChange={(value) =>
                                updateEventData("duration", value)
                            }
                        />
                    </div>
                    <div className="form-section">
                        <label>Event banner:</label>
                        <input
                            type="file"
                            onChange={(e) =>
                                updateEventData("file", e.target.files[0])
                            }
                        />
                        <img
                            style={{ display: "block", width: "200px" }}
                            src={URL.createObjectURL(
                                new Blob([eventData.file], {
                                    type: eventData.file?.type,
                                }),
                            )}
                            alt="Uploaded File"
                        />
                    </div>
                    <div className="form-section">
                        <InputField
                            type="text"
                            label="Location"
                            onValueChange={(value) =>
                                updateEventData("location", value)
                            }
                        />
                    </div>

                    <div className="form-section">
                        <InputField
                            type="text"
                            label="Max participants"
                            onValueChange={(value) =>
                                updateEventData("maxParticipants", value)
                            }
                        />
                    </div>

                    <div className="form-section">
                        <label>Categories:</label>
                        <Select
                            isMulti
                            options={categoriesData.map((category) => ({
                                value: category._id,
                                label: category.categoryName,
                            }))}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            value={eventData.categories}
                            onChange={(selectedOptions) =>
                                handleMultiselectChange(
                                    "categories",
                                    selectedOptions,
                                )
                            }
                        />
                    </div>

                    <div className="form-section">
                        <label>Tags:</label>
                        <Select
                            isMulti
                            options={tagsData.map((tag) => ({
                                value: tag._id,
                                label: tag.tagName,
                            }))}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            value={eventData.tags}
                            onChange={(selectedOptions) =>
                                handleMultiselectChange("tags", selectedOptions)
                            }
                        />
                    </div>

                    <button type="submit" id="submit-button">
                        Create Event
                    </button>
                </form>
            </Container>
        </div>
    );
};

export default CreateEventPage;

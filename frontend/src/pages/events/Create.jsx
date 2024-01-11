import React, { useState } from "react";
import { EVENTSSERVICE } from "../../constants";
import createBlurhash from "./createBlurhash";

import InputField from "./InputField";

const createEvent = async (e, data) => {
    let errorsInFields = false;
    const jwt =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjUzZDg2OTNlMjU0ZTk5MWE0OTdlYTg2IiwiaWF0IjoxNjk5NTMxNzAxfQ.8kC3sw3tRefxoNsHrJCPTnR7pk9-pfc4wba_wPNz1vU";
    e.preventDefault();

    // Terminate if any errors.
    if (errorsInFields) {
        return;
    }

    // Make blurhash
    const blurhash = await createBlurhash(data.file);
    data.blurhash = blurhash;

    // Setup form data
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });
    console.log(formData);

    // Send the create request
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: "Bearer " + jwt,
        },
        body: formData,
    };

    console.log(requestOptions);

    const fetchURL = EVENTSSERVICE + "/create";
    const response = await fetch(fetchURL, requestOptions);

    // Handle response.
    if (response.status === 400) {
    }
    if (response.status === 200) {
        console.log("success");
    } else {
        console.log("error code: " + response.status);
    }
};

const CreateEventPage = () => {
    const [eventData, setEventData] = useState({});
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

    return (
        <div>
            <h2>Create Event</h2>
            <form
                onSubmit={(e) => createEvent(e, eventData)}
                encType="multipart/form-data"
            >
                <InputField
                    type="text"
                    label="Event name"
                    onValueChange={(value) =>
                        updateEventData("eventName", value)
                    }
                />
                <div>
                    <label>Description:</label>
                    <textarea
                        type="text"
                        value={setEventData.description}
                        onChange={(e) =>
                            updateEventData("description", e.target.value)
                        }
                    />
                </div>

                <InputField
                    type="text"
                    label="Host name"
                    onValueChange={(value) => updateEventData("host", value)}
                />
                <InputField
                    type="date"
                    label="Date"
                    onValueChange={(value) => updateEventData("date", value)}
                />
                <InputField
                    type="text"
                    label="Time"
                    onValueChange={(value) => updateEventData("time", value)}
                />
                <InputField
                    type="number"
                    label="Duration"
                    onValueChange={(value) =>
                        updateEventData("duration", value)
                    }
                />
                <div>
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
                <InputField
                    type="text"
                    label="Location"
                    onValueChange={(value) =>
                        updateEventData("location", value)
                    }
                />
                <InputField
                    type="text"
                    label="Max participants"
                    onValueChange={(value) =>
                        updateEventData("maxParticipants", value)
                    }
                />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEventPage;

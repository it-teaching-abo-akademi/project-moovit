import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { CATEGORIESSERVICE, EVENTSSERVICE, TAGSSERVICE } from "../../constants";
import citiesData from "./cities.json";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const Filters = ({ onFiltersChange }) => {
    const [city, setCity] = useState("");
    const [category, setCategory] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]); // State to store fetched categories
    const [tagsData, setTagsData] = useState([]); // State to store fetched tags
    const [date, setDate] = useState("");
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]); // State to store selected tags
    const [loading, setLoading] = useState(true); // State to track loading state

    // Handler functions for each filter
    const [selectedCity, setSelectedCity] = useState(null);

    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
    };

    const handleCategoryChange = (selectedOptions) => {
        setCategory(selectedOptions || []);
    };
    const handleDateChange = (e) => setDate(e.target.value);
    const handleFromTimeChange = (newTime) => {
        setFromTime(newTime);
    };
    const handleToTimeChange = (newTime) => {
        setToTime(newTime);
    };
    const handleTagsChange = (selectedOptions) => {
        setSelectedTags(selectedOptions || []);
    };

    useEffect(() => {
        const jwt =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjUzZDg2OTNlMjU0ZTk5MWE0OTdlYTg2IiwiaWF0IjoxNjk5NTMxNzAxfQ.8kC3sw3tRefxoNsHrJCPTnR7pk9-pfc4wba_wPNz1vU"; // Replace with your actual JWT token
        const requestOptions = {
            method: "GET",
            headers: { Authorization: "Bearer " + jwt },
        };

        const fetchCategoriesAndTags = async () => {
            try {
                const catResponse = await fetch(
                    CATEGORIESSERVICE + "/getAll",
                    requestOptions,
                ); // Replace with your actual service URL
                const tagResponse = await fetch(
                    TAGSSERVICE + "/getAll",
                    requestOptions,
                ); // Replace with your actual service URL
                const categories = await catResponse.json();
                const tags = await tagResponse.json();
                console.log(categories);
                setCategoriesData(categories); // Store fetched categories
                setTagsData(tags); // Transform and store fetched tags
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false); // Set loading to false if an error occurs
            }
        };

        fetchCategoriesAndTags();
    }, []);

    useEffect(() => {
        const filters = {
            city: selectedCity ? selectedCity.value : "",
            categories: category.map((c) => c.value), // Changed to category from categoriesData
            date,
            fromTime,
            toTime,
            tags: selectedTags.map((t) => t.value),
        };
        console.log(filters);
        onFiltersChange(filters);
    }, [selectedCity, categoriesData, date, fromTime, toTime, selectedTags, onFiltersChange, category]);

    return (
        <Form>
            <Row className="mb-3">
                <Col>
                    <Form.Label>City</Form.Label>
                    <Select
                        value={selectedCity}
                        onChange={handleCityChange}
                        options={[
                            { value: '', label: 'Select' }, 
                            ...citiesData.map((cityData) => ({
                                value: cityData.location,
                                label: cityData.city,
                            }))
                        ]}
                        placeholder="Select City"
                        isSearchable
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Label>Category</Form.Label>
                    {!loading && (
                        <Select
                            isMulti
                            options={categoriesData.map((category) => ({
                                value: category._id,
                                label: category.categoryName,
                            }))}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onChange={handleCategoryChange}
                        />
                    )}
                    {loading && <div>Loading...</div>}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Label>From Time</Form.Label>
                    <TimePicker
                        className="form-control"
                        onChange={handleFromTimeChange}
                        value={fromTime}
                        clearIcon={null}
                        format="HH:mm"
                        disableClock={false}
                    />
                </Col>
                <Col>
                    <Form.Label>To Time</Form.Label>
                    <TimePicker
                        className="form-control"
                        onChange={handleToTimeChange}
                        value={toTime}
                        clearIcon={null}
                        format="HH:mm"
                        disableClock={false}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Label>Tags</Form.Label>
                    <Select
                        isMulti
                        options={tagsData.map((tag) => ({
                            value: tag._id,
                            label: tag.tagName,
                        }))}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        onChange={handleTagsChange}
                    />
                </Col>
            </Row>
        </Form>
    );
};

export default Filters;

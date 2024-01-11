import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // For prop type validation
import "./BackButton.css";

const BackButton = ({ navigateTo }) => {
    let navigate = useNavigate();

    const goBack = () => {
        navigate(navigateTo);
    };

    return (
        <button className="back-button" onClick={goBack}>
            <i className="bi bi-arrow-left"></i> Back
        </button>
    );
};

// Prop type validation
BackButton.propTypes = {
    navigateTo: PropTypes.string.isRequired,
};

export default BackButton;

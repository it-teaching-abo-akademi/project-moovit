import React, { useState } from "react";

const InputField = ({ type, label, onValueChange }) => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setValue(value);
        onValueChange(value);
    };

    return (
        <div>
            <label>{label}:</label>
            <input type={type} value={value} onChange={handleChange} />
        </div>
    );
};

export default InputField;

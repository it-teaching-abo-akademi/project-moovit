import React from "react";

const InfoCustomizableTextComponent = ({ headerText, paragraphText }) => {
    return (
        <div>
            <h1>{headerText}</h1>
            <br></br>
            <p>{paragraphText}</p>
        </div>
    );
};

export default InfoCustomizableTextComponent;

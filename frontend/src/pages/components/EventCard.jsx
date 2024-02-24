import React from "react";
import "./EventCard.css";

const EventCard = ({ eventData }) => {
    return (
        <div class="card-background">
            <div class="card-image">
                <img src={eventData.imageURL} alt="" />
            </div>
            <p class="event-name">{eventData.eventName}</p>
            <p class="event-host">Hosted by {eventData.host}</p>
        </div>
    );
};
export default EventCard;

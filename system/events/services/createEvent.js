
const Create = require('../models/createEventSchema');
const {Status, SUCCESS, FAIL} = require('../../status');
const Event = require('../models/createEventSchema');
const {v2: cloudinary} = require('cloudinary');
const uploadImage = require('../uploadImage');
const DatauriParser = require("datauri/parser");
const path = require('path');

const MEGABYTE = 1024 * 1024
const FILESIZE_LIMIT = 5 * MEGABYTE;

// Setup Cloudinary.
require('dotenv').config()
const cloudName = process.env.CLOUD_NAME
const apiKey = process.env.CLOUD_API_KEY
const apiSecret = process.env.CLOUD_SECRET

cloudinary.config({ 
    cloud_name: cloudName, 
    api_key: apiKey, 
    api_secret: apiSecret 
});

const parser = new DatauriParser();

async function createEvent(eventData){
    try{
        // Check image size
        const image = eventData.image;
        if(image.size > FILESIZE_LIMIT){
            return(new Status(400, FAIL, "File size too big"));
        }
        
        // Check other fields of eventData
        Object.entries(eventData).forEach(([key, value]) => {
            eventData[key] ??= '';
        });

        // Upload image to image host
        const extName = path.extname(image.originalname).toString();
        const file64 = parser.format(extName, image.buffer);

        const imageUploadResult = await uploadImage(file64.content, cloudinary);
        
        if(!imageUploadResult){
            return(new Status(500, FAIL, "image upload failed"));
        }
        
        // Fix location
        const location = {
            type: "Point",
            coordinates: eventData.location.split(',')
        }

        // Create event object
        const newEvent = new Event({
            eventName: escapeHtml(eventData.eventName.trim()),
            description: escapeHtml(eventData.description.trim()),
            date: eventData.date, 
            location: location,
            host: escapeHtml(eventData.host.trim()),
            creator: eventData.creator,
            maxParticipants: eventData.maxParticipants,
            duration: eventData.duration,
            imageURL: imageUploadResult.url,
            blurhash: eventData.blurhash
        });

        // Add type to database.
        const eventCreationResult = await newEvent.save();
        
        if (eventCreationResult.acknowledged) {
            console.log(eventCreationResult)
            return(new Status(500, FAIL, "Something happened"));
        } 

        // TODO: Delete uploaded image from 
        // cloudinary if database save failed
        
    }catch(e){
        console.error(e);
        return(new Status(400, FAIL, "not ok"));
    }

    return(new Status(201, SUCCESS, "succesfully added"));
}

// Escape sensitive characters using RegEx.
const escapeHtml = input => input.replace(/[&<>"']/g, c => '&#' + c.charCodeAt(0) + ';');

module.exports = {createEvent}
const Create = require("../models/eventSchema");
const { Status, SUCCESS, FAIL } = require("../../status");
const Event = require("../models/eventSchema");
const { v2: cloudinary } = require("cloudinary");
const uploadImage = require("../uploadImage");
const DatauriParser = require("datauri/parser");
const path = require("path");

const MEGABYTE = 1024 * 1024;
const FILESIZE_LIMIT = 5 * MEGABYTE;

// Setup Cloudinary.
require("dotenv").config();
const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.CLOUD_API_KEY;
const apiSecret = process.env.CLOUD_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const parser = new DatauriParser();

async function createEvent(eventData) {
  try {
    // Check image size
    const image = eventData.image;
    if (image.size > FILESIZE_LIMIT) {
      return new Status(400, FAIL, "File size too big");
    }

    // Check other fields of eventData
    Object.entries(eventData).forEach(([key, value]) => {
      eventData[key] ??= "";
    });

    // Upload image to image host
    const extName = path.extname(image.originalname).toString();
    const file64 = parser.format(extName, image.buffer);

    const imageUploadResult = await uploadImage(file64.content, cloudinary);

    if (!imageUploadResult) {
      return new Status(500, FAIL, "image upload failed");
    }

    // Fix location
    const location = {
      type: "Point",
      coordinates: eventData.location.split(","),
    };

    // Create event object
    const newEvent = new Event({
      eventName: escapeHtml(eventData.eventName.trim()),
      description: escapeHtml(eventData.description.trim()),
      date: new Date(
        createISOdate(eventData.time, eventData.date)
      ).toISOString(),
      location: location,
      host: escapeHtml(eventData.host.trim()),
      creator: eventData.creator,
      maxParticipants: eventData.maxParticipants,
      duration: eventData.duration,
      imageURL: imageUploadResult.url,
      blurhash: eventData.blurhash,
      tags: eventData.tags,
      categories: eventData.categories,
    });

    // Add type to database.
    const eventCreationResult = await newEvent.save();

    if (eventCreationResult.acknowledged) {
      console.log(eventCreationResult);
      return new Status(500, FAIL, "Something happened");
    }

    // TODO: Delete uploaded image from
    // cloudinary if database save failed
  } catch (e) {
    console.error(e);
    return new Status(400, FAIL, "not ok");
  }

  return new Status(201, SUCCESS, "succesfully added");
}

// Escape sensitive characters using RegEx.
const escapeHtml = (input) =>
  input.replace(/[&<>"']/g, (c) => "&#" + c.charCodeAt(0) + ";");

// Combines date and military time.
function createISOdate(time, date) {
  console.log(time)
  const hours = time.substring(0, 2);
  const minutes = time.substring(2, 4);
  const ISOdate = date + "T" + hours + ":" + minutes + ":00Z";
  return ISOdate;
}

// Get user role in the event.
async function joinEvent(data) {
  // Find event by ID
  const event = await Event.findById(data.eventId);
  if (!event) {
    // Event not found
    return new Status(500, FAIL, "Event not found!!");
  }
  // Check if the maximum participants limit has been reached
  if (
    event.maxParticipants !== undefined &&
    event.enrolledParticipants.length >= event.maxParticipants
  ) {
    return new Status(
      500,
      FAIL,
      "Maximum participants limit reached for this event!!"
    );
  }
  // Enroll user in the event
  const userEnrolled = event.enrollUser(data.userId);
  if (userEnrolled) {
    // Save the updated event
    await event.save();
    return new Status(201, SUCCESS, "Joined the event successfully!!");
  } else {
    return new Status(
      500,
      FAIL,
      "User is already enrolled or is the creator of the event"
    );
  }
}

module.exports = { createEvent, joinEvent };

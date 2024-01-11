const mongoose = require('mongoose')

const createSchema = new mongoose.Schema({ 
    eventName: {
        type: String,
        required: true,
        unique:false
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    locationName: {
        type: String
    },
    host: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    }, 
    maxParticipants: {
        type: Number,
        required: true
    },
    enrolledPartipants: {
        type: Number,
        default: 0
    },
    imageURL: {
        type: String,
        required: true
    },
    blurhash: {
        type: String,
        required: false
    }, 
    duration: {
        type: Number,
        required: true
    }
}, { 
    timestamps: true,
})

module.exports = mongoose.model('Create', createSchema, "events")
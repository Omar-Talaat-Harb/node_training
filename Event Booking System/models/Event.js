const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        date:{
            type:Date,
            required: true
        } ,
        description: String,
        availableTickets:{
            type: Number,
            default: 0
        } ,
        ticketsBooked:{ 
            type: Number,
            default: 0 }
    });
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
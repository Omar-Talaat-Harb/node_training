const express = require("express");
const Event = require("../models/Event");
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();  
app.use(bodyParser.json());
app.use(express.json()); 
const {eventValidation} = require('../validation');
const verifyToken = require('./verifyToken');




// Search events by title (or list all events if no title query provided)
router.get('/',verifyToken,async (req, res) => {
    const { title } = req.query;
    console.log(title);
    console.log(req.user); //read as undefined?!
    let filter = {};
    if (title) {
    //   // Use MongoDB's $regex for case-insensitive partial match search
       filter.title = { $regex: title, $options: 'i' }; // 'i' for case-insensitive
    }
    try {
    const events = await Event.find(filter);
    res.json(events);
    } catch (err) {
    res.status(400).send('Error fetching events');
    }
});

// Create a new event   

router.post('/',verifyToken,async (req, res) => {
    // console.log(req.user);
    // if(req.user.role !== 'admin')return res.status(403).send('Admin only');
    let {title, date, description,availableTickets} = req.body;
    const {error} = eventValidation(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});
    
    const event = new Event({
        title:title,
        date:date,
        description:description,
        availableTickets:availableTickets
    });
    console.log(event);
    
    try {
    await event.save();
    res.status(201).json(event);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});

// Update an existing event

const getEvent = async function getEventByTitle(req, res, next) {
    let event;
    try {
      // Find the event by title (case-insensitive search)
    event = await Event.findOne({ title: { $regex: new RegExp(req.params.title, 'i') } });
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }
    } catch (err) {
    return res.status(500).send(err);
    }
    res.event = event; // Attach the found event to the res object
    next();
    }

router.patch('/title/:title',verifyToken,getEvent, async (req, res) => {
    let {title, date, description,availableTickets} = req.body;

    if (title != null) {
    res.event.title = title;
    }
    if (description != null) {
    res.event.description = description;
    }
    if (date != null) {
    res.event.date = new Date(date); // Ensure the date is properly formatted
    }
    if (availableTickets != null) {
        res.event.availableTickets = availableTickets;
    }
    // Save the updated event to the database
    try {
    await res.event.save();
        return res.json(res.event); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

    // Delete an existing event
    
router.delete('/title/:title',verifyToken,async (req, res) => {
    const event = await Event.findOneAndDelete({ title: { $regex: new RegExp(req.params.title, 'i')} });
    console.log(event)
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }try{
        res.json({ message: 'Event deleted successfully' });
    }catch (err) {
    res.status(500).json({ message: message });
    }

});











module.exports = router ;
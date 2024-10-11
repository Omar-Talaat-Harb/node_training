// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');

// dotenv.config();
// const app = express();
// app.use(bodyParser.json());

// // JWT Secret Key
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/event_booking');

// // Schemas
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//     role: { type: String, default: 'user' }, // 'user' or 'admin'
// });

// const eventSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     date: Date,
//     availableTickets: Number,
// });

// const bookingSchema = new mongoose.Schema({
//   event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   tickets: Number,
//   bookingDate: { type: Date, default: Date.now },
// });

// const User = mongoose.model('User', userSchema);
// const Event = mongoose.model('Event', eventSchema);
// const Booking = mongoose.model('Booking', bookingSchema);

// // Middleware to verify JWT
// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(403).send('Token required');
//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).send('Unauthorized');
//     req.user = decoded;
//     next();
//   });
// };

// // Registration Route
// app.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();
//     res.status(201).send('User registered');
//   } catch (err) {
//     res.status(400).send('Error registering user');
//   }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).send('User not found');
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).send('Invalid credentials');
//   const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token });
// });

// // Create Event (Admin Only)
// app.post('/events', verifyToken, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).send('Admin only');
//   const { title, description, date, availableTickets } = req.body;
//   try {
//     const event = new Event({ title, description, date, availableTickets });
//     await event.save();
//     res.status(201).send('Event created');
//   } catch (err) {
//     res.status(400).send('Error creating event');
//   }
// });

// // Get All Events or Search Events
// app.get('/events', async (req, res) => {
//   const { title, date } = req.query;
//   let filter = {};
//   if (title) filter.title = { $regex: title, $options: 'i' };
//   if (date) filter.date = new Date(date);
//   try {
//     const events = await Event.find(filter);
//     res.json(events);
//   } catch (err) {
//     res.status(400).send('Error fetching events');
//   }
// });

// // Book Event (Users Only)
// app.post('/book', verifyToken, async (req, res) => {
//   const { eventId, tickets } = req.body;
//   try {
//     const event = await Event.findById(eventId);
//     if (!event || event.availableTickets < tickets) return res.status(400).send('Not enough tickets');
//     const booking = new Booking({ event: eventId, user: req.user.userId, tickets });
//     await booking.save();
//     event.availableTickets -= tickets;
//     await event.save();
//     res.status(201).send('Booking successful');
//   } catch (err) {
//     res.status(400).send('Error booking event');
//   }
// });

// // Get User Bookings
// app.get('/bookings', verifyToken, async (req, res) => {
//   try {
//     const bookings = await Booking.find({ user: req.user.userId }).populate('event');
//     res.json(bookings);
//   } catch (err) {
//     res.status(400).send('Error fetching bookings');
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

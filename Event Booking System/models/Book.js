const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true, ref: 'User' }, 
    eventId: {
            type: mongoose.Schema.Types.ObjectId,
                required: true, ref: 'Event' },
    tickets: { 
            type: Number,
            required: true }
});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
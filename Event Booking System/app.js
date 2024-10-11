const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require('body-parser');
dotenv.config({path:'./config.env'});
const mongoose = require("mongoose");
const app = express();
const userRoute = require('./routes/auth');
const eventRoute=require('./routes/event');
app.use(express.json());    
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("welcome to our event website");
});

mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/event_booking')
.then(() => {console.log("connected");})
.catch((err) => {console.log("failed to connect")});

//rotes
app.use('/api/v1/users/',userRoute);
app.use('/api/v1/events/',eventRoute);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

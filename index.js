const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('./dbConection/databaseConnection');

const bodyParser = require('body-parser');

const cooKiParser =require('cookie-parser');




// Middleware
app.use(cooKiParser());
app.use(bodyParser.json({ limit: '10mb' })); // Increase limit for body-parser
app.use(express.json({ limit: '10mb' })); // Increase limit for express.json
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase limit for express.urlencoded

// CORS configuration and routes...

var corsOptions = {
    origin: ['http://localhost:4200'], // Specify your trusted domain
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));


const users= require('./Router/UserR');
app.use('/users',  users );

const Room= require('./Router/RoomR');
app.use('/api/v1/Rooms', Room );

const Menu= require('./Router/RestaurantMenuR');
app.use('/api/v1/', Menu);

const Laundry= require('./Router/LaundryItemR');
app.use('/api/v1/', Laundry);

const Booking= require('./Router/BookingR');
app.use('/api/v1/',   Booking);



app.get('/',(req,res) =>{

    console.log("hello")
    res.json('working')
})

app.use((err, req, res, next) => {
    console.error("Error Stack:", err.stack);
    console.error("Error Status:", err.statusCode);
    console.error("Error Message:", err.message);
    res.status(err.statusCode || 500).json({
        error: err.message || 'An error occurred'
    });
});

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Server is up and running at ${port}`));
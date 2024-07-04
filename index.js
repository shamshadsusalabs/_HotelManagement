const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('./dbConection/databaseConnection');

const bodyParser = require('body-parser');

const cooKiParser =require('cookie-parser');




app.use(cooKiParser());
app.use(bodyParser.json()); 
app.use(express.json({ limit: '1mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '1mb', extended: true })); // Adjust the limit as needed

var corsOptions = {
    origin: 'http://localhost:4200', // Specify your trusted domain
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));


const users= require('./Router/UserR');
app.use('/users',  users );

// const CurrencyRate= require('./Router/CurrencyRate');
// app.use('/CurrencyRate', CurrencyRate );


// const Beneficiary= require('./Router/Beneficiary');
// app.use('/Beneficiary',  Beneficiary );

// const Transfer= require('./Router/Transfer');
// app.use('/Trasfer',  Transfer );


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
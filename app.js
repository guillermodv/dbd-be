require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const routes= require('./routes/routes.js');
const cors = require('cors');

var app = express();
var port = process.env.APP_PORT;

//middleware
app.use(morgan('dev'));
//routes


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(routes);

app.use(cors());

app.listen(port, () => {
    console.log("Server Listen at:", port);
});



module.exports = app;

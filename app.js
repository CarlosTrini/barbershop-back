const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: '.env'});
const dbConnection = require('./configs/db');

const port = process.env.port || 4500;

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//dbconection
dbConnection();

//routes
const baseUrl = '/barbershop/api/';
app.use(baseUrl, require('./routes/authRoutes')); // auth =>  login and register
app.use(baseUrl, require('./routes/barberServiceRoutes')); // services
app.use(baseUrl, require('./routes/reservationsRouter')); // reservations


app.listen(port,'0.0.0.0', (error) => {
   error
   ? console.log('Error => ', error)
   : console.log(`Server runing => ${PORT}`)
});
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: '.env'});
const dbConnection = require('./configs/db');

const PORT = process.env.PORT || 4500;

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//dbconection
dbConnection();

//routes
const baseUrl = '/barbershop/api/';
app.use(baseUrl, require('./routes/auth/authRoutes')); // auth =>  login and register
app.use(baseUrl, require('./routes/services/barberServiceRoutes')); // services
app.use(baseUrl, require('./routes/reservations/reservationsRouter')); // reservations


app.listen(PORT, (error) => {
   error
   ? console.log('Error => ', error)
   : console.log(`Server runing => ${PORT}`)
});
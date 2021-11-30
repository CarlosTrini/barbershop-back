const router = require('express').Router();
const { check } = require('express-validator');
const authJwt = require('../middlewares/authJwt');
const fieldErrors = require('../middlewares/fieldErrors');
const reservationsController = require('../controllers/reservationsController');

//HERE IS ALL ABOUT RESERVATIONS ==>> ADD, UPDATE, DELETE, GET, GET_BY_USER, GET_BY_DATE

// /barbershop/api/reservation

//++++++++++++++++++++ GET_BY_USER RESERVATIONS  USER ACTION
router.get('/reservation/client/:id',
  authJwt,
  reservationsController.getByUserReservations
);
//++++++++++++++++++++ GET_BY_DATE RESERVATIONS ADMIN ACTION
router.get('/reservation/date/:date',
  authJwt,
  reservationsController.getByDateReservations
);

// ++++++++++++++++++++--ADD RESERVATION
router.post('/reservation',
  authJwt,
  [
    check("nameservice", "The service   is required").not().isEmpty(),
    check("date", "The date is required").not().isEmpty(),
    check("hour", "The hour is required").not().isEmpty(),
    check("price", "The price is required").not().isEmpty(),
    check("category", "The category is required").not().isEmpty(),
    check("totalPay", "The total is required").not().isEmpty(),
    check("quantity", "The quantity is required").not().isEmpty(),
  ],
  fieldErrors,
  reservationsController.addReservation
);

//++++++++++++++++++++ DELETE RESERVATION ADMIN AND USER ACTION
router.delete('/reservation/:id', 
  authJwt,
  reservationsController.deleteReservation
);

//++++++++++++++++++++ UPDATE RESERVATION
//If the user wants to update a reservation ... He has to delete the reservation and make a new reservation

module.exports = router;
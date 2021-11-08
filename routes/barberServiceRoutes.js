const router = require('express').Router();
const { check } = require('express-validator');
const barbershopController = require('../controllers/barbershopController');
const validateToken = require('../middlewares/authJwt');
const fieldErrors = require('../middlewares/fieldErrors');


//HERE IS ALL ABOUT SERVICES ==>> ADD, UPDATE, DELETE, READ, READ_BY_ID

//  /barbershop/api/
//++++++++++++++++++++++++++++GET SERVICES --
router.get('/',
   validateToken,
   barbershopController.getServices
);

//--------------------GET SERVICE BY CATEGORY
router.get('/service/:category',
   validateToken,
   barbershopController.getServiceByCategory
);

//++++++++++++++++++++++++++++++ADD SERVICE ---
router.post('/service',
   validateToken,
   [
      check('service', 'The name of the service is required').not().isEmpty(),
      check('price', 'The price field is required').not().isEmpty(),
      check('category', 'The category field is required').not().isEmpty(),
   ],
   fieldErrors,
   barbershopController.addService
);

//+++++++++++++++++++++++++++++++++++++++++DELETE SERVICE
router.delete('/service/:id',
   validateToken,
   barbershopController.deleteService
);

// ++++++++++++++++++++++++++++++++++++++UPDATE SERVICE
router.put('/service/',
   validateToken,
   [
      check('id', 'Service id is required').not().isEmpty(),
      check('service', 'The name of the service is required').not().isEmpty(),
      check('price', 'The price field is required').not().isEmpty(),
      check('category', 'The category field is required').not().isEmpty(),
   ],
   fieldErrors,
   barbershopController.updateService
);


module.exports = router;
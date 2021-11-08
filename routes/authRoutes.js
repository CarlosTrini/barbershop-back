const router = require('express').Router();
const { check } = require('express-validator');
const authControllers = require('../controllers/authControllers');
const fieldErrors = require('../middlewares/fieldErrors');


//LOGIN ROUTE
router.post('/login',
   [
      check('email', 'The field email is required').not().isEmpty(),
      check('email', 'Check your email address').isEmail(),
      check('password', 'The field password is required').not().isEmpty(),
   ],
   fieldErrors,
   authControllers.login);

//REGISTER ROUTE
router.post('/register',
   [
      check('name', 'The field name is required').not().isEmpty(),
      check('user', 'The field user is required').not().isEmpty(),
      check('email', 'The field email is required').not().isEmpty(),
      check('email', 'Check your email address').isEmail(),
      check('password', 'The field password is required').not().isEmpty(),
      check('password', 'The password field requires a minimum of 8 characters').isLength({ min: 8 }),
      check('passwordConfirm', 'The field confirm-password is required').not().isEmpty(),
      check('passwordConfirm', 'The confirm-password field requires a minimum of 8 characters').isLength({ min: 8 }),
   ],
   fieldErrors,
   authControllers.register);


module.exports = router;
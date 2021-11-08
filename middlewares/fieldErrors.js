const { validationResult } = require('express-validator');

//check if all fields are correct
const fieldErrors = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.json({ error: true, msg: errors.array() });
   next();
}

module.exports = fieldErrors;
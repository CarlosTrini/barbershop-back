const jwt = require('jsonwebtoken');
require('dotenv').config({path: '.env'});

const validateToken = async(req, res, next) => {
   //check if the token exists
   const token = req.headers.authorization;

   //token doesn't exist
   if (!token) return res.status(401).json({error: true, msg: 'Unauthorized access'});

   //token exist
   try {
      const decodeToken = jwt.verify(token, process.env.SECRET_WORD_JWT);
      req.currentUser = {
         idUser: decodeToken.idUser,
         user: decodeToken.user,
         role: decodeToken.role
      };
      next();
   } catch (error) {
      return res.status(401).json({error: true, msg: 'Unauthorized access. Invalid token'});
   }

}

module.exports = validateToken;
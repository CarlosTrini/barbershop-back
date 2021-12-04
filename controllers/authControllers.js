const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
// require('dotenv').config({path: '.env'});
require('dotenv').config();
const clientModel = require('../models/clientModel');

//+++++++++++++++++++++++++++++++++++++ LOGIN 
const login = async (req, res) => {
 
   //check if this client exists
   let clientExists = null;
   try {
      clientExists = await clientModel.findOne({ email: req.body.email });
   } catch (error) {
      console.log(error, 'linea 15')
      return res.status(400).json({ error: true, msg: 'Something was wrong, try again later' });
   }

   //if the client doesn't exist
   if (!clientExists) {
      return res.status(200).json({ error: true, msg: 'This client does not exist' });
   }

   //compare passwords 
   let passwordValid = null;
   try {
      passwordValid = await bcryptjs.compare(req.body.password, clientExists.password);
   } catch (error) {
      return res.status(200).json({ error: true, msg: 'Check your email or your password' });
   }
   
   //if password is not correct
   if (!passwordValid) {
      return res.status(200).json({ error: true, msg: 'Check your email or your password' });
   }

   //if password is correct
   //create JWT
   
   const payload = {
      idUser: clientExists._id,
      user: clientExists.user,
      role: clientExists.role
   }
   jwt.sign(
      payload,
      process.env.SECRET_WORD_JWT,
      {
         expiresIn: "1d"
      },
      function(error, token) {
       if(error){
         console.log(error, 'linea 53')
       }
         return error 
         ? res.status(400).json({error:true, msg: 'Something was wrong, try again later'})
         : res.status(200).json({error: false, msg: {token, user: clientExists.user, role: clientExists.role, id: clientExists._id}})
      }
   );


}





//+++++++++++++++++++++++++++++++++REGISTER
const register = async (req, res) => {

   //check if password and passwordConfirm are the same
   if (req.body.password !== req.body.passwordConfirm) {
      return res.json({ error: true, msg: 'Your passwords are not the same' });
   }

   //check if email already exists
   let clientExists = null;
   try {
      clientExists = await clientModel.findOne({ email: req.body.email });
   } catch (error) {
      return res.status(400).json({ error: true, msg: 'Something was wrong, try again later' });
   }
   if (clientExists) {
      return res.status(400).json({ error: true, msg: 'This user already exists' });
   }

   //if the email doesn't exists...
   try {
      //hash the password
      const hash = await bcryptjs.hash(req.body.password, 10);
      req.body.password = hash;
      //create user
      const newClient = new clientModel(req.body);
      //save user
      await newClient.save();
      return res.status(200).json({ error: false, msg: 'The user was created' });
   } catch (error) {
      return res.status(400).json({ error: true, msg: 'Something was wrong, try again later' });
   }
}


module.exports = {
   login,
   register
}



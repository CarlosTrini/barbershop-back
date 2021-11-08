const mongoose = require('mongoose');

//model to register clients
const clientSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   user: {
      type: String,
      required: true,
      trim: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   password: {
      type: String,
      required: true,
      trim: true
   },
   createAt: {
      type: Date,
      default: Date.now
   },
   role: {
      type: String,
      default: 'client'
   }
});

const clientModel = mongoose.model('client', clientSchema, 'clients');
module.exports = clientModel;
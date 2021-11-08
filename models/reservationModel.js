const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
   idclient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'client',
      required: true
   },
   nameservice: {
      type: String,
      required: true,
   },
   price:{
      type: Number,
      required: true
   },
   category:{
      type:String,
      required: true
   },
   date: {
      type: Date,
      required: true,
      trim: true
   },
   hour: {
      type: String,
      required: true,
      trim: true
   }
});

const reservationModel = mongoose.model('reservation', reservationSchema, 'reservations');
module.exports = reservationModel;
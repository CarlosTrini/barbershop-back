const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
   service: {
      type:String,
      trim:true,
      required: true
   },

   price: {
      type: Number,
      required: true
   },
   category: {
      type: String,
      require: true
   }
});

const serviceModel = mongoose.model('service', serviceSchema, 'services');
module.exports = serviceModel;
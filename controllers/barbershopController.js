const { validationResult } = require('express-validator');
const serviceModel = require('../models/serviceModel');


//++++++++++++++++++++++++++++++++++++++++++++++++++ GET SERVICES
const getServices = async (req, res) => {
   const currentUser = req.currentUser; //data token currentUser
   try {
      const services = await serviceModel.find();
      return res.status(200).json({ error: false, currentUser, msg: services });
   } catch (error) {
      return res.status(500).json({ error: true, msg: 'Something was wrong. Try again later' });
   }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++ GET SERVICES BY CATEGORY
const getServiceByCategory = async (req, res) => {
   const categoryService = req.params.category;


   //check if category is in the params
   if (!categoryService) {
      return res.status(400).json({ error: true, msg: 'There is not category' });
   }

   // if there is category
   try {
      const service = await serviceModel.findOne({ category: categoryService });
      return res.status(200).json({ error: false, msg: service });
   } catch (error) {
      return res.status(500).json({ error: true, msg: 'Something was wrong. Try again later' });
   }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++ADD SERVICE
const addService = async (req, res) => {
   try {
      const newService = new serviceModel(req.body);
      const created = await newService.save();
      return res.status(200).json({ error: false, msg: 'The service was created', created });
   } catch (error) {
      return res.status(500).json({ error: true, msg: 'Something was wrong. Try again later' });
   }
}

//+++++++++++++++++++++++++++++++++++++DELETE SERVICE
const deleteService = async (req, res) => {
   const idService = req.params.id;

   console.log(idService);
   //check if the id is in the params
   if (!idService) return res.status(400).json({ error: true, msg: 'There is not id' });

   try {
      await serviceModel.findByIdAndRemove({ _id: idService });
      res.status(200).json({ error: false, msg: 'The service was deleted' });
   } catch (error) {
      return res.status(500).json({ error: true, msg: 'Something was wrong. Try again later' });
   }


}
//++++UPDATE SERVICE
const updateService = async (req, res) => {
   const serviceUpdate = req.body;

   //get service to update
   let serviceDb = null;
   try {
      serviceDb = await serviceModel.findById({ _id: req.body.id });
   } catch (error) {
      return res.status(400).json({ error: true, msg: 'This service does not exist' });
   }


   //if the service exist
   try {
      const serviceNow = await serviceModel.findByIdAndUpdate({_id: serviceDb._id}, serviceUpdate);
      return res.status(200).json({error: false, msg: serviceNow});
   } catch (error) {
      return res.status(500).json({ error: true, msg: 'Something was wrong. Try again later' });
   }
}



module.exports = {
   getServices,
   getServiceByCategory,
   addService,
   updateService,
   deleteService
}
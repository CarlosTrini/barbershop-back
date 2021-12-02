const reservationModel = require('../models/reservationModel');
const serviceModel = require('../models/serviceModel');
const clientModel = require('../models/clientModel');


// ++++++++++++++++++++ADD RESERVATION
const addReservation = async (req, res) => {
   const service = req.body;
   service.idclient = req.currentUser.idUser;

   let clientExists = null;
   //check if client exists
   try {
      clientExists = await clientModel.findById({ _id: service.idclient });
   } catch (error) {
      console.log(error);
      return res.status(400).json({ error: true, msg: 'Somthing was wrong' });
   }

   // if there is not client
   if (!clientExists) return res.status(400).json({ error: true, msg: 'Client not found' });

   // else ...
   try {
      const client = new reservationModel(service);
      await client.save();
      return res.status(200).json({ error: false, msg: 'The reservation was created' });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, msg: 'Something was wrong, try again later' });
   }
}


//++++++++++++++++++++ GET_BY_USER RESERVATIONS  USER ACTION
const getByUserReservations = async (req, res) => {
   const idParam = req.params.id;
   //check if idParam and req.currentUser.idUser(token sign) are the same

   if (idParam !== req.currentUser.idUser) return res.status(400).json({ error: true, msg: 'Incorrect Id. Unathorized action' });

   // get client reservations
   try {
      const services = await reservationModel.find({ idclient: idParam }).sort({ date: -1 });
      if (services.length < 1) {
         return res.status(200).json({ error: false, msg: 'No reservations yet' });
      }
      return res.status(200).json({ error: false, msg: services })
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, msg: 'Something was wrong, try again later' });
   }
}

//++++++++++++++++++++ GET_BY_DATE RESERVATIONS ADMIN ACTION
const getByDateReservations = async (req, res) => {
   const {date} = req.params;

   // get  reservations by date
   try {
      const dates = await reservationModel.find({ date: date });
      if (dates.length < 1) {
         return res.status(200).json({ error: false, msg: [] });
      }
      return res.status(200).json({ error: false, msg: dates })
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, msg: 'Something was wrong, try again later' });
   }
}
//++++++++++++++++++++ DELETE RESERVATION ADMIN AND USER ACTION
const deleteReservation = async (req, res) => {
   const idReservation = req.params.id;
   const {idUser} = req.currentUser;
   const {role} = req.currentUser;

   //check if id exists
   if(!idReservation) return res.status(400).json({error: true, msg: 'There is not id'});

   //else
   if(role !== 'admin'){
      try{

         //check if reservation exists
         const reservationExists = await reservationModel.findById({_id: idReservation});

         if(!reservationExists) return res.status(400).json({error: true, msg: 'This reservation does not exists'});

         //compare if iduser is the same in the reservation.idClient
         const idClientReservation = await reservationModel.findById({_id: idReservation}, {idclient});

         if(idUser !== idClientReservation) return res.status(400).json({error: true, msg: 'Unauthorized'});

         // if reservation exists && id are the same
         await reservationModel.findByIdAndRemove({_id: idReservation});
         return res.status(200).json({error: false, msg: 'The reservation was deleted'});


      }catch(error){
         return res.status(400).json({msg: 'Something was wrong. Try again later'});
      }
   }else{
      try {
         await reservationModel.findByIdAndRemove({_id: idReservation});
         return res.status(200).json({error: false, msg: 'The reservation was deleted'});
      } catch (error) {
         return res.status(400).json({msg: 'Something was wrong. Try again later'});
      }
   }
}


module.exports = {
   addReservation,
   getByUserReservations,
   getByDateReservations,
   deleteReservation
}
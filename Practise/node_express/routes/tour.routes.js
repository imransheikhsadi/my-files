const express = require('express');
const controllers = require('./../controllers/tour.controllers');


const router = express.Router();

router.route('/')
   .get(controllers.getAllTour)
   .post(controllers.createTour)

router.route('/:id')
    .get(controllers.getTour)
    .patch(controllers.updateTour)
    .delete(controllers.deleteTour)

module.exports = router;
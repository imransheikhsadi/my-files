const express = require('express');
const controllers = require('../controllers/tour.controller');
const authControlers = require('../controllers/auth.controller');


const router = express.Router();

// router.param('id',controllers.checkID)

router.route('/')
   .get(authControlers.protect,controllers.getAllTour)
   .post(controllers.createTour);

router.route('/stats').get(controllers.tourStats);  
router.route('/busy-month/:year').get(controllers.busyMonth);  

router.route('/:id')
    .get(controllers.getTour)
    .patch(controllers.updateTour)
    .delete(authControlers.protect,authControlers.restrictTo('admin'),controllers.deleteTour)

module.exports = router;
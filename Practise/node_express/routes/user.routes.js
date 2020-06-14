const express = require('express');

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.patch('/update-password', authController.protect,authController.updatePassword);
router.patch('/update-me', authController.protect,userController.updateMe);
router.delete('/delete-me', authController.protect,userController.deleteMe);


router.route('/')
   .get(userController.getUsers);
//    .post(controllers.createTour);


module.exports = router;
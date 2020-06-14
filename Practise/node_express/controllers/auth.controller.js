const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require("../models/user.model");
const catchAsync = require('../utils/catch.async.error');
const AppError = require('../utils/app.error');
const sendMail = require('../utils/email');
const crypto = require('crypto');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
});


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError('Incorrect Email or Password', 401));
    }

    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });
});


exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return next(new AppError('Please Login to access this route', 401));

    // process.env.NODE_ENV = 'production'
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id).select('+password');
    if (!currentUser) return next(new AppError('User Doesnt exist please Sign Up', 401));
    //Tocken validition check

    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) => {

    return (req, res, next) => {
        //Check if the user have permission
        console.log(roles, req.user.role);

        if (!roles.includes(req.user.role)) {
            return next(new AppError('You Dont have the permission', 403));
        }


        next();
    }
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(new AppError('Invalid Email', 404));

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;
    const message = `Forgot Password , Create a new\n Link: ${resetUrl}`;

    try {
        await sendMail({
            email: user.email,
            subject: 'Password rset token {valid for 10min}',
            message
        });

        res.status(200).json({
            status: 'success',
            messsage: 'Token sent to email'
        });
    } catch (error) {

        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new AppError('There was an error sendeing email', 500));
    }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) return next(new AppError('Token is Invalid or Expired', 400));

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();


    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });
});


exports.updatePassword = catchAsync(async (req, res, next) => {
    const { user ,body: { password, newPassword, newConfirmPassword }} = req;

    if (!await user.correctPassword(password, user.password)) {
        return next(new AppError('Incorrect Password', 401));
    }

    user.password = newPassword;
    user.confirmPassword = newConfirmPassword;
    await user.save();

    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });
});
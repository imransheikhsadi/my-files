const AppError = require("../utils/app.error");
const mongoose = require('mongoose');

const handleCastErrorDB = (err)=>{
    const message = `Invalid ${err.path}:${err.value}`;
    return new AppError(message,400);
};

const handleSameFieldErrorDB = (err)=>{
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `Try another ${field} rather than '${value}'`;
    return new AppError(message,400);
}

const handleValidationErrorDB = (err)=>{
    const errors = Object.values(err.errors);
    const message = errors.map(({properties:{message}}) => message).join('. ');
    return new AppError(message,400);
}

const handleJwtError = ()=>{
    const message = 'Invalid Token!'
    return new AppError(message,401);
}

const handleJwtExpired = ()=>{
    const message = 'Expired Token!'
    return new AppError(message,401);
}

const sendErrDev = (err,res)=>{
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    });
}
const sendErrProd = (err,res)=>{
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }else{
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong!'
        })
    }
}


// Global Error Handler
module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if( process.env.NODE_ENV === 'development'){
        sendErrDev(err,res);
    }else if( process.env.NODE_ENV === 'production'){
        let error = {...err};
            error.message = err.message;
        if(err instanceof mongoose.Error.CastError) error = handleCastErrorDB(err);
        if(err instanceof mongoose.Error.ValidationError) error = handleValidationErrorDB(err);
        if(err.name === 'JsonWebTokenError') error = handleJwtError();
        if(err.name === 'TokenExpiredError') error = handleJwtExpired();
        if(error.code === 11000) error = handleSameFieldErrorDB(err) ;
        sendErrProd(error,res);
        
    }
};
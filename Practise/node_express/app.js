const express = require('express');
const tourRoutes = require('./routes/tour.routes');
const userRoutes = require('./routes/user.routes');
const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/app.error');


const app = express();

app.use(express.json());


// Routes
app.use('/api/v1/tours',tourRoutes);
app.use('/api/v1/users',userRoutes);

app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

app.use(globalErrorHandler);








module.exports = app;


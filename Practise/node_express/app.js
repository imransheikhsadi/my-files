const express = require('express');
const tourRoutes = require('./routes/tour.routes');


const app = express();

app.use(express.json());
app.use((req,res,next)=>{
    console.log('This is a request response MiddleWere');
    next();
});


// Routes
app.use('/api/v1/tours',tourRoutes);






module.exports = app;


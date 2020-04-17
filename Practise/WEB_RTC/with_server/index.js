const express = require('express');
const socket = require('socket.io');

// App setup
const app       = express();
const server    = app.listen(3000,()=>{
    console.log('Listening for the port 3000');
});

// Static files
app.use(express.static('public'));


// Socket setup
const io = socket(server);
io.on('connection',(socket)=>{
    console.log('Made Socket Connection',socket.id);
})
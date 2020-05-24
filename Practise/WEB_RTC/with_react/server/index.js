// const express = require('express');
const io = require('socket.io')(3002);

// App Setup



// users
const users = {}
const nameList = []


//Static Files



io.on('connection',(connection)=>{
    // When a new user connect to the server 
    console.log('A new user Added');

    // ON Add user 
    connection.on('addUser',(data)=>{
        console.log('This part was Executed');
        
        if (users[data.name]) {
            connection.emit('addUser',{success: false})
        }else{
            users[data.name] = connection; 
            connection.name = data.name;
            connection.emit('addUser',{success: true})
            nameList.push(data.name);
            connection.emit('userlist',{nameList})
        }
    });

    // ON Offer
    connection.on('offer',(data)=>{
        console.log('Sending offer to'+data.name);
        let conn = users[data.name];

        if (conn != null) {
            connection.otherName = data.name;
            conn.emit('offer',{name: connection.name, offer: data.offer})
        }
    })

    // On answer
    connection.on('answer',(data)=>{
        console.log('Sending answer to'+data.name);
        let conn = users[data.name];

        if (conn != null) {
            connection.otherName = data.name;
            conn.emit('answer',{answer: data.answer});
        }
    })

    // On Candidate
    connection.on('candidate',(data)=>{
        console.log('Sending Candidate to '+data.name);
        let conn = users[data.name];

        if (conn != null) {
            conn.emit('candidate',{candidate: data.candidate})
        }
    })

    
})



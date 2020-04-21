const io = require('socket.io')(4000);
console.log('Signaling Server started on port 3002');

const users = {}
const userList = []

io.on('connection',(socket)=>{
    console.log('New User Connected');


    // On AddUser
    socket.on('addUser',({name})=>{
        if (users[name]) {
            socket.emit('addUser',{success: false})
        }else{
            users[name] = socket; 
            socket.name = name;
            socket.emit('addUser',{success: true});
            userList.push({name,id: socket.id})
            io.emit('userlist',{userList});
        }
    });

   

    // On answer
    socket.on('answer',(data)=>{
        console.log('Sending answer to'+data.name);
        console.log(data);
        
        let conn = users[data.name];

        if (conn != null) {
            socket.otherName = data.name;
            conn.emit('answer',{answer: data.answer});
        }
    });

    // On Candidate
    socket.on('candidate',(data)=>{
        console.log('Sending Candidate to '+data.name);
        let conn = users[data.name];

        if (conn != null) {
            conn.emit('candidate',{candidate: data.candidate})
        }
    });

    // connectOffer
    socket.on('connectOffer',({name})=>{
        console.log('sending connect offer');
        let conn = users[name];

        if (conn != null) {
            conn.emit('connectOffer',{name: socket.name});
        }
    });

     // ON Offer
     socket.on('offer',(data)=>{
        console.log('Sending offer to'+data.name);
        let conn = users[data.name];

        if (conn != null) {
            conn.emit('offer',{name: socket.name, offer: data.offer})
        }
    });


});
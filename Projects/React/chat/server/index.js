const io = require('socket.io')(3001);
console.log('Signaling Server started on port 3002');

let users = {}
let userList = []

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
            updateUserList();
            io.emit('userlist',{userList});
        }
    });

   

    // On answer
    socket.on('answer',(data)=>{
        console.log('Sending answer to'+data.name);
        socket.otherName = data.name;
        
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
        socket.otherName = data.name;
        let conn = users[data.name];
        if (conn != null) {
            conn.emit('offer',{name: socket.name, offer: data.offer})
        }
    });

    // on Audio Request
    socket.on('audio',({name})=>{
        let conn = users[name];

        if (conn != null) {
            conn.emit('audio',{name: 'audioOffer'});
        }
    })

    socket.on('disconnect',(data)=>{
        if (socket.name) {
           if (socket.otherName) {
               console.log(socket.otherName);
               console.log(socket.name);
               
               
            let conn = users[socket.otherName];
            if (conn != null) {
                conn.emit('clientDisconnect',{name: socket.name});
            }
           }

           delete users[socket.name];
            updateUserList();
            io.emit('userlist',{userList});
        }
    })

    const updateUserList = ()=>{
        let names = Object.keys(users);
        let list = []
        names.forEach(name=>{
            list.push({name: name, id: users[name].id})
        });

        userList = list;
        
    }
});

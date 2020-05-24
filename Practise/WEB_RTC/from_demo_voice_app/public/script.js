// Selectors and global variables
const connectBtn = document.querySelector('.connect');
const nameInput = document.querySelector('.name');
const localAudio = document.querySelector('#localAudio');
const remoteAudio = document.querySelector('#remoteAudio');
const remoteReciver = document.querySelector('.remote_reciver');
const callBtn = document.querySelector('.callBtn');
const userList = document.querySelector('.users');

let connectionStatus;
let connectedUser;
let stream;
let pc;
let me;


let socket = io.connect('https://64bdc5af.ngrok.io/');


socket.on('connect', () => {
    alert('connected');
    connectionStatus = true;
});


connectBtn.addEventListener('click', (event) => {
    if (nameInput.value && connectionStatus) {
        me = nameInput.value;
        console.log(nameInput.value);
        socket.emit('addUser', { name: nameInput.value })
    }
})


// On AddUser Client Side
socket.on('addUser', (data) => {

    if (data.success) {
        nameInput.value = '';
        connectBtn.disabled = true;
        nameInput.disabled = true;
        console.log('User Added Successfully!!');
        // console.log(data.allUser);


        //--------------------------------//
        // Start Peer Connection From Here//
        //--------------------------------//

        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            .then((myStream) => {
                stream = myStream;

                // localAudio.srcObject = stream;
                console.log(stream);


                //using Google public stun server 
                var configuration = {
                    "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
                };

                // Local Peer connection init
                pc = new RTCPeerConnection(configuration);

                // Setup Stream Listeinng
                stream.getTracks().forEach(track => {
                    pc.addTrack(track, stream)
                });
                // pc.addTrack('track',stream);
                // console.log('stream is added to the track');

                // When a remote user add stream to the peer connection , we display it
                pc.ontrack = (event) => {
                    console.log('ontrack was called');
                    console.log(event.stream);

                    remoteAudio.srcObject = event.streams[0]
                }

                // Setup ICE handleing
                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('candidate', {
                            name: remoteReciver.value,
                            candidate: event.candidate
                        })
                    }
                }
            })


    } else {
        alert('Please Use a Unique User Name')
    }
})




// On answer Client Side
socket.on('answer', ({ answer }) => {
    pc.setRemoteDescription(new RTCSessionDescription(answer))
})


// On Candidate Client Side
socket.on('candidate', ({ candidate }) => {
    pc.addIceCandidate(new RTCIceCandidate(candidate));
})

// Initialize a call
callBtn.addEventListener('click', (event) => {
     // Get receiver name;
     let connectedUser = remoteReciver.value;
     if (connectedUser.length > 0) {
         // Create an offer
         pc.createOffer().then((offer) => {
 
             // Send The offer to the server
             socket.emit('offer', {
                 name: connectedUser,
                 offer: offer
             });
 
             pc.setLocalDescription(offer);
         }).catch(() => { console.log('Error creating offer') })
     }
});

// When Someone send us an offer -- receive offer and send answer
socket.on('offer', ({ name, offer }) => {
    connectedUser = name;
    pc.setRemoteDescription(new RTCSessionDescription(offer));

    // Create an answer to an offer 
    pc.createAnswer().then((answer) => {
        pc.setLocalDescription(answer)

        // Send answer to offer creator
        socket.emit('answer', { name: connectedUser, answer: answer });
    }).catch(() => { console.log('Error creating Answer') })
});


socket.on('userlist', ({ nameList }) => {
    if (nameList.length > 0) {
        nameList.forEach(name => {
            if (name !== me) {
                const markUp = `<button onClick="offer('${name}')">Call ${name}<button>`;
                userList.insertAdjacentHTML('beforeend',markUp)
            }
        })
    }
})

function offer(name) {
    // Get receiver name;
    let receiverName = name
    if (receiverName.length > 0) {
        connectedUser = receiverName;

        // Create an offer
        pc.createOffer().then((offer) => {

            // Send The offer to the server
            socket.emit('offer', {
                name: connectedUser,
                offer: offer
            });

            pc.setLocalDescription(offer);
        }).catch(() => { console.log('Error creating offer') })
    }
}

//Global Variables
let connectButton = null;
let diconnectButton = null;
let sendButton = null;
let inpputField = null;
let massageField = null;


let localConnection = null;
let remoteConnection = null;

let sendChannel = null;
let receiveChannel = null;

window.addEventListener('load',()=>{
    //Select Fields
    connectButton = document.querySelector('.connect');
    diconnectButton = document.querySelector('.disconnect');
    sendButton = document.querySelector('.send');
    inpputField = document.querySelector('.input');
    massageField = document.querySelector('.massage');


    //EventListeners
    connectButton.addEventListener('click',connectPeers,false);
    diconnectButton.addEventListener('click',disconnectPeers,false);
    sendButton.addEventListener('click',sendMassage,false);

})

const connectPeers = (event) => {
    // Create Local connection adn ites eventlisteners
    localConnection = new RTCPeerConnection({ 
        iceServers: [
        {
          urls: "http://192.168.0.111:3000"
        }
      ]});

        // Create send datachannel and eventlistener
        sendChannel = localConnection.createDataChannel('sendCheannel');
        sendChannel.onmessage = handleReceiveMessage;
        // console.log(sendChannel);
        
        // sendChannel.onopen = handlSendChannelStatus;
        // sendChannel.onclose = handlSendChannelStatus;



    // Create remote connection adn ites eventlisteners
    remoteConnection = new RTCPeerConnection();
    remoteConnection.ondatachannel = receiveChannelCallback;


    // Setup the ICE candidates for two Peers
    localConnection.onicecandidate = e => {
        console.log(e.candidate);
        return !e.candidate || remoteConnection.addIceCandidate(e.candidate)
    }

    remoteConnection.onicecandidate = e => {
        // console.log(e.candidate);
        return !e.candidate || localConnection.addIceCandidate(e.candidate)
    }

    //Create offer and connect
    localConnection.createOffer()
    .then((offer)=> localConnection.setLocalDescription(offer))
    .then(()=> remoteConnection.setRemoteDescription(localConnection.localDescription))
    .then(()=> remoteConnection.createAnswer())
    .then((answer)=> remoteConnection.setLocalDescription(answer))
    .then(()=> localConnection.setRemoteDescription(remoteConnection.localDescription))
    .catch(()=> console.log('Error in offer and connect'))
}

const disconnectPeers = (event) => {
    // console.log(event);
}

const sendMassage = (event) => {
    let msg = inpputField.value;
    
    sendChannel.send('FROM.Local:'+msg);

    inpputField.value = "";
    inpputField.focus();
}



const receiveChannelCallback = (event)=>{
    // console.log(event.channel);
    
    receiveChannel = event.channel;
    receiveChannel.onmessage = handleReceiveMessage;
   
}

const handleReceiveMessage = (event)=> {
    console.log(event.data);
}
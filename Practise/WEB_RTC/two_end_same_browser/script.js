//Global Variables
let connectButton = null;
let diconnectButton = null;
let sendButton = null;
let inpputField = null;
let massageField = null;

let remote_connectButton = null;
let remote_diconnectButton = null;
let remote_sendButton = null;
let remote_inpputField = null;
let remote_massageField = null;

let localConnection = null;
let remoteConnection = null;

let sendChannel = null;
let remote_sendChannel = null;
let receiveChannel = null;
let remote_receiveChannel = null;

window.addEventListener('load',()=>{
    //Select Fields
    //local
    connectButton = document.querySelector('.connect');
    diconnectButton = document.querySelector('.disconnect');
    sendButton = document.querySelector('.send');
    inpputField = document.querySelector('.input');
    massageField = document.querySelector('.massage');
    //Remote
    // remote_connectButton = document.querySelector('.remote_connect');
    // remote_diconnectButton = document.querySelector('.remote_disconnect');
    remote_sendButton = document.querySelector('.remote_send');
    remote_inpputField = document.querySelector('.remote_input');
    remote_massageField = document.querySelector('.remote_massage');

    //EventListeners
    //local
    connectButton.addEventListener('click',connectPeers,false);
    diconnectButton.addEventListener('click',disconnectPeers,false);
    sendButton.addEventListener('click',sendMassage,false);
    //remote
    // connectButton.addEventListener('click',connectPeers,false);
    // diconnectButton.addEventListener('click',disconnectPeers,false);
    remote_sendButton.addEventListener('click',remote_sendMassage,false);
})

const connectPeers = (event) => {
    // Create Local connection adn ites eventlisteners
    localConnection = new RTCPeerConnection();

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

const remote_sendMassage = (event) => {
    let msg = remote_inpputField.value;
    
    receiveChannel.send('FROM.Remote:'+msg);

    remote_inpputField.value = "";
    remote_inpputField.focus();
}

const receiveChannelCallback = (event)=>{
    // console.log(event.channel);
    
    receiveChannel = event.channel;
    receiveChannel.onmessage = handleReceiveMessage;
   
}

const handleReceiveMessage = (event)=> {
    console.log(event.data);
}


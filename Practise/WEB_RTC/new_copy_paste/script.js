
const pc = new RTCPeerConnection();
const dc = pc.createDataChannel("chat",{negotiated: true,id:1});
const log = msg => div.innerHTML += `<br>${msg}`;
dc.onopen = () => chat.select();
dc.onmessage = e => log(`> ${e.data}`);
pc.oniceconnectionstatechange = e => log(pc.iceConnectionState);

send.addEventListener('click',(e)=> {
    dc.send(chat.value);
    log(chat.value);
    chat.value = "";
})
console.log(dad);

async function createOffer() {
    button.disabled = true;
    await pc.setLocalDescription(await pc.createOffer());
    pc.onicecandidate = ({ candidate }) => {
        if (candidate) return;
        offer.value = pc.localDescription.sdp;
        offer.select();
        answer.placeholder = "Paste answer here";
    };
}

offer.onkeypress = async function (e) {
    if (e.keyCode != 13 || pc.signalingState != "stable") return;
    button.disabled = offer.disabled = true;
    await pc.setRemoteDescription({ type: "offer", sdp: offer.value });
    await pc.setLocalDescription(await pc.createAnswer());
    pc.onicecandidate = ({ candidate }) => {
        if (candidate) return;
        answer.focus();
        answer.value = pc.localDescription.sdp;
        answer.select();
    };
};

answer_submit.addEventListener('click',(e) =>{
    if (pc.signalingState != "have-local-offer") return;
    answer.disabled = true;
    pc.setRemoteDescription({ type: "answer", sdp: answer.value });
})
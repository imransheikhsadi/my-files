import React, { useState, useEffect } from 'react';
import './dashboard-style.scss';
import ChatBox from '../chat_box/chat-box';
import UsersPanel from '../users_panel/user-panel';
import { socket } from '../../App';




function Dashboard({ me }) {
    const [connectedUser, setConnectedUser] = useState(null);
    const [dataChannel,setDataChannel]  = useState(null);
    const [pc,setPc]    = useState(null);


    useEffect(()=>{
        socket.on('offer',({name,offer})=>{
            setConnectedUser(name);
            const pc = new RTCPeerConnection();
            setPc(pc);
            console.log(name);
            window.pc = pc;
            

            pc.ondatachannel = (event)=>{
                setDataChannel(event.channel);
            }

            pc.setRemoteDescription( new RTCSessionDescription(offer)); 
            
            pc.createAnswer().then((answer)=>{
                pc.setLocalDescription(answer);
                socket.emit('answer',{name: name, answer: answer})
            })

        });

        socket.on('answer',({answer})=>{
            if (pc) {
                pc.setRemoteDescription( new RTCSessionDescription(answer));
            }
            console.log();
            
        });

        socket.on('candidate',({candidate})=>{
            if (pc) {
                pc.addIceCandidate( new RTCIceCandidate(candidate)); 
            }
        });
    });

    function connectToUser(name, id) {
        setConnectedUser(name);

        const pc = new RTCPeerConnection();
        setPc(pc);
        window.pc = pc;


        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('candidate', {
                    name: name,
                    candidate: event.candidate
                })
            }
        };

        setDataChannel(pc.createDataChannel('data'));
        console.log(name);
        

        pc.createOffer().then((offer)=>{
            pc.setLocalDescription(offer);

            socket.emit('offer',{name: name, offer: offer});
        });    

    }

    

    return (
        <div className="dashboard">
            {connectedUser ?
                <ChatBox dataChannel={dataChannel} connectedUser={connectedUser}/> :
                <UsersPanel
                    connectToUser={connectToUser}
                    me={me}
                />
            }
        </div>
    )
}

export default Dashboard;

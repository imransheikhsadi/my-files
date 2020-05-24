import React, { useState, useEffect, useCallback, useRef } from 'react';
import './dashboard-style.scss';
import ChatBox from '../chat_box/chat-box';
import UsersPanel from '../users_panel/user-panel';
import { socket } from '../../App';
import Voice from '../voice_call/voice';




function Dashboard({ me }) {
    const [connectedUser, setConnectedUser] = useState(null);
    const [dataChannel, setDataChannel] = useState(null);
    const [pc, setPc] = useState(new RTCPeerConnection());
    const [voice, setVoice] = useState(null);




    useEffect(() => {
        socket.on('offer', ({ name, offer }) => {
            setConnectedUser(name);
            console.log(name);
            window.pc = pc;


            pc.ondatachannel = (event) => {
                setDataChannel(event.channel);
                console.log(event);

            }

            if (pc.currentRemoteDescription == null) {
                pc.setRemoteDescription(new RTCSessionDescription(offer));
            }
            if (pc.localDescription == null) {
                pc.createAnswer().then((answer) => {
                    pc.setLocalDescription(answer);
                    socket.emit('answer', { name: name, answer: answer })
                });
            }

        });

        socket.on('answer', ({ answer }) => {
            if (pc.currentRemoteDescription == null) {
                pc.setRemoteDescription(new RTCSessionDescription(answer));
            }
        });

        socket.on('candidate', ({ candidate }) => {
            if (pc) {
                pc.addIceCandidate(new RTCIceCandidate(candidate));
            }
        });

       

    });


    useEffect(() => {
        socket.on('clientDisconnect', ({ name }) => {
            if (name === connectedUser) {
                setConnectedUser(null);
                let newPc = new RTCPeerConnection();
                setPc(newPc);
            }
        })
    }, [connectedUser]);

    useEffect(()=>{
        socket.on('audio',()=>{
            setVoice(true);
        })
    })

  

    function initVoice(value) {
        setVoice(value);
        socket.emit('audio',{name: connectedUser})
    }


    function connectToUser(name, id) {
        setConnectedUser(name);


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

        pc.ontrack = (event) => {
            
            console.log(event);
        }
        pc.onaddtrack = (event) => {
            
            console.log(event);
        }

      
        setDataChannel(pc.createDataChannel('data'));


        pc.createOffer().then((offer) => {
            pc.setLocalDescription(offer);

            socket.emit('offer', { name: name, offer: offer });
        });

    }




    return (
        <div className="dashboard">
            {connectedUser ?
                <ChatBox
                    dataChannel={dataChannel}
                    connectedUser={connectedUser}
                    initVoice={initVoice}
                    voice={voice}
                /> :
                <UsersPanel
                    connectToUser={connectToUser}
                    me={me}
                />
            }
            {voice && <Voice pc={pc}/>}

        </div>
    )
}

export default Dashboard;

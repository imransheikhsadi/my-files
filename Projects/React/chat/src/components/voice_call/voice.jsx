import React, { useRef, useEffect, useCallback } from 'react';
import './voice-style.scss';

function Voice({ pc }) {
    const refLocalAudio = useRef(null);
    const refRemoteAudio = useRef(null);

    useEffect(()=>{
     
    },[])

    useEffect(() => {

       

        if (refRemoteAudio) {
            pc.restartIce()
            navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
                stream.getTracks().forEach(track => {
                    pc.addTrack(track, stream);
                    console.log(stream);
                    
                });
            }).catch((err) => { console.log(err) })
        }

        
    }, [refRemoteAudio,pc]);



    return (
        <div className="voice">
            <div className="voice__container">
                <h1>Call To the user</h1>
                <audio ref={refLocalAudio} id="localAudio" controls autoPlay></audio>
                <audio ref={refRemoteAudio} id="remoteAudio" controls autoPlay></audio>
            </div>
        </div>
    )
}

export default Voice;

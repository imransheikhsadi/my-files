import React, { useEffect, useState } from 'react';
import './chat-box-style.scss';

function ChatBox({ dataChannel, connectedUser }) {

    const [message,setMessage]  = useState('');

    useEffect(()=>{
        if (dataChannel) {
            dataChannel.onmessage = handleMessage
        }
    },[dataChannel])

    function handleMessage(event) {
        console.log(event);
    }

    function sendMessage(event) {
        dataChannel.send(message);
    }

    function textHandler(event) {
        const element = event.target;
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight + 10}px`;

        setMessage(element.value);  
    }
    return (
        <div className="chat__box">
            <div className="header">
                <h4 className="user__title">{connectedUser}</h4>
                <div className="icon__container">
                    <span className="material-icons"> call </span>
                    <span className="material-icons"> video_call </span>
                    <span className="material-icons"> tune </span>
                </div>
            </div>
            <div className="chat__container">
                <div className="massage__container">
                    <div className="massage massage-remote">
                        <span>
                            Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Asperiores, voluptate
                            corporis sunt possimus a fugiat obcaecati non perferendis magni
                            quos in quod voluptatem,
                            accusantium ipsam alias? Cumque commodi vel suscipit!
                        </span>
                    </div>
                    <div className="massage massage-local">
                        <span>
                            Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Asperiores, voluptate
                            corporis sunt possimus a fugiat obcaecati non perferendis magni
                            quos in quod voluptatem,
                            accusantium ipsam alias? Cumque commodi vel suscipit!
                        </span>
                    </div>
                </div>
                <textarea onChange={textHandler} placeholder="write your massage" ></textarea>
            </div>
            <div className="footer">
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatBox

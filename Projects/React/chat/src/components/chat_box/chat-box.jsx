import React, { useEffect, useState } from 'react';
import './chat-box-style.scss';

function ChatBox({ dataChannel, connectedUser, initVoice , voice}) {
    const [messageList,setMessageList] = useState([]);
    const [message,setMessage]  = useState('');

    useEffect(()=>{
        if (dataChannel) {
            dataChannel.onmessage = (event) => {
                setMessageList([...messageList,{message: event.data, id: event.timeStamp, me: false}]);   
            }
        }
    },[dataChannel,messageList])

   

    function sendMessage(event) {
        if (dataChannel.readyState) {
            dataChannel.send(message);
            setMessageList([...messageList,{message: message, id: event.timeStamp, me: true}]);
            setMessage('');
        }
    }

    function textHandler(event) {
        const element = event.target;
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight + 10}px`;

        setMessage(element.value);  
    }

    function handleVoice(event) {
        initVoice(true);
    }

    return (
        <div className={`chat__box ${voice && "blur"}`}>
            <div className="header">
                <h4 className="user__title">{connectedUser}</h4>
                <div className="icon__container">
                    <span className="material-icons" onClick={handleVoice}> call </span>
                    <span className="material-icons"> video_call </span>
                    <span className="material-icons"> tune </span>
                </div>
            </div>
            <div className="chat__container">
                <div className="massage__container">
                    {
                        messageList.map(({message,id,me})=>(
                            <div key={id} className={`message ${me ? "massage-local" : "massage-remote"}`}>
                                <span>{message}</span>
                                {console.log(message,id,me)}
                            </div>
                        ))
                    }
                </div>
                <textarea onChange={textHandler} value={message} placeholder="write your massage" ></textarea>
            </div>
            <div className="footer">
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatBox

import React from 'react';
import './chat-box-style.scss';

function ChatBox() {
    return (
        <div className="chat__box">
            <div className="header">
                <h4 className="user__title">Imran Sheikh</h4>
                <div className="icon__container">
                    <span class="material-icons"> call </span>
                    <span class="material-icons"> video_call </span>
                </div>
            </div>
            <div className="chat__container">Hi</div>
            <div className="footer">
                <input placeholder="Write Something" type="text"/>
            </div>
        </div>
    )
}

export default ChatBox

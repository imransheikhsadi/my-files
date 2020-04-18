import React from 'react';
import './dashboard-style.scss';
import ChatBox from '../chat_box/chat-box';

function Dashboard() {
    return (
        <div className="dashboard">
            <ChatBox/>
        </div>
    )
}

export default Dashboard;

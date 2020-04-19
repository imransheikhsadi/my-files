import React from 'react';
import './dashboard-style.scss';
import ChatBox from '../chat_box/chat-box';
import UsersPanel from '../users_panel/user-panel';

function Dashboard() {
    return (
        <div className="dashboard">
            {window.innerWidth > 900 && <UsersPanel/>}
            <ChatBox/>
        </div>
    )
}

export default Dashboard;

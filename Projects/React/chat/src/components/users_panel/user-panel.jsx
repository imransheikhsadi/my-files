import React, { useState, useEffect } from 'react';
import './user-panel-style.scss';
import { socket } from '../../App';

function UsersPanel({me,connectToUser}) {

    const [userList,setUserList] = useState([]);

    useEffect(()=>{
        socket.on('userlist',(data)=>{
            let fltData = data.userList.filter((item)=> item.name !== me);
            setUserList(fltData);
        });
    },[me]);

    return (
        <div className="wraper">
            <div className="users__panel">
                <div className="panel__container">
                    <header> Active Users</header>
                    <div className="users">
                        { userList.length > 0 ? userList.map(({name,id})=>{
                            return(
                                <div key={id} className="single--user" onClick={(event)=>{connectToUser(name,id)}}>
                                    <span className="material-icons user__icon"> face </span>
                                    <h4 className="user--name">{name}</h4>
                                    <span className="material-icons phone_chat"> perm_phone_msg </span>
                                </div>
                            )
                        }) : <h1> No User Found</h1>}
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default UsersPanel

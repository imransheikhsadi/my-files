import React from 'react';
import './user-panel-style.scss';

function UsersPanel(props) {
    return (
        <div className="wraper">
            <div className="users__panel">
                <div class="panel__container">
                    <header> Active Users</header>
                    <div class="users">
                        <div class="single--user">
                            <span class="material-icons user__icon"> face </span>
                            <h4 class="user--name">Imran Sheikh</h4>
                            <span class="material-icons"> perm_phone_msg </span>
                        </div>
                        <div class="single--user">
                            <span class="material-icons user__icon"> face </span>
                            <h4 class="user--name">Md Rauhan</h4>
                            <span class="material-icons"> perm_phone_msg </span>
                        </div>
                        <div class="single--user">
                            <span class="material-icons user__icon"> face </span>
                            <h4 class="user--name">John</h4>
                            <span class="material-icons"> perm_phone_msg </span>
                        </div>
                        <div class="single--user">
                            <span class="material-icons user__icon"> face </span>
                            <h4 class="user--name">Ahmed Reja Uddin Khan</h4>
                            <span class="material-icons"> perm_phone_msg </span>
                        </div>
                        <div class="single--user">
                            <span class="material-icons user__icon"> face </span>
                            <h4 class="user--name">Imran Sheikh</h4>
                            <span class="material-icons"> perm_phone_msg </span>
                        </div>
                        <div class="single--user">
                            <span class="material-icons user__icon"> face </span>
                            <h4 class="user--name">Md Rauhan</h4>
                            <span class="material-icons"> perm_phone_msg </span>
                        </div>
                        <div class="single--user">
                            <span class="material-icons user__icon"> face </span>
                            <h4 class="user--name">John</h4>
                            <span class="material-icons"> perm_phone_msg </span>
                        </div>
                        <div class="single--user">
                            <span class="material-icons user__icon"> face </span>
                            <h4 class="user--name">Ahmed Reja Uddin Khan</h4>
                            <span class="material-icons"> perm_phone_msg </span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default UsersPanel

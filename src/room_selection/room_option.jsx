import React from 'react';
import { useNavigate } from 'react-router-dom';

export function RoomOption({ name, count, disabled = false }) {
    const navigate = useNavigate();

    return (
        <div className="card room-selection-option">
            <span className="room-selection-option-title">Chat Room {name}</span>
            <div className="room-selection-option-user-count">
                <p>
                    <span><img src="icons/icons8-user-30.png" height="20px" /></span>
                    <span className="active-users-room-a">{count}</span>
                    <span> / 20</span>
                </p>
            </div>
            <a className={`btn btn-outline-primary${disabled?' disabled':''}`} onClick={() => {
                console.log(`navigating to /chatroom with state: ${name}`);
                navigate('/chatroom', {state: {room: name}});
            }} >{disabled?'Disabled':'Join'}</a>
        </div>
    )
}
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthState } from '../login/authState';
import { RoomOption } from './room_option';
import { LoadingBlocks } from '../loading/loading';

import './room_selection.css';

export function RoomSelection({ authState }) {
	const navigate = useNavigate();

	if (authState !== AuthState.Authenticated) {
		setTimeout(() => navigate('/'), 0);
		return <div style={{flexGrow: 1}}></div>;
	}

	const [userCountA, setUserCountA] = React.useState(0);
	const [userCountB, setUserCountB] = React.useState(0);
	const [userCountC, setUserCountC] = React.useState(0);
	const [userCountD, setUserCountD] = React.useState(0);

    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/count`);

    socket.onmessage = async (event) => {
        const message = JSON.parse(await event.data.text());
        setUserCountA(message.room_A_count);
        setUserCountB(message.room_B_count);
        setUserCountC(message.room_C_count);
        setUserCountD(message.room_D_count);
    };

	return (
		<main class="overflow-auto my-green">
			<div class="card" id="room-selection-window">
				<h3 class="form-title">Hello <span id="username">{localStorage.getItem('username')}</span>,</h3>
				<h3 class="form-title">Select a room to join</h3>
				<div id="room-selection-option-list">
					<RoomOption name={'A'} count={userCountA} disabled={false} />
					<RoomOption name={'B'} count={userCountB} disabled={true} />
					<RoomOption name={'C'} count={userCountC} disabled={true} />
					<RoomOption name={'D'} count={userCountD} disabled={true} />
				</div>
			</div>
		</main>
	);
}
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthState } from '../login/authState';
import { RoomOption } from './room_option';
import { LoadingBlocks } from '../loading/loading';

import './room_selection.css';

export function RoomSelection() {
	const navigate = useNavigate();

	const [userCountA, setUserCountA] = React.useState('?');
	const [userCountB, setUserCountB] = React.useState('?');
	const [userCountC, setUserCountC] = React.useState('?');
	const [userCountD, setUserCountD] = React.useState('?');
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		setLoading(true);

		(async () => {
			const response = await fetch('/api/check-login-cookie');
			if (!response.ok) {
				navigate('/');
			}
		})();
		
		const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
		let port = window.location.port;
		const socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/count`);
	
		socket.onmessage = async (event) => {
			const message = JSON.parse(await event.data.text());
			setUserCountA(message.room_A_count);
			setUserCountB(message.room_B_count);
			setUserCountC(message.room_C_count);
			setUserCountD(message.room_D_count);
			setTimeout(() => { setLoading(false); }, 100);
		};
	}, []);

	return (
		<main className="overflow-auto my-green">
			{loading && <LoadingBlocks />}
			<div className="card" id="room-selection-window">
				<h3 className="form-title">Hello <span id="username">{localStorage.getItem('username')}</span>,</h3>
				<h3 className="form-title">Select a room to join</h3>
				<div id="room-selection-option-list">
					<RoomOption name={'A'} count={userCountA} />
					<RoomOption name={'B'} count={userCountB} disabled={true} />
					<RoomOption name={'C'} count={userCountC} disabled={true} />
					<RoomOption name={'D'} count={userCountD} disabled={true} />
				</div>
			</div>
		</main>
	);
}
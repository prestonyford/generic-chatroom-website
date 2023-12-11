import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthState } from '../login/authState';
import { LoadingBlocks } from '../loading/loading';
import { MessagesContainer } from './messages_container';
import { GifContainer } from './gif_container';

import './chatroom.css';

// TODO: Make key the a unique id given by the server

export function Chatroom() {
	console.log("rendering");
	const navigate = useNavigate();
	const location = useLocation();

	const room = location.state.room;	
	const username = localStorage.getItem('username');

	// const countNotifierRef = React.useRef(null);

	// React.useEffect(() => {
	// 	countNotifierRef.current = new CountNotifier();
	// 	window.addEventListener('count_message_received', (e) => {
	// 		console.log(e.detail.message[room]);
	// 	})
	// }, []);

	function leave() {
		navigate('/room-selection');
	}

	return (
		<main id="chatroom-main">
			<div id="main-content">
				<div id="chatroom-left-window" className="bg-light">
					<GifContainer />
				</div>
				<div id="chatroom-middle-window">
					<MessagesContainer room={room} />
				</div>
				<div id="chatroom-right-window">

				</div>
			</div>
		</main>
	);
}
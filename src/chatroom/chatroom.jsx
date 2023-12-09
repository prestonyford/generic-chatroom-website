import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthState } from '../login/authState';
import { LoadingBlocks } from '../loading/loading';
import { MessagesContainer } from './messages_container';

import './chatroom.css';

// TODO: Make key the a unique id given by the server

export function Chatroom() {
	console.log("rendering");
	const navigate = useNavigate();
	const location = useLocation();

	const room = location.state.room;	
	const username = localStorage.getItem('username');

	const [loading, setLoading] = React.useState(false);

	const [gifSearchText, setGifSearchText] = React.useState('');

	React.useEffect(() => {

	}, []);

	function handle_enter(e, target) {
        if (e.key === 'Enter') {
            target();
        }
    }

	function leave() {
		navigate('/room-selection');
	}

	return (
		<main id="chatroom-main">
			{loading && <LoadingBlocks />}
			<div id="main-content">
				<div id="chatroom-left-window" className="bg-light">
					<div className="gif-search-div">
						<input type="text" className="form-control" id="gif-search-text-box" onChange={(e) => setGifSearchText(e.target.value)} placeholder="Search for a GIF..." />
						<button type="submit" className="btn btn-primary" id="gif-search-button">
							<span>Search</span>
						</button>
					</div>
					<div id="gif-search-results">
						<p className="text-secondary try-search-for-gif" >Try searching for a GIF!</p>
					</div>
					<a className="change-room-button btn btn-outline-danger" onClick={leave} >
						<span>Leave Room</span>
					</a>
				</div>
				<div id="chatroom-right-window">
					<MessagesContainer room={room} />
				</div>
			</div>
		</main>
	);
}
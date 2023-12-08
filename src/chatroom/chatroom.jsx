import React from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';
import { LoadingBlocks } from '../loading/loading';
import { MessageSystem } from './message_elements/message_system';
import { MessageSelf } from './message_elements/message_self';
import { MessageOther } from './message_elements/message_other';

import './chatroom.css';

// TODO: Make key the timestamp

export function Chatroom({ room='A' }) {
	console.log(room);
	const navigate = useNavigate();
	const username = localStorage.getItem('username');
	
	const [messages, setMessages] = React.useState([]);

	React.useEffect(() => {
		(async () => {
			await loadHistory();
		})();
	}, []);

	async function loadHistory() {
        try {
            const response = await fetch(`/api/history?room=${room}`);
            if (!response.ok) {
                navigate('/');
            }
            const data = await response.json();
            // setMessages(data.history.toReversed())
			let new_messages = [];
			for (const message of data.history) {
				new_messages.push(create_message(message));
			}
			setMessages(new_messages);
        }
        catch(error) {
            console.error(error);
        }
    }

	function create_message(message) {
        const messages_container = document.getElementById('messages-container');
        let scroll = false;
        if (messages_container.scrollTop >= -10) {
            scroll = true;
        }

        const { type: type, author: author, content: content } = message;

        if (type === "system"){
            return (<MessageSystem content={content}/>);
        }
        else if (type === "image") {
            //messages_container.prepend(this.create_image_message_element(author, content));
        }
        else {
            if (author === username) {
                return (<MessageSelf content={content} />);
            }
            else {
                return (<MessageOther author={author} content={content} />);
            }
        }
    
        // Chrome bad
        if (scroll === true) {
            console.log("scrolling");
            messages_container.scrollTop = 0.5;  
        }
    }

	return (
		<main id="chatroom-main">
			<div id="main-content">
				<div id="chatroom-left-window" className="bg-light">
					<div className="gif-search-div">
						<input type="text" className="form-control" id="gif-search-text-box" placeholder="Search for a GIF..." />
						<button type="submit" className="btn btn-primary" id="gif-search-button">
							<span>Search</span>
						</button>
					</div>
					<div id="gif-search-results">
						<p className="text-secondary try-search-for-gif" >Try searching for a GIF!</p>
					</div>
					<a className="change-room-button btn btn-outline-danger" href="rooms.html" >
						<span>Leave Room</span>
					</a>
				</div>
				<div id="chatroom-right-window">
					<div id="messages-container">{messages}</div>
					<div className="user-message-input">
						<a className="change-room-button change-room-button-small btn btn-outline-danger" href="rooms.html">
							<span>Leave</span>
						</a>
						<input id="message-text-box" className="form-control" type="text" placeholder="Enter a message..." />
						<button id="send-message-button" className="btn btn-primary" type="submit">
							<span>Send</span>
							<img src="icons/icons8-send-30.png" width="20px" />
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AuthState } from '../login/authState';
import { LoadingBlocks } from '../loading/loading';
import { MessageSystem } from './message_elements/message_system';
import { MessageSelf } from './message_elements/message_self';
import { MessageOther } from './message_elements/message_other';
import { ChatroomNotifier } from './chatroom_notifier';

import './chatroom.css';

// TODO: Make key the a unique id given by the server

export function Chatroom({ room }) {
	const navigate = useNavigate();
	const location = useLocation();

	if (location.state && location.state.room) {
		room = location.state.room;
	}

	const username = localStorage.getItem('username');
	
	const [messages, setMessages] = React.useState([]);
	const [messageText, setMessageText] = React.useState('');
	const [gifSearchText, setGifSearchText] = React.useState('');
	const [chatroomNotifier, setChatroomNotifer] = React.useState(null);

	React.useEffect(() => {
		(async () => {
			await loadHistory();
			setChatroomNotifer(new ChatroomNotifier(
				room,
				[(m) => push_message_element(create_message_element(m))], // When a new chat message is received
				[] // When a new user count message is received
			));
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
				new_messages.push(create_message_element(message));
			}
			setMessages(new_messages);
			console.log(messages);
        }
        catch(error) {
            console.error(error);
        }
    }

	function push_message_element(message_element) {
		
		setMessages([...messages, message_element]);
	}

	function create_message_element(message) {
        const messages_container = document.getElementById('messages-container');
        let scroll = false;
        if (messages_container.scrollTop >= -10) {
            scroll = true;
        }

        const { type: type, author: author, content: content } = message;
		const id = uuidv4();

        if (type === "system"){
            return (<MessageSystem content={content} key={id}/>);
        }
        else if (type === "image") {
            //messages_container.prepend(this.create_image_message_element(author, content));
        }
        else {
            if (author === username) {
                return (<MessageSelf content={content} key={id}/>);
            }
            else {
                return (<MessageOther author={author} content={content} key={id}/>);
            }
        }
    
        // Chrome bad
        if (scroll === true) {
            console.log("scrolling");
            messages_container.scrollTop = 0.5;  
        }
    }

	function handle_enter(e, target) {
        if (e.key === 'Enter') {
            target();
        }
    }

	function send_and_clear() {
		chatroomNotifier.sendChatMessage({type: 'message', author: username, content: messageText});
		setMessageText('');
	}

	return (
		<main id="chatroom-main">
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
						<input id="message-text-box" className="form-control" type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder="Enter a message..." onKeyDown={(e) => handle_enter(e, send_and_clear)} />
						<button id="send-message-button" className="btn btn-primary" type="submit" onClick={send_and_clear}>
							<span>Send</span>
							<img src="icons/icons8-send-30.png" width="20px" />
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
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
	const username = localStorage.getItem('username');

	if (location.state && location.state.room) {
		room = location.state.room;
	}

	const [loading, setLoading] = React.useState(false);
	const [messages, setMessages] = React.useState([]);

	const [messageText, setMessageText] = React.useState('');
	const [gifSearchText, setGifSearchText] = React.useState('');

	const chatroomNotifierRef = React.useRef(null);
	const messagesContainerRef = React.useRef(null);

	React.useEffect(() => {
		setLoading(true);
		loadHistory();
		chatroomNotifierRef.current = new ChatroomNotifier(
			room,
			[(message) => push_message_element(create_message_element(message))], // When a new chat message is received
			[] // When a new user count message is received
		);

		return () => {
			// close sockets
			chatroomNotifierRef.current.chat_socket.close();
			chatroomNotifierRef.current.count_socket.close();
		}
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
			new_messages.push(create_message_element({
				type: 'system',
				author: username,
				content: `${username} has joined the room`
			}));
			setMessages(new_messages);
			setTimeout(() => console.log(messages), 2000);
        }
        catch(error) {
            console.error(error);
        }
		finally {
			setLoading(false);
		}
    }

	function push_message_element(message_element) {
		let scroll = false;
        if (messagesContainerRef.current.scrollTop >= -10) {
            scroll = true;
        }
		setMessages([message_element, ...messages]);
		// Chrome bad
        if (scroll === true) {
            console.log("scrolling");
            messagesContainerRef.current.scrollTop = 0.5;  
        }
	}

	function create_message_element(message) {
		console.log(`new message: ${JSON.stringify(message)}`);

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
    }

	function handle_enter(e, target) {
        if (e.key === 'Enter') {
            target();
        }
    }

	function send_and_clear() {
		if (messageText === '') {
			return;
		}
		const message = {type: 'message', author: username, content: messageText};
		push_message_element(create_message_element(message));
		chatroomNotifierRef.current.sendChatMessage(message);
		setMessageText('');
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
					<div id="messages-container" ref={messagesContainerRef} >{messages}</div>
					<div className="user-message-input">
						<a className="change-room-button change-room-button-small btn btn-outline-danger" onClick={leave}>
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
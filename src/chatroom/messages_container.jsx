import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageSystem } from './message_elements/message_system';
import { MessageSelf } from './message_elements/message_self';
import { MessageOther } from './message_elements/message_other';
import { ChatroomNotifier } from './chatroom_notifier';

export function MessagesContainer({ room }) {
    const username = localStorage.getItem('username');
    const [messages, setMessages] = React.useState([]);
    const [messageText, setMessageText] = React.useState('');

    const chatroomNotifierRef = React.useRef(null);
	const messagesContainerRef = React.useRef(null);

    React.useEffect(() => {
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
        }
        catch(error) {
            console.error(error);
        }
    }

    function push_message_element(message_element) {
		// let scroll = false;
        // if (messagesContainerRef.current.scrollTop >= -10) {
        //     scroll = true;
        // }
		setMessages([message_element, ...messages]);
		// Chrome bad
        // if (scroll === true) {
        //     messagesContainerRef.current.scrollTop = 0.5;  
        // }
	}

	function create_message_element(message) {
		// console.log(`new message: ${JSON.stringify(message)}`);

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

    function send_and_clear() {
        const message = {
            type: 'message',
            author: username,
            content: messageText
        };
        push_message_element(create_message_element(message));
        chatroomNotifierRef.current.sendChatMessage(message);
		setMessageText('');
	}

    function handle_enter(e, target) {
        if (e.key === 'Enter') {
            target();
        }
    }

    function leave() {
		navigate('/room-selection');
	}

    return (
        <>
            <div id="messages-container" ref={messagesContainerRef}>{messages}</div>
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
        </>
    );
}
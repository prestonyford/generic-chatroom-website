import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MessageSystem } from './message_elements/message_system';
import { MessageSelf } from './message_elements/message_self';
import { MessageOther } from './message_elements/message_other';
import { ChatroomNotifier } from './chat_notifier';
import { CountNotifier } from './count_notifier';
import { LoadingBlocks } from '../loading/loading';
import { MessageImage } from './message_elements/message_image';

export function MessagesContainer({ room }) {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const [loading, setLoading] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [messageText, setMessageText] = React.useState('');
    const [userCount, setUserCount] = React.useState('');

    const chatNotifierRef = React.useRef(null);
    const countNotifierRef = React.useRef(null);
	const messagesContainerRef = React.useRef(null);

    React.useEffect(() => {
        setLoading(true);
        loadHistory()

        chatNotifierRef.current = new ChatroomNotifier(room);
        window.addEventListener('chat_message_received', (e) => {
            push_message_element(create_message_element(e.detail.message));
        });
        countNotifierRef.current = new CountNotifier();
        window.addEventListener('count_message_received', (e) => {
            const key = `room_${room}_count`;
            setUserCount(e.detail.message[key])
        });

        // GIF container listener
        window.addEventListener('send_message', (e) => {
            push_message_element(create_message_element(e.detail.message));
            chatNotifierRef.current.sendChatMessage(e.detail.message);
        });

        push_message_element(create_message_element({
            type: 'system',
            author: username,
            content: `${username} has joined the room`
        }));
        
        setLoading(false);

		return () => {
			// close sockets
			chatNotifierRef.current.chat_socket.close();
            countNotifierRef.current.count_socket.close();
		};
	}, []);

    React.useEffect(() => {
        // console.log(messages);
    });

    async function loadHistory() {
        try {
            const response = await fetch(`/api/history?room=${room}`);
            if (!response.ok) {
                navigate('/');
            }
            const data = await response.json();
            console.log(data);
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
		let scroll = false;
        if (messagesContainerRef.current.scrollTop >= -10) {
            scroll = true;
        }
		// setMessages([message_element, ...(messages)]);
        setMessages((prevMessages) => [message_element, ...prevMessages]);
		// Chrome bad
        if (scroll === true) {
            console.log('scrolling')
            messagesContainerRef.current.scrollTop = 0.5;  
        }
	}

	function create_message_element(message) {
		// console.log(`new message: ${JSON.stringify(message)}`);

        const { type: type, author: author, content: content } = message;
		const id = uuidv4();

        if (type === "system"){
            return (<MessageSystem content={content} key={id}/>);
        }
        else if (type === "image") {
            return (<MessageImage author={author} content={content} key={id} />);
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
        chatNotifierRef.current.sendChatMessage(message);
		setMessageText('');
	}

    function handle_enter(e, target) {
        if (e.key === 'Enter') {
            target();
        }
    }

    function leave() {
		navigate('/room-selection');
        // window.location.href = '/room-selection';
	}

    return (
        <>
            {loading && <LoadingBlocks />}
            <div id='room-title'>
				Room {room} (<img src="icons/icons8-user-30.png" height="16px" />{userCount} / 20)
			</div>
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
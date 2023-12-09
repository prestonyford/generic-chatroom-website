import React from 'react';

export function MessageImage({ author, content }) {
    const username = localStorage.getItem('username');

    if (username !== author) {
        return (
            <div className={'message message-image message-other'}>
                <span className='message-author' style={{ marginBottom: '4px' }}>{author}</span>
                <img src={content}/>
            </div>
        );
    };

    return (
        <div className={'message message-image message-self'}>
            <img src={content}/>
        </div>
    );
}
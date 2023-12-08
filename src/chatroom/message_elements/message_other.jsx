import React from 'react';

export function MessageOther( {author, content} ) {
    return (
        <div className='message message-other'>
            <span className='message-author'>{author}</span>
            <span>{content}</span>
        </div>
    )
}
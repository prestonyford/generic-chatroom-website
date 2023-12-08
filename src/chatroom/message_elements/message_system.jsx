import React from 'react';

export function MessageSystem( {content} ) {
    return (
        <div className='message-system'>
            <span>{content}</span>
        </div>
    )
}
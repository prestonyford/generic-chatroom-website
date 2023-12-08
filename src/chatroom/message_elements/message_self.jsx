import React from 'react';

export function MessageSelf( {content} ) {
    return (
        <div className="message message-self">
            {content}
        </div>
    )
}
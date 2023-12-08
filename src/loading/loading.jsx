import React from 'react';
import { Blocks } from 'react-loader-spinner';

import './loading.css';

export function LoadingBlocks() {
    return (
        <div className="loading-blocks-screen">
            <div className="loading-blocks-container">
                <Blocks
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperClass="loading-svg"
                />
            </div>
        </div>
    )
}
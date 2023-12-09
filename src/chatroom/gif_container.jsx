import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingBlocks } from '../loading/loading';

export function GifContainer() {
    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState(<p className="text-secondary try-search-for-gif" >Try searching for a GIF!</p>);
    const [gifSearchText, setGifSearchText] = React.useState('');
    const username = localStorage.getItem('username');

    async function search_gif() {
        const search_term = gifSearchText;
        setGifSearchText('');
        try {
            const response = await fetch(`/api/gif?search_term=${search_term}`);
            const results = await response.json();
            display_search_results(results.results)
        }
        catch(error) {
            console.error(error);
        }
    }

    function display_search_results(results) {
        // console.log(results);
        const results_window = document.getElementById('gif-search-results');
        let results_components = []
        for (const result of results) {
            results_components.push(create_gif_element(result));
        }
        setSearchResults(results_components);
    }

    function create_gif_element(gif_object) {
        const tiny_gif = gif_object.media_formats.tinygif; // Smaller image for previews
        const gif = gif_object.media_formats.gif; // Actual image for sending
        
        return (<div key={gif_object.id} style={{cursor: 'pointer'}} onClick={async () => {
            window.dispatchEvent(new CustomEvent('send_message', {
                detail: {
                    message: {
                        type: "image",
                        author: username,
                        content: gif.url
                    }
                }
            }))
        }}>
            <img src={tiny_gif.url} />
        </div>);
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
            <div className="gif-search-div">
                <input type="text" className="form-control" id="gif-search-text-box" value={gifSearchText} onChange={(e) => setGifSearchText(e.target.value)} onKeyDown={(e) => handle_enter(e, search_gif)} placeholder="Search for a GIF..." />
                <button type="submit" className="btn btn-primary" id="gif-search-button" onClick={search_gif}>
                    <span>Search</span>
                </button>
            </div>
            <div id="gif-search-results">
                {searchResults}
            </div>
            <a className="change-room-button btn btn-outline-danger" onClick={leave} >
                <span>Leave Room</span>
            </a>
        </>
    );
}

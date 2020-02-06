import React, { useEffect } from 'react';
import 'shaka-player/dist/controls.css';
import shaka from 'shaka-player/dist/shaka-player.ui';

import './Player.scss';

function Player(props) {
    const videoComponent = React.createRef();
    const videoContainer = React.createRef();

    useEffect(() => {
		const { src } = props;

        const player = new shaka.Player(videoComponent.current);
        
        async function loadPlaylist(playlistUrl) {
            try {
                await player.load(playlistUrl);
            } catch (error) {
                console.error('Error code', error.code, 'object', error);
            }
        }
		  
      	const ui = new shaka.ui.Overlay(player, videoContainer.current, videoComponent.current);
      	ui.getControls();

  		player.addEventListener('error', (error) => console.error('Error code', error.code, 'object', error));

        loadPlaylist(src);

        return () => {
            ui.destroy();
            player.destroy();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className="Player" ref={videoContainer}>
            <video
                autoPlay
                className="Player-Video"
                ref={videoComponent}
            />
        </div>
    );
}

export { Player };
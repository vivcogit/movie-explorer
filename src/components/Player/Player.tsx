import React, { useEffect } from 'react';
import 'shaka-player/dist/controls.css';
import shaka from 'shaka-player/dist/shaka-player.ui';
import muxjs from 'mux.js';

import './Player.scss';
import { Button } from '../Button/Button';

interface Controller {
    player: shaka.Player,
    overlay: shaka.ui.Overlay,
}

interface PlayerProps {
    src: string,
    onClose?: () => void,
}

function Player(props: PlayerProps) {
    const { src, onClose } = props;

    const videoComponent = React.createRef<HTMLVideoElement>();
    const videoContainer = React.createRef<HTMLDivElement>();
    const controller = React.useRef<Controller>();

    useEffect(() => {
        (window as any).muxjs = muxjs;
        const player = new shaka.Player(videoComponent.current);
        
        async function loadPlaylist(playlistUrl: string) {
            try {
                await player.load(playlistUrl);
            } catch (error) {
                console.error('Error code', error.code, 'object', error);
            }
        }
		  
      	const overlay = new shaka.ui.Overlay(player, videoContainer.current, videoComponent.current);
      	overlay.getControls();

  		player.addEventListener('error', (error) => console.error('Error code', error.details.code, 'object', error));

        controller.current = { player, overlay };

        loadPlaylist(src);

        return () => {
            overlay.destroy();
            player.destroy();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const player = controller?.current?.player;

        if (player) {
            player.load(src)
        }
    }, [src]);

    return(
        <div className="Player">
            <div className="Player-Container" ref={videoContainer}>
                <video
                    autoPlay
                    className="Player-Video"
                    ref={videoComponent}
                />
            </div>

            {onClose && (
                <Button
                    className="Player-CloseButton"
                    onClick={onClose}
                    backgroundTransparent
                    black
                >
                    ✖
                </Button>
            )}
        </div>
    );
}

export { Player };
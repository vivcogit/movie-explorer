import React from 'react';
import { Link } from 'react-router-dom';

import { Movie } from '../../types/Movie';
import { Overlay } from '../Overlay/Overlay';
import { Poster } from '../Poster/Poster';

import './MoviePreview.scss';

function MoviePreview(props: { video: Movie }) {
    const { video } = props;
    
    return (
        <Link className="MoviePreview" to={`/movie/${video.id}`}>
            <Overlay text={video.overview}>
                <Poster
                    className="MoviePreview-Poster"
                    posterPath={video.poster_path}
                    title={video.title}
                />
            </Overlay>

            <div className="MoviePreview-Title">
                {video.title}
            </div>
        </Link>
    );
}

export { MoviePreview };
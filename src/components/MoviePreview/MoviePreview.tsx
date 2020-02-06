import React from 'react';
import { Link } from 'react-router-dom';

import { Movie } from '../../types/Movie';
import { Overlay } from '../Overlay/Overlay';

import './MoviePreview.scss';

const POSTER_PATH_BASE = 'https://image.tmdb.org/t/p/w342/';

function MoviePreview(props: { video: Movie }) {
    const { video } = props;

    return (
        <Link className="MoviePreview" to={`/movie/${video.id}`}>
            <Overlay text={video.overview}>
                {video.poster_path
                    ? <img
                        className="MoviePreview-Poster"
                        src={POSTER_PATH_BASE + video.poster_path}
                        alt={video.title}
                    />
                    : <div className="MoviePreview-Poster MoviePreview-Poster_empty" />
                }
            </Overlay>

            <div className="MoviePreview-Title">
                {video.title}
            </div>
        </Link>
    );
}

export { MoviePreview };
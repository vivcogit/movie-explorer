import React from 'react';
import { Link } from 'react-router-dom';

import { Movie } from '../../types/Movie';
import { Overlay } from '../Overlay/Overlay';
import { Poster } from '../Poster/Poster';

import './MoviePreview.scss';

function MoviePreview(props: { movie: Movie }) {
    const { movie } = props;

    const title = movie.title || movie.name;
    
    return (
        <Link className="MoviePreview" to={`/movie/${movie.id}`}>
            <Overlay text={movie.overview}>
                <Poster
                    className="MoviePreview-Poster"
                    posterPath={movie.poster_path}
                    title={title}
                />
            </Overlay>

            <div className="MoviePreview-Title">
                {title}
            </div>
        </Link>
    );
}

export { MoviePreview };
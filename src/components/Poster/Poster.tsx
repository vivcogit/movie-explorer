import React from 'react';

import { POSTER_PATH_BASE } from '../../utils/consts';

import dummyPoster from './dummy_poster.png';

interface PosterProps {
    posterPath: string | null,
    title: string | null | undefined,
    className?: string,
}

function Poster(props: PosterProps) {
    const { posterPath, title, className = '' } = props;

    const src = posterPath
        ? POSTER_PATH_BASE + posterPath
        : dummyPoster;

    return (
        <img className={className} src={src} alt={title || 'Not found'} />
    );
}

export { Poster };

import React from 'react';

import { MoviePreview } from '../MoviePreview/MoviePreview';
import { Movie } from '../../types/Movie';

import './MoviePreviewGrid.scss';

type MoviePreviewGridProps = {
    data: Array<Movie>,
    title: string,
    isFetching: boolean,
};

function MoviePreviewGrid(props: MoviePreviewGridProps) {
    const { data, title, isFetching } = props;

    return (
        <div className="MoviePreviewGrid">
            <h2 className="MoviePreviewGrid-Title">
                {title}
            </h2>

            {isFetching
                ? 'Data is fetching'
                : (
                    <div className="MoviePreviewGrid-Container">
                        {data.length
                            ? data.map((movie) => (
                                <div className="MoviePreviewGrid-Item" key={movie.id}>
                                    <MoviePreview movie={movie} />
                                </div>
                            ))
                            : (
                                <div className="MoviePreviewGrid-Dummy">
                                    Nothing was found
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export { MoviePreviewGrid };
import React from 'react';

import { MoviePreview } from '../MoviePreview/MoviePreview';
import { Movie } from '../../types/Movie';

import { Carousel } from '../Carousel/Carousel';
import { CarouselItem } from '../Carousel/CarouselItem';

import './MoviePreviewList.scss';

type MoviePreviewListProps = {
    data: Array<Movie>,
    title: string,
    isFetching: boolean,
};

function MoviePreviewList(props: MoviePreviewListProps) {
    const { data, title, isFetching } = props;

    return (
        <div className="MoviePreviewList">
            <h2 className="MoviePreviewList-Title">
                {title}
            </h2>

            {isFetching
                ? 'Data is fetching'
                : (
                    <Carousel>
                        {data.map((movie) => (
                            <CarouselItem key={movie.id}>
                                <MoviePreview movie={movie} />
                            </CarouselItem>
                        ))}
                    </Carousel>
                )
            }
        </div>
    );
}

export { MoviePreviewList };
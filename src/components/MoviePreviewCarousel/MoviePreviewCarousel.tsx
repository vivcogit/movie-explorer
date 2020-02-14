import React from 'react';

import { MoviePreview } from '../MoviePreview/MoviePreview';
import { Movie } from '../../types/Movie';

import { Carousel } from '../Carousel/Carousel';
import { CarouselItem } from '../Carousel/CarouselItem';

import './MoviePreviewCarousel.scss';

type MoviePreviewCarouselProps = {
    data: Array<Movie>,
    title: string,
    isFetching: boolean,
};

function MoviePreviewCarousel(props: MoviePreviewCarouselProps) {
    const { data, title, isFetching } = props;

    return (
        <div className="MoviePreviewCarousel">
            <h2 className="MoviePreviewCarousel-Title">
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

export { MoviePreviewCarousel };
import React from 'react';
import { useParams } from 'react-router-dom';

import { apiProvider } from '../../providers/api';
import { Button } from '../../components/Button/Button';
import { Player } from '../../components/Player/Player';
import * as dataReducer from '../../reducers/data';
import { PLAYLIST_URL } from '../../utils/consts';
import { Poster } from '../../components/Poster/Poster';

import './MoviePage.scss';

function MoviePage() {
    const { id } = useParams();

    const [ movie, dispatch ] = React.useReducer(
        dataReducer.reducer,
        dataReducer.defaultState,
    );

    const [ isShowPlayer, setIsShowPlayer ] = React.useState(false);

    React.useEffect(() => {
        async function fetchData() {
            if (!id) {
                throw new Error('Movie id is unknown');
            }
    
            return apiProvider.getMovie(id);
        }

        dataReducer.initFunction(dispatch, fetchData);
    }, [id]);

    if (movie.error) {
        return (
            <div className="MoviePage">
                <h2>
                    Sorry, an error was happened
                </h2>

                <p>
                    {movie.error.code = 404
                        ? 'Movie not found'
                        : 'It was something strange'
                    }
                </p>
            </div>
        );
    }

    if (movie.isFetching || !movie.data) {
        return (
            <div>
                Please wait, data is loading
            </div>
        );
    }

    if (isShowPlayer) {
        return (<Player src={PLAYLIST_URL} onClose={() => setIsShowPlayer(false)} />);
    }


    return (
        <div className="MoviePage">
            <div className="MoviePage-Wrapper">
                <div className="MoviePage-PosterSide">
                    <Poster
                        posterPath={movie.data.poster_path}
                        title={movie.data.title}
                    />
                </div>

                <div className="MoviePage-TextSide">
                    <h2 className="MoviePage-Title">
                        {movie.data.title}
                    </h2>

                    <div className="MoviePage-Description">
                        <h3>
                            Description
                        </h3>

                        <p className="MoviePage-DetailsBlock">
                            {movie.data.overview}
                        </p>
                    </div>

                    <div className="MoviePage-Metadata">
                        <h3>
                            Metadata
                        </h3>

                        <ul className="MoviePage-DetailsBlock">
                            <li>
                                Status: {movie.data.status}
                            </li>
                            <li>
                                Release data: {movie.data.release_date}
                            </li>
                            <li>
                                Genres: {movie.data.genres.map((genre: { name: string }) => genre.name).join(', ')}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="MoviePage-ButtonsArea">
                <Button onClick={() => setIsShowPlayer(true)}>
                    Watch movie
                </Button>
            </div>
        </div>
    );
}

export { MoviePage };
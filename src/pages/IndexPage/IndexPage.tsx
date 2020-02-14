import React from 'react';
import { apiProvider, MovieTypes, Genres } from '../../providers/api';
import { MoviePreviewCarousel } from '../../components/MoviePreviewCarousel/MoviePreviewCarousel';
import * as dataReducer from '../../reducers/data';

type Data = {
    results: []
} | null;

function getData(state: dataReducer.ReducerState<Data>) {
    return state.data?.results || [];
}

function IndexPage() {
    const [ popular, popularDispatch ] = React.useReducer<dataReducer.Reducer<Data>>(dataReducer.reducer, dataReducer.defaultState);
    const [ tv, tvDispatch ] = React.useReducer<dataReducer.Reducer<Data>>(dataReducer.reducer, dataReducer.defaultState);
    const [ family, familyDispatch ] = React.useReducer<dataReducer.Reducer<Data>>(dataReducer.reducer, dataReducer.defaultState);
    const [ documentary, documentaryDispatch ] = React.useReducer<dataReducer.Reducer<Data>>(dataReducer.reducer, dataReducer.defaultState);

    React.useEffect(() => {
        async function fetchData() {
            await Promise.all([
                dataReducer.fetch(popularDispatch, apiProvider.getDiscover.bind(apiProvider, MovieTypes.Movies)),
                dataReducer.fetch(tvDispatch, apiProvider.getDiscover.bind(apiProvider, MovieTypes.Tv)),
                dataReducer.fetch(familyDispatch, apiProvider.getDiscover.bind(apiProvider, MovieTypes.Movies, Genres.Family)),
                dataReducer.fetch(documentaryDispatch, apiProvider.getDiscover.bind(apiProvider, MovieTypes.Movies, Genres.Documentary)),
            ]);
        }

        fetchData();
    }, []);

    return (
        <div className="IndexPage">
            <MoviePreviewCarousel
                title="Popular movies"
                data={getData(popular)}
                isFetching={popular.isFetching}
            />

            <MoviePreviewCarousel
                title="Popular TV"
                data={getData(tv)}
                isFetching={popular.isFetching}
            />

            <MoviePreviewCarousel
                title="Popular Family"
                data={getData(family)}
                isFetching={popular.isFetching}
            />

            <MoviePreviewCarousel
                title="Popular Documentary"
                data={getData(documentary)}
                isFetching={popular.isFetching}
            />
        </div>
    );
}

export { IndexPage };
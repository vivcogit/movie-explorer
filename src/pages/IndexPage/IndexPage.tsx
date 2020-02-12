import React from 'react';
import { apiProvider, DiscoverTypes, Genres } from '../../providers/api';
import { MoviePreviewList } from '../../components/MoviePreviewList/MoviePreviewList';
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
                dataReducer.initFunction(popularDispatch, apiProvider.getDiscover.bind(apiProvider, DiscoverTypes.Movies)),
                dataReducer.initFunction(tvDispatch, apiProvider.getDiscover.bind(apiProvider, DiscoverTypes.Tv)),
                dataReducer.initFunction(familyDispatch, apiProvider.getDiscover.bind(apiProvider, DiscoverTypes.Movies, Genres.Family)),
                dataReducer.initFunction(documentaryDispatch, apiProvider.getDiscover.bind(apiProvider, DiscoverTypes.Movies, Genres.Documentary)),
            ]);
        }

        fetchData();
    }, []);

    return (
        <div className="IndexPage">
            <MoviePreviewList
                title="Popular movies"
                data={getData(popular)}
                isFetching={popular.isFetching}
            />

            <MoviePreviewList
                title="Popular TV"
                data={getData(tv)}
                isFetching={popular.isFetching}
            />

            <MoviePreviewList
                title="Popular Family"
                data={getData(family)}
                isFetching={popular.isFetching}
            />

            <MoviePreviewList
                title="Popular Documentary"
                data={getData(documentary)}
                isFetching={popular.isFetching}
            />
        </div>
    );
}

export { IndexPage };
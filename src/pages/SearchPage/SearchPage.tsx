import React from 'react';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import * as dataReducer from '../../reducers/data';

import './SearchPage.scss';
import { apiProvider, MovieTypes } from '../../providers/api';
import { MoviePreviewGrid } from '../../components/MoviePreviewGrid/MoviePreviewGrid';

function SearchPage() {
    const [ searchValue, setSearchValue ] = React.useState('');
    const [ data, dispatch ] = React.useReducer(dataReducer.reducer, dataReducer.defaultState);
    const fetchData = React.useCallback(
        () => dataReducer.fetch(dispatch, () => apiProvider.getSearch(MovieTypes.Movies, searchValue)),
        [searchValue]
    );

    return (
        <div className="SearchPage">
            <h1>
                Search
            </h1>

            <div className="SearchPage-InputContainer">
                <Input
                    className="SearchPage-Input"
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />

                <Button
                    className="SearchPage-Submit"
                    onClick={fetchData}
                >
                    Search
                </Button>
            </div>

            {data.isInitialized && (
                <MoviePreviewGrid
                    title="Results"
                    data={data.data?.results || []}
                    isFetching={data.isFetching}
                />
            )}
        </div>
    );
}

export { SearchPage };
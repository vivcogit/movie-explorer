import axios, { AxiosResponse, AxiosError } from 'axios';

enum SortBy {
    PopularityDesc = 'popularity.desc',
    PopularityAsc = 'popularity.asc',
};

export enum Genres {
    Family = 10751,
    Documentary = 99,
};

export enum DiscoverTypes {
    Movies,
    Tv,
};

class ApiProvider {
    apiKey: string;

    static BASE_API_URL = 'https://api.themoviedb.org/3/';

    static URLS = {
        DISCOVER: {
            MOVIE: `${ApiProvider.BASE_API_URL}discover/movie`,
            TV: `${ApiProvider.BASE_API_URL}discover/tv`,
        },
        MOVIE: `${ApiProvider.BASE_API_URL}movie/`
    }

    constructor(key: string) {
        this.apiKey = key;
    }

    handleResponse(response: AxiosResponse) {
        if (response.status >= 400) {
            throw new Error(response.status.toString());
        }

        return response.data;
    }

    handleError(error: AxiosError) {
        throw new Error(error?.response?.status.toString());
    }

    async get(url: string, params: object | undefined = {}) {
        try {
            const response = await axios.get(
                url,
                {
                    params: {
                        ...params,
                        api_key: this.apiKey,
                    },
                },
            );
    
            return this.handleResponse(response);
        } catch (error) {
            this.handleError(error);
        }
    }

    async getDiscover(type: DiscoverTypes, genre: Genres | undefined = undefined, sortBy: SortBy = SortBy.PopularityDesc, page: number = 1) {
        const url = type === DiscoverTypes.Movies
            ? ApiProvider.URLS.DISCOVER.MOVIE
            : ApiProvider.URLS.DISCOVER.TV;
        const params = {
            sort_by: sortBy,
            with_genres: genre,
            page,
        };

        return await this.get(url, params);
    }

    async getMovie(id: string): Promise<any> {
        return await this.get(ApiProvider.URLS.MOVIE + id);
    }
}

const apiProvider: ApiProvider = new ApiProvider('f562c4444437d0d87094898875e1cef2');

export { apiProvider };

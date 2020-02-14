export interface ReducerState<T> {
    data: T,
    isFetching: boolean,
    isInitialized: boolean,
    error: { code: number } | null,
}

export type Reducer<T> = (prevState: ReducerState<T>, action: any) => ReducerState<T>;

export function reducer<T>(state: ReducerState<T>, action: { type: string, payload: any}) {
    switch (action.type) {
        case 'start_loading':
            return { ...state, isFetching: true, error: null };
        case 'finish_loading':
            return { ...state, data: action.payload, isInitialized: true, isFetching: false, error: null };
        case 'error_loading':
            return { ...state, isFetching: false, error: action.payload };
        default:
            throw new Error('Unknown action');
    }
}

export const defaultState = {
    data: null,
    isFetching: false,
    isInitialized: false,
    error: null,
};

export async function fetch(dispatch: React.Dispatch<any>, getter: () => Promise<any>) {
    dispatch({ type: 'start_loading', payload: undefined });
    try {
        const response = await getter();
        if (!response) {
            throw new Error('Response is empty');
        }

        dispatch({ type: 'finish_loading', payload: response });

    } catch (error) {
        dispatch({ type: 'error_loading', payload: { code: error.message || '500' } });
    }
}
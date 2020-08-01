import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import popularMoviesReducer from '../features/movies/popularMoviesSlice';
import userAuthReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        popularMovies: popularMoviesReducer,
        userAuth: userAuthReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

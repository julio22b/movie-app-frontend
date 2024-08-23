import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import popularMoviesReducer from '../features/movies/popularMoviesSlice';
import userAuthReducer from '../features/user/userSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';

export const store = configureStore({
    reducer: {
        popularMovies: popularMoviesReducer,
        userAuth: userAuthReducer,
        reviews: reviewsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

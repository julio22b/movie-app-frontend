import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../../app/store';
import { MovieOMDB } from '../types';

interface InitStatePopular {
    loading: boolean;
    errors: boolean;
    topSix: MovieOMDB[];
}

const initialState: InitStatePopular = {
    loading: false,
    errors: false,
    topSix: [],
};

const popularMoviesSlice = createSlice({
    name: 'popularMovies',
    initialState,
    reducers: {
        getPopularMovies: (state) => {
            state.loading = true;
        },
        getPopularMoviesSuccess: (state, action: PayloadAction<MovieOMDB[]>) => {
            state.loading = false;
            state.errors = false;
            state.topSix = action.payload;
        },
        getPopularMoviesFailure: (state) => {
            state.loading = false;
            state.errors = true;
        },
    },
});

export const {
    getPopularMovies,
    getPopularMoviesSuccess,
    getPopularMoviesFailure,
} = popularMoviesSlice.actions;

export const fetchPopularMovies = (): AppThunk => async (dispatch) => {
    dispatch(getPopularMovies());
    try {
        const movies = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`,
        );
        const top6Popular = movies.data.results.slice(0, 6);
        dispatch(getPopularMoviesSuccess(top6Popular));
    } catch {
        dispatch(getPopularMoviesFailure());
    }
};

export default popularMoviesSlice.reducer;

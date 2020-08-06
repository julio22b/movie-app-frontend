import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { User, userLogInInput, MovieInstance } from '../types';
import userService from '../../services/userService';

export type Notif = {
    message: string;
    type: 'success' | 'warning' | 'off';
};

interface initialState {
    user: User | null;
    error: boolean;
    notification: Notif;
}

const initialState: initialState = {
    user: null,
    error: false,
    notification: {
        message: '',
        type: 'off',
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logInSuccess: (state, { payload }: PayloadAction<User>) => {
            state.error = false;
            state.user = payload;
        },
        logInFailure: (state) => {
            state.error = true;
        },
        logOut: (state) => {
            state.user = null;
            state.error = false;
        },
        saveUserInfo: (state, { payload }: PayloadAction<User>) => {
            state.user = payload;
            state.error = false;
        },
        showNotification: (state, { payload }: PayloadAction<Notif>) => {
            state.notification.message = payload.message;
            state.notification.type = payload.type;
        },
        hideNotification: (state) => {
            state.notification.message = '';
            state.notification.type = 'off';
        },
        addMovieToLiked: (state, { payload }: PayloadAction<MovieInstance>) => {
            if (state.user) state.user.liked_movies?.push(payload);
        },
        removeMovieFromLiked: (state, { payload }: PayloadAction<string>) => {
            if (state.user)
                state.user.liked_movies = state.user?.liked_movies?.filter(
                    (m) => m._id !== payload,
                );
        },
        addMovieToWatched: (state, { payload }: PayloadAction<MovieInstance>) => {
            if (state.user) state.user.watched_movies?.push(payload);
        },
        removeMovieFromWatched: (state, { payload }: PayloadAction<string>) => {
            if (state.user)
                state.user.watched_movies = state.user.watched_movies?.filter(
                    (m) => m._id !== payload,
                );
        },
        addMovieToWatchList: (state, { payload }: PayloadAction<MovieInstance>) => {
            if (state.user) state.user.watch_list?.push(payload);
        },
        removeMovieFromWatchList: (state, { payload }: PayloadAction<string>) => {
            if (state.user)
                state.user.watch_list = state.user.watch_list?.filter((m) => m._id !== payload);
        },
    },
});

export const {
    logInSuccess,
    logInFailure,
    logOut,
    saveUserInfo,
    showNotification,
    hideNotification,
    removeMovieFromLiked,
    addMovieToLiked,
    addMovieToWatched,
    removeMovieFromWatched,
    addMovieToWatchList,
    removeMovieFromWatchList,
} = userSlice.actions;

export const userLogIn = (user: userLogInInput): AppThunk => async (dispatch) => {
    try {
        const response = await userService.logIn({
            username: user.username,
            password: user.password,
        });
        const userData = await userService.getUserInfo(response.id);
        dispatch(logInSuccess(userData));
    } catch {
        dispatch(logInFailure());
    }
};

export default userSlice.reducer;

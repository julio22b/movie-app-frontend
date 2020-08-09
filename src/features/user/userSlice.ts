import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { User, userLogInInput, MovieInstance } from '../types';
import userService from '../../services/userService';

export type Notif = {
    message: string;
    type: 'success' | 'warning' | 'off';
};

type favorite = null | MovieInstance;

interface initialState {
    user: User | null;
    error: boolean;
    notification: Notif;
    form_status: {
        sign_in_form: boolean;
        sign_up_form: boolean;
        favorites_form: {
            open: boolean;
            favorites: [favorite, favorite, favorite, favorite];
        };
    };
}

const initialState: initialState = {
    user: null,
    error: false,
    notification: {
        message: '',
        type: 'off',
    },
    form_status: {
        sign_in_form: false,
        sign_up_form: false,
        favorites_form: {
            open: false,
            favorites: [null, null, null, null],
        },
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
                state.user.liked_movies = state.user.liked_movies?.filter((m) => m._id !== payload);
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
            if (state.user) state.user.watch_list.push(payload);
        },
        removeMovieFromWatchList: (state, { payload }: PayloadAction<string>) => {
            if (state.user)
                state.user.watch_list = state.user.watch_list.filter((m) => m._id !== payload);
        },
        changeSignInFormStatus: (state, { payload }: PayloadAction<boolean>) => {
            state.form_status.sign_in_form = payload;
        },
        changeSignUpFormStatus: (state, { payload }: PayloadAction<boolean>) => {
            state.form_status.sign_up_form = payload;
        },
        changePickFavoriteFormStatus: (state, { payload }: PayloadAction<boolean>) => {
            state.form_status.favorites_form.open = payload;
        },
        addFavorite: (
            state,
            { payload }: PayloadAction<{ movie: MovieInstance; index: number }>,
        ) => {
            state.form_status.favorites_form.favorites[payload.index] = payload.movie;
        },
        removeFavorite: (state, { payload }: PayloadAction<number>) => {
            state.form_status.favorites_form.favorites.splice(payload, 1, null);
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
    changeSignInFormStatus,
    changeSignUpFormStatus,
    changePickFavoriteFormStatus,
    addFavorite,
    removeFavorite,
} = userSlice.actions;

export const userLogIn = (user: userLogInInput): AppThunk => async (dispatch) => {
    try {
        const response = await userService.logIn({
            username: user.username,
            password: user.password,
        });
        const userData = await userService.getUserInfo(response.id);
        dispatch(logInSuccess(userData));
        dispatch(changeSignInFormStatus(false));
    } catch {
        dispatch(logInFailure());
    }
};

export default userSlice.reducer;

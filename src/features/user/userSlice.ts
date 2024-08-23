import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { User, userLogInInput, MovieInstance } from '../types';
import { userService } from '../../services/userService';

export type Notif = {
    message: string;
    type: 'success' | 'warning' | 'off';
};

export type favorite = null | MovieInstance;

interface initialStateI {
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
        new_list_form: {
            movies: MovieInstance[];
        };
    };
    user_for_profile_page: {
        loading: boolean;
        error: boolean;
        user: User | null;
    };
}

const initialState: initialStateI = {
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
        new_list_form: {
            movies: [],
        },
    },
    user_for_profile_page: {
        loading: false,
        error: false,
        user: null,
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
        setFavorites: (
            state,
            { payload }: PayloadAction<[favorite, favorite, favorite, favorite]>,
        ) => {
            state.form_status.favorites_form.favorites = payload;
        },
        getUserForProfile: (state) => {
            state.user_for_profile_page.loading = true;
        },
        getUserForProfileSuccess: (state, { payload }: PayloadAction<User>) => {
            state.user_for_profile_page.user = payload;
            state.user_for_profile_page.loading = false;
            state.user_for_profile_page.error = false;
        },
        getUserForProfileFailure: (state) => {
            state.user_for_profile_page.loading = false;
            state.user_for_profile_page.error = true;
        },
        addMovieForNewList: (state, { payload }: PayloadAction<MovieInstance>) => {
            state.form_status.new_list_form.movies.push(payload);
        },
        removeMovieFromNewList: (state, { payload }: PayloadAction<MovieInstance>) => {
            state.form_status.new_list_form.movies = state.form_status.new_list_form.movies.filter(
                (m) => m._id !== payload._id,
            );
        },
        removeAllMoviesFromNewList: (state) => {
            state.form_status.new_list_form.movies = [];
        },
        addToFollowing: (state, { payload }: PayloadAction<User>) => {
            if (state.user) state.user.following?.push(payload);
        },
        removeFromFollowing: (state, { payload }: PayloadAction<User>) => {
            if (state.user)
                state.user.following = state.user.following?.filter(
                    (user) => user._id !== payload._id,
                );
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
    setFavorites,
    getUserForProfile,
    getUserForProfileFailure,
    getUserForProfileSuccess,
    addMovieForNewList,
    removeMovieFromNewList,
    removeAllMoviesFromNewList,
    addToFollowing,
    removeFromFollowing,
} = userSlice.actions;

export const userLogIn = (user: userLogInInput): AppThunk => async (dispatch) => {
    try {
        const response = await userService.logIn(user);
        const userData = await userService.getUserInfo(response.id);
        dispatch(logInSuccess(userData));
        dispatch(changeSignInFormStatus(false));
    } catch {
        dispatch(logInFailure());
    }
};

export const getProfilePage = (userID: string): AppThunk => async (dispatch) => {
    dispatch(getUserForProfile());
    try {
        const user = await userService.getUserInfo(userID);
        dispatch(getUserForProfileSuccess(user));
    } catch {
        dispatch(getUserForProfileFailure());
    }
};

export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { User, userLogInInput } from '../types';
import userService from '../../services/userService';

export type Notif = {
    message: string;
    type: 'success' | 'warning' | 'off';
    active: boolean;
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
        active: false,
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
            state.notification.active = true;
            state.notification.type = payload.type;
        },
        hideNotification: (state) => {
            state.notification.message = '';
            state.notification.active = false;
            state.notification.type = 'off';
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

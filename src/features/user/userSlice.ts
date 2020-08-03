import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { User, userLogInInput } from '../types';
import userService from '../../services/userService';

interface initialState {
    user: User | null;
    error: boolean;
}

const initialState: initialState = {
    user: null,
    error: false,
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
    },
});

export const { logInSuccess, logInFailure, logOut, saveUserInfo } = userSlice.actions;

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

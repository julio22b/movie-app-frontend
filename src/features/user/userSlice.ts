import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { User, userLogInInput } from '../types';
import userService from '../../services/userService';

interface initialState {
    user: User | null;
    error: boolean;
}

const user = JSON.parse(localStorage.getItem('filmlyCurrentUser')!);

const initialState: initialState = {
    user: user || null,
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
    },
});

export const { logInSuccess, logInFailure, logOut } = userSlice.actions;

export const userLogIn = (user: userLogInInput): AppThunk => async (dispatch) => {
    try {
        const data = await userService.logIn({
            username: user.username,
            password: user.password,
        });
        dispatch(logInSuccess(data));
    } catch {
        dispatch(logInFailure());
    }
};

export default userSlice.reducer;

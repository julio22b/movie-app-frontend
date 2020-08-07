import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogIn, logOut, changeSignInFormStatus } from '../../features/user/userSlice';
import { RootState } from '../../app/store';
import { changeModalState } from '../../features/reviews/reviewsSlice';
import userService from '../../services/userService';
import SignInForm from './SignInForm';

export const NavBar = () => {
    const { user } = useSelector((state: RootState) => state.userAuth);
    const { sign_in_form } = useSelector((state: RootState) => state.userAuth.form_status);
    const dispatch = useDispatch();

    const signOut = () => {
        userService.removeCurrentUser();
        dispatch(logOut());
    };
    return (
        <header>
            <p>Filmly</p>
            {sign_in_form && <SignInForm />}
            <ul>
                {!user && (
                    <>
                        <li>
                            <button onClick={() => dispatch(changeSignInFormStatus(!sign_in_form))}>
                                SIGN IN
                            </button>
                        </li>
                        <li>
                            <button>CREATE ACCOUNT</button>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <button onClick={signOut}>Sign out</button>
                        </li>
                        <li className="log">
                            <button onClick={() => dispatch(changeModalState())}>+ LOG</button>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

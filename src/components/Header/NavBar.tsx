import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogIn, logOut } from '../../features/user/userSlice';
import { RootState } from '../../app/store';
import { changeModalState } from '../../features/reviews/reviewsSlice';
import userService from '../../services/userService';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { error, user } = useSelector((state: RootState) => state.userAuth);
    const dispatch = useDispatch();

    const logIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userLogIn({ username, password }));
    };

    const signOut = () => {
        userService.removeCurrentUser();
        dispatch(logOut());
    };
    return (
        <header>
            <p>Filmly</p>
            <ul>
                {!user && (
                    <>
                        <li>
                            <form onSubmit={(e) => logIn(e)}>
                                <input
                                    type="text"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                    maxLength={25}
                                    minLength={3}
                                />
                                <input
                                    type="text"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={6}
                                />
                                <button>SIGN IN</button>
                            </form>
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
                {error && <li>Incorrect username and/or password</li>}
            </ul>
        </header>
    );
};

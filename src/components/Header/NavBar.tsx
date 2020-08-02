import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogIn, logOut } from '../../features/user/userSlice';
import { RootState } from '../../app/store';
import { changeModalState } from '../../features/reviews/reviewsSlice';

export const NavBar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { error, user } = useSelector((state: RootState) => state.userAuth);
    const dispatch = useDispatch();

    const logIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userLogIn({ username, password }));
    };
    return (
        <header>
            <ul>
                {!user && (
                    <>
                        <li>
                            <form onSubmit={(e) => logIn(e)}>
                                <input
                                    type="text"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="text"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
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
                            <button onClick={() => dispatch(logOut())}>Sign out</button>
                        </li>
                        <li>
                            <button onClick={() => dispatch(changeModalState())}>+LOG</button>
                        </li>
                    </>
                )}
                {error && <li>Incorrect username and/or password</li>}
            </ul>
        </header>
    );
};

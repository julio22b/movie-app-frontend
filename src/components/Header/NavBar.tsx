import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogIn, logOut } from '../../features/user/userSlice';
import { RootState } from '../../app/store';

export const NavBar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { error, loggedIn, user } = useSelector((state: RootState) => state.userAuth);
    const dispatch = useDispatch();

    const blahblah = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userLogIn({ username, password }));
    };
    return (
        <header>
            <ul>
                {!user && (
                    <>
                        <li>
                            <form onSubmit={(e) => blahblah(e)}>
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
                    <li>
                        <button onClick={() => dispatch(logOut())}>Log out</button>
                    </li>
                )}
                {error && <li>Incorrect username and/or password</li>}
            </ul>
        </header>
    );
};

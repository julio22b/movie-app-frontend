import React, { useState, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogIn, changeSignInFormStatus } from '../../features/user/userSlice';
import { RootState } from '../../app/store';

const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { sign_in_form } = useSelector((state: RootState) => state.userAuth.form_status);
    const { error } = useSelector((state: RootState) => state.userAuth);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const logIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userLogIn({ username, password }));
    };

    useLayoutEffect(() => {
        if (sign_in_form && inputRef.current) {
            inputRef.current.focus();
        }
    }, [sign_in_form]);

    return (
        <form
            onSubmit={(e) => logIn(e)}
            className={`${sign_in_form ? 'sign-in-form open' : 'sign-in-form'}`}
        >
            <div className="container">
                <button
                    type="button"
                    className="close-form"
                    onClick={() => dispatch(changeSignInFormStatus(!sign_in_form))}
                >
                    X
                </button>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength={25}
                        minLength={3}
                        ref={inputRef}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                    />
                </div>
                <button>SIGN IN</button>
            </div>
            <p className={`${error && 'error'}`}>Incorrect username and/or password</p>
        </form>
    );
};

export default SignInForm;

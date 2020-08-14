import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { changeSignUpFormStatus } from '../../features/user/userSlice';
import userService from '../../services/userService';

const CreateAccForm = () => {
    const open = useSelector((state: RootState) => state.userAuth.form_status.sign_up_form);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [errors, setErrors] = useState('');
    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await userService.signUp({ username, password, password_confirmation });
        } catch {
            setErrors('Passwords must match and be longer than 6 characters');
        }
    };

    const closeForm = () => {
        setUsername('');
        setPassword('');
        setPassword_confirmation('');
        setErrors('');
        dispatch(changeSignUpFormStatus(false));
    };

    return ReactDOM.createPortal(
        <>
            <div className={open ? 'blanket open' : 'blanket'} onClick={closeForm}></div>
            <div className={open ? 'create-acc open' : 'create-acc'}>
                <h4 className="h4-subtitle">
                    JOIN LETTERBOXD{' '}
                    <button type="button" onClick={closeForm}>
                        X
                    </button>
                </h4>
                <form onSubmit={(e) => signUp(e)}>
                    <div className="username">
                        <label htmlFor="username">Username</label>
                        <input
                            autoComplete="off"
                            type="text"
                            name="username"
                            required
                            minLength={3}
                            maxLength={25}
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            minLength={6}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="confirm-password">
                        <label htmlFor="confirm-password">Confirm password</label>
                        <input
                            type="password"
                            name="confirm-password"
                            required
                            minLength={6}
                            onChange={(e) => setPassword_confirmation(e.target.value)}
                            value={password_confirmation}
                        />
                    </div>
                    {errors && <p>{errors}</p>}
                    <button className="green-btn">SIGN UP</button>
                </form>
            </div>
        </>,
        document.getElementById('portal')!,
    );
};

export default CreateAccForm;

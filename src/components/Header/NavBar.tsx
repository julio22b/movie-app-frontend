import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSignInFormStatus } from '../../features/user/userSlice';
import { RootState } from '../../app/store';
import { changeModalState } from '../../features/reviews/reviewsSlice';
import SignInForm from './SignInForm';
import { Link } from 'react-router-dom';
import UserDropDown from './UserDropDown';
import ProfilePicture from '../_helpers/ProfilePicture';

export const NavBar = () => {
    const { user } = useSelector((state: RootState) => state.userAuth);
    const { sign_in_form } = useSelector((state: RootState) => state.userAuth.form_status);
    const dispatch = useDispatch();

    return (
        <header>
            <p className="app-name">
                <Link to={'/'}>Filmly</Link>
            </p>
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
                    <li className="has-dropdown">
                        <ProfilePicture user={user} />
                        {user.username}
                        <UserDropDown />
                    </li>
                )}
                <li>
                    <Link to={`/films`}>FILMS</Link>
                </li>
                <li>
                    <Link to={`/lists`}>LISTS</Link>
                </li>
                <li>
                    <Link to={`/people`}>PEOPLE</Link>
                </li>
                {user && (
                    <li className="log">
                        <button onClick={() => dispatch(changeModalState())}>+ LOG</button>
                    </li>
                )}
            </ul>
        </header>
    );
};

import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSignInFormStatus, changeSignUpFormStatus } from '../../features/user/userSlice';
import { RootState } from '../../app/store';
import { changeModalState } from '../../features/reviews/reviewsSlice';
import SignInForm from './SignInForm';
import { Link } from 'react-router-dom';
import UserDropDown from './UserDropDown';
import ProfilePicture from '../_helpers/ProfilePicture';
import CreateAccForm from './CreateAccForm';
import magnifier from '../../images/magnifier.svg';

export const NavBar = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const { user } = useSelector((state: RootState) => state.userAuth);
    const { sign_in_form, sign_up_form } = useSelector(
        (state: RootState) => state.userAuth.form_status,
    );
    const dispatch = useDispatch();
    const searchRef = useRef<HTMLInputElement>(null);

    const search = () => {
        setOpenSearch(!openSearch);
        if (openSearch && searchRef.current) searchRef.current.focus();
    };

    return (
        <header>
            <p className="app-name">
                <Link to={'/'}>Filmly</Link>
            </p>
            <CreateAccForm />
            {sign_in_form && <SignInForm />}
            <ul>
                {!user && (
                    <>
                        <li>
                            <button
                                onClick={() => dispatch(changeSignInFormStatus(!sign_in_form))}
                                type="button"
                            >
                                SIGN IN
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => dispatch(changeSignUpFormStatus(!sign_up_form))}
                            >
                                CREATE ACCOUNT
                            </button>
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
                    <Link to={{ pathname: '/', state: { userID: user?._id } }}>FILMS</Link>
                </li>
                <li>
                    <Link to={`/people`}>PEOPLE</Link>
                </li>
                <li className="magnifier" onClick={search}>
                    <button type="button">
                        {openSearch ? 'X' : <img src={magnifier} alt="" />}
                    </button>
                </li>
                <li className="log">
                    {user && (
                        <button
                            onClick={() => dispatch(changeModalState())}
                            className={openSearch ? 'hide' : ''}
                        >
                            + LOG
                        </button>
                    )}
                    <input
                        type="search"
                        className={openSearch ? 'search open' : 'search'}
                        ref={searchRef}
                    />
                </li>
            </ul>
        </header>
    );
};

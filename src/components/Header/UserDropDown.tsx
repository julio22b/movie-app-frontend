import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { Link } from 'react-router-dom';
import { logOut } from '../../features/user/userSlice';
import userService from '../../services/userService';

const UserDropDown = () => {
    const user = useSelector((state: RootState) => state.userAuth.user);
    const dispatch = useDispatch();
    const state = { userID: user?._id };
    const signOut = () => {
        userService.removeCurrentUser();
        dispatch(logOut());
    };
    if (user) {
        return (
            <ul className="user-dropdown">
                <li>
                    <Link to={`/`}>Home</Link>
                </li>
                <li>
                    <Link to={{ pathname: `/${user.username}`, state }}>Profile</Link>
                </li>
                <li>
                    <Link to={{ pathname: `/${user.username}/films`, state }}>Films</Link>
                </li>
                <li>
                    <Link to={{ pathname: `/${user.username}/diary`, state }}>Diary</Link>
                </li>
                <li>
                    <Link to={{ pathname: `/${user.username}/reviews`, state }}>Reviews</Link>
                </li>
                <li>
                    <Link to={{ pathname: `/${user.username}/watchlist`, state }}>Watchlist</Link>
                </li>
                <li>
                    <Link to={{ pathname: `/${user.username}/lists`, state }}>Lists</Link>
                </li>
                <li className="mobile">
                    <Link to={`/people`}>People</Link>
                </li>
                <li className="settings">
                    <Link to={`/settings`}>Settings</Link>
                </li>
                <li>
                    <button type="button" onClick={signOut} className="sign-out">
                        Sign Out
                    </button>
                </li>
            </ul>
        );
    }
    return null;
};

export default UserDropDown;

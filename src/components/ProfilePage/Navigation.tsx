import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { User } from '../../features/types';
import { Link, NavLink } from 'react-router-dom';

interface props {
    user: User;
}

const Navigation: React.FC<props> = ({ user }) => {
    return (
        <nav className="profile-nav">
            <ul>
                <li>
                    <NavLink to={`/${user.username}`} activeClassName="active">
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/${user.username}/films`}>Films</NavLink>
                </li>
                <li>
                    <NavLink to={`/${user.username}/diary`}>Diary</NavLink>
                </li>
                <li>
                    <NavLink to={`/${user.username}/reviews`}>Reviews</NavLink>
                </li>
                <li>
                    <NavLink to={`/${user.username}/watchlist`}>Watchlist</NavLink>
                </li>
                <li>
                    <NavLink to={`/${user.username}/lists`}>Lists</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;

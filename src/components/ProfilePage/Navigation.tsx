import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import NavLinkWithState from './NavLinkWithState';

const Navigation = () => {
    const user = useSelector((state: RootState) => state.userAuth.user_for_profile_page.user);
    if (user) {
        return (
            <nav className="profile-nav">
                <ul>
                    <NavLinkWithState user={user} />
                    <NavLinkWithState user={user} section={'Films'} />
                    <NavLinkWithState user={user} section={'Diary'} />
                    <NavLinkWithState user={user} section={'Reviews'} />
                    <NavLinkWithState user={user} section={'Watchlist'} />
                    <NavLinkWithState user={user} section={'Lists'} />
                </ul>
            </nav>
        );
    }
    return null;
};

export default Navigation;

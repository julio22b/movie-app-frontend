import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfilePicture from '../_helpers/ProfilePicture';
import Stats from './Stats';
import Favorites from './Favorites';
import Bio from './Bio';
import WatchlistPeek from './WatchlistPeek';
import RecentReviews from './RecentReviews';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import RecentLists from './RecentLists';
import SettingsBtn from './SettingsBtn';
import FollowBtn from './FollowBtn';
import Navigation from './Navigation';
import { getProfilePage } from '../../features/user/userSlice';
import Following from './Following';

export interface LocationState {
    userID: string;
}

const ProfilePage = () => {
    const { state } = useLocation<LocationState>();
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const user = useSelector((state: RootState) => state.userAuth.user_for_profile_page.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfilePage(state.userID));
    }, [dispatch, state.userID]);
    if (user) {
        return (
            <section className="profile-page">
                <div className="user-info">
                    <ProfilePicture user={user} />
                    <h2 className="username">
                        {user.username}
                        {user._id === loggedUser?._id ? <SettingsBtn /> : <FollowBtn user={user} />}
                    </h2>
                    <Stats user={user} />
                </div>
                <Navigation />
                <div className="container">
                    <div className="left-col">
                        <Favorites favorites={user.favorites} user={user} />
                        <RecentReviews user={user} loggedUserID={loggedUser?._id} />
                        <Following user={user} loggedUser={loggedUser?._id} />
                    </div>
                    <div className="right-col">
                        {user.bio && <Bio bio={user.bio} />}
                        <WatchlistPeek watchlist={user.watch_list.slice(0, 5)} user={user} />
                        <RecentLists recent_lists={user.lists.slice(0, 3)} user={user} />
                    </div>
                </div>
            </section>
        );
    }
    return null;
};

export default ProfilePage;

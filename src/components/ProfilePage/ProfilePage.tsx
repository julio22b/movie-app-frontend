import React from 'react';
import ProfilePicture from '../_helpers/ProfilePicture';
import Stats from './Stats';
import Favorites from './Favorites';
import Bio from './Bio';
import WatchlistPeek from './WatchlistPeek';
import RecentReviews from './RecentReviews';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import RecentLists from './RecentLists';
import SettingsBtn from './SettingsBtn';
import FollowBtn from './FollowBtn';
import Navigation from './Navigation';
import Following from './Following';
import { useProfileUser } from '../_helpers/useProfileUser';

const ProfilePage = () => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const { user, loading, error } = useProfileUser();

    if (loading) return null;
    if (error || !user) {
        return (
            <section style={{ padding: '4em', textAlign: 'center' }}>
                <h2>We couldn't find that member.</h2>
            </section>
        );
    }
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
                    <Favorites favorites={user.favorites} />
                    <RecentReviews user={user} loggedUserID={loggedUser?._id} />
                    <Following user={user} loggedUser={loggedUser?._id} />
                </div>
                <div className="right-col">
                    {user.bio && <Bio bio={user.bio} />}
                    <WatchlistPeek watchlist={user.watch_list} user={user} />
                    <RecentLists recent_lists={user.lists} user={user} />
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;

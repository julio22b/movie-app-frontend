import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from '../../features/types';
import userService from '../../services/userService';
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

interface LocationState {
    userID: string;
}

const ProfilePage = () => {
    const { state } = useLocation<LocationState>();
    const [user, setUser] = useState<User | null>(null);
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);

    useEffect(() => {
        const getUserInfo = async () => {
            const data = await userService.getUserInfo(state.userID);
            setUser(data);
        };
        if (!user) getUserInfo();
    });
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
                <Navigation user={user} />
                <div className="container">
                    <div className="left-col">
                        <Favorites favorites={user.favorites} user={user} />
                        <RecentReviews reviews={user.reviews} user={user} />
                        <div className="following">
                            <h4 className="h4-subtitle">
                                FOLLOWING <span>{user.following?.length}</span>
                            </h4>
                            <div>
                                {user.following?.map((user) => (
                                    <ProfilePicture user={user} />
                                ))}
                            </div>
                        </div>
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

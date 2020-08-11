import React from 'react';
import { User } from '../../../features/types';
import ProfilePicture from '../../_helpers/ProfilePicture';
import Navigation from '../Navigation';

const NavWithUsername: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className="wrap-user-nav">
            <div>
                <ProfilePicture user={user} />
                <span>{user.username}</span>
            </div>
            <Navigation />
        </div>
    );
};

export default NavWithUsername;

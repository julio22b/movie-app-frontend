import React from 'react';
import { User } from '../../features/types';
import ProfilePicture from '../_helpers/ProfilePicture';
import VoidMsg from './VoidMsg';

interface props {
    user: User;
    loggedUser: string | undefined;
}

const Following: React.FC<props> = ({ user, loggedUser }) => {
    return (
        <div className="following">
            <h4 className="h4-subtitle">
                FOLLOWING <span>{user.following?.length}</span>
            </h4>
            <div>
                {user.following?.length
                    ? user.following.map((user) => <ProfilePicture user={user} key={user._id} />)
                    : ''}
            </div>
            {!user.following?.length && (
                <VoidMsg
                    username={user.username}
                    userID={user._id}
                    loggedUserID={loggedUser}
                    text={`friends they're following`}
                />
            )}
        </div>
    );
};

export default Following;

import React from 'react';
import { Link } from 'react-router-dom';
import avatarIMG from '../../images/avatar.webp';
import { User } from '../../features/types';

interface ProfilePictureProps {
    user: User;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ user }) => {
    return (
        <Link
            to={{
                pathname: `/${user.username}`,
                state: {
                    userID: user._id,
                },
            }}
        >
            <img
                className="profile-picture"
                src={user.profile_picture || avatarIMG}
                alt={user.username}
            />
        </Link>
    );
};

export default ProfilePicture;

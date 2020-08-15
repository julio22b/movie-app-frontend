import React from 'react';
import ProfilePicture from '../../_helpers/ProfilePicture';
import { User } from '../../../features/types';
import { Link } from 'react-router-dom';

const UserInfo: React.FC<{ user: User }> = ({ user }) => {
    const profileUrl = `/${user.username}`;
    const reviewsUrl = `${profileUrl}/reviews`;
    const state = { userID: user._id };
    return (
        <figure>
            <ProfilePicture user={user} />
            <figcaption>
                <Link to={{ pathname: profileUrl, state }}>
                    <p className="username">{user.username}</p>
                </Link>
                <Link to={{ pathname: reviewsUrl, state }}>
                    <p className="reviews-number">
                        {user.reviews.length === 1 ? '1 review' : `${user.reviews.length} reviews`}
                    </p>
                </Link>
            </figcaption>
        </figure>
    );
};

export default UserInfo;

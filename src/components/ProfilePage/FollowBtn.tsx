import React, { useState } from 'react';
import { User } from '../../features/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface props {
    user: User;
}

const FollowBtn: React.FC<props> = ({ user }) => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const isFollowed = loggedUser?.following?.some((u) => u._id === user._id);
    if (loggedUser) {
        return (
            <button className={isFollowed ? 'action unfollow' : 'action follow'}>
                {isFollowed ? 'FOLLOWING' : 'FOLLOW'}
            </button>
        );
    }
    return null;
};

export default FollowBtn;

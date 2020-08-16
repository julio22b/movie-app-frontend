import React from 'react';
import { User } from '../../features/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import userService from '../../services/userService';
import { removeFromFollowing, addToFollowing } from '../../features/user/userSlice';

interface props {
    user: User;
}

const FollowBtn: React.FC<props> = ({ user }) => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const isFollowed = loggedUser?.following?.some((u) => u._id === user._id);
    const dispatch = useDispatch();
    if (loggedUser && isFollowed) {
        const unfollow = () => {
            userService.unfollow(loggedUser._id as string, user._id as string);
            dispatch(removeFromFollowing(user));
        };

        return (
            <button className={'action unfollow'} type="button" onClick={unfollow}>
                <span>FOLLOWING</span>
                <span>UNFOLLOW</span>
            </button>
        );
    } else if (loggedUser && !isFollowed) {
        const follow = () => {
            userService.follow(loggedUser._id as string, user._id as string);
            dispatch(addToFollowing(user));
        };
        return (
            <button className="action follow" type="button" onClick={follow}>
                FOLLOW
            </button>
        );
    }
    return null;
};

export default FollowBtn;

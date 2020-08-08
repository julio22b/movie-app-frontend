import React from 'react';
import { MovieList, User } from '../../features/types';
import VoidMsg from './VoidMsg';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const RecentLists: React.FC<{ recent_lists: MovieList[]; user: User }> = ({
    recent_lists,
    user,
}) => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    return (
        <article className="recent-lists">
            <h4 className="h4-subtitle">
                RECENT LISTS <span>{recent_lists.length}</span>
            </h4>
            {!recent_lists.length && (
                <VoidMsg
                    userID={user._id}
                    loggedUserID={loggedUser?._id}
                    username={user.username}
                    text={'any lists yet'}
                />
            )}
        </article>
    );
};

export default RecentLists;

import React from 'react';
import { User } from '../../features/types';

const Stats: React.FC<{ user: User }> = ({ user }) => {
    return (
        <ul className="stats">
            <li>
                {user.watched_movies?.length}
                <span>Films</span>
            </li>
            <li>
                {user.watch_list?.length}
                <span>Watchlist</span>
            </li>
            <li>
                {user.lists?.length}
                <span>Lists</span>
            </li>
            <li>
                {user.following?.length}
                <span>Following</span>
            </li>
            <li>
                {user.followers?.length} <span>Followers</span>
            </li>
        </ul>
    );
};

export default Stats;

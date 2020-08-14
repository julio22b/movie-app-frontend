import React from 'react';
import { MovieList, User } from '../../features/types';
import VoidMsg from './VoidMsg';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import PosterStack from './PosterStack';
import { Link } from 'react-router-dom';

const RecentLists: React.FC<{ recent_lists: MovieList[]; user: User }> = ({
    recent_lists,
    user,
}) => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const fixedLists = recent_lists.slice(0, 3).reverse();
    return (
        <article className="recent-lists">
            <h4 className="h4-subtitle">
                RECENT LISTS <span>{fixedLists.length}</span>
            </h4>
            {!fixedLists.length && (
                <VoidMsg
                    userID={user._id}
                    loggedUserID={loggedUser?._id}
                    username={user.username}
                    text={'any lists'}
                />
            )}
            {fixedLists.length &&
                fixedLists.map((list) => (
                    <div key={list._id}>
                        <PosterStack user={user} watchlist={null} custom_list={list} />
                        <Link
                            to={`/${
                                loggedUser?.username
                            }/lists/${list.title.toLocaleLowerCase().replace(/ /g, '-')}`}
                        >
                            <h2>
                                {list.title} <span>{list.movies.length} films</span>
                            </h2>
                        </Link>
                    </div>
                ))}
        </article>
    );
};

export default RecentLists;

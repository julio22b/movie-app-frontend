import React from 'react';
import NavWithUsername from '../Film/NavWithUsername';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import PosterStack from '../PosterStack';
import { titleToUrl } from '../../../services/helpers';
import { MovieList } from '../../../features/types';
import { useProfileUser } from '../../_helpers/useProfileUser';

const UserLists = () => {
    const { user } = useProfileUser();
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);

    if (user) {
        return (
            <section className="user-lists">
                <NavWithUsername user={user} />
                <div className="container">
                    <div className="left-col">
                        <h4 className="h4-subtitle">ALL LISTS</h4>
                        {user.lists.map((list: MovieList) => (
                            <div className="list" key={list._id}>
                                <PosterStack user={user} custom_list={list} watchlist={null} />
                                <div>
                                    <h2>
                                        <Link
                                            to={{
                                                pathname: `/${user.username}/lists/${titleToUrl(
                                                    list.title,
                                                )}`,
                                                state: {
                                                    userID: user._id,
                                                    list,
                                                },
                                            }}
                                        >
                                            {list.title}{' '}
                                        </Link>
                                        <span>
                                            {list.movies.length === 1
                                                ? '1 film'
                                                : `${list.movies.length} films`}
                                        </span>
                                    </h2>
                                    <p>{list.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {loggedUser?._id === user._id && (
                        <button>
                            <Link to={'/list/new'}>Start a new list...</Link>{' '}
                        </button>
                    )}
                </div>
            </section>
        );
    }
    return null;
};

export default UserLists;

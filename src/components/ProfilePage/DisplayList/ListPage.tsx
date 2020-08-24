import React, { useEffect } from 'react';
import ProfilePicture from '../../_helpers/ProfilePicture';
import { useLocation, Link } from 'react-router-dom';
import { LocationState } from '../ProfilePage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { getProfilePage } from '../../../features/user/userSlice';
import { MovieList } from '../../../features/types';
import Poster from '../../Home/Poster';
import { titleToUrl } from '../../../services/helpers';

interface state extends LocationState {
    list: MovieList;
}

const ListPage = () => {
    const { state } = useLocation<state>();
    const user = useSelector((state: RootState) => state.userAuth.user_for_profile_page.user);
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfilePage(state.userID));
    }, [dispatch, state.userID]);

    const moviesFromListIDs = state.list.movies.map((m) => m._id);
    const watched = loggedUser?.watched_movies.filter((m) => moviesFromListIDs.includes(m._id));
    const percentage = ((watched?.length! / moviesFromListIDs.length) * 100).toFixed(0);
    if (user) {
        const pathname = `/${user.username}`;

        return (
            <div className="display-list">
                <section>
                    <h4 className="h4-subtitle">
                        <ProfilePicture user={user} /> List by{' '}
                        <Link to={{ pathname, state }}> {user.username}</Link>
                    </h4>
                    <article>
                        <h2>{state.list.title}</h2>
                        {state.list.description && (
                            <p className="description">{state.list.description}</p>
                        )}
                    </article>
                    <div className="posters-container">
                        {state.list.movies.map((m, index) => (
                            <Link
                                key={index}
                                to={{
                                    pathname: `/film/${titleToUrl(m.title)}`,
                                    state: {
                                        year: m.year,
                                    },
                                }}
                            >
                                <Poster url={m.poster} title={m.title} tmdb={false} />
                            </Link>
                        ))}
                    </div>
                </section>
                {loggedUser && (
                    <aside className="percentage">
                        <div>
                            <p>
                                You've watched {watched?.length} of {moviesFromListIDs.length}
                            </p>
                            <p>
                                <span>{percentage}</span>%
                            </p>
                        </div>
                        <div className="grey-bar"></div>
                        <div className="blue-bar" style={{ width: `${percentage}%` }}></div>
                    </aside>
                )}
            </div>
        );
    }
    return null;
};

export default ListPage;

import React from 'react';
import ProfilePicture from '../../_helpers/ProfilePicture';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { MovieInstance, MovieList } from '../../../features/types';
import Poster from '../../Home/Poster';
import { titleToUrl } from '../../../services/helpers';
import { useProfileUser, LocationState } from '../../_helpers/useProfileUser';

interface ListLocationState extends LocationState {
    list: MovieList;
}

const ListPage = () => {
    const { state } = useLocation<Partial<ListLocationState> | undefined>();
    const { listName } = useParams<{ listName: string }>();
    const { user, loading, error } = useProfileUser();
    const loggedUser = useSelector((s: RootState) => s.userAuth.user);

    const list: MovieList | undefined =
        state?.list ?? user?.lists.find((l: MovieList) => titleToUrl(l.title) === listName);

    if (loading) return null;
    if (error || !user || !list) {
        return (
            <section style={{ padding: '4em', textAlign: 'center' }}>
                <h2>We couldn't find that list.</h2>
            </section>
        );
    }

    const moviesFromListIDs = list.movies.map((movie: MovieInstance) => movie._id);
    const watched = loggedUser?.watched_movies.filter((movie: MovieInstance) => moviesFromListIDs.includes(movie._id));
    const percentage = moviesFromListIDs.length
        ? (((watched?.length ?? 0) / moviesFromListIDs.length) * 100).toFixed(0)
        : '0';

    return (
        <div className='display-list'>
            <section>
                <h4 className='h4-subtitle'>
                    <ProfilePicture user={user} /> List by{' '}
                    <Link to={{ pathname: `/${user.username}`, state: { userID: user._id } }}> {user.username}</Link>
                </h4>
                <article>
                    <h2>{list.title}</h2>
                    {list.description && <p className='description'>{list.description}</p>}
                </article>
                <div className='posters-container'>
                    {list.movies.map((m, index) => (
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
                <aside className='percentage'>
                    <div>
                        <p>
                            You've watched {watched?.length ?? 0} of {moviesFromListIDs.length}
                        </p>
                        <p>
                            <span>{percentage}</span>%
                        </p>
                    </div>
                    <div className='grey-bar'></div>
                    <div className='blue-bar' style={{ width: `${percentage}%` }}></div>
                </aside>
            )}
        </div>
    );
};

export default ListPage;

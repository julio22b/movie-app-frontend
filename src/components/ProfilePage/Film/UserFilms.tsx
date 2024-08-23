import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { getProfilePage } from '../../../features/user/userSlice';
import { useLocation, Link } from 'react-router-dom';
import Poster from '../../Home/Poster';
import { LocationState } from '../ProfilePage';
import NavWithUsername from './NavWithUsername';
import { titleToUrl } from '../../../services/helpers';
import { MovieInstance } from '../../../features/types';

const UserFilms = () => {
    const { state } = useLocation<LocationState>();
    const user = useSelector((state: RootState) => state.userAuth.user_for_profile_page.user);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfilePage(state.userID));
    }, [dispatch, state.userID]);
    
    if (user) {
        return (
            <section className="user-films">
                <NavWithUsername user={user} />
                <div className="posters-container">
                    {user.watched_movies.map((movie: MovieInstance) => (
                        <Link
                            key={movie.title}
                            to={{
                                pathname: `/film/${titleToUrl(movie.title)}`,
                                state: {
                                    year: movie.year,
                                },
                            }}
                        >
                            <figure>
                                <Poster url={movie.poster} title={movie.title} tmdb={false} />
                                <figcaption>
                                    {user.liked_movies.find((likedMovie: MovieInstance) => movie._id === likedMovie._id) && (
                                        <i className="like-gray"></i>
                                    )}
                                </figcaption>
                            </figure>
                        </Link>
                    ))}
                </div>
            </section>
        );
    }
    return null;
};

export default UserFilms;

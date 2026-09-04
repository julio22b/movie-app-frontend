import React from 'react';
import { Link } from 'react-router-dom';
import Poster from '../../Home/Poster';
import NavWithUsername from './NavWithUsername';
import { titleToUrl } from '../../../services/helpers';
import { MovieInstance } from '../../../features/types';
import { useProfileUser } from '../../_helpers/useProfileUser';

const UserFilms = () => {
    const { user } = useProfileUser();

    if (user) {
        return (
            <section className="user-films">
                <NavWithUsername user={user} />
                <div className="posters-container">
                    {user.watched_movies.map((movie: MovieInstance) => (
                        <Link
                            key={movie._id}
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

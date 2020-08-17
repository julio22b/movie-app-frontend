import React from 'react';
import { User } from '../../features/types';
import Poster from '../Home/Poster';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import VoidMsg from './VoidMsg';
import { favorite } from '../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { titleToUrl } from '../../services/helpers';

const Favorites: React.FC<{ favorites: [favorite, favorite, favorite, favorite]; user: User }> = ({
    favorites,
    user,
}) => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    return (
        <article className="favorite-films">
            <h4 className="h4-subtitle">FAVORITE FILMS</h4>
            {favorites.length > 0 &&
                favorites.map((f, index) =>
                    f ? (
                        <Link
                            to={{
                                pathname: `/film/${titleToUrl(f.title)}`,
                                state: { year: f.year },
                            }}
                            key={f._id}
                        >
                            <Poster url={f.poster} title={f.title} tmdb={false} />
                        </Link>
                    ) : (
                        <div className="placeholder" key={index}></div>
                    ),
                )}
            {favorites.every((f) => f === null) && (
                <VoidMsg
                    userID={user._id}
                    loggedUserID={loggedUser?._id}
                    username={user.username}
                    text={'any favorites'}
                />
            )}
        </article>
    );
};

export default Favorites;

import React from 'react';
import { User } from '../../features/types';
import Poster from '../Home/Poster';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import VoidMsg from './VoidMsg';
import { favorite } from '../../features/user/userSlice';

const Favorites: React.FC<{ favorites: [favorite, favorite, favorite, favorite]; user: User }> = ({
    favorites,
    user,
}) => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    return (
        <article className="favorite-films">
            <h4 className="h4-subtitle">FAVORITE FILMS</h4>
            {favorites.length > 0 &&
                favorites.map((f) =>
                    f ? (
                        <Poster url={f.poster} title={f.title} tmdb={false} />
                    ) : (
                        <div className="placeholder"></div>
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

import React from 'react';
import { MovieInstance, User } from '../../features/types';
import Poster from '../Home/Poster';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import VoidMsg from './VoidMsg';

const Favorites: React.FC<{ favorites: MovieInstance[]; user: User }> = ({ favorites, user }) => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    return (
        <article className="favorite-films">
            <h4 className="h4-subtitle">FAVORITE FILMS</h4>
            {favorites.length > 0 &&
                favorites.map((f) => <Poster url={f.poster} title={f.title} tmdb={false} />)}
            {favorites.length === 0 && (
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

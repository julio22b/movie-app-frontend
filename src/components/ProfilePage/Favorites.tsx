import React from 'react';
import { MovieInstance } from '../../features/types';
import Poster from '../Home/Poster';

const Favorites: React.FC<{ favorites: MovieInstance[] }> = ({ favorites }) => {
    return (
        <article className="favorite-films">
            <h4 className="h4-subtitle">FAVORITE FILMS</h4>
            {favorites.map((f) => (
                <Poster url={f.poster} title={f.title} tmdb={false} />
            ))}
        </article>
    );
};

export default Favorites;

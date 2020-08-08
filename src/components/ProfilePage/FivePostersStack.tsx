import React from 'react';
import { MovieInstance } from '../../features/types';
import Poster from '../Home/Poster';

const FivePostersStack: React.FC<{ movies: MovieInstance[] }> = ({ movies }) => {
    const fiveMovies = movies.slice(0, 5);
    return (
        <div className="poster-stack">
            {fiveMovies.map((m) => (
                <Poster url={m.poster} title={m.title} tmdb={false} />
            ))}
        </div>
    );
};

export default FivePostersStack;

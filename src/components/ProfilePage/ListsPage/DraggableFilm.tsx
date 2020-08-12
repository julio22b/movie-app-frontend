import React from 'react';
import { useDispatch } from 'react-redux';
import { removeMovieFromNewList } from '../../../features/user/userSlice';
import { MovieInstance } from '../../../features/types';

const DraggableFilm: React.FC<{ movie: MovieInstance }> = ({ movie }) => {
    const dispatch = useDispatch();
    return (
        <figure className="film">
            <div>
                <img
                    src={movie.poster.replace(/&#x2F;/g, '/')}
                    alt={`Poster for ${movie.title} (${movie.year})`}
                />
                <figcaption>
                    <p>
                        {movie.title} <span>{movie.year}</span>
                    </p>
                    <p>{movie.director}</p>
                </figcaption>
            </div>
            <button
                className="remove"
                type="button"
                onClick={() => dispatch(removeMovieFromNewList(movie))}
            >
                X
            </button>
        </figure>
    );
};

export default DraggableFilm;

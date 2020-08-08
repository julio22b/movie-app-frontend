import React from 'react';
import { Link } from 'react-router-dom';
import { Review } from '../../features/types';

const MovieTitle: React.FC<{ review: Review }> = ({ review }) => {
    return (
        <h2 className="movie-title">
            <Link to={`/film/${review.movie.title.toLocaleLowerCase().replace(/ /g, '+')}`}>
                {review.movie.title}{' '}
            </Link>
            <span>{review.movie.year}</span>{' '}
            <i className="stars" data-rating={`${review.rating}`}></i>
        </h2>
    );
};

export default MovieTitle;

import React from 'react';
import { Link } from 'react-router-dom';
import { Review } from '../../features/types';
import { titleToUrl } from '../../services/helpers';

const MovieTitle: React.FC<{ review: Review }> = ({ review }) => {
    const pathname = `/film/${titleToUrl(review.movie.title)}`;
    const state = {
        year: review.movie.year,
    };
    return (
        <h2 className="movie-title">
            <Link to={{ pathname, state }}>{review.movie.title} </Link>
            <span>{review.movie.year}</span>{' '}
            <i className="stars" data-rating={`${review.rating}`}></i>
        </h2>
    );
};

export default MovieTitle;

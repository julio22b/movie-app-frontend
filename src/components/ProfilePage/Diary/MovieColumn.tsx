import React from 'react';
import { Link } from 'react-router-dom';
import Poster from '../../Home/Poster';
import { Review } from '../../../features/types';
import { titleToUrl } from '../../../services/helpers';

const MovieColumn: React.FC<{ review: Review }> = ({ review }) => {
    const pathname = `/film/${titleToUrl(review.movie.title)}`;
    const state = {
        year: review.movie.year,
    };
    return (
        <figure>
            <Link to={{ pathname, state }}>
                <Poster url={review.movie.poster} title={review.movie.title} tmdb={false} />
            </Link>
            <figcaption>
                {' '}
                <Link to={{ pathname, state }}>{review.movie.title}</Link>
            </figcaption>
        </figure>
    );
};

export default MovieColumn;

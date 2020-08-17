import React from 'react';
import { Link } from 'react-router-dom';
import Poster from '../../Home/Poster';
import { Review } from '../../../features/types';

const MovieColumn: React.FC<{ review: Review }> = ({ review }) => {
    const processedTitle = review.movie.title.toLocaleLowerCase().replace(/ /g, '-');
    return (
        <figure>
            <Link to={`/film/${processedTitle}`}>
                <Poster url={review.movie.poster} title={review.movie.title} tmdb={false} />
            </Link>
            <figcaption>
                {' '}
                <Link to={`/film/${processedTitle}`}>{review.movie.title}</Link>
            </figcaption>
        </figure>
    );
};

export default MovieColumn;

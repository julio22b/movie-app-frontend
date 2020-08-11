import React from 'react';
import { Review } from '../../features/types';
import Poster from '../Home/Poster';
import { Link } from 'react-router-dom';
import ReviewBody from './ReviewBody';

const RecentReview: React.FC<{ review: Review }> = ({ review }) => {
    return (
        <article className="review">
            <Link to={`/film/${review.movie.title.toLocaleLowerCase().replace(/ /g, '-')}`}>
                <Poster url={review.movie.poster} title={review.movie.title} tmdb={false} />
            </Link>
            <ReviewBody review={review} stars={false} />
        </article>
    );
};

export default RecentReview;

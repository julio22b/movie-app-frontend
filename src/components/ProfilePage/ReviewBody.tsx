import React from 'react';
import moment from 'moment';
import { Review } from '../../features/types';

const ReviewBody: React.FC<{ review: Review; stars: boolean }> = ({ review, stars }) => {
    return (
        <div>
            <h2>
                {review.movie.title} <span>{review.movie.year}</span>
            </h2>
            <p className="date">
                {stars && <i className="stars" data-rating={`${review.rating}`}></i>} Watched{' '}
                {moment(review.created_at).format('MMM DD[,] YYYY')}
            </p>
            <p className="content">{review.content}</p>
            <div>{review.likes === 1 ? '1 like' : `${review.likes} likes`}</div>
        </div>
    );
};

export default ReviewBody;

import React from 'react';
import moment from 'moment';
import { Review } from '../../features/types';
import { Link } from 'react-router-dom';

interface props {
    review: Review;
    link: {
        pathname: string;
        state: { reviewID: string };
    };
}

const ReviewBody: React.FC<props> = ({ review, link }) => {
    const watched_on = review.watched_on ? moment(review.watched_on).format('MMM DD[,] YYYY') : '';
    return (
        <div>
            <h2>
                <Link to={link}>
                    {review.movie.title} <span>{review.movie.year}</span>
                </Link>
            </h2>
            {(review.rating || watched_on) && (
                <p className="date">
                    <i className="stars" data-rating={`${review.rating}`}></i>{' '}
                    {watched_on && `Watched ${watched_on}`}
                </p>
            )}
            <p className="content" dangerouslySetInnerHTML={{ __html: review.content }}></p>
            <div>{review.likes === 1 ? '1 like' : `${review.likes} likes`}</div>
        </div>
    );
};

export default ReviewBody;

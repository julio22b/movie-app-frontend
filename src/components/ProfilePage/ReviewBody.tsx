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
    return (
        <div>
            <h2>
                <Link to={link}>
                    {review.movie.title} <span>{review.movie.year}</span>
                </Link>
            </h2>
            <p className="date">
                <i className="stars" data-rating={`${review.rating}`}></i> Watched{' '}
                {moment(review.created_at).format('MMM DD[,] YYYY')}
            </p>
            <p className="content" dangerouslySetInnerHTML={{ __html: review.content }}></p>
            <div>{review.likes === 1 ? '1 like' : `${review.likes} likes`}</div>
        </div>
    );
};

export default ReviewBody;

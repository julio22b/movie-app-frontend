import React from 'react';
import { Review } from '../../../features/types';
import Poster from '../Poster';
import ProfilePicture from '../../_helpers/ProfilePicture';
import moment from 'moment';
import { titleToUrl } from '../../../services/helpers';
import { Link } from 'react-router-dom';

interface props {
    review: Review;
}

const PosterWithUsername: React.FC<props> = ({ review }) => {
    const date = review.watched_on ? moment(review.watched_on).format('MMM DD') : '';
    const pathname = `/${review.user.username}/film/${titleToUrl(review.movie.title)}`;
    const state = {
        reviewID: review._id,
    };
    return (
        <div className="review">
            <Link to={{ pathname, state }}>
                <div className="movie-user-info">
                    <Poster url={review.movie.poster} title={review.movie.title} tmdb={false} />
                    <span>
                        <ProfilePicture user={review.user} />
                        <span>{review.user.username}</span>
                    </span>
                </div>
            </Link>
            <div className="meta">
                <div>
                    {review.rating ? <i className="stars" data-rating={review.rating}></i> : ''}
                    {review.liked_movie && <i className="liked"></i>}
                    {review.content && <i className="review-icon"></i>}
                </div>
                {date && <i className="date">{date}</i>}
            </div>
        </div>
    );
};

export default PosterWithUsername;

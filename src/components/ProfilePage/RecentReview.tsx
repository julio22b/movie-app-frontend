import React from 'react';
import { Review } from '../../features/types';
import Poster from '../Home/Poster';
import { Link } from 'react-router-dom';
import ReviewBody from './ReviewBody';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { titleToUrl } from '../../services/helpers';

const RecentReview: React.FC<{ review: Review }> = ({ review }) => {
    const user = useSelector((state: RootState) => state.userAuth.user_for_profile_page.user);
    if (user) {
        const reviewLink = {
            pathname: `/${user.username}/film/${titleToUrl(review.movie.title)}`,
            state: {
                reviewID: review._id as string,
            },
        };
        return (
            <article className="review">
                <Link to={reviewLink}>
                    <Poster url={review.movie.poster} title={review.movie.title} tmdb={false} />
                </Link>
                <ReviewBody review={review} link={reviewLink} />
            </article>
        );
    }
    return null;
};

export default RecentReview;

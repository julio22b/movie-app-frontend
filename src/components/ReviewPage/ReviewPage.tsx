import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import reviewService from '../../services/reviewService';
import { Review } from '../../features/types';
import Poster from '../Home/Poster';
import ProfilePicture from '../_helpers/ProfilePicture';
import UsernameHeader from '../_helpers/UsernameHeader';
import LikeReviewBtn from '../_helpers/LikeReviewBtn';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import movieService from '../../services/movieService';

interface LocationState {
    reviewID: string;
}

const ReviewPage = () => {
    const { state } = useLocation<LocationState>();
    const [review, setReview] = useState<Review | null>(null);
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const [isLiked, setIsLiked] = useState<boolean | undefined>(false);

    useEffect(() => {
        const fetchReview = async () => {
            const review = (await reviewService.getReview(state.reviewID)) as Review;
            setReview(review);
            setIsLiked(loggedUser?.liked_reviews.some((r) => r === review?._id));
        };
        fetchReview();
    }, [state.reviewID, loggedUser]);

    const likeReview = () => {
        reviewService.likeReview(loggedUser?._id as string, review?._id as string);
        setIsLiked(true);
    };

    if (review && review.movie) {
        return (
            <section className="review-page">
                <figure>
                    <Poster url={review.movie.poster} title={review.movie.title} tmdb={false} />
                </figure>
                <div>
                    <ProfilePicture user={review.user} />
                    <UsernameHeader
                        user={review.user}
                        movieTitle={review.movie.title}
                        _id={review._id}
                    />
                    <LikeReviewBtn
                        likeReview={likeReview}
                        isLiked={isLiked}
                        likes={review.likes as number}
                    />
                </div>
            </section>
        );
    }
    return null;
};

export default ReviewPage;

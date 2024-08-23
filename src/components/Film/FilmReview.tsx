import React, { useState } from 'react';
import { Review } from '../../features/types';

import { reviewService } from '../../services/reviewService';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

import ProfilePicture from '../_helpers/ProfilePicture';
import UsernameHeader from '../_helpers/UsernameHeader';
import LikeReviewBtn from '../_helpers/LikeReviewBtn';

const FilmReview: React.FC<Review> = ({
    rating,
    likes,
    user,
    content,
    comments,
    movieTitle,
    _id,
}) => {
    const loggedUser = useSelector((state: RootState) => state.userAuth.user);
    const [isLiked, setIsLiked] = useState(loggedUser?.liked_reviews.some((r) => r === _id));

    const likeReview = () => {
        reviewService.likeReview(loggedUser?._id as string, _id as string);
        setIsLiked(true);
    };

    return (
        <article className="review">
            <ProfilePicture user={user} />
            <div>
                <UsernameHeader
                    user={user}
                    movieTitle={movieTitle}
                    _id={_id}
                    comments={comments}
                    rating={rating}
                />
                <p className="content">{content}</p>
                <LikeReviewBtn likes={likes as number} likeReview={likeReview} isLiked={isLiked} />
            </div>
        </article>
    );
};

export default FilmReview;

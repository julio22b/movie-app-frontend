import React from 'react';

import notLikedIMG from '../../images/heart-gray-darkbg.png';
import likedIMG from '../../images/heart-yellow-darkbg.png';

interface LikeReviewBtnProps {
    likeReview: () => void;
    isLiked: boolean | undefined;
    likes: number;
}

const LikeReviewBtn: React.FC<LikeReviewBtnProps> = ({ likeReview, isLiked, likes }) => {
    return (
        <button className="like-review-btn" onClick={likeReview}>
            <img src={isLiked ? likedIMG : notLikedIMG} alt="Like button" /> Like review{' '}
            <span>
                {likes} {likes === 1 ? 'like' : 'likes'}
            </span>
        </button>
    );
};

export default LikeReviewBtn;

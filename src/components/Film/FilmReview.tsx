import React, { useState } from 'react';
import { Review } from '../../features/types';
import avatarIMG from '../../images/avatar.webp';
import { Link } from 'react-router-dom';
import notLikedIMG from '../../images/heart-gray-darkbg.png';
import likedIMG from '../../images/heart-yellow-darkbg.png';
import reviewService from '../../services/reviewService';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

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
            <Link to={`/${user.username}`}>
                <img
                    className="profile-picture"
                    src={user.profile_picture || avatarIMG}
                    alt={user.username}
                />
            </Link>
            <div>
                <Link
                    to={`/${user.username}/film/${movieTitle
                        ?.toLocaleLowerCase()
                        .replace(/ /g, '+')}`}
                >
                    <h4 className="user">
                        <span>Review by</span> {user.username}{' '}
                        <i className="stars" data-rating={`${rating}`}></i>
                        <i className="comments-number"></i>
                        <span>{comments.length}</span>
                    </h4>
                </Link>
                <p className="content">{content}</p>
                <button className="like-review-btn" onClick={likeReview}>
                    <img src={isLiked ? likedIMG : notLikedIMG} alt="Like button" /> Like review{' '}
                    <span>
                        {likes} {likes === 1 ? 'like' : 'likes'}
                    </span>
                </button>
            </div>
        </article>
    );
};

export default FilmReview;

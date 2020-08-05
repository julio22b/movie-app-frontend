import React from 'react';
import { Review, User } from '../../features/types';
import avatarIMG from '../../images/avatar.webp';
import { Link } from 'react-router-dom';
import notLikedIMG from '../../images/heart-gray-darkbg.png';

const FilmReview: React.FC<Review> = ({ rating, likes, user, content, comments, movieTitle }) => {
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
                <button className="like-review-btn">
                    <img src={notLikedIMG} alt="Like button" /> Like review{' '}
                    <span>{likes} likes</span>
                </button>
            </div>
        </article>
    );
};

export default FilmReview;

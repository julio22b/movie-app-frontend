import React from 'react';
import { Review } from '../../features/types';

// eslint-disable-next-line no-redeclare
const FilmReview: React.FC<Review> = ({ rating, likes, user, content, comments }) => {
    return (
        <article className="review">
            <img src={user.profile_picture} alt={user.username} />
            <h4>
                <span>Review by</span> {user.username} <i className="stars">{rating}</i>
                <i className="comments-number">{comments.length}</i>
            </h4>
            <p>{content}</p>
            <button>HEART {likes} likes</button>
        </article>
    );
};

export default FilmReview;

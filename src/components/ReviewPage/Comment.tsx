import React from 'react';
import { ReviewComment } from '../../features/types';
import ProfilePicture from '../_helpers/ProfilePicture';
import { Link } from 'react-router-dom';

const Comment: React.FC<ReviewComment> = ({ user, content }) => {
    return (
        <article className="comment">
            <div>
                <ProfilePicture user={user} />
                <div>
                    <Link to={`/${user.username}`}>
                        <p>{user.username}</p>
                    </Link>
                    <p className="date">DATE</p>
                </div>
            </div>
            <p>{content}</p>
        </article>
    );
};

export default Comment;

import React from 'react';
import { ReviewComment } from '../../features/types';
import ProfilePicture from '../_helpers/ProfilePicture';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Comment: React.FC<ReviewComment> = ({ user, content, created_at }) => {
    const date = moment(created_at);
    return (
        <article className="comment">
            <div>
                <ProfilePicture user={user} />
                <div>
                    <Link
                        to={{
                            pathname: `/${user.username}`,
                            state: {
                                userID: user._id,
                            },
                        }}
                    >
                        <p>{user.username}</p>
                    </Link>
                    <p className="date">{date.fromNow()}</p>
                </div>
            </div>
            <p>{content}</p>
        </article>
    );
};

export default Comment;
